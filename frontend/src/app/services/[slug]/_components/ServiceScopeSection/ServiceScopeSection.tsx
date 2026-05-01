import type { ServiceScopeSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceScopeSection.module.scss';

interface ServiceScopeSectionProps {
  section: ServiceScopeSectionData;
  appearance: ServiceSectionAppearance;
}

export default function ServiceScopeSection({
  appearance,
  section,
}: ServiceScopeSectionProps) {
  const items = section.items.map((item) => ({
    title: item.title,
    description: item.body,
  }));

  if (!items.length) {
    return null;
  }

  const sectionClassName = [
    classes.scopeSection,
    appearance.backgroundVariant === 'dark'
      ? classes.scopeSectionDark
      : classes.scopeSectionLight,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ServiceSectionWrapper
      spacing="6"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={sectionClassName}
      containerClassName={classes.scopeShell}
      heading={{
        title: section.heading ?? '',
        subtext: section.subheading,
        align: 'left',
      }}
    >
      <div className={classes.scopeGrid}>
        {items.map((item, index) => (
          <article key={`${item.title}-${index}`} className={classes.scopeItem}>
            <div className={classes.scopeIndex} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </div>

            <div className={classes.scopeContent}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </ServiceSectionWrapper>
  );
}
