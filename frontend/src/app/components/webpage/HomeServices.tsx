import React from 'react';
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
            link={`services/${service.slug}`}
            title={service.card.title}
          />
        ))}
      </ul>
      <div className={classes.cta}>
        <h3>Call Us Now</h3>
        <h4>519-752-8500</h4>
      </div>
    </section>
  );
}
