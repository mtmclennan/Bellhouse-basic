import Image from 'next/image';
import Link from 'next/link';
import SectionWrapper from '@/components/layout/SectionWrapper';
import type { ServiceAreaImage } from '@/lib/serviceAreas';
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
  eyebrow?: string;
  actions?: HeroAction[];
  image?: ServiceAreaImage;
  contactNote?: ContactNote;
  badges?: string[];
};

export default function ServiceAreaHero({
  title,
  description,
  eyebrow,
  actions = [],
  image,
  contactNote,
  badges = ['Excavation', 'Hauling', 'Float Service'],
}: ServiceAreaHeroProps) {
  return (
    <SectionWrapper
      className={classes.section}
      containerClassName={classes.container}
      spacing="loose"
    >
      <div className={classes.shell}>
        <div className={classes.content}>
          {eyebrow ? <p className={classes.eyebrow}>{eyebrow}</p> : null}
          <h1 className={classes.title}>{title}</h1>
          <p className={classes.description}>{description}</p>
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
        {image ? (
          <div className={classes.media}>
            <div className={classes.imageFrame}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width ?? 1600}
                height={image.height ?? 1200}
                className={classes.image}
                sizes="(max-width: 1000px) 100vw, 42vw"
              />
              <div className={classes.imageOverlay} />
              {badges.length > 0 ? (
                <div className={classes.mediaBadge}>
                  {badges.map((badge) => (
                    <span key={badge}>{badge}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </SectionWrapper>
  );
}
