'use client';

import React from 'react';
import styles from './ServiceArea.module.scss';

interface ServiceAreaProps {
  heading: string;
  subtext?: string;
  locations: string[];
  variant?: 'default' | 'homepage'; // styling variants if needed
}

export default function ServiceArea({
  heading,
  subtext,
  locations,
  variant = 'default',
}: ServiceAreaProps) {
  return (
    <section
      className={`${styles.section} ${
        variant === 'homepage' ? styles.homepage : styles.default
      }`}
    >
      <h2 className={styles.heading}>{heading}</h2>

      {subtext && <p className={styles.subtext}>{subtext}</p>}

      <ul className={styles.locationList}>
        {locations.map((loc) => (
          <li key={loc}>{loc}</li>
        ))}
      </ul>
    </section>
  );
}
