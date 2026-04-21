'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import classes from './ServicesSection.module.scss';
import type { ServicesSectionData } from '@/types/sections';
import ServiceCard from '@/app/components/webpage/ServiceCard';

type ServicesSectionProps = {
  data: ServicesSectionData;
};

export default function ServicesSection({ data }: ServicesSectionProps) {
  const {
    eyebrow,
    heading,
    intro,
    items,
    actions = [],
    backgroundVariant = 'dark',
    backgroundTone = 'default',
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
      {
        threshold: 0.15,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const variantClassMap = {
    light: classes.variantLight,
    dark: classes.variantDark,
    transparent: classes.variantTransparent,
  };

  const toneClassMap = {
    default: classes.toneDefault,
    soft: classes.toneSoft,
    muted: classes.toneMuted,
  };

  const sectionClassName = [
    classes.section,
    variantClassMap[backgroundVariant],
    toneClassMap[backgroundTone],
  ].join(' ');

  return (
    <section ref={sectionRef} className={sectionClassName}>
      <div className={classes.container}>
        {eyebrow && <p className={classes.eyebrow}>{eyebrow}</p>}

        <h2>{heading}</h2>

        {intro && <p className={classes.intro}>{intro}</p>}

        <ul className={`${classes.grid} ${isVisible ? classes.isVisible : ''}`}>
          {items.map((item) => (
            <ServiceCard
              key={item.id}
              image={item.image}
              alt={item.alt}
              description={item.description}
              link={item.href}
              title={item.title}
            />
          ))}
        </ul>

        {!!actions.length && (
          <div className={classes.footer}>
            <div className={classes.actions}>
              {actions.map((action) => (
                <Link
                  key={action.href + action.label}
                  href={action.href}
                  className={
                    action.variant === 'secondary'
                      ? classes.secondaryAction
                      : classes.primaryAction
                  }
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
