import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ServiceLayout from '../../components/layoutsWeb/ServiceLayout';
import servicesData from '../../../data/services.json';
import { ResolvedMetadata } from 'next';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata(
  { params }: ServicePageProps,
  Parent: ResolvedMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((service) => service.slug === slug);

  return {
    title: service?.meta.title,
    description: service?.meta.description,
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
