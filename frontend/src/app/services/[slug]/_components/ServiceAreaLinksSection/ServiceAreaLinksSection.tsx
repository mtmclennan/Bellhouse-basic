import SharedServiceAreasSection from '@/app/components/sections/ServiceAreaSection/ServiceAreaSection';
import type { ServicePage } from '@/types/interfaces';
import type { ServiceAreasSectionData } from '@/types/sections';
import type { ServiceLocalIntentContent } from '@/lib/servicePageLinks';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';

interface ServiceAreaLinksSectionProps {
  service: ServicePage;
  localIntent: ServiceLocalIntentContent | null;
  appearance: ServiceSectionAppearance;
}

export default function ServiceAreaLinksSection({
  service,
  localIntent,
  appearance,
}: ServiceAreaLinksSectionProps) {
  if (!service.serviceArea || !localIntent) {
    return null;
  }

  const serviceAreasData: ServiceAreasSectionData = {
    _type: 'serviceAreasSection',
    eyebrow: 'Service areas',
    heading: service.serviceArea.heading,
    subtext: localIntent.paragraph,
    locations: localIntent.linkedAreas.map((location) => ({
      label: location.label,
      href: location.href,
    })),
    locationLinkLabelPrefix: 'See service in ',
    actions: [
      {
        label: localIntent.viewAllLabel,
        href: localIntent.viewAllHref,
        variant: 'secondary',
      },
    ],
    backgroundVariant: appearance.backgroundVariant,
    backgroundTone: appearance.backgroundTone,
    density: 'compact',
  };

  return <SharedServiceAreasSection data={serviceAreasData} />;
}
