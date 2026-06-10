'use client';

import Link from '@/components/SiteLink';
import { useEffect, useRef, useState } from 'react';
import type { ResourcesSectionData } from '@/types/sections';
import ResourceCardList from '@/features/calculators/components/ResourceCardList';
import classes from './ResourcesSection.module.scss';

type ResourcesSectionProps = {
  data: ResourcesSectionData;
};

export default function ResourcesSection({ data }: ResourcesSectionProps) {
  const {
    eyebrow,
    heading,
    subtext,
    items,
    footerText,
    footerActions = [],
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
      { threshold: 0.16 },
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
    compact: classes.densityCompact,
    default: '',
    relaxed: classes.densityRelaxed,
  };

  const introClassName = [
    classes.intro,
    headingAlign === 'left' ? classes.introLeft : classes.introCenter,
    isVisible ? classes.introVisible : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      ref={sectionRef}
      className={`${classes.section} ${variantClassMap[backgroundVariant]} ${
        toneClassMap[backgroundTone]
      } ${densityClassMap[density]}`}
    >
      <div className={classes.inner}>
        <div className={introClassName}>
          {eyebrow ? <p className={classes.eyebrow}>{eyebrow}</p> : null}
          <h2>{heading}</h2>
          {subtext ? <p className={classes.copy}>{subtext}</p> : null}
        </div>

        <ResourceCardList
          items={items}
          isVisible={isVisible}
          tone={backgroundTone}
        />

        {(footerText || footerActions.length > 0) && (
          <div
            className={`${classes.footer} ${
              isVisible ? classes.footerVisible : ''
            }`}
          >
            {footerText ? (
              <p className={classes.footerCopy}>{footerText}</p>
            ) : null}

            {footerActions.length > 0 ? (
              <div className={classes.footerActions}>
                {footerActions.map((action) => (
                  <Link
                    key={`${action.href}-${action.label}`}
                    className={
                      action.variant === 'secondary'
                        ? classes.secondaryAction
                        : classes.primaryAction
                    }
                    href={action.href}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
