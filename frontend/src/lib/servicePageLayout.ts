import type {
  ServiceFinalCtaLayoutConfig,
  ServiceHeroLayoutConfig,
  ServicePage,
  ServiceSectionId,
} from '@/types/interfaces';
import { calculatorSeoConfig } from '@/features/calculators/config/seo';

export type ServiceAction = {
  href: string;
  label: string;
};

export type ResolvedServiceContractorCtaConfig = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: ServiceAction;
  secondaryAction?: ServiceAction;
};

export type ResolvedServiceResourceLink = {
  href: string;
  title: string;
  description: string;
  actionLabel: string;
};

export type ResolvedServiceResourcesConfig = {
  eyebrow: string;
  title: string;
  description: string;
  links: ResolvedServiceResourceLink[];
  viewAllAction: ServiceAction;
};

export type ResolvedServiceHeroConfig = {
  emphasis: NonNullable<ServiceHeroLayoutConfig['emphasis']>;
  eyebrow?: string;
  summary: string;
  proofChips: string[];
  primaryAction: ServiceAction;
  secondaryAction?: ServiceAction;
  review?: {
    rating: number;
    reviewCount: number;
    href: string;
    label?: string;
  };

  phone?: {
    label: string;
    href: string;
  };

  serviceAreaLine?: string;
};

export type ResolvedServiceFinalCtaConfig = {
  mode: NonNullable<ServiceFinalCtaLayoutConfig['mode']>;
  heading: string;
  subheading: string;
  primaryAction: ServiceAction;
  secondaryAction?: ServiceAction;
};

const contractorFocusedSlugs = new Set([
  'foundation-excavation',
  'site-preparation-land-grading',
  'dump-truck-rental',
  'heavy-equipment-hauling',
  'volvo-a35-off-road-dump-truck-rental',
  'dirt-gravel-delivery',
]);

const serviceResourcesConfig: Partial<
  Record<
    ServicePage['slug'],
    {
      title: string;
      description: string;
      links: ResolvedServiceResourceLink[];
    }
  >
