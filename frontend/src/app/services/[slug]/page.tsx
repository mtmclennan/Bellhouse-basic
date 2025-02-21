import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ServiceLayout from '../../components/layoutsWeb/ServiceLayout';
import servicesData from '../../../data/services.json';
import { validateMetadata } from '../../../lib/utils/seoValidation';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return servicesData.map((service) => ({
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
