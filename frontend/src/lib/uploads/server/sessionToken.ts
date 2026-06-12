import crypto from 'crypto';
import type { QuoteUploadSessionPayload } from '@/lib/uploads/shared/uploadTypes';

const uploadSessions = new Map<string, QuoteUploadSessionPayload>();

export function createUploadSessionToken(payload: QuoteUploadSessionPayload) {
  const token = crypto.randomBytes(32).toString('base64url');
  uploadSessions.set(token, payload);
  return token;
}

export function verifyUploadSessionToken(token: string) {
  const payload = uploadSessions.get(token);
  if (!payload) throw new Error('Invalid upload session.');

  if (payload.expiresAt < Date.now()) {
    uploadSessions.delete(token);
    throw new Error('Upload session expired.');
  }

  uploadSessions.delete(token);
  return payload;
}
