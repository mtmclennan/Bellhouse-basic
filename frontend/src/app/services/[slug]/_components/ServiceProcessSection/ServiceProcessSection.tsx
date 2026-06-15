import type React from 'react';

import type { ServiceProcessSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceProcessSection.module.scss';

interface ServiceProcessSectionProps {
  section: ServiceProcessSectionData;
  appearance: ServiceSectionAppearance;
}

export default function ServiceProcessSection({
  appearance,
  section,
}: ServiceProcessSectionProps) {
  if (!section.steps.length) {
    return null;
  }

  const isLight = appearance.backgroundVariant === 'light';

  const sectionClassName = [
    classes.processSection,
    isLight ? classes.processSectionLight : classes.processSectionDark,
  ]
    .filter(Boolean)
    .join(' ');

  const stepCount = section.steps.length;

  return (
    <ServiceSectionWrapper
      spacing="8"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={sectionClassName}
      heading={{
        eyebrow: section.eyebrow,
        title: section.heading ?? '',
        subtext: section.subheading,
        align: 'center',
      }}
    >
      <div
        className={classes.steps}
        style={{ '--step-count': stepCount } as React.CSSProperties}
      >
        {section.steps.map((step, index) => (
          <article key={step.title} className={classes.step}>
            <div className={classes.stepNode} aria-hidden="true">
              {index + 1}
            </div>
            <h3 className={classes.stepTitle}>{step.title}</h3>
            <p className={classes.stepBody}>{step.body}</p>
          </article>
        ))}
      </div>
    </ServiceSectionWrapper>
  );
}
