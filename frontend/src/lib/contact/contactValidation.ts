import { z } from 'zod';

const spamKeywords = [
  'viagra',
  'free money',
  'buy followers',
  'SEO services',
  'bitcoin',
  'casino',
  'earn money fast',
  'cheap loans',
  'adult content',
];

const disposableDomains = [
  'tempmail.com',
  'mailinator.com',
  '10minutemail.com',
  'guerrillamail.com',
];

const phoneCharPattern = /^[0-9+()\-.\s]+$/;

export function isValidPhoneFormat(value: string) {
  const digitCount = (value.match(/\d/g) || []).length;
  return phoneCharPattern.test(value) && digitCount >= 7 && digitCount <= 15;
}

const attributionSchema = z
  .object({
    utmSource: z.string().max(300).optional(),
    utmMedium: z.string().max(300).optional(),
    utmCampaign: z.string().max(300).optional(),
    utmContent: z.string().max(300).optional(),
    utmTerm: z.string().max(300).optional(),
    gclid: z.string().max(300).optional(),
    gbraid: z.string().max(300).optional(),
    wbraid: z.string().max(300).optional(),
    fbclid: z.string().max(300).optional(),
    msclkid: z.string().max(300).optional(),
    initialLandingPage: z.string().max(500).optional(),
    referrer: z.string().max(500).optional(),
    initialTimestamp: z.string().max(80).optional(),
    currentPage: z.string().max(500).optional(),
    requestedService: z.string().max(300).optional(),
  })
  .optional();

const contactBaseObject = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone: z
      .string()
      .optional()
      .refine((value) => !value || isValidPhoneFormat(value), {
        message: 'Please enter a valid phone number',
      }),
    workType: z.string().min(2, 'Must have a work type'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    smsConsent: z.boolean().optional(),
    smsDisclosureShown: z.boolean().optional(),
    attribution: attributionSchema,
    honeypot: z.string().optional(),
    formName: z.string().max(100).optional(),
  })
;

function validateSmsConsent(
  data: z.infer<typeof contactBaseObject>,
  ctx: z.RefinementCtx,
) {
    const hasPhone = !!data.phone?.trim();
    if (hasPhone) {
      if (data.smsConsent !== true) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'SMS consent is required when a phone number is provided.',
          path: ['smsConsent'],
        });
      }

      if (data.smsDisclosureShown !== true) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'SMS disclosure must be shown when a phone number is provided.',
          path: ['smsDisclosureShown'],
        });
      }
    }
}

export const contactBaseSchema = contactBaseObject.superRefine(validateSmsConsent);

export const contactFormSchema = contactBaseObject
  .extend({
    token: z.string().min(1, 'Missing verification token.'),
  })
  .superRefine(validateSmsConsent);

export type ContactBaseInput = z.infer<typeof contactBaseSchema>;

export const serviceHeroFormSchema = z
  .object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Please enter a valid email address.').optional().or(z.literal('')),
    phone: z
      .string()
      .min(7, 'Phone number is required')
      .refine(isValidPhoneFormat, {
        message: 'Please enter a valid phone number',
      }),
    workType: z.string().min(2, 'Work type is required'),
    location: z.string().optional(),
    token: z.string().min(1, 'Missing verification token'),
    honeypot: z.string().optional(),
    smsConsent: z.boolean(),
    smsDisclosureShown: z.boolean(),
    attribution: attributionSchema,
  })
  .superRefine((data, ctx) => {
    if (data.smsConsent !== true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'SMS consent is required.',
        path: ['smsConsent'],
      });
    }
    if (data.smsDisclosureShown !== true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'SMS disclosure must be shown.',
        path: ['smsDisclosureShown'],
      });
    }
  });

export function isSpamMessage(message: string) {
  return spamKeywords.some((keyword) =>
    message.toLowerCase().includes(keyword.toLowerCase()),
  );
}

export function isDisposableEmail(email: string) {
  return disposableDomains.some((domain) =>
    email.toLowerCase().endsWith(`@${domain}`),
  );
}

export function hasHoneypotValue(value?: string) {
  return Boolean(value?.trim());
}

export function isSuspiciousContactInput(data: {
  email: string;
  message: string;
  honeypot?: string;
}) {
  return (
    hasHoneypotValue(data.honeypot) ||
    isSpamMessage(data.message) ||
    isDisposableEmail(data.email)
  );
}
