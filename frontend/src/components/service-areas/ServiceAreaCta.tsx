import Link from '@/components/SiteLink';
import SectionWrapper from '@/components/layout/SectionWrapper';
import classes from './ServiceAreaCta.module.scss';

type CtaAction = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
};

type ContactNote = {
  label: string;
  href: string;
};

type ServiceAreaCtaProps = {
  title: string;
  description: string;
  actions: CtaAction[];
  supportingPoints?: string[];
  contactNote?: ContactNote;
};

export default function ServiceAreaCta({
  title,
  description,
  actions,
  supportingPoints,
  contactNote,
}: ServiceAreaCtaProps) {
  return (
    <SectionWrapper
      className={classes.section}
      containerClassName={classes.container}
    >
      <div className={classes.shell}>
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
        {contactNote ? (
          <p className={classes.contactNote}>
            Prefer to text? <Link href={contactNote.href}>{contactNote.label}</Link>
          </p>
        ) : null}
      </div>
    </SectionWrapper>
  );
}
