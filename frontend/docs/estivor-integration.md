# Bellhouse forms audit & Estivor integration architecture

Status: audit complete, integration-ready adapter implemented, Estivor endpoint not yet live (`LEAD_INTAKE_MODE=legacy` by default — zero behavior change in production).

## 1. Current production form architecture (map)

```
Browser (4 form surfaces)
  ContactForm (default + contractor variant)      -> useQuoteSubmit -> sendContactForm (server action)
  ServiceHeroQuoteForm (service page hero)         -> sendServiceHeroForm (server action, direct)
  LandingQuoteForm (landing pages)                 -> useQuoteSubmit -> sendContactForm (server action)
  [any of the above, if photos attached]           -> useQuoteSubmit -> /api/quote-upload/create-session
                                                                          -> R2 presigned PUT (browser -> R2)
                                                                          -> /api/quote-upload/finalize
                                                                             -> processContactCore()

  Calculators (excavation/gravel/topsoil) compute an estimate client-side
  and link to /contact — they are NOT a separate lead-submission path.

sendContactForm / sendServiceHeroForm (src/app/actions/contact.ts)
  -> validate (zod) -> spam/honeypot check -> reCAPTCHA v3 verify (score >= 0.5)
  -> processContactCore()
       -> saveToGoogleSheets(lead)         [fire-and-forget, non-blocking]
       -> submitLeadToEstivorIntake(lead)  [fire-and-forget, non-blocking — NEW, no-op by default]
       -> sendBrevoEmail() x2 (business copy + customer copy)  [awaited — this is what the user sees succeed/fail]
```

Both server actions and the upload routes converge on the same `processContactCore()` in
[`src/app/actions/contact.ts`](../src/app/actions/contact.ts) — there is exactly one place where a "lead" becomes an email + a Sheets row (+ now, optionally, an Estivor submission).

## 2. Every form / lead-entry path

| Surface | Component | Server entry point | Notes |
|---|---|---|---|
| Contact page, default | `ContactForm` (`variant="default"`) | `sendContactForm` | reCAPTCHA v3 |
| Contact page, contractor | `ContactForm` (`variant="contractor"`) | `sendContactForm` | company/location/timeline fields folded into `message` |
| Service page hero | `ServiceHeroQuoteForm` | `sendServiceHeroForm` | phone required, no upload support |
| Landing pages | `LandingQuoteForm` | `sendContactForm` (via `useQuoteSubmit`) | field set is data-driven per landing page (`src/data/landingPages/*`) |
| Any of the above, with photos | same components | `/api/quote-upload/create-session` → `/api/quote-upload/finalize` | Turnstile instead of reCAPTCHA; R2 storage; calls `processContactCore` from the finalize route |
| Synthetic health check | n/a | `/api/monitor/form-check`, `/api/monitor/daily-check` | bearer-token protected; exercises the same `processContactCore` pipeline with `skipSheets: true` |

Calculators (`/resources/calculators/*`) do not submit leads; their "Request a Quote" CTA links to `/contact`.

## 3. What's working vs. broken

**Working:**
- Brevo transactional email (business + customer copy) — this is the actual primary lead-delivery path today.
- Validation: zod schemas per form, phone-format check, SMS-consent enforcement when a phone is given.
- Spam protection: honeypot field, spam-keyword list, disposable-email-domain list, reCAPTCHA v3 (score ≥ 0.5) on text-only forms, Cloudflare Turnstile on the photo-upload flow.
- Rate limiting on the upload routes (`src/lib/uploads/server/rateLimit.ts`) — per-IP, per-email, per-phone buckets.
- Structured monitor-event logging (`src/lib/monitor/eventLog.ts`) for email failures, Sheets failures, upload failures.
- Bearer-token-protected synthetic health checks (`form-check`, `daily-check`) plus a Brevo webhook → Slack alert path for bounces/blocks on those synthetic sends.
- Client-side attribution capture (`src/lib/tracking/attribution.ts`) — UTM×5, gclid/gbraid/wbraid/fbclid/msclkid, landing page, referrer, initial timestamp, current page, requested service — persisted to `localStorage` for 90 days, re-validated server-side, and written into both the email body and the Sheets row.
- GA4/gtag custom events (`form_start`, `quote_form_submit`, `quote_form_error`, `quote_form_preselect`) and Google Ads conversion firing.

