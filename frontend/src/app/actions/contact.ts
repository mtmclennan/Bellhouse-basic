'use server';

import { google } from 'googleapis';
import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';
import { logMonitorEvent } from '@/lib/monitor/eventLog';
import { sendBrevoEmail } from '@/lib/email/emailBrevo';
import {
  buildBusinessEmail,
  buildCustomerEmail,
} from '@/lib/email/contactEmailTemplates';

const isProduction = process.env.NODE_ENV === 'production';

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

// 📌 Spam Filtering
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

function isSpamMessage(message: string) {
  return spamKeywords.some((keyword) =>
    message.toLowerCase().includes(keyword.toLowerCase()),
  );
}

function isDisposableEmail(email: string) {
  const disposableDomains = [
    'tempmail.com',
    'mailinator.com',
    '10minutemail.com',
    'guerrillamail.com',
  ];
  return disposableDomains.some((domain) =>
    email.toLowerCase().endsWith(`@${domain}`),
  );
}

/**
 * ✅ Contact payload used across:
 * - real submissions
 * - synthetic monitor tests (processContactCore)
 */
export type ContactData = {
  name: string;
  email: string;
  phone?: string;
  workType: string;
  message: string;

  // ✅ SMS consent audit fields (optional)
  smsConsent?: boolean;
  smsDisclosureShown?: boolean;
  smsConsentAt?: string; // ISO timestamp
};

// 📌 Form Validation Schema (real submissions)
const formSchema = z
  .object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().optional(),
    workType: z.string().min(2, 'Must have a work type'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    token: z.string(),

    // ✅ new fields
    smsConsent: z.boolean().optional(),
    smsDisclosureShown: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    const hasPhone = !!data.phone?.trim();
    if (hasPhone) {
      // If they provided a phone, consent must be true
      if (data.smsConsent !== true) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'SMS consent is required when a phone number is provided.',
          path: ['smsConsent'],
        });
      }
      // Also: disclosure should have been shown if phone was provided
      if (data.smsDisclosureShown !== true) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'SMS disclosure must be shown when a phone number is provided.',
          path: ['smsDisclosureShown'],
        });
      }
    }
  });

/**
 * ✅ Shared “core” contact processing.
 * Use this for:
 * - real form submissions (after recaptcha)
 * - monitor synthetic checks (skip recaptcha, optionally skip sheets)
 */
export async function processContactCore(
  data: ContactData,
  opts?: {
    skipSheets?: boolean;
    businessToEmail?: string;
    customerToEmail?: string;
    subjectPrefix?: string;
  },
) {
  const RECIPIENT_EMAIL = mustEnv('RECIPIENT_EMAIL');

  const business = buildBusinessEmail(data);
  const customer = buildCustomerEmail(data);

  const businessTo = opts?.businessToEmail ?? RECIPIENT_EMAIL;
  const customerTo = opts?.customerToEmail ?? data.email;
  const subjectPrefix = opts?.subjectPrefix ?? '';

  try {
    if (!isProduction) {
      console.log('📧 Sending emails with Brevo...');
    }

    // 🔹 Save to Google Sheets in the background
    if (!opts?.skipSheets) {
      saveToGoogleSheets(data).catch((error) =>
        console.error('❌ Google Sheets error:', error),
      );
    }

    // 🔹 Send Emails in Parallel
    await Promise.all([
      sendBrevoEmail({
        subject: `${subjectPrefix}${business.subject}`,
        html: business.html,
        to: [{ email: businessTo }],
        replyTo: { email: data.email, name: data.name },
        tags: opts?.subjectPrefix ? ['monitor', 'form-check'] : undefined,
      }),
      sendBrevoEmail({
        subject: `${subjectPrefix}${customer.subject}`,
        html: customer.html,
        to: [{ email: customerTo, name: data.name }],
        tags: opts?.subjectPrefix ? ['monitor', 'form-check'] : undefined,
      }),
    ]);

    if (!isProduction) {
      console.log('✅ Emails sent successfully!');
    }
  } catch (err: any) {
    await logMonitorEvent({
      ts: new Date().toISOString(),
      type: 'CONTACT_EMAIL_FAIL',
      message: err?.message ?? 'Unknown Brevo error',
      meta: {
        workType: data.workType,
        fromEmail: data.email,
      },
    });

    console.error('❌ Email sending error:', {
      message: err?.message,
      status: err?.response?.status,
      data: err?.response?.data,
    });

    throw err;
  }
}

