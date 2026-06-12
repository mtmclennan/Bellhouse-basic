'use client';

import {
  QUOTE_UPLOAD_ALLOWED_CLIENT_EXTENSIONS,
  QUOTE_UPLOAD_HEIC_CONVERSION_ERROR,
  QUOTE_UPLOAD_MAX_FILE_BYTES,
  formatUploadSize,
} from '@/lib/uploads/shared/uploadLimits';
import type {
  QuoteUploadClientFile,
  QuoteUploadDetectedMime,
} from '@/lib/uploads/shared/uploadTypes';

const MIME_BY_EXTENSION: Record<string, QuoteUploadDetectedMime> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

function getExtension(filename: string) {
  return filename.split('.').pop()?.toLowerCase() ?? '';
}

function replaceExtension(filename: string, nextExtension: string) {
  const base = filename.replace(/\.[^/.]+$/, '') || 'photo';
  return `${base}.${nextExtension}`;
}

function makeUploadId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function isAllowedClientExtension(extension: string) {
  return QUOTE_UPLOAD_ALLOWED_CLIENT_EXTENSIONS.includes(
    extension as (typeof QUOTE_UPLOAD_ALLOWED_CLIENT_EXTENSIONS)[number],
  );
}

function isHeicLike(file: File) {
  const extension = getExtension(file.name);
  return (
    extension === 'heic' ||
    extension === 'heif' ||
    file.type === 'image/heic' ||
    file.type === 'image/heif'
  );
}

function getImageMime(file: File): QuoteUploadDetectedMime | null {
  const extension = getExtension(file.name);
  const extensionMime = MIME_BY_EXTENSION[extension];
  if (extensionMime) return extensionMime;

  if (
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/webp'
  ) {
    return file.type;
  }

  return null;
}

export async function normalizeImageFile(
  file: File,
): Promise<QuoteUploadClientFile> {
  const extension = getExtension(file.name);

  if (!isAllowedClientExtension(extension)) {
    throw new Error('Please choose JPG, PNG, WEBP, or iPhone HEIC photos only.');
  }

  let normalizedFile = file;
  let displayName = file.name;

  if (isHeicLike(file)) {
    try {
      const { heicTo } = await import('heic-to');
      const converted = await heicTo({
        blob: file,
        type: 'image/jpeg',
        quality: 0.82,
      });

      displayName = replaceExtension(file.name, 'jpg');
      normalizedFile = new File([converted], displayName, {
        type: 'image/jpeg',
        lastModified: Date.now(),
      });
    } catch {
      throw new Error(QUOTE_UPLOAD_HEIC_CONVERSION_ERROR);
    }
  }

  if (normalizedFile.size > QUOTE_UPLOAD_MAX_FILE_BYTES) {
    throw new Error(
      `${displayName} is ${formatUploadSize(
        normalizedFile.size,
      )}. Please keep each photo under ${formatUploadSize(
        QUOTE_UPLOAD_MAX_FILE_BYTES,
      )}.`,
    );
  }

  const contentType = getImageMime(normalizedFile);
  if (!contentType) {
    throw new Error('Please choose JPG, PNG, WEBP, or iPhone HEIC photos only.');
  }

  return {
    id: makeUploadId(),
    file: normalizedFile,
    originalName: file.name,
    displayName,
    sizeBytes: normalizedFile.size,
    contentType,
  };
}
