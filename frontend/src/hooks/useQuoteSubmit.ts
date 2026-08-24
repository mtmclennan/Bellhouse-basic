'use client';

import { useEffect, useRef, useState } from 'react';
import { sendContactForm } from '@/app/actions/contact';
import { getInvisibleTurnstileToken } from '@/lib/uploads/client/turnstile';
import { submitQuoteWithImages } from '@/lib/uploads/client/submitQuoteWithImages';
import type { QuoteUploadClientFile } from '@/lib/uploads/shared/uploadTypes';
import { getLeadAttribution } from '@/lib/tracking/attribution';
import {
  GOOGLE_ADS_CONVERSION_LABELS,
  trackEvent,
  trackGoogleAdsConversion,
} from '@/lib/tracking/google';

export type QuoteSubmitContact = {
  name: string;
  email: string;
  phone: string;
  workType: string;
  message: string;
  smsConsent: boolean;
  smsDisclosureShown: boolean;
};

type QuoteSubmitInput = {
  contact: QuoteSubmitContact;
  files: QuoteUploadClientFile[];
  honeypot: string;
  turnstileContainerRef: React.RefObject<HTMLDivElement | null>;
};

type QuoteSubmitResult = {
  success: string;
  failedCount?: number;
};

type UseQuoteSubmitOptions = {
  formVariant: string;
  recaptchaAction?: string;
  trackingExtra?: Record<string, string | boolean>;
};

type UseQuoteSubmitReturn = {
  isRecaptchaReady: boolean;
  loading: boolean;
  submit: (input: QuoteSubmitInput) => Promise<QuoteSubmitResult>;
};

export function useQuoteSubmit({
  formVariant,
  recaptchaAction = 'submit',
  trackingExtra = {},
}: UseQuoteSubmitOptions): UseQuoteSubmitReturn {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
  const [loading, setLoading] = useState(false);

  // Stable ref so the submit closure never captures a stale formVariant
  const optionsRef = useRef({ formVariant, recaptchaAction, trackingExtra });
  useEffect(() => {
    optionsRef.current = { formVariant, recaptchaAction, trackingExtra };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.grecaptcha?.execute) {
        setIsRecaptchaReady(true);
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  async function submit({
    contact,
    files,
    honeypot,
    turnstileContainerRef,
  }: QuoteSubmitInput): Promise<QuoteSubmitResult> {
    const { formVariant: variant, recaptchaAction: action, trackingExtra: extra } =
      optionsRef.current;

    setLoading(true);
    try {
      const attribution = getLeadAttribution(contact.workType);
      const formName =
        variant === 'landing'
          ? `landing:${typeof extra.page === 'string' ? extra.page : ''}`
          : `contact-form:${variant}`;
      const contactWithAttribution = {
        ...contact,
        attribution,
        formName,
      };

      if (files.length > 0) {
        const turnstileToken = await getInvisibleTurnstileToken({
          container: turnstileContainerRef.current,
          siteKey: turnstileSiteKey,
        });

        const result = await submitQuoteWithImages({
          contact: contactWithAttribution,
          files,
          turnstileToken,
          honeypot,
        });

        trackEvent('quote_form_submit', {
          form_variant: variant,
          has_upload: true,
          lead_source: attribution.utmSource || '',
          lead_medium: attribution.utmMedium || '',
          lead_campaign: attribution.utmCampaign || '',
          ...extra,
        });
        trackGoogleAdsConversion(GOOGLE_ADS_CONVERSION_LABELS.quoteFormSubmit);

        return { success: result.success, failedCount: result.failedCount };
      }

      if (!isRecaptchaReady || typeof window.grecaptcha === 'undefined') {
        throw new Error('reCAPTCHA is not ready. Please try again.');
      }

      const token = await window.grecaptcha.execute(recaptchaSiteKey, { action });

      const result = await sendContactForm({
        ...contactWithAttribution,
        token,
        honeypot,
      });

      if (!result?.success) {
        trackEvent('quote_form_error', { form_variant: variant, error_type: 'server', ...extra });
        throw new Error(result?.error || 'Something went wrong. Please try again.');
      }

      trackEvent('quote_form_submit', {
        form_variant: variant,
        has_upload: false,
        lead_source: attribution.utmSource || '',
        lead_medium: attribution.utmMedium || '',
        lead_campaign: attribution.utmCampaign || '',
        ...extra,
      });
      trackGoogleAdsConversion(GOOGLE_ADS_CONVERSION_LABELS.quoteFormSubmit);

      return { success: 'Your request has been sent.' };
    } catch (error) {
      trackEvent('quote_form_error', { form_variant: variant, error_type: 'exception', ...extra });
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { isRecaptchaReady, loading, submit };
}
