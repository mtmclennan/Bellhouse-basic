import type {
  ServiceOutcomesSectionData,
  ServiceProblemsPreventedSectionData,
} from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceRiskReadinessSection.module.scss';

interface ServiceRiskReadinessSectionProps {
  problemsSection: ServiceProblemsPreventedSectionData;
  outcomesSection: ServiceOutcomesSectionData;
  appearance: ServiceSectionAppearance;
}

export default function ServiceRiskReadinessSection({
  problemsSection,
  outcomesSection,
  appearance,
}: ServiceRiskReadinessSectionProps) {
  if (!problemsSection.items.length || !outcomesSection.items.length) {
    return null;
  }

  const sectionClassName = [
    classes.riskReadinessSection,
    appearance.backgroundVariant === 'dark'
      ? classes.riskReadinessSectionDark
      : classes.riskReadinessSectionLight,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ServiceSectionWrapper
      spacing="6"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={sectionClassName}
      containerClassName={classes.riskReadinessShell}
      heading={{
        eyebrow: problemsSection.eyebrow,
        title: problemsSection.heading,
        subtext: problemsSection.subheading,
        align: 'left',
      }}
    >
      <div className={classes.riskReadinessLayout}>
        <section
          className={classes.problemColumn}
          aria-labelledby="risk-readiness-problems-heading"
        >
          <div className={classes.columnHeading}>
            <p className={classes.columnKicker}>Problems prevented</p>
            <h3 id="risk-readiness-problems-heading">
              What Bellhouse helps you avoid
            </h3>
          </div>

          <div className={classes.problemList}>
            {problemsSection.items.map((item, index) => (
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
        </section>

        <section
          className={classes.outcomeColumn}
          aria-labelledby="risk-readiness-outcomes-heading"
        >
          <div className={classes.columnHeading}>
            <p className={classes.columnKicker}>Outcomes</p>
            <h3 id="risk-readiness-outcomes-heading">
              {outcomesSection.heading}
            </h3>
            {outcomesSection.subheading ? (
              <p className={classes.columnSubtext}>{outcomesSection.subheading}</p>
            ) : null}
          </div>

          <div className={classes.outcomesGrid}>
            {outcomesSection.items.map((item, index) => (
              <article key={`${item.title}-${index}`} className={classes.outcomeBand}>
                <div className={classes.outcomeTopRow}>
                  <p className={classes.outcomeLabel}>
                    Finished-state outcome {String(index + 1).padStart(2, '0')}
                  </p>
                  <span className={classes.outcomeMarker} aria-hidden="true" />
                </div>

                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </ServiceSectionWrapper>
  );
}
