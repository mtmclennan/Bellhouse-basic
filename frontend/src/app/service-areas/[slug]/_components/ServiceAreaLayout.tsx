import type { ReactNode } from 'react';
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
import { calculatorSeoConfig } from '@/features/calculators/config/seo';
import {
  BELLHOUSE_BASE_URL,
  getCanonicalUrl,
} from '@/lib/siteMetadata';

type ServiceAreaLayoutProps = {
  page: ServiceAreaPage;
};

const businessId = `${BELLHOUSE_BASE_URL}/#business`;

function mergeUniqueItems(...groups: Array<string[] | undefined>) {
  return groups.flatMap((group) => group ?? []).filter((item, index, items) => {
    return items.indexOf(item) === index;
  });
}

const serviceAreaPlanningSupport: Partial<Record<string, ReactNode>> = {
  brantford: (
    <>
      Need a quick number before you send the Brantford job details? Start with
      the{' '}
      <Link href={calculatorSeoConfig.excavation.resourcePath}>
        excavation calculator
      </Link>{' '}
      for cut and spoil planning or the{' '}
      <Link href={calculatorSeoConfig.gravel.resourcePath}>
        gravel calculator
      </Link>{' '}
      when the job depends on pads, access routes, or imported base material.
    </>
  ),
  paris: (
    <>
      Still planning a Paris-area lot? Use the{' '}
      <Link href={calculatorSeoConfig.excavation.resourcePath}>
        excavation calculator
      </Link>{' '}
      for foundation digs and spoil haul-out, or the{' '}
      <Link href={calculatorSeoConfig.gravel.resourcePath}>
        gravel calculator
      </Link>{' '}
      for driveway runs, access lanes, and imported base on rural properties.
    </>
  ),
  ancaster: (
    <>
      If the Ancaster job is still being roughed out, the{' '}
      <Link href={calculatorSeoConfig.excavation.resourcePath}>
        excavation calculator
      </Link>{' '}
      helps frame cut and haul-out, while the{' '}
      <Link href={calculatorSeoConfig.gravel.resourcePath}>
        gravel calculator
      </Link>{' '}
      is useful for driveway base, access lanes, and imported aggregate on
      sloped lots.
    </>
  ),
  waterdown: (
    <>
      Early-stage Waterdown work often needs a rough cut number and a base
      quantity before scheduling. Use the{' '}
      <Link href={calculatorSeoConfig.excavation.resourcePath}>
        excavation calculator
      </Link>{' '}
      for lot opening and haul-out, or the{' '}
      <Link href={calculatorSeoConfig.gravel.resourcePath}>
        gravel calculator
      </Link>{' '}
      for subdivision pads, access, and working-grade material.
    </>
  ),
  simcoe: (
    <>
      On larger Simcoe properties, it helps to separate cut planning from
      imported material. Use the{' '}
      <Link href={calculatorSeoConfig.excavation.resourcePath}>
        excavation calculator
      </Link>{' '}
      for spoil and haul-out, and the{' '}
      <Link href={calculatorSeoConfig.gravel.resourcePath}>
        gravel calculator
      </Link>{' '}
      for pads, lanes, and aggregate delivered back to site.
    </>
  ),
  woodstock: (
    <>
      Woodstock jobs often need quick numbers for both cut and working
      surfaces. Start with the{' '}
      <Link href={calculatorSeoConfig.excavation.resourcePath}>
        excavation calculator
      </Link>{' '}
      for excavation volume and haul-out, or the{' '}
      <Link href={calculatorSeoConfig.gravel.resourcePath}>
        gravel calculator
      </Link>{' '}
      for yard pads, haul routes, and imported aggregate.
    </>
  ),
};

