'use client';

import Link from 'next/link';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import type {
  FaqItemData,
  FaqSectionData,
  RichTextParagraph,
  RichTextPart,
} from '@/types/sections';
import classes from './FaqSection.module.scss';

type FaqSectionProps = {
  data: FaqSectionData;
  defaultOpenId?: string;
};

function normalizeAnswer(answer: FaqItemData['answer']) {
  return (Array.isArray(answer) ? answer : [answer]) as RichTextParagraph[];
}

function isRichTextLink(part: RichTextPart): part is Exclude<RichTextPart, string> {
  return typeof part !== 'string';
}

function renderAnswerParagraph(paragraph: RichTextParagraph, key: string) {
  if (typeof paragraph === 'string') {
    return <p key={key}>{paragraph}</p>;
  }

  return (
    <p key={key}>
      {paragraph.map((part, index) =>
        isRichTextLink(part) ? (
          <Link key={`${key}-link-${index}`} href={part.href}>
            {part.label}
          </Link>
        ) : (
          <span key={`${key}-text-${index}`}>{part}</span>
        ),
      )}
    </p>
  );
}

export default function FaqSection({ data, defaultOpenId }: FaqSectionProps) {
  const {
    eyebrow,
    heading,
    subtext,
    items,
    footerLink,
    backgroundVariant = 'light',
    backgroundTone = 'default',
  } = data;

  const uid = useId();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const normalizedItems = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        id: item.id ?? `${uid}-faq-${index}`,
      })),
    [items, uid],
  );

  const [openId, setOpenId] = useState<string | null>(
    defaultOpenId ?? normalizedItems[0]?.id ?? null,
  );

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
      { threshold: 0.14 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

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

  return (
    <section
      ref={sectionRef}
      className={`${classes.section} ${variantClassMap[backgroundVariant]} ${
        toneClassMap[backgroundTone]
      }`}
      aria-labelledby={`${uid}-heading`}
    >
      <div className={classes.inner}>
        <div
          className={`${classes.intro} ${
            isVisible ? classes.introVisible : ''
          }`}
        >
          {eyebrow ? <p className={classes.eyebrow}>{eyebrow}</p> : null}

          <h2 id={`${uid}-heading`}>{heading}</h2>

          {subtext ? <p className={classes.subtext}>{subtext}</p> : null}
        </div>

        <div className={classes.accordion}>
          {normalizedItems.map((item, index) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;
            const buttonId = `${item.id}-button`;

            return (
              <div
                key={item.id}
                className={`${classes.item} ${
                  isVisible ? classes.itemVisible : ''
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
                data-open={isOpen}
              >
                <button
                  id={buttonId}
                  type="button"
                  className={classes.question}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id)}
                >
                  <span className={classes.questionText}>{item.question}</span>

                  <span className={classes.icon} aria-hidden="true">
                    {isOpen ? (
                      <CaretUp size={22} weight="bold" />
                    ) : (
                      <CaretDown size={22} weight="bold" />
                    )}
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={classes.answer}
                  data-open={isOpen}
                >
                  <div className={classes.answerInner}>
                    {normalizeAnswer(item.answer).map(
                      (paragraph, paragraphIndex) => (
                        renderAnswerParagraph(
                          paragraph,
                          `${item.id}-paragraph-${paragraphIndex}`,
                        )
                      ),
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {footerLink ? (
          <div
            className={`${classes.footer} ${
              isVisible ? classes.footerVisible : ''
            }`}
          >
            <Link className={classes.footerAction} href={footerLink.href}>
              {footerLink.label}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
