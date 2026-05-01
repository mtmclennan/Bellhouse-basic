import Link from 'next/link';

import type { ServiceAreasSectionData as ServiceAreasSectionPayload } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceAreaLinksSection.module.scss';

type ServiceAreaLink = {
  label: string;
  href?: string;
};

type ServiceAreaAction = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
};

interface ServiceAreaLinksSectionProps {
  section: ServiceAreasSectionPayload;
  appearance: ServiceSectionAppearance;
  areaLinks: ServiceAreaLink[];
  viewAllAction?: ServiceAreaAction;
}

export default function ServiceAreaLinksSection({
  appearance,
  section,
  areaLinks,
  viewAllAction,
}: ServiceAreaLinksSectionProps) {
  if (!section.body && areaLinks.length === 0) {
    return null;
  }

  const actions = [
    viewAllAction ?? {
      label: 'View All Service Areas',
      href: '/service-areas',
      variant: 'secondary' as const,
    },
  ];

  const sectionClassName = [
    classes.serviceAreasSection,
    appearance.backgroundVariant === 'dark'
      ? classes.serviceAreasSectionDark
      : classes.serviceAreasSectionLight,
  ]
    .filter(Boolean)
    .join(' ');

  const locationLinkLabelPrefix = 'See service in ';

  return (
    <ServiceSectionWrapper
      spacing="6"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={sectionClassName}
      containerClassName={classes.serviceAreasShell}
      heading={{
        eyebrow: section.eyebrow ?? 'Coverage',
        title: section.heading ?? '',
        subtext: section.body ?? '',
        align: 'left',
      }}
    >
      <div className={classes.serviceAreasLayout}>
        {areaLinks.length > 0 ? (
          <div className={classes.coverageMeta}>
            <span>Coverage links</span>
            <strong>{areaLinks.length} nearby service areas</strong>
          </div>
        ) : null}

        <ul className={classes.locationList}>
          {areaLinks.map((location) => {
            const key = `${location.label}-${location.href ?? 'nolink'}`;
            const accessibleLabel = `${locationLinkLabelPrefix}${location.label}`;

            return (
              <li className={classes.locationItem} key={key}>
                {location.href ? (
                  <Link
                    aria-label={accessibleLabel}
                    className={classes.locationLink}
                    href={location.href}
                  >
                    <span className={classes.locationName}>{location.label}</span>
                    <span className={classes.locationAction}>View area page</span>
                  </Link>
                ) : (
                  <div className={classes.locationStatic}>
                    <span className={classes.locationName}>{location.label}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {actions.length > 0 ? (
          <div className={classes.actions}>
            {actions.map((action) => (
              <Link
                key={`${action.href}-${action.label}`}
                href={action.href}
                className={
                  action.variant === 'secondary'
                    ? classes.secondaryAction
                    : classes.primaryAction
                }
              >
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </ServiceSectionWrapper>
  );
}
