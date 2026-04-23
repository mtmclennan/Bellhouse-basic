'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Phone } from '@phosphor-icons/react';
import type { FinalCtaSectionData } from '@/types/sections';
import classes from './FinalCtaSection.module.scss';

type FinalCtaSectionProps = {
  data: FinalCtaSectionData;
};

export default function FinalCtaSection({ data }: FinalCtaSectionProps) {
  const {
    eyebrow,
    heading,
    text,
    primaryAction,
    secondaryAction,
    phone,
    proofItems = [],
    note,
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
    light: classes.variantLight,
    dark: classes.variantDark,
    transparent: classes.variantTransparent,
  };

  const toneClassMap = {
    default: classes.toneDefault,
    soft: classes.toneSoft,
    muted: classes.toneMuted,
  };

  const densityClassMap = {
    default: '',
    compact: classes.densityCompact,
  };

  return (
    <section
      ref={sectionRef}
      className={[
        classes.section,
        variantClassMap[backgroundVariant],
        toneClassMap[backgroundTone],
        densityClassMap[density],
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={classes.inner}>
        <div
          className={`${classes.card} ${isVisible ? classes.cardVisible : ''}`}
        >
          <div className={classes.content}>
            {eyebrow ? <p className={classes.eyebrow}>{eyebrow}</p> : null}

            <h2>{heading}</h2>
            <p className={classes.text}>{text}</p>

            {proofItems.length > 0 ? (
              <div className={classes.proofList}>
                {proofItems.map((item) => (
                  <span key={item.label} className={classes.proofChip}>
                    {item.label}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className={classes.actionPanel}>
            <Link className={classes.primaryAction} href={primaryAction.href}>
              {primaryAction.label}
            </Link>

            {secondaryAction ? (
              <Link
                className={classes.secondaryAction}
                href={secondaryAction.href}
              >
                {secondaryAction.label}
              </Link>
            ) : null}

            {phone ? (
              <Link className={classes.phoneLink} href={phone.href}>
                <Phone size={18} weight="duotone" />
                <span>{phone.label}</span>
              </Link>
            ) : null}

            {note ? <p className={classes.note}>{note}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
