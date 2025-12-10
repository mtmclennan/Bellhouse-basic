import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ServiceLayout from './_components/ServiceLayout';
import { validateMetadata } from '../../../lib/utils/seoValidation';
import type { ServicePage } from '@/types/interfaces';
import { getServiceBySlug } from '@/data/services/index';
import { getAllServices } from '@/data/services/index';

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
    service.meta.description
  );

  return {
    title: validated.title,
    description: validated.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return notFound();

  return <ServiceLayout service={service} />;
}

export function generateStaticParams() {
  return getAllServices().map((service) => ({
    slug: service.slug,
  }));
}
