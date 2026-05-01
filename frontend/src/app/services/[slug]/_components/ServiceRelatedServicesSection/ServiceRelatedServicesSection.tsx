import Link from 'next/link';

import type { ServiceRelatedServicesSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceRelatedServicesSection.module.scss';

type RelatedServiceCard = {
  title: string;
  description: string;
  href: string;
};

interface ServiceRelatedServicesSectionProps {
  section: ServiceRelatedServicesSectionData;
  relatedServices: RelatedServiceCard[];
  appearance: ServiceSectionAppearance;
}

export default function ServiceRelatedServicesSection({
  relatedServices,
  appearance,
  section,
}: ServiceRelatedServicesSectionProps) {
  if (relatedServices.length === 0) {
    return null;
  }

  const relatedServicesSectionClassName = [
    classes.relatedServicesSection,
    appearance.backgroundVariant === 'dark'
      ? classes.relatedServicesSectionDark
      : classes.relatedServicesSectionLight,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ServiceSectionWrapper
      spacing="6"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={relatedServicesSectionClassName}
      containerClassName={classes.relatedServicesShell}
      heading={{
        eyebrow: section?.eyebrow ?? 'Related services',
        title: section?.heading ?? 'Related excavation and hauling services',
        align: 'left',
      }}
    >
      <ul className={classes.relatedServicesList}>
        {relatedServices.map((relatedService) => (
          <li className={classes.relatedServiceItem} key={relatedService.href}>
            <Link className={classes.relatedServiceCard} href={relatedService.href}>
              <div className={classes.relatedServiceMeta}>Related service</div>
              <h3>{relatedService.title}</h3>
              <p>{relatedService.description}</p>
              <span className={classes.relatedServiceAction}>View service</span>
            </Link>
          </li>
        ))}
      </ul>
    </ServiceSectionWrapper>
  );
}
