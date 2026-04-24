import Image from 'next/image';
import { Gear } from '@phosphor-icons/react/dist/ssr';

import type { ServicePage } from '@/types/interfaces';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceCardGrid from '../primitives/ServiceCardGrid/ServiceCardGrid';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceEquipmentSection.module.scss';

interface ServiceEquipmentSectionProps {
  service: ServicePage;
  appearance: ServiceSectionAppearance;
}

export default function ServiceEquipmentSection({
  service,
  appearance,
}: ServiceEquipmentSectionProps) {
  if (!service.equipment) {
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
        title: service.equipment.heading,
        subtext: service.equipment.subheading,
        align: 'center',
        className: classes.heading,
      }}
    >
      <ServiceCardGrid className={classes.equipmentGrid}>
        {service.equipment.items.map((item) => (
          <div key={item.title} className={classes.equipmentItem}>
            <div className={classes.equipmentIcon}>
              {item.icon ? (
                <Image src={item.icon} alt={item.title} width={150} height={150} />
              ) : (
                <Gear size={40} weight="fill" />
              )}
            </div>

            <div className={classes.eqText}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </ServiceCardGrid>
    </ServiceSectionWrapper>
  );
}
