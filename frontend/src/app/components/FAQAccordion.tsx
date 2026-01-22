'use client';

import React, { useId, useMemo, useState } from 'react';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import styles from './FAQAccordion.module.scss';

export interface FAQItem {
  id?: string;
  question: string;
  answer: React.ReactNode; // <- upgrade from string
}

interface FAQAccordionProps {
  heading: string;
  subheading?: string;
  items: FAQItem[];
  defaultOpenId?: string;
  cta?: React.ReactNode;
  accentColor?: string;
}

export default function FAQAccordion({
  heading,
  subheading,
  items,
  defaultOpenId,
  cta,
  accentColor = '#ffc302',
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

  return (
    <section className={styles.faqSection} aria-labelledby={`${uid}-heading`}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id={`${uid}-heading`} className={styles.heading}>
            {heading}
          </h2>
          {subheading && <p className={styles.subheading}>{subheading}</p>}
        </header>

        <div className={styles.accordion}>
          {normalized.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;
            const btnId = `${item.id}-btn`;

            return (
              <div key={item.id} className={styles.item} data-open={isOpen}>
                <button
                  id={btnId}
                  type="button"
                  className={styles.question}
                  onClick={() => toggle(item.id!)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className={styles.qText}>{item.question}</span>
                  <span className={styles.icon} aria-hidden="true">
                    {isOpen ? (
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
                  className={styles.answer}
                  data-open={isOpen}
                >
                  <div className={styles.answerInner}>{item.answer}</div>
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
