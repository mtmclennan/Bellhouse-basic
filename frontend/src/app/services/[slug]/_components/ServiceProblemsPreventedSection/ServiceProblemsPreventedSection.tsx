import type { ServiceProblemsPreventedSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceProblemsPreventedSection.module.scss';

interface ServiceProblemsPreventedSectionProps {
  section: ServiceProblemsPreventedSectionData;
  appearance: ServiceSectionAppearance;
}

export default function ServiceProblemsPreventedSection({
  section,
  appearance,
}: ServiceProblemsPreventedSectionProps) {
  if (!section.items.length) {
    return null;
  }

  const sectionClassName = [
    classes.problemsSection,
    appearance.backgroundVariant === 'dark'
      ? classes.problemsSectionDark
      : classes.problemsSectionLight,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ServiceSectionWrapper
      spacing="6"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={sectionClassName}
      containerClassName={classes.problemsShell}
      heading={{
        eyebrow: section.eyebrow,
        title: section.heading,
        subtext: section.subheading,
        align: 'left',
      }}
    >
      <div className={classes.problemList}>
        {section.items.map((item, index) => (
          <article key={`${item.problem}-${index}`} className={classes.problemRow}>
            <div className={classes.problemIntro}>
              <span className={classes.problemIndex} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className={classes.problemBlock}>
                <p className={classes.kicker}>Risk on site</p>
                <p className={classes.problemText}>{item.problem}</p>
              </div>
            </div>

            <div className={classes.solutionPanel}>
              <p className={classes.kicker}>How Bellhouse helps prevent it</p>
              <p className={classes.solutionText}>{item.solution}</p>
            </div>
          </article>
        ))}
      </div>
    </ServiceSectionWrapper>
  );
}
