import type { Metadata } from 'next';
import { validateMetadata } from '@/lib/utils/seoValidation';

export const BELLHOUSE_BASE_URL = 'https://bellhouseexcavating.ca';
export const BELLHOUSE_SITE_NAME = 'Bellhouse Excavating';

type CreatePageMetadataOptions = {
  title: string;
  description: string;
  pathname: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphType?: 'website' | 'article';
  robots?: Metadata['robots'];
};

export function getCanonicalUrl(pathname: string) {
  if (pathname === '/' || pathname.length === 0) {
    return `${BELLHOUSE_BASE_URL}/`;
  }

  const normalizedPathname = pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname;
  const prefixedPathname = normalizedPathname.startsWith('/')
    ? normalizedPathname
    : `/${normalizedPathname}`;

  return `${BELLHOUSE_BASE_URL}${prefixedPathname}`;
}

export function createPageMetadata({
  title,
  description,
  pathname,
  openGraphTitle,
  openGraphDescription,
  openGraphType = 'website',
  robots = {
    index: true,
    follow: true,
  },
}: CreatePageMetadataOptions): Metadata {
  const validated = validateMetadata(title, description);
  const safeTitle = String(validated.title);
  const safeDescription = String(validated.description);
  const canonicalUrl = getCanonicalUrl(pathname);

  return {
    title: safeTitle,
    description: safeDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: openGraphTitle ?? safeTitle,
      description: openGraphDescription ?? safeDescription,
      url: canonicalUrl,
      siteName: BELLHOUSE_SITE_NAME,
      type: openGraphType,
    },
    robots,
  };
}
