import Image from 'next/image';
import SectionWrapper from '@/components/layout/SectionWrapper';
import type { ServiceAreaCondition, ServiceAreaImage } from '@/lib/serviceAreas';
import { getConditionIcon } from './visuals';
import classes from './ServiceAreaLocalConditions.module.scss';

type ServiceAreaLocalConditionsProps = {
  heading: string;
  intro?: string;
  items: ServiceAreaCondition[];
  image?: ServiceAreaImage;
};

export default function ServiceAreaLocalConditions({
  heading,
  intro,
  items,
  image,
}: ServiceAreaLocalConditionsProps) {
  return (
    <SectionWrapper
      className={classes.section}
      containerClassName={classes.container}
    >
      <div className={classes.layout}>
        <div className={classes.intro}>
          <p className={classes.eyebrow}>Site conditions</p>
          <h2>{heading}</h2>
          {intro ? <p>{intro}</p> : null}
          {image ? (
            <div className={classes.imageFrame}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width ?? 1200}
                height={image.height ?? 900}
                className={classes.image}
                sizes="(max-width: 1000px) 100vw, 32vw"
              />
            </div>
          ) : null}
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
      </div>
    </SectionWrapper>
  );
}