// 📌 Contact Form Submission Handler (real users)
export async function sendContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  workType: string;
  message: string;
  token: string;

  smsConsent?: boolean;
  smsDisclosureShown?: boolean;
}) {
  const RECAPTCHA_SECRET = mustEnv('RECAPTCHA_SECRET');

  // 🔹 Validate Form Data
  const parsed = formSchema.safeParse(data);
  if (!parsed.success) {
    return {
      error: parsed.error.errors[0]?.message || 'Invalid form submission.',
    };
  }

  // 🔹 basic spam heuristics
  if (isSpamMessage(data.message) || isDisposableEmail(data.email)) {
    return {
      error: 'Suspicious activity detected. Your request was not sent.',
    };
  }

  // 🔹 Verify reCAPTCHA
  const recaptchaVerify = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET}&response=${data.token}`,
    },
  );

  const recaptchaData = await recaptchaVerify.json();
  if (!recaptchaData.success || recaptchaData.score < 0.5) {
    return { error: 'Failed reCAPTCHA verification. Try again.' };
  }

  // ✅ record consent timestamp if phone present
  const hasPhone = !!data.phone?.trim();
  const smsConsentAt =
    hasPhone && data.smsConsent ? new Date().toISOString() : undefined;

  try {
    await processContactCore({
      name: data.name,
      email: data.email,
      phone: data.phone,
      workType: data.workType,
      message: data.message,

      smsConsent: hasPhone ? data.smsConsent : false,
      smsDisclosureShown: hasPhone ? data.smsDisclosureShown : false,
      smsConsentAt,
    });

    return { success: 'Estimate request sent successfully!' };
  } catch {
    return { error: 'Failed to send email. Please try again later.' };
  }
}

// 📊 Google Sheets Integration: Prevent Duplicate Submissions & Save Data
async function isDuplicateEntry(data: { email: string; workType: string }) {
  try {
    const keyFilePath = path.join(process.cwd(), 'google-service-account.json');
    const keyFile = await fs.readFile(keyFilePath, 'utf-8');
    const credentials = JSON.parse(keyFile);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = mustEnv('GOOGLE_SHEET_ID');
    const sheetName = 'BellhouseMessages';

    // Updated to A:I (we’re adding two columns)
    const range = `${sheetName}!A:I`;

    const sheetData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const existingEntries = sheetData.data.values || [];

    // NOTE: indexes assume your original column order still starts:
    // A name, B email, C phone, D workType...
    return existingEntries.some(
      (row) => row[1] === data.email && row[3] === data.workType,
    );
  } catch (error) {
    console.error('❌ Error checking duplicates:', error);
    return false;
  }
}

export async function saveToGoogleSheets(data: ContactData) {
  const GOOGLE_SHEET_ID = mustEnv('GOOGLE_SHEET_ID');

  try {
    // Duplicate check still only uses email + workType
    if (
      await isDuplicateEntry({ email: data.email, workType: data.workType })
    ) {
      if (!isProduction) {
        console.log('⚠️ Duplicate submission detected. Skipping save.');
      }
      return;
    }

    const keyFilePath = path.join(process.cwd(), 'google-service-account.json');
    const keyFile = await fs.readFile(keyFilePath, 'utf-8');
    const credentials = JSON.parse(keyFile);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = GOOGLE_SHEET_ID;
    const sheetName = 'BellhouseMessages';

    // Updated to A:I (adds H + I)
    const range = `${sheetName}!A:I`;

    const formattedDateTime = new Date().toLocaleString();

    // ✅ New columns:
    // H: smsConsent (TRUE/FALSE)
    // I: smsConsentAt (ISO timestamp)
    const values = [
      [
        data.name,
        data.email,
        data.phone || '',
        data.workType,
        data.message,
        formattedDateTime,
        'New',
        data.smsConsent ? 'TRUE' : 'FALSE',
        data.smsConsentAt || '',
      ],
    ];

    if (!isProduction) {
      console.log('Sheets client_email:', credentials.client_email);
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    if (!isProduction) {
      console.log('✅ Data successfully added to Google Sheets!');
    }
  } catch (error) {
    await logMonitorEvent({
      ts: new Date().toISOString(),
      type: 'SHEETS_FAIL',
      message: (error as any)?.message ?? 'Unknown Sheets error',
      meta: { email: data.email, workType: data.workType },
    });

    console.error('❌ Google Sheets error:', error);
  }
}
