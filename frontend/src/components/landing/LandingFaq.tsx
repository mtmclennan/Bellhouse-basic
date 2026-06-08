import type { LandingPageData } from '@/data/landingPages/types';
import LandingFaqAccordion from './LandingFaqAccordion';
import LandingSectionHeading from './LandingSectionHeading';

type LandingFaqProps = {
  faq?: LandingPageData['faq'];
};

export default function LandingFaq({ faq }: LandingFaqProps) {
  if (!faq) return null;

  return (
    <section className="landing-section landing-section--light landing-faq">
      <LandingSectionHeading eyebrow={faq.eyebrow} heading={faq.heading} />
      <LandingFaqAccordion items={faq.items} />
    </section>
  );
}
