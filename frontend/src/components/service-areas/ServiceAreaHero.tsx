import Image from 'next/image';
import { CheckCircle, MapPin } from '@phosphor-icons/react/dist/ssr';
import Link from '@/components/SiteLink';
import type { ServiceAreaAtAGlance as ServiceAreaAtAGlanceData, ServiceAreaImage } from '@/lib/serviceAreas';
import ServiceAreaAtAGlance from './ServiceAreaAtAGlance';
import classes from './ServiceAreaHero.module.scss';

type HeroAction = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
};

type ContactNote = {
  prefix?: string;
  label: string;
  href: string;
};

type ServiceAreaHeroProps = {
  title: string;
  description: string;
  city: string;
  province?: string;
  bullets?: string[];
  actions?: HeroAction[];
  image?: ServiceAreaImage;
  contactNote?: ContactNote;
  atAGlance?: ServiceAreaAtAGlanceData;
};

export default function ServiceAreaHero({
  title,
  description,
  city,
  province = 'ON',
  bullets = [],
  actions = [],
  image,
  contactNote,
  atAGlance,
}: ServiceAreaHeroProps) {
  return (
    <section className={classes.section}>
      {image ? (
        <div className={classes.bgFrame}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            className={classes.bgImage}
            sizes="100vw"
          />
          <div className={classes.bgOverlay} />
        </div>
      ) : null}
      <div className={classes.container}>
        <div className={classes.shell}>
          <div className={classes.content}>
            <p className={classes.eyebrow}>
              <MapPin size={16} weight="fill" />
              Excavation Contractor
              <span>
                {' '}
                &middot; {city}, {province}
              </span>
            </p>
            <h1 className={classes.title}>{title}</h1>
            <p className={classes.description}>{description}</p>
            {bullets.length > 0 ? (
              <ul className={classes.bullets}>
                {bullets.map((bullet) => (
                  <li key={bullet}>
                    <CheckCircle size={20} weight="fill" />
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
            {actions.length > 0 ? (
              <div className={classes.actions}>
                {actions.map((action) => (
                  <Link
                    key={`${action.href}-${action.label}`}
                    className={
                      action.variant === 'secondary'
                        ? classes.secondaryAction
                        : classes.primaryAction
                    }
                    href={action.href}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
            {contactNote ? (
              <p className={classes.contactNote}>
                {contactNote.prefix ?? 'Prefer to text?'}{' '}
                <Link href={contactNote.href}>{contactNote.label}</Link>
              </p>
            ) : null}
          </div>
          {atAGlance?.items.length ? (
            <div className={classes.media}>
              <ServiceAreaAtAGlance
                heading={atAGlance.heading ?? `${city} excavation at a glance`}
                city={city}
                items={atAGlance.items}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
