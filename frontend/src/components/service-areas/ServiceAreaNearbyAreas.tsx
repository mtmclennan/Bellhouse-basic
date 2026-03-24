import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from '@phosphor-icons/react/dist/ssr';
import SectionWrapper from '@/components/layout/SectionWrapper';
import type { ServiceAreaMap } from '@/lib/serviceAreas';
import { defaultMapContent } from './visuals';
import classes from './ServiceAreaNearbyAreas.module.scss';

type NearbyArea = string | { label: string; href: string };

type ServiceAreaNearbyAreasProps = {
  heading?: string;
  items: NearbyArea[];
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
                fill
                className={classes.mapImage}
                sizes="(max-width: 1000px) 100vw, 40vw"
              />
              <div className={classes.mapOverlay} />
            </div>
          ) : null}
          <div className={classes.mapCopy}>
            <p className={classes.eyebrow}>{mapContent.eyebrow ?? defaultMapContent.eyebrow}</p>
            <h2 className={classes.heading}>{heading}</h2>
            <h3>{mapContent.title ?? defaultMapContent.title}</h3>
            <p>{mapContent.description ?? defaultMapContent.description}</p>
            <div className={classes.pinRow}>
              {items.slice(0, 5).map((item) => (
                <span className={classes.pin} key={getAreaKey(item)}>
                  <MapPin size={16} weight="fill" />
                  {getAreaLabel(item)}
                </span>
              ))}
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
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
