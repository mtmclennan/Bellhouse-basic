import SectionWrapper from '@/components/layout/SectionWrapper';
import { getWhyChooseIcon } from './visuals';
import classes from './ServiceAreaWhyChoose.module.scss';

type ServiceAreaWhyChooseProps = {
  heading?: string;
  intro?: string;
  items: string[];
};

export default function ServiceAreaWhyChoose({
  heading = 'Why choose Bellhouse',
  intro,
  items,
}: ServiceAreaWhyChooseProps) {
  return (
    <SectionWrapper
      className={classes.section}
      containerClassName={classes.container}
    >
      <h2 className={classes.heading}>{heading}</h2>
      {intro ? <p className={classes.intro}>{intro}</p> : null}
      <ol className={classes.list}>
        {items.map((item, index) => (
          <li className={classes.item} key={item}>
            <span className={classes.count}>0{index + 1}</span>
            <span className={classes.icon}>{getWhyChooseIcon(index)}</span>
            <p>{item}</p>
          </li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
