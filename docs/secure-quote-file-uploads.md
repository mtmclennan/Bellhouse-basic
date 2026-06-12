# Secure Quote File Upload Architecture

Date reviewed: 2026-06-11
Phase 1 implemented: 2026-06-11

## Scope

Bellhouse Phase 1 supports optional jobsite photo uploads on quote/contact forms. Phase 1 is image-only.

Allowed user-selected files:

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- `.heic`
- `.heif`

Allowed server-side final uploads:

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`

HEIC/HEIF files are accepted only as user-selected browser input and must be converted to JPEG before upload. The server rejects HEIC/HEIF if they still arrive.

Phase 1 does not support PDFs, documents, ZIPs, SVGs, CAD files, Office files, executables, archives, or unknown formats. Do not add those types without a separate review.

## Current Bellhouse Form Flow

- Main contact form UI: `frontend/src/app/components/forms/ContactForm.tsx`
- Landing page quote form UI: `frontend/src/components/landing/LandingQuoteForm.tsx`
- Submission handler: `frontend/src/app/actions/contact.ts`
- Email sender: `frontend/src/lib/email/emailBrevo.ts`
- Email templates: `frontend/src/lib/email/contactEmailTemplates.ts`
- Google Sheets append logic: `saveToGoogleSheets` in `frontend/src/app/actions/contact.ts`

Current behavior:

1. The contact and landing forms call the `sendContactForm` server action.
2. `sendContactForm` validates lead fields with Zod.
3. It checks a small spam keyword/disposable email list.
4. It verifies Google reCAPTCHA v3 server-side.
5. It calls `processContactCore`.
6. `processContactCore` sends one internal Brevo email and one customer Brevo email.
7. It appends the lead to the `BellhouseMessages` Google Sheet asynchronously unless `skipSheets` is passed.

Important current gap:

- Phase 1 now adds real image upload handling for the main contact form and landing quote forms.
- The no-photo path still uses the existing `sendContactForm` server action.
- The photo path uses dedicated upload API routes, private R2 storage, server-side validation, `sharp` re-encoding, and expiring signed links.

## Recommended Architecture

Use a quarantine-first workflow with private object storage. Phase 1 processes images synchronously during quote finalization and does not run ClamAV.

Recommended provider path:

- Phase 1 implementation: Cloudflare R2 private bucket, Cloudflare Turnstile validation before issuing upload URLs, and direct browser PUTs to short-lived presigned quarantine URLs.
- Future document/PDF support would require a separate malware scanning workflow before launch.

Why R2 first:

- Bellhouse likely benefits from simple S3-compatible private object storage without public bucket URLs.
- R2 supports presigned URLs for temporary GET/PUT access, object lifecycle rules for retention cleanup, and event notifications to queues when bucket objects change.
- It pairs naturally with Cloudflare Turnstile and Cloudflare WAF/rate-limiting if the site is already behind Cloudflare.

Phase 1 launch blocker:

- Do not enable photo uploads until R2 credentials, Turnstile keys, R2 CORS rules, private bucket policy, and lifecycle cleanup are configured in production.

## Data Model

Add explicit upload metadata separate from the existing `ContactData`.

Suggested types:

```ts
type UploadScanStatus =
  | 'pending'
  | 'clean'
  | 'rejected'
  | 'infected'
  | 'scan_failed';

