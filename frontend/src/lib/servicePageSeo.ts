import type { Metadata } from 'next';

import type { ServicePage } from '@/types/interfaces';

const defaultBaseUrl = 'https://bellhouseexcavating.ca';
const businessId = `${defaultBaseUrl}/#business`;

function getAbsoluteUrl(pathOrUrl: string, baseUrl: string) {
  if (!pathOrUrl) {
    return baseUrl;
  }

  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }

  return `${baseUrl}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}

function getServicePageUrl(service: ServicePage, baseUrl: string) {
  return `${baseUrl}/services/${service.slug}`;
}

function getPrimaryImage(service: ServicePage) {
  return service.hero.image || service.card.image;
}

function getPrimaryImageAlt(service: ServicePage) {
  return service.hero.alt || service.card.alt || service.card.title;
}

function getUniqueLocations(service: ServicePage) {
  const locations = service.serviceArea?.locations ?? [];

  return locations.filter((location, index) => locations.indexOf(location) === index);
}

function mapLocationToPlace(location: string) {
  const placeType =
    location.includes('County') || location.includes('Region')
      ? 'AdministrativeArea'
      : 'City';

  return {
    '@type': placeType,
    name: location,
  };
}

function getServiceTypes(service: ServicePage) {
  const values = [
    service.card.title,
    ...service.intro.keypoints,
    ...(service.includes?.items.map((item) => item.title) ?? []),
  ].filter(Boolean);

  return values.filter((value, index) => values.indexOf(value) === index).slice(0, 8);
}

function getOfferCatalog(service: ServicePage) {
  if (!service.includes?.items.length) {
    return undefined;
  }

  return {
    '@type': 'OfferCatalog',
    name: `${service.card.title} scope`,
    itemListElement: service.includes.items.slice(0, 6).map((item) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: item.title,
        description: item.description,
      },
    })),
  };
}

export function getServicePageMetadata(
  service: ServicePage,
  baseUrl = defaultBaseUrl,
): Metadata {
  const pageUrl = getServicePageUrl(service, baseUrl);
  const imageUrl = getAbsoluteUrl(getPrimaryImage(service), baseUrl);
  const imageAlt = getPrimaryImageAlt(service);

  return {
    title: service.meta.title,
    description: service.meta.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: service.meta.openGraphTitle ?? service.meta.title,
      description: service.meta.openGraphDescription ?? service.meta.description,
      url: pageUrl,
      siteName: 'Bellhouse Excavating',
      type: 'website',
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.meta.openGraphTitle ?? service.meta.title,
      description: service.meta.openGraphDescription ?? service.meta.description,
      images: [imageUrl],
    },
  };
}

export function getServicePageSchemaGraph(
  service: ServicePage,
  baseUrl = defaultBaseUrl,
) {
  const pageUrl = getServicePageUrl(service, baseUrl);
  const imageUrl = getAbsoluteUrl(getPrimaryImage(service), baseUrl);
  const areaServed = getUniqueLocations(service).map(mapLocationToPlace);
  const faqItems = service.faq?.items ?? [];

  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: service.meta.title,
      description: service.meta.description,
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
      about: {
        '@id': `${pageUrl}#service`,
      },
    },
    {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: service.card.title,
      description: service.meta.description,
      url: pageUrl,
      image: imageUrl,
      provider: {
        '@id': businessId,
      },
      areaServed,
      serviceType: getServiceTypes(service),
      hasOfferCatalog: getOfferCatalog(service),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: `${baseUrl}/services`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: service.card.title,
          item: pageUrl,
        },
      ],
    },
  ];

  if (faqItems.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
