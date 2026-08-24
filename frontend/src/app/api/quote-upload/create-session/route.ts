import crypto from 'crypto';
import { NextResponse } from 'next/server';
import {
  contactBaseSchema,
  isSuspiciousContactInput,
} from '@/lib/contact/contactValidation';
import {
  QUOTE_UPLOAD_ALLOWED_SERVER_MIME_TYPES,
  QUOTE_UPLOAD_MAX_FILES,
  QUOTE_UPLOAD_MAX_FILE_BYTES,
  QUOTE_UPLOAD_MAX_TOTAL_BYTES,
  QUOTE_UPLOAD_SESSION_TTL_SECONDS,
} from '@/lib/uploads/shared/uploadLimits';
import type {
  QuoteUploadDetectedMime,
  QuoteUploadSessionPayload,
} from '@/lib/uploads/shared/uploadTypes';
import {
  buildCleanKey,
  buildQuarantineKey,
  createPresignedPutUrl,
} from '@/lib/uploads/server/r2';
import { sanitizeOriginalFilename, getLowercaseExtension } from '@/lib/uploads/server/filenames';
import { createUploadSessionToken } from '@/lib/uploads/server/sessionToken';
import { getClientIp, checkRateLimit } from '@/lib/uploads/server/rateLimit';
import { verifyTurnstileToken } from '@/lib/uploads/server/turnstile';
import { logMonitorEvent } from '@/lib/monitor/eventLog';

export const runtime = 'nodejs';

type CreateSessionFileInput = {
  id?: string;
  name: string;
  sizeBytes: number;
  contentType: QuoteUploadDetectedMime;
};

type CreateSessionBody = {
  contact: unknown;
  files: CreateSessionFileInput[];
  turnstileToken: string;
  honeypot?: string;
};

function isAllowedContentType(value: string) {
  return QUOTE_UPLOAD_ALLOWED_SERVER_MIME_TYPES.includes(
    value as QuoteUploadDetectedMime,
  );
}

function extensionForMime(mime: QuoteUploadDetectedMime) {
  if (mime === 'image/png') return 'png';
  if (mime === 'image/webp') return 'webp';
  return 'jpg';
}

