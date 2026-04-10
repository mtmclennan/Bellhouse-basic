import Link from 'next/link';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { calculatorPageContent } from '../config/pageContent';
import type { CalculatorKind } from '../types/calculator';
import { CalculatorForm } from './CalculatorForm';
import classes from './CalculatorPageShell.module.scss';

type CalculatorPageShellProps = {
  kind: CalculatorKind;
};

export function CalculatorPageShell({ kind }: CalculatorPageShellProps) {
  const content = calculatorPageContent[kind];

  return (
    <>
      <SectionWrapper
        className={classes.heroSection}
        containerClassName={classes.heroContainer}
        spacing="loose"
      >
        <div className={classes.heroContent}>
          <p className={classes.eyebrow}>{content.eyebrow}</p>
          <h1>{content.pageTitle}</h1>
          {content.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </SectionWrapper>

      <CalculatorForm kind={kind} />

      <SectionWrapper>
        <div className={classes.supportIntro}>
          <p className={classes.eyebrow}>Estimator notes</p>
          <h2>{content.supportHeading}</h2>
          <p>{content.supportDescription}</p>
        </div>

        <div className={classes.supportGrid}>
          {content.supportItems.map((item) => (
            <article className={classes.supportCard} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        className={classes.ctaSection}
        containerClassName={classes.ctaContainer}
      >
        <div className={classes.ctaShell}>
          <div className={classes.ctaContent}>
            <p className={classes.eyebrow}>Need a real quote?</p>
            <h2>{content.ctaTitle}</h2>
            <p>{content.ctaDescription}</p>
            <ul className={classes.ctaPoints}>
              {content.ctaPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className={classes.ctaActions}>
              <Link className={classes.primaryAction} href="/contact">
                Request a Quote
              </Link>
              <Link
                className={classes.secondaryAction}
                href={content.relatedServiceLink.href}
              >
                {content.relatedServiceLink.label}
              </Link>
            </div>
            <p>
              Need a different estimating tool first?{' '}
              <Link href="/calculators">View all Bellhouse calculators</Link>.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
