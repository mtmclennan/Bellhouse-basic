import Image from 'next/image';

import type { ServiceJobsiteProofSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceJobsiteProofSection.module.scss';

interface ServiceJobsiteProofSectionProps {
  section: ServiceJobsiteProofSectionData;
  appearance: ServiceSectionAppearance;
}

export default function ServiceJobsiteProofSection({
  section,
  appearance,
}: ServiceJobsiteProofSectionProps) {
  const sectionClassName = [
    classes.jobsiteProofSection,
    appearance.backgroundVariant === 'dark'
      ? classes.jobsiteProofSectionDark
      : classes.jobsiteProofSectionLight,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ServiceSectionWrapper
      spacing="8"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={sectionClassName}
      containerClassName={classes.jobsiteProofShell}
    >
      <div className={classes.jobsiteProofLayout}>
        <div className={classes.copyPanel}>
          {section.eyebrow ? (
            <p className={classes.eyebrow}>{section.eyebrow}</p>
          ) : null}
          <h2>{section.heading}</h2>
          {section.body ? <p className={classes.body}>{section.body}</p> : null}
          {section.caption ? (
            <p className={classes.caption}>{section.caption}</p>
          ) : null}
        </div>

        <div className={classes.mediaPanel}>
          <div className={classes.imageFrame}>
            <Image
              src={section.image.src}
              alt={section.image.alt}
              width={1000}
              height={1000}
              className={classes.image}
              sizes="(max-width: 1000px) 100vw, 48vw"
            />
          </div>
        </div>
      </div>
    </ServiceSectionWrapper>
  );
}
