import { Star } from '@phosphor-icons/react/dist/ssr';

import type { ServicePage } from '@/types/interfaces';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceIntroSection.module.scss';

interface ServiceIntroSectionProps {
  service: ServicePage;
  appearance: ServiceSectionAppearance;
}

export default function ServiceIntroSection({
  service,
  appearance,
}: ServiceIntroSectionProps) {
  return (
    <ServiceSectionWrapper
      spacing="6"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      containerClassName={classes.introShell}
      heading={{
        title: service.intro.heading,
        align: 'center',
      }}
    >
      <div className={classes.introContent}>
        <p>{service.intro.content}</p>

        <ul>
          {service.intro.keypoints.map((point) => (
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
