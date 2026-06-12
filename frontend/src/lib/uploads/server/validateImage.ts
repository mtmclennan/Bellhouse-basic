import {
  QUOTE_UPLOAD_ALLOWED_SERVER_EXTENSIONS,
  QUOTE_UPLOAD_ALLOWED_SERVER_MIME_TYPES,
  QUOTE_UPLOAD_MAX_FILE_BYTES,
} from '@/lib/uploads/shared/uploadLimits';
import type { QuoteUploadDetectedMime } from '@/lib/uploads/shared/uploadTypes';
import { getLowercaseExtension } from './filenames';

function isAllowedExtension(extension: string) {
  return QUOTE_UPLOAD_ALLOWED_SERVER_EXTENSIONS.includes(
    extension as (typeof QUOTE_UPLOAD_ALLOWED_SERVER_EXTENSIONS)[number],
  );
}

function isAllowedMime(mime: string) {
  return QUOTE_UPLOAD_ALLOWED_SERVER_MIME_TYPES.includes(
    mime as QuoteUploadDetectedMime,
  );
}

function detectImageMime(buffer: Buffer): QuoteUploadDetectedMime | null {
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return 'image/jpeg';
  }

  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return 'image/png';
  }

  if (
    buffer.length >= 12 &&
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return 'image/webp';
  }

  return null;
}

export async function validateServerImage({
  filename,
  expectedContentType,
  buffer,
}: {
  filename: string;
  expectedContentType: string;
  buffer: Buffer;
}) {
  const extension = getLowercaseExtension(filename);

  if (extension === 'heic' || extension === 'heif') {
    throw new Error('HEIC photos must be converted before upload.');
  }

  if (!isAllowedExtension(extension)) {
    throw new Error('Only JPG, PNG, and WEBP uploads are accepted.');
  }

  if (!buffer.length || buffer.length > QUOTE_UPLOAD_MAX_FILE_BYTES) {
    throw new Error('Photo size is outside the allowed limit.');
  }

  const detectedMime = detectImageMime(buffer);

  if (!detectedMime || !isAllowedMime(detectedMime)) {
    throw new Error('Photo content did not match JPG, PNG, or WEBP.');
  }

  if (detectedMime !== expectedContentType) {
    throw new Error('Photo content type did not match the upload session.');
  }

  return {
    mime: detectedMime,
  };
}
