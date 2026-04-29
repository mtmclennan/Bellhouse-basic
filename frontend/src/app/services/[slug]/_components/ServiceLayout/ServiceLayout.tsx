import type { CSSProperties, ReactNode } from 'react';

import type { ServicePage, ServiceSectionId } from '@/types/interfaces';
import type { BackgroundTone, BackgroundVariant } from '@/types/sections';
import type {
  RelatedServiceLinkItem,
  ServiceLocalIntentContent,
} from '@/lib/servicePageLinks';
import {
  resolveServiceContractorCtaConfig,
  resolveServiceFinalCtaConfig,
  resolveServiceResourcesConfig,
} from '@/lib/servicePageLayout';
import {
  getResolvedServiceHeroConfig,
  type ResolvedServiceSection,
  type ResolvedServiceSurfaceId,
  getResolvedServiceSections,
} from '@/lib/services/resolveServicePage';
import ServiceHeroSection from '../ServiceHeroSection/ServiceHeroSection';
import ServiceSectionRenderer from '../ServiceSectionRenderer/ServiceSectionRenderer';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import classes from './ServiceLayout.module.scss';

interface ServiceLayoutProps {
  service: ServicePage;
  localIntent: ServiceLocalIntentContent | null;
  relatedServices: RelatedServiceLinkItem[];
}

type ServiceSectionSurfaceFamily = Extract<BackgroundVariant, 'light' | 'dark'>;

type ServiceSectionSurfaceRule = {
  preferred: ServiceSectionSurfaceFamily;
  alternate?: ServiceSectionSurfaceFamily;
  tones: Record<ServiceSectionSurfaceFamily, BackgroundTone>;
};

const sectionSurfaceRules: Record<ResolvedServiceSurfaceId, ServiceSectionSurfaceRule> = {
  proofStrip: {
    preferred: 'light',
    alternate: 'dark',
    tones: {
      light: 'default',
      dark: 'default',
    },
  },
  intro: {
    preferred: 'light',
    tones: {
      light: 'soft',
      dark: 'soft',
    },
  },
  fit: {
    preferred: 'dark',
    alternate: 'light',
    tones: {
      light: 'soft',
      dark: 'soft',
    },
  },
  proof: {
    preferred: 'light',
    alternate: 'dark',
    tones: {
      light: 'default',
      dark: 'default',
    },
  },
  jobsiteProof: {
    preferred: 'dark',
    alternate: 'light',
    tones: {
      light: 'soft',
      dark: 'default',
    },
  },
  problemsPrevented: {
    preferred: 'dark',
    alternate: 'light',
    tones: {
      light: 'soft',
      dark: 'default',
    },
  },
  outcomes: {
    preferred: 'light',
    alternate: 'dark',
    tones: {
      light: 'soft',
      dark: 'muted',
    },
  },
  equipment: {
    preferred: 'light',
    alternate: 'dark',
    tones: {
      light: 'default',
      dark: 'default',
    },
  },
  process: {
    preferred: 'dark',
    alternate: 'light',
    tones: {
      light: 'muted',
      dark: 'default',
    },
  },
  localIntent: {
    preferred: 'light',
    alternate: 'dark',
    tones: {
      light: 'muted',
      dark: 'soft',
    },
  },
  contractorCta: {
    preferred: 'dark',
    alternate: 'light',
    tones: {
      light: 'default',
      dark: 'default',
    },
  },
  resources: {
    preferred: 'light',
    alternate: 'dark',
    tones: {
      light: 'default',
      dark: 'default',
    },
  },
  faq: {
    preferred: 'dark',
    alternate: 'light',
    tones: {
      light: 'default',
      dark: 'default',
    },
  },
  relatedServices: {
    preferred: 'light',
    alternate: 'dark',
    tones: {
      light: 'default',
      dark: 'default',
    },
  },
  reviews: {
    preferred: 'dark',
    alternate: 'light',
    tones: {
      light: 'muted',
      dark: 'muted',
    },
  },
  finalCta: {
    preferred: 'dark',
    alternate: 'light',
    tones: {
      light: 'muted',
      dark: 'default',
    },
  },
};

function resolveServiceSectionAppearances(
  sections: ResolvedServiceSection[],
): ServiceSectionAppearance[] {
  const appearances: ServiceSectionAppearance[] = [];
  let previousFamily: ServiceSectionSurfaceFamily = 'dark';

  for (const section of sections) {
    const rule = sectionSurfaceRules[section.surfaceId];
    const backgroundVariant: ServiceSectionSurfaceFamily =
      rule.preferred === previousFamily && rule.alternate
        ? rule.alternate
        : rule.preferred;

    appearances.push({
      backgroundVariant,
      backgroundTone: rule.tones[backgroundVariant],
    });

    previousFamily = backgroundVariant;
  }

  return appearances;
}

export default function ServiceLayout({
  service,
  localIntent,
  relatedServices,
}: ServiceLayoutProps) {
  const heroConfig = getResolvedServiceHeroConfig(service);
  const contractorCtaConfig = resolveServiceContractorCtaConfig(service);
  const resourcesConfig = resolveServiceResourcesConfig(service);
  const finalCtaConfig = resolveServiceFinalCtaConfig(service);
  const configuredSections = getResolvedServiceSections(service);
  const sectionAppearances = resolveServiceSectionAppearances(configuredSections);
  const backgroundConfig = service.visuals?.background;
  const backgroundStyle: CSSProperties | undefined = backgroundConfig
    ? {
        ['--service-background-image' as string]: `url("${backgroundConfig.src}")`,
        ['--service-background-position' as string]:
          backgroundConfig.position ?? 'center center',
      }
    : undefined;

  return (
    <div className={classes.servicePage} style={backgroundStyle}>
      {backgroundConfig ? <div className={classes.serviceBackground} aria-hidden="true" /> : null}

      <div className={classes.serviceContent}>
        <ServiceHeroSection service={service} heroConfig={heroConfig} />
        <ServiceSectionRenderer
          service={service}
          localIntent={localIntent}
          relatedServices={relatedServices}
          resolvedSections={configuredSections}
          sectionAppearances={sectionAppearances}
          contractorCtaConfig={contractorCtaConfig}
          resourcesConfig={resourcesConfig}
          finalCtaConfig={finalCtaConfig}
        />
      </div>
    </div>
  );
}
