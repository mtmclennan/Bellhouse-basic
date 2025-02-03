import { notFound } from 'next/navigation';
import ServiceLayout from '../../components/layoutsWeb/ServiceLayout';
import servicesData from '../../../data/services.json';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
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
