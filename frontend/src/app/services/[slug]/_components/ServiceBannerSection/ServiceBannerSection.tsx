import Image from 'next/image';
import Link from '@/components/SiteLink';

import type { ServiceBannerSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import classes from './ServiceBannerSection.module.scss';

interface ServiceBannerSectionProps {
  section: ServiceBannerSectionData;
  appearance: ServiceSectionAppearance;
}

export default function ServiceBannerSection({
  section,
}: ServiceBannerSectionProps) {
  const [primaryAction, secondaryAction] = section.actions;

  if (!primaryAction) {
    return null;
  }

  return (
    <section className={classes.banner}>
      <div className={classes.bannerBg} aria-hidden="true">
        <Image
          src={section.image.src}
          alt={section.image.alt}
          fill
          className={classes.bannerImg}
          sizes="100vw"
        />
        <div className={classes.bannerScrim} />
      </div>

      <div className={classes.bannerContainer}>
        <div className={classes.bannerInner}>
          {section.eyebrow ? (
            <p className={classes.eyebrow}>{section.eyebrow}</p>
          ) : null}

          {section.heading ? (
            <h2 className={classes.heading}>{section.heading}</h2>
          ) : null}

          {section.body ? (
            <p className={classes.body}>{section.body}</p>
          ) : null}

          {section.bullets && section.bullets.length > 0 ? (
            <ul className={classes.bulletList} aria-label="Key highlights">
              {section.bullets.map((bullet) => (
                <li key={bullet} className={classes.bulletItem}>
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}

          <div className={classes.actions}>
            <Link href={primaryAction.href} className={classes.primaryBtn}>
              {primaryAction.label}
            </Link>
            {secondaryAction ? (
              <Link href={secondaryAction.href} className={classes.secondaryBtn}>
                {secondaryAction.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
