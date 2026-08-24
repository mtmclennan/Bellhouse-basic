'use client';

import React, { useId, useMemo, useState } from 'react';
import { CaretDown, CaretUp, Plus } from '@phosphor-icons/react';
import styles from './FAQAccordion.module.scss';

export interface FAQItem {
  id?: string;
  question: string;
  answer: React.ReactNode;
}

interface FAQAccordionProps {
  heading: string;
  subheading?: string;
  items: FAQItem[];
  defaultOpenId?: string;
  cta?: React.ReactNode;
  accentColor?: string;
  variant?: 'default' | 'serviceArea' | 'light';
  singleColumn?: boolean;
  className?: string;
}

export default function FAQAccordion({
  heading,
  subheading,
  items,
  defaultOpenId,
  cta,
  accentColor = '#ffc302',
  variant = 'default',
  singleColumn = false,
  className,
}: FAQAccordionProps) {
  const uid = useId();

  const normalized = useMemo(
    () =>
      items.map((it, i) => ({
        ...it,
        id: it.id ?? `${uid}-faq-${i}`,
      })),
    [items, uid],
  );

  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const isLight = variant === 'light';
  const isServiceArea = variant === 'serviceArea';

  const sectionClass = [
    styles.faqSection,
    isServiceArea ? styles.serviceAreaSection : '',
    isLight ? styles.lightSection : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const containerClass = [
    styles.container,
    isServiceArea ? styles.serviceAreaContainer : '',
    isLight ? styles.lightContainer : '',
  ]
    .filter(Boolean)
    .join(' ');

  const headerClass = [
    styles.header,
    isServiceArea ? styles.serviceAreaHeader : '',
    isLight ? styles.lightHeader : '',
  ]
    .filter(Boolean)
    .join(' ');

  const headingClass = [
    styles.heading,
    isServiceArea ? styles.serviceAreaHeading : '',
    isLight ? styles.lightHeading : '',
  ]
    .filter(Boolean)
    .join(' ');

  const subheadingClass = [
    styles.subheading,
    isServiceArea ? styles.serviceAreaSubheading : '',
    isLight ? styles.lightSubheading : '',
  ]
    .filter(Boolean)
    .join(' ');

  const accordionClass = [
    styles.accordion,
    isServiceArea ? styles.serviceAreaAccordion : '',
    isLight ? styles.lightAccordion : '',
    isLight && singleColumn ? styles.lightAccordionSingle : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClass} aria-labelledby={`${uid}-heading`}>
      <div className={containerClass}>
        <header className={headerClass}>
          <h2 id={`${uid}-heading`} className={headingClass}>
            {heading}
          </h2>
          {subheading && (
            <p className={subheadingClass}>{subheading}</p>
          )}
        </header>

        <div className={accordionClass}>
          {normalized.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;
            const btnId = `${item.id}-btn`;

            const itemClass = [
              styles.item,
              isServiceArea ? styles.serviceAreaItem : '',
              isLight ? styles.lightItem : '',
            ]
              .filter(Boolean)
              .join(' ');

            const questionClass = [
              styles.question,
              isServiceArea ? styles.serviceAreaQuestion : '',
              isLight ? styles.lightQuestion : '',
            ]
              .filter(Boolean)
              .join(' ');

            const answerClass = [
              styles.answer,
              isServiceArea ? styles.serviceAreaAnswer : '',
              isLight ? styles.lightAnswer : '',
            ]
              .filter(Boolean)
              .join(' ');

            const answerInnerClass = [
              styles.answerInner,
              isServiceArea ? styles.serviceAreaAnswerInner : '',
              isLight ? styles.lightAnswerInner : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div
                key={item.id}
                className={itemClass}
                data-open={isOpen}
              >
                <button
                  id={btnId}
                  type="button"
                  className={questionClass}
                  onClick={() => toggle(item.id!)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className={styles.qText}>{item.question}</span>
                  <span className={styles.icon} aria-hidden="true">
                    {isLight ? (
                      <Plus
                        size={20}
                        weight="bold"
                        className={isOpen ? styles.plusOpen : ''}
                      />
                    ) : isOpen ? (
                      <CaretUp size={22} color={accentColor} weight="bold" />
                    ) : (
                      <CaretDown size={22} color={accentColor} weight="bold" />
                    )}
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className={answerClass}
                  data-open={isOpen}
                >
                  <div className={answerInnerClass}>
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {cta && <div className={styles.cta}>{cta}</div>}
      </div>
    </section>
  );
}
