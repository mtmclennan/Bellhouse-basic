import {
  getServicePageSections,
  resolveServiceHeroConfig,
  type ResolvedServiceHeroConfig,
} from '@/lib/servicePageLayout';
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

const sectionTypeToLegacyId: Partial<Record<ServiceSection['type'], ServiceSectionId>> = {
  intro: 'intro',
  projectFit: 'fit',
  scope: 'proof',
  equipment: 'equipment',
  process: 'process',
  serviceAreas: 'localIntent',
  contractorCta: 'contractorCta',
  resources: 'resources',
  faq: 'faq',
  relatedServices: 'relatedServices',
  reviews: 'reviews',
  finalCta: 'finalCta',
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
      id: ServiceSectionId;
      surfaceId: ServiceSectionId;
      key: string;
      section: ServiceSection;
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
  return Array.isArray((service as ServicePageWithV2).sections)
    && (service as ServicePageWithV2).sections!.every(isServiceSection);
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

function hasV2HeroOverrides(hero: Partial<ServiceHeroSectionData>) {
  return Boolean(
    typeof hero.summary === 'string'
      || typeof hero.eyebrow === 'string'
      || Array.isArray(hero.proofPoints)
      || Array.isArray(hero.actions)
      || typeof hero.emphasis === 'string',
  );
}

export function getResolvedServiceHeroConfig(
  service: ServicePage | ServicePageWithV2,
): ResolvedServiceHeroConfig {
  const legacyHeroConfig = resolveServiceHeroConfig(service as ServicePage);

  if (!hasServicePageV2Sections(service)) {
    return legacyHeroConfig;
  }

  const hero = service.hero as Partial<ServiceHeroSectionData>;

  if (!hasV2HeroOverrides(hero)) {
    return legacyHeroConfig;
  }

  const actions = Array.isArray(hero.actions) ? hero.actions : [];

  return {
    emphasis: hero.emphasis ?? legacyHeroConfig.emphasis,
    eyebrow: hero.eyebrow ?? legacyHeroConfig.eyebrow,
    summary: hero.summary ?? legacyHeroConfig.summary,
    proofChips:
      hero.proofPoints && hero.proofPoints.length > 0
        ? hero.proofPoints.slice(0, 4)
        : legacyHeroConfig.proofChips,
    primaryAction:
      mapV2ActionToLegacyAction(actions[0]) ?? legacyHeroConfig.primaryAction,
    secondaryAction:
      mapV2ActionToLegacyAction(actions[1]) ?? legacyHeroConfig.secondaryAction,
  };
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
  const seen = new Set<ServiceSectionId>();

  for (let index = 0; index < service.sections.length; index += 1) {
    const section = service.sections[index];
    const legacySectionId = sectionTypeToLegacyId[section.type];

    if (!legacySectionId || seen.has(legacySectionId)) {
      continue;
    }

    seen.add(legacySectionId);
    orderedSections.push({
      mode: 'v2',
      id: legacySectionId,
      surfaceId: legacySectionId,
      key: section.id ?? `v2-${section.type}-${index}`,
      section,
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
