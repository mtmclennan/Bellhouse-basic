function Write-File {
  param([string]$Path, [string]$Content)
  $tmp = Join-Path $env:TEMP ([System.IO.Path]::GetRandomFileName())
  [System.IO.File]::WriteAllText($tmp, $Content)
  if (Test-Path -LiteralPath $Path) {
    Remove-Item -LiteralPath $Path -Force
  }
  Move-Item -LiteralPath $tmp -Destination $Path -Force
}

Write-File 'frontend/src/app/components/webpage/ServiceArea.tsx' @'
'use client';

import React from 'react';
import Link from 'next/link';
import styles from './ServiceArea.module.scss';

export type ServiceAreaLocation =
  | string
  | {
      label: string;
      href: string;
    };

export type ServiceAreaAction = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
};

interface ServiceAreaProps {
  heading: string;
  subtext?: string;
  locations: ServiceAreaLocation[];
  actions?: ServiceAreaAction[];
  variant?: 'default' | 'homepage';
}

export default function ServiceArea({
  heading,
  subtext,
  locations,
  actions = [],
  variant = 'default',
}: ServiceAreaProps) {
  return (
    <section
      className={${styles.section} }
    >
      <h2 className={styles.heading}>{heading}</h2>

      {subtext ? <p className={styles.subtext}>{subtext}</p> : null}

      <ul className={styles.locationList}>
        {locations.map((loc) => {
          const key = typeof loc === 'string' ? loc : ${loc.label}-;

          return (
            <li key={key}>
              {typeof loc === 'string' ? (
                <span className={styles.locationItem}>{loc}</span>
              ) : (
                <Link className={styles.locationLink} href={loc.href}>
                  {loc.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      {actions.length > 0 ? (
        <div className={styles.actions}>
          {actions.map((action) => (
            <Link
              className={
                action.variant === 'secondary'
                  ? styles.secondaryAction
                  : styles.primaryAction
              }
              href={action.href}
              key={${action.href}-}
            >
              {action.label}
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}
'@

Write-File 'frontend/src/app/components/webpage/ServiceArea.module.scss' @'
@use '../../../styles/abstracts/variables' as v;
@use '../../..//styles/abstracts/mixins' as m;

.section {
  width: 100%;
  padding: 6rem 2rem;
}

.default {
  background: #262626;
}

.homepage {
  background: #202020;
}

.heading {
  font-size: 4rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: white;
}

.subtext {
  font-size: 1.8rem;
  color: rgba(255, 255, 255, 0.75);
  text-align: center;
  max-width: 70rem;
  margin: 0 auto 3rem auto;
  line-height: 1.45;
}

.locationList {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem 2rem;
  max-width: 90rem;
  margin: 0 auto;
  padding: 0;
  list-style: none;

  li {
    position: relative;
    padding-left: 1.4rem;
  }

  li::before {
    content: '';
    width: 0.8rem;
    height: 0.8rem;
    background: v.-accent;
    border-radius: 50%;
    position: absolute;
    top: 0.8rem;
    left: 0;
  }
}

.locationItem,
.locationLink {
  font-size: 1.8rem;
  line-height: 1.4;
  color: white;
}

.locationLink {
  text-decoration: none;
  border-bottom: 1px solid rgba(v.-accent, 0.65);

  &:hover,
  &:focus-visible {
    color: v.-accent;
    border-bottom-color: v.-accent;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.6rem;
  margin-top: 3.2rem;
}

.primaryAction {
  @include m.btnMain;
}

.secondaryAction {
  @include m.btnSec;
}

@media (max-width: 768px) {
  .locationList {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .locationList {
    grid-template-columns: 1fr;
    justify-items: start;
  }
}
'@

Write-File 'frontend/src/app/Home-page.tsx' @'
'use client';
import { Fragment } from 'react';

import Image from 'next/image';
import logo from '../../public/assets/BellhouseLogo-text.png';
import { Phone } from '@phosphor-icons/react';
import reviews from '@/data/reviews.json';
import HomeAbout from '@/app/components/webpage/HomeAbout';
import HomeServices from '@/app/components/webpage/HomeServices';
import CallToAction from './components/webpage/CallToAction';
import Link from 'next/link';
import Reviews from './components/webpage/Reviews';
import ServiceArea from './components/webpage/ServiceArea';

const HomePage = () => {
  return (
    <Fragment>
      <div className="hero__container">
        <section className="hero">
          <div className="hero-title">
            <div className="hero-logo__mobile">
              <Image
                src={logo}
                alt="Bellhouse Excavating logo"
                quality={80}
                width={100}
                height={55}
                style={{
                  width: 'auto',
                  height: 'auto',
                }}
                sizes="(max-width: 375px) 100px, (max-width: 768px) 130px, 200px"
              />
            </div>
            <h1>
              <span className="text text-yellow">Excavation</span> & Dump Truck
              Services in Brantford & Southern Ontario
            </h1>

            <h2 className="hero-desktop">
              Foundation excavation, dump truck hauling, and site work for
              residential and commercial projects across Brantford, Hamilton,
              and surrounding areas.
            </h2>

            <div className="hero__button-container">
              <Link href={'/contact'} id="cta-link">
                Get a Free On-Site Quote
              </Link>
              <Link id="cta-btn" href={'/services'}>
                View Services
              </Link>
              <Link className="hero-phone__mobile" href="tel:5197528500">
                <Phone size={30} />
                <h3>519-752-8500</h3>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <HomeAbout />
      <HomeServices />
      <Reviews reviews={reviews} />
      <CallToAction />
      <ServiceArea
        heading="Excavation Services Across Brant County & Southern Ontario"
        subtext="Proudly serving Brantford, Paris, Hamilton, Cambridge, and nearby communities with over 40 years of local excavation experience."
        locations={[
          { label: 'Brantford', href: '/service-areas/brantford' },
          { label: 'Paris', href: '/service-areas/paris' },
          { label: 'Hamilton', href: '/service-areas/hamilton' },
          { label: 'Cambridge', href: '/service-areas/cambridge' },
          'St. George',
          'Burford',
        ]}
        actions={[
          { label: 'View All Service Areas', href: '/service-areas' },
          {
            label: 'For Builders & Contractors',
            href: '/contractors',
            variant: 'secondary',
          },
        ]}
        variant="homepage"
      />
    </Fragment>
  );
};

export default HomePage;
'@

Write-File 'frontend/src/app/components/webpage/HomeAbout.tsx' @'
import classes from './HomeAbout.module.scss';
import React from 'react';
import {
  UsersThree,
  ShieldCheck,
  Clock,
  MapPin,
} from '@phosphor-icons/react';
import Link from 'next/link';

export default function HomeAbout() {
  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <h2>About Our Excavation & Hauling Services in Brantford</h2>
        <div className={classes.about}>
          <span className={classes.italic}>
            <i>Experienced. Reliable. Built for Your Project.</i>
          </span>
          <p>
            At Bellhouse Excavating, we provide reliable excavation, foundation
            digging, and material hauling services for residential and
            commercial projects across Brantford and surrounding areas. Our team
            is known for precision, dependable scheduling, and doing the job
            right the first time.
          </p>
        </div>
        <div className={classes.why}>
          <h3>Why Clients Trust Bellhouse Excavating</h3>
          <div className={classes.whyContainer}>
            <div>
              <span>
                <UsersThree size={40} color={'#ffc302'} weight="fill" />
              </span>
              <span>
                <b>Experienced Team</b> - Our skilled operators bring years of
                hands-on experience, ensuring precision and efficiency on every
                job.
              </span>
            </div>
            <div>
              <span>
                <Clock size={40} color={'#ffc302'} weight="fill" />
              </span>
              <span>
                <b>Timely Project Completion</b> - We understand deadlines
                matter. Our team works efficiently to keep your project on
                schedule without sacrificing quality.
              </span>
            </div>
            <div>
              <span>
                <ShieldCheck size={40} color={'#ffc302'} weight="fill" />
              </span>
              <span>
                <b>Licensed & Insured</b> - Fully certified and insured for peace
                of mind, ensuring compliance with industry standards and job
                site safety regulations.
              </span>
            </div>
            <div>
              <span>
                <MapPin size={40} color={'#ffc302'} weight="fill" />
              </span>
              <span>
                <b>Serving Brantford & Beyond</b> - Covering Southern Ontario,
                including Hamilton, Cambridge, and Kitchener-Waterloo.
              </span>
            </div>
          </div>
        </div>
        <div className={classes.cta}>
          <h4>Ready to start your excavation project?</h4>
          <div className={classes.btnContainer}>
            <Link className={classes.btn} href={'/contact'}>
              Request a Quote
            </Link>
            <Link className={classes.btn} href={'/contractors'}>
              Contractor Project Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
'@

Write-File 'frontend/src/app/components/webpage/HomeServices.tsx' @'
import React from 'react';
import Link from 'next/link';
import classes from './HomeServices.module.scss';
import ServiceCard from './ServiceCard';

import serviceData from '../../../data/services.json';

export default function HomeServices() {
  return (
    <section className={classes.container}>
      <h2>Reliable Excavation and Trucking Services</h2>
      <p className={classes.intro}>
        Serving residential and commercial clients across Brantford and Southern
        Ontario.
      </p>
      <ul className={classes.grid}>
        {serviceData.map((service) => (
          <ServiceCard
            key={service.id}
            image={service.card.image}
            alt={service.card.alt}
            description={service.card.description}
            link={services/}
            title={service.card.title}
          />
        ))}
      </ul>
      <div className={classes.cta}>
        <h3>Need excavation, hauling, or site support?</h3>
        <h4>519-752-8500</h4>
        <div className={classes.actions}>
          <Link className={classes.primaryAction} href="/services">
            View All Services
          </Link>
          <Link className={classes.secondaryAction} href="/service-areas">
            View Service Areas
          </Link>
          <Link className={classes.secondaryAction} href="/contractors">
            For Builders & Contractors
          </Link>
        </div>
      </div>
    </section>
  );
}
'@

Write-File 'frontend/src/app/components/webpage/HomeServices.module.scss' @'
@use '../../../styles/abstracts/variables' as v;
@use '../../../styles/abstracts/mixins' as m;

.container {
  @include m.flexCenter(column);

  padding: 4rem 1.5rem 3rem;
  background-color: v.-primary-dark;

  @include m.mediaDesktop {
    padding: 6rem 2rem 4rem;
  }

  & h2 {
    font-size: 4.5rem;

    @include m.mediaDesktop {
      font-size: 5rem;
    }

    margin-bottom: 3rem;
    text-align: center;
  }

  & p {
    max-width: 80rem;
    margin: 0 auto 3rem;
    font-size: 1.8rem;
    line-height: 1.5;
    font-weight: 400;
    color: v.-color-4;
    text-align: center;
    @include m.mediaDesktop {
      .container > p {
        font-size: 2rem;
      }
    }
  }
}

.grid {
  @include m.flexCenter(column);
  width: 95%;
  justify-items: center;
  align-items: flex-start;
  gap: 3rem;
  display: grid;

  @include m.mediaDesktop {
    grid-template-columns: 1fr 1fr 1fr;
    max-width: 120rem;
  }
}

.cta {
  @include m.flexCenter(column);
  margin: 3rem 0 3rem 0;
  width: 100%;
  text-align: center;

  & h3 {
    font-size: 2.5rem;
  }

  & h4 {
    font-size: 3rem;
  }

  @include m.mediaDesktop {
    & h3 {
      font-size: 3.5rem;
    }

    & h4 {
      font-size: 5rem;
    }
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.6rem;
  margin-top: 2rem;
}

.primaryAction {
  @include m.btnMain;
}

.secondaryAction {
  @include m.btnSec;
}
'@

Write-File 'frontend/src/app/services/[slug]/page.tsx' @'
import { notFound } from 'next/navigation';
import ServiceLayout from './_components/ServiceLayout';
import { validateMetadata } from '../../../lib/utils/seoValidation';
import { getServiceBySlug } from '@/data/services/index';
import { getAllServices } from '@/data/services/index';
import {
  getContractorCta,
  getLinkedServiceAreas,
  getRelatedServiceLinks,
} from '@/lib/servicePageLinks';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found | Bellhouse Excavating',
      description: 'Requested service does not exist.',
    };
  }

  const validated = validateMetadata(
    service.meta.title,
    service.meta.description,
  );

  return {
    title: validated.title,
    description: validated.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return notFound();

  const allServices = getAllServices();

  return (
    <ServiceLayout
      service={service}
      linkedServiceAreas={getLinkedServiceAreas(service)}
      relatedServices={getRelatedServiceLinks(service, allServices)}
      contractorCta={getContractorCta(service)}
    />
  );
}

export function generateStaticParams() {
  return getAllServices().map((service) => ({
    slug: service.slug,
  }));
}
'@

Write-File 'frontend/src/app/services/[slug]/_components/ServiceLayout.tsx' @'
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../../../../public/assets/BellhouseLogo-text.png';
import { ServicePage } from '@/types/interfaces';
import FAQAccordion from '@/app/components/FAQAccordion';
import { Star } from '@phosphor-icons/react/dist/ssr';
import classes from './ServiceLayout.module.scss';
import { CheckCircle, Gear } from '@phosphor-icons/react';
import Reviews from '@/app/components/webpage/Reviews';
import reviews from '@/data/reviews.json';
import type {
  ContractorCtaContent,
  RelatedServiceLinkItem,
  ServiceAreaLinkItem,
} from '@/lib/servicePageLinks';

interface ServiceLayoutProps {
  service: ServicePage;
  linkedServiceAreas: ServiceAreaLinkItem[];
  relatedServices: RelatedServiceLinkItem[];
  contractorCta: ContractorCtaContent | null;
}

export default function ServiceLayout({
  service,
  linkedServiceAreas,
  relatedServices,
  contractorCta,
}: ServiceLayoutProps) {
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
          <p className={classes.subtext}>{service.includes.subheading}</p>

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
            <p>{service.equipment.subheading}</p>
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
            {service.process.steps.map((step) => (
              <div key={step.title} className={classes.processItem}>
                <div className={classes.stepNumber}></div>
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
        <section className={${classes.section}  }>
          <p className={classes.eyebrow}>Service areas</p>
          <h2>{service.serviceArea.heading}</h2>
          <p className={classes.subtext}>{service.serviceArea.content}</p>

          <div className={classes.locationGrid}>
            {linkedServiceAreas.map((location) =>
              location.href ? (
                <Link
                  className={classes.locationLinkCard}
                  href={location.href}
                  key={${location.label}-}
                >
                  See {location.label} service area
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
                <span className={classes.relatedServiceAction}>View Service</span>
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
'@

Write-File 'frontend/src/app/services/[slug]/_components/ServiceLayout.module.scss' @'
@use '../../../../styles/abstracts/variables' as v;
@use '../../../../styles/abstracts/mixins' as m;

.container {
  @include m.flexCenter(column);

  @include m.mediaDesktop {
    flex-direction: row;
    min-height: calc(100vh - 20rem);
    gap: 4rem;
  }
}

.image {
  width: 100%;
  height: auto;
  max-width: 100%;
  object-fit: contain;
  display: block;
  padding: 2rem;

  @include m.mediaDesktop {
    width: 650px;
    height: auto;
    margin-top: -10rem;
    margin-right: 2rem;
  }
}

.hero {
  @include m.flexCenter(column);
  text-align: center;
  padding: 2rem;

  @include m.mediaDesktop {
    gap: 2rem;
    margin-right: -4rem;
  }

  h1 {
    margin-top: 6rem;
    font-size: 6rem;
    line-height: 1.05;

    @include m.mediaDesktop {
      margin-top: -15rem;
      font-size: 8rem;
    }
  }

  h3 {
    margin-top: 2rem;

    @include m.mediaDesktop {
      margin-top: 0;
    }
  }
}

.btn {
  @include m.btnMain;
  margin-top: 2rem;
}

.btnSecondary {
  @include m.btnSec;
}

.introContainer {
  @include m.flexCenter(column);
  background-color: v.-primary-light;
  color: v.-color-dark;
  padding: 8rem 1rem;

  h2 {
    font-size: 4rem;
    margin: 0 0 4rem;
    max-width: 120rem;
    text-align: center;
    line-height: 1.1;

    @include m.mediaDesktop {
      font-size: 6rem;
    }
  }
}

.introContent {
  @include m.flexCenter(column);
  max-width: 90rem;

  p {
    font-size: 1.8rem;
    margin-bottom: 4rem;
  }

  li {
    @include m.flexCenter();
    justify-content: flex-start;
    font-size: 1.8rem;
    gap: 1rem;
    margin-bottom: 1rem;
  }
}

.section {
  @include m.flexCenter(column);
  margin-inline: auto;
  width: 100%;
  max-width: 110rem;
  padding: 6rem 2rem;

  h2 {
    font-size: 3.6rem;
    text-align: center;
    margin-bottom: 1rem;
    @include m.mediaDesktop {
      font-size: 6rem;
    }
  }
}

.featureGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  max-width: 110rem;
  margin: 1rem auto;

  @include m.mediaDesktop {
    grid-template-columns: repeat(2, 1fr);
    margin: 4rem auto;
    gap: 3rem;
  }
}

.featureCard {
  background: rgba(v.-dark, 0.3);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  border: 1px solid rgba(v.-accent, 0.9);
  border-radius: 1.2rem;
  min-height: 15rem;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;

  p {
    font-size: 1.8rem;
    line-height: 1.45;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
}

.featureHeading {
  @include m.flexCenter();
  gap: 1rem;

  & h3 {
    font-size: 2.25rem;
  }
}

.subtext {
  font-size: 1.9rem;
  max-width: 90rem;
  text-align: center;
  margin: 0 auto 3rem auto;
  color: v.-color-light;
  line-height: 1.45;
}

.icon {
  color: rgba(v.-accent, 0.9);
  flex-shrink: 0;
}

.equipmentSection {
  background: v.-warm;
  width: 100%;
  padding: 1rem;
  padding-bottom: 8rem;
  color: v.-color-lighter;

  @include m.mediaDesktop {
    margin: 1rem auto;
    padding: 8rem 8rem 12rem 8rem;
  }
}

.heading {
  text-align: center;
  font-size: 1.7rem;
  padding-top: 4rem;

  @include m.mediaDesktop {
    padding-top: 1rem;
    margin-bottom: 8rem;
  }

  & h2 {
    font-size: 4rem;

    @include m.mediaDesktop {
      font-size: 6rem;
      line-height: 1.1;
      margin-bottom: 1rem;
    }
  }
}

.equipmentGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 120rem;
  margin: 4rem auto 0;

  @include m.mediaDesktop {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

.equipmentItem {
  @include m.flexCenter(column);
  text-align: center;
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid v.-accent;

  @include m.mediaDesktop {
    flex-direction: row;
    text-align: left;
    align-items: flex-start;
  }
}

.equipmentIcon {
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 2rem;
  background: rgba(v.-primary, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;

  img,
  svg {
    width: 150px;
    height: 150px;
    color: v.-primary;
    border-radius: 2rem;
  }
}

.eqText {
  flex: 1;

  h3 {
    font-size: 3rem;
    margin-bottom: 0.4rem;
  }

  p {
    font-size: 1.7rem;
    line-height: 1.45;
    color: v.-color-light;
  }
}

.processSection {
  width: 100%;
  padding: 6rem 2rem;
  background: #262626;

  & h2 {
    font-size: 4rem;
    line-height: 1.1;
    text-align: center;
    margin-bottom: 1rem;

    @include m.mediaDesktop {
      font-size: 6rem;
    }
  }
}

.processList {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 80rem;
  margin: 4rem auto 0;

  & p {
    color: v.-color-light;
  }

  @include m.mediaDesktop {
    margin-top: 6rem;
  }
}

.processItem {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding-bottom: 2rem;
  border-left: 4px solid v.-accent;
  padding-left: 2rem;
}

.stepNumber {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background: v.-accent;
  flex-shrink: 0;
  margin-top: 0.3rem;
}

.backgroundMid {
  background-color: #2a2a2a;
  max-width: 100%;
}

.eyebrow {
  display: inline-flex;
  width: fit-content;
  margin: 0 auto 1.6rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background-color: rgba(255, 255, 255, 0.05);
  color: v.-accent;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.serviceAreaSection {
  padding-bottom: 8rem;
}

.locationGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.6rem;
  width: 100%;
  max-width: 96rem;
  margin: 0 auto;

  @include m.mediaDesktop {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.locationLinkCard,
.locationItemCard {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 7.2rem;
  padding: 1.8rem 2rem;
  border-radius: 1.2rem;
  font-size: 1.7rem;
  font-weight: 600;
  text-align: center;
}

.locationLinkCard {
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(v.-accent, 0.4);
  color: #fff;
  text-decoration: none;
  transition:
    transform 0.15s ease,
    border-color 0.15s ease,
    background-color 0.15s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-3px);
    background-color: rgba(v.-accent, 0.12);
    border-color: rgba(v.-accent, 0.75);
  }
}

.locationItemCard {
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.contractorCtaSection {
  padding: 7rem 2rem;
  background-color: v.-primary-light;
  color: v.-color-dark;
}

.contractorCtaShell {
  max-width: 96rem;
  margin: 0 auto;
  padding: 3rem;
  border-radius: 1.8rem;
  background: rgba(v.-dark, 0.9);
  box-shadow: 0 1.8rem 3.2rem -2.6rem rgba(0, 0, 0, 0.6);
  text-align: center;

  h2 {
    font-size: 3.8rem;
    line-height: 1.08;
    color: #fff;

    @include m.mediaDesktop {
      font-size: 5rem;
    }
  }

  p:last-of-type {
    margin: 2rem auto 0;
    max-width: 72rem;
    font-size: 1.8rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.84);
  }
}

.contractorActions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.6rem;
  margin-top: 3rem;
}

.relatedServicesSection {
  width: 100%;
  max-width: 118rem;
  margin: 0 auto;
  padding: 7rem 2rem 6rem;

  h2 {
    font-size: 4rem;
    text-align: center;
    margin-bottom: 1rem;

    @include m.mediaDesktop {
      font-size: 5.6rem;
    }
  }
}

.relatedServicesGrid {
  display: grid;
  gap: 2rem;
  margin-top: 3rem;

  @include m.mediaDesktop {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.relatedServiceCard {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  min-height: 22rem;
  padding: 2.4rem;
  border-radius: 1.4rem;
  background-color: rgba(v.-primary-light, 0.42);
  border: 1px solid rgba(v.-accent, 0.3);
  color: v.-color-dark;
  text-decoration: none;
  box-shadow: 0 1.2rem 2.6rem -2.6rem rgba(0, 0, 0, 0.45);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-4px);
    border-color: rgba(v.-accent, 0.65);
    box-shadow: 0 1.8rem 3rem -2.2rem rgba(0, 0, 0, 0.45);
  }

  h3 {
    font-size: 2.5rem;
    line-height: 1.15;
  }

  p {
    font-size: 1.7rem;
    line-height: 1.55;
  }
}

.relatedServiceAction {
  margin-top: auto;
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 0.6rem;
  padding-bottom: 0.2rem;
  border-bottom: 2px solid v.-accent;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  &::after {
    content: '>';
    font-size: 1.6rem;
  }
}

.cta {
  @include m.flexCenter(column);
  text-align: center;
  padding: 8rem 2rem;
  background-color: v.-primary-light;
  color: v.-color-dark;

  h2 {
    font-size: 4rem;

    @include m.mediaDesktop {
      font-size: 5rem;
    }
  }

  p {
    font-size: 1.8rem;
    margin: 2rem 0 3rem;
  }
}
'@

Write-File 'frontend/src/app/service-areas/[slug]/_components/ServiceAreaLayout.tsx' @'
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
const businessId = ${baseUrl}/#business;

function mergeUniqueItems(...groups: Array<string[] | undefined>) {
  return groups.flatMap((group) => group ?? []).filter((item, index, items) => {
    return items.indexOf(item) === index;
  });
}

export default function ServiceAreaLayout({
  page,
}: ServiceAreaLayoutProps) {
  const pageUrl = ${baseUrl}/service-areas/;
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

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': businessId,
    name: 'Bellhouse Excavating',
    url: baseUrl,
    logo: ${baseUrl}/assets/bellhouse-excavating-logo.jpg,
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
    '@id': ${pageUrl}#service,
    name: ${page.city} excavation and site work services,
    description: page.heroDescription,
    url: pageUrl,
    provider: {
      '@id': businessId,
    },
    areaServed: {
      '@type': 'City',
      name: ${page.city}, ,
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
    '@id': ${pageUrl}#faq,
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
        id={service-area-business-}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <Script
        id={service-area-service-}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAreaSchema) }}
      />
      <Script
        id={service-area-faq-}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServiceAreaHero
        eyebrow={${page.city}, }
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
          What your  site usually needs before the next crew can move in
        }
        intro={page.intro}
        image={page.introImage ?? defaultIntroImage}
      />
      <ServiceAreaServices
        heading={
          page.sectionHeadings?.services ??
          Excavation, grading, hauling, and float services available in 
        }
        items={page.services}
        city={page.city}
      />
      <ServiceAreaWhyChoose
        heading={
          page.sectionHeadings?.whyChoose ??
          Why contractors in  bring Bellhouse onto the job
        }
        intro={page.whyChooseIntro}
        items={page.whyChoose}
      />
      <ServiceAreaWhoWeWorkWith
        heading={
          page.sectionHeadings?.whoWeWorkWith ??
          Jobs in  where Bellhouse is usually the right crew
        }
        intro={page.rightFitIntro ?? page.whoWeWorkWithIntro}
        items={whoItsForItems}
      />
      <ServiceAreaFaq
        heading={
          page.sectionHeadings?.faq ??
          Questions about  excavation, grading, hauling, and site prep
        }
        items={page.faqs}
      />
      {page.nearbyAreas.length ? (
        <ServiceAreaNearbyAreas
          heading={
            page.sectionHeadings?.nearbyAreas ??
            Nearby service areas connected to  work
          }
          items={page.nearbyAreas}
          city={page.city}
          map={page.map}
        />
      ) : null}
      <ServiceAreaCta
        title={
          page.bottomCta?.title ??
          Request a quote for  excavation and site work
        }
        description={
          page.bottomCta?.description ??
          Call, text, or request a quote if you need a clear answer on fit, timing, and what the job needs first.
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
'@
