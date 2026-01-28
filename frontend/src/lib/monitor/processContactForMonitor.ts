import { sendBrevoEmail } from '@/lib/email/emailBrevo';
import {
  buildBusinessEmail,
  buildCustomerEmail,
} from '@/lib/email/contactEmailTemplates';
import { saveToGoogleSheets } from '@/app/actions/contact'; // if this import is messy, we’ll duplicate sheets logic here

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export async function processContactForMonitor(nowIso: string) {
  const RECIPIENT_EMAIL = mustEnv('RECIPIENT_EMAIL');
  const MONITOR_TO_EMAIL = mustEnv('MONITOR_TO_EMAIL');

  const data = {
    name: 'Monitor Bot',
    email: MONITOR_TO_EMAIL, // customer copy goes here (safe)
    phone: '',
    workType: 'Monitor Test',
    message: `Synthetic form test at ${nowIso}. If you see this, the contact pipeline is alive.`,
  };

  const business = buildBusinessEmail(data);
  const customer = buildCustomerEmail(data);

  // Optional: you can skip sheets here if you don’t want noise in your sheet.
  // If you DO want to test sheets too, keep this on.
  saveToGoogleSheets(data).catch((error) =>
    console.error('❌ Google Sheets error:', error),
  );

  const brevo = await Promise.all([
    sendBrevoEmail({
      subject: `[MONITOR TEST] ${business.subject}`,
      html: business.html,
      to: [{ email: RECIPIENT_EMAIL }],
      replyTo: { email: data.email, name: data.name },
      tags: ['monitor', 'form-check'],
    }),
    sendBrevoEmail({
      subject: `[MONITOR TEST] ${customer.subject}`,
      html: customer.html,
      to: [{ email: data.email, name: data.name }],
      tags: ['monitor', 'form-check'],
    }),
  ]);

  return { brevo };
}