type LeadUploadMetadata = {
  id: string;
  leadId: string;
  storageKey: string;
  cleanStorageKey?: string;
  sanitizedOriginalName: string;
  detectedType: 'image/jpeg' | 'image/png' | 'image/webp';
  extension: 'jpg' | 'jpeg' | 'png' | 'webp';
  sizeBytes: number;
  sha256: string;
  scanStatus: UploadScanStatus;
  rejectionReason?: string;
  uploadedAt: string;
  scannedAt?: string;
};
```

For durable metadata, prefer a small database table over Google Sheets as the system of record. Google Sheets can receive a readable summary, but it should not be the only place that tracks object keys, scan state, and cleanup status.

If a database is not yet available, use a managed option such as Supabase Postgres, Neon, or Turso for upload metadata before launch. Avoid relying on local files in a serverless deployment.

## Upload Flow

1. Customer fills the quote/contact form. Files are optional.
2. Client performs UX-only checks:
   - Maximum 3 files.
   - Maximum 5 MB per file.
   - Maximum 15 MB total.
   - Accepted extensions shown as JPG, PNG, WEBP, or iPhone HEIC photos.
3. Client converts HEIC/HEIF to JPEG before upload. The original HEIC file is not uploaded.
4. Server validates lead fields, honeypot, rate limits, and Turnstile before issuing upload URLs.
5. Server creates a lead/session ID and generated upload IDs.
6. Server returns short-lived presigned PUT URLs for private R2 quarantine objects.
7. Browser uploads normalized JPG/PNG/WEBP files directly to R2 quarantine.
8. Finalize route verifies uploaded objects exist and validates each file one at a time:
   - Count and size limits.
   - Sanitized original display name.
   - Extension allowlist.
   - Magic byte rules for JPEG, PNG, and WEBP.
   - Browser-provided MIME and extension are not trusted.
9. Server re-encodes each clean image with `sharp`, strips metadata, resizes to max 2400px, and writes a cleaned JPEG:
   - `quote-uploads/clean/{year}/{month}/{leadId}/{uploadId}.jpg`
10. Server deletes quarantine originals after processing where possible.
11. `processContactCore` sends internal email without attachments:
   - Includes sanitized filenames, statuses, and expiring signed links to cleaned images.
   - If an image fails validation/processing, the lead still sends and the email records the image failure.
12. Google Sheets receives lead fields plus upload metadata summary:
   - File count.
   - Sanitized original file names.
   - Types and sizes.
   - Scan statuses.
   - Signed links only when clean and short-lived, or internal file IDs instead.

## Validation Rules

Allowed:

- JPEG: `.jpg`, `.jpeg`, magic bytes `FF D8 FF`
- PNG: `.png`, magic bytes `89 50 4E 47 0D 0A 1A 0A`
- WEBP: `.webp`, RIFF container with WEBP signature

Rejected:

- PDFs, archives, executables, scripts, HTML/SVG, Office documents, CAD files, HEIC/HEIF on the server, unknown types, files with mismatched extension/content, empty files, and files over limits.

Do not trust:

- `file.type`
- `Content-Type`
- Original filename
- Extension alone
- Client-side validation

## Storage Layout

Use one private bucket, or separate private buckets if the provider makes policies clearer.

Suggested prefixes:

- `quote-uploads/quarantine/{yyyy}/{mm}/{leadId}/{uploadId}.{ext}`
- `quote-uploads/clean/{yyyy}/{mm}/{leadId}/{uploadId}.jpg`
- rejected files should be deleted or left only for short lifecycle expiry.

Bucket rules:

- No public listing.
- No permanent public URLs.
- No files in `public/`.
- No files in the Next.js app directory.
- Short signed GET links for internal review only, recommended 15 minutes to 24 hours depending on workflow.
- CORS only for the Bellhouse production domain if direct browser-to-storage upload is used.

## Server/API Shape

The current `sendContactForm` server action takes JSON-like lead fields and is not suitable for trusted file processing by itself.

Phase 1 implementation shape:

- Keep `processContactCore` as the shared lead notification function, but extend it to accept sanitized upload metadata.
- `POST /api/quote-upload/create-session` validates lead fields and Turnstile, then creates private R2 quarantine PUT URLs.
- Browser uploads normalized image files directly to R2 quarantine.
- `POST /api/quote-upload/finalize` fetches, validates, re-encodes, stores cleaned JPEGs, deletes quarantine originals, and sends the lead email.

Rate limiting should happen before body parsing where possible. If infrastructure cannot reject large bodies at the edge, configure platform body limits and fail early.

## Malware Scanning

Phase 1 intentionally does not use ClamAV and does not allow PDFs or documents.

The Phase 1 risk reduction comes from:

- image-only allowlist
- client-side HEIC conversion
- server-side HEIC rejection
- magic-byte validation
- server-side image decode and re-encode
- metadata stripping
- private storage
- expiring signed links

If Bellhouse later wants PDFs or documents, add malware scanning first.

## Image Sanitization

Use existing `sharp` dependency server-side for images.

Rules:

- Decode and re-encode every accepted image.
- Strip metadata/EXIF/GPS.
- Normalize output format based on original or site preference.
- Set max dimensions if needed to reduce storage abuse.
- Store clean derivative separately from the original quarantine object.
- Link the clean derivative for internal review, not the raw original, unless the original is needed and scanned.

## Future PDF Handling

PDFs are not part of Phase 1. Future PDF support would require:

- Scan every PDF.
- Keep PDFs private.
- Do not inline PDFs publicly.
- Do not generate thumbnails unless using a hardened sandboxed renderer.
- Signed internal download links only after clean scan.
- Mark PDFs higher risk in internal email copy.

## Email Changes

Update `ContactPayload` to include optional sanitized upload summaries, not file bytes.

Internal Brevo email should include:

- File count.
- Sanitized original filenames.
- File type and size.
- Scan status.
- Rejection reason where applicable.
- Short signed internal links only for clean files.
- Clear copy when files are pending scan.

Customer email should not include upload links. It can say:

- "We received your request. If files were included, Bellhouse will use them only to review and respond to your request."

Never attach uploads to Brevo emails.

## Google Sheets Changes

Current sheet range is `BellhouseMessages!A:I`. Add columns only after confirming the existing sheet headers.

Suggested added columns:

- Lead ID
- Upload count
- Upload filenames
- Upload statuses
- Upload types/sizes
- Internal upload IDs
- Signed link summary, if clean and short-lived

Prefer storing internal upload IDs or storage keys over signed URLs. If signed URLs are saved, assume they expire and are only a convenience snapshot.

## Spam and Abuse Controls

Keep the current server-side reCAPTCHA verification until a replacement is approved.

Recommended upgrade:

- Move to Cloudflare Turnstile if Bellhouse is already using Cloudflare. Turnstile requires server-side Siteverify validation; client widget alone is not enough.
- Add a honeypot field to all quote forms.
- Add server-side rate limiting by:
  - IP address.
  - Email.
  - Phone.
  - Failed upload attempts.
  - `leadId`/upload-intent abuse.
- Reject file uploads unless core lead fields are valid.
- Do not provide standalone anonymous upload endpoints.
- Add WAF rules for known abusive countries/ASNs/user agents if abuse appears.
- Log rejected attempts without logging file contents.

## User-Facing UX Copy

Helper:

> Upload up to 3 jobsite photos that help us understand the work area, access, and existing conditions.

Accepted files:

> JPG, PNG, WEBP, or iPhone HEIC photos. Max 5 MB per photo.

Privacy note:

> Uploaded files are used only to review and respond to your request.

Failure message:

> We could not upload those files safely. You can still submit the form without files and text photos to 519-752-8500 if needed.

## Environment Variables

Existing:

- `RECIPIENT_EMAIL`
- `BREVO_API_KEY`
- `EMAIL_FROM`
- `RECAPTCHA_SECRET`
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `GOOGLE_SHEET_ID`
- `MONITOR_TOKEN`
- `MONITOR_TO_EMAIL`

New for R2 path:

- `UPLOADS_ENABLED`
- `UPLOAD_BUCKET_PROVIDER=r2`
- `R2_ACCOUNT_ID`
- `R2_BUCKET_NAME`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_ENDPOINT`
- `UPLOAD_SIGNED_URL_TTL_SECONDS`
- `UPLOAD_MAX_FILES=3`
- `UPLOAD_MAX_FILE_SIZE_MB=5`
- `UPLOAD_TOTAL_MAX_SIZE_MB=15`
- `UPLOAD_ALLOWED_ORIGIN`
- `UPLOAD_METADATA_DATABASE_URL`
- `UPLOAD_SCAN_WEBHOOK_SECRET`
- `UPLOAD_SCAN_QUEUE_NAME`
- `UPLOAD_RETENTION_DAYS`
- `UPLOAD_QUARANTINE_RETENTION_HOURS`
- `UPLOAD_REJECTED_RETENTION_HOURS`

