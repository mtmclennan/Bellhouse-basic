import Script from 'next/script';
import type { ServiceAreaPage } from '@/lib/serviceAreas';
import {
  ServiceAreaAtAGlance,
  ServiceAreaCta,
  ServiceAreaFaq,
  ServiceAreaHero,
  ServiceAreaIntro,
  ServiceAreaLocalConditions,
  ServiceAreaLocalPermits,
  ServiceAreaLocalProof,
  ServiceAreaNearbyAreas,
  ServiceAreaProjectTypes,
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
const businessId = `${baseUrl}/#business`;
const contractorFocusedAreas = new Set([
  'brantford',
  'hamilton',
  'cambridge',
  'woodstock',
  'simcoe',
]);

function mergeUniqueItems(...groups: Array<string[] | undefined>) {
  return groups.flatMap((group) => group ?? []).filter((item, index, items) => {
    return items.indexOf(item) === index;
  });
}

function getFinalActions(page: ServiceAreaPage) {
  const secondaryAction = contractorFocusedAreas.has(page.slug)
    ? {
        href: '/contractors',
        label: 'For Builders & Contractors',
        variant: 'secondary' as const,
      }
    : {
        href: '/services',
        label: 'View Core Services',
        variant: 'secondary' as const,
      };

  return [
    {
      href: '/contact',
      label: 'Request a quote',
    },
    secondaryAction,
  ];
}

export default function ServiceAreaLayout({
  page,
}: ServiceAreaLayoutProps) {
  const pageUrl = `${baseUrl}/service-areas/${page.slug}`;
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
  const finalActions = getFinalActions(page);

  const whoItsForItems = mergeUniqueItems(
    page.rightFit,
    page.whoWeWorkWith,
  ).slice(0, 6);

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
      name: `${page.city}, Ontario, Canada`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: page.city,
        addressRegion: 'ON',
        addressCountry: 'CA',
      },
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Service Areas',
        item: `${baseUrl}/service-areas`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.city,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
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
      <Script
        id={`service-area-breadcrumb-${page.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServiceAreaHero
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
      {page.atAGlance?.items.length ? (
        <ServiceAreaAtAGlance
          heading={page.atAGlance.heading}
          city={page.city}
          items={page.atAGlance.items}
        />
      ) : null}
      <ServiceAreaIntro
        heading={
          page.sectionHeadings?.intro ??
          `What your ${page.city} site usually needs before the next crew can move in`
        }
        intro={page.intro}
        image={page.introImage ?? defaultIntroImage}
      />
      {page.projectTypes?.length ? (
        <ServiceAreaProjectTypes
          heading={
            page.sectionHeadings?.projectTypes ??
            `Common ${page.city} project types Bellhouse supports`
          }
          intro={`These are the local project types where excavation, grading, hauling, and site access often need to be planned together before the work starts.`}
          items={page.projectTypes}
        />
      ) : null}
      {page.localConditions?.items.length ? (
        <ServiceAreaLocalConditions
          heading={
            page.localConditions.heading ??
            `Local excavation conditions around ${page.city}`
          }
          intro={page.localConditions.intro}
          items={page.localConditions.items}
        />
      ) : null}
      {page.localPermits?.items.length ? (
        <ServiceAreaLocalPermits
          heading={
            page.localPermits.heading ??
            `${page.city} permits and approvals to check before you dig`
          }
          intro={page.localPermits.intro}
          disclaimer={
            page.localPermits.disclaimer ??
            'Requirements vary by property and project. Confirm final requirements with the applicable authority before work begins.'
          }
          items={page.localPermits.items}
        />
      ) : null}
      {page.localProof?.items.length ? (
        <ServiceAreaLocalProof
          heading={
            page.localProof.heading ?? `Recent Bellhouse work in ${page.city}`
          }
          intro={page.localProof.intro}
          items={page.localProof.items}
        />
      ) : null}
      <ServiceAreaServices
        heading={
          page.sectionHeadings?.services ??
          `Excavation, grading, hauling, and float services available in ${page.city}`
        }
        items={page.services}
        city={page.city}
      />
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
