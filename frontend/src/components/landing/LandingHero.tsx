import Image from 'next/image';
import type { LandingPageData } from '@/data/landingPages/types';
import LandingCtaLink from './LandingCtaLink';
import LandingIcon from './LandingIcon';
import LandingQuoteForm from './LandingQuoteForm';
import LandingTrustBar from './LandingTrustBar';

type LandingHeroProps = {
  hero: LandingPageData['hero'];
  form: LandingPageData['form'];
  trustBar?: LandingPageData['trustBar'];
  serviceKey: string;
  pageSlug: string;
};

export default function LandingHero({
  hero,
  form,
  trustBar,
  serviceKey,
  pageSlug,
}: LandingHeroProps) {
  return (
    <section className="landing-hero">
      {hero.backgroundImage ? (
        <div className="landing-hero-image">
          <Image
            src={hero.backgroundImage.src}
            alt={hero.backgroundImage.alt}
            fill
            priority={hero.backgroundImage.priority}
            sizes="100vw"
          />
        </div>
      ) : null}
      <div className="landing-hero-copy">
        {hero.eyebrow ? (
          <p className="landing-eyebrow landing-hero-eyebrow">
            <LandingIcon name="map-pin" size={16} />
            {hero.eyebrow}
          </p>
        ) : null}
        <h1>
          {hero.titleHighlight ? (
            <span className="landing-hero-keyword">{hero.titleHighlight}</span>
          ) : null}
          {hero.title}
        </h1>
        <p>{hero.subtitle}</p>
        {hero.bullets?.length ? (
          <ul>
            {hero.bullets.map((bullet) => (
              <li key={bullet}>
                <LandingIcon name="check-circle" size={22} />
                {bullet}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="landing-cta-row">
          <LandingCtaLink
            cta={hero.primaryCta}
            serviceKey={serviceKey}
            pageSlug={pageSlug}
          />
          {hero.secondaryCta ? (
            <LandingCtaLink
              cta={hero.secondaryCta}
              serviceKey={serviceKey}
              pageSlug={pageSlug}
            />
          ) : null}
          {hero.phoneCta ? (
            <LandingCtaLink
              cta={hero.phoneCta}
              serviceKey={serviceKey}
              pageSlug={pageSlug}
            />
          ) : null}
        </div>
      </div>

      {/*
        The quote form is the primary conversion element and sits above the
        fold, so it is intentionally NOT wrapped in LandingReveal — it must
        render instantly and always, without depending on JS or scroll.
      */}
      <div id="landing-quote">
        <LandingQuoteForm
          form={form}
          serviceKey={serviceKey}
          pageSlug={pageSlug}
        />
      </div>

      <LandingTrustBar trustBar={trustBar} />
    </section>
  );
}