function validationError(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(req: Request) {
  const ip = getClientIp(req);

  if (
    !checkRateLimit({
      key: `upload-create:ip:${ip}`,
      limit: 8,
      windowMs: 15 * 60 * 1000,
    })
  ) {
    return validationError('Too many upload attempts. Please try again later.', 429);
  }

  let body: CreateSessionBody;
  try {
    body = await req.json();
  } catch {
    return validationError('Invalid upload request.');
  }

  const parsedContact = contactBaseSchema.safeParse({
    ...(typeof body.contact === 'object' && body.contact ? body.contact : {}),
    honeypot: body.honeypot,
  });

  if (!parsedContact.success) {
    return validationError(
      parsedContact.error.errors[0]?.message || 'Invalid quote details.',
    );
  }

  if (isSuspiciousContactInput(parsedContact.data)) {
    await logMonitorEvent({
      ts: new Date().toISOString(),
      type: 'UPLOAD_REJECTED',
      message: 'Suspicious upload session request rejected.',
      meta: { ip, email: parsedContact.data.email },
    });

    return validationError('Suspicious activity detected.', 400);
  }

  if (
    parsedContact.data.email &&
    !checkRateLimit({
      key: `upload-create:email:${parsedContact.data.email.toLowerCase()}`,
      limit: 5,
      windowMs: 60 * 60 * 1000,
    })
  ) {
    return validationError('Too many upload attempts. Please try again later.', 429);
  }

  if (
    parsedContact.data.phone &&
    !checkRateLimit({
      key: `upload-create:phone:${parsedContact.data.phone}`,
      limit: 5,
      windowMs: 60 * 60 * 1000,
    })
  ) {
    return validationError('Too many upload attempts. Please try again later.', 429);
  }

  if (!body.turnstileToken) {
    return validationError('Missing upload verification token.');
  }

  try {
    const turnstileOk = await verifyTurnstileToken({
      token: body.turnstileToken,
      ip,
    });

    if (!turnstileOk) {
      return validationError('Failed upload verification. Please try again.', 400);
    }
  } catch (error) {
    await logMonitorEvent({
      ts: new Date().toISOString(),
      type: 'UPLOAD_TURNSTILE_FAIL',
      message: (error as Error)?.message ?? 'Turnstile verification failed.',
      meta: { ip },
    });

    return validationError('Photo uploads are not configured right now.', 503);
  }

  const files = Array.isArray(body.files) ? body.files : [];
  if (!files.length) return validationError('No photos were selected.');
  if (files.length > QUOTE_UPLOAD_MAX_FILES) {
    return validationError(`Please upload no more than ${QUOTE_UPLOAD_MAX_FILES} photos.`);
  }

  const totalBytes = files.reduce((sum, file) => sum + Number(file.sizeBytes || 0), 0);
  if (totalBytes > QUOTE_UPLOAD_MAX_TOTAL_BYTES) {
    return validationError('The selected photos are too large together.');
  }

  const leadId = crypto.randomUUID();

  try {
    const sessionFiles = await Promise.all(
      files.map(async (file) => {
        const sanitizedOriginalName = sanitizeOriginalFilename(file.name);
        const extension = getLowercaseExtension(sanitizedOriginalName);

        if (extension === 'heic' || extension === 'heif') {
          throw new Error('HEIC photos must be converted before upload.');
        }

        if (!file.sizeBytes || file.sizeBytes > QUOTE_UPLOAD_MAX_FILE_BYTES) {
          throw new Error('One selected photo is over the size limit.');
        }

        if (!isAllowedContentType(file.contentType)) {
          throw new Error('Only JPG, PNG, and WEBP uploads are accepted.');
        }

        const uploadId = crypto.randomUUID();
        const storageExtension = extensionForMime(file.contentType);
        const quarantineKey = buildQuarantineKey({
          leadId,
          uploadId,
          extension: storageExtension,
        });
        const cleanKey = buildCleanKey({ leadId, uploadId });

        return {
          id: uploadId,
          uploadUrl: await createPresignedPutUrl({
            key: quarantineKey,
            contentType: file.contentType,
          }),
          quarantineKey,
          cleanKey,
          originalName: sanitizedOriginalName,
          sanitizedOriginalName,
          sizeBytes: file.sizeBytes,
          contentType: file.contentType,
        };
      }),
    );

    const payload: QuoteUploadSessionPayload = {
      leadId,
      contact: {
        name: parsedContact.data.name,
        email: parsedContact.data.email,
        phone: parsedContact.data.phone,
        workType: parsedContact.data.workType,
        message: parsedContact.data.message,
        smsConsent: parsedContact.data.smsConsent,
        smsDisclosureShown: parsedContact.data.smsDisclosureShown,
        attribution: parsedContact.data.attribution,
        formName: parsedContact.data.formName,
      },
      files: sessionFiles.map(({ uploadUrl: _uploadUrl, ...file }) => file),
      expiresAt: Date.now() + QUOTE_UPLOAD_SESSION_TTL_SECONDS * 1000,
    };

    return NextResponse.json({
      ok: true,
      leadId,
      sessionToken: createUploadSessionToken(payload),
      files: sessionFiles.map(
        ({
          id,
          uploadUrl,
          originalName,
          sanitizedOriginalName,
          sizeBytes,
          contentType,
        }) => ({
          id,
          uploadUrl,
          originalName,
          sanitizedOriginalName,
          sizeBytes,
          contentType,
        }),
      ),
    });
  } catch (error) {
    await logMonitorEvent({
      ts: new Date().toISOString(),
      type: 'UPLOAD_REJECTED',
      message: (error as Error)?.message ?? 'Upload session rejected.',
      meta: { ip, leadId },
    });

    return validationError(
      (error as Error)?.message || 'Could not prepare photo uploads.',
      400,
    );
  }
}
