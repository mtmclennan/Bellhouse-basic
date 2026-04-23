import type { ServicePage } from '@/types/interfaces';

export type ServiceAreaLinkItem = {
  label: string;
  href: string;
};

export type ServiceLocalIntentContent = {
  paragraph: string;
  linkedAreas: ServiceAreaLinkItem[];
  viewAllHref: string;
  viewAllLabel: string;
};

export type RelatedServiceLinkItem = {
  title: string;
  description: string;
  href: string;
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

function getUniqueItems<T>(items: T[], getKey: (item: T) => string) {
  return items.filter((item, index, allItems) => {
    const key = getKey(item);
    return allItems.findIndex((candidate) => getKey(candidate) === key) === index;
  });
}

function normalizeSentence(text: string) {
  return text.trim().replace(/\s+/g, ' ').replace(/\.+$/, '.');
}

function formatAreaLabelList(labels: string[]) {
  if (labels.length === 0) {
    return '';
  }

  if (labels.length === 1) {
    return labels[0];
  }

  if (labels.length === 2) {
    return `${labels[0]} and ${labels[1]}`;
  }

  return `${labels.slice(0, -1).join(', ')}, and ${labels[labels.length - 1]}`;
}

function buildOverflowCoverageSentence(labels: string[]) {
  if (labels.length === 0) {
    return undefined;
  }

  const visibleLabels = labels.slice(0, 4);
  const labelList = formatAreaLabelList(visibleLabels);

  if (labels.length > visibleLabels.length) {
    return `Also serving ${labelList}, and other nearby Bellhouse service areas.`;
  }

  return `Also serving ${labelList}.`;
}

export function getServiceLocalIntent(
  service: ServicePage,
): ServiceLocalIntentContent | null {
  if (!service.serviceArea) {
    return null;
  }

  const locations = service.serviceArea.locations ?? [];
  const uniqueLocations = getUniqueItems(locations, (location) => location);
  const linkedAreas = uniqueLocations
    .map((label) => ({
      label,
      href: liveServiceAreaMap[label],
    }))
    .filter((item): item is ServiceAreaLinkItem => Boolean(item.href));
  const overflowLabels = uniqueLocations.filter((label) => !liveServiceAreaMap[label]);
  const overflowSentence = buildOverflowCoverageSentence(overflowLabels);
  const baseParagraph = normalizeSentence(service.serviceArea.content);

  return {
    paragraph: overflowSentence
      ? `${baseParagraph} ${overflowSentence}`
      : baseParagraph,
    linkedAreas,
    viewAllHref: '/service-areas',
    viewAllLabel: 'View All Service Areas',
  };
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
