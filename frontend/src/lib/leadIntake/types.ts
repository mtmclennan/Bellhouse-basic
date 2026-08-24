import { z } from 'zod';

// Canonical payload Bellhouse sends to the Estivor intake API.
//
// Every field below is something the current site can reliably collect
// today. Fields Estivor would eventually want but the site does not yet
// capture (company name, structured project address, consent timestamps
// for email/marketing, a first-party click ID beyond Google/Meta/Bing,
// job-value estimates, etc.) are intentionally left out — see
// docs/estivor-integration.md for the "recommended future fields" list
// instead of guessing at a shape here.
export const estivorLeadPayloadSchema = z.object({
  submissionId: z.string().min(1), // == leadId; also the idempotency key
  source: z.literal('bellhouse-website'),
  formName: z.string().max(100).optional(),
  submittedAt: z.string().min(1), // ISO 8601

  contact: z.object({
    name: z.string().min(1),
    email: z.string().optional(),
    phone: z.string().optional(),
  }),

  project: z.object({
    serviceType: z.string().optional(),
    location: z.string().optional(),
    message: z.string().optional(),
  }),

  consent: z
    .object({
      smsConsent: z.boolean().optional(),
      smsDisclosureShown: z.boolean().optional(),
      smsConsentAt: z.string().optional(),
    })
    .optional(),

  attribution: z
    .object({
      utmSource: z.string().optional(),
      utmMedium: z.string().optional(),
      utmCampaign: z.string().optional(),
      utmContent: z.string().optional(),
      utmTerm: z.string().optional(),
      gclid: z.string().optional(),
      gbraid: z.string().optional(),
      wbraid: z.string().optional(),
      fbclid: z.string().optional(),
      msclkid: z.string().optional(),
      leadSource: z.string().optional(),
      initialLandingPageUrl: z.string().optional(),
      currentPageUrl: z.string().optional(),
      referrer: z.string().optional(),
      initialTimestamp: z.string().optional(),
    })
    .optional(),

  uploads: z
    .array(
      z.object({
        originalName: z.string(),
        status: z.string(),
        signedUrl: z.string().optional(),
      }),
    )
    .optional(),
});

export type EstivorLeadPayload = z.infer<typeof estivorLeadPayloadSchema>;

export type EstivorSubmitResult =
  | { ok: true; status: number }
  | { ok: false; reason: 'not_configured' }
  | { ok: false; reason: 'invalid_payload'; error: string }
  | { ok: false; reason: 'request_failed'; status?: number; error: string };
