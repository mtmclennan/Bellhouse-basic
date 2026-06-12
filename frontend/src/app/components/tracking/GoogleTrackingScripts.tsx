'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { shouldUseGoogleAdsTracking } from '@/lib/tracking/routes';

export default function GoogleTrackingScripts() {
  const pathname = usePathname();
  const configuredAdsPaths = useRef<Set<string>>(new Set());
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const shouldConfigureAds = Boolean(
    adsId && shouldUseGoogleAdsTracking(pathname),
  );

  useEffect(() => {
    if (!adsId || !shouldUseGoogleAdsTracking(pathname)) return;
    if (configuredAdsPaths.current.has(pathname)) return;

    const configureAds = () => {
      if (!window.gtag) return false;

      window.gtag('config', adsId);
      configuredAdsPaths.current.add(pathname);
      return true;
    };

    if (configureAds()) return;

    const intervalId = window.setInterval(() => {
      if (configureAds()) {
        window.clearInterval(intervalId);
      }
    }, 250);

    const timeoutId = window.setTimeout(() => {
      window.clearInterval(intervalId);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [adsId, pathname]);

  if (!gaId && !shouldConfigureAds) return null;

  const primaryId = gaId || adsId;
  if (!primaryId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
      />

      <Script id="google-tracking" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());

          ${gaId ? `gtag('config', ${JSON.stringify(gaId)});` : ''}
        `}
      </Script>
    </>
  );
}
