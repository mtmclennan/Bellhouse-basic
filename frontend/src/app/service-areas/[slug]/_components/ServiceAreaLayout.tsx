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
import faqClasses from '@/components/service-areas/ServiceAreaFaq.module.scss';

type ServiceAreaLayoutProps = {
  page: ServiceAreaPage;
};

const baseUrl = 'https://bellhouseexcavating.ca';
const businessId = `${baseUrl}/#business`;

export default function ServiceAreaLayout({
  page,
}: ServiceAreaLayoutProps) {
  const pageUrl = `${baseUrl}/service-areas/${page.slug}`;
  const primaryActionLabel = `Get a quote for ${page.city} work`;
  const ctaActions = [
    {
      href: '/contact',
      label: primaryActionLabel,
    },
    {
      href: 'tel:5197528500',
      label: 'Call 519-752-8500',
      variant: 'secondary' as const,
    },
    {
      href: 'sms:5197528500',
      label: 'Text 519-752-8500',
      variant: 'secondary' as const,
    },
  ];

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': businessId,
    name: 'Bellhouse Excavating',
    url: baseUrl,
    logo: `${baseUrl}/assets/bellhouse-excavating-logo.jpg`,
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
      name: `${page.city}, ${page.province}`,
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
        eyebrow={`${page.city}, ${page.province}`}
        title={page.heroTitle}
        description={page.heroDescription}
        image={page.heroImage ?? defaultHeroImage}
        actions={ctaActions}
      />
      <ServiceAreaIntro
        heading={
          page.sectionHeadings?.intro ??
          `How Bellhouse handles excavation, grading, and truck access in ${page.city}`
        }
        intro={page.intro.slice(0, 2)}
        image={page.introImage ?? defaultIntroImage}
      >
        <p>
          See Bellhouse&apos;s full <Link href="/services">services overview</Link>,
          including{' '}
          <Link href="/services/foundation-excavation">
            {page.city} foundation excavation
          </Link>{' '}
          and{' '}
          <Link href="/services/site-preparation-land-grading">
            {page.city} site preparation and land grading
          </Link>{' '}
          for projects that need accurate cuts, stable grades, and clean truck
          coordination from the start.
        </p>
      </ServiceAreaIntro>
      <ServiceAreaServices
        heading={
          page.sectionHeadings?.services ??
          `Excavation, grading, hauling, and float services Bellhouse offers in ${page.city}`
        }
        items={page.services}
        city={page.city}
      >
        <p>{page.intro[2]}</p>
        <p>
          Bellhouse also handles{' '}
          <Link href="/services/dump-truck-rental">
            {page.city} dump truck hauling
          </Link>
          ,{' '}
          <Link href="/services/dirt-gravel-delivery">
            aggregate delivery for {page.city} jobs
          </Link>
          , and{' '}
          <Link href="/services/heavy-equipment-hauling">
            equipment floating in {page.city}
          </Link>{' '}
          as part of the same site-work plan, so the digging, haul-out, and next
          delivery stay aligned.
        </p>
      </ServiceAreaServices>
      <ServiceAreaCta
        title={
          page.midPageCta?.title ??
          `Need ${page.city} excavation and truck coordination on one schedule?`
        }
        description={
          page.midPageCta?.description ??
          `Send Bellhouse the site address, scope, and rough timing to get a direct answer on fit, sequencing, and the next step.`
        }
        supportingPoints={page.midPageCta?.supportingPoints}
        actions={ctaActions}
      />
      <ServiceAreaWhoWeWorkWith
        heading={
          page.sectionHeadings?.rightFit ??
          `Is Bellhouse the right fit for your ${page.city} project?`
        }
        intro={page.rightFitIntro}
        items={page.rightFit}
      />
      <ServiceAreaWhyChoose
        heading={
          page.sectionHeadings?.howProjectsAreHandled ??
          `How ${page.city} projects are handled`
        }
        intro={page.howProjectsAreHandledIntro}
        items={page.howProjectsAreHandled}
      />
      <ServiceAreaWhoWeWorkWith
        heading={
          page.sectionHeadings?.whoWeWorkWith ??
          `Who hires Bellhouse for ${page.city} excavation work`
        }
        intro={page.whoWeWorkWithIntro}
        items={page.whoWeWorkWith}
      />
      <ServiceAreaWhyChoose
        heading={
          page.sectionHeadings?.whyChoose ??
          `Why ${page.city} projects call Bellhouse for excavation and trucking`
        }
        intro={page.whyChooseIntro}
        items={page.whyChoose}
      />
      <ServiceAreaNearbyAreas
        heading={
          page.sectionHeadings?.nearbyAreas ??
          `Nearby Bellhouse service areas linked to ${page.city}`
        }
        items={page.nearbyAreas}
        city={page.city}
        map={page.map}
      />
      <ServiceAreaFaq
        heading={
          page.sectionHeadings?.faq ??
          `${page.city} excavation, grading, and hauling FAQs`
        }
        items={page.faqs}
        cta={
          <div className={faqClasses.call}>
            <h3 className={faqClasses.title}>Still deciding if Bellhouse is the right fit?</h3>
            <p className={faqClasses.copy}>
              Call{' '}
              <Link href="tel:5197528500" className={faqClasses.inlineLink}>
                519-752-8500
              </Link>{' '}
              or{' '}
              <Link href="sms:5197528500" className={faqClasses.inlineLink}>
                text 519-752-8500
              </Link>{' '}
              if you want to talk through the site, timeline, or send photos before filling out the form.
            </p>
          </div>
        }
      />
      <ServiceAreaWhyChoose
        heading={
          page.sectionHeadings?.whatHappensNext ??
          `What happens next on a ${page.city} project`
        }
        intro={page.whatHappensNextIntro}
        items={page.whatHappensNext}
      />
      <ServiceAreaCta
        title={
          page.bottomCta?.title ??
          page.ctaTitle ??
          `Get a quote for ${page.city} excavation, grading, or hauling`
        }
        description={
          page.bottomCta?.description ??
          `Bellhouse keeps excavation, grading, trucking, and machine timing tied to the same job plan so the site is ready for the next step.`
        }
        supportingPoints={page.bottomCta?.supportingPoints}
        image={page.ctaImage ?? defaultCtaImage}
        actions={ctaActions}
      />
    </>
  );
}
