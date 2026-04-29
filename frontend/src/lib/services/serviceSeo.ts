import type { Metadata } from 'next';

import type { CmsServicePage } from '@/types/services/cms';

const defaultBaseUrl = 'https://bellhouseexcavating.ca';

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

function getPrimaryImageAlt(page: CmsServicePage) {
  return page.hero.alt || page.card.alt || page.card.title;
}

export function buildServiceMetadata(
  page: CmsServicePage,
  baseUrl = defaultBaseUrl,
): Metadata {
  const pageUrl = getServicePageUrl(page, baseUrl);
  const imageUrl = getAbsoluteUrl(getPrimaryImage(page), baseUrl);
  const imageAlt = getPrimaryImageAlt(page);

  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: page.meta.openGraphTitle ?? page.meta.title,
      description: page.meta.openGraphDescription ?? page.meta.description,
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
      title: page.meta.openGraphTitle ?? page.meta.title,
      description: page.meta.openGraphDescription ?? page.meta.description,
      images: [imageUrl],
    },
  };
}
