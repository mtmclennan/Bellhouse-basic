'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from '@/components/SiteLink';
import {
  Buildings,
  Hammer,
  House,
  Leaf,
  ArrowRight,
} from '@phosphor-icons/react';

import classes from './AudienceSection.module.scss';
import type { AudienceSectionData } from '@/types/sections';

type AudienceSectionProps = {
  data: AudienceSectionData;
};

function renderIcon(icon?: string) {
  const commonProps = {
    size: 34,
    color: '#ffc302',
    weight: 'fill' as const,
  };

  switch (icon) {
    case 'house':
      return <House {...commonProps} />;
    case 'hammer':
      return <Hammer {...commonProps} />;
    case 'leaf':
      return <Leaf {...commonProps} />;
    case 'buildings':
      return <Buildings {...commonProps} />;
    default:
      return null;
  }
}

export default function AudienceSection({ data }: AudienceSectionProps) {
  const {
    eyebrow,
    heading,
    intro,
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
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      ref={sectionRef}
      className={sectionClassName}
      aria-labelledby="audience-section-heading"
    >
      <div className={classes.container}>
        <div className={classes.headerBlock}>
          {eyebrow && <p className={classes.eyebrow}>{eyebrow}</p>}
          <h2 id="audience-section-heading">{heading}</h2>
        </div>

        {intro && <p className={classes.intro}>{intro}</p>}

        <ul className={classes.grid}>
          {items.map((item) => {
            const relatedTitles = item.relatedServiceTitles?.slice(0, 3) ?? [];

            return (
              <li key={item.title} className={classes.cardItem}>
                <Link
                  href={item.href}
                  className={classes.card}
                  aria-label={item.linkLabel || item.title}
                >
                  <div className={classes.cardTop}>
                    <span className={classes.icon}>
                      {renderIcon(item.icon)}
                    </span>
                    {item.tag && (
                      <span className={classes.tag}>{item.tag}</span>
                    )}
                  </div>

                  <div className={classes.cardBody}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>

                    {!!relatedTitles.length && (
                      <div className={classes.related}>
                        <span className={classes.relatedLabel}>
                          Common work:
                        </span>
                        <div className={classes.chips}>
                          {relatedTitles.map((title) => (
                            <span key={title} className={classes.chip}>
                              {title}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <span className={classes.cardCta}>
                    {item.linkLabel}
                    <ArrowRight size={16} weight="bold" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

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
