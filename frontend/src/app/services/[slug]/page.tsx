import { notFound } from 'next/navigation';
import ServiceLayout from './_components/ServiceLayout';
import { validateMetadata } from '../../../lib/utils/seoValidation';
import { getServiceBySlug } from '@/data/services/index';
import { getAllServices } from '@/data/services/index';
import { createPageMetadata } from '@/lib/siteMetadata';
import {
  getContractorCta,
  getLinkedServiceAreas,
  getRelatedServiceLinks,
} from '@/lib/servicePageLinks';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found | Bellhouse Excavating',
      description: 'Requested service does not exist.',
    };
  }

  const validated = validateMetadata(
    service.meta.title,
    service.meta.description,
  );

  return createPageMetadata({
    title: String(validated.title),
    description: String(validated.description),
    pathname: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return notFound();

  const allServices = getAllServices();

  return (
    <ServiceLayout
      service={service}
      linkedServiceAreas={getLinkedServiceAreas(service)}
      relatedServices={getRelatedServiceLinks(service, allServices)}
      contractorCta={getContractorCta(service)}
    />
  );
}

export function generateStaticParams() {
  return getAllServices().map((service) => ({
    slug: service.slug,
  }));
}
