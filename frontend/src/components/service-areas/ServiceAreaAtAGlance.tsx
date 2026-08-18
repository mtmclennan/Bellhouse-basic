import SectionWrapper from '@/components/layout/SectionWrapper';
import type { ServiceAreaGlanceItem } from '@/lib/serviceAreas';
import { getGlanceIcon } from './visuals';
import classes from './ServiceAreaAtAGlance.module.scss';

type ServiceAreaAtAGlanceProps = {
  heading?: string;
  city: string;
  items: ServiceAreaGlanceItem[];
};

export default function ServiceAreaAtAGlance({
  heading,
  city,
  items,
}: ServiceAreaAtAGlanceProps) {
  return (
    <SectionWrapper
      className={classes.section}
      containerClassName={classes.container}
      spacing="tight"
    >
      <div className={classes.card}>
        <h2 className={classes.heading}>
          {heading ?? `${city} at a glance`}
        </h2>
        <dl className={classes.grid}>
          {items.map((item) => (
            <div className={classes.item} key={item.kind}>
              <span className={classes.icon}>{getGlanceIcon(item.kind)}</span>
              <div>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </SectionWrapper>
  );
}
