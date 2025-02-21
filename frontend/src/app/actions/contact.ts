'use server';

import { google } from 'googleapis';
import { promises as fs } from 'fs';
import nodemailer from 'nodemailer';
import path from 'path';
import { z } from 'zod';

const isProduction = process.env.NODE_ENV === 'production';

// 📌 Form Validation Schema
const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  workType: z.string().min(2, 'Must have a work type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  token: z.string(),
});

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
    message.toLowerCase().includes(keyword)
  );
}

function isDisposableEmail(email: string) {
  const disposableDomains = [
    'tempmail.com',
    'mailinator.com',
    '10minutemail.com',
    'guerrillamail.com',
  ];
  return disposableDomains.some((domain) => email.endsWith(`@${domain}`));
}

// 📌 Contact Form Submission Handler
export async function sendContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  workType: string;
  message: string;
  token: string;
}) {
  // 🔹 Validate Form Data
  const parsed = formSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  if (isSpamMessage(data.message) || isDisposableEmail(data.email)) {
    return {
      error: 'Suspicious activity detected. Your request was not sent.',
    };
  }

  // 🔹 Verify reCAPTCHA on the Server
  const recaptchaVerify = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET}&response=${data.token}`,
    }
  );

  const recaptchaData = await recaptchaVerify.json();
  if (!recaptchaData.success || recaptchaData.score < 0.5) {
    return { error: 'Failed reCAPTCHA verification. Try again.' };
  }

  // 🔹 Configure Mailtrap SMTP Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: parseInt(process.env.MAILTRAP_PORT || '587'),
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  // 🔹 Define Email Messages
  const businessMailOptions = {
    from: process.env.EMAIL_FROM,
    to: `${process.env.RECIPIENT_EMAIL}, ${process.env.BOSS_EMAIL}`,
    subject: `New ${data.workType} Estimate Request`,
    text: `New Estimate Request

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}

Service Requested: ${data.workType}

Message:
${data.message || 'No additional details provided.'}

Submitted on: ${new Date().toLocaleString()}

Please follow up with the customer as soon as possible.

Best,  
Bellhouse Excavating Website`,
  };

  const customerMailOptions = {
    from: process.env.EMAIL_FROM,
    to: data.email,
    subject: `We Received Your Request for ${data.workType}!`,
    text: `Hello ${data.name},

Thank you for reaching out to Bellhouse Excavating. We’ve received your message and will get back to you as soon as possible.

Our team typically responds within 24 hours, but if your request is urgent, please call us at 519-752-8500.

In the meantime, you can explore our services here: https://bellhouseexcavating.ca

We appreciate your interest and look forward to assisting you.

Best regards,  
The Bellhouse Excavating Team  
📞 519-752-8500  
📧 info@bellhouseexcavating.ca  
🌐 https://bellhouseexcavating.ca`,
  };

  try {
    if (!isProduction) {
      console.log('📧 Sending emails with Mailtrap...');
    }

    // 🔹 Send Emails in Parallel
    const emailPromise = Promise.all([
      transporter.sendMail(businessMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);

    // 🔹 Save to Google Sheets **in the background** (doesn't block response)
    saveToGoogleSheets(data).catch((error) =>
      console.error('❌ Google Sheets error:', error)
    );

    // 🔹 Wait for emails to finish sending
    await emailPromise;

    if (!isProduction) {
      console.log('✅ Emails sent successfully!');
    }

    return { success: 'Estimate request sent successfully!' };
  } catch (error) {
    console.error('❌ Email sending error:', error);
    return { error: 'Failed to send email. Please try again later.' };
  }
}

// 📊 Google Sheets Integration: Prevent Duplicate Submissions & Save Data
async function isDuplicateEntry(data: { email: string; workType: string }) {
  try {
    // 🔹 Load Google Service Account Key
    const keyFilePath = path.join(process.cwd(), 'google-service-account.json');
    const keyFile = await fs.readFile(keyFilePath, 'utf-8');
    const credentials = JSON.parse(keyFile);

    // 🔹 Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = 'BellhouseMessages';
    const range = `${sheetName}!A:G`; // Fetch all data

    const sheetData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const existingEntries = sheetData.data.values || [];

    return existingEntries.some(
      (row) => row[1] === data.email && row[3] === data.workType
    );
  } catch (error) {
    console.error('❌ Error checking duplicates:', error);
    return false; // Fail-safe: Allow saving if an error occurs
  }
}

export async function saveToGoogleSheets(data: {
  name: string;
  email: string;
  phone?: string;
  workType: string;
  message: string;
}) {
  try {
    if (await isDuplicateEntry(data)) {
      if (!isProduction) {
        console.log('⚠️ Duplicate submission detected. Skipping save.');
      }
      return;
    }

    // 🔹 Load Google Service Account Key
    const keyFilePath = path.join(process.cwd(), 'google-service-account.json');
    const keyFile = await fs.readFile(keyFilePath, 'utf-8');
    const credentials = JSON.parse(keyFile);

    // 🔹 Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = 'BellhouseMessages';
    const range = `${sheetName}!A:G`; // Columns A to G

    // 🔹 Prepare Data for Google Sheets
    const formattedDateTime = new Date().toLocaleString();
    const values = [
      [
        data.name,
        data.email,
        data.phone || '',
        data.workType,
        data.message,
        formattedDateTime,
        'New', // Default status
      ],
    ];

    // 🔹 Append Data to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: { values },
    });
    if (!isProduction) {
      console.log(isProduction || process.env.NODE_ENV);
      console.log('✅ Data successfully added to Google Sheets!');
    }
  } catch (error) {
    console.error('❌ Google Sheets error:', error);
  }
}
