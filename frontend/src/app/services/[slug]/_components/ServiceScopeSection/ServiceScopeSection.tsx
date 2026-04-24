import CardGridSection from '@/app/components/sections/CardGridSection/CardGridSection';
import type { ServicePage } from '@/types/interfaces';
import type { CardGridSectionData } from '@/types/sections';
import type { ServiceScopeSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';

interface ServiceScopeSectionProps {
  service: ServicePage;
  appearance: ServiceSectionAppearance;
  section?: ServiceScopeSectionData;
}

export default function ServiceScopeSection({
  service,
  appearance,
  section,
}: ServiceScopeSectionProps) {
  if (!service.includes && !section) {
    return null;
  }

  const scopeSectionData: CardGridSectionData = {
    _type: 'cardGridSection',
    heading: section?.heading ?? service.includes?.heading ?? '',
    subtext: section?.subheading ?? service.includes?.subheading,
    cards: (section?.items ?? service.includes?.items ?? []).map((item) => ({
      title: item.title,
      description: 'body' in item ? item.body : item.description,
    })),
    backgroundVariant: appearance.backgroundVariant,
    backgroundTone: appearance.backgroundTone,
    density: 'compact',
    headingAlign: 'center',
    layoutStyle: 'proof',
  };

  return <CardGridSection data={scopeSectionData} />;
}
