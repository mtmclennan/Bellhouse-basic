import type { ServiceOutcomesSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceOutcomesSection.module.scss';

interface ServiceOutcomesSectionProps {
  section: ServiceOutcomesSectionData;
  appearance: ServiceSectionAppearance;
}

export default function ServiceOutcomesSection({
  section,
  appearance,
}: ServiceOutcomesSectionProps) {
  if (!section.items.length) {
    return null;
  }

  const sectionClassName = [
    classes.outcomesSection,
    appearance.backgroundVariant === 'dark'
      ? classes.outcomesSectionDark
      : classes.outcomesSectionLight,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ServiceSectionWrapper
      spacing="6"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={sectionClassName}
      containerClassName={classes.outcomesShell}
      heading={{
        eyebrow: section.eyebrow,
        title: section.heading,
        subtext: section.subheading,
        align: 'left',
      }}
    >
      <div className={classes.outcomesGrid}>
        {section.items.map((item, index) => (
          <article key={`${item.title}-${index}`} className={classes.outcomeBand}>
            <div className={classes.outcomeTopRow}>
              <p className={classes.outcomeLabel}>
                Finished-state outcome {String(index + 1).padStart(2, '0')}
              </p>
              <span className={classes.outcomeMarker} aria-hidden="true" />
            </div>

            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </ServiceSectionWrapper>
  );
}
