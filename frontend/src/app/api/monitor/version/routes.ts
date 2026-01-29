import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function required(name: string, value?: string) {
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

const MONITOR_TOKEN = () =>
  required('MONITOR_TOKEN', process.env.MONITOR_TOKEN);

// Captured once per process (useful to prove restarts)
const SERVER_STARTED_AT = new Date().toISOString();

function unauthorized() {
  return NextResponse.json(
    { ok: false, error: 'Unauthorized' },
    { status: 401 },
  );
}

export async function GET(req: Request) {
  const auth = req.headers.get('authorization') || '';
  const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : '';

  if (!bearer || bearer !== MONITOR_TOKEN()) return unauthorized();

  return NextResponse.json({
    ok: true,
    env: process.env.NODE_ENV,
    appVersion: process.env.npm_package_version ?? null,
    buildSha: process.env.BUILD_SHA ?? null,
    buildTime: process.env.BUILD_TIME ?? null,
    serverStartedAt: SERVER_STARTED_AT,
  });
}
