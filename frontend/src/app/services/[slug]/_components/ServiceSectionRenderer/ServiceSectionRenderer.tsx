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
import type { CmsServicePage } from '@/types/services/cms';
import type {
  ServiceAreasSectionData,
  ServiceContractorCtaSectionData,
  ServiceEquipmentSectionData,
  ServiceFaqSectionData,
  ServiceFinalCtaSectionData,
  ServiceIntroSectionData,
  ServiceProcessSectionData,
  ServiceProjectFitSectionData,
  ServiceRelatedServicesSectionData,
  ServiceResourcesSectionData,
  ServiceReviewsSectionData,
  ServiceScopeSectionData,
} from '@/types/serviceSections';
import { SERVICE_SITE_CONTEXT } from '@/lib/services/serviceSiteContext';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceAreaLinksSection from '../ServiceAreaLinksSection/ServiceAreaLinksSection';
import ServiceContractorCtaSection from '../ServiceContractorCtaSection/ServiceContractorCtaSection';
import ServiceEquipmentSection from '../ServiceEquipmentSection/ServiceEquipmentSection';
import ServiceFaqSection from '../ServiceFaqSection/ServiceFaqSection';
import ServiceFinalCtaSection from '../ServiceFinalCtaSection/ServiceFinalCtaSection';
import ServiceIntroSection from '../ServiceIntroSection/ServiceIntroSection';
import ServiceJobsiteProofSection from '../ServiceJobsiteProofSection/ServiceJobsiteProofSection';
import ServiceOutcomesSection from '../ServiceOutcomesSection/ServiceOutcomesSection';
import ServiceProcessSection from '../ServiceProcessSection/ServiceProcessSection';
import ServiceProblemsPreventedSection from '../ServiceProblemsPreventedSection/ServiceProblemsPreventedSection';
import ServiceProofStripSection from '../ServiceProofStripSection/ServiceProofStripSection';
import ServiceProjectFitSection from '../ServiceProjectFitSection/ServiceProjectFitSection';
import ServiceRelatedServicesSection from '../ServiceRelatedServicesSection/ServiceRelatedServicesSection';
import ServiceRiskReadinessSection from '../ServiceRiskReadinessSection/ServiceRiskReadinessSection';
import ServiceResourcesSection from '../ServiceResourcesSection/ServiceResourcesSection';
import ServiceReviewsSection from '../ServiceReviewsSection/ServiceReviewsSection';
import ServiceScopeSection from '../ServiceScopeSection/ServiceScopeSection';
import ServicePricingSection from '../ServicePricingSection/ServicePricingSection';
import ServiceBannerSection from '../ServiceBannerSection/ServiceBannerSection';

type ServiceAreaLink = {
  label: string;
  href?: string;
};

type LegacyServiceSectionRendererProps = {
  mode: 'legacy';
  service: ServicePage;
  localIntent: ServiceLocalIntentContent | null;
  relatedServices: RelatedServiceLinkItem[];
  resolvedSections: ResolvedServiceSection[];
  sectionAppearances: ServiceSectionAppearance[];
  contractorCtaConfig: ResolvedServiceContractorCtaConfig | null;
  resourcesConfig: ResolvedServiceResourcesConfig | null;
  finalCtaConfig: ResolvedServiceFinalCtaConfig;
};

type CmsServiceSectionRendererProps = {
  mode: 'cms';
  sections: CmsServicePage['sections'];
  sectionAppearances: ServiceSectionAppearance[];
  serviceSlug?: string;
};

type ServiceSectionRendererProps =
  | LegacyServiceSectionRendererProps
  | CmsServiceSectionRendererProps;

