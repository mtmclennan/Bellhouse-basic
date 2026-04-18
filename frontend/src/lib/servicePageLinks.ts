import type { ServicePage } from '@/types/interfaces';

export type ServiceAreaLinkItem = {
  label: string;
  href?: string;
};

export type RelatedServiceLinkItem = {
  title: string;
  description: string;
  href: string;
};

export type ContractorCtaContent = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

const liveServiceAreaMap: Record<string, string> = {
  Brantford: '/service-areas/brantford',
  Paris: '/service-areas/paris',
  Hamilton: '/service-areas/hamilton',
  Cambridge: '/service-areas/cambridge',
  Dundas: '/service-areas/dundas',
  Waterdown: '/service-areas/waterdown',
  Simcoe: '/service-areas/simcoe',
  Woodstock: '/service-areas/woodstock',
  Ancaster: '/service-areas/ancaster',
};

const relatedServiceMap: Record<string, string[]> = {
  'foundation-excavation': [
    'site-preparation-land-grading',
    'dump-truck-rental',
    'dirt-gravel-delivery',
    'heavy-equipment-hauling',
  ],
  'site-preparation-land-grading': [
    'foundation-excavation',
    'dump-truck-rental',
    'dirt-gravel-delivery',
    'volvo-a35-off-road-dump-truck-rental',
  ],
  'dump-truck-rental': [
    'dirt-gravel-delivery',
    'site-preparation-land-grading',
    'heavy-equipment-hauling',
    'volvo-a35-off-road-dump-truck-rental',
  ],
  'heavy-equipment-hauling': [
    'dump-truck-rental',
    'site-preparation-land-grading',
    'volvo-a35-off-road-dump-truck-rental',
    'foundation-excavation',
  ],
  'volvo-a35-off-road-dump-truck-rental': [
    'site-preparation-land-grading',
    'dump-truck-rental',
    'heavy-equipment-hauling',
    'foundation-excavation',
  ],
  'dirt-gravel-delivery': [
    'dump-truck-rental',
    'site-preparation-land-grading',
    'driveway-parking-lot-preparation',
    'foundation-excavation',
  ],
  'driveway-parking-lot-preparation': [
    'site-preparation-land-grading',
    'dirt-gravel-delivery',
    'dump-truck-rental',
  ],
  'house-barn-demolition': [
    'dump-truck-rental',
    'site-preparation-land-grading',
    'foundation-excavation',
  ],
  'septic-system-installation': [
    'foundation-excavation',
    'site-preparation-land-grading',
    'dirt-gravel-delivery',
    'dump-truck-rental',
  ],
  'pond-digging-cleaning': [
    'site-preparation-land-grading',
    'dump-truck-rental',
    'heavy-equipment-hauling',
  ],
};

const contractorFocusedSlugs = new Set([
  'foundation-excavation',
  'site-preparation-land-grading',
  'dump-truck-rental',
  'heavy-equipment-hauling',
  'volvo-a35-off-road-dump-truck-rental',
  'dirt-gravel-delivery',
]);

function getUniqueItems<T>(items: T[], getKey: (item: T) => string) {
  return items.filter((item, index, allItems) => {
    const key = getKey(item);
    return allItems.findIndex((candidate) => getKey(candidate) === key) === index;
  });
}

export function getLinkedServiceAreas(service: ServicePage): ServiceAreaLinkItem[] {
  const locations = service.serviceArea?.locations ?? [];

  return getUniqueItems(
    locations.map((label) => ({
      label,
      href: liveServiceAreaMap[label],
    })),
    (item) => item.label,
  );
}

export function getRelatedServiceLinks(
  service: ServicePage,
  allServices: ServicePage[],
): RelatedServiceLinkItem[] {
  const relatedSlugs = relatedServiceMap[service.slug] ?? [];

  return relatedSlugs
    .map((slug) => allServices.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is ServicePage => Boolean(candidate))
    .map((candidate) => ({
      title: candidate.card.title,
      description: candidate.card.description,
      href: `/services/${candidate.slug}`,
    }));
}

export function getContractorCta(service: ServicePage): ContractorCtaContent | null {
  if (!contractorFocusedSlugs.has(service.slug)) {
    return null;
  }

  return {
    title: 'Builders and contractors can send project details for review',
    description:
      'If your project needs excavation, trucking, material delivery, or equipment support lined up around a real schedule, Bellhouse can review the site, scope, and timing.',
    primaryLabel: 'Send Project Details',
    primaryHref: '/contractors#contractor-form',
    secondaryLabel: 'Call 519-752-8500',
    secondaryHref: 'tel:5197528500',
  };
}
