'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './ServiceAreaSection.module.scss';
import type { ServiceAreasSectionData } from '@/types/sections';

type ServiceAreasSectionProps = {
  data: ServiceAreasSectionData;
};

export default function ServiceAreasSection({
  data,
}: ServiceAreasSectionProps) {
  const {
    eyebrow,
    heading,
    subtext,
    locations,
    locationLinkLabelPrefix,
    actions = [],
    backgroundVariant = 'dark',
    backgroundTone = 'default',
    density = 'default',
  } = data;

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const variantClassMap = {
    light: styles.variantLight,
    dark: styles.variantDark,
    transparent: styles.variantTransparent,
  };

  const toneClassMap = {
    default: styles.toneDefault,
    soft: styles.toneSoft,
    muted: styles.toneMuted,
  };

  const densityClassMap = {
    compact: styles.densityCompact,
    default: '',
    relaxed: styles.densityRelaxed,
  };

  const sectionClassName = [
    styles.section,
    variantClassMap[backgroundVariant],
    toneClassMap[backgroundTone],
    densityClassMap[density],
    isVisible ? styles.isVisible : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      ref={sectionRef}
      className={sectionClassName}
      aria-labelledby="service-areas-heading"
    >
      <div className={styles.container}>
        <div className={styles.headerBlock}>
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}

          <h2 id="service-areas-heading" className={styles.heading}>
            {heading}
          </h2>

          {subtext ? <p className={styles.subtext}>{subtext}</p> : null}
        </div>

        <ul className={styles.locationList}>
          {locations.map((location) => {
            const key = `${location.label}-${location.href ?? 'nolink'}`;

            return (
              <li key={key} className={styles.locationItemWrap}>
                {location.href ? (
                  <Link className={styles.locationLink} href={location.href}>
                    {locationLinkLabelPrefix
                      ? `${locationLinkLabelPrefix}${location.label}`
                      : location.label}
                  </Link>
                ) : (
                  <span className={styles.locationItem}>{location.label}</span>
                )}
              </li>
            );
          })}
        </ul>

        {actions.length > 0 ? (
          <div className={styles.actions}>
            {actions.map((action) => (
              <Link
                key={`${action.href}-${action.label}`}
                href={action.href}
                className={
                  action.variant === 'secondary'
                    ? styles.secondaryAction
                    : styles.primaryAction
                }
              >
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
