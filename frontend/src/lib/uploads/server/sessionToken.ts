import crypto from 'crypto';
import type { QuoteUploadSessionPayload } from '@/lib/uploads/shared/uploadTypes';

function getSecret(): string {
  const secret = process.env.UPLOAD_SESSION_SECRET;
  if (!secret) throw new Error('Missing env var: UPLOAD_SESSION_SECRET');
  return secret;
}

export function createUploadSessionToken(payload: QuoteUploadSessionPayload): string {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto
    .createHmac('sha256', getSecret())
    .update(encodedPayload)
    .digest('base64url');
  return `${encodedPayload}.${sig}`;
}

export function verifyUploadSessionToken(token: string): QuoteUploadSessionPayload {
  const dotIndex = token.lastIndexOf('.');
  if (dotIndex === -1) throw new Error('Invalid upload session.');

  const encodedPayload = token.slice(0, dotIndex);
  const sig = token.slice(dotIndex + 1);

  const expectedSig = crypto
    .createHmac('sha256', getSecret())
    .update(encodedPayload)
    .digest('base64url');

  const expectedBuf = Buffer.from(expectedSig);
  const actualBuf = Buffer.from(sig);

  if (
    expectedBuf.length !== actualBuf.length ||
    !crypto.timingSafeEqual(expectedBuf, actualBuf)
  ) {
    throw new Error('Invalid upload session.');
  }

  let payload: QuoteUploadSessionPayload;
  try {
    payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString());
  } catch {
    throw new Error('Invalid upload session.');
  }

  if (payload.expiresAt < Date.now()) {
    throw new Error('Upload session expired.');
  }

  return payload;
}
