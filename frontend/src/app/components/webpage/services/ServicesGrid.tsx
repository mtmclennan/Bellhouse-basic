import React from 'react';
import Link from 'next/link';
import ServiceCard from '../ServiceCard';
import serviceData from '../../../../data/services.json';

type GridAction = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
};

export default function ServicesGrid({
  dark,
  heading = 'How We Help You Build',
  intro,
  actions = [],
}: {
  dark?: boolean;
  heading?: React.ReactNode;
  intro?: React.ReactNode;
  actions?: GridAction[];
}) {
  return (
    <section className={`services__services ${dark ? 'background-dark' : ''}`}>
      <h2>{heading}</h2>
      {intro ? <div className="services__introCopy">{intro}</div> : null}
      {actions.length > 0 ? (
        <div className="services__actions">
          {actions.map((action) => (
            <Link
              key={`${action.href}-${action.label}`}
              href={action.href}
              className={
                action.variant === 'secondary'
                  ? 'services__action services__action--secondary'
                  : 'services__action services__action--primary'
              }
            >
              {action.label}
            </Link>
          ))}
        </div>
      ) : null}
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