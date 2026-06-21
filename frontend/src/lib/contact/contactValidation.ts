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

const contactBaseObject = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().optional(),
    workType: z.string().min(2, 'Must have a work type'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    smsConsent: z.boolean().optional(),
    smsDisclosureShown: z.boolean().optional(),
    honeypot: z.string().optional(),
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
    phone: z.string().min(7, 'Phone number is required'),
    workType: z.string().min(2, 'Work type is required'),
    location: z.string().optional(),
    token: z.string().min(1, 'Missing verification token'),
    honeypot: z.string().optional(),
    smsConsent: z.boolean(),
    smsDisclosureShown: z.boolean(),
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
