import Image from 'next/image';

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
  const hasStats = section.stats && section.stats.length > 0;
  const hasPhotos = section.photos && section.photos.length > 0;
  const hasItems = section.items.length > 0;

  if (!hasStats && !hasItems) {
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

  if (hasStats) {
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
        <div className={classes.statBand}>
          {section.stats!.map((stat) => (
            <div key={stat.label} className={classes.statItem}>
              <div className={classes.statLabel}>{stat.label}</div>
              <p className={classes.statBody}>{stat.body}</p>
            </div>
          ))}
        </div>

        {hasPhotos ? (
          <div className={classes.photoGrid}>
            {section.photos!.map((photo) => (
              <figure key={photo.src} className={classes.photoCard}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className={classes.photoImg}
                  sizes="(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 33vw"
                />
                {photo.caption ? (
                  <figcaption className={classes.photoCaption}>
                    {photo.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        ) : null}
      </ServiceSectionWrapper>
    );
  }

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
          <article
            key={`${item.title}-${index}`}
            className={classes.outcomeBand}
          >
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
