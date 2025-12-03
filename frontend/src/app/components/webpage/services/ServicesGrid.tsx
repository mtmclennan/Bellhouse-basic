import React from 'react';
import ServiceCard from '../ServiceCard';
import serviceData from '../../../../data/services.json';

export default function ServicesGrid({ dark }: { dark?: boolean }) {
  return (
    <section className={`services__services ${dark ? 'background-dark' : ''}`}>
      <h2>How We Help You Build</h2>
      <ul className="services__grid">
        {serviceData.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.card.title}
            description={service.card.description}
            image={service.card.image}
            alt={service.card.alt}
            link={`/services/${service.slug}`}
            large={true}
          />
        ))}
      </ul>
    </section>
  );
}
