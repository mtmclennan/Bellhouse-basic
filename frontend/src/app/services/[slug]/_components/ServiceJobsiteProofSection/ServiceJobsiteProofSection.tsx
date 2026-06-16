import Image from 'next/image';
import { Camera } from '@phosphor-icons/react/dist/ssr';

import type { ServiceJobsiteProofSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import classes from './ServiceJobsiteProofSection.module.scss';

interface ServiceJobsiteProofSectionProps {
  section: ServiceJobsiteProofSectionData;
  appearance: ServiceSectionAppearance;
}

export default function ServiceJobsiteProofSection({
  section,
}: ServiceJobsiteProofSectionProps) {
  return (
    <section className={classes.section}>
      <div className={classes.bg}>
        <Image
          src={section.image.src}
          alt={section.image.alt}
          fill
          className={classes.bgImage}
          sizes="100vw"
        />
        <div className={classes.scrim} aria-hidden="true" />
      </div>

      <div className={classes.container}>
        <div className={classes.inner}>
          {section.eyebrow ? (
            <span className={classes.eyebrow}>{section.eyebrow}</span>
          ) : null}
          <h2 className={classes.heading}>{section.heading}</h2>
          {section.body ? (
            <p className={classes.body}>{section.body}</p>
          ) : null}
          {section.caption ? (
            <span className={classes.caption}>
              <Camera size={13} weight="fill" aria-hidden />
              {section.caption}
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
