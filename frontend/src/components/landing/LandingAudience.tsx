import type { LandingPageData } from '@/data/landingPages/types';
import LandingIcon from './LandingIcon';
import LandingReveal from './LandingReveal';
import LandingSectionHeading from './LandingSectionHeading';

type LandingAudienceProps = {
  audience?: LandingPageData['audience'];
};

export default function LandingAudience({ audience }: LandingAudienceProps) {
  if (!audience) return null;

  return (
    <section className="landing-section landing-section--light landing-audience">
      <LandingSectionHeading
        eyebrow={audience.eyebrow}
        heading={audience.heading}
        intro={audience.intro}
      />
      <div className="landing-card-grid">
        {audience.items.map((item, i) => (
          <LandingReveal key={item.title} as="article" delay={i * 0.06}>
            {item.icon ? (
              <LandingIcon name={item.icon} size={34} color="#7a5a00" />
            ) : null}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </LandingReveal>
        ))}
      </div>
    </section>
  );
}
