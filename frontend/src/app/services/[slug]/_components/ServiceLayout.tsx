'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Gear, Star } from '@phosphor-icons/react/dist/ssr';

import logo from '../../../../../public/assets/BellhouseLogo-text.png';
import FAQAccordion from '@/app/components/FAQAccordion';
import Reviews from '@/app/components/webpage/Reviews';
import reviews from '@/data/reviews.json';
import type { ServicePage } from '@/types/interfaces';
import type {
  ContractorCtaContent,
  RelatedServiceLinkItem,
  ServiceAreaLinkItem,
} from '@/lib/servicePageLinks';
import { calculatorSeoConfig } from '@/features/calculators/config/seo';
import { SiteBreadcrumbs } from '@/features/calculators/components/ResourceBreadcrumbs';
import classes from './ServiceLayout.module.scss';

interface ServiceLayoutProps {
  service: ServicePage;
  linkedServiceAreas: ServiceAreaLinkItem[];
  relatedServices: RelatedServiceLinkItem[];
  contractorCta: ContractorCtaContent | null;
}

const serviceCalculatorLinks: Partial<
  Record<
    ServicePage['slug'],
    {
      title: string;
      description: string;
      links: {
        href: string;
        title: string;
        description: string;
        actionLabel: string;
      }[];
    }
  >
