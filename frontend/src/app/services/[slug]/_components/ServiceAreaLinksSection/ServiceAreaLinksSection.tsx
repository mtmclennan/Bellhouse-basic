import Link from 'next/link';

import type { ServicePage } from '@/types/interfaces';
import type { ServiceAreasSectionData as ServiceAreasSectionPayload } from '@/types/serviceSections';
import type { ServiceLocalIntentContent } from '@/lib/servicePageLinks';
import { getServiceAreaPage } from '@/lib/serviceAreas';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceAreaLinksSection.module.scss';

interface ServiceAreaLinksSectionProps {
  service: ServicePage;
  localIntent: ServiceLocalIntentContent | null;
  appearance: ServiceSectionAppearance;
  section?: ServiceAreasSectionPayload;
}

type ServiceAreaLink = {
  label: string;
  href?: string;
};

export default function ServiceAreaLinksSection({
  service,
  localIntent,
  appearance,
  section,
}: ServiceAreaLinksSectionProps) {
  const v2Locations: ServiceAreaLink[] = (section?.areaSlugs ?? [])
    .map((slug) => {
      const page = getServiceAreaPage(slug);

      if (!page) {
        return undefined;
      }

      return {
        label: page.city,
        href: `/service-areas/${page.slug}`,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (!section && !service.serviceArea && !localIntent) {
    return null;
  }

  const locations: ServiceAreaLink[] = section
    ? v2Locations
    : (localIntent?.linkedAreas ?? []).map((location) => ({
        label: location.label,
        href: location.href,
      }));

  const actions = [
    {
      label: localIntent?.viewAllLabel ?? 'View All Service Areas',
      href: localIntent?.viewAllHref ?? '/service-areas',
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
        eyebrow: section?.eyebrow ?? 'Coverage',
        title: section?.heading ?? service.serviceArea?.heading ?? '',
        subtext: section?.body ?? localIntent?.paragraph ?? '',
        align: 'left',
      }}
    >
      <div className={classes.serviceAreasLayout}>
        {locations.length > 0 ? (
          <div className={classes.coverageMeta}>
            <span>Coverage links</span>
            <strong>{locations.length} nearby service areas</strong>
          </div>
        ) : null}

        <ul className={classes.locationList}>
          {locations.map((location) => {
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
