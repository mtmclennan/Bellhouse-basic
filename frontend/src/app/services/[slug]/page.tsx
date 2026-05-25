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
import { getServicePage } from '@/lib/services/getServicePage';
import { buildServiceMetadata } from '@/lib/services/serviceSeo';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

const cmsServiceSlugs = new Set([
  'foundation-excavation',
  'land-grading-drainage',
  'dirt-gravel-delivery',
  'site-preparation-land-grading',
  'driveway-parking-lot-preparation',
  'dump-truck-rental',
  'heavy-equipment-hauling',
  'volvo-a35-off-road-dump-truck-rental',
  'house-barn-demolition',
  'pond-digging-cleaning',
  'septic-system-installation',
]);

function isCmsServiceSlug(slug: string) {
  return cmsServiceSlugs.has(slug);
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  if (isCmsServiceSlug(slug)) {
    const page = getServicePage(slug);

    if (!page) {
      return {
        title: 'Service Not Found | Bellhouse Excavating',
        description: 'Requested service does not exist.',
      };
    }

    validateMetadata(page.meta.title, page.meta.description);
    return buildServiceMetadata(page);
  }

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

  if (isCmsServiceSlug(slug)) {
    const page = getServicePage(slug);

    if (!page) return notFound();

    return (
      <>
        <ServicePageSchema service={page} />
        <ServiceLayout mode="cms" page={page} />
      </>
    );
  }

  const service = getServiceBySlug(slug);

  if (!service) return notFound();

  const allServices = getAllServices();

  return (
    <>
      <ServicePageSchema service={service} />
      <ServiceLayout
        mode="legacy"
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
