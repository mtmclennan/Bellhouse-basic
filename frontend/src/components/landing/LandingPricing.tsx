import type { LandingPageData } from '@/data/landingPages/types';
import LandingCtaLink from './LandingCtaLink';
import LandingIcon from './LandingIcon';
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

  const { basis, rail, sideNote } = pricing;

  return (
    <section className="landing-section landing-section--light landing-pricing">
      <LandingSectionHeading
        eyebrow={pricing.eyebrow}
        heading={pricing.heading}
        intro={pricing.intro}
      />

      <div className="landing-pricing__grid">
        {/* LEFT: basis strip + factor list */}
        <div>
          {basis && basis.length > 0 && (
            <div className="landing-price-basis">
              {basis.map((b) => (
                <div className="landing-price-basis__item" key={b.kicker}>
                  <LandingIcon name={b.icon} size={20} color="var(--gold)" />
                  <div className="landing-price-basis__kicker">{b.kicker}</div>
                  <div className="landing-price-basis__title">{b.title}</div>
                </div>
              ))}
            </div>
          )}

          <ol className="landing-price-list">
            {pricing.factors.map((factor, i) => (
              <li className="landing-price-list__item" key={factor.title}>
                <span className="landing-price-list__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>{factor.title}</h3>
                  <p>{factor.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* RIGHT: dark rail (new design) or legacy side note */}
        {rail ? (
          <LandingReveal as="aside" className="landing-price-rail">
            {rail.eyebrow && (
              <span className="landing-eyebrow">{rail.eyebrow}</span>
            )}
            <h3>{rail.heading}</h3>
            <p>{rail.body}</p>

            {(rail.anchorLabel || rail.anchorLow || rail.anchorHigh) && (
              <div className="landing-price-anchor">
                {rail.anchorLabel && (
                  <div className="landing-price-anchor__lbl">{rail.anchorLabel}</div>
                )}
                <div className="landing-price-rangebar" />
                {(rail.anchorLow || rail.anchorHigh) && (
                  <div className="landing-price-range">
                    {rail.anchorLow && (
                      <div className="landing-price-range__end">
                        <div className="landing-price-range__val">{rail.anchorLow.value}</div>
                        <div className="landing-price-range__sub">{rail.anchorLow.sub}</div>
                      </div>
                    )}
                    {rail.anchorHigh && (
                      <div className="landing-price-range__end landing-price-range__end--hi">
                        <div className="landing-price-range__val">{rail.anchorHigh.value}</div>
                        <div className="landing-price-range__sub">{rail.anchorHigh.sub}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {rail.chips && rail.chips.length > 0 && (
              <div className="landing-price-chips">
                {rail.chips.map((chip, i) => (
                  <span className="landing-price-chip" key={i}>
                    <LandingIcon
                      name={i === 0 ? 'check-circle' : 'clock'}
                      size={15}
                      color="var(--yellow)"
                    />
                    {chip}
                  </span>
                ))}
              </div>
            )}

            {rail.cta && (
              <div className="landing-price-rail__cta">
                <LandingCtaLink
                  cta={rail.cta}
                  serviceKey={serviceKey}
                  pageSlug={pageSlug}
                />
              </div>
            )}
          </LandingReveal>
        ) : sideNote ? (
          <LandingReveal as="aside" className="landing-pricing__note landing-side-note">
            <p className="landing-eyebrow">{sideNote.heading}</p>
            <p>{sideNote.body}</p>
            {sideNote.cta ? (
              <LandingCtaLink
                cta={sideNote.cta}
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
