import React from 'react';
import Link from 'next/link';
import classes from './HomeServices.module.scss';
import ServiceCard from './ServiceCard';

import serviceData from '../../../data/services.json';

export default function HomeServices() {
  return (
    <section className={classes.container}>
      <h2>Browse the service scope after you know the path.</h2>
      <p className={classes.intro}>
        Bellhouse handles residential site work, rural access and grading, and
        contractor-led excavation support across Southern Ontario. Use the
        service pages when you already know the scope, then move into local
        pages, contractor support, or planning tools as needed.
      </p>
      <ul className={classes.grid}>
        {serviceData.map((service) => (
          <ServiceCard
            key={service.id}
            image={service.card.image}
            alt={service.card.alt}
            description={service.card.description}
            link={`/services/${service.slug}`}
            title={service.card.title}
          />
        ))}
      </ul>
      <div className={classes.cta}>
        <h3>Need a clearer next step before choosing a service?</h3>
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
          <Link
            className={classes.secondaryAction}
            href="/resources/calculators"
          >
            Use Planning Tools
          </Link>
        </div>
      </div>
    </section>
  );
}