If using Turnstile:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

Optional:

- `UPLOAD_SESSION_SECRET` if the in-memory upload session store is replaced with signed stateless tokens later.

## New Packages and Services

Likely packages:

- `@aws-sdk/client-s3`
- `@aws-sdk/s3-request-presigner`
- `heic-to` for browser HEIC/HEIF conversion
- built-in magic-byte checks for JPEG, PNG, and WEBP
- built-in `crypto.randomUUID`
- A rate-limit store client such as Redis/Upstash, depending on hosting

Existing useful package:

- `sharp` is already installed and should be used for image re-encoding.

Services:

- Private object storage: Cloudflare R2 or AWS S3.
- Metadata database: Supabase Postgres, Neon, Turso, or equivalent.
- Scanner: not used in Phase 1 image-only implementation.
- Queue/event workflow: not used in Phase 1.
- Bot/rate limiting: Cloudflare Turnstile, WAF/rate limiting, and server-side rate limit store.

## Retention

Recommended defaults:

- Abandoned quarantine uploads: delete after 24 hours with R2 lifecycle rules.
- Rejected files: delete immediately where possible; otherwise expire within 24 hours.
- Clean quote uploads: delete after 180 days unless Bellhouse chooses a shorter business retention period.
- Metadata: keep lead metadata with the lead record, but remove expired signed URLs.

