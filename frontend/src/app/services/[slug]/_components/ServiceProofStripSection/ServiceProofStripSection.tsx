import type { ServiceProofStripSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceCardGrid from '../primitives/ServiceCardGrid/ServiceCardGrid';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceProofStripSection.module.scss';

interface ServiceProofStripSectionProps {
  section: ServiceProofStripSectionData;
  appearance: ServiceSectionAppearance;
}

export default function ServiceProofStripSection({
  section,
  appearance,
}: ServiceProofStripSectionProps) {
  if (!section.items.length) {
    return null;
  }

  const sectionClassName = [
    classes.proofStripSection,
    appearance.backgroundVariant === 'dark'
      ? classes.proofStripSectionDark
      : classes.proofStripSectionLight,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ServiceSectionWrapper
      spacing="4"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={sectionClassName}
      heading={{
        eyebrow: section.eyebrow,
        title: section.heading,
        subtext: section.subheading,
        align: 'center',
      }}
    >
      <ServiceCardGrid className={classes.proofStripGrid}>
        {section.items.map((item, index) => (
          <article
            key={
              item.label ||
              item.value ||
              item.description ||
              `proof-strip-${index}`
            }
            className={classes.proofItem}
          >
            <span className={classes.proofMarker} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className={classes.proofContent}>
              {item.value ? (
                <p className={classes.proofValue}>{item.value}</p>
              ) : null}

              <h3 className={classes.proofLabel}>{item.label}</h3>

              {item.description ? (
                <p className={classes.proofDescription}>{item.description}</p>
              ) : null}
            </div>
          </article>
        ))}
      </ServiceCardGrid>
    </ServiceSectionWrapper>
  );
}
