import { NextResponse } from 'next/server';
import { sendBrevoEmail } from '@/lib/email/emailBrevo';

export const runtime = 'nodejs';

function required(name: string, value?: string) {
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

const MONITOR_TOKEN = () =>
  required('MONITOR_TOKEN', process.env.MONITOR_TOKEN);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!token || token !== MONITOR_TOKEN()) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  const now = new Date().toISOString();

  try {
    const result = await sendBrevoEmail({
      subject: `Bellhouse Daily Email Test (${new Date().toISOString()})`,
      html: '<p>Daily email test</p>',
      to: [{ email: process.env.MONITOR_TO_EMAIL! }],
      tags: ['monitor', 'daily-check'],
    });

    // Brevo SDK returns an object that includes messageId (and sometimes other bits)
    return NextResponse.json({
      ok: true,
      now,
      brevo: result,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        stage: 'sendBrevoEmail',
        message: err?.message ?? String(err),
      },
      { status: 500 },
    );
  }
}
