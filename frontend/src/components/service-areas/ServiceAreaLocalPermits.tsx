import { ArrowSquareOut } from '@phosphor-icons/react/dist/ssr';
import SectionWrapper from '@/components/layout/SectionWrapper';
import type { ServiceAreaPermit } from '@/lib/serviceAreas';
import classes from './ServiceAreaLocalPermits.module.scss';

type ServiceAreaLocalPermitsProps = {
  heading: string;
  intro?: string;
  disclaimer?: string;
  items: ServiceAreaPermit[];
};

function getLastVerified(items: ServiceAreaPermit[]) {
  return items.reduce<string | undefined>((latest, item) => {
    if (!item.lastVerified) return latest;
    if (!latest || item.lastVerified > latest) return item.lastVerified;
    return latest;
  }, undefined);
}

export default function ServiceAreaLocalPermits({
  heading,
  intro,
  disclaimer,
  items,
}: ServiceAreaLocalPermitsProps) {
  const lastVerified = getLastVerified(items);

  return (
    <SectionWrapper
      className={classes.section}
      containerClassName={classes.container}
    >
      <div className={classes.header}>
        <p className={classes.eyebrow}>Planning &amp; approvals</p>
        <h2>{heading}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>

      <div className={classes.grid}>
        {items.map((item) => (
          <div className={classes.item} key={item.title}>
            <span className={classes.status}>{item.status}</span>
            <h3>{item.title}</h3>
            <p className={classes.description}>{item.description}</p>
            <a
              href={item.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              <span>{item.authority}</span>
              <ArrowSquareOut size={16} weight="bold" />
            </a>
          </div>
        ))}
      </div>

      <div className={classes.footer}>
        {disclaimer ? <p className={classes.disclaimer}>{disclaimer}</p> : null}
        {lastVerified ? (
          <span className={classes.verified}>Links last verified {lastVerified}</span>
        ) : null}
      </div>
    </SectionWrapper>
  );
}
