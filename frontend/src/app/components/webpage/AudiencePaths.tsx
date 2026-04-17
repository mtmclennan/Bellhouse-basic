import Link from 'next/link';
import classes from './AudiencePaths.module.scss';

type AudiencePathsProps = {
  eyebrow?: string;
  heading: string;
  intro: string;
  footnote?: React.ReactNode;
};

type AudienceCardAction = {
  label: string;
  href: string;
  variant?: 'secondary';
};

type AudienceCard = {
  title: string;
  description: string;
  actions: AudienceCardAction[];
};

const audienceCards: AudienceCard[] = [
  {
    title: 'Residential',
    description:
      'For homeowners planning additions, drainage work, driveway prep, foundation digging, yard grading, or trucked-in material.',
    actions: [
      { label: 'View Service Areas', href: '/service-areas' },
      {
        label: 'Request a Quote',
        href: '/contact',
        variant: 'secondary' as const,
      },
    ],
  },
  {
    title: 'Farm / rural',
    description:
      'For larger lots, rural lanes, drainage corrections, pads, truck access, imported aggregate, and site work that needs practical planning before equipment shows up.',
    actions: [
      { label: 'View Service Areas', href: '/service-areas' },
      {
        label: 'Open Planning Tools',
        href: '/resources/calculators',
        variant: 'secondary' as const,
      },
    ],
  },
  {
    title: 'Commercial / contractor',
    description:
      'For builders, general contractors, concrete crews, and developers that need excavation, trucking, and site support lined up around the job schedule.',
    actions: [
      { label: 'Go to Contractors', href: '/contractors' },
      {
        label: 'View Service Areas',
        href: '/service-areas',
        variant: 'secondary' as const,
      },
    ],
  },
] as const;

export default function AudiencePaths({
  eyebrow = 'Choose your path',
  heading,
  intro,
  footnote,
}: AudiencePathsProps) {
  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div className={classes.intro}>
          <p className={classes.eyebrow}>{eyebrow}</p>
          <h2>{heading}</h2>
          <p className={classes.copy}>{intro}</p>
        </div>

        <div className={classes.grid}>
          {audienceCards.map((card) => (
            <article className={classes.card} key={card.title}>
              <p className={classes.cardLabel}>Audience</p>
              <h3>{card.title}</h3>
              <p className={classes.description}>{card.description}</p>
              <div className={classes.actions}>
                {card.actions.map((action) => (
                  <Link
                    className={
                      action.variant === 'secondary'
                        ? classes.secondaryAction
                        : classes.primaryAction
                    }
                    href={action.href}
                    key={`${card.title}-${action.href}-${action.label}`}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>

        {footnote ? <div className={classes.footnote}>{footnote}</div> : null}
      </div>
    </section>
  );
}
