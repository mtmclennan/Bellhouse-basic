import SharedFinalCtaSection from '@/app/components/sections/FinalCtaSection/FinalCtaSection';
import type { FinalCtaSectionData } from '@/types/sections';
import type { ResolvedServiceFinalCtaConfig } from '@/lib/servicePageLayout';
import type { ServiceFinalCtaSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';

interface ServiceFinalCtaSectionProps {
  finalCtaConfig: ResolvedServiceFinalCtaConfig;
  appearance: ServiceSectionAppearance;
  section?: ServiceFinalCtaSectionData;
}

export default function ServiceFinalCtaSection({
  finalCtaConfig,
  appearance,
  section,
}: ServiceFinalCtaSectionProps) {
  const finalCtaSectionData: FinalCtaSectionData = {
    _type: 'finalCtaSection',
    heading: section?.heading ?? finalCtaConfig.heading,
    text: section?.body ?? finalCtaConfig.subheading,
    primaryAction:
      section?.actions[0]
        ? {
            label: section.actions[0].label,
            href: section.actions[0].href,
          }
        : finalCtaConfig.primaryAction,
    secondaryAction:
      section?.actions[1]
        ? {
            label: section.actions[1].label,
            href: section.actions[1].href,
          }
        : finalCtaConfig.secondaryAction,
    backgroundVariant: appearance.backgroundVariant,
    backgroundTone: appearance.backgroundTone,
    density: 'compact',
  };

  return <SharedFinalCtaSection data={finalCtaSectionData} />;
}
