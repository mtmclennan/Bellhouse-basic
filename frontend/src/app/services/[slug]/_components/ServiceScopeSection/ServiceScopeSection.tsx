import CardGridSection from '@/app/components/sections/CardGridSection/CardGridSection';
import type { ServicePage } from '@/types/interfaces';
import type { CardGridSectionData } from '@/types/sections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';

interface ServiceScopeSectionProps {
  service: ServicePage;
  appearance: ServiceSectionAppearance;
}

export default function ServiceScopeSection({
  service,
  appearance,
}: ServiceScopeSectionProps) {
  if (!service.includes) {
    return null;
  }

  const scopeSectionData: CardGridSectionData = {
    _type: 'cardGridSection',
    heading: service.includes.heading,
    subtext: service.includes.subheading,
    cards: service.includes.items.map((item) => ({
      title: item.title,
      description: item.description,
    })),
    backgroundVariant: appearance.backgroundVariant,
    backgroundTone: appearance.backgroundTone,
    density: 'compact',
    headingAlign: 'center',
    layoutStyle: 'proof',
  };

  return <CardGridSection data={scopeSectionData} />;
}
