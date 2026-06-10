'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from '@/components/SiteLink';
import { Star, Quotes } from '@phosphor-icons/react';

import styles from './TestimonialsSection.module.scss';
import type { TestimonialsSectionData } from '@/types/sections';

type TestimonialsSectionProps = {
  data: TestimonialsSectionData;
};

export default function TestimonialsSection({
  data,
}: TestimonialsSectionProps) {
  const {
    eyebrow,
    heading,
    subtext,
    items,
    reviewSummary,
    footerLink,
    backgroundVariant = 'dark',
    backgroundTone = 'default',
    density = 'default',
    headingAlign = 'center',
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

  const headerClassName = [
    styles.headerBlock,
    headingAlign === 'left' ? styles.headerLeft : styles.headerCenter,
  ]
    .filter(Boolean)
    .join(' ');

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
      aria-labelledby="testimonials-section-heading"
    >
      <div className={styles.container}>
        <div className={headerClassName}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}

          <h2 id="testimonials-section-heading" className={styles.heading}>
            {heading}
          </h2>

          {subtext && <p className={styles.subtext}>{subtext}</p>}

          {reviewSummary && (
            <p className={styles.summary}>
              <span className={styles.summaryStars} aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} weight="fill" />
                ))}
              </span>
              <span>{reviewSummary}</span>
            </p>
          )}
        </div>

        <ul className={styles.grid}>
          {items.map((review, index) => (
            <li
              key={`${review.name}-${review.source}-${review.text.slice(0, 20)}`}
              className={`${styles.cardItem} ${
                items.length >= 3 && index === 0 ? styles.cardItemFeatured : ''
              }`}
            >
              <article className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.quoteIcon} aria-hidden="true">
                    <Quotes size={24} weight="fill" />
                  </span>

                  <div
                    className={styles.stars}
                    aria-label={`${review.rating} star review`}
                  >
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={18} weight="fill" />
                    ))}
                  </div>
                </div>

                <p className={styles.text}>{review.text}</p>

                <div className={styles.footer}>
                  <span className={styles.name}>{review.name}</span>
                  <span className={styles.source}>via {review.source}</span>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {footerLink && (
          <div className={styles.footerCta}>
            <Link href={footerLink.href} className={styles.footerLink}>
              {footerLink.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
