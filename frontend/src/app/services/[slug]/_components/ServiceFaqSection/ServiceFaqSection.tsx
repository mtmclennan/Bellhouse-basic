import SharedFaqSection from '@/app/components/sections/FaqSection/FaqSection';
import type { ServicePage } from '@/types/interfaces';
import type { FaqSectionData } from '@/types/sections';
import type { ServiceFaqSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';

interface ServiceFaqSectionProps {
  service: ServicePage;
  appearance: ServiceSectionAppearance;
  section?: ServiceFaqSectionData;
}

export default function ServiceFaqSection({
  service,
  appearance,
  section,
}: ServiceFaqSectionProps) {
  if (!service.faq && !section) {
    return null;
  }

  const faqSectionData: FaqSectionData = {
    _type: 'faqSection',
    heading: section?.heading ?? service.faq?.heading ?? '',
    subtext: section?.subheading ?? 'Clear, helpful answers for builders and homeowners.',
    items: (section?.items ?? service.faq?.items ?? []).map((item) => ({
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
