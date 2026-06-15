import Link from '@/components/SiteLink';
import { MapPin, CaretRight } from '@phosphor-icons/react/dist/ssr';
import { Wrench } from '@phosphor-icons/react/dist/ssr';

import type { ServiceAreasSectionData as ServiceAreasSectionPayload } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceAreaLinksSection.module.scss';

type ServiceAreaLink = {
  label: string;
  href?: string;
};

type RelatedServiceItem = {
  title: string;
  description: string;
  href: string;
};

interface ServiceAreaLinksSectionProps {
  section: ServiceAreasSectionPayload;
  appearance: ServiceSectionAppearance;
  areaLinks: ServiceAreaLink[];
  viewAllAction?: { label: string; href: string; variant?: 'primary' | 'secondary' };
  relatedServices?: RelatedServiceItem[];
  relatedSection?: { eyebrow?: string; heading?: string };
}

export default function ServiceAreaLinksSection({
  appearance,
  section,
  areaLinks,
  viewAllAction,
  relatedServices,
  relatedSection,
}: ServiceAreaLinksSectionProps) {
  if (!section.body && areaLinks.length === 0) {
    return null;
  }

  const sectionClassName = [
    classes.serviceAreasSection,
    appearance.backgroundVariant === 'dark'
      ? classes.serviceAreasSectionDark
      : classes.serviceAreasSectionLight,
  ]
    .filter(Boolean)
    .join(' ');

  if (relatedServices && relatedServices.length > 0) {
    return (
      <ServiceSectionWrapper
        spacing="6"
        backgroundVariant={appearance.backgroundVariant}
        backgroundTone={appearance.backgroundTone}
        className={sectionClassName}
        containerClassName={classes.serviceAreasShell}
      >
        <div className={classes.areasRelatedGrid}>
          {/* Areas col */}
          <div className={classes.areasCol}>
            <span className={classes.colEyebrow}>
              {section.eyebrow ?? 'Where Bellhouse works'}
            </span>
            <h3 className={classes.colHeading}>
              {section.heading ?? 'Service areas'}
            </h3>
            {section.body ? (
              <p className={classes.colBody}>{section.body}</p>
            ) : null}
            <div className={classes.areaChips}>
              {areaLinks.map((area) =>
                area.href ? (
                  <Link
                    key={area.label}
                    href={area.href}
                    className={classes.areaChip}
                  >
                    <MapPin size={14} weight="fill" aria-hidden />
                    {area.label}
                  </Link>
                ) : (
                  <span key={area.label} className={classes.areaChip}>
                    <MapPin size={14} weight="fill" aria-hidden />
                    {area.label}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Related services col */}
          <div className={classes.relatedCol}>
            <span className={classes.colEyebrow}>
              {relatedSection?.eyebrow ?? 'Also from Bellhouse'}
            </span>
            <h3 className={classes.colHeading}>
              {relatedSection?.heading ?? 'Related services'}
            </h3>
            <p className={classes.colBody}>
              Other site services Bellhouse handles — often on the same project.
            </p>
            <div className={classes.relatedList}>
              {relatedServices.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className={classes.relatedItem}
                >
                  <span className={classes.relatedIcon} aria-hidden="true">
                    <Wrench size={19} weight="fill" />
                  </span>
                  <span className={classes.relatedTitle}>{service.title}</span>
                  <CaretRight size={16} weight="bold" className={classes.relatedGo} aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ServiceSectionWrapper>
    );
  }

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
      <ul className={classes.locationList}>
        {areaLinks.map((location) => {
          const key = `${location.label}-${location.href ?? 'nolink'}`;
          const accessibleLabel = `See service in ${location.label}`;

          return (
            <li className={classes.locationItem} key={key}>
              {location.href ? (
                <Link
                  aria-label={accessibleLabel}
                  className={classes.locationLink}
                  href={location.href}
                >
                  <span className={classes.locationName}>{location.label}</span>
                  <span className={classes.locationAction}>
                    View {location.label} area page
                  </span>
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
    </ServiceSectionWrapper>
  );
}