**Broken / gaps found:**
- ~~Google Sheets write fails in production (root cause below)~~ — **fixed 2026-08-17**, see below. Legacy/optional reporting only; never affected email delivery.
- ~~Sheets-based duplicate-detection (`isDuplicateEntry`) silently always returns "not a duplicate" as a side effect of the same failure~~ — fixed alongside the above.
- The in-memory rate limiter (`Map`-based) resets on every process restart/deploy and does not share state across instances if the app ever runs behind multiple Node processes — fine for a single long-running `next start` process, worth knowing if that changes.
- `sendContactForm` / `sendServiceHeroForm` (the non-upload paths) have no rate limiting — only the upload routes do.
- An unused env var, `GOOGLE_SHEETS_API`, exists in `.env.local` but nothing in the codebase reads it — vestigial from an earlier Sheets approach, safe to remove whenever convenient.

## 4. Root cause of the Google Sheets failure (fixed 2026-08-17)

`saveToGoogleSheets()` and `isDuplicateEntry()` in [`src/app/actions/contact.ts`](../src/app/actions/contact.ts) both read Google service-account credentials from a **local JSON key file** on disk:

```ts
const keyFilePath = path.join(process.cwd(), 'google-service-account.json');
const keyFile = await fs.readFile(keyFilePath, 'utf-8');
```

That file:
- exists in the local working copy,
- is listed in `.gitignore` (`google-service-account.json`) and is **not tracked by git**,
- was **not read from an environment variable** anywhere in the code.

Whatever the production deploy process is (git-based pull/clone, CI build artifact, etc.), it would not carry this gitignored file unless someone copied it onto the server by hand — and evidently either it was never copied, or a redeploy overwrote/removed it. When the file was missing, `fs.readFile` threw `ENOENT`, which was caught, logged as a `SHEETS_FAIL` monitor event, and swallowed (`saveToGoogleSheets(lead).catch(...)` is fire-and-forget). **This never blocked or failed the lead** — email still sent normally — which is why the failure was silent rather than an outage.

**Fix applied:** both functions now go through a shared `getGoogleCredentials()` helper in `contact.ts` that reads `GOOGLE_SERVICE_ACCOUNT_JSON` (the full service-account key JSON as a single-line string) from the environment first, falling back to the local `google-service-account.json` file only if that env var is unset (local-dev convenience). To restore Sheets in production, set `GOOGLE_SERVICE_ACCOUNT_JSON` and `GOOGLE_SHEET_ID` in the deploy environment — see `.env.example`. This is optional now that Estivor is the intended system of record.

## 5. Proposed Bellhouse → Estivor architecture

```
Bellhouse Website
  processContactCore()
    ├── sendBrevoEmail()            <- unchanged, always runs, stays the safety net
    ├── saveToGoogleSheets()        <- unchanged, legacy/optional, fire-and-forget
    └── submitLeadToEstivorIntake() <- NEW, fire-and-forget, gated by config
           │
           ├─ shouldSubmitToEstivor()?  (LEAD_INTAKE_MODE != 'legacy' AND creds present)
           │    no  -> return immediately, no network call, no log
           │    yes -> continue
           │
           ├─ mapContactDataToEstivorPayload(lead)  -> canonical payload
           ├─ estivorLeadPayloadSchema.safeParse()  -> schema validation before send
           └─ submitLeadToEstivor(payload)
                -> POST {ESTIVOR_INTAKE_API_URL}
                     headers: Authorization Bearer {ESTIVOR_INTAKE_API_KEY}, Idempotency-Key: {leadId}
                     timeout: ESTIVOR_INTAKE_TIMEOUT_MS (default 8s)
                     retries: up to ESTIVOR_INTAKE_MAX_RETRIES (default 2) on network error / 5xx,
                              no retry on 4xx (payload would just be rejected again)
                -> failure -> logMonitorEvent('ESTIVOR_SUBMIT_FAIL', ...) and return (never throws)
```

Design principles applied:
- **Zapier is not in this path.** Bellhouse talks to Estivor directly. Zapier stays scoped to `Ooma ⇄ Zapier ⇄ Estivor`, untouched by this work.
- **Adapter/service boundary.** `src/lib/leadIntake/` is the only place that knows about Estivor's shape. `ContactForm`, `LandingQuoteForm`, `ServiceHeroQuoteForm`, and the upload routes never import it directly or know it exists — they just call `processContactCore` as before.
- **Server-to-server only.** The Estivor API key is read from `process.env` inside a module that's only ever imported by server actions/routes; it can't reach a client bundle.
- **Preserves the working path.** Email is unconditional and unchanged. Estivor submission is additive and fire-and-forget, so an Estivor outage cannot cause a lead to be lost or delay the customer-facing success state.
- **Feature-flagged.** `LEAD_INTAKE_MODE` = `legacy` (default, no-op) | `dual-write` (send to Estivor alongside email, for validating the integration against real traffic) | `estivor-primary` (the mode to run in once Estivor is trusted, ahead of removing the Sheets plumbing — email still fires as a fallback per your stated preference).
- **Email stays as a fallback during the pilot**, as you asked — nothing here removes or gates it.

