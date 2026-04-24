import Link from 'next/link';

import type { ResolvedServiceContractorCtaConfig } from '@/lib/servicePageLayout';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceContractorCtaSection.module.scss';

interface ServiceContractorCtaSectionProps {
  contractorCta: ResolvedServiceContractorCtaConfig | null;
  appearance: ServiceSectionAppearance;
}

export default function ServiceContractorCtaSection({
  contractorCta,
  appearance,
}: ServiceContractorCtaSectionProps) {
  if (!contractorCta) {
    return null;
  }

  const contractorSectionClassName = [
    classes.contractorCtaSection,
    appearance.backgroundVariant === 'dark'
      ? classes.contractorCtaSectionDark
      : classes.contractorCtaSectionLight,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ServiceSectionWrapper
      spacing="8"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={contractorSectionClassName}
      containerClassName={classes.contractorCtaShell}
      heading={{
        eyebrow: contractorCta.eyebrow,
        title: contractorCta.title,
        subtext: contractorCta.description,
        align: 'center',
      }}
    >
      <div className={classes.contractorActions}>
        <Link href={contractorCta.primaryAction.href} className={classes.btn}>
          {contractorCta.primaryAction.label}
        </Link>
        {contractorCta.secondaryAction ? (
          <Link
            href={contractorCta.secondaryAction.href}
            className={classes.btnSecondary}
          >
            {contractorCta.secondaryAction.label}
          </Link>
        ) : null}
      </div>
    </ServiceSectionWrapper>
  );
}
