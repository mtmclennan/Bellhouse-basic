import { NextResponse } from 'next/server';
import { sendBrevoEmail } from '@/lib/email/emailBrevo';

export const runtime = 'nodejs';

function required(name: string, value?: string) {
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

const MONITOR_TOKEN = () =>
  required('MONITOR_TOKEN', process.env.MONITOR_TOKEN);

function unauthorized() {
  return NextResponse.json(
    { ok: false, error: 'Unauthorized' },
    { status: 401 },
  );
}

export async function GET(req: Request) {
  // 🔐 Bearer token auth
  const auth = req.headers.get('authorization') || '';
  const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : '';

  if (!bearer || bearer !== MONITOR_TOKEN()) {
    return unauthorized();
  }

  const now = new Date().toISOString();

  try {
    const result = await sendBrevoEmail({
      subject: `Bellhouse Daily Email Test (${now})`,
      html: '<p>Daily email test</p>',
      to: [{ email: process.env.MONITOR_TO_EMAIL! }],
      tags: ['monitor', 'daily-check'],
    });

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
