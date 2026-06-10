import Image from 'next/image';
import Link from '@/components/SiteLink';
import { MapPin } from '@phosphor-icons/react/dist/ssr';
import SectionWrapper from '@/components/layout/SectionWrapper';
import type { ServiceAreaMap } from '@/lib/serviceAreas';
import { defaultMapContent } from './visuals';
import classes from './ServiceAreaNearbyAreas.module.scss';

type NearbyArea = string | { label: string; href: string };

type ServiceAreaNearbyAreasProps = {
  heading?: string;
  items: NearbyArea[];
  city?: string;
  map?: ServiceAreaMap;
};

function getAreaKey(item: NearbyArea) {
  return typeof item === 'string' ? item : `${item.label}-${item.href}`;
}

function getAreaLabel(item: NearbyArea) {
  return typeof item === 'string' ? item : item.label;
}

export default function ServiceAreaNearbyAreas({
  heading = 'Nearby areas',
  items,
  city,
  map,
}: ServiceAreaNearbyAreasProps) {
  const mapContent = map ?? defaultMapContent;

  return (
    <SectionWrapper containerClassName={classes.container}>
      <div className={classes.content}>
        <div className={classes.mapCard}>
          {mapContent.image ? (
            <div className={classes.mapImageFrame}>
              <Image
                src={mapContent.image.src}
                alt={mapContent.image.alt}
                width={mapContent.image.width ?? 1600}
                height={mapContent.image.height ?? 1200}
                className={classes.mapImage}
                sizes="(max-width: 1000px) 100vw, 40vw"
              />
              <div className={classes.mapOverlay} />
            </div>
          ) : null}
          <div className={classes.mapCopy}>
            <p className={classes.eyebrow}>
              {mapContent.eyebrow ?? defaultMapContent.eyebrow}
            </p>
            <h2 className={classes.heading}>{heading}</h2>
            <h3>{mapContent.title ?? defaultMapContent.title}</h3>
            <p>
              {city
                ? `If your job sits just outside ${city}, these nearby pages may match the ground conditions, access, and trucking setup more closely.`
                : 'If your job sits between service areas, these nearby pages may be the closer match for site conditions and trucking access.'}
            </p>
            <p>{mapContent.description ?? defaultMapContent.description}</p>
            <div className={classes.pinRow}>
              {items.slice(0, 5).map((item) =>
                typeof item === 'string' ? (
                  <span className={classes.pin} key={getAreaKey(item)}>
                    <MapPin size={16} weight="fill" />
                    {getAreaLabel(item)}
                  </span>
                ) : (
                  <Link className={classes.pin} href={item.href} key={getAreaKey(item)}>
                    <MapPin size={16} weight="fill" />
                    {getAreaLabel(item)}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
        <ul className={classes.list}>
          {items.map((item) => (
            <li className={classes.item} key={getAreaKey(item)}>
              {typeof item === 'string' ? (
                <span>
                  <MapPin size={18} weight="fill" />
                  {item}
                </span>
              ) : (
                <Link href={item.href}>
                  <MapPin size={18} weight="fill" />
                  See {item.label} excavation and site work
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
