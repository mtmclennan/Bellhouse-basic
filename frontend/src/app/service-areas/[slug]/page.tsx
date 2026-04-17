import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceAreaLayout from './_components/ServiceAreaLayout';
import {
  getServiceAreaPage,
  getServiceAreaMetadata,
  serviceAreaPageList,
} from '@/lib/serviceAreas';
import { validateMetadata } from '@/lib/utils/seoValidation';

type ServiceAreaPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ServiceAreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getServiceAreaPage(slug);

  if (!page) {
    return {
      title: 'Service Area Not Found | Bellhouse Excavating',
      description: 'Requested service area does not exist.',
    };
  }

  validateMetadata(page.metaTitle, page.metaDescription);
  return getServiceAreaMetadata(page);
}

export default async function ServiceAreaPage({
  params,
}: ServiceAreaPageProps) {
  const { slug } = await params;
  const page = getServiceAreaPage(slug);

  if (!page) {
    notFound();
  }

  return <ServiceAreaLayout page={page} />;
}

export function generateStaticParams() {
  return serviceAreaPageList.map((page) => ({
    slug: page.slug,
  }));
}
