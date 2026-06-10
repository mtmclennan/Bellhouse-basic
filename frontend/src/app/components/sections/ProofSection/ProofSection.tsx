'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from '@/components/SiteLink';
import {
  Buildings,
  Truck,
  ShieldCheck,
  MapPin,
  Clock,
  UsersThree,
} from '@phosphor-icons/react';

import classes from './ProofSection.module.scss';
import type { ProofIcon, ProofSectionData } from '@/types/sections';

type ProofSectionProps = {
  data: ProofSectionData;
};

function renderIcon(icon?: ProofIcon) {
  const commonProps = {
    size: 40,
    color: '#ffc302',
    weight: 'fill' as const,
  };

  switch (icon) {
    case 'buildings':
      return <Buildings {...commonProps} />;
    case 'truck':
      return <Truck {...commonProps} />;
    case 'shield':
      return <ShieldCheck {...commonProps} />;
    case 'mapPin':
      return <MapPin {...commonProps} />;
    case 'clock':
      return <Clock {...commonProps} />;
    case 'users':
      return <UsersThree {...commonProps} />;
    default:
      return null;
  }
}

export default function ProofSection({ data }: ProofSectionProps) {
  const {
    eyebrow,
    heading,
    intro = [],
    items,
    backgroundVariant = 'light',
    backgroundTone = 'default',
    footerLink,
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
    isVisible ? classes.isVisible : '',
  ].join(' ');

  return (
    <section
      ref={sectionRef}
      className={sectionClassName}
      aria-labelledby="proof-section-heading"
    >
      <div className={classes.container}>
        <div className={classes.headerBlock}>
          {eyebrow && <p className={classes.eyebrow}>{eyebrow}</p>}
          <h2 id="proof-section-heading">{heading}</h2>
        </div>

        {!!intro.length && (
          <div className={classes.intro}>
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}

        <div className={classes.grid}>
          {items.map((item) => (
            <article key={item.title} className={classes.card}>
              <span className={classes.icon}>{renderIcon(item.icon)}</span>

              <div className={classes.cardBody}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>

        {footerLink && (
          <div className={classes.footer}>
            <Link href={footerLink.href} className={classes.footerLink}>
              {footerLink.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
