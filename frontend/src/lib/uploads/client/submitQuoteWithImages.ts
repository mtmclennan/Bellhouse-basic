'use client';

import type {
  QuoteUploadClientFile,
  QuoteUploadContactFields,
  QuoteUploadDetectedMime,
} from '@/lib/uploads/shared/uploadTypes';
import { QUOTE_UPLOAD_GENERIC_ERROR } from '@/lib/uploads/shared/uploadLimits';

type SubmitQuoteWithImagesInput = {
  contact: QuoteUploadContactFields;
  files: QuoteUploadClientFile[];
  turnstileToken: string;
  honeypot?: string;
};

type CreateSessionResponse =
  | {
      ok: true;
      leadId: string;
      sessionToken: string;
      files: {
        id: string;
        uploadUrl: string;
        originalName: string;
        sanitizedOriginalName: string;
        sizeBytes: number;
        contentType: QuoteUploadDetectedMime;
      }[];
    }
  | {
      ok: false;
      error?: string;
    };

type FinalizeResponse =
  | {
      ok: true;
      success: string;
      failedCount?: number;
    }
  | {
      ok: false;
      error?: string;
    };

export async function submitQuoteWithImages({
  contact,
  files,
  turnstileToken,
  honeypot,
}: SubmitQuoteWithImagesInput) {
  const createResponse = await fetch('/api/quote-upload/create-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contact,
      files: files.map((file) => ({
        id: file.id,
        name: file.displayName,
        sizeBytes: file.sizeBytes,
        contentType: file.contentType,
      })),
      turnstileToken,
      honeypot,
    }),
  });

  const createResult = (await createResponse.json()) as CreateSessionResponse;
  if (!createResponse.ok) {
    throw new Error(
      createResult.ok ? QUOTE_UPLOAD_GENERIC_ERROR : createResult.error || QUOTE_UPLOAD_GENERIC_ERROR,
    );
  }

  if (!createResult.ok) {
    throw new Error(createResult.error || QUOTE_UPLOAD_GENERIC_ERROR);
  }

  const filesById = new Map(files.map((file) => [file.id, file]));

  await Promise.all(
    createResult.files.map(async (slot) => {
      const selectedFile = filesById.get(slot.id);
      if (!selectedFile) throw new Error(QUOTE_UPLOAD_GENERIC_ERROR);

      const uploadResponse = await fetch(slot.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': selectedFile.contentType },
        body: selectedFile.file,
      });

      if (!uploadResponse.ok) throw new Error(QUOTE_UPLOAD_GENERIC_ERROR);
    }),
  );

  const finalizeResponse = await fetch('/api/quote-upload/finalize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionToken: createResult.sessionToken }),
  });

  const finalizeResult = (await finalizeResponse.json()) as FinalizeResponse;
  if (!finalizeResponse.ok) {
    throw new Error(
      finalizeResult.ok ? QUOTE_UPLOAD_GENERIC_ERROR : finalizeResult.error || QUOTE_UPLOAD_GENERIC_ERROR,
    );
  }

  if (!finalizeResult.ok) {
    throw new Error(finalizeResult.error || QUOTE_UPLOAD_GENERIC_ERROR);
  }

  return finalizeResult;
}
