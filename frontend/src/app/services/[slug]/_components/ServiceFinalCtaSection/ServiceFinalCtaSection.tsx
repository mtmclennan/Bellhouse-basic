import Link from 'next/link';

import type { ResolvedServiceFinalCtaConfig } from '@/lib/servicePageLayout';
import type { ServiceFinalCtaSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceFinalCtaSection.module.scss';

interface ServiceFinalCtaSectionProps {
  finalCtaConfig: ResolvedServiceFinalCtaConfig;
  appearance: ServiceSectionAppearance;
  section?: ServiceFinalCtaSectionData;
}

function getPrimaryAction(
  section: ServiceFinalCtaSectionData | undefined,
  finalCtaConfig: ResolvedServiceFinalCtaConfig,
) {
  if (section?.actions?.[0]) {
    return {
      label: section.actions[0].label,
      href: section.actions[0].href,
    };
  }

  return finalCtaConfig.primaryAction;
}

function getSecondaryAction(
  section: ServiceFinalCtaSectionData | undefined,
  finalCtaConfig: ResolvedServiceFinalCtaConfig,
) {
  if (section?.actions?.[1]) {
    return {
      label: section.actions[1].label,
      href: section.actions[1].href,
    };
  }

  return finalCtaConfig.secondaryAction;
}

function getSupportChips(
  primaryActionLabel: string,
  secondaryActionLabel?: string,
) {
  const chips = ['Project details reviewed before scheduling'];

  if (/estimate|quote|contact/i.test(primaryActionLabel)) {
    chips.unshift('Clear next step for pricing and scheduling');
  }

  if (secondaryActionLabel && /contractor|project/i.test(secondaryActionLabel)) {
    chips.push('Homeowners, builders, and contractors welcome');
  }

  return chips.slice(0, 3);
}

export default function ServiceFinalCtaSection({
  finalCtaConfig,
  appearance,
  section,
}: ServiceFinalCtaSectionProps) {
  const primaryAction = getPrimaryAction(section, finalCtaConfig);
  const secondaryAction = getSecondaryAction(section, finalCtaConfig);
  const supportChips = getSupportChips(
    primaryAction.label,
    secondaryAction?.label,
  );

  const sectionClassName = [
    classes.finalCtaSection,
    appearance.backgroundVariant === 'dark'
      ? classes.finalCtaSectionDark
      : classes.finalCtaSectionLight,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ServiceSectionWrapper
      spacing="6"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={sectionClassName}
      containerClassName={classes.finalCtaShell}
    >
      <div className={classes.finalCtaCard}>
        <div className={classes.content}>
          <p className={classes.eyebrow}>Ready to get Bellhouse involved?</p>
          <h2>{section?.heading ?? finalCtaConfig.heading}</h2>
          <p className={classes.body}>
            {section?.body ?? finalCtaConfig.subheading}
          </p>

          <div className={classes.supportChips}>
            {supportChips.map((chip) => (
              <span className={classes.supportChip} key={chip}>
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className={classes.actionPanel}>
          <Link className={classes.primaryAction} href={primaryAction.href}>
            {primaryAction.label}
          </Link>

          {secondaryAction ? (
            <Link className={classes.secondaryAction} href={secondaryAction.href}>
              {secondaryAction.label}
            </Link>
          ) : null}

          <p className={classes.note}>
            Tell Bellhouse the location, scope, and timing, and the next step can
            be reviewed clearly before scheduling.
          </p>
        </div>
      </div>
    </ServiceSectionWrapper>
  );
}
