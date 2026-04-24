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
  configuredSections: ServiceSectionId[];
  sectionAppearances: Record<ServiceSectionId, ServiceSectionAppearance>;
  contractorCtaConfig: ResolvedServiceContractorCtaConfig | null;
  resourcesConfig: ResolvedServiceResourcesConfig | null;
  finalCtaConfig: ResolvedServiceFinalCtaConfig;
}

export default function ServiceSectionRenderer({
  service,
  localIntent,
  relatedServices,
  configuredSections,
  sectionAppearances,
  contractorCtaConfig,
  resourcesConfig,
  finalCtaConfig,
}: ServiceSectionRendererProps) {
  const sectionRenderers: Record<ServiceSectionId, () => ReactNode> = {
    intro: () => (
      <ServiceIntroSection
        service={service}
        appearance={sectionAppearances.intro}
      />
    ),
    fit: () => (
      <ServiceProjectFitSection
        service={service}
        appearance={sectionAppearances.fit}
      />
    ),
    proof: () => (
      <ServiceScopeSection
        service={service}
        appearance={sectionAppearances.proof}
      />
    ),
    equipment: () => (
      <ServiceEquipmentSection
        service={service}
        appearance={sectionAppearances.equipment}
      />
    ),
    process: () => (
      <ServiceProcessSection
        service={service}
        appearance={sectionAppearances.process}
      />
    ),
    localIntent: () => (
      <ServiceAreaLinksSection
        service={service}
        localIntent={localIntent}
        appearance={sectionAppearances.localIntent}
      />
    ),
    contractorCta: () => (
      <ServiceContractorCtaSection
        contractorCta={contractorCtaConfig}
        appearance={sectionAppearances.contractorCta}
      />
    ),
    resources: () => (
      <ServiceResourcesSection
        resourcesConfig={resourcesConfig}
        appearance={sectionAppearances.resources}
      />
    ),
    faq: () => (
      <ServiceFaqSection service={service} appearance={sectionAppearances.faq} />
    ),
    relatedServices: () => (
      <ServiceRelatedServicesSection
        relatedServices={relatedServices}
        appearance={sectionAppearances.relatedServices}
      />
    ),
    reviews: () => (
      <ServiceReviewsSection appearance={sectionAppearances.reviews} />
    ),
    finalCta: () => (
      <ServiceFinalCtaSection
        finalCtaConfig={finalCtaConfig}
        appearance={sectionAppearances.finalCta}
      />
    ),
  };

  return configuredSections.map((sectionId) => (
    <Fragment key={sectionId}>{sectionRenderers[sectionId]()}</Fragment>
  ));
}
