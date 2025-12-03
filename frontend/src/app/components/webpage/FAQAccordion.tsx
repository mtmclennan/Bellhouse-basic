'use client';

import React, { useState } from 'react';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import styles from './FAQAccordion.module.scss';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  heading: string;
  subheading?: string;
  items: FAQItem[];
}

export default function FAQAccordion({
  heading,
  subheading,
  items,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{heading}</h2>
        {subheading && <p className={styles.subheading}>{subheading}</p>}

        <div className={styles.accordion}>
          {items.map((item, index) => (
            <div key={index} className={styles.item}>
              <button
                className={styles.question}
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
              >
                <span>{item.question}</span>

                {openIndex === index ? (
                  <CaretUp size={24} color="#ffc302" weight="bold" />
                ) : (
                  <CaretDown size={24} color="#ffc302" weight="bold" />
                )}
              </button>

              <div
                className={`${styles.answer} ${
                  openIndex === index ? styles.open : ''
                }`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
