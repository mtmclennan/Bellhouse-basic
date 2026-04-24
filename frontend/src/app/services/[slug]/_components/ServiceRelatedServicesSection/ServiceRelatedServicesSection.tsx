import Link from 'next/link';

import type { RelatedServiceLinkItem } from '@/lib/servicePageLinks';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceCardGrid from '../primitives/ServiceCardGrid/ServiceCardGrid';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceRelatedServicesSection.module.scss';

interface ServiceRelatedServicesSectionProps {
  relatedServices: RelatedServiceLinkItem[];
  appearance: ServiceSectionAppearance;
}

export default function ServiceRelatedServicesSection({
  relatedServices,
  appearance,
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
        eyebrow: 'Related services',
        title: 'Related excavation and hauling services',
        align: 'left',
      }}
    >
      <ServiceCardGrid className={classes.relatedServicesGrid}>
        {relatedServices.map((relatedService) => (
          <Link
            className={classes.relatedServiceCard}
            href={relatedService.href}
            key={relatedService.href}
          >
            <h3>{relatedService.title}</h3>
            <p>{relatedService.description}</p>
            <span className={classes.relatedServiceAction}>View Service</span>
          </Link>
        ))}
      </ServiceCardGrid>
    </ServiceSectionWrapper>
  );
}
