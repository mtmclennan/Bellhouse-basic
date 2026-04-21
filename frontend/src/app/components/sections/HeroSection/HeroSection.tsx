'use client';

import Link from 'next/link';
import { Phone, Star } from '@phosphor-icons/react';
import classes from './HeroSection.module.scss';
import type { HeroSectionData } from '@/types/sections';

type Props = {
  data: HeroSectionData;
};

function formatRating(rating: number) {
  return rating.toFixed(1);
}

export default function HeroSection({ data }: Props) {
  const {
    eyebrow,
    headline,
    subheadline,
    primaryAction,
    secondaryAction,
    phone,
    review,
    proofItems = [],
    align = 'center',
    theme = 'dark',
    overlay = 'transparent',
  } = data;

  const sectionClassName = [
    classes.section,
    classes[`theme--${theme}`],
    classes[`align--${align}`],
  ].join(' ');

  const overlayClassMap = {
    dark: classes.overlayDark,
    light: classes.overlayLight,
    transparent: classes.overlayTransparent,
    none: classes.overlayNone,
  };

  console.log(overlay);
  return (
    <section className={sectionClassName}>
      <div
        className={[classes.overlay, overlayClassMap[overlay] ?? ''].join(' ')}
        aria-hidden="true"
      />

      <div className={classes.container}>
        <div className={classes.content}>
          {eyebrow && <p className={classes.eyebrow}>{eyebrow}</p>}

          <h1 className={classes.heading}>{headline}</h1>

          {subheadline && <p className={classes.subheadline}>{subheadline}</p>}

          {(primaryAction || secondaryAction) && (
            <div className={classes.actions}>
              {primaryAction && (
                <Link href={primaryAction.href} className={classes.primaryBtn}>
                  {primaryAction.label}
                </Link>
              )}

              {secondaryAction && (
                <Link
                  href={secondaryAction.href}
                  className={classes.secondaryBtn}
                >
                  {secondaryAction.label}
                </Link>
              )}
            </div>
          )}

          {(phone || review) && (
            <div className={classes.supportRow}>
              {phone && (
                <Link href={phone.href} className={classes.phoneLink}>
                  <Phone size={20} weight="fill" />
                  <span>{phone.label}</span>
                </Link>
              )}

              {review && (
                <Link
                  href={review.href}
                  className={classes.reviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={classes.stars} aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={16} weight="fill" />
                    ))}
                  </span>
                  <span className={classes.reviewText}>
                    {formatRating(review.rating)} on Google (
                    {review.reviewCount}{' '}
                    {review.reviewCount === 1 ? 'review' : 'reviews'})
                  </span>
                  <span className={classes.reviewCta}>Read Reviews</span>
                </Link>
              )}
            </div>
          )}

          {!!proofItems.length && (
            <ul className={classes.proofList}>
              {proofItems.map((item) => (
                <li key={item.label} className={classes.proofItem}>
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