export default function ServiceAreaLayout({
  page,
}: ServiceAreaLayoutProps) {
  const pageUrl = getCanonicalUrl(`/service-areas/${page.slug}`);
  const heroActions = [
    {
      href: '/contact',
      label: 'Request a quote',
    },
    {
      href: 'tel:5197528500',
      label: 'Call 519-752-8500',
      variant: 'secondary' as const,
    },
  ];
  const finalActions = [
    {
      href: '/contact',
      label: 'Request a quote',
    },
    {
      href: '/contractors',
      label: 'For Builders & Contractors',
      variant: 'secondary' as const,
    },
  ];

  const whoItsForItems = mergeUniqueItems(
    page.rightFit,
    page.whoWeWorkWith,
  ).slice(0, 6);
  const planningSupport = serviceAreaPlanningSupport[page.slug];
  const breadcrumbTrail = [
    { name: 'Home', href: '/' },
    { name: 'Service Areas', href: '/service-areas' },
    { name: page.city, href: `/service-areas/${page.slug}` },
  ];

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': businessId,
    name: 'Bellhouse Excavating',
    url: BELLHOUSE_BASE_URL,
    logo: `${BELLHOUSE_BASE_URL}/assets/bellhouse-excavating-logo.jpg`,
    telephone: '+15197528500',
    email: 'info@bellhouseexcavating.ca',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '573 Governors Rd E',
      addressLocality: 'Paris',
      addressRegion: 'ON',
      postalCode: 'N3L 3E1',
      addressCountry: 'CA',
    },
    sameAs: [
      'https://www.facebook.com/bellhouseexcavating',
      'https://www.instagram.com/bellhouse_excavating/',
      'https://www.linkedin.com/company/bellhouse-excavating/',
    ],
  };

  const serviceAreaSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: `${page.city} excavation and site work services`,
    description: page.heroDescription,
    url: pageUrl,
    provider: {
      '@id': businessId,
    },
    areaServed: {
      '@type': 'City',
      name: page.city,
    },
    serviceType: [
      'Excavation',
      'Site preparation',
      'Grading',
      'Dump truck hauling',
      'Material delivery',
      'Equipment floating',
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
        id={`service-area-business-${page.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <Script
        id={`service-area-service-${page.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAreaSchema) }}
      />
      <Script
        id={`service-area-faq-${page.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServiceAreaHero
        breadcrumbTrail={breadcrumbTrail}
        eyebrow={`${page.city}, ${page.province}`}
        title={page.heroTitle}
        description={page.heroDescription}
        image={page.heroImage ?? defaultHeroImage}
        actions={heroActions}
        contactNote={{
          href: 'sms:5197528500',
          label: 'Text 519-752-8500',
        }}
      />
      <ServiceAreaIntro
        heading={
          page.sectionHeadings?.intro ??
          `What your ${page.city} site usually needs before the next crew can move in`
        }
        intro={page.intro}
        image={page.introImage ?? defaultIntroImage}
      />
      <ServiceAreaServices
        heading={
          page.sectionHeadings?.services ??
          `Excavation, grading, hauling, and float services available in ${page.city}`
        }
        items={page.services}
        city={page.city}
      >
        {planningSupport ? <p>{planningSupport}</p> : null}
      </ServiceAreaServices>
      <ServiceAreaWhyChoose
        heading={
          page.sectionHeadings?.whyChoose ??
          `Why contractors in ${page.city} bring Bellhouse onto the job`
        }
        intro={page.whyChooseIntro}
        items={page.whyChoose}
      />
      <ServiceAreaWhoWeWorkWith
        heading={
          page.sectionHeadings?.whoWeWorkWith ??
          `Jobs in ${page.city} where Bellhouse is usually the right crew`
        }
        intro={page.rightFitIntro ?? page.whoWeWorkWithIntro}
        items={whoItsForItems}
      />
      <ServiceAreaFaq
        heading={
          page.sectionHeadings?.faq ??
          `Questions about ${page.city} excavation, grading, hauling, and site prep`
        }
        items={page.faqs}
      />
      {page.nearbyAreas.length ? (
        <ServiceAreaNearbyAreas
          heading={
            page.sectionHeadings?.nearbyAreas ??
            `Nearby service areas connected to ${page.city} work`
          }
          items={page.nearbyAreas}
          city={page.city}
          map={page.map}
        />
      ) : null}
      <ServiceAreaCta
        title={
          page.bottomCta?.title ??
          `Request a quote for ${page.city} excavation and site work`
        }
        description={
          page.bottomCta?.description ??
          'Call, text, or request a quote if you need a clear answer on fit, timing, and what the job needs first.'
        }
        supportingPoints={page.bottomCta?.supportingPoints}
        image={page.ctaImage ?? defaultCtaImage}
        actions={finalActions}
        contactNote={{
          href: 'sms:5197528500',
          label: 'Text 519-752-8500',
        }}
      />
    </>
  );
}
