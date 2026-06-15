import Image from 'next/image';
import { Gear } from '@phosphor-icons/react/dist/ssr';

import type { ServiceEquipmentSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceEquipmentSection.module.scss';

interface ServiceEquipmentSectionProps {
  section: ServiceEquipmentSectionData;
  appearance: ServiceSectionAppearance;
}

export default function ServiceEquipmentSection({
  appearance,
  section,
}: ServiceEquipmentSectionProps) {
  if (!section.items.length) {
    return null;
  }

  const sectionClassName = [
    classes.equipmentSection,
    appearance.backgroundVariant === 'dark'
      ? classes.equipmentSectionDark
      : classes.equipmentSectionLight,
  ]
    .filter(Boolean)
    .join(' ');

  // Balance the grid by item count so the last row never orphans a single card:
  // 1-2 items fill their own row, 4 items lay out 2x2, everything else is 3-up.
  const itemCount = section.items.length;
  const columns = itemCount <= 2 ? itemCount : itemCount === 4 ? 2 : 3;

  return (
    <ServiceSectionWrapper
      spacing="8"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={sectionClassName}
      containerClassName={classes.equipmentShell}
      heading={{
        eyebrow: section.eyebrow,
        title: section.heading ?? '',
        subtext: section.subheading,
        align: 'left',
      }}
    >
      <div
        className={classes.equipmentGrid}
        style={{ ['--equip-cols' as string]: columns }}
      >
        {section.items.map((item) => (
          <article key={item.name} className={classes.equipmentCard}>
            <div className={classes.equipmentImg}>
              {item.image?.src ? (
                <Image
                  src={item.image.src}
                  alt={item.image.alt ?? item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 380px"
                  className={classes.equipmentPhoto}
                />
              ) : (
                <div className={classes.equipmentIconFallback}>
                  <Gear size={40} weight="fill" />
                </div>
              )}
            </div>

            <div className={classes.equipmentBody}>
              <h3>{item.name}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </ServiceSectionWrapper>
  );
}