> = {
  'foundation-excavation': {
    title: 'Need a rough excavation quantity first?',
    description:
      'For foundation digs, spoil removal, and early haul-out planning, the Bellhouse excavation calculator gives you a practical starting point before site review.',
    links: [
      {
        href: calculatorSeoConfig.excavation.resourcePath,
        title: 'Excavation calculator for foundation digs',
        description:
          'Estimate in-place cut volume, loose material to haul, estimated weight, and rough truck loads for foundation excavation work.',
        actionLabel: 'Estimate Excavation Volume',
      },
    ],
  },
  'pond-digging-cleaning': {
    title: 'Roughing out pond excavation quantities?',
    description:
      'Pond work often starts with a rough cut-and-haul estimate. The excavation calculator is a useful planning tool before final scope, access, and spoil handling are reviewed on site.',
    links: [
      {
        href: calculatorSeoConfig.excavation.resourcePath,
        title: 'Excavation calculator for pond digging',
        description:
          'Use it to rough out excavation volume, loose material, and likely truck loads for new pond digging, expansion, or sediment removal.',
        actionLabel: 'Estimate Pond Excavation',
      },
    ],
  },
  'septic-system-installation': {
    title: 'Need a rough excavation estimate before septic work starts?',
    description:
      'Septic jobs usually involve excavation, bedding material, and haul-out decisions. The excavation calculator helps with the cut side of the job before engineered details are finalized.',
    links: [
      {
        href: calculatorSeoConfig.excavation.resourcePath,
        title: 'Excavation calculator for septic installs',
        description:
          'Estimate excavation volume, loose spoil, and rough truck loads for septic tank digs, trenches, and related excavation work.',
        actionLabel: 'Estimate Septic Excavation',
      },
    ],
  },
  'driveway-parking-lot-preparation': {
    title: 'Planning driveway or parking lot base quantities?',
    description:
      'For driveway gravel, parking lot base, and compacted placement work, the Bellhouse gravel calculator gives you a practical starting quantity before final grading and drainage are reviewed.',
    links: [
      {
        href: calculatorSeoConfig.gravel.resourcePath,
        title: 'Gravel calculator for driveway base',
        description:
          'Estimate compacted gravel/base quantity, delivered weight, and likely truck loads for driveways, lanes, and parking lot prep.',
        actionLabel: 'Estimate Gravel Base',
      },
    ],
  },
  'site-preparation-land-grading': {
    title: 'Planning site prep quantities before the job is priced?',
    description:
      'Site prep can involve both compacted base and finish topsoil. These planning tools help you rough out the right material side of the work without mixing it up with excavation-only estimates.',
    links: [
      {
        href: calculatorSeoConfig.gravel.resourcePath,
        title: 'Gravel calculator for pads and access routes',
        description:
          'Useful for compacted base quantities on building pads, lanes, and imported aggregate needed during site preparation.',
        actionLabel: 'Estimate Gravel Quantities',
      },
      {
        href: calculatorSeoConfig.topsoil.resourcePath,
        title: 'Topsoil calculator for finish grading',
        description:
          'Helpful when you need to plan placed topsoil coverage for final grading, yard shaping, and surface restoration.',
        actionLabel: 'Estimate Topsoil Coverage',
      },
    ],
  },
  'dirt-gravel-delivery': {
    title: 'Need a quick material estimate before ordering?',
    description:
      'If you are ordering aggregate or topsoil, these calculators help you rough out quantity, weight, and likely truck loads before delivery is scheduled.',
    links: [
      {
        href: calculatorSeoConfig.gravel.resourcePath,
        title: 'Gravel calculator for aggregate delivery',
        description:
          'Estimate compacted gravel/base quantity, delivered weight, and truck count for driveways, pads, lanes, and imported stone.',
        actionLabel: 'Estimate Gravel Delivery',
      },
      {
        href: calculatorSeoConfig.topsoil.resourcePath,
        title: 'Topsoil calculator for coverage planning',
        description:
          'Rough out topsoil volume and load count for finish grading, lawn prep, and surface coverage before ordering.',
        actionLabel: 'Estimate Topsoil Delivery',
      },
    ],
  },
  'dump-truck-rental': {
    title: 'Need to rough out what the operator-backed trucks will be moving?',
    description:
      'For Bellhouse dump truck service, the useful question is usually whether you are hauling excavation spoil or bringing in compacted aggregate. These tools help you plan that more clearly before scheduling trucks and operators.',
    links: [
      {
        href: calculatorSeoConfig.excavation.resourcePath,
        title: 'Excavation calculator for spoil haul-out',
        description:
          'Estimate loose excavated material, weight, and rough truck loads when trucks are needed for cut material and haul-off.',
        actionLabel: 'Estimate Spoil Haul-Out',
      },
      {
        href: calculatorSeoConfig.gravel.resourcePath,
        title: 'Gravel calculator for imported aggregate',
        description:
          'Use it to rough out aggregate quantity, delivered tons, and likely truck counts for imported gravel or base material.',
        actionLabel: 'Estimate Aggregate Loads',
      },
    ],
  },
  'house-barn-demolition': {
    title: 'Planning what happens after demolition?',
    description:
      'If the next step after teardown is rebuilding, base prep, or surface restoration, these calculators help rough out the material side before the site is reviewed in person.',
    links: [
      {
        href: calculatorSeoConfig.gravel.resourcePath,
        title: 'Gravel calculator for rebuild pads and access',
        description:
          'Useful when a demolition job is being followed by a driveway base, pad, lane, or imported aggregate work.',
        actionLabel: 'Estimate Gravel Base',
      },
      {
        href: calculatorSeoConfig.topsoil.resourcePath,
        title: 'Topsoil calculator for cleanup and restoration',
        description:
          'Helpful when the property will need finish grading or topsoil coverage after the demolition and rough cleanup are complete.',
        actionLabel: 'Estimate Topsoil Coverage',
      },
    ],
  },
  'heavy-equipment-hauling': {
    title: 'Planning the site work before the machines move?',
    description:
      'If the machine move is tied to excavation, pad prep, or imported aggregate, these tools can help you rough out the material side before Bellhouse schedules the float service.',
    links: [
      {
        href: calculatorSeoConfig.excavation.resourcePath,
        title: 'Excavation calculator for cut and haul planning',
        description:
          'Useful when the float service is supporting excavation, pond work, or other cut-and-haul jobs that need rough quantities first.',
        actionLabel: 'Estimate Excavation Volume',
      },
      {
        href: calculatorSeoConfig.gravel.resourcePath,
        title: 'Gravel calculator for pads and access routes',
        description:
          'Helpful when the machine move is tied to site prep, working pads, access lanes, or imported base material.',
        actionLabel: 'Estimate Gravel Quantities',
      },
    ],
  },
  'volvo-a35-off-road-dump-truck-rental': {
    title: 'Planning bulk on-site haul volumes?',
    description:
      'On larger earthmoving jobs, a quick excavation estimate can help frame how much material the off-road truck may need to move before production planning is finalized.',
    links: [
      {
        href: calculatorSeoConfig.excavation.resourcePath,
        title: 'Excavation calculator for bulk earthmoving',
        description:
          'Estimate excavation volume, loose material, and rough haul quantities for subdivision work, pond jobs, and large site cuts.',
        actionLabel: 'Estimate Earthmoving Volume',
      },
    ],
  },
};

