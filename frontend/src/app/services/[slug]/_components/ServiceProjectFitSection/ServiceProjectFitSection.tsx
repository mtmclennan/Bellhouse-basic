import CardGridSection from '@/app/components/sections/CardGridSection/CardGridSection';
import type { CardGridSectionData } from '@/types/sections';
import type { ServiceProjectFitSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';

interface ServiceProjectFitSectionProps {
  section: ServiceProjectFitSectionData;
  appearance: ServiceSectionAppearance;
}

export default function ServiceProjectFitSection({
  appearance,
  section,
}: ServiceProjectFitSectionProps) {
  if (!section.cards.length) {
    return null;
  }

  const fitSectionData: CardGridSectionData = {
    _type: 'cardGridSection',
    eyebrow: section.eyebrow ?? 'Project fit',
    heading: section.heading ?? '',
    subtext: section.subheading,
    cards: section.cards.map((item) => ({
      title: item.title,
      description: item.body,
      tags: item.tags,
      outcome: item.outcome,
    })),
    backgroundVariant: appearance.backgroundVariant,
    backgroundTone: appearance.backgroundTone,
    density: 'default',
    headingAlign: 'left',
    layoutStyle: 'fit',
  };

  return <CardGridSection data={fitSectionData} containerSize="wide" />;
}
