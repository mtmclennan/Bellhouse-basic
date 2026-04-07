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
    <section className={`${styles.section} ${styles[variant]}`}>
      <h2 className={styles.heading}>{heading}</h2>

      {subtext ? <p className={styles.subtext}>{subtext}</p> : null}

      <ul className={styles.locationList}>
        {locations.map((location) => {
          const key =
            typeof location === 'string'
              ? location
              : `${location.href}-${location.label}`;

          return (
            <li key={key}>
              {typeof location === 'string' ? (
                <span className={styles.locationItem}>{location}</span>
              ) : (
                <Link className={styles.locationLink} href={location.href}>
                  {location.label}
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
              key={`${action.href}-${action.label}`}
            >
              {action.label}
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}
