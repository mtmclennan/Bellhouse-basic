export async function verifyTurnstileToken({
  token,
  ip,
}: {
  token: string;
  ip: string;
}) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error('Missing env var: TURNSTILE_SECRET_KEY');

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (ip && ip !== 'unknown') body.set('remoteip', ip);

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    },
  );

  const result = await response.json();
  return Boolean(result.success);
}
