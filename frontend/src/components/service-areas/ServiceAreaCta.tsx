import Image from 'next/image';
import Link from 'next/link';
import SectionWrapper from '@/components/layout/SectionWrapper';
import type { ServiceAreaImage } from '@/lib/serviceAreas';
import classes from './ServiceAreaCta.module.scss';

type CtaAction = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
};

type ServiceAreaCtaProps = {
  title: string;
  description: string;
  actions: CtaAction[];
  image?: ServiceAreaImage;
  supportingPoints?: string[];
};

export default function ServiceAreaCta({
  title,
  description,
  actions,
  image,
  supportingPoints,
}: ServiceAreaCtaProps) {
  return (
    <SectionWrapper
      className={classes.section}
      containerClassName={classes.container}
    >
      <div className={classes.shell}>
        <div className={classes.content}>
          <h2 className={classes.title}>{title}</h2>
          <p className={classes.description}>{description}</p>
          {supportingPoints && supportingPoints.length > 0 ? (
            <ul className={classes.supportingPoints}>
              {supportingPoints.map((point) => (
                <li key={point}>{point}</li>
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
        </div>
        {image ? (
          <div className={classes.media}>
            <div className={classes.imageFrame}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={classes.image}
                sizes="(max-width: 1000px) 100vw, 38vw"
              />
              <div className={classes.imageOverlay} />
            </div>
          </div>
        ) : null}
      </div>
    </SectionWrapper>
  );
}