> = {
  'foundation-excavation': {
    title: 'Need a rough excavation quantity first?',
    description:
      'For foundation digs, spoil removal, and early haul-out planning, the Bellhouse excavation calculator gives you a practical starting point before site review.',
    links: [
      {
        href: calculatorSeoConfig.excavation.resourcePath,
        title: 'Excavation calculator for foundation digs',
        description:
          'Estimate in-place cut volume, loose material to haul, estimated weight, and rough truck loads for foundation excavation work.',
        actionLabel: 'Estimate Excavation Volume',
      },
    ],
  },
  'pond-digging-cleaning': {
    title: 'Roughing out pond excavation quantities?',
    description:
      'Pond work often starts with a rough cut-and-haul estimate. The excavation calculator is a useful planning tool before final scope, access, and spoil handling are reviewed on site.',
    links: [
      {
        href: calculatorSeoConfig.excavation.resourcePath,
        title: 'Excavation calculator for pond digging',
        description:
          'Use it to rough out excavation volume, loose material, and likely truck loads for new pond digging, expansion, or sediment removal.',
        actionLabel: 'Estimate Pond Excavation',
      },
    ],
  },
  'driveway-parking-lot-preparation': {
    title: 'Planning driveway or parking lot base quantities?',
    description:
      'For driveway gravel, parking lot base, and compacted placement work, the Bellhouse gravel calculator gives you a practical starting quantity before final grading and drainage are reviewed.',
    links: [
      {
        href: calculatorSeoConfig.gravel.resourcePath,
        title: 'Gravel calculator for driveway base',
        description:
          'Estimate compacted gravel/base quantity, delivered weight, and likely truck loads for driveways, lanes, and parking lot prep.',
        actionLabel: 'Estimate Gravel Base',
      },
    ],
  },
  'site-preparation-land-grading': {
    title: 'Planning site prep quantities before the job is priced?',
    description:
      'Site prep can involve both compacted base and finish topsoil. These planning tools help you rough out the right material side of the work without mixing it up with excavation-only estimates.',
    links: [
      {
        href: calculatorSeoConfig.gravel.resourcePath,
        title: 'Gravel calculator for pads and access routes',
        description:
          'Useful for compacted base quantities on building pads, lanes, and imported aggregate needed during site preparation.',
        actionLabel: 'Estimate Gravel Quantities',
      },
      {
        href: calculatorSeoConfig.topsoil.resourcePath,
        title: 'Topsoil calculator for finish grading',
        description:
          'Helpful when you need to plan placed topsoil coverage for final grading, yard shaping, and surface restoration.',
        actionLabel: 'Estimate Topsoil Coverage',
      },
    ],
  },
  'dirt-gravel-delivery': {
    title: 'Need a quick material estimate before ordering?',
    description:
      'If you are ordering aggregate or topsoil, these calculators help you rough out quantity, weight, and likely truck loads before delivery is scheduled.',
    links: [
      {
        href: calculatorSeoConfig.gravel.resourcePath,
        title: 'Gravel calculator for aggregate delivery',
        description:
          'Estimate compacted gravel/base quantity, delivered weight, and truck count for driveways, pads, lanes, and imported stone.',
        actionLabel: 'Estimate Gravel Delivery',
      },
      {
        href: calculatorSeoConfig.topsoil.resourcePath,
        title: 'Topsoil calculator for coverage planning',
        description:
          'Rough out topsoil volume and load count for finish grading, lawn prep, and surface coverage before ordering.',
        actionLabel: 'Estimate Topsoil Delivery',
      },
    ],
  },
  'dump-truck-rental': {
    title: 'Need to rough out what the trucks will be moving?',
    description:
      'For dump truck hire, the useful question is usually whether you are hauling excavation spoil or bringing in compacted aggregate. These tools help you plan that more clearly before booking trucks.',
    links: [
      {
        href: calculatorSeoConfig.excavation.resourcePath,
        title: 'Excavation calculator for spoil haul-out',
        description:
          'Estimate loose excavated material, weight, and rough truck loads when trucks are needed for cut material and haul-off.',
        actionLabel: 'Estimate Spoil Haul-Out',
      },
      {
        href: calculatorSeoConfig.gravel.resourcePath,
        title: 'Gravel calculator for imported aggregate',
        description:
          'Use it to rough out aggregate quantity, delivered tons, and likely truck counts for imported gravel or base material.',
        actionLabel: 'Estimate Aggregate Loads',
      },
    ],
  },
  'volvo-a35-off-road-dump-truck-rental': {
    title: 'Planning bulk on-site haul volumes?',
    description:
      'On larger earthmoving jobs, a quick excavation estimate can help frame how much material the off-road truck may need to move before production planning is finalized.',
    links: [
      {
        href: calculatorSeoConfig.excavation.resourcePath,
        title: 'Excavation calculator for bulk earthmoving',
        description:
          'Estimate excavation volume, loose material, and rough haul quantities for subdivision work, pond jobs, and large site cuts.',
        actionLabel: 'Estimate Earthmoving Volume',
      },
    ],
  },
};

const defaultSectionOrder: ServiceSectionId[] = [
  'intro',
  'fit',
  'proof',
  'equipment',
  'process',
  'localIntent',
  'contractorCta',
  'resources',
  'faq',
  'relatedServices',
  'reviews',
  'finalCta',
];

export function getServicePageSections(
  service: ServicePage,
): ServiceSectionId[] {
  const configuredSections = service.layout?.sections ?? defaultSectionOrder;
  const seen = new Set<ServiceSectionId>();

  return configuredSections.filter((section) => {
    if (seen.has(section)) {
      return false;
    }

    seen.add(section);
    return true;
  });
}

function createAction(label: string | undefined, href: string | undefined) {
  if (!label || !href) {
    return undefined;
  }

  return { label, href };
}

function isContractorFocusedService(service: ServicePage) {
  return contractorFocusedSlugs.has(service.slug);
}

