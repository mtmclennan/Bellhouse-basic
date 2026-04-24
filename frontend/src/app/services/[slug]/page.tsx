import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceLayout from './_components/ServiceLayout';
import ServicePageSchema from './_components/ServicePageSchema';
import { validateMetadata } from '../../../lib/utils/seoValidation';
import { getServiceBySlug } from '@/data/services/index';
import { getAllServices } from '@/data/services/index';
import {
  getServiceLocalIntent,
  getRelatedServiceLinks,
} from '@/lib/servicePageLinks';
import { getServicePageMetadata } from '@/lib/servicePageSeo';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found | Bellhouse Excavating',
      description: 'Requested service does not exist.',
    };
  }

  validateMetadata(service.meta.title, service.meta.description);
  return getServicePageMetadata(service);
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return notFound();

  const allServices = getAllServices();

  return (
    <>
      <ServicePageSchema service={service} />
      <ServiceLayout
        service={service}
        localIntent={getServiceLocalIntent(service)}
        relatedServices={getRelatedServiceLinks(service, allServices)}
      />
    </>
  );
}

export function generateStaticParams() {
  return getAllServices().map((service) => ({
    slug: service.slug,
  }));
}
