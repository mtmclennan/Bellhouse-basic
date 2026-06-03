import type { LandingPageData } from '@/data/landingPages/types';
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
        {audience.items.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
