'use client';

import { useEffect } from 'react';
import {
  GOOGLE_ADS_CONVERSION_LABELS,
  trackEvent,
  trackGoogleAdsConversion,
} from '@/lib/tracking/google';

function getTrackingElement(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;

  return target.closest<HTMLElement>('a[href], button[data-conversion]');
}

function getTrackingParams(element: HTMLElement) {
  const href =
    element instanceof HTMLAnchorElement ? element.getAttribute('href') ?? '' : '';

  return {
    href,
    conversion: element.dataset.conversion || '',
    service: element.dataset.conversionService || element.dataset.serviceKey || '',
    page: element.dataset.conversionPage || '',
    tracking_id: element.dataset.trackingId || '',
  };
}

export default function TrackingClickEvents() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const element = getTrackingElement(event.target);
      if (!element) return;

      const params = getTrackingParams(element);

      if (params.href.startsWith('tel:')) {
        trackEvent('phone_click', params);
        trackGoogleAdsConversion(GOOGLE_ADS_CONVERSION_LABELS.callClick, undefined, { skipRouteCheck: true });
      }

      if (params.href.startsWith('sms:')) {
        trackEvent('sms_click', params);
        trackGoogleAdsConversion(GOOGLE_ADS_CONVERSION_LABELS.smsClick, undefined, { skipRouteCheck: true });
      }

      if (params.href.startsWith('mailto:')) {
        trackEvent('email_click', params);
        trackGoogleAdsConversion(GOOGLE_ADS_CONVERSION_LABELS.emailClick, undefined, { skipRouteCheck: true });
      }

      if (
        params.conversion ||
        params.href === '/contact' ||
        params.href.startsWith('/contact#') ||
        params.href.startsWith('/contractors')
      ) {
        trackEvent('service_cta_click', params);
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}
