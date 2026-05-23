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
            <article key={step.title} className={classes.processItem}>
              <div className={classes.stepMarker}>
                <span className={classes.stepNumber}>{index + 1}</span>
              </div>

              <div className={classes.stepContent}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </div>

        {section.image?.src ? (
          <aside
            className={classes.mediaPanel}
            aria-label="Process support image"
          >
            <div className={classes.imageFrame}>
              <Image
                src={section.image.src}
                alt={section.image.alt}
                fill
                className={classes.image}
                sizes="(max-width: 1000px) 100vw, 40vw"
              />

              <div className={classes.imageOverlay} aria-hidden="true" />
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
