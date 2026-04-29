import { getServiceAreaPage } from '@/lib/serviceAreas';
import { SERVICE_SITE_CONTEXT } from '@/lib/services/serviceSiteContext';
import type {
  ServiceAreasBlock,
  ServiceBlock,
  ServiceFaqBlock,
  ServiceIntroBlock,
  ServiceScopeBlock,
} from '@/types/services/blocks';
import type { CmsServicePage } from '@/types/services/cms';

const defaultBaseUrl = 'https://bellhouseexcavating.ca';
const defaultBusinessName = 'Bellhouse Excavating';

function getAbsoluteUrl(pathOrUrl: string, baseUrl: string) {
  if (!pathOrUrl) {
    return baseUrl;
  }

  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }

  return `${baseUrl}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}

function getServicePageUrl(page: CmsServicePage, baseUrl: string) {
  return `${baseUrl}/services/${page.slug}`;
}

function getPrimaryImage(page: CmsServicePage) {
  return page.hero.image || page.card.image;
}

function getSectionByType<TType extends ServiceBlock['type']>(
  page: CmsServicePage,
  type: TType,
): Extract<ServiceBlock, { type: TType }> | undefined {
  return page.sections.find(
    (section): section is Extract<ServiceBlock, { type: TType }> =>
      section.type === type,
  );
}

function getUniqueAreaLabels(section?: ServiceAreasBlock) {
  if (!section?.areaSlugs?.length) {
    return [];
  }

  const labels = section.areaSlugs
    .map((slug) => getServiceAreaPage(slug)?.city)
    .filter((label): label is string => Boolean(label));

  return labels.filter((label, index) => labels.indexOf(label) === index);
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

function getServiceTypes(
  page: CmsServicePage,
  introSection?: ServiceIntroBlock,
  scopeSection?: ServiceScopeBlock,
) {
  const values = [
    page.card.title,
    ...(introSection?.bullets ?? []),
    ...(scopeSection?.items.map((item) => item.title) ?? []),
  ].filter(Boolean);

  return values
    .filter((value, index) => values.indexOf(value) === index)
    .slice(0, 8);
}

function getOfferCatalog(page: CmsServicePage, scopeSection?: ServiceScopeBlock) {
  if (!scopeSection?.items.length) {
    return undefined;
  }

  return {
    '@type': 'OfferCatalog',
    name: `${page.card.title} scope`,
    itemListElement: scopeSection.items.slice(0, 6).map((item) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: item.title,
        description: item.body,
      },
    })),
  };
}

function getFaqGraph(pageUrl: string, faqSection?: ServiceFaqBlock) {
  if (!faqSection?.items.length) {
    return undefined;
  }

  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqSection.items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildServiceStructuredData(
  page: CmsServicePage,
  siteContext = SERVICE_SITE_CONTEXT,
  baseUrl = defaultBaseUrl,
) {
  const pageUrl = getServicePageUrl(page, baseUrl);
  const imageUrl = getAbsoluteUrl(getPrimaryImage(page), baseUrl);
  const businessId = `${baseUrl}/#business`;
  const introSection = getSectionByType(page, 'intro');
  const scopeSection = getSectionByType(page, 'scope');
  const serviceAreasSection = getSectionByType(page, 'serviceAreas');
  const faqSection = getSectionByType(page, 'faq');
  const areaServed = getUniqueAreaLabels(serviceAreasSection).map(mapLocationToPlace);

  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'LocalBusiness',
      '@id': businessId,
      name: defaultBusinessName,
      url: baseUrl,
      telephone: siteContext.business.phoneHref.replace('tel:', ''),
      sameAs: [getAbsoluteUrl(siteContext.business.reviewsHref, baseUrl)],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: siteContext.business.reviewRating,
        reviewCount: siteContext.business.reviewCount,
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.meta.title,
      description: page.meta.description,
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
      name: page.card.title,
      description: page.meta.description,
      url: pageUrl,
      image: imageUrl,
      provider: {
        '@id': businessId,
      },
      areaServed,
      serviceType: getServiceTypes(page, introSection, scopeSection),
      hasOfferCatalog: getOfferCatalog(page, scopeSection),
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
          name: page.card.title,
          item: pageUrl,
        },
      ],
    },
  ];

  const faqGraph = getFaqGraph(pageUrl, faqSection);

  if (faqGraph) {
    graph.push(faqGraph);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
