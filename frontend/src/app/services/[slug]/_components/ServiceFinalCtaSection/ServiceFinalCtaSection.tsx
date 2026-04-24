import SharedFinalCtaSection from '@/app/components/sections/FinalCtaSection/FinalCtaSection';
import type { FinalCtaSectionData } from '@/types/sections';
import type { ResolvedServiceFinalCtaConfig } from '@/lib/servicePageLayout';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';

interface ServiceFinalCtaSectionProps {
  finalCtaConfig: ResolvedServiceFinalCtaConfig;
  appearance: ServiceSectionAppearance;
}

export default function ServiceFinalCtaSection({
  finalCtaConfig,
  appearance,
}: ServiceFinalCtaSectionProps) {
  const finalCtaSectionData: FinalCtaSectionData = {
    _type: 'finalCtaSection',
    heading: finalCtaConfig.heading,
    text: finalCtaConfig.subheading,
    primaryAction: finalCtaConfig.primaryAction,
    secondaryAction: finalCtaConfig.secondaryAction,
    backgroundVariant: appearance.backgroundVariant,
    backgroundTone: appearance.backgroundTone,
    density: 'compact',
  };

  return <SharedFinalCtaSection data={finalCtaSectionData} />;
}
