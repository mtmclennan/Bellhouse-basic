import { Star } from '@phosphor-icons/react/dist/ssr';

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
  return (
    <ServiceSectionWrapper
      spacing="6"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      containerClassName={classes.introShell}
      heading={{
        title: section?.heading ?? service.intro.heading,
        align: 'center',
      }}
    >
      <div className={classes.introContent}>
        <p>{section?.body ?? service.intro.content}</p>

        <ul>
          {(section?.bullets ?? service.intro.keypoints).map((point) => (
            <li key={point}>
              <Star size={24} color="#ffc302" weight="fill" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </ServiceSectionWrapper>
  );
}
