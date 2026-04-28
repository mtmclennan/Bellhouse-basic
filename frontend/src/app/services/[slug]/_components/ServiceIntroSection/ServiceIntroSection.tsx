import type { ServicePage } from '@/types/interfaces';
import type { ServiceIntroSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceIntroSection.module.scss';

interface ServiceIntroSectionProps {
  service: ServicePage;
  appearance: ServiceSectionAppearance;
  section?: ServiceIntroSectionData;
}

export default function ServiceIntroSection({
  service,
  appearance,
  section,
}: ServiceIntroSectionProps) {
  const heading = section?.heading ?? service.intro.heading;
  const body = section?.body ?? service.intro.content;
  const bullets = section?.bullets ?? service.intro.keypoints;

  return (
    <ServiceSectionWrapper
      spacing="6"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      containerClassName={classes.introShell}
    >
      <div className={classes.introLayout}>
        <div className={classes.introCopy}>
          <p className={classes.eyebrow}>Service overview</p>
          <h2>{heading}</h2>
          <p className={classes.body}>{body}</p>
        </div>

        {bullets.length > 0 ? (
          <aside
            className={classes.highlightPanel}
            aria-label="Service highlights"
          >
            <p className={classes.panelTitle}>What this includes</p>

            <ul className={classes.highlightList}>
              {bullets.map((point) => (
                <li key={point}>
                  <span className={classes.marker} aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </ServiceSectionWrapper>
  );
}
