import SectionWrapper from '@/components/layout/SectionWrapper';
import { getAudienceIcon } from './visuals';
import classes from './ServiceAreaWhoWeWorkWith.module.scss';

type ServiceAreaWhoWeWorkWithProps = {
  heading?: string;
  items: string[];
};

export default function ServiceAreaWhoWeWorkWith({
  heading = 'Who we work with',
  items,
}: ServiceAreaWhoWeWorkWithProps) {
  return (
    <SectionWrapper containerClassName={classes.container}>
      <div className={classes.content}>
        <h2 className={classes.heading}>{heading}</h2>
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
