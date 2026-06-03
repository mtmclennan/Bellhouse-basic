import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LandingPageTemplate from '@/components/landing/LandingPageTemplate';
import {
  getLandingPageBySlug,
  landingPages,
} from '@/data/landingPages/landingPages';

type LandingPageRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: LandingPageRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPageBySlug(slug);

  if (!page) {
    return {
      title: 'Landing Page Not Found | Bellhouse Excavating',
      description: 'Requested landing page does not exist.',
    };
  }

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: page.seo.canonical
      ? {
          canonical: page.seo.canonical,
        }
      : undefined,
    robots: page.seo.noindex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: page.seo.ogImage
      ? {
          title: page.seo.title,
          description: page.seo.description,
          images: [
            {
              url: page.seo.ogImage.src,
              alt: page.seo.ogImage.alt,
              width: page.seo.ogImage.width,
              height: page.seo.ogImage.height,
            },
          ],
        }
      : undefined,
  };
}

export default async function LandingPageRoute({
  params,
}: LandingPageRouteProps) {
  const { slug } = await params;
  const page = getLandingPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <LandingPageTemplate page={page} />;
}

export function generateStaticParams() {
  return landingPages.map((page) => ({
    slug: page.slug,
  }));
}