Use bucket lifecycle rules where possible, plus an application cleanup job for metadata.

## Risk Register

| Risk | Mitigation |
| --- | --- |
| Public exposure of uploaded files | Private bucket only, no public listing, signed internal links only |
| Malware or unsafe image upload | Quarantine-first storage, image-only allowlist, magic-byte validation, `sharp` decode/re-encode, no links until cleaned |
| Spoofed MIME or extension | Server-side magic-byte validation and strict allowlist |
| Dangerous formats | Explicitly reject PDFs, archives, executables, scripts, Office files, CAD files, SVG, and server-side HEIC/HEIF |
| Storage abuse | File count/size limits, total submission cap, rate limiting, lifecycle cleanup |
| Email compromise through attachments | Never attach files to email |
| EXIF/GPS privacy leakage | Re-encode images and strip metadata |
| PDF active content risk | PDFs are not accepted in Phase 1 |
| Predictable paths | UUID/random object keys, no user filenames in paths |
| Spam submissions | reCAPTCHA/Turnstile, honeypot, field validation, IP/email/phone rate limits |
| Incomplete scans | `pending`/`scan_failed` statuses; no signed links until clean |
| Sensitive logging | Log metadata and reasons only; never log file contents |
| Stale files | Lifecycle rules and cleanup jobs |

## Implementation Plan

1. Completed: Add shared upload constants.
2. Completed: Add client-side image selection/validation and HEIC conversion.
3. Completed: Add R2 helper and environment variable validation.
4. Completed: Add create-session route.
5. Completed: Add direct upload to R2 quarantine.
6. Completed: Add finalize route with server-side validation and sharp processing.
7. Completed: Integrate final metadata into Brevo email and Google Sheets.
8. Completed: Add cleanup/lifecycle documentation.
9. Production setup required: configure R2 bucket, CORS, private access, lifecycle rules, and Turnstile keys.
10. Manual QA required with real R2/Turnstile credentials and iPhone HEIC files.

## Acceptance Checklist

- No uploads stored in `public/`.
- No uploads stored inside the Next.js app directory.
- No permanent public upload URLs.
- No uploaded files emailed as attachments.
- Server rejects disallowed extensions.
- Server rejects spoofed MIME/content-type files.
- Server rejects wrong magic bytes.
- Server rejects files over 5 MB.
- Server rejects more than 3 files.
- Server rejects submissions over 15 MB total.
- Files are renamed with UUID/random IDs.
- Original filenames are sanitized and stored as metadata only.
- Files are private by default.
- Images are re-encoded and metadata-stripped before review links are sent.
- PDFs are rejected.
- Form submits without files.
- Internal email includes file status and safe links only.
- Google Sheets stores metadata safely.
- Rate limiting and bot protection are active.
- Cleanup/retention rules are active.

## References Checked

- Cloudflare R2 presigned URLs: https://developers.cloudflare.com/r2/api/s3/presigned-urls/
- Cloudflare R2 lifecycle rules: https://developers.cloudflare.com/r2/buckets/object-lifecycles/
- Cloudflare R2 event notifications: https://developers.cloudflare.com/r2/buckets/event-notifications/
- Cloudflare Turnstile server-side validation: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- AWS GuardDuty Malware Protection for S3: https://docs.aws.amazon.com/guardduty/latest/ug/gdu-malware-protection-s3.html
- ClamAV scanning: https://docs.clamav.net/manual/Usage/Scanning.html
