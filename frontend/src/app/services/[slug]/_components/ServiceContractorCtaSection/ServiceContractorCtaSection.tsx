import Link from 'next/link';

import type { ResolvedServiceContractorCtaConfig } from '@/lib/servicePageLayout';
import type { ServiceContractorCtaSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceContractorCtaSection.module.scss';

interface ServiceContractorCtaSectionProps {
  contractorCta: ResolvedServiceContractorCtaConfig | null;
  appearance: ServiceSectionAppearance;
  section?: ServiceContractorCtaSectionData;
}

function hasAction(
  action: ResolvedServiceContractorCtaConfig['primaryAction'] | undefined,
): action is NonNullable<ResolvedServiceContractorCtaConfig['primaryAction']> {
  return Boolean(action?.label && action?.href);
}

export default function ServiceContractorCtaSection({
  contractorCta,
  appearance,
  section,
}: ServiceContractorCtaSectionProps) {
  if (!contractorCta && !section) {
    return null;
  }

  const actions =
    section?.actions.map((action) => ({
      label: action.label,
      href: action.href,
    })) ?? [
      contractorCta?.primaryAction,
      contractorCta?.secondaryAction,
    ].filter(hasAction);

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
        eyebrow: section?.eyebrow ?? contractorCta?.eyebrow,
        title: section?.heading ?? contractorCta?.title,
        subtext: section?.body ?? contractorCta?.description,
        align: 'center',
      }}
    >
      <div className={classes.contractorActions}>
        {actions.map((action, index) => (
          <Link
            key={`${action.href}-${action.label}`}
            href={action.href}
            className={index === 0 ? classes.btn : classes.btnSecondary}
          >
            {action.label}
          </Link>
        ))}
      </div>
    </ServiceSectionWrapper>
  );
}