## 6. Proposed intake payload (`EstivorLeadPayload`, `src/lib/leadIntake/types.ts`)

**Fields sent today** (everything the site can currently, reliably collect):

| Field | Source |
|---|---|
| `submissionId` | `leadId` (UUID generated per submission) — also used as the idempotency key |
| `source` | constant `"bellhouse-website"` |
| `formName` | which form/variant submitted (`contact-form:default`, `contact-form:contractor`, `landing:<slug>`, `service-hero`) |
| `submittedAt` | ISO timestamp, server-side |
| `contact.name` / `contact.email` / `contact.phone` | form fields |
| `project.serviceType` | `workType` |
| `project.location` | service-hero form's dedicated location field (contractor/landing forms currently fold location into `message` — see "future fields" below) |
| `project.message` | free-text details |
| `consent.smsConsent` / `smsDisclosureShown` / `smsConsentAt` | existing SMS-consent audit trail |
| `attribution.utm*` (source/medium/campaign/content/term) | `LeadAttribution` |
| `attribution.gclid` / `gbraid` / `wbraid` / `fbclid` / `msclkid` | `LeadAttribution` |
| `attribution.leadSource` | derived: gclid/gbraid/wbraid → `google_ads`; fbclid → `meta_ads`; msclkid → `microsoft_ads`; else `utmSource`; else `referral` if a referrer exists; else `direct` |
| `attribution.initialLandingPageUrl` / `currentPageUrl` / `referrer` / `initialTimestamp` | `LeadAttribution` |
| `uploads[].originalName` / `status` / `signedUrl` | photo-upload flow, when present |

