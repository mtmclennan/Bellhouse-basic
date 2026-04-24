import TestimonialsSection from '@/app/components/sections/TestimonialsSection/TestimonialsSection';
import reviews from '@/data/reviews.json';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';

interface ServiceReviewsSectionProps {
  appearance: ServiceSectionAppearance;
}

export default function ServiceReviewsSection({
  appearance,
}: ServiceReviewsSectionProps) {
  return (
    <TestimonialsSection
      data={{
        _type: 'testimonialsSection',
        eyebrow: 'Testimonials',
        heading: 'What customers say about Bellhouse',
        subtext:
          'Feedback from local homeowners, builders, and job-site customers Bellhouse has worked with.',
        reviewSummary: '5.0 on Google from local customers',
        items: reviews,
        backgroundVariant: appearance.backgroundVariant,
        backgroundTone: appearance.backgroundTone,
        density: 'relaxed',
        headingAlign: 'center',
      }}
    />
  );
}
