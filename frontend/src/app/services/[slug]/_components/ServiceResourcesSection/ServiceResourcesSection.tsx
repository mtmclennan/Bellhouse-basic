import SharedResourcesSection from '@/app/components/sections/ResourcesSection/ResourcesSection';
import type { ResourcesSectionData } from '@/types/sections';
import type { ResolvedServiceResourcesConfig } from '@/lib/servicePageLayout';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';

interface ServiceResourcesSectionProps {
  resourcesConfig: ResolvedServiceResourcesConfig | null;
  appearance: ServiceSectionAppearance;
}

export default function ServiceResourcesSection({
  resourcesConfig,
  appearance,
}: ServiceResourcesSectionProps) {
  if (!resourcesConfig) {
    return null;
  }

  const resourcesSectionData: ResourcesSectionData = {
    _type: 'resourcesSection',
    eyebrow: resourcesConfig.eyebrow,
    heading: resourcesConfig.title,
    subtext: resourcesConfig.description,
    items: resourcesConfig.links.map((linkItem) => ({
      id: linkItem.href,
      title: linkItem.title,
      description: linkItem.description,
      icon: 'calculator',
      href: linkItem.href,
      linkLabel: linkItem.actionLabel,
    })),
    footerActions: [
      {
        label: resourcesConfig.viewAllAction.label,
        href: resourcesConfig.viewAllAction.href,
        variant: 'secondary',
      },
    ],
    backgroundVariant: appearance.backgroundVariant,
    backgroundTone: appearance.backgroundTone,
    density: 'compact',
    headingAlign: 'left',
  };

  return <SharedResourcesSection data={resourcesSectionData} />;
}
