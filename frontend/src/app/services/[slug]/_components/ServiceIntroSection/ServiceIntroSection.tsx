import LandingIcon from '@/components/landing/LandingIcon';

import type { ServiceIntroSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceIntroSection.module.scss';

interface ServiceIntroSectionProps {
  section: ServiceIntroSectionData;
  appearance: ServiceSectionAppearance;
}

export default function ServiceIntroSection({
  section,
  appearance,
}: ServiceIntroSectionProps) {
  const heading = section.heading ?? '';
  const body = section.body;
  const audience = section.audience ?? [];

  return (
    <ServiceSectionWrapper
      spacing="6"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      containerClassName={classes.introShell}
      heading={{
        eyebrow: section.eyebrow,
        title: heading,
        subtext: body,
        align: 'center',
      }}
    >
      {audience.length > 0 ? (
        <div className={classes.audGrid}>
          {audience.map((item) => (
            <div key={item.label} className={classes.audItem}>
              <span className={classes.audIcon} aria-hidden="true">
                <LandingIcon name={item.icon} size={28} weight="fill" color="#7a5a00" />
              </span>
              <span className={classes.audLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      ) : null}
    </ServiceSectionWrapper>
  );
}
