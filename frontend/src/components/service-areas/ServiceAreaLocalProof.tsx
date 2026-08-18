import Image from 'next/image';
import Link from '@/components/SiteLink';
import SectionWrapper from '@/components/layout/SectionWrapper';
import type { ServiceAreaLocalProofItem } from '@/lib/serviceAreas';
import classes from './ServiceAreaLocalProof.module.scss';

type ServiceAreaLocalProofProps = {
  heading: string;
  intro?: string;
  items: ServiceAreaLocalProofItem[];
};

export default function ServiceAreaLocalProof({
  heading,
  intro,
  items,
}: ServiceAreaLocalProofProps) {
  return (
    <SectionWrapper
      className={classes.section}
      containerClassName={classes.container}
    >
      <div className={classes.header}>
        <p className={classes.eyebrow}>Local project proof</p>
        <h2>{heading}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>

      <div className={classes.grid}>
        {items.map((item) => (
          <article className={classes.card} key={item.title}>
            <div className={classes.imageFrame}>
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width ?? 1200}
                height={item.image.height ?? 900}
                className={classes.image}
                sizes="(max-width: 1000px) 100vw, 33vw"
              />
            </div>
            <div className={classes.cardCopy}>
              <h3>{item.title}</h3>
              <p className={classes.location}>{item.location}</p>
              <p>{item.scope}</p>
              <Link className={classes.link} href={item.relatedServiceHref}>
                {item.relatedServiceLabel}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
