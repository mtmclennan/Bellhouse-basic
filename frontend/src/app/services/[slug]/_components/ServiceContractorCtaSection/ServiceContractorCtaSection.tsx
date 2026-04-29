import Image from 'next/image';
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

  const hasMedia = Boolean(section?.image?.src);
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
    >
      <div
        className={`${classes.contractorPanel} ${
          hasMedia ? classes.contractorPanelWithMedia : ''
        }`}
      >
        <div className={classes.copyPanel}>
          {section?.eyebrow ?? contractorCta?.eyebrow ? (
            <p className={classes.eyebrow}>
              {section?.eyebrow ?? contractorCta?.eyebrow}
            </p>
          ) : null}

          <h2>{section?.heading ?? contractorCta?.title}</h2>
          <p className={classes.body}>
            {section?.body ?? contractorCta?.description}
          </p>

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
        </div>

        {section?.image?.src ? (
          <aside className={classes.mediaPanel} aria-label="Contractor support image">
            <div className={classes.imageFrame}>
              <Image
                src={section.image.src}
                alt={section.image.alt}
                width={1600}
                height={900}
                className={classes.image}
                sizes="(max-width: 1000px) 100vw, 38vw"
              />
            </div>

            {section.caption ? (
              <p className={classes.caption}>{section.caption}</p>
            ) : null}
          </aside>
        ) : null}
      </div>
    </ServiceSectionWrapper>
  );
}
