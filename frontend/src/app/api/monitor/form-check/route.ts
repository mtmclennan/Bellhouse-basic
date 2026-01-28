import { NextResponse } from 'next/server';
import { processContactCore } from '@/app/actions/contact';

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

export async function POST(req: Request) {
  const auth = req.headers.get('authorization') || '';
  const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : '';

  if (!bearer || bearer !== MONITOR_TOKEN()) return unauthorized();

  const MONITOR_TO_EMAIL = required(
    'MONITOR_TO_EMAIL',
    process.env.MONITOR_TO_EMAIL,
  );

  const now = new Date().toISOString();

  try {
    // Synthetic “contact” payload. Customer email is redirected to MONITOR_TO_EMAIL.
    await processContactCore(
      {
        name: 'Monitor Bot',
        email: MONITOR_TO_EMAIL, // safe destination for the "customer copy"
        phone: '',
        workType: 'Monitor Test',
        message: `Synthetic contact form pipeline test at ${now}.`,
      },
      {
        // Optional: keep your Google Sheet clean
        skipSheets: true,

        // Add a prefix so it’s obvious this is synthetic in inbox
        subjectPrefix: '[MONITOR TEST] ',

        // Redundant but explicit: ensure customer email goes to monitor inbox
        customerToEmail: MONITOR_TO_EMAIL,

        // Business email still goes to RECIPIENT_EMAIL (default behavior)
        // businessToEmail: undefined,
      },
    );

    return NextResponse.json({ ok: true, now }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        stage: 'processContactCore',
        message: err?.message ?? String(err),
      },
      { status: 500 },
    );
  }
}
