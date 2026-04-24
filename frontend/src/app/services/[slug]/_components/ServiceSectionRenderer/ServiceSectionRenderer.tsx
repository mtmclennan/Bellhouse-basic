import { Fragment } from 'react';
import type { ReactNode } from 'react';

import type { ServicePage, ServiceSectionId } from '@/types/interfaces';
import type {
  RelatedServiceLinkItem,
  ServiceLocalIntentContent,
} from '@/lib/servicePageLinks';
import type {
  ResolvedServiceContractorCtaConfig,
  ResolvedServiceFinalCtaConfig,
  ResolvedServiceResourcesConfig,
} from '@/lib/servicePageLayout';
import type { ResolvedServiceSection } from '@/lib/services/resolveServicePage';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceAreaLinksSection from '../ServiceAreaLinksSection/ServiceAreaLinksSection';
import ServiceContractorCtaSection from '../ServiceContractorCtaSection/ServiceContractorCtaSection';
import ServiceEquipmentSection from '../ServiceEquipmentSection/ServiceEquipmentSection';
import ServiceFaqSection from '../ServiceFaqSection/ServiceFaqSection';
import ServiceFinalCtaSection from '../ServiceFinalCtaSection/ServiceFinalCtaSection';
import ServiceIntroSection from '../ServiceIntroSection/ServiceIntroSection';
import ServiceProcessSection from '../ServiceProcessSection/ServiceProcessSection';
import ServiceProjectFitSection from '../ServiceProjectFitSection/ServiceProjectFitSection';
import ServiceRelatedServicesSection from '../ServiceRelatedServicesSection/ServiceRelatedServicesSection';
import ServiceResourcesSection from '../ServiceResourcesSection/ServiceResourcesSection';
import ServiceReviewsSection from '../ServiceReviewsSection/ServiceReviewsSection';
import ServiceScopeSection from '../ServiceScopeSection/ServiceScopeSection';

interface ServiceSectionRendererProps {
  service: ServicePage;
  localIntent: ServiceLocalIntentContent | null;
  relatedServices: RelatedServiceLinkItem[];
  resolvedSections: ResolvedServiceSection[];
  sectionAppearances: ServiceSectionAppearance[];
  contractorCtaConfig: ResolvedServiceContractorCtaConfig | null;
  resourcesConfig: ResolvedServiceResourcesConfig | null;
  finalCtaConfig: ResolvedServiceFinalCtaConfig;
}

export default function ServiceSectionRenderer({
  service,
  localIntent,
  relatedServices,
  resolvedSections,
  sectionAppearances,
  contractorCtaConfig,
  resourcesConfig,
  finalCtaConfig,
}: ServiceSectionRendererProps) {
  const renderLegacySection = (
    sectionId: ServiceSectionId,
    appearance: ServiceSectionAppearance,
  ): ReactNode => {
    const sectionRenderers: Record<ServiceSectionId, () => ReactNode> = {
      intro: () => (
        <ServiceIntroSection service={service} appearance={appearance} />
      ),
      fit: () => (
        <ServiceProjectFitSection service={service} appearance={appearance} />
      ),
      proof: () => (
        <ServiceScopeSection service={service} appearance={appearance} />
      ),
      equipment: () => (
        <ServiceEquipmentSection service={service} appearance={appearance} />
      ),
      process: () => (
        <ServiceProcessSection service={service} appearance={appearance} />
      ),
      localIntent: () => (
        <ServiceAreaLinksSection
          service={service}
          localIntent={localIntent}
          appearance={appearance}
        />
      ),
      contractorCta: () => (
        <ServiceContractorCtaSection
          contractorCta={contractorCtaConfig}
          appearance={appearance}
        />
      ),
      resources: () => (
        <ServiceResourcesSection
          resourcesConfig={resourcesConfig}
          appearance={appearance}
        />
      ),
      faq: () => <ServiceFaqSection service={service} appearance={appearance} />,
      relatedServices: () => (
        <ServiceRelatedServicesSection
          relatedServices={relatedServices}
          appearance={appearance}
        />
      ),
      reviews: () => <ServiceReviewsSection appearance={appearance} />,
      finalCta: () => (
        <ServiceFinalCtaSection
          finalCtaConfig={finalCtaConfig}
          appearance={appearance}
        />
      ),
    };

    return sectionRenderers[sectionId]();
  };

  const renderV2Section = (
    resolvedSection: Extract<ResolvedServiceSection, { mode: 'v2' }>,
    appearance: ServiceSectionAppearance,
  ): ReactNode => {
    switch (resolvedSection.section.type) {
      case 'intro':
        return (
          <ServiceIntroSection
            service={service}
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'projectFit':
        return (
          <ServiceProjectFitSection
            service={service}
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'scope':
        return (
          <ServiceScopeSection
            service={service}
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'equipment':
        return (
          <ServiceEquipmentSection
            service={service}
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'process':
        return (
          <ServiceProcessSection
            service={service}
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'serviceAreas':
        return (
          <ServiceAreaLinksSection
            service={service}
            localIntent={localIntent}
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'contractorCta':
        return (
          <ServiceContractorCtaSection
            contractorCta={contractorCtaConfig}
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'resources':
        return (
          <ServiceResourcesSection
            resourcesConfig={resourcesConfig}
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'faq':
        return (
          <ServiceFaqSection
            service={service}
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'relatedServices':
        return (
          <ServiceRelatedServicesSection
            relatedServices={relatedServices}
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'reviews':
        return (
          <ServiceReviewsSection
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'finalCta':
        return (
          <ServiceFinalCtaSection
            finalCtaConfig={finalCtaConfig}
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'proofStrip':
      case 'problemsPrevented':
      case 'outcomes':
        return null;
      default:
        return renderLegacySection(resolvedSection.id, appearance);
    }
  };

  return resolvedSections.map((resolvedSection, index) => {
    const appearance = sectionAppearances[index];

    const content =
      resolvedSection.mode === 'legacy'
        ? renderLegacySection(resolvedSection.id, appearance)
        : renderV2Section(resolvedSection, appearance);

    return <Fragment key={resolvedSection.key}>{content}</Fragment>;
  });
}
