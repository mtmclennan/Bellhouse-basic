'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { AboutStorySectionData } from '@/types/sections';
import classes from './AboutStorySection.module.scss';

type AboutStorySectionProps = {
  data: AboutStorySectionData;
};

export default function AboutStorySection({ data }: AboutStorySectionProps) {
  const {
    eyebrow,
    heading,
    intro,
    image,
    imageBadges = [],
    historyHeading,
    history,
    primaryAction,
    secondaryAction,
    backgroundVariant = 'light',
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
      { threshold: 0.16 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  let variantClass = classes.variantDark;

  if (backgroundVariant === 'light') {
    variantClass = classes.variantLight;
  } else if (backgroundVariant === 'transparent') {
    variantClass = classes.variantTransparent;
  }

  let toneClass = '';

  switch (backgroundTone) {
    case 'soft':
      toneClass = classes.toneSoft;
      break;
    case 'muted':
      toneClass = classes.toneMuted;
      break;
    case 'default':
    default:
      toneClass = '';
      break;
  }

  return (
    <section
      ref={sectionRef}
      className={`${classes.section} ${variantClass} ${toneClass}`.trim()}
    >
      <div className={classes.inner}>
        <div
          className={`${classes.topGrid} ${
            isVisible ? classes.topGridVisible : ''
          }`}
        >
          <div className={classes.copyBlock}>
            {eyebrow ? <p className={classes.eyebrow}>{eyebrow}</p> : null}
            <h2>{heading}</h2>

            <div className={classes.copy}>
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {(primaryAction || secondaryAction) && (
              <div className={classes.actions}>
                {primaryAction ? (
                  <Link
                    className={classes.primaryAction}
                    href={primaryAction.href}
                  >
                    {primaryAction.label}
                  </Link>
                ) : null}

                {secondaryAction ? (
                  <Link
                    className={classes.secondaryAction}
                    href={secondaryAction.href}
                  >
                    {secondaryAction.label}
                  </Link>
                ) : null}
              </div>
            )}
          </div>

          <div className={classes.mediaBlock}>
            <div className={classes.imageFrame}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width ?? 600}
                height={image.height ?? 600}
                sizes="(max-width: 768px) 100vw, 600px"
                className={classes.featureImage}
              />
              <div className={classes.imageOverlay} />
              {imageBadges.length > 0 ? (
                <div className={classes.imageBadge}>
                  {imageBadges.map((badge) => (
                    <span key={badge}>{badge}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div
          className={`${classes.historyBlock} ${
            isVisible ? classes.historyBlockVisible : ''
          }`}
        >
          {historyHeading ? <h3>{historyHeading}</h3> : null}
          {history.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
