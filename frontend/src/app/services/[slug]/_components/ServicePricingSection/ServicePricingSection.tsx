import Link from '@/components/SiteLink';

import type { ServicePricingFactorsSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServicePricingSection.module.scss';

interface ServicePricingSectionProps {
  section: ServicePricingFactorsSectionData;
  appearance: ServiceSectionAppearance;
}

export default function ServicePricingSection({
  section,
  appearance,
}: ServicePricingSectionProps) {
  if (!section.factors.length) {
    return null;
  }

  const isDark = appearance.backgroundVariant === 'dark';

  const sectionClassName = [
    classes.pricingSection,
    isDark ? classes.pricingSectionDark : classes.pricingSectionLight,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ServiceSectionWrapper
      spacing="8"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={sectionClassName}
      containerClassName={classes.pricingShell}
      heading={{
        eyebrow: section.eyebrow ?? 'What affects price',
        title: section.heading ?? '',
        subtext: section.body ?? section.subheading,
        align: 'left',
      }}
    >
      {section.tiers && section.tiers.length > 0 ? (
        <div className={classes.rangeBar} aria-label="Project complexity range">
          <p className={classes.rangeEyebrow}>Where your job typically sits</p>
          <div className={classes.rangeTrack} aria-hidden="true">
            <div className={classes.rangeFill} />
          </div>
          <div className={classes.rangeEnds} aria-hidden="true">
            <span>Simpler jobs</span>
            <span>More complex jobs</span>
          </div>
          <div className={classes.rangeTiers}>
            {section.tiers.map((tier) => (
              <div
                key={tier.name}
                className={[
                  classes.rangeTier,
                  tier.position === 'mid' ? classes.rangeTierHighlighted : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div className={classes.rangeTierName}>{tier.name}</div>
                <div className={classes.rangeTierExample}>{tier.eg}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className={classes.pricingGrid}>
        <div className={classes.factorsList}>
          {section.factors.map((factor, index) => (
            <div key={factor.title} className={classes.factorItem}>
              <span className={classes.factorNum} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className={classes.factorBody}>
                <h3>{factor.title}</h3>
                <p>{factor.body}</p>
              </div>
            </div>
          ))}
        </div>

        {section.aside ? (
          <aside className={classes.pricingAside}>
            {section.aside.label ? (
              <p className={classes.asideLabel}>{section.aside.label}</p>
            ) : null}
            <h3>{section.aside.heading}</h3>
            <p className={classes.asideBody}>{section.aside.body}</p>
            {section.aside.action ? (
              <Link href={section.aside.action.href} className={classes.asideBtn}>
                {section.aside.action.label}
              </Link>
            ) : null}
            {section.aside.phone ? (
              <p className={classes.asideOr}>
                or call <Link href={section.aside.phone.href}>{section.aside.phone.label}</Link>
              </p>
            ) : null}
          </aside>
        ) : null}
      </div>
    </ServiceSectionWrapper>
  );
}
