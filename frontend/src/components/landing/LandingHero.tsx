import Image from 'next/image';
import type { LandingPageData } from '@/data/landingPages/types';
import LandingCtaLink from './LandingCtaLink';
import LandingQuoteForm from './LandingQuoteForm';

type LandingHeroProps = {
  hero: LandingPageData['hero'];
  form: LandingPageData['form'];
  serviceKey: string;
  pageSlug: string;
};

export default function LandingHero({
  hero,
  form,
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
        {hero.eyebrow ? <p className="landing-eyebrow">{hero.eyebrow}</p> : null}
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
        {hero.bullets?.length ? (
          <ul>
            {hero.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
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

      <div id="landing-quote">
        <LandingQuoteForm
          form={form}
          serviceKey={serviceKey}
          pageSlug={pageSlug}
        />
      </div>
    </section>
  );
}
