import SectionWrapper from '@/components/layout/SectionWrapper';
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
      <div className={classes.intro}>
        <p className={classes.eyebrow}>Why Bellhouse</p>
        <h2 className={classes.heading}>{heading}</h2>
        {intro ? <p className={classes.introText}>{intro}</p> : null}
      </div>
      <ol className={classes.list}>
        {items.map((item, index) => (
          <li className={classes.item} key={item}>
            <span className={classes.count}>{String(index + 1).padStart(2, '0')}</span>
            <p>{item}</p>
          </li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
