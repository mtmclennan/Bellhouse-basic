import { NextResponse } from 'next/server';
import { processContactCore } from '@/app/actions/contact';
import { logMonitorEvent } from '@/lib/monitor/eventLog';
import {
  QUOTE_UPLOAD_GENERIC_ERROR,
  QUOTE_UPLOAD_SIGNED_URL_EXPIRES_SECONDS,
} from '@/lib/uploads/shared/uploadLimits';
import type { QuoteUploadEmailFile } from '@/lib/uploads/shared/uploadTypes';
import {
  createPresignedGetUrl,
  deleteR2Object,
  getR2ObjectBuffer,
  headR2Object,
  putR2Object,
} from '@/lib/uploads/server/r2';
import { verifyUploadSessionToken } from '@/lib/uploads/server/sessionToken';
import { processQuoteImage } from '@/lib/uploads/server/processImage';
import { validateServerImage } from '@/lib/uploads/server/validateImage';
import { checkRateLimit, getClientIp } from '@/lib/uploads/server/rateLimit';

export const runtime = 'nodejs';

type FinalizeBody = {
  sessionToken: string;
};

function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

function getSignedUrlExpiryDate() {
  return new Date(
    Date.now() + QUOTE_UPLOAD_SIGNED_URL_EXPIRES_SECONDS * 1000,
  ).toISOString();
}

export async function POST(req: Request) {
  const ip = getClientIp(req);

  if (
    !checkRateLimit({
      key: `upload-finalize:ip:${ip}`,
      limit: 8,
      windowMs: 15 * 60 * 1000,
    })
  ) {
    return jsonError('Too many upload attempts. Please try again later.', 429);
  }

  let body: FinalizeBody;
  try {
    body = await req.json();
  } catch {
    return jsonError('Invalid upload finalize request.');
  }

  let session;
  try {
    session = verifyUploadSessionToken(body.sessionToken);
  } catch (error) {
    return jsonError((error as Error)?.message || 'Invalid upload session.');
  }

  const uploadedFiles: QuoteUploadEmailFile[] = [];

  for (const file of session.files) {
    try {
      const head = await headR2Object(file.quarantineKey);
      const contentLength = Number(head.ContentLength ?? 0);

      if (!contentLength || contentLength !== file.sizeBytes) {
        throw new Error('Uploaded photo size did not match the upload session.');
      }

      const quarantineBuffer = await getR2ObjectBuffer(file.quarantineKey);

      const detected = await validateServerImage({
        filename: file.originalName,
        expectedContentType: file.contentType,
        buffer: quarantineBuffer,
      });

      const cleanBuffer = await processQuoteImage(quarantineBuffer);

      await putR2Object({
        key: file.cleanKey,
        body: cleanBuffer,
        contentType: 'image/jpeg',
      });

      await deleteR2Object(file.quarantineKey);

      uploadedFiles.push({
        originalName: file.sanitizedOriginalName,
        sizeBytes: cleanBuffer.length,
        contentType: detected.mime,
        status: 'clean',
        cleanStorageKey: file.cleanKey,
        signedUrl: await createPresignedGetUrl(file.cleanKey),
        signedUrlExpiresAt: getSignedUrlExpiryDate(),
      });
    } catch (error) {
      await logMonitorEvent({
        ts: new Date().toISOString(),
        type: 'UPLOAD_PROCESSING_FAIL',
        message: (error as Error)?.message ?? 'Photo processing failed.',
        meta: {
          leadId: session.leadId,
          uploadId: file.id,
          originalName: file.sanitizedOriginalName,
        },
      });

      try {
        await deleteR2Object(file.quarantineKey);
      } catch {
        // Cleanup failure should not block the lead notification.
      }

      uploadedFiles.push({
        originalName: file.sanitizedOriginalName,
        sizeBytes: file.sizeBytes,
        contentType: file.contentType,
        status: 'processing_failed',
        rejectionReason:
          (error as Error)?.message || 'Photo could not be processed safely.',
      });
    }
  }

  const hasPhone = !!session.contact.phone?.trim();
  const smsConsentAt =
    hasPhone && session.contact.smsConsent ? new Date().toISOString() : undefined;

  try {
    await processContactCore({
      ...session.contact,
      smsConsent: hasPhone ? session.contact.smsConsent : false,
      smsDisclosureShown: hasPhone ? session.contact.smsDisclosureShown : false,
      smsConsentAt,
      leadId: session.leadId,
      uploads: uploadedFiles,
      uploadLinkExpiryNote:
        uploadedFiles.some((file) => file.signedUrl)
          ? `Photo links expire after ${Math.round(
              QUOTE_UPLOAD_SIGNED_URL_EXPIRES_SECONDS / 3600,
            )} hours.`
          : undefined,
    });

    const failedCount = uploadedFiles.filter(
      (file) => file.status !== 'clean',
    ).length;

    return NextResponse.json({
      ok: true,
      success:
        failedCount > 0
          ? 'Your request was sent, but one or more photos could not be processed safely.'
          : 'Estimate request sent successfully.',
      failedCount,
    });
  } catch (error) {
    await logMonitorEvent({
      ts: new Date().toISOString(),
      type: 'UPLOAD_CONTACT_EMAIL_FAIL',
      message: (error as Error)?.message ?? 'Upload lead email failed.',
      meta: { leadId: session.leadId, email: session.contact.email },
    });

    return jsonError(QUOTE_UPLOAD_GENERIC_ERROR, 500);
  }
}
