import CardGridSection from '@/app/components/sections/CardGridSection/CardGridSection';
import type { ServicePage } from '@/types/interfaces';
import type { CardGridSectionData } from '@/types/sections';
import type { ServiceProjectFitSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';

interface ServiceProjectFitSectionProps {
  service: ServicePage;
  appearance: ServiceSectionAppearance;
  section?: ServiceProjectFitSectionData;
}

export default function ServiceProjectFitSection({
  service,
  appearance,
  section,
}: ServiceProjectFitSectionProps) {
  if (!service.fit && !section) {
    return null;
  }

  const fitSectionData: CardGridSectionData = {
    _type: 'cardGridSection',
    eyebrow: section?.eyebrow ?? 'Project fit',
    heading: section?.heading ?? service.fit?.heading ?? '',
    subtext: section?.subheading ?? service.fit?.subheading,
    cards: (section?.cards ?? service.fit?.items ?? []).map((item) => {
      const isV2Card = 'body' in item;

      return {
        title: item.title,
        description: isV2Card ? item.body : item.description,
        tags: isV2Card ? item.tags : item.projectTypes,
        outcome: item.outcome,
      };
    }),
    backgroundVariant: appearance.backgroundVariant,
    backgroundTone: appearance.backgroundTone,
    density: 'default',
    headingAlign: 'left',
    layoutStyle: 'fit',
  };

  return <CardGridSection data={fitSectionData} containerSize="wide" />;
}
