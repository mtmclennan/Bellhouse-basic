import type { CSSProperties } from 'react';

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
import { SERVICE_SITE_CONTEXT } from '@/lib/services/serviceSiteContext';
import type { CmsServicePage } from '@/types/services/cms';
import type { ServiceBlock } from '@/types/services/blocks';
import ServiceHeroSection from '../ServiceHeroSection/ServiceHeroSection';
import ServiceSectionRenderer from '../ServiceSectionRenderer/ServiceSectionRenderer';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import classes from './ServiceLayout.module.scss';

type LegacyServiceLayoutProps = {
  mode: 'legacy';
  service: ServicePage;
  localIntent: ServiceLocalIntentContent | null;
  relatedServices: RelatedServiceLinkItem[];
};

type CmsServiceLayoutProps = {
  mode: 'cms';
  page: CmsServicePage;
};

type ServiceLayoutProps = LegacyServiceLayoutProps | CmsServiceLayoutProps;

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

const cmsSectionSurfaceRules: Record<ServiceBlock['type'], ServiceSectionSurfaceRule> = {
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
  projectFit: {
    preferred: 'dark',
    alternate: 'light',
    tones: {
      light: 'soft',
      dark: 'soft',
    },
  },
  scope: {
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
  serviceAreas: {
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
  pricingFactors: {
    preferred: 'dark',
    alternate: 'light',
    tones: {
      light: 'default',
      dark: 'default',
    },
  },
  banner: {
    preferred: 'dark',
    tones: {
      light: 'default',
      dark: 'default',
    },
  },
};

function resolveCmsSectionAppearances(
  sections: CmsServicePage['sections'],
): ServiceSectionAppearance[] {
  const appearances: ServiceSectionAppearance[] = [];
  let previousFamily: ServiceSectionSurfaceFamily = 'dark';

  for (const section of sections) {
    const rule = cmsSectionSurfaceRules[section.type];
    // An explicit `tone: 'light' | 'dark'` on a block pins that section's
    // surface (so the page can follow the design's deliberate tone rhythm
    // rather than pure alternation). Other tone values fall back to the rule.
    const explicitFamily: ServiceSectionSurfaceFamily | undefined =
      section.tone === 'light' || section.tone === 'dark'
        ? section.tone
        : undefined;
    const backgroundVariant: ServiceSectionSurfaceFamily =
      explicitFamily ??
      (rule.preferred === previousFamily && rule.alternate
        ? rule.alternate
        : rule.preferred);

    appearances.push({
      backgroundVariant,
      backgroundTone: rule.tones[backgroundVariant],
    });

    previousFamily = backgroundVariant;
  }

  return appearances;
}

export default function ServiceLayout({
  ...props
}: ServiceLayoutProps) {
  if (props.mode === 'cms') {
    const { page } = props;
    const sectionAppearances = resolveCmsSectionAppearances(page.sections);
    const backgroundConfig = page.visuals?.background;
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
          <ServiceHeroSection
            mode="cms"
            hero={page.hero}
            breadcrumbLabel={page.navTitle}
            business={SERVICE_SITE_CONTEXT.business}
          />
          <ServiceSectionRenderer
            mode="cms"
            sections={page.sections}
            sectionAppearances={sectionAppearances}
          />
        </div>
      </div>
    );
  }

  const { service, localIntent, relatedServices } = props;
  const heroSection = (
    <ServiceHeroSection
      mode="legacy"
      service={service}
      heroConfig={getResolvedServiceHeroConfig(service)}
    />
  );
  const contractorCtaConfig = resolveServiceContractorCtaConfig(service);
  const resourcesConfig = resolveServiceResourcesConfig(service);
  const finalCtaConfig = resolveServiceFinalCtaConfig(service);
  const configuredSections = getResolvedServiceSections(service);
  const sectionAppearances = resolveServiceSectionAppearances(configuredSections);
  const sectionRenderer = (
    <ServiceSectionRenderer
      mode="legacy"
      service={service}
      localIntent={localIntent}
      relatedServices={relatedServices}
      resolvedSections={configuredSections}
      sectionAppearances={sectionAppearances}
      contractorCtaConfig={contractorCtaConfig}
      resourcesConfig={resourcesConfig}
      finalCtaConfig={finalCtaConfig}
    />
  );
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
        {heroSection}
        {sectionRenderer}
      </div>
    </div>
  );
}
