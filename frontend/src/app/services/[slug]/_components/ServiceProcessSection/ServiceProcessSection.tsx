import Image from 'next/image';

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

  const hasMedia = Boolean(section.image?.src);
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
        title: section.heading ?? '',
        subtext: section.subheading,
        align: 'center',
      }}
    >
      <div
        className={`${classes.processLayout} ${
          hasMedia ? classes.processLayoutWithMedia : ''
        }`}
      >
        <div className={classes.processList}>
          {section.steps.map((step, index) => (
            <div key={step.title} className={classes.processItem}>
              <div className={classes.stepNumber}>{index + 1}</div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        {section.image?.src ? (
          <aside className={classes.mediaPanel} aria-label="Process support image">
            <div className={classes.imageFrame}>
              <Image
                src={section.image.src}
                alt={section.image.alt}
                width={1600}
                height={900}
                className={classes.image}
                sizes="(max-width: 1000px) 100vw, 38vw"
              />
            </div>

            {section.caption ? (
              <p className={classes.caption}>{section.caption}</p>
            ) : null}
          </aside>
        ) : null}
      </div>
    </ServiceSectionWrapper>
  );
}
