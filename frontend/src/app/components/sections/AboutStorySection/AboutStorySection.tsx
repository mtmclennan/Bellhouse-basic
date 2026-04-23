'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  Buildings,
  Clock,
  ShieldCheck,
  Truck,
  UsersThree,
} from '@phosphor-icons/react';
import type {
  AboutStorySectionData,
  ProofIcon,
  RichTextParagraph,
  RichTextPart,
} from '@/types/sections';
import classes from './AboutStorySection.module.scss';

type AboutStorySectionProps = {
  data: AboutStorySectionData;
};

function renderStoryIcon(icon?: ProofIcon) {
  const commonProps = {
    size: 18,
    weight: 'fill' as const,
  };

  switch (icon) {
    case 'buildings':
      return <Buildings {...commonProps} />;
    case 'truck':
      return <Truck {...commonProps} />;
    case 'shield':
      return <ShieldCheck {...commonProps} />;
    case 'clock':
      return <Clock {...commonProps} />;
    case 'users':
      return <UsersThree {...commonProps} />;
    default:
      return null;
  }
}

function isRichTextLink(part: RichTextPart): part is Exclude<RichTextPart, string> {
  return typeof part !== 'string';
}

function renderRichParagraph(paragraph: RichTextParagraph, keyPrefix: string) {
  if (typeof paragraph === 'string') {
    return <p key={keyPrefix}>{paragraph}</p>;
  }

  return (
    <p key={keyPrefix}>
      {paragraph.map((part, index) =>
        isRichTextLink(part) ? (
          <Link key={`${keyPrefix}-link-${index}`} href={part.href}>
            {part.label}
          </Link>
        ) : (
          <span key={`${keyPrefix}-text-${index}`}>{part}</span>
        ),
      )}
    </p>
  );
}

export default function AboutStorySection({ data }: AboutStorySectionProps) {
  const {
    eyebrow,
    heading,
    intro,
    proofItems = [],
    image,
    imageBadges = [],
    historyHeading,
    history,
    historyHighlights = [],
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
              {intro.map((paragraph, index) =>
                renderRichParagraph(paragraph, `intro-${index}`),
              )}
            </div>

            {proofItems.length > 0 ? (
              <div className={classes.proofList}>
                {proofItems.map((item) => (
                  <div
                    key={`${item.label}-${item.detail ?? 'detail'}`}
                    className={classes.proofItem}
                  >
                    {item.icon ? (
                      <span className={classes.proofIcon} aria-hidden="true">
                        {renderStoryIcon(item.icon)}
                      </span>
                    ) : null}
                    <div className={classes.proofBody}>
                      <span className={classes.proofLabel}>{item.label}</span>
                      {item.detail ? (
                        <span className={classes.proofDetail}>
                          {item.detail}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

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
            <div className={classes.mediaColumn}>
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

              <div className={classes.mediaTrustCard}>
                <span className={classes.mediaTrustEyebrow}>On-Site Focus</span>
                <div className={classes.mediaTrustItems}>
                  <div className={classes.mediaTrustItem}>
                    <span className={classes.mediaTrustIcon} aria-hidden="true">
                      <Clock size={16} weight="fill" />
                    </span>
                    <div className={classes.mediaTrustBody}>
                      <strong>Scheduled around site timing</strong>
                      <span>Work planned around access, sequencing, and the next trade.</span>
                    </div>
                  </div>

                  <div className={classes.mediaTrustItem}>
                    <span className={classes.mediaTrustIcon} aria-hidden="true">
                      <Truck size={16} weight="fill" />
                    </span>
                    <div className={classes.mediaTrustBody}>
                      <strong>Excavation + trucking together</strong>
                      <span>Digging, haul-out, and imported material coordinated on one plan.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${classes.historyBlock} ${
            isVisible ? classes.historyBlockVisible : ''
          }`}
        >
          {historyHeading ? <h3>{historyHeading}</h3> : null}
          {history.map((paragraph, index) =>
            renderRichParagraph(paragraph, `history-${index}`),
          )}

          {historyHighlights.length > 0 ? (
            <div className={classes.historyHighlights}>
              {historyHighlights.map((item) => (
                <div
                  key={`${item.title}-${item.text}`}
                  className={classes.historyHighlight}
                >
                  {item.icon ? (
                    <span
                      className={classes.historyHighlightIcon}
                      aria-hidden="true"
                    >
                      {renderStoryIcon(item.icon)}
                    </span>
                  ) : null}
                  <div className={classes.historyHighlightBody}>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
