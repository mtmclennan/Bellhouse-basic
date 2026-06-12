export type QuoteUploadDetectedMime =
  | 'image/jpeg'
  | 'image/png'
  | 'image/webp';

export type QuoteUploadStatus =
  | 'clean'
  | 'rejected'
  | 'processing_failed'
  | 'upload_failed';

export type QuoteUploadContactFields = {
  name: string;
  email: string;
  phone?: string;
  workType: string;
  message: string;
  smsConsent?: boolean;
  smsDisclosureShown?: boolean;
};

export type QuoteUploadClientFile = {
  id: string;
  file: File;
  originalName: string;
  displayName: string;
  sizeBytes: number;
  contentType: QuoteUploadDetectedMime;
};

export type QuoteUploadSessionFile = {
  id: string;
  uploadUrl: string;
  quarantineKey: string;
  cleanKey: string;
  originalName: string;
  sanitizedOriginalName: string;
  sizeBytes: number;
  contentType: QuoteUploadDetectedMime;
};

export type QuoteUploadEmailFile = {
  originalName: string;
  sizeBytes: number;
  contentType: QuoteUploadDetectedMime;
  status: QuoteUploadStatus;
  cleanStorageKey?: string;
  signedUrl?: string;
  signedUrlExpiresAt?: string;
  rejectionReason?: string;
};

export type QuoteUploadSessionPayload = {
  leadId: string;
  contact: QuoteUploadContactFields;
  files: Omit<QuoteUploadSessionFile, 'uploadUrl'>[];
  expiresAt: number;
};
