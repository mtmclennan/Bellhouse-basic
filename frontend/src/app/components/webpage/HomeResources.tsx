import Link from '@/components/SiteLink';
import classes from './HomeResources.module.scss';
import { calculatorResourceCards } from '@/features/calculators/config/resourceCards';
import { calculatorConfigs } from '@/features/calculators/config/calculators';

export default function HomeResources() {
  return (
    <section className={classes.section}>
      <div className={classes.inner}>
        <div className={classes.intro}>
          <p className={classes.eyebrow}>Bellhouse resources</p>
          <h2>Quick estimating tools for excavation, gravel, and topsoil.</h2>
          <p className={classes.copy}>
            Use Bellhouse calculators for early planning, then move into the
            right service or quote request when the job needs real site review.
          </p>
        </div>

        <div className={classes.grid}>
          {calculatorResourceCards.map((card) => (
            <article className={classes.card} key={card.slug}>
              <div className={classes.cardHeader}>
                <span className={classes.icon}>{card.icon}</span>
                <span className={classes.meta}>{card.meta}</span>
              </div>
              <h3>{calculatorConfigs[card.slug].title}</h3>
              <p className={classes.description}>{card.shortDescription}</p>
              <p className={classes.detail}>
                <strong>For:</strong> {card.whoItsFor}
              </p>
              <div className={classes.actions}>
                <Link className={classes.primaryLink} href={card.href}>
                  Open Calculator
                </Link>
                <Link className={classes.secondaryLink} href={card.serviceHref}>
                  Related Service
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className={classes.footer}>
          <p className={classes.footerCopy}>
            Need a job-specific number instead of a planning estimate?
          </p>
          <div className={classes.footerActions}>
            <Link className={classes.primaryAction} href="/resources/calculators">
              View Calculators
            </Link>
            <Link className={classes.secondaryAction} href="/contact">
              Request a Quote
            </Link>
            <Link className={classes.secondaryAction} href="/services">
              View Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
