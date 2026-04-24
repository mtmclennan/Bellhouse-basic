import SharedFaqSection from '@/app/components/sections/FaqSection/FaqSection';
import type { ServicePage } from '@/types/interfaces';
import type { FaqSectionData } from '@/types/sections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';

interface ServiceFaqSectionProps {
  service: ServicePage;
  appearance: ServiceSectionAppearance;
}

export default function ServiceFaqSection({
  service,
  appearance,
}: ServiceFaqSectionProps) {
  if (!service.faq) {
    return null;
  }

  const faqSectionData: FaqSectionData = {
    _type: 'faqSection',
    heading: service.faq.heading,
    subtext: 'Clear, helpful answers for builders and homeowners.',
    items: service.faq.items.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
    backgroundVariant: appearance.backgroundVariant,
    backgroundTone: appearance.backgroundTone,
    density: 'relaxed',
    headingAlign: 'left',
  };

  return <SharedFaqSection data={faqSectionData} />;
}
