import type { ServicePage } from '@/types/interfaces';
import type { ServiceScopeSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceScopeSection.module.scss';

interface ServiceScopeSectionProps {
  service: ServicePage;
  appearance: ServiceSectionAppearance;
  section?: ServiceScopeSectionData;
}

export default function ServiceScopeSection({
  service,
  appearance,
  section,
}: ServiceScopeSectionProps) {
  if (!service.includes && !section) {
    return null;
  }

  const items = (section?.items ?? service.includes?.items ?? []).map((item) => ({
    title: item.title,
    description: 'body' in item ? item.body : item.description,
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
        title: section?.heading ?? service.includes?.heading ?? '',
        subtext: section?.subheading ?? service.includes?.subheading,
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