function getPlanningSecondaryAction(
  resourcesConfig: ResolvedServiceResourcesConfig | null,
) {
  if (!resourcesConfig) {
    return undefined;
  }

  if (resourcesConfig.links.length === 1) {
    const [resourceLink] = resourcesConfig.links;

    return {
      label: resourceLink.actionLabel,
      href: resourceLink.href,
    };
  }

  return resourcesConfig.viewAllAction;
}

function buildDefaultHeroEyebrow(service: ServicePage) {
  const locations = service.serviceArea?.locations ?? [];
  const uniqueLocations = locations.filter((location, index) => {
    return locations.indexOf(location) === index;
  });

  if (uniqueLocations.length >= 2) {
    return `${uniqueLocations[0]} & ${uniqueLocations[1]}`;
  }

  if (uniqueLocations.length === 1) {
    return `${uniqueLocations[0]} Service`;
  }

  return 'Bellhouse Service';
}

export function resolveServiceHeroConfig(
  service: ServicePage,
): ResolvedServiceHeroConfig {
  const heroConfig = service.layout?.hero;
  const fallbackProofChips = service.intro.keypoints.slice(0, 3);

  return {
    emphasis: heroConfig?.emphasis ?? 'standard',
    eyebrow: heroConfig?.eyebrow ?? buildDefaultHeroEyebrow(service),
    summary: heroConfig?.summary ?? service.hero.subheading,
    proofChips:
      heroConfig?.proofChips && heroConfig.proofChips.length > 0
        ? heroConfig.proofChips.slice(0, 4)
        : fallbackProofChips,
    primaryAction: {
      label:
        heroConfig?.primaryLabel ??
        service.cta?.button ??
        'Get a Free Estimate',
      href: heroConfig?.primaryHref ?? '/contact',
    },
    secondaryAction: createAction(
      heroConfig?.secondaryLabel,
      heroConfig?.secondaryHref,
    ),
  };
}

function getDefaultContractorCtaContent(): ResolvedServiceContractorCtaConfig {
  return {
    eyebrow: 'For builders and contractors',
    title: 'Builders and contractors can send project details for review',
    description:
      'If your project needs excavation, trucking, material delivery, or equipment support lined up around a real schedule, Bellhouse can review the site, scope, and timing.',
    primaryAction: {
      label: 'Send Project Details',
      href: '/contractors#contractor-form',
    },
    secondaryAction: {
      label: 'Call 519-752-8500',
      href: 'tel:5197528500',
    },
  };
}

export function resolveServiceContractorCtaConfig(
  service: ServicePage,
): ResolvedServiceContractorCtaConfig | null {
  const contractorCtaConfig = service.layout?.contractorCta;
  const shouldShowContractorCta =
    isContractorFocusedService(service) ||
    Boolean(
      contractorCtaConfig?.title ||
      contractorCtaConfig?.description ||
      contractorCtaConfig?.primaryLabel,
    );

  if (!shouldShowContractorCta) {
    return null;
  }

  const defaults = getDefaultContractorCtaContent();

  return {
    eyebrow: contractorCtaConfig?.eyebrow ?? defaults.eyebrow,
    title: contractorCtaConfig?.title ?? defaults.title,
    description: contractorCtaConfig?.description ?? defaults.description,
    primaryAction: {
      label: contractorCtaConfig?.primaryLabel ?? defaults.primaryAction.label,
      href: contractorCtaConfig?.primaryHref ?? defaults.primaryAction.href,
    },
    secondaryAction:
      createAction(
        contractorCtaConfig?.secondaryLabel ?? defaults.secondaryAction?.label,
        contractorCtaConfig?.secondaryHref ?? defaults.secondaryAction?.href,
      ) ?? undefined,
  };
}

export function resolveServiceResourcesConfig(
  service: ServicePage,
): ResolvedServiceResourcesConfig | null {
  const defaults = serviceResourcesConfig[service.slug];
  const resourcesConfig = service.layout?.resources;

  if (!defaults && !resourcesConfig?.title && !resourcesConfig?.description) {
    return null;
  }

  return {
    eyebrow: resourcesConfig?.eyebrow ?? 'Planning tool',
    title: resourcesConfig?.title ?? defaults?.title ?? 'Useful planning tools',
    description:
      resourcesConfig?.description ??
      defaults?.description ??
      'Use Bellhouse planning tools to rough out quantities before requesting a quote.',
    links: defaults?.links ?? [],
    viewAllAction: {
      label: resourcesConfig?.viewAllLabel ?? 'View Calculators',
      href: resourcesConfig?.viewAllHref ?? '/resources/calculators',
    },
  };
}

