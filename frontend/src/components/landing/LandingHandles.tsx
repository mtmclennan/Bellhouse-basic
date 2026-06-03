import type { LandingPageData } from '@/data/landingPages/types';
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
        {handles.items.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
