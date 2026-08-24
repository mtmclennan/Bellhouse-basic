import Link from '@/components/SiteLink';
import SectionWrapper from '@/components/layout/SectionWrapper';
import type { ServiceAreaProjectType } from '@/lib/serviceAreas';
import { getProjectTypeIcon } from './visuals';
import classes from './ServiceAreaProjectTypes.module.scss';

type ServiceAreaProjectTypesProps = {
  heading: string;
  intro?: string;
  items: ServiceAreaProjectType[];
};

export default function ServiceAreaProjectTypes({
  heading,
  intro,
  items,
}: ServiceAreaProjectTypesProps) {
  return (
    <SectionWrapper
      className={classes.section}
      containerClassName={classes.container}
    >
      <div className={classes.header}>
        <p className={classes.eyebrow}>Common projects</p>
        <h2>{heading}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>

      <div className={classes.grid}>
        {items.map((item, index) => (
          <article className={classes.card} key={item.title}>
            <span className={classes.icon}>{getProjectTypeIcon(index)}</span>
            <div className={classes.cardCopy}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.links?.length ? (
                <div className={classes.links}>
                  {item.links.map((link) => (
                    <Link href={link.href} key={`${item.title}-${link.href}`}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
