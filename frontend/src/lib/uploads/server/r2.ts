import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { QUOTE_UPLOAD_SIGNED_URL_EXPIRES_SECONDS } from '@/lib/uploads/shared/uploadLimits';
import type { QuoteUploadDetectedMime } from '@/lib/uploads/shared/uploadTypes';

function required(name: string, value?: string) {
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

export function getR2BucketName() {
  return required('R2_BUCKET_NAME', process.env.R2_BUCKET_NAME);
}

function getR2Endpoint() {
  const explicitEndpoint =
    process.env.R2_S3_ENDPOINT || process.env.R2_PUBLIC_ENDPOINT;
  if (explicitEndpoint) return explicitEndpoint;

  const accountId = required('R2_ACCOUNT_ID', process.env.R2_ACCOUNT_ID);
  return `https://${accountId}.r2.cloudflarestorage.com`;
}

let r2Client: S3Client | null = null;

export function getR2Client() {
  if (r2Client) return r2Client;

  r2Client = new S3Client({
    region: 'auto',
    endpoint: getR2Endpoint(),
    credentials: {
      accessKeyId: required('R2_ACCESS_KEY_ID', process.env.R2_ACCESS_KEY_ID),
      secretAccessKey: required(
        'R2_SECRET_ACCESS_KEY',
        process.env.R2_SECRET_ACCESS_KEY,
      ),
    },
  });

  return r2Client;
}

export function buildQuarantineKey({
  leadId,
  uploadId,
  extension,
}: {
  leadId: string;
  uploadId: string;
  extension: string;
}) {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  return `quote-uploads/quarantine/${year}/${month}/${leadId}/${uploadId}.${extension}`;
}

export function buildCleanKey({
  leadId,
  uploadId,
}: {
  leadId: string;
  uploadId: string;
}) {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  return `quote-uploads/clean/${year}/${month}/${leadId}/${uploadId}.jpg`;
}

export async function createPresignedPutUrl({
  key,
  contentType,
}: {
  key: string;
  contentType: QuoteUploadDetectedMime;
}) {
  return getSignedUrl(
    getR2Client(),
    new PutObjectCommand({
      Bucket: getR2BucketName(),
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn: 10 * 60 },
  );
}

export async function createPresignedGetUrl(key: string) {
  return getSignedUrl(
    getR2Client(),
    new GetObjectCommand({
      Bucket: getR2BucketName(),
      Key: key,
      ResponseContentDisposition: 'inline',
    }),
    { expiresIn: QUOTE_UPLOAD_SIGNED_URL_EXPIRES_SECONDS },
  );
}

export async function headR2Object(key: string) {
  return getR2Client().send(
    new HeadObjectCommand({
      Bucket: getR2BucketName(),
      Key: key,
    }),
  );
}

export async function getR2ObjectBuffer(key: string) {
  const result = await getR2Client().send(
    new GetObjectCommand({
      Bucket: getR2BucketName(),
      Key: key,
    }),
  );

  if (!result.Body) throw new Error('Uploaded object was empty.');

  const chunks: Uint8Array[] = [];
  for await (const chunk of result.Body as AsyncIterable<Uint8Array>) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}

export async function putR2Object({
  key,
  body,
  contentType,
}: {
  key: string;
  body: Buffer;
  contentType: QuoteUploadDetectedMime;
}) {
  await getR2Client().send(
    new PutObjectCommand({
      Bucket: getR2BucketName(),
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
}

export async function deleteR2Object(key: string) {
  await getR2Client().send(
    new DeleteObjectCommand({
      Bucket: getR2BucketName(),
      Key: key,
    }),
  );
}