**Recommended future fields** (not sent today because the site doesn't reliably collect them yet — do not assume these exist until UI work adds them):
- Company name as a first-class field (currently only captured in the contractor variant's free-text message).
- Structured project location for the contact/landing forms (currently only service-hero has a dedicated `location` input; contractor/landing forms embed it in `message` text).
- A marketing-consent field distinct from SMS consent, if Estivor wants to segment those.
- Estimated job value / calculator output, if a calculator session is ever linked to a submitted lead (today calculators and lead forms are not connected — the calculator only links to `/contact`).
- A `pageUrl` served from the request itself (server-side) as a cross-check against the client-reported `attribution.currentPageUrl`.

## 7. Security, reliability, attribution

- **No secrets client-side**: `ESTIVOR_INTAKE_API_KEY` only exists in `src/lib/leadIntake/{config,estivorAdapter}.ts`, both server-only modules.
- **Schema validation both ways**: inbound form data is already zod-validated before it reaches `processContactCore`; outbound Estivor payloads are re-validated against `estivorLeadPayloadSchema` immediately before the network call, so a bad mapping fails closed (logs, doesn't throw) instead of sending garbage.
- **Timeout**: `AbortController`-based, `ESTIVOR_INTAKE_TIMEOUT_MS` (default 8s).
- **Retries**: up to `ESTIVOR_INTAKE_MAX_RETRIES` (default 2) with exponential backoff, only for network errors and 5xx; 4xx is not retried.
- **Idempotency**: `Idempotency-Key` header carries the same `leadId` used for the email and Sheets row, so a retried submission (or Estivor received-it-but-we-timed-out) can be de-duplicated by the intake API rather than the client.
- **Duplicate protection**: the site's own dedup check (`isDuplicateEntry`) is Sheets-based today and effectively inert (see §4); the recommendation is to let Estivor own de-duplication via `Idempotency-Key`/`submissionId` rather than re-implement it site-side.
- **Structured logging**: failures log through the existing `logMonitorEvent` pipeline with a new `ESTIVOR_SUBMIT_FAIL` event type, consistent with `SHEETS_FAIL` / `CONTACT_EMAIL_FAIL`.
- **Graceful failure**: `submitLeadToEstivorIntake()` is contractually non-throwing and fire-and-forget — an Estivor outage has zero effect on the customer's submit experience or on the email/Sheets paths.
- **Attribution preserved**: nothing about the existing GA4/gtag events or Google Ads conversion firing changed; the Estivor payload reuses the same `LeadAttribution` object already captured and validated for email/Sheets, so `Google/Ads/GBP/Referral → landing page → inquiry` stays traceable once Estivor is the one connecting inquiry → estimate → job → revenue.

## 8. Files changed / added

**Added:**
- `src/lib/leadIntake/config.ts` — mode + credential resolution from env vars
- `src/lib/leadIntake/types.ts` — canonical payload type + zod schema
- `src/lib/leadIntake/mapToEstivorPayload.ts` — `ContactData` → `EstivorLeadPayload`
- `src/lib/leadIntake/estivorAdapter.ts` — HTTP client (timeout, retry, idempotency)
- `src/lib/leadIntake/leadIntakeService.ts` — orchestrator called from `processContactCore`
- `src/lib/leadIntake/__tests__/mapToEstivorPayload.test.ts`, `config.test.ts`
- `.env.example` — documents every env var the app reads, including the new Estivor ones
- `docs/estivor-integration.md` — this document

**Modified:**
- `src/app/actions/contact.ts` — `ContactData` gains `formName`/`location`; `processContactCore` fires `submitLeadToEstivorIntake` alongside the existing Sheets call; `sendContactForm`/`sendServiceHeroForm` pass `formName` (and `location` for service-hero) through
- `src/lib/contact/contactValidation.ts` — `formName` added to the shared contact schema
- `src/lib/uploads/shared/uploadTypes.ts` — `formName` added to `QuoteUploadContactFields`
- `src/app/api/quote-upload/create-session/route.ts` — passes `formName` into the upload session payload
- `src/hooks/useQuoteSubmit.ts` — derives `formName` from the form variant/page slug already available to it
- `src/lib/monitor/eventLog.ts` — adds the `ESTIVOR_SUBMIT_FAIL` event type

No UI component changed its markup, validation behavior, or user-facing copy. No existing env var was renamed or removed.

## 9. Estivor-side API requirements this integration will depend on

Bellhouse is ready to call an endpoint shaped like:

```
POST {ESTIVOR_INTAKE_API_URL}
Authorization: Bearer {ESTIVOR_INTAKE_API_KEY}
Idempotency-Key: {submissionId}
X-Estivor-Workspace: {ESTIVOR_WORKSPACE_ID}   (optional, sent only if configured)
Content-Type: application/json

<EstivorLeadPayload JSON — see §6>
```

For this to go live, Estivor needs to provide:
- A production intake endpoint URL.
- A Bellhouse-scoped API key (or workspace/site credential) with write access to create Contact/Inquiry records.
- Confirmation of the response contract: what counts as success (2xx), what a duplicate-detected response looks like (so Bellhouse can tell "de-duped" apart from "failed" in logs), and whether idempotency is honored via the `Idempotency-Key` header or a body field instead.
- Confirmation of expected payload shape — the schema in `src/lib/leadIntake/types.ts` is Bellhouse's proposal based on what it can reliably send; Estivor may want field names adjusted, which is a one-file change (`mapToEstivorPayload.ts` + `types.ts`) once confirmed.

Nothing in this codebase invents or assumes an endpoint URL, API key, or response format — all of it is `process.env`-driven placeholders until real values exist.

## 10. Staged migration plan

| Stage | State | What's true |
|---|---|---|
| **1. Current state** (today) | `LEAD_INTAKE_MODE` unset | Email is the lead path. Sheets fails silently (see §4). No Estivor calls exist in code. |
| **2. Integration-ready state** (this change) | `LEAD_INTAKE_MODE` unset/`legacy` | Adapter, mapper, schema, and tests exist and are wired into `processContactCore`, but `shouldSubmitToEstivor()` is false with no credentials set, so this is a no-op in production. Safe to deploy immediately. |
| **3. Test / dual-write state** | `LEAD_INTAKE_MODE=dual-write` + real `ESTIVOR_INTAKE_API_URL`/`ESTIVOR_INTAKE_API_KEY` in a staging or low-traffic environment | Every lead still emails as before; each also attempts an Estivor submission, with failures visible via `ESTIVOR_SUBMIT_FAIL` monitor events. Use this stage to confirm payload shape and response handling against Estivor's real API before trusting it. |
| **4. Estivor production state** | `LEAD_INTAKE_MODE=estivor-primary` in production | Estivor is treated as the operational system of record for lead follow-up; email continues as the fallback safety net (per your stated preference), and Sheets can be left running or turned off per-request (`skipSheets`) without code changes. |
| **5. Removal of obsolete legacy plumbing** | Later, once Estivor has been trusted in production for a period you're comfortable with | Candidates to remove: the Sheets write/dedup path (`saveToGoogleSheets`, `isDuplicateEntry`, the `google-service-account.json` dependency), the unused `GOOGLE_SHEETS_API` env var, and — if Estivor's own alerting replaces it — the Brevo-webhook-to-Slack monitor path. Email notification is explicitly out of scope for removal per your stated preference to keep it. |

Each stage is a config change, not a code change — moving from stage 2 to 3 to 4 only requires setting env vars.