export default function ServiceSectionRenderer({
  ...props
}: ServiceSectionRendererProps) {
  const { sectionAppearances } = props;
  const getLegacyProps = (): LegacyServiceSectionRendererProps => {
    if (props.mode !== 'legacy') {
      throw new Error('Legacy service section requested while rendering CMS sections.');
    }

    return props;
  };

  const getLegacyIntroSection = (): ServiceIntroSectionData => {
    const { service } = getLegacyProps();

    return {
      type: 'intro',
      heading: service.intro.heading,
      body: service.intro.content,
      bullets: service.intro.keypoints,
    };
  };

  const getLegacyScopeSection = (): ServiceScopeSectionData => {
    const { service } = getLegacyProps();

    return {
      type: 'scope',
      heading: service.includes?.heading,
      subheading: service.includes?.subheading,
      items: (service.includes?.items ?? []).map((item) => ({
        title: item.title,
        body: item.description,
      })),
    };
  };

  const getLegacyProcessSection = (): ServiceProcessSectionData => {
    const { service } = getLegacyProps();

    return {
      type: 'process',
      heading: service.process?.heading,
      subheading: service.process?.subheading,
      steps: (service.process?.steps ?? []).map((step) => ({
        title: step.title,
        body: step.description,
      })),
    };
  };

  const getLegacyFaqSection = (): ServiceFaqSectionData => {
    const { service } = getLegacyProps();

    return {
      type: 'faq',
      heading: service.faq?.heading,
      items: (service.faq?.items ?? []).map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
    };
  };

  const getLegacyEquipmentSection = (): ServiceEquipmentSectionData => {
    const { service } = getLegacyProps();

    return {
      type: 'equipment',
      heading: service.equipment?.heading,
      subheading: service.equipment?.subheading,
      items: (service.equipment?.items ?? []).map((item) => ({
        name: item.title,
        body: item.description,
        image: item.icon
          ? {
              src: item.icon,
              alt: item.title,
            }
          : undefined,
      })),
    };
  };

  const getLegacyProjectFitSection = (): ServiceProjectFitSectionData => {
    const { service } = getLegacyProps();

    return {
      type: 'projectFit',
      heading: service.fit?.heading,
      subheading: service.fit?.subheading,
      cards: (service.fit?.items ?? []).map((item) => ({
        title: item.title,
        body: item.description,
        tags: item.projectTypes,
        outcome: item.outcome,
      })),
    };
  };

  const getServiceAreaLinksFromSlugs = (
    areaSlugs: string[] = [],
  ): ServiceAreaLink[] =>
    areaSlugs
      .map((slug) => SERVICE_SITE_CONTEXT.areaIndex[slug])
      .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const getLegacyServiceAreasSection = (): ServiceAreasSectionData => {
    const { service, localIntent } = getLegacyProps();

    return {
      type: 'serviceAreas',
      heading: service.serviceArea?.heading,
      body: localIntent?.paragraph ?? service.serviceArea?.content,
    };
  };

  const getLegacyServiceAreaLinks = (): ServiceAreaLink[] => {
    const { localIntent } = getLegacyProps();

    return (localIntent?.linkedAreas ?? []).map((location) => ({
      label: location.label,
      href: location.href,
    }));
  };

  const getLegacyResourcesSection = (): ServiceResourcesSectionData => {
    const { resourcesConfig } = getLegacyProps();

    return {
      type: 'resources',
      eyebrow: resourcesConfig?.eyebrow,
      heading: resourcesConfig?.title,
      subheading: resourcesConfig?.description,
      cards: (resourcesConfig?.links ?? []).map((item) => ({
        title: item.title,
        body: item.description,
        href: item.href,
        label: item.actionLabel,
      })),
      actions: resourcesConfig
        ? [
            {
              label: resourcesConfig.viewAllAction.label,
              href: resourcesConfig.viewAllAction.href,
              variant: 'secondary',
            },
          ]
        : undefined,
    };
  };

  const getLegacyRelatedServicesSection =
    (): ServiceRelatedServicesSectionData => ({
      type: 'relatedServices',
      serviceSlugs: [],
    });

  const MAX_RELATED_SERVICES = 3;

  const getRelatedServiceLinksFromSlugs = (
    serviceSlugs: string[] = [],
  ): RelatedServiceLinkItem[] =>
    serviceSlugs
      .slice(0, MAX_RELATED_SERVICES)
      .map((slug) => SERVICE_SITE_CONTEXT.serviceIndex[slug])
      .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const getLegacyReviewsSection = (): ServiceReviewsSectionData => ({
    type: 'reviews',
  });

  const getLegacyContractorCtaSection =
    (): ServiceContractorCtaSectionData | null => {
      const { contractorCtaConfig } = getLegacyProps();

      if (!contractorCtaConfig) {
        return null;
      }

      const actions: ServiceContractorCtaSectionData['actions'] = [
        {
          label: contractorCtaConfig.primaryAction.label,
          href: contractorCtaConfig.primaryAction.href,
          variant: 'primary' as const,
        },
      ];

      if (contractorCtaConfig.secondaryAction) {
        actions.push({
          label: contractorCtaConfig.secondaryAction.label,
          href: contractorCtaConfig.secondaryAction.href,
          variant: 'secondary' as const,
        });
      }

      return {
        type: 'contractorCta',
        eyebrow: contractorCtaConfig.eyebrow,
        heading: contractorCtaConfig.title,
        body: contractorCtaConfig.description,
        actions,
      };
    };

  const getLegacyFinalCtaSection = (): ServiceFinalCtaSectionData | null => {
    const { finalCtaConfig } = getLegacyProps();

    if (!finalCtaConfig) {
      return null;
    }

    const actions: ServiceFinalCtaSectionData['actions'] = [
      {
        label: finalCtaConfig.primaryAction.label,
        href: finalCtaConfig.primaryAction.href,
        variant: 'primary',
      },
    ];

    if (finalCtaConfig.secondaryAction) {
      actions.push({
        label: finalCtaConfig.secondaryAction.label,
        href: finalCtaConfig.secondaryAction.href,
        variant: 'secondary',
      });
    }

    return {
      type: 'finalCta',
      heading: finalCtaConfig.heading,
      body: finalCtaConfig.subheading,
      actions,
    };
  };

  const getReviewsForSection = (section: ServiceReviewsSectionData) => {
    const reviews = section.reviewIds?.length
      ? section.reviewIds
          .map((reviewId) =>
            SERVICE_SITE_CONTEXT.reviews.find((review) => review.id === reviewId),
          )
          .filter((review): review is NonNullable<typeof review> =>
            Boolean(review),
          )
      : SERVICE_SITE_CONTEXT.reviews;

    return typeof section.limit === 'number'
      ? reviews.slice(0, section.limit)
      : reviews;
  };

  const renderLegacySection = (
    sectionId: ServiceSectionId,
    appearance: ServiceSectionAppearance,
  ): ReactNode => {
    const sectionRenderers: Record<ServiceSectionId, () => ReactNode> = {
      intro: () => (
        <ServiceIntroSection
          section={getLegacyIntroSection()}
          appearance={appearance}
        />
      ),
      fit: () => (
        <ServiceProjectFitSection
          section={getLegacyProjectFitSection()}
          appearance={appearance}
        />
      ),
      proof: () => (
        <ServiceScopeSection
          section={getLegacyScopeSection()}
          appearance={appearance}
        />
      ),
      equipment: () => (
        <ServiceEquipmentSection
          section={getLegacyEquipmentSection()}
          appearance={appearance}
        />
      ),
      process: () => (
        <ServiceProcessSection
          section={getLegacyProcessSection()}
          appearance={appearance}
        />
      ),
      localIntent: () => {
        const { localIntent } = getLegacyProps();

        return (
          <ServiceAreaLinksSection
            section={getLegacyServiceAreasSection()}
            areaLinks={getLegacyServiceAreaLinks()}
            viewAllAction={
              localIntent
                ? {
                    label: localIntent.viewAllLabel,
                    href: localIntent.viewAllHref,
                    variant: 'secondary',
                  }
                : undefined
            }
            appearance={appearance}
          />
        );
      },
      contractorCta: () => {
        const section = getLegacyContractorCtaSection();

        return section ? (
          <ServiceContractorCtaSection
            section={section}
            appearance={appearance}
          />
        ) : null;
      },
      resources: () => (
        <ServiceResourcesSection
          section={getLegacyResourcesSection()}
          appearance={appearance}
        />
      ),
      faq: () => (
        <ServiceFaqSection
          section={getLegacyFaqSection()}
          appearance={appearance}
        />
      ),
      relatedServices: () => {
        const { relatedServices } = getLegacyProps();

        return (
          <ServiceRelatedServicesSection
            section={getLegacyRelatedServicesSection()}
            relatedServices={relatedServices}
            appearance={appearance}
          />
        );
      },
      reviews: () => {
        const section = getLegacyReviewsSection();

        return (
          <ServiceReviewsSection
            section={section}
            reviews={getReviewsForSection(section)}
            business={SERVICE_SITE_CONTEXT.business}
            appearance={appearance}
          />
        );
      },
      finalCta: () => {
        const section = getLegacyFinalCtaSection();
        const { service } = getLegacyProps();

        return section ? (
          <ServiceFinalCtaSection
            section={section}
            appearance={appearance}
            serviceKey={service.slug}
          />
        ) : null;
      },
    };

    return sectionRenderers[sectionId]();
  };

  const renderCmsSection = (
    section: CmsServicePage['sections'][number],
    appearance: ServiceSectionAppearance,
  ): ReactNode => {
    switch (section.type) {
      case 'proofStrip':
        return (
          <ServiceProofStripSection
            appearance={appearance}
            section={section}
          />
        );
      case 'intro':
        return (
          <ServiceIntroSection
            appearance={appearance}
            section={section}
          />
        );
      case 'projectFit':
        return (
          <ServiceProjectFitSection
            appearance={appearance}
            section={section}
          />
        );
      case 'scope':
        return (
          <ServiceScopeSection
            appearance={appearance}
            section={section}
          />
        );
      case 'jobsiteProof':
        return (
          <ServiceJobsiteProofSection
            appearance={appearance}
            section={section}
          />
        );
      case 'problemsPrevented':
        return (
          <ServiceProblemsPreventedSection
            appearance={appearance}
            section={section}
          />
        );
      case 'outcomes':
        return (
          <ServiceOutcomesSection
            appearance={appearance}
            section={section}
          />
        );
      case 'equipment':
        return (
          <ServiceEquipmentSection
            appearance={appearance}
            section={section}
          />
        );
      case 'process':
        return (
          <ServiceProcessSection
            appearance={appearance}
            section={section}
          />
        );
      case 'serviceAreas':
        return (
          <ServiceAreaLinksSection
            appearance={appearance}
            section={section}
            areaLinks={getServiceAreaLinksFromSlugs(section.areaSlugs)}
          />
        );
      case 'contractorCta':
        return (
          <ServiceContractorCtaSection
            appearance={appearance}
            section={section}
          />
        );
      case 'resources':
        return (
          <ServiceResourcesSection
            appearance={appearance}
            section={section}
          />
        );
      case 'faq':
        return (
          <ServiceFaqSection
            appearance={appearance}
            section={section}
          />
        );
      case 'relatedServices':
        return (
          <ServiceRelatedServicesSection
            relatedServices={getRelatedServiceLinksFromSlugs(
              section.serviceSlugs,
            )}
            appearance={appearance}
            section={section}
          />
        );
      case 'reviews':
        return (
          <ServiceReviewsSection
            appearance={appearance}
            section={section}
            reviews={getReviewsForSection(section)}
            business={SERVICE_SITE_CONTEXT.business}
          />
        );
      case 'finalCta':
        return (
          <ServiceFinalCtaSection
            appearance={appearance}
            section={section}
            serviceKey={props.mode === 'cms' ? props.serviceSlug : undefined}
          />
        );
      case 'pricingFactors':
        return (
          <ServicePricingSection
            appearance={appearance}
            section={section}
          />
        );
      case 'banner':
        return (
          <ServiceBannerSection
            appearance={appearance}
            section={section}
          />
        );
      default:
        return null;
    }
  };

  const renderV2Section = (
    resolvedSection: Extract<ResolvedServiceSection, { mode: 'v2' }>,
    appearance: ServiceSectionAppearance,
  ): ReactNode => {
    switch (resolvedSection.section.type) {
      case 'proofStrip':
        return (
          <ServiceProofStripSection
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'intro':
        return (
          <ServiceIntroSection
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'projectFit':
        return (
          <ServiceProjectFitSection
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'scope':
        return (
          <ServiceScopeSection
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'jobsiteProof':
        return (
          <ServiceJobsiteProofSection
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'problemsPrevented':
        return (
          <ServiceProblemsPreventedSection
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'outcomes':
        return (
          <ServiceOutcomesSection
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'equipment':
        return (
          <ServiceEquipmentSection
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'process':
        return (
          <ServiceProcessSection
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'serviceAreas':
        return (
          <ServiceAreaLinksSection
            appearance={appearance}
            section={resolvedSection.section}
            areaLinks={getServiceAreaLinksFromSlugs(
              resolvedSection.section.areaSlugs,
            )}
          />
        );
      case 'contractorCta':
        return (
          <ServiceContractorCtaSection
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'resources':
        return (
          <ServiceResourcesSection
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'faq':
        return (
          <ServiceFaqSection
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'relatedServices':
        return (
          <ServiceRelatedServicesSection
            relatedServices={getRelatedServiceLinksFromSlugs(
              resolvedSection.section.serviceSlugs,
            )}
            appearance={appearance}
            section={resolvedSection.section}
          />
        );
      case 'reviews':
        return (
          <ServiceReviewsSection
            appearance={appearance}
            section={resolvedSection.section}
            reviews={getReviewsForSection(resolvedSection.section)}
            business={SERVICE_SITE_CONTEXT.business}
          />
        );
      case 'finalCta':
        return (
          <ServiceFinalCtaSection
            appearance={appearance}
            section={resolvedSection.section}
            serviceKey={getLegacyProps().service.slug}
          />
        );
      default:
        return resolvedSection.legacyId
          ? renderLegacySection(resolvedSection.legacyId, appearance)
        : null;
    }
  };

  if (props.mode === 'cms') {
    const { sections } = props;
    const renderedCmsSections: ReactNode[] = [];
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const nextSection = sections[i + 1];
      const appearance = sectionAppearances[i];

      if (
        section.type === 'serviceAreas' &&
        nextSection?.type === 'relatedServices'
      ) {
        renderedCmsSections.push(
          <Fragment key={section.id ?? `cms-serviceAreas-${i}`}>
            <ServiceAreaLinksSection
              appearance={appearance}
              section={section}
              areaLinks={getServiceAreaLinksFromSlugs(section.areaSlugs)}
              relatedServices={getRelatedServiceLinksFromSlugs(
                nextSection.serviceSlugs,
              )}
              relatedSection={nextSection}
            />
          </Fragment>,
        );
        i++;
        continue;
      }

      renderedCmsSections.push(
        <Fragment key={section.id ?? `cms-${section.type}-${i}`}>
          {renderCmsSection(section, appearance)}
        </Fragment>,
      );
    }
    return renderedCmsSections;
  }

  const { resolvedSections } = props;
  const renderedSections: ReactNode[] = [];

  for (let index = 0; index < resolvedSections.length; index += 1) {
    const resolvedSection = resolvedSections[index];
    const nextSection = resolvedSections[index + 1];
    const appearance = sectionAppearances[index];

    if (
      resolvedSection.mode === 'v2' &&
      resolvedSection.section.type === 'problemsPrevented' &&
      nextSection?.mode === 'v2' &&
      nextSection.section.type === 'outcomes'
    ) {
      const problemsSection = resolvedSection.section;
      const outcomesSection = nextSection.section;

      renderedSections.push(
        <Fragment key={`${resolvedSection.key}-${nextSection.key}`}>
          <ServiceRiskReadinessSection
            appearance={appearance}
            problemsSection={problemsSection}
            outcomesSection={outcomesSection}
          />
        </Fragment>,
      );
      index += 1;
      continue;
    }

    const content =
      resolvedSection.mode === 'legacy'
        ? renderLegacySection(resolvedSection.id, appearance)
        : renderV2Section(resolvedSection, appearance);

    renderedSections.push(
      <Fragment key={resolvedSection.key}>{content}</Fragment>,
    );
  }

  return renderedSections;
}
