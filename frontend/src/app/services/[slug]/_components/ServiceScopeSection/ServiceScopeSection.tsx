import LandingIcon from '@/components/landing/LandingIcon';

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
  if (!section.items.length) {
    return null;
  }

  const isDark = appearance.backgroundVariant === 'dark';

  const sectionClassName = [
    classes.scopeSection,
    isDark ? classes.scopeSectionDark : classes.scopeSectionLight,
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
        eyebrow: section.eyebrow,
        title: section.heading ?? '',
        subtext: section.subheading,
        align: 'left',
      }}
    >
      <div className={classes.scopeGrid}>
        {section.items.map((item) => (
          <article key={item.title} className={classes.scopeItem}>
            <div className={classes.scopeCardTop}>
              {item.icon ? (
                <span className={classes.scopeIcon} aria-hidden="true">
                  <LandingIcon
                    name={item.icon}
                    size={22}
                    color={isDark ? '#ffc302' : '#7a5a00'}
                    weight="fill"
                  />
                </span>
              ) : null}
              <h3 className={classes.scopeTitle}>{item.title}</h3>
            </div>
            <p className={classes.scopeBody}>{item.body}</p>
          </article>
        ))}
      </div>
    </ServiceSectionWrapper>
  );
}
