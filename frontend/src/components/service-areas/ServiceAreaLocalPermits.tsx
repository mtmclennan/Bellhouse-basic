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

export default function ServiceAreaLocalPermits({
  heading,
  intro,
  disclaimer,
  items,
}: ServiceAreaLocalPermitsProps) {
  return (
    <SectionWrapper
      className={classes.section}
      containerClassName={classes.container}
    >
      <div className={classes.header}>
        <p className={classes.eyebrow}>Local planning & permits</p>
        <h2>{heading}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>

      <ul className={classes.list}>
        {items.map((item) => (
          <li className={classes.item} key={item.title}>
            <div className={classes.itemHead}>
              <h3>{item.title}</h3>
              <span className={classes.status}>{item.status}</span>
            </div>
            <p className={classes.description}>{item.description}</p>
            <div className={classes.meta}>
              <a
                href={item.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
              >
                {item.authority}
                <ArrowSquareOut size={16} weight="bold" />
              </a>
              <span className={classes.verified}>
                Last verified {item.lastVerified}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {disclaimer ? <p className={classes.disclaimer}>{disclaimer}</p> : null}
    </SectionWrapper>
  );
}
