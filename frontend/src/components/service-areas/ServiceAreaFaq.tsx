import { Question } from '@phosphor-icons/react/dist/ssr';
import SectionWrapper from '@/components/layout/SectionWrapper';
import classes from './ServiceAreaFaq.module.scss';

type ServiceAreaFaqItem = {
  question: string;
  answer: string;
};

type ServiceAreaFaqProps = {
  heading?: string;
  items: ServiceAreaFaqItem[];
};

export default function ServiceAreaFaq({
  heading = 'Frequently asked questions',
  items,
}: ServiceAreaFaqProps) {
  return (
    <SectionWrapper
      className={classes.section}
      containerClassName={classes.container}
    >
      <div className={classes.header}>
        <span className={classes.icon}>
          <Question size={26} weight="fill" />
        </span>
        <h2 className={classes.heading}>{heading}</h2>
      </div>
      <dl className={classes.list}>
        {items.map((item) => (
          <div className={classes.item} key={item.question}>
            <dt className={classes.question}>{item.question}</dt>
            <dd className={classes.answer}>{item.answer}</dd>
          </div>
        ))}
      </dl>
    </SectionWrapper>
  );
}
