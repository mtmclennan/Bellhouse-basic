import SectionWrapper from '@/components/layout/SectionWrapper';
import { getAudienceIcon } from './visuals';
import classes from './ServiceAreaWhoWeWorkWith.module.scss';

type ServiceAreaWhoWeWorkWithProps = {
  heading?: string;
  intro?: string;
  items: string[];
};

export default function ServiceAreaWhoWeWorkWith({
  heading = 'Who we work with',
  intro,
  items,
}: ServiceAreaWhoWeWorkWithProps) {
  return (
    <SectionWrapper
      className={classes.section}
      containerClassName={classes.container}
    >
      <div className={classes.content}>
        <p className={classes.eyebrow}>Clients</p>
        <h2 className={classes.heading}>{heading}</h2>
        {intro ? <p className={classes.intro}>{intro}</p> : null}
        <ul className={classes.list}>
          {items.map((item, index) => (
            <li className={classes.item} key={item}>
              <span className={classes.icon}>{getAudienceIcon(index)}</span>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
