import type { LandingPageData } from '@/data/landingPages/types';
import LandingCtaLink from './LandingCtaLink';
import LandingReveal from './LandingReveal';
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
      <div className="landing-pricing__layout">
        <ol className="landing-pricing__factors landing-price-list">
          {pricing.factors.map((factor) => (
            <li className="landing-pricing__factor" key={factor.title}>
              <h3>{factor.title}</h3>
              <p>{factor.description}</p>
            </li>
          ))}
        </ol>
        {pricing.sideNote ? (
          <LandingReveal as="aside" className="landing-pricing__note landing-side-note">
            <p className="landing-eyebrow">{pricing.sideNote.heading}</p>
            <p>{pricing.sideNote.body}</p>
            {pricing.sideNote.cta ? (
              <LandingCtaLink
                cta={pricing.sideNote.cta}
                serviceKey={serviceKey}
                pageSlug={pageSlug}
              />
            ) : null}
          </LandingReveal>
        ) : null}
      </div>
    </section>
  );
}
