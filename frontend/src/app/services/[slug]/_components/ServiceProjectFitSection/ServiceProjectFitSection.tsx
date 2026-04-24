import CardGridSection from '@/app/components/sections/CardGridSection/CardGridSection';
import type { ServicePage } from '@/types/interfaces';
import type { CardGridSectionData } from '@/types/sections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';

interface ServiceProjectFitSectionProps {
  service: ServicePage;
  appearance: ServiceSectionAppearance;
}

export default function ServiceProjectFitSection({
  service,
  appearance,
}: ServiceProjectFitSectionProps) {
  if (!service.fit) {
    return null;
  }

  const fitSectionData: CardGridSectionData = {
    _type: 'cardGridSection',
    eyebrow: 'Project fit',
    heading: service.fit.heading,
    subtext: service.fit.subheading,
    cards: service.fit.items.map((item) => ({
      title: item.title,
      description: item.description,
      tags: item.projectTypes,
      outcome: item.outcome,
    })),
    backgroundVariant: appearance.backgroundVariant,
    backgroundTone: appearance.backgroundTone,
    density: 'default',
    headingAlign: 'left',
    layoutStyle: 'fit',
  };

  return <CardGridSection data={fitSectionData} />;
}
