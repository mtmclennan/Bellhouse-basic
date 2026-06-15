import { Plus } from '@phosphor-icons/react/dist/ssr';

import type { ServiceFaqSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceFaqSection.module.scss';

interface ServiceFaqSectionProps {
  section: ServiceFaqSectionData;
  appearance: ServiceSectionAppearance;
}

function getAnswerParagraphs(answer: string) {
  return answer
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default function ServiceFaqSection({
  appearance,
  section,
}: ServiceFaqSectionProps) {
  const items = section.items;

  if (items.length === 0) {
    return null;
  }

  const sectionClassName = [
    classes.faqSection,
    appearance.backgroundVariant === 'dark'
      ? classes.faqSectionDark
      : classes.faqSectionLight,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ServiceSectionWrapper
      spacing="6"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={sectionClassName}
      containerClassName={classes.faqShell}
      heading={{
        eyebrow: section.eyebrow ?? 'FAQ',
        title: section.heading ?? '',
        subtext:
          section.subheading ??
          'Clear, practical answers for homeowners and contractors.',
        align: 'center',
      }}
    >
      <div className={classes.faqList}>
        {items.map((item, index) => (
          <details
            className={classes.faqItem}
            key={`${item.question}-${index}`}
            open={index === 0}
          >
            <summary className={classes.faqQuestion}>
              <span className={classes.faqQuestionText}>{item.question}</span>
              <span className={classes.faqToggle} aria-hidden="true">
                <Plus size={20} weight="bold" />
              </span>
            </summary>

            <div className={classes.faqAnswer}>
              {getAnswerParagraphs(item.answer).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </ServiceSectionWrapper>
  );
}
