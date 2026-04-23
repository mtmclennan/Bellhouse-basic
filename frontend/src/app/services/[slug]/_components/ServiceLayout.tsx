'use client';

import React from 'react';

import type { ServicePage, ServiceSectionId } from '@/types/interfaces';
import type {
  RelatedServiceLinkItem,
  ServiceLocalIntentContent,
} from '@/lib/servicePageLinks';
import {
  getServicePageSections,
  resolveServiceContractorCtaConfig,
  resolveServiceFinalCtaConfig,
  resolveServiceHeroConfig,
  resolveServiceResourcesConfig,
} from '@/lib/servicePageLayout';
import {
  ServiceContractorCtaSection,
  ServiceEquipmentSection,
  ServiceFaqSection,
  ServiceFitSection,
  ServiceFinalCtaSection,
  ServiceHeroSection,
  ServiceIntroSection,
  ServiceLocalIntentSection,
  ServiceProcessSection,
  ServiceProofSection,
  ServiceRelatedServicesSection,
  ServiceResourcesSection,
  ServiceReviewsSection,
} from './ServicePageSections';

interface ServiceLayoutProps {
  service: ServicePage;
  localIntent: ServiceLocalIntentContent | null;
  relatedServices: RelatedServiceLinkItem[];
}

export default function ServiceLayout({
  service,
  localIntent,
  relatedServices,
}: ServiceLayoutProps) {
  const heroConfig = resolveServiceHeroConfig(service);
  const contractorCtaConfig = resolveServiceContractorCtaConfig(service);
  const resourcesConfig = resolveServiceResourcesConfig(service);
  const finalCtaConfig = resolveServiceFinalCtaConfig(service);
  const configuredSections = getServicePageSections(service);

  const sectionRenderers: Record<ServiceSectionId, (emphasis?: 'low' | 'standard' | 'high') => React.ReactNode> =
    {
      intro: (emphasis) => (
        <ServiceIntroSection service={service} emphasis={emphasis} />
      ),
      fit: (emphasis) => <ServiceFitSection service={service} emphasis={emphasis} />,
      proof: (emphasis) => (
        <ServiceProofSection service={service} emphasis={emphasis} />
      ),
      equipment: (emphasis) => (
        <ServiceEquipmentSection service={service} emphasis={emphasis} />
      ),
      process: (emphasis) => (
        <ServiceProcessSection service={service} emphasis={emphasis} />
      ),
      localIntent: (emphasis) => (
        <ServiceLocalIntentSection
          service={service}
          localIntent={localIntent}
          emphasis={emphasis}
        />
      ),
      contractorCta: (emphasis) => (
        <ServiceContractorCtaSection
          contractorCta={contractorCtaConfig}
          emphasis={emphasis}
        />
      ),
      resources: (emphasis) => (
        <ServiceResourcesSection
          resourcesConfig={resourcesConfig}
          emphasis={emphasis}
        />
      ),
      faq: (emphasis) => <ServiceFaqSection service={service} emphasis={emphasis} />,
      relatedServices: (emphasis) => (
        <ServiceRelatedServicesSection
          relatedServices={relatedServices}
          emphasis={emphasis}
        />
      ),
      reviews: (emphasis) => <ServiceReviewsSection emphasis={emphasis} />,
      finalCta: (emphasis) => (
        <ServiceFinalCtaSection
          finalCtaConfig={finalCtaConfig}
          emphasis={emphasis}
        />
      ),
    };

  return (
    <>
      <ServiceHeroSection service={service} heroConfig={heroConfig} />
      {configuredSections.map((section) => (
        <React.Fragment key={section.id}>
          {sectionRenderers[section.id](section.emphasis)}
        </React.Fragment>
      ))}
    </>
  );
}