function getDefaultFinalCtaConfig(
  service: ServicePage,
  mode: NonNullable<ServiceFinalCtaLayoutConfig['mode']>,
  contractorCtaConfig: ResolvedServiceContractorCtaConfig | null,
  resourcesConfig: ResolvedServiceResourcesConfig | null,
): ResolvedServiceFinalCtaConfig {
  if (mode === 'contractor') {
    return {
      mode,
      heading: service.cta?.heading ?? 'Need Bellhouse on the next project?',
      subheading:
        service.cta?.subheading ??
        'Send the site details, scope, and timing and Bellhouse can review contractor support.',
      primaryAction: contractorCtaConfig?.primaryAction ?? {
        label: 'Send Project Details',
        href: '/contractors#contractor-form',
      },
      secondaryAction:
        contractorCtaConfig?.secondaryAction ??
        createAction(service.cta?.button ?? 'Request a Quote', '/contact'),
    };
  }

  if (mode === 'mixed') {
    return {
      mode,
      heading: service.cta?.heading ?? 'Need Bellhouse on the job?',
      subheading:
        service.cta?.subheading ??
        'Send the project scope, location, and timing and Bellhouse can review the next step.',
      primaryAction: {
        label: service.cta?.button ?? 'Request a Quote',
        href: '/contact',
      },
      secondaryAction:
        contractorCtaConfig?.primaryAction ??
        getPlanningSecondaryAction(resourcesConfig),
    };
  }

  if (mode === 'contact') {
    return {
      mode,
      heading: service.cta?.heading ?? 'Need Bellhouse on the job?',
      subheading:
        service.cta?.subheading ??
        'Send the project scope, location, and timing and Bellhouse can review the next step.',
      primaryAction: {
        label: service.cta?.button ?? 'Contact Bellhouse',
        href: '/contact',
      },
      secondaryAction:
        getPlanningSecondaryAction(resourcesConfig) ??
        contractorCtaConfig?.primaryAction,
    };
  }

  return {
    mode,
    heading: service.cta?.heading ?? 'Need Bellhouse on the job?',
    subheading:
      service.cta?.subheading ??
      'Send the project scope, location, and timing and Bellhouse can review the next step.',
    primaryAction: {
      label: service.cta?.button ?? 'Contact Bellhouse',
      href: '/contact',
    },
    secondaryAction:
      getPlanningSecondaryAction(resourcesConfig) ??
      contractorCtaConfig?.primaryAction,
  };
}

export function resolveServiceFinalCtaConfig(
  service: ServicePage,
): ResolvedServiceFinalCtaConfig {
  const finalCtaConfig = service.layout?.finalCta;
  const contractorCtaConfig = resolveServiceContractorCtaConfig(service);
  const resourcesConfig = resolveServiceResourcesConfig(service);
  const mode =
    finalCtaConfig?.mode ?? (contractorCtaConfig ? 'mixed' : 'quote');
  const defaults = getDefaultFinalCtaConfig(
    service,
    mode,
    contractorCtaConfig,
    resourcesConfig,
  );

  return {
    mode,
    heading: finalCtaConfig?.heading ?? defaults.heading,
    subheading: finalCtaConfig?.subheading ?? defaults.subheading,
    primaryAction: {
      label: finalCtaConfig?.primaryLabel ?? defaults.primaryAction.label,
      href: finalCtaConfig?.primaryHref ?? defaults.primaryAction.href,
    },
    secondaryAction:
      createAction(
        finalCtaConfig?.secondaryLabel ?? defaults.secondaryAction?.label,
        finalCtaConfig?.secondaryHref ?? defaults.secondaryAction?.href,
      ) ?? undefined,
  };
}
