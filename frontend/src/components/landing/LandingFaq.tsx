import type { LandingPageData } from '@/data/landingPages/types';
import LandingSectionHeading from './LandingSectionHeading';

type LandingFaqProps = {
  faq?: LandingPageData['faq'];
};

export default function LandingFaq({ faq }: LandingFaqProps) {
  if (!faq) return null;

  return (
    <section className="landing-section landing-section--light landing-faq">
      <LandingSectionHeading eyebrow={faq.eyebrow} heading={faq.heading} />
      <div className="landing-faq-list">
        {faq.items.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
