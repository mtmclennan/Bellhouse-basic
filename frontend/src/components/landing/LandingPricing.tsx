import type { LandingPageData } from '@/data/landingPages/types';
import LandingCtaLink from './LandingCtaLink';
import LandingSectionHeading from './LandingSectionHeading';

type LandingPricingProps = {
  pricing?: LandingPageData['pricing'];
  serviceKey: string;
  pageSlug: string;
};

export default function LandingPricing({
  pricing,
  serviceKey,
  pageSlug,
}: LandingPricingProps) {
  if (!pricing) return null;

  return (
    <section className="landing-section landing-section--light landing-pricing">
      <LandingSectionHeading
        eyebrow={pricing.eyebrow}
        heading={pricing.heading}
        intro={pricing.intro}
      />
      <ol className="landing-price-list">
        {pricing.factors.map((factor) => (
          <li key={factor.title}>
            <h3>{factor.title}</h3>
            <p>{factor.description}</p>
          </li>
        ))}
      </ol>
      {pricing.sideNote ? (
        <aside className="landing-side-note">
          <h3>{pricing.sideNote.heading}</h3>
          <p>{pricing.sideNote.body}</p>
          {pricing.sideNote.cta ? (
            <LandingCtaLink
              cta={pricing.sideNote.cta}
              serviceKey={serviceKey}
              pageSlug={pageSlug}
            />
          ) : null}
        </aside>
      ) : null}
    </section>
  );
}