export default function ServiceLayout({
  service,
  linkedServiceAreas,
  relatedServices,
  contractorCta,
}: ServiceLayoutProps) {
  const calculatorLink = serviceCalculatorLinks[service.slug];
  const breadcrumbTrail = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    {
      name: service.hero.heading,
      href: `/services/${service.slug}`,
    },
  ];

  return (
    <>
      <section className={classes.container}>
        <div className="contact-hero">
          <div className="hero-logo__mobile">
            <Image
              src={logo}
              alt="Bellhouse Excavating logo"
              quality={80}
              width={200}
              height={155}
              sizes="(max-width: 375px) 120px, (max-width: 768px) 160px, 200px"
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        </div>

        <div className={classes.hero}>
          <div className={classes.breadcrumbs}>
            <SiteBreadcrumbs trail={breadcrumbTrail} />
          </div>
          <h1>{service.hero.heading}</h1>
          <h3>{service.hero.subheading}</h3>

          <Link href="/contact" className={classes.btn}>
            Get a Free Estimate
          </Link>
        </div>

        <Image
          className={classes.image}
          src={service.hero.image}
          alt={service.hero.alt}
          width={650}
          height={550}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </section>

      <section className={classes.introContainer}>
        <h2>{service.intro.heading}</h2>

        <div className={classes.introContent}>
          <p>{service.intro.content}</p>

          <ul>
            {service.intro.keypoints.map((point) => (
              <li key={point}>
                <Star size={24} color="#ffc302" weight="fill" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {service.includes ? (
        <section className={classes.section}>
          <h2>{service.includes.heading}</h2>
          {service.includes.subheading ? (
            <p className={classes.subtext}>{service.includes.subheading}</p>
          ) : null}

          <div className={classes.featureGrid}>
            {service.includes.items.map((item) => (
              <div key={item.title} className={classes.featureCard}>
                <div className={classes.featureHeading}>
                  <CheckCircle
                    size={32}
                    weight="regular"
                    className={classes.icon}
                  />
                  <h3>{item.title}</h3>
                </div>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {service.equipment ? (
        <section className={classes.equipmentSection}>
          <div className={classes.heading}>
            <h2>{service.equipment.heading}</h2>
            {service.equipment.subheading ? (
              <p>{service.equipment.subheading}</p>
            ) : null}
          </div>

          <div className={classes.equipmentGrid}>
            {service.equipment.items.map((item) => (
              <div key={item.title} className={classes.equipmentItem}>
                <div className={classes.equipmentIcon}>
                  {item.icon ? (
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={150}
                      height={150}
                    />
                  ) : (
                    <Gear size={40} weight="fill" />
                  )}
                </div>

                <div className={classes.eqText}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {service.process ? (
        <section className={classes.processSection}>
          <h2>{service.process.heading}</h2>
          {service.process.subheading ? (
            <p className={classes.subtext}>{service.process.subheading}</p>
          ) : null}

          <div className={classes.processList}>
            {service.process.steps.map((step, index) => (
              <div key={step.title} className={classes.processItem}>
                <div className={classes.stepNumber}>{index + 1}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {service.serviceArea ? (
        <section className={`${classes.section} ${classes.serviceAreaSection}`}>
          <p className={classes.eyebrow}>Service areas</p>
          <h2>{service.serviceArea.heading}</h2>
          <p className={classes.subtext}>{service.serviceArea.content}</p>

          <div className={classes.locationGrid}>
            {linkedServiceAreas.map((location) =>
              location.href ? (
                <Link
                  className={classes.locationLinkCard}
                  href={location.href}
                  key={`${location.href}-${location.label}`}
                >
                  See service in {location.label}
                </Link>
              ) : (
                <span className={classes.locationItemCard} key={location.label}>
                  {location.label}
                </span>
              ),
            )}
          </div>
        </section>
      ) : null}

      {contractorCta ? (
        <section className={classes.contractorCtaSection}>
          <div className={classes.contractorCtaShell}>
            <p className={classes.eyebrow}>For builders and contractors</p>
            <h2>{contractorCta.title}</h2>
            <p>{contractorCta.description}</p>
            <div className={classes.contractorActions}>
              <Link href={contractorCta.primaryHref} className={classes.btn}>
                {contractorCta.primaryLabel}
              </Link>
              <Link
                href={contractorCta.secondaryHref}
                className={classes.btnSecondary}
              >
                {contractorCta.secondaryLabel}
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {calculatorLink ? (
        <section className={classes.calculatorSection}>
          <div className={classes.calculatorShell}>
            <p className={classes.eyebrow}>Planning tool</p>
            <h2>{calculatorLink.title}</h2>
            <p>{calculatorLink.description}</p>
            <div className={classes.calculatorGrid}>
              {calculatorLink.links.map((linkItem) => (
                <div className={classes.calculatorCard} key={linkItem.href}>
                  <h3>{linkItem.title}</h3>
                  <p>{linkItem.description}</p>
                  <div className={classes.contractorActions}>
                    <Link href={linkItem.href} className={classes.btn}>
                      {linkItem.actionLabel}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.contractorActions}>
              <Link href="/resources" className={classes.btnSecondary}>
                View All Resources
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {service.faq ? (
        <FAQAccordion
          heading={service.faq.heading}
          subheading="Clear, helpful answers for builders and homeowners."
          items={service.faq.items}
        />
      ) : null}

      {relatedServices.length > 0 ? (
        <section className={classes.relatedServicesSection}>
          <p className={classes.eyebrow}>Related services</p>
          <h2>Related excavation and hauling services</h2>
          <div className={classes.relatedServicesGrid}>
            {relatedServices.map((relatedService) => (
              <Link
                className={classes.relatedServiceCard}
                href={relatedService.href}
                key={relatedService.href}
              >
                <h3>{relatedService.title}</h3>
                <p>{relatedService.description}</p>
                <span className={classes.relatedServiceAction}>
                  View Service
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <Reviews reviews={reviews} />

      {service.cta ? (
        <section className={classes.cta}>
          <h2>{service.cta.heading}</h2>
          <p>{service.cta.subheading}</p>

          <Link href="/contact" className={classes.btn}>
            {service.cta.button}
          </Link>
        </section>
      ) : null}
    </>
  );
}
