import { NextResponse } from 'next/server';
import { sendBrevoEmail } from '@/lib/email/emailBrevo';
import { countRecentFailures } from '@/lib/monitor/eventLog';

export const runtime = 'nodejs';

function required(name: string, value?: string) {
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

const MONITOR_TOKEN = () =>
  required('MONITOR_TOKEN', process.env.MONITOR_TOKEN);

const MONITOR_TO_EMAIL = () =>
  required('MONITOR_TO_EMAIL', process.env.MONITOR_TO_EMAIL);

// Captured once per process (helps confirm restarts)
const SERVER_STARTED_AT = new Date().toISOString();

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
      to: [{ email: MONITOR_TO_EMAIL() }],
      tags: ['monitor', 'daily-check'],
    });

    // ✅ Phase 4: tripwire if any contact/sheets failures happened recently
    const failures24h = await countRecentFailures(24);
    if (failures24h > 0) {
      return NextResponse.json(
        {
          ok: false,
          now,
          stage: 'failure-tripwire',
          message: `Monitor detected ${failures24h} contact/sheets failures in the last 24 hours`,
          buildSha: process.env.BUILD_SHA ?? null,
          buildTime: process.env.BUILD_TIME ?? null,
          serverStartedAt: SERVER_STARTED_AT,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      now,
      brevo: result,
      failures24h,
      buildSha: process.env.BUILD_SHA ?? null,
      buildTime: process.env.BUILD_TIME ?? null,
      serverStartedAt: SERVER_STARTED_AT,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        stage: 'sendBrevoEmail',
        message: err?.message ?? String(err),
        buildSha: process.env.BUILD_SHA ?? null,
        buildTime: process.env.BUILD_TIME ?? null,
        serverStartedAt: SERVER_STARTED_AT,
      },
      { status: 500 },
    );
  }
}
