import SectionWrapper from '@/components/layout/SectionWrapper';
import type { ServiceAreaCondition } from '@/lib/serviceAreas';
import { getConditionIcon } from './visuals';
import classes from './ServiceAreaLocalConditions.module.scss';

type ServiceAreaLocalConditionsProps = {
  heading: string;
  intro?: string;
  items: ServiceAreaCondition[];
};

export default function ServiceAreaLocalConditions({
  heading,
  intro,
  items,
}: ServiceAreaLocalConditionsProps) {
  return (
    <SectionWrapper
      className={classes.section}
      containerClassName={classes.container}
    >
      <div className={classes.header}>
        <p className={classes.eyebrow}>Local excavation conditions</p>
        <h2>{heading}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>

      <div className={classes.grid}>
        {items.map((item) => (
          <article className={classes.card} key={item.kind}>
            <span className={classes.icon}>{getConditionIcon(item.kind)}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
