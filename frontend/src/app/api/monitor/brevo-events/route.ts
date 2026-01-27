import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function required(name: string, value?: string) {
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

const WEBHOOK_TOKEN = () =>
  required('BREVO_WEBHOOK_TOKEN', process.env.BREVO_WEBHOOK_TOKEN);

const SLACK_WEBHOOK_URL = () =>
  required('SLACK_WEBHOOK_URL', process.env.SLACK_WEBHOOK_URL);

const BAD_EVENTS = new Set([
  'blocked',
  'bounce',
  'hardBounce',
  'softBounce',
  'invalid',
  'spam',
  'deferred',
  'error',
]);

function isMonitorEvent(payload: any): boolean {
  const tags: string[] = Array.isArray(payload?.tags) ? payload.tags : [];
  if (tags.includes('monitor') || tags.includes('daily-check')) return true;

  const subject = String(payload?.subject ?? '');
  if (subject.toLowerCase().includes('daily email test')) return true;

  return false;
}

async function slackAlert(text: string) {
  await fetch(SLACK_WEBHOOK_URL(), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ text }),
  });
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!token || token !== WEBHOOK_TOKEN()) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON' },
      { status: 400 },
    );
  }

  const events = Array.isArray(body) ? body : [body];
  const alerts: string[] = [];

  for (const e of events) {
    const eventName = String(
      e?.event ?? e?.type ?? e?.['message-event'] ?? '',
    ).trim();
    if (!eventName) continue;

    if (!isMonitorEvent(e)) continue;
    if (!BAD_EVENTS.has(eventName)) continue;

    const email = e?.email || e?.recipient || 'unknown-recipient';
    const subject = e?.subject || 'unknown-subject';
    const reason = e?.reason || e?.message || e?.error || 'unknown-reason';
    const messageId =
      e?.messageId || e?.['message-id'] || e?.id || 'unknown-id';

    alerts.push(
      `🚨 Brevo monitor email FAILED\n` +
        `Event: ${eventName}\n` +
        `To: ${email}\n` +
        `Subject: ${subject}\n` +
        `MessageId: ${messageId}\n` +
        `Reason: ${reason}`,
    );
  }

  let alerted = 0;
  for (const msg of alerts) {
    try {
      await slackAlert(msg);
      alerted++;
    } catch {
      // Slack can have feelings too, apparently.
    }
  }

  return NextResponse.json({
    ok: true,
    received: events.length,
    alerted,
  });
}
