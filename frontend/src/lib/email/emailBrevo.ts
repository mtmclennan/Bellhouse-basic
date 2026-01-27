import * as Brevo from '@getbrevo/brevo';

type BrevoRecipient = { email: string; name?: string };

function required(name: string, value?: string) {
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

const BREVO_API_KEY = () =>
  required('BREVO_API_KEY', process.env.BREVO_API_KEY);
const EMAIL_FROM = () => required('EMAIL_FROM', process.env.EMAIL_FROM);

export function getBrevoClient() {
  const api = new Brevo.TransactionalEmailsApi();
  api.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, BREVO_API_KEY());
  return api;
}

export async function sendBrevoEmail(opts: {
  subject: string;
  html: string;
  to: BrevoRecipient[];
  replyTo?: BrevoRecipient;
  tags?: string[]; // ✅ add this
}) {
  const api = getBrevoClient();

  const email = new Brevo.SendSmtpEmail();
  email.subject = opts.subject;
  email.htmlContent = opts.html;
  email.sender = { email: EMAIL_FROM(), name: 'Bellhouse Excavating' };
  email.to = opts.to;

  if (opts.replyTo) {
    email.replyTo = { email: opts.replyTo.email, name: opts.replyTo.name };
  }

  if (opts.tags?.length) {
    email.tags = opts.tags;
  }

  return api.sendTransacEmail(email);
}
