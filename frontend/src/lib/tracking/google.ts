import { shouldUseGoogleAdsTracking } from './routes';

export type GoogleEventParams = Record<string, string | number | boolean>;

export const GOOGLE_ADS_CONVERSION_LABELS = {
  quoteFormSubmit:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_FORM_CONVERSION_LABEL ??
    process.env.NEXT_PUBLIC_GOOGLE_ADS_QUOTE_CONVERSION_LABEL,
  callClick:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION_LABEL ??
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL,
  smsClick: process.env.NEXT_PUBLIC_GOOGLE_ADS_SMS_CONVERSION_LABEL,
  emailClick: process.env.NEXT_PUBLIC_GOOGLE_ADS_EMAIL_CONVERSION_LABEL,
} as const;

export function trackEvent(
  eventName: string,
  params?: GoogleEventParams,
) {
  if (typeof window === 'undefined') return;
  if (!window.gtag) return;

  window.gtag('event', eventName, params || {});
}

export function trackGoogleAdsConversion(
  label?: string,
  value?: number,
) {
  if (typeof window === 'undefined') return;
  if (!window.gtag) return;

  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  if (!adsId || !label) return;
  const pagePath = window.location.pathname;
  if (!shouldUseGoogleAdsTracking(pagePath)) return;

  window.gtag('event', 'conversion', {
    send_to: `${adsId}/${label}`,
    page_path: pagePath,
    ...(typeof value === 'number' ? { value, currency: 'CAD' } : {}),
  });
}
