import React from 'react';
import ServiceCard from '../ServiceCard';
import serviceData from '../../../data/services.json';

export default function ServicesGrid() {
  return (
    <section className="services__services">
      <h2>How We Help You Build</h2>
      <div className="services__grid">
        {serviceData.map((service) => (
          <ServiceCard
            title={service.card.title}
            description={service.card.description}
            image={service.card.image}
            alt={service.card.alt}
            link={`/services/${service.slug}`}
            large={true}
          />
        ))}
      </div>
    </section>
  );
}
