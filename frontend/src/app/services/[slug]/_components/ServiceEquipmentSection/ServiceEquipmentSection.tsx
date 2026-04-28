import Image from 'next/image';
import { Gear } from '@phosphor-icons/react/dist/ssr';

import type { ServicePage } from '@/types/interfaces';
import type { ServiceEquipmentSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceEquipmentSection.module.scss';

interface ServiceEquipmentSectionProps {
  service: ServicePage;
  appearance: ServiceSectionAppearance;
  section?: ServiceEquipmentSectionData;
}

function getEquipmentRole(title: string, description: string) {
  const source = `${title} ${description}`.toLowerCase();

  if (
    source.includes('laser') ||
    source.includes('gps') ||
    source.includes('layout')
  ) {
    return 'Layout and grade control';
  }

  if (
    source.includes('truck') ||
    source.includes('haul') ||
    source.includes('delivery')
  ) {
    return 'Hauling support';
  }

  if (
    source.includes('tamper') ||
    source.includes('roller') ||
    source.includes('compact')
  ) {
    return 'Compaction support';
  }

  if (
    source.includes('dozer') ||
    source.includes('skid steer') ||
    source.includes('grading')
  ) {
    return 'Site shaping support';
  }

  if (source.includes('excavator') || source.includes('excavat')) {
    return 'Excavation support';
  }

  return 'Job-site support';
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

  const items = (section?.items ?? service.equipment?.items ?? []).map((item) => {
    const isV2Item = 'name' in item;

    return {
      title: isV2Item ? item.name : item.title,
      description: isV2Item ? item.body : item.description,
      imageSrc: isV2Item ? item.image?.src : item.icon,
      imageAlt: isV2Item ? item.image?.alt ?? item.name : item.title,
    };
  });

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
        align: 'left',
        className: classes.heading,
      }}
    >
      <div className={classes.equipmentGrid}>
        {items.map((item, index) => (
          <article key={item.title} className={classes.equipmentItem}>
            <div className={classes.itemTopRow}>
              <div className={classes.equipmentIcon}>
                {item.imageSrc ? (
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    width={112}
                    height={112}
                    sizes="112px"
                  />
                ) : (
                  <Gear size={34} weight="fill" />
                )}
              </div>

              <div className={classes.eqText}>
                <p className={classes.itemRole}>
                  {getEquipmentRole(item.title, item.description)}
                </p>
                <h3>{item.title}</h3>
              </div>

              <span className={classes.itemIndex} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <p className={classes.itemDescription}>{item.description}</p>
          </article>
        ))}
      </div>
    </ServiceSectionWrapper>
  );
}
