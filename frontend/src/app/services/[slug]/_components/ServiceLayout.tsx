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
import classes from './ServiceLayout.module.scss';

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
