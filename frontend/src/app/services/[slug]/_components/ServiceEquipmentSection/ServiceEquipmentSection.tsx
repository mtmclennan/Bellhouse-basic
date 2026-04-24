import Image from 'next/image';
import { Gear } from '@phosphor-icons/react/dist/ssr';

import type { ServicePage } from '@/types/interfaces';
import type { ServiceEquipmentSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceCardGrid from '../primitives/ServiceCardGrid/ServiceCardGrid';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceEquipmentSection.module.scss';

interface ServiceEquipmentSectionProps {
  service: ServicePage;
  appearance: ServiceSectionAppearance;
  section?: ServiceEquipmentSectionData;
}

export default function ServiceEquipmentSection({
  service,
  appearance,
  section,
}: ServiceEquipmentSectionProps) {
  if (!service.equipment && !section) {
    return null;
  }

  const equipmentSectionClassName = [
    classes.equipmentSection,
    appearance.backgroundVariant === 'dark'
      ? classes.equipmentSectionDark
      : classes.equipmentSectionLight,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ServiceSectionWrapper
      spacing="8"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={equipmentSectionClassName}
      containerClassName={classes.equipmentShell}
      heading={{
        title: section?.heading ?? service.equipment?.heading ?? '',
        subtext: section?.subheading ?? service.equipment?.subheading,
        align: 'center',
        className: classes.heading,
      }}
    >
      <ServiceCardGrid className={classes.equipmentGrid}>
        {(section?.items ?? service.equipment?.items ?? []).map((item) => {
          const isV2Item = 'name' in item;
          const title = isV2Item ? item.name : item.title;
          const description = isV2Item ? item.body : item.description;
          const imageSrc = isV2Item ? item.image?.src : item.icon;
          const imageAlt = isV2Item ? item.image?.alt ?? title : title;

          return (
            <div key={title} className={classes.equipmentItem}>
              <div className={classes.equipmentIcon}>
                {imageSrc ? (
                  <Image src={imageSrc} alt={imageAlt} width={150} height={150} />
                ) : (
                  <Gear size={40} weight="fill" />
                )}
              </div>

              <div className={classes.eqText}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </ServiceCardGrid>
    </ServiceSectionWrapper>
  );
}
