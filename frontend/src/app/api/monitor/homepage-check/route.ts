import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function unauthorized() {
  return NextResponse.json(
    { ok: false, error: 'Unauthorized' },
    { status: 401 },
  );
}

export async function GET(req: Request) {
  const token = process.env.MONITOR_TOKEN;
  if (!token) {
    return NextResponse.json(
      { ok: false, error: 'Server misconfigured: MONITOR_TOKEN missing' },
      { status: 500 },
    );
  }

  const auth = req.headers.get('authorization') || '';
  const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (bearer !== token) return unauthorized();

  const url = 'https://bellhouseexcavating.ca/';
  const requiredNeedle = 'Bellhouse Excavating'; // change if you want something else
  const minBytes = 8_000; // sanity check: tiny HTML often means an error/placeholder

  const startedAt = Date.now();

  let res: Response;
  let html = '';
  try {
    res = await fetch(url, {
      method: 'GET',
      // Don’t cache; we want real truth, not yesterday’s vibes.
      cache: 'no-store',
      redirect: 'follow',
      headers: {
        'user-agent':
          'BellhouseMonitor/1.0 (+github-actions via monitor origin)',
        accept: 'text/html,application/xhtml+xml',
      },
    });

    // Try to read body even on non-200 so you get useful diagnostics.
    html = await res.text();
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Fetch failed',
        detail: err?.message ?? String(err),
        url,
      },
      { status: 502 },
    );
  }

  const elapsedMs = Date.now() - startedAt;
  const status = res.status;
  const contentType = res.headers.get('content-type') || '';

  const isHtml = contentType.includes('text/html');
  const containsNeedle = html.includes(requiredNeedle);
  const byteLength = Buffer.byteLength(html, 'utf8');
  const bigEnough = byteLength >= minBytes;

  const ok = status === 200 && isHtml && containsNeedle && bigEnough;

  return NextResponse.json(
    {
      ok,
      check: 'homepage',
      url,
      status,
      contentType,
      elapsedMs,
      byteLength,
      containsNeedle,
      bigEnough,
      requiredNeedle,
      // give a tiny snippet to help debugging without dumping the whole page
      snippet: html.slice(0, 250),
    },
    { status: ok ? 200 : 500 },
  );
}
