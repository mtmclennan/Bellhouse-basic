import type { ServiceAreaGlanceItem } from '@/lib/serviceAreas';
import { getGlanceIcon } from './visuals';
import classes from './ServiceAreaAtAGlance.module.scss';

type ServiceAreaAtAGlanceProps = {
  heading?: string;
  subheading?: string;
  city: string;
  items: ServiceAreaGlanceItem[];
};

export default function ServiceAreaAtAGlance({
  heading,
  subheading = 'What this page covers, before you scroll',
  city,
  items,
}: ServiceAreaAtAGlanceProps) {
  return (
    <div className={classes.card}>
      <div className={classes.cardHead}>
        <h2 className={classes.heading}>{heading ?? `${city} at a glance`}</h2>
        <p className={classes.subheading}>{subheading}</p>
      </div>
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
  );
}
