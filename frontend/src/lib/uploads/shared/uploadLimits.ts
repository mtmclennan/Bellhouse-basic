export const QUOTE_UPLOAD_MAX_FILES = Number(
  process.env.UPLOAD_MAX_FILES ?? 3,
);

export const QUOTE_UPLOAD_MAX_FILE_BYTES =
  Number(process.env.UPLOAD_MAX_FILE_SIZE_MB ?? 5) * 1024 * 1024;

export const QUOTE_UPLOAD_MAX_TOTAL_BYTES =
  Number(process.env.UPLOAD_TOTAL_MAX_SIZE_MB ?? 15) * 1024 * 1024;

export const QUOTE_UPLOAD_MAX_IMAGE_DIMENSION = 2400;

export const QUOTE_UPLOAD_SIGNED_URL_EXPIRES_SECONDS = Number(
  process.env.R2_SIGNED_URL_EXPIRES_SECONDS ?? 60 * 60 * 24,
);

export const QUOTE_UPLOAD_SESSION_TTL_SECONDS = 15 * 60;

export const QUOTE_UPLOAD_ALLOWED_CLIENT_EXTENSIONS = [
  'jpg',
  'jpeg',
  'png',
  'webp',
  'heic',
  'heif',
] as const;

export const QUOTE_UPLOAD_ALLOWED_SERVER_EXTENSIONS = [
  'jpg',
  'jpeg',
  'png',
  'webp',
] as const;

export const QUOTE_UPLOAD_ALLOWED_SERVER_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

export const QUOTE_UPLOAD_HELPER_TEXT =
  'Upload up to 3 jobsite photos that help us understand the work area, access, and existing conditions.';

export const QUOTE_UPLOAD_ACCEPTED_TEXT =
  'JPG, PNG, WEBP, or iPhone HEIC photos. Max 5 MB per photo.';

export const QUOTE_UPLOAD_PRIVACY_TEXT =
  'Uploaded photos are used only to review and respond to your request.';

export const QUOTE_UPLOAD_HEIC_CONVERSION_ERROR =
  "We couldn't convert this iPhone photo. Please try another photo, take a screenshot, or text the photo to 519-752-8500.";

export const QUOTE_UPLOAD_GENERIC_ERROR =
  'We could not upload those photos safely. You can still submit the form without photos and text photos to 519-752-8500 if needed.';

export function formatUploadSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
