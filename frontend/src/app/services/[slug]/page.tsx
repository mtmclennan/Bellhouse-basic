import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ServiceLayout from './_components/ServiceLayout';
import servicesData from '../../../data/services.json';
import { validateMetadata } from '../../../lib/utils/seoValidation';
import type { ServicePage } from '@/types/interfaces';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export function generateStaticParams(): { slug: string }[] {
  return (servicesData as ServicePage[]).map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((service) => service.slug === slug);

  const validated = validateMetadata(
    service?.meta.title,
    service?.meta.description
  );

  return {
    title: validated.title || 'Bellhouse excavating',
    description: service?.meta.description || 'Excavating contractor',
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound(); // Automatically shows Next.js 404 page
  }

  return (
    <div>
      <ServiceLayout service={service} />
    </div>
  );
}
