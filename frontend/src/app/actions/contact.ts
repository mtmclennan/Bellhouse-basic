'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { logMonitorEvent } from '@/lib/monitor/eventLog';
import { sendBrevoEmail } from '@/lib/email/emailBrevo';
import {
  buildBusinessEmail,
  buildCustomerEmail,
} from '@/lib/email/contactEmailTemplates';
import {
  contactFormSchema,
  isSuspiciousContactInput,
} from '@/lib/contact/contactValidation';
import type { QuoteUploadEmailFile } from '@/lib/uploads/shared/uploadTypes';

const isProduction = process.env.NODE_ENV === 'production';

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

async function getGoogleSheetsClient(credentials: Record<string, unknown>) {
  const { google } = await import('googleapis');

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

export type ContactData = {
  name: string;
  email: string;
  phone?: string;
  workType: string;
  message: string;
  smsConsent?: boolean;
  smsDisclosureShown?: boolean;
  smsConsentAt?: string;
  leadId?: string;
  uploads?: QuoteUploadEmailFile[];
  uploadLinkExpiryNote?: string;
};

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
      console.log('Sending emails with Brevo...');
    }

    if (!opts?.skipSheets) {
      saveToGoogleSheets(data).catch((error) =>
        console.error('Google Sheets error:', error),
      );
    }

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
      console.log('Emails sent successfully.');
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

    console.error('Email sending error:', {
      message: err?.message,
      status: err?.response?.status,
      data: err?.response?.data,
    });

    throw err;
  }
}

export async function sendContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  workType: string;
  message: string;
  token: string;
  smsConsent?: boolean;
  smsDisclosureShown?: boolean;
  honeypot?: string;
}) {
  const RECAPTCHA_SECRET = mustEnv('RECAPTCHA_SECRET');

  const parsed = contactFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      error: parsed.error.errors[0]?.message || 'Invalid form submission.',
    };
  }

  if (isSuspiciousContactInput(data)) {
    return {
      error: 'Suspicious activity detected. Your request was not sent.',
    };
  }

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

    return { success: 'Estimate request sent successfully.' };
  } catch {
    return { error: 'Failed to send email. Please try again later.' };
  }
}

async function isDuplicateEntry(data: { email: string; workType: string }) {
  try {
    const keyFilePath = path.join(process.cwd(), 'google-service-account.json');
    const keyFile = await fs.readFile(keyFilePath, 'utf-8');
    const credentials = JSON.parse(keyFile);
    const sheets = await getGoogleSheetsClient(credentials);

    const spreadsheetId = mustEnv('GOOGLE_SHEET_ID');
    const sheetName = 'BellhouseMessages';
    const range = `${sheetName}!A:N`;

    const sheetData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const existingEntries = sheetData.data.values || [];

    return existingEntries.some(
      (row) => row[1] === data.email && row[3] === data.workType,
    );
  } catch (error) {
    console.error('Error checking duplicates:', error);
    return false;
  }
}

export async function saveToGoogleSheets(data: ContactData) {
  const GOOGLE_SHEET_ID = mustEnv('GOOGLE_SHEET_ID');

  try {
    if (
      await isDuplicateEntry({ email: data.email, workType: data.workType })
    ) {
      if (!isProduction) {
        console.log('Duplicate submission detected. Skipping save.');
      }
      return;
    }

    const keyFilePath = path.join(process.cwd(), 'google-service-account.json');
    const keyFile = await fs.readFile(keyFilePath, 'utf-8');
    const credentials = JSON.parse(keyFile);
    const sheets = await getGoogleSheetsClient(credentials);

    const spreadsheetId = GOOGLE_SHEET_ID;
    const sheetName = 'BellhouseMessages';
    const range = `${sheetName}!A:N`;

    const formattedDateTime = new Date().toLocaleString();
    const uploads = data.uploads ?? [];
    const uploadedFileNames = uploads
      .map((upload) => upload.originalName)
      .join(', ');
    const uploadStatuses = uploads
      .map((upload) => `${upload.originalName}: ${upload.status}`)
      .join('; ');
    const cleanStorageKeys = uploads
      .map((upload) => upload.cleanStorageKey)
      .filter(Boolean)
      .join(', ');

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
        data.leadId || '',
        uploads.length ? String(uploads.length) : '0',
        uploadedFileNames,
        uploadStatuses,
        cleanStorageKeys,
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
      console.log('Data successfully added to Google Sheets.');
    }
  } catch (error) {
    await logMonitorEvent({
      ts: new Date().toISOString(),
      type: 'SHEETS_FAIL',
      message: (error as any)?.message ?? 'Unknown Sheets error',
      meta: { email: data.email, workType: data.workType },
    });

    console.error('Google Sheets error:', error);
  }
}
