import Link from 'next/link';

import type { ServiceFinalCtaSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceFinalCtaSection.module.scss';

interface ServiceFinalCtaSectionProps {
  section: ServiceFinalCtaSectionData;
  appearance: ServiceSectionAppearance;
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
  appearance,
  section,
}: ServiceFinalCtaSectionProps) {
  const [primaryAction, secondaryAction] = section.actions;

  if (!primaryAction) {
    return null;
  }

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
          <h2>{section.heading}</h2>
          <p className={classes.body}>{section.body}</p>

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
