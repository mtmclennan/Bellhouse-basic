import Image from 'next/image';
import Link from 'next/link';

import type { ServiceContractorCtaSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceContractorCtaSection.module.scss';

interface ServiceContractorCtaSectionProps {
  section: ServiceContractorCtaSectionData;
  appearance: ServiceSectionAppearance;
}

const nextSteps = [
  'Send the site details',
  'Get a practical quote',
  'Schedule equipment and trucking',
];

export default function ServiceContractorCtaSection({
  appearance,
  section,
}: ServiceContractorCtaSectionProps) {
  if (!section.body && section.actions.length === 0) {
    return null;
  }

  const hasMedia = Boolean(section.image?.src);
  const actions = section.actions.map((action) => ({
    label: action.label,
    href: action.href,
  }));

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
          {section.eyebrow ? (
            <p className={classes.eyebrow}>{section.eyebrow}</p>
          ) : null}

          <h2>{section.heading}</h2>

          {section.body ? <p className={classes.body}>{section.body}</p> : null}

          {actions.length > 0 ? (
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
          ) : null}

          <ul className={classes.nextSteps} aria-label="What happens next">
            {nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>

        {section.image?.src ? (
          <aside
            className={classes.mediaPanel}
            aria-label="Contractor support image"
          >
            <div className={classes.imageFrame}>
              <Image
                src={section.image.src}
                alt={section.image.alt}
                fill
                className={classes.image}
                sizes="(max-width: 1000px) 100vw, 38vw"
              />

              <div className={classes.imageOverlay} aria-hidden="true" />
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
