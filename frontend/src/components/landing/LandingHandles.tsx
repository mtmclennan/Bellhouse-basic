import type { LandingPageData } from '@/data/landingPages/types';
import LandingIcon from './LandingIcon';
import LandingReveal from './LandingReveal';
import LandingSectionHeading from './LandingSectionHeading';

type LandingHandlesProps = {
  handles?: LandingPageData['handles'];
};

export default function LandingHandles({ handles }: LandingHandlesProps) {
  if (!handles) return null;

  return (
    <section className="landing-section landing-section--dark landing-handles">
      <LandingSectionHeading
        eyebrow={handles.eyebrow}
        heading={handles.heading}
        intro={handles.intro}
      />
      <div className="landing-card-grid">
        {handles.items.map((item, i) => (
          <LandingReveal key={item.title} as="article" delay={(i % 3) * 0.06}>
            {item.icon ? (
              <LandingIcon name={item.icon} size={28} />
            ) : null}
            <div className="landing-handles__body">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </LandingReveal>
        ))}
      </div>
    </section>
  );
}
