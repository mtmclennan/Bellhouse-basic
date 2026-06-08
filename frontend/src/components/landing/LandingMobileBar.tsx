import type { LandingPageData } from '@/data/landingPages/types';
import LandingCtaLink from './LandingCtaLink';

type LandingMobileBarProps = {
  mobileBar?: LandingPageData['mobileBar'];
  serviceKey: string;
  pageSlug: string;
};

export default function LandingMobileBar({
  mobileBar,
  serviceKey,
  pageSlug,
}: LandingMobileBarProps) {
  if (!mobileBar) return null;

  return (
    <nav className="landing-mobile-bar" aria-label="Mobile landing page actions">
      <LandingCtaLink
        cta={mobileBar.callCta}
        serviceKey={serviceKey}
        pageSlug={pageSlug}
        conversionType="landing-mobile-call"
      />
      <LandingCtaLink
        cta={mobileBar.textCta}
        serviceKey={serviceKey}
        pageSlug={pageSlug}
        conversionType="landing-mobile-text"
      />
    </nav>
  );
}
