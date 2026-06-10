'use client';

import React from 'react';
import Link from '@/components/SiteLink';

import classes from './ServicesSection.module.scss';
import { useRevealOnEnter } from '@/hooks/useRevealOnEnter';
import type {
  RichTextLink,
  RichTextParagraph,
  RichTextPart,
  ServicesSectionData,
} from '@/types/sections';
import ServiceCard from '@/app/components/webpage/ServiceCard';

type ServicesSectionProps = {
  data: ServicesSectionData;
  revealOnScroll?: boolean;
};

type ServiceGroup = NonNullable<ServicesSectionData['groups']>[number];

function isRichTextLink(part: RichTextPart): part is RichTextLink {
  return typeof part !== 'string';
}

function renderRichText(paragraph: RichTextParagraph) {
  if (typeof paragraph === 'string') return paragraph;

  return paragraph.map((part, index) =>
    isRichTextLink(part) ? (
      <Link
        href={part.href}
        className={classes.inlineLink}
        key={`${part.href}-${part.label}-${index}`}
      >
        {part.label}
      </Link>
    ) : (
      <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
    ),
  );
}

type ServiceGroupBlockProps = {
  cardSize: NonNullable<ServicesSectionData['cardSize']>;
  group: ServiceGroup;
  revealOnScroll: boolean;
  sectionVisible: boolean;
};

function ServiceGroupBlock({
  cardSize,
  group,
  revealOnScroll,
  sectionVisible,
}: ServiceGroupBlockProps) {
  const { elementRef, isVisible } = useRevealOnEnter<HTMLElement>({
    disabled: !revealOnScroll,
    rootMargin: '0px 0px 10% 0px',
    threshold: 0.08,
  });

  const groupVisible = revealOnScroll ? isVisible : sectionVisible;
  const groupClassName = [
    classes.group,
    revealOnScroll ? classes.groupReveal : '',
    groupVisible ? classes.groupVisible : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      ref={revealOnScroll ? elementRef : undefined}
      key={group.id}
      className={groupClassName}
      aria-labelledby={`services-section-group-${group.id}`}
    >
      <div className={classes.groupHeader}>
        <h3 id={`services-section-group-${group.id}`}>{group.heading}</h3>
        {group.description ? <p>{renderRichText(group.description)}</p> : null}
      </div>

      <ul
        className={`${classes.grid} ${classes.groupGrid} ${
          groupVisible ? classes.isVisible : ''
        }`}
      >
        {group.items.map((item) => (
          <ServiceCard
            key={item.id}
            image={item.image}
            alt={item.alt}
            description={item.description}
            link={item.href}
            title={item.title}
            large={cardSize === 'large'}
          />
        ))}
      </ul>
    </section>
  );
}

export default function ServicesSection({
  data,
  revealOnScroll = false,
}: ServicesSectionProps) {
  const {
    id,
    eyebrow,
    heading,
    intro,
    items = [],
    groups = [],
    actions = [],
    backgroundVariant = 'dark',
    backgroundTone = 'default',
    cardSize = 'default',
  } = data;

  const { elementRef: sectionRef, isVisible } = useRevealOnEnter<HTMLElement>({
    rootMargin: '0px 0px 30% 0px',
    threshold: 0.01,
  });

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
    revealOnScroll ? classes.sectionReveal : '',
    revealOnScroll && isVisible ? classes.sectionVisible : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section ref={sectionRef} id={id} className={sectionClassName}>
      <div className={classes.container}>
        {eyebrow && <p className={classes.eyebrow}>{eyebrow}</p>}

        <h2>{heading}</h2>

        {intro && <p className={classes.intro}>{renderRichText(intro)}</p>}

        {groups.length > 0 ? (
          <div className={classes.groups}>
            {groups.map((group) => (
              <ServiceGroupBlock
                key={group.id}
                cardSize={cardSize}
                group={group}
                revealOnScroll={revealOnScroll}
                sectionVisible={isVisible}
              />
            ))}
          </div>
        ) : (
          <ul
            className={`${classes.grid} ${isVisible ? classes.isVisible : ''}`}
          >
            {items.map((item) => (
              <ServiceCard
                key={item.id}
                image={item.image}
                alt={item.alt}
                description={item.description}
                link={item.href}
                title={item.title}
                large={cardSize === 'large'}
              />
            ))}
          </ul>
        )}

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
