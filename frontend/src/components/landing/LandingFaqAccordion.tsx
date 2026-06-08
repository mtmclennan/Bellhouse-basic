'use client';

import { useState } from 'react';
import { Plus } from '@phosphor-icons/react';
import type { LandingPageData } from '@/data/landingPages/types';

type LandingFaqAccordionProps = {
  items: NonNullable<LandingPageData['faq']>['items'];
};

export default function LandingFaqAccordion({ items }: LandingFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <div className="landing-faq-list">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-btn-${i}`;

        return (
          <div key={item.question} className={`landing-faq-item${isOpen ? ' landing-faq-item--open' : ''}`}>
            <button
              id={buttonId}
              className="landing-faq-btn"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(i)}
            >
              {item.question}
              <Plus
                size={20}
                weight="bold"
                className="landing-faq-icon"
                aria-hidden="true"
              />
            </button>
            <div
              id={panelId}
              className="landing-faq-panel"
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
