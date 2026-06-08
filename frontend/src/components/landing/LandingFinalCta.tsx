import type { LandingPageData } from '@/data/landingPages/types';
import LandingCtaLink from './LandingCtaLink';

type LandingFinalCtaProps = {
  finalCta: LandingPageData['finalCta'];
  serviceKey: string;
  pageSlug: string;
};

export default function LandingFinalCta({
  finalCta,
  serviceKey,
  pageSlug,
}: LandingFinalCtaProps) {
  return (
    <section className="landing-final-cta">
      {finalCta.eyebrow ? (
        <p className="landing-eyebrow">{finalCta.eyebrow}</p>
      ) : null}
      <h2>{finalCta.heading}</h2>
      <p>{finalCta.body}</p>
      <div className="landing-cta-row">
        <LandingCtaLink
          cta={finalCta.primaryCta}
          serviceKey={serviceKey}
          pageSlug={pageSlug}
        />
        {finalCta.secondaryCta ? (
          <LandingCtaLink
            cta={finalCta.secondaryCta}
            serviceKey={serviceKey}
            pageSlug={pageSlug}
          />
        ) : null}
        {finalCta.phoneCta ? (
          <LandingCtaLink
            cta={finalCta.phoneCta}
            serviceKey={serviceKey}
            pageSlug={pageSlug}
          />
        ) : null}
      </div>
    </section>
  );
}
