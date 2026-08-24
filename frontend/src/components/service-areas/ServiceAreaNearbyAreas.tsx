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
    <SectionWrapper className={classes.section} containerClassName={classes.container}>
      <div className={classes.content}>
        <div className={classes.imageCard}>
          {mapContent.image ? (
            <Image
              src={mapContent.image.src}
              alt={mapContent.image.alt}
              width={mapContent.image.width ?? 1200}
              height={mapContent.image.height ?? 1200}
              className={classes.image}
              sizes="(max-width: 1000px) 100vw, 40vw"
            />
          ) : null}
          <div className={classes.imageOverlay} />
          <div className={classes.imageCopy}>
            <p className={classes.eyebrow}>{mapContent.eyebrow ?? defaultMapContent.eyebrow}</p>
            <p>
              {city
                ? `If your job sits just outside ${city}, the nearest area page is usually the closer match for access, haul-out, and site conditions.`
                : 'If your job sits between service areas, the nearest area page is usually the closer match for site conditions and trucking access.'}
            </p>
          </div>
        </div>
        <div className={classes.listBlock}>
          <h2 className={classes.heading}>{heading}</h2>
          <div className={classes.grid}>
            {items.map((item) =>
              typeof item === 'string' ? (
                <span className={classes.comingSoon} key={getAreaKey(item)}>
                  <MapPin size={20} />
                  {item} — page coming soon
                </span>
              ) : (
                <Link className={classes.pill} href={item.href} key={getAreaKey(item)}>
                  <MapPin size={20} weight="fill" />
                  See {getAreaLabel(item)} excavation and site work
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
