// pages/services/[slug].js
import { useRouter } from 'next/router';
import ServiceLayout from '../../components/layoutsWeb/ServiceLayout';
import servicesData from '../../data/services.json';

const ServicePage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Find the service based on the slug
  const service = servicesData.find((service) => service.slug === slug);

  if (!service) {
    return <p>Service not found!</p>;
  }

  return (
    <div>
      <ServiceLayout service={service} />
    </div>
  );
};

export async function getStaticProps({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const service = servicesData.find((service) => service.slug === slug);

  return {
    props: {
      service,
    },
  };
}

export async function getStaticPaths() {
  const paths = servicesData.map((service) => ({
    params: { slug: service.slug },
  }));

  return {
    paths,
    fallback: false, // Show 404 if a page is not found
  };
}
export default ServicePage;
