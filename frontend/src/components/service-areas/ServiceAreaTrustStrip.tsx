import { MapPin, Shovel, Truck } from '@phosphor-icons/react/dist/ssr';
import classes from './ServiceAreaTrustStrip.module.scss';

type ServiceAreaTrustStripProps = {
  serviceLabels: string[];
  city: string;
  coverageNote?: string;
};

export default function ServiceAreaTrustStrip({
  serviceLabels,
  city,
  coverageNote,
}: ServiceAreaTrustStripProps) {
  return (
    <div className={classes.strip}>
      <div className={classes.container}>
        {serviceLabels.length > 0 ? (
          <span className={classes.item}>
            <Shovel size={18} weight="fill" />
            {serviceLabels.slice(0, 4).join(' · ')}
          </span>
        ) : null}
        <span className={classes.item}>
          <Truck size={18} weight="fill" />
          Excavation + trucking coordinated together
        </span>
        <span className={classes.item}>
          <MapPin size={18} weight="fill" />
          {coverageNote ?? `${city} & nearby communities`}
        </span>
      </div>
    </div>
  );
}
