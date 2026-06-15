import Link from '@/components/SiteLink';

import type { ServiceContractorCtaSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceContractorCtaSection.module.scss';

interface ServiceContractorCtaSectionProps {
  section: ServiceContractorCtaSectionData;
  appearance: ServiceSectionAppearance;
}

export default function ServiceContractorCtaSection({
  appearance,
  section,
}: ServiceContractorCtaSectionProps) {
  if (!section.body && section.actions.length === 0) {
    return null;
  }

  const [primaryAction, secondaryAction] = section.actions;

  const sectionClassName = [
    classes.contractorCtaSection,
    appearance.backgroundVariant === 'dark'
      ? classes.contractorCtaSectionDark
      : classes.contractorCtaSectionLight,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ServiceSectionWrapper

      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={sectionClassName}
      containerClassName={classes.contractorGrid}
    >
      <div className={classes.copyPanel}>
        {section.eyebrow ? (
          <p className={classes.eyebrow}>{section.eyebrow}</p>
        ) : null}

        <h2>{section.heading}</h2>

        {section.body ? (
          <p className={classes.body}>{section.body}</p>
        ) : null}
      </div>

      {(primaryAction || secondaryAction) ? (
        <div className={classes.actions}>
          {primaryAction ? (
            <Link href={primaryAction.href} className={classes.btnPrimary}>
              {primaryAction.label}
            </Link>
          ) : null}
          {secondaryAction ? (
            <Link href={secondaryAction.href} className={classes.btnSecondary}>
              {secondaryAction.label}
            </Link>
          ) : null}
        </div>
      ) : null}
    </ServiceSectionWrapper>
  );
}
