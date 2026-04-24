import SharedResourcesSection from '@/app/components/sections/ResourcesSection/ResourcesSection';
import type { ResourcesSectionData } from '@/types/sections';
import type { ResolvedServiceResourcesConfig } from '@/lib/servicePageLayout';
import type { ServiceResourcesSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';

interface ServiceResourcesSectionProps {
  resourcesConfig: ResolvedServiceResourcesConfig | null;
  appearance: ServiceSectionAppearance;
  section?: ServiceResourcesSectionData;
}

export default function ServiceResourcesSection({
  resourcesConfig,
  appearance,
  section,
}: ServiceResourcesSectionProps) {
  if (!resourcesConfig && !section) {
    return null;
  }

  const resourcesSectionData: ResourcesSectionData = {
    _type: 'resourcesSection',
    eyebrow: section?.eyebrow ?? resourcesConfig?.eyebrow,
    heading: section?.heading ?? resourcesConfig?.title ?? '',
    subtext: section?.subheading ?? resourcesConfig?.description,
    items: (section?.cards ?? resourcesConfig?.links ?? []).map((linkItem) => {
      const isV2Card = 'body' in linkItem;

      return {
        id: linkItem.href,
        title: linkItem.title,
        description: isV2Card ? linkItem.body : linkItem.description,
        icon: 'calculator',
        href: linkItem.href,
        linkLabel: isV2Card ? linkItem.label : linkItem.actionLabel,
      };
    }),
    footerActions:
      section?.actions?.map((action) => ({
        label: action.label,
        href: action.href,
        variant: action.variant === 'text' ? 'secondary' : action.variant,
      })) ??
      (resourcesConfig
        ? [
            {
              label: resourcesConfig.viewAllAction.label,
              href: resourcesConfig.viewAllAction.href,
              variant: 'secondary' as const,
            },
          ]
        : undefined),
    backgroundVariant: appearance.backgroundVariant,
    backgroundTone: appearance.backgroundTone,
    density: 'compact',
    headingAlign: 'left',
  };

  return <SharedResourcesSection data={resourcesSectionData} />;
}
