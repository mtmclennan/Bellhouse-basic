import {
  getServicePageSections,
  resolveServiceHeroConfig,
  type ResolvedServiceHeroConfig,
} from '@/lib/servicePageLayout';
import { SERVICE_SITE_CONTEXT } from '@/lib/services/serviceSiteContext';
import type { ServicePage, ServiceSectionId } from '@/types/interfaces';
import type { ServicePageV2 } from '@/types/servicePage';
import type {
  ServiceAction,
  ServiceHeroSectionData,
  ServiceSection,
} from '@/types/serviceSections';

type ServicePageWithV2 = ServicePage &
  Partial<ServicePageV2> & {
    hero: ServicePage['hero'] & Partial<ServiceHeroSectionData>;
    sections?: ServiceSection[];
  };

const SERVICE_HERO_TRUST_DEFAULTS = {
  phone: {
    label: SERVICE_SITE_CONTEXT.business.phoneLabel,
    href: SERVICE_SITE_CONTEXT.business.phoneHref,
  },
  review: {
    rating: SERVICE_SITE_CONTEXT.business.reviewRating,
    reviewCount: SERVICE_SITE_CONTEXT.business.reviewCount,
    href: SERVICE_SITE_CONTEXT.business.reviewsHref,
    label: SERVICE_SITE_CONTEXT.business.reviewLabel,
  },
} satisfies Pick<ResolvedServiceHeroConfig, 'phone' | 'review'>;

const DEFAULT_V2_PRIMARY_ACTION = {
  label: 'Get a Free Estimate',
  href: '/contact',
};

export type ResolvedServiceSurfaceId =
  | ServiceSectionId
  | 'proofStrip'
  | 'jobsiteProof'
  | 'problemsPrevented'
  | 'outcomes';

const sectionTypeToResolvedId: Record<
  ServiceSection['type'],
  ResolvedServiceSurfaceId
> = {
  proofStrip: 'proofStrip',
  intro: 'intro',
  projectFit: 'fit',
  scope: 'proof',
  jobsiteProof: 'jobsiteProof',
  problemsPrevented: 'problemsPrevented',
  outcomes: 'outcomes',
  equipment: 'equipment',
  process: 'process',
  serviceAreas: 'localIntent',
  contractorCta: 'contractorCta',
  resources: 'resources',
  faq: 'faq',
  relatedServices: 'relatedServices',
  reviews: 'reviews',
  finalCta: 'finalCta',
  pricingFactors: 'finalCta',
  banner: 'finalCta',
};

export type ResolvedServiceSection =
  | {
      mode: 'legacy';
      id: ServiceSectionId;
      surfaceId: ServiceSectionId;
      key: string;
    }
  | {
      mode: 'v2';
      id: ResolvedServiceSurfaceId;
      surfaceId: ResolvedServiceSurfaceId;
      key: string;
      section: ServiceSection;
      legacyId?: ServiceSectionId;
    };

function isServiceSection(value: unknown): value is ServiceSection {
  return Boolean(
    value &&
    typeof value === 'object' &&
    'type' in value &&
    typeof (value as { type?: unknown }).type === 'string',
  );
}

export function hasServicePageV2Sections(
  service: ServicePage | ServicePageWithV2,
): service is ServicePageWithV2 & { sections: ServiceSection[] } {
  return (
    Array.isArray((service as ServicePageWithV2).sections) &&
    (service as ServicePageWithV2).sections!.every(isServiceSection)
  );
}

export function getServiceSectionByType<TType extends ServiceSection['type']>(
  service: ServicePage | ServicePageWithV2,
  type: TType,
): Extract<ServiceSection, { type: TType }> | undefined {
  if (!hasServicePageV2Sections(service)) {
    return undefined;
  }

  return service.sections.find(
    (section): section is Extract<ServiceSection, { type: TType }> =>
      section.type === type,
  );
}

function mapV2ActionToLegacyAction(action?: ServiceAction) {
  if (!action?.label || !action?.href) {
    return undefined;
  }

  return {
    label: action.label,
    href: action.href,
  };
}

function withServiceHeroTrustDefaults(
  config: Omit<ResolvedServiceHeroConfig, 'phone' | 'review'> &
    Partial<Pick<ResolvedServiceHeroConfig, 'phone' | 'review'>>,
): ResolvedServiceHeroConfig {
  return {
    ...config,
    phone: config.phone ?? SERVICE_HERO_TRUST_DEFAULTS.phone,
    review: config.review ?? SERVICE_HERO_TRUST_DEFAULTS.review,
  };
}

function resolveLegacyServiceHeroConfig(
  service: ServicePage | ServicePageWithV2,
): ResolvedServiceHeroConfig {
  return withServiceHeroTrustDefaults(
    resolveServiceHeroConfig(service as ServicePage),
  );
}

function resolveV2ServiceHeroConfig(
  service: ServicePageWithV2 & { sections: ServiceSection[] },
): ResolvedServiceHeroConfig {
  const hero = service.hero as Partial<ServiceHeroSectionData> & {
    subheading?: string;
  };
  const actions = Array.isArray(hero.actions) ? hero.actions : [];

  return withServiceHeroTrustDefaults({
    emphasis: hero.emphasis ?? 'standard',
    eyebrow: hero.eyebrow,
    summary: hero.summary ?? hero.subheading ?? '',
    proofChips:
      hero.proofPoints && hero.proofPoints.length > 0
        ? hero.proofPoints.slice(0, 4)
        : [],
    primaryAction:
      mapV2ActionToLegacyAction(actions[0]) ?? DEFAULT_V2_PRIMARY_ACTION,
    secondaryAction: mapV2ActionToLegacyAction(actions[1]),
  });
}

export function getResolvedServiceHeroConfig(
  service: ServicePage | ServicePageWithV2,
): ResolvedServiceHeroConfig {
  if (hasServicePageV2Sections(service)) {
    return resolveV2ServiceHeroConfig(service);
  }

  return resolveLegacyServiceHeroConfig(service);
}

export function getResolvedServiceSections(
  service: ServicePage | ServicePageWithV2,
): ResolvedServiceSection[] {
  if (!hasServicePageV2Sections(service)) {
    return getServicePageSections(service as ServicePage).map((sectionId) => ({
      mode: 'legacy',
      id: sectionId,
      surfaceId: sectionId,
      key: `legacy-${sectionId}`,
    }));
  }

  const orderedSections: ResolvedServiceSection[] = [];
  const seen = new Set<ResolvedServiceSurfaceId>();

  for (let index = 0; index < service.sections.length; index += 1) {
    const section = service.sections[index];
    const resolvedId = sectionTypeToResolvedId[section.type];

    if (seen.has(resolvedId)) {
      continue;
    }

    seen.add(resolvedId);
    orderedSections.push({
      mode: 'v2',
      id: resolvedId,
      surfaceId: resolvedId,
      key: section.id ?? `v2-${section.type}-${index}`,
      section,
      legacyId:
        resolvedId === 'proofStrip' ||
        resolvedId === 'jobsiteProof' ||
        resolvedId === 'problemsPrevented' ||
        resolvedId === 'outcomes'
          ? undefined
          : resolvedId,
    });
  }

  return orderedSections.length > 0
    ? orderedSections
    : getServicePageSections(service as ServicePage).map((sectionId) => ({
        mode: 'legacy',
        id: sectionId,
        surfaceId: sectionId,
        key: `legacy-${sectionId}`,
      }));
}
