import Link from 'next/link';
import Script from 'next/script';
import type { ServiceAreaPage } from '@/lib/serviceAreas';
import {
  ServiceAreaCta,
  ServiceAreaFaq,
  ServiceAreaHero,
  ServiceAreaIntro,
  ServiceAreaNearbyAreas,
  ServiceAreaServices,
  ServiceAreaWhoWeWorkWith,
  ServiceAreaWhyChoose,
} from '@/components/service-areas';
import {
  defaultCtaImage,
  defaultHeroImage,
  defaultIntroImage,
} from '@/components/service-areas/visuals';

type ServiceAreaLayoutProps = {
  page: ServiceAreaPage;
};

const baseUrl = 'https://bellhouseexcavating.ca';

export default function ServiceAreaLayout({
  page,
}: ServiceAreaLayoutProps) {
  const pageUrl = `${baseUrl}/service-areas/${page.slug}`;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${pageUrl}#organization`,
    name: 'Bellhouse Excavating',
    url: baseUrl,
    logo: `${baseUrl}/assets/bellhouse-excavating-logo.jpg`,
    telephone: '+15197528500',
    email: 'info@bellhouseexcavating.ca',
    areaServed: {
      '@type': 'City',
      name: `${page.city}, ${page.province}`,
    },
    sameAs: [
      'https://www.facebook.com/bellhouseexcavating',
      'https://www.instagram.com/bellhouse_excavating/',
      'https://www.linkedin.com/company/bellhouse-excavating/',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id={`service-area-organization-${page.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id={`service-area-faq-${page.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServiceAreaHero
        eyebrow={`${page.city}, ${page.province}`}
        title={page.heroTitle}
        description={page.heroDescription}
        image={page.heroImage ?? defaultHeroImage}
        actions={[
          { href: '/contact', label: `Book ${page.city} excavation support` },
          {
            href: '/contact',
            label: `Ask about hauling in ${page.city}`,
            variant: 'secondary',
          },
        ]}
      />
      <ServiceAreaIntro
        heading={`${page.city} excavation and hauling support`}
        intro={page.intro.slice(0, 2)}
        image={page.introImage ?? defaultIntroImage}
      >
        <p>
          Clients comparing scope can review Bellhouse&apos;s full{' '}
          <Link href="/services">services overview</Link>, including{' '}
          <Link href="/services/foundation-excavation">foundation excavation</Link>{' '}
          and <Link href="/services/site-preparation-land-grading">site preparation and land grading</Link>{' '}
          for jobs that need accurate cuts, stable grades, and a clean start.
        </p>
      </ServiceAreaIntro>
      <ServiceAreaServices
        heading={`${page.city} excavation, grading, trucking, and float services`}
        items={page.services}
      >
        <p>{page.intro[2]}</p>
        <p>
          When a project also needs material moved or machines relocated, Bellhouse provides{' '}
          <Link href="/services/dump-truck-rental">dump truck hauling</Link>,{' '}
          <Link href="/services/dirt-gravel-delivery">aggregate delivery</Link>, and{' '}
          <Link href="/services/heavy-equipment-hauling">equipment floating</Link>{' '}
          alongside the excavation work so the site stays coordinated.
        </p>
      </ServiceAreaServices>
      <ServiceAreaWhoWeWorkWith
        heading={`Who Bellhouse works with in ${page.city}`}
        items={page.whoWeWorkWith}
      />
      <ServiceAreaWhyChoose
        heading={`Why ${page.city} jobs use Bellhouse for excavation and hauling`}
        items={page.whyChoose}
      />
      <ServiceAreaNearbyAreas
        heading={`Nearby service areas around ${page.city}`}
        items={page.nearbyAreas}
        map={page.map}
      />
      <ServiceAreaFaq
        heading={`${page.city} excavation and trucking questions`}
        items={page.faqs}
      />
      <ServiceAreaCta
        title={`Talk to Bellhouse about your ${page.city} site work`}
        description={page.metaDescription}
        image={page.ctaImage ?? defaultCtaImage}
        actions={[
          { href: '/contact', label: `Request a ${page.city} quote` },
          {
            href: 'tel:5197528500',
            label: 'Call 519-752-8500',
            variant: 'secondary',
          },
        ]}
      />
    </>
  );
}
