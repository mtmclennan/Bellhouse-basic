'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../../../../public/assets/BellhouseLogo-text.png';
import { ServicePage } from '@/types/interfaces';

import LayoutHome from '@/app/components/layoutsWeb/layoutHome';
import CallToAction from '@/app/components/webpage/CallToAction';
import WhyChooseUs from '@/app/components/webpage/WhyChooseUs';
import ServicesGrid from '@/app/components/webpage/services/ServicesGrid';
import FAQAccordion from '@/app/components/webpage/FAQAccordion';
import { Star } from '@phosphor-icons/react/dist/ssr';
import classes from './ServiceLayout.module.scss';
import { CheckCircle, Gear } from '@phosphor-icons/react';
import { title } from 'process';
import Reviews from '@/app/components/webpage/Reviews';
import reviews from '@/data/reviews.json';

interface ServiceLayoutProps {
  service: ServicePage;
}

export default function ServiceLayout({ service }: ServiceLayoutProps) {
  console.log(service);
  return (
    <LayoutHome background="off">
      {/* HERO */}
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

      {/* INTRO */}
      <section className={classes.introContainer}>
        <h2>{service.intro.heading}</h2>

        <div className={classes.introContent}>
          <p>{service.intro.content}</p>

          <ul>
            {service.intro.keypoints.map((point) => (
              <li key={crypto.randomUUID()}>
                <Star size={24} color="#ffc302" weight="fill" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      {service.includes && (
        <section className={classes.section}>
          <h2>{service.includes.heading}</h2>
          <p className={classes.subtext}>{service.includes.subheading}</p>

          <div className={classes.featureGrid}>
            {service.includes.items.map((item) => (
              <div key={crypto.randomUUID()} className={classes.featureCard}>
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
      )}

      {/* EQUIPMENT */}
      {service.equipment && (
        <section className={classes.equipmentSection}>
          <div className={classes.heading}>
            <h2>{service.equipment.heading}</h2>
            <p>{service.equipment.subheading}</p>
          </div>

          <div className={classes.equipmentGrid}>
            {service.equipment.items.map((item) => (
              <div key={crypto.randomUUID()} className={classes.equipmentItem}>
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
      )}

      {/* PROCESS */}
      {service.process && (
        <section className={classes.processSection}>
          <h2>{service.process.heading}</h2>
          {service.process.subheading && (
            <p className={classes.subtext}>{service.process.subheading}</p>
          )}

          <div className={classes.processList}>
            {service.process.steps.map((step) => (
              <div key={crypto.randomUUID()} className={classes.processItem}>
                <div className={classes.stepNumber}></div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SERVICE AREA */}

      {service.serviceArea && (
        <section className={`${classes.section} ${classes.backgroundMid}`}>
          <h2>{service.serviceArea.heading}</h2>

          <p className={classes.subtext}>{service.serviceArea.content}</p>

          <ul className={classes.locationList}>
            {service.serviceArea.locations.map((loc) => (
              <li key={crypto.randomUUID()}>{loc}</li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQ */}
      {service.faq && (
        <FAQAccordion
          heading={service.faq.heading}
          subheading="Clear, helpful answers for builders and homeowners."
          items={service.faq.items}
        />
      )}
      <Reviews reviews={reviews} />
      {/* CTA */}
      {service.cta && (
        <section className={classes.cta}>
          <h2>{service.cta.heading}</h2>
          <p>{service.cta.subheading}</p>

          <Link href="/contact" className={classes.btn}>
            {service.cta.button}
          </Link>
        </section>
      )}

      <ServicesGrid />
    </LayoutHome>
  );
}
