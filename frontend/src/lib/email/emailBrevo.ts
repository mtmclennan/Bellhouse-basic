import { BrevoClient } from '@getbrevo/brevo';

type BrevoRecipient = { email: string; name?: string };

function required(name: string, value?: string) {
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

const BREVO_API_KEY = () =>
  required('BREVO_API_KEY', process.env.BREVO_API_KEY);

const EMAIL_FROM = () => required('EMAIL_FROM', process.env.EMAIL_FROM);

export function getBrevoClient() {
  // v4 uses BrevoClient with apiKey passed in config
  return new BrevoClient({
    apiKey: BREVO_API_KEY(),
    timeoutInSeconds: 30,
    maxRetries: 2,
  });
}

export async function sendBrevoEmail(opts: {
  subject: string;
  html: string;
  to: BrevoRecipient[];
  replyTo?: BrevoRecipient;
  tags?: string[];
}) {
  const brevo = getBrevoClient();

  return brevo.transactionalEmails.sendTransacEmail({
    subject: opts.subject,
    htmlContent: opts.html,
    sender: { email: EMAIL_FROM(), name: 'Bellhouse Excavating' },
    to: opts.to,
    replyTo: opts.replyTo
      ? { email: opts.replyTo.email, name: opts.replyTo.name }
      : undefined,
    tags: opts.tags?.length ? opts.tags : undefined,
  });
}
