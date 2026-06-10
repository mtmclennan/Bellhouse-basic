import React from 'react';
import Link from '@/components/SiteLink';
import classes from './HomeServices.module.scss';
import ServiceCard from './ServiceCard';

import { getAllServiceCards } from '@/data/services/index';

export default function HomeServices() {
  const services = getAllServiceCards();

  return (
    <section className={classes.container}>
      <h2>Reliable Excavation and Trucking Services</h2>
      <p className={classes.intro}>
        Serving residential and commercial clients across Brantford and
        Southern Ontario.
      </p>
      <ul className={classes.grid}>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            image={service.image}
            alt={service.alt}
            description={service.description}
            link={service.href}
            title={service.title}
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
