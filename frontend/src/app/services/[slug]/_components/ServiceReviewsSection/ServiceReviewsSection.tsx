import TestimonialsSection from '@/app/components/sections/TestimonialsSection/TestimonialsSection';
import reviews from '@/data/reviews.json';
import type { ServiceReviewsSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';

interface ServiceReviewsSectionProps {
  appearance: ServiceSectionAppearance;
  section?: ServiceReviewsSectionData;
}

export default function ServiceReviewsSection({
  appearance,
  section,
}: ServiceReviewsSectionProps) {
  return (
    <TestimonialsSection
      data={{
        _type: 'testimonialsSection',
        eyebrow: section?.eyebrow ?? 'Testimonials',
        heading: section?.heading ?? 'What customers say about Bellhouse',
        subtext:
          section?.subheading ??
          'Feedback from local homeowners, builders, and job-site customers Bellhouse has worked with.',
        reviewSummary: '5.0 on Google from local customers',
        items: typeof section?.limit === 'number' ? reviews.slice(0, section.limit) : reviews,
        backgroundVariant: appearance.backgroundVariant,
        backgroundTone: appearance.backgroundTone,
        density: 'relaxed',
        headingAlign: 'center',
      }}
    />
  );
}
