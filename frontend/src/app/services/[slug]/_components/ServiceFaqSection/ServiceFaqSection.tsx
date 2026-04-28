import type { ServicePage } from '@/types/interfaces';
import type { ServiceFaqSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceFaqSection.module.scss';

interface ServiceFaqSectionProps {
  service: ServicePage;
  appearance: ServiceSectionAppearance;
  section?: ServiceFaqSectionData;
}

function getAnswerParagraphs(answer: string) {
  return answer
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default function ServiceFaqSection({
  service,
  appearance,
  section,
}: ServiceFaqSectionProps) {
  const items = section?.items ?? service.faq?.items ?? [];

  if ((!service.faq && !section) || items.length === 0) {
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
        eyebrow: section?.eyebrow ?? 'FAQ',
        title: section?.heading ?? service.faq?.heading ?? '',
        subtext:
          section?.subheading ?? 'Clear, practical answers for homeowners and contractors.',
        align: 'left',
      }}
    >
      <div className={classes.faqLayout}>
        <div className={classes.faqMeta}>
          <span>Common questions</span>
          <strong>{items.length} answers</strong>
        </div>

        <div className={classes.faqList}>
          {items.map((item, index) => (
            <details
              className={classes.faqItem}
              key={`${item.question}-${index}`}
              open={index === 0}
            >
              <summary className={classes.faqQuestion}>
                <span className={classes.faqQuestionIndex}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={classes.faqQuestionText}>{item.question}</span>
                <span className={classes.faqToggle} aria-hidden="true" />
              </summary>

              <div className={classes.faqAnswer}>
                {getAnswerParagraphs(item.answer).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </ServiceSectionWrapper>
  );
}
