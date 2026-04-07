import Image from 'next/image';
import Link from 'next/link';
import SectionWrapper from '@/components/layout/SectionWrapper';
import type { ServiceAreaService } from '@/lib/serviceAreas';
import { getServiceAreaServiceIcon } from './visuals';
import classes from './ServiceAreaServices.module.scss';

type ServiceAreaServicesProps = {
  heading?: string;
  items: ServiceAreaService[];
  city?: string;
  children?: React.ReactNode;
};

export default function ServiceAreaServices({
  heading = 'Services',
  items,
  city,
  children,
}: ServiceAreaServicesProps) {
  return (
    <SectionWrapper
      className={classes.section}
      containerClassName={classes.container}
    >
      <div className={classes.header}>
        <h2 className={classes.heading}>{heading}</h2>
        {children ? (
          <div className={classes.supportingCopy}>{children}</div>
        ) : null}
      </div>
      <div className={classes.grid}>
        {items.map((item) => (
          <article className={classes.card} key={item.title}>
            {item.image ? (
              <div className={classes.imageFrame}>
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width ?? 1600}
                  height={item.image.height ?? 1200}
                  className={classes.image}
                  sizes="(max-width: 1000px) 100vw, 33vw"
                />
                <div className={classes.iconBadge}>
                  {getServiceAreaServiceIcon(item.slug)}
                </div>
              </div>
            ) : null}
            <div className={classes.cardCopy}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link className={classes.serviceLink} href={item.coreServiceHref}>
                {city
                  ? `See how Bellhouse handles ${item.title.toLowerCase()} in ${city}`
                  : 'See the related excavation service'}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
