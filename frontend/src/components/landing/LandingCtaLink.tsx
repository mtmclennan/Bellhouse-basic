import type { LandingCta } from '@/data/landingPages/types';

export type LandingConversionType =
  | 'landing-primary-cta'
  | 'landing-secondary-cta'
  | 'landing-phone-cta'
  | 'landing-mobile-call'
  | 'landing-mobile-quote';

type LandingCtaLinkProps = {
  cta: LandingCta;
  serviceKey?: string;
  pageSlug?: string;
  conversionType?: LandingConversionType;
};

function getDefaultConversionType(cta: LandingCta): LandingConversionType {
  if (cta.variant === 'phone') return 'landing-phone-cta';
  if (cta.variant === 'secondary') return 'landing-secondary-cta';
  return 'landing-primary-cta';
}

export default function LandingCtaLink({
  cta,
  serviceKey,
  pageSlug,
  conversionType,
}: LandingCtaLinkProps) {
  return (
    <a
      className={
        cta.variant ? `landing-cta landing-cta--${cta.variant}` : 'landing-cta'
      }
      href={cta.href}
      data-conversion={conversionType ?? getDefaultConversionType(cta)}
      data-conversion-service={serviceKey}
      data-conversion-page={pageSlug}
      data-service-key={serviceKey}
      data-tracking-id={cta.trackingId}
    >
      {cta.label}
    </a>
  );
}
