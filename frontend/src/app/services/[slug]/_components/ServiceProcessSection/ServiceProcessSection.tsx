import type { ServicePage } from '@/types/interfaces';
import type { ServiceProcessSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceProcessSection.module.scss';

interface ServiceProcessSectionProps {
  service: ServicePage;
  appearance: ServiceSectionAppearance;
  section?: ServiceProcessSectionData;
}

export default function ServiceProcessSection({
  service,
  appearance,
  section,
}: ServiceProcessSectionProps) {
  if (!service.process && !section) {
    return null;
  }

  const processSectionClassName = [
    classes.processSection,
    appearance.backgroundVariant === 'light'
      ? classes.processSectionLight
      : classes.processSectionDark,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ServiceSectionWrapper
      spacing="8"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={processSectionClassName}
      containerClassName={classes.processShell}
      heading={{
        title: section?.heading ?? service.process?.heading ?? '',
        subtext: section?.subheading ?? service.process?.subheading,
        align: 'center',
      }}
    >
      <div className={classes.processList}>
        {(section?.steps ?? service.process?.steps ?? []).map((step, index) => (
          <div key={step.title} className={classes.processItem}>
            <div className={classes.stepNumber}>{index + 1}</div>
            <div>
              <h3>{step.title}</h3>
              <p>{'body' in step ? step.body : step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </ServiceSectionWrapper>
  );
}
