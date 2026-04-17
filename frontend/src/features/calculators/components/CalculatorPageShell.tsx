import Link from 'next/link';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { calculatorPageContent } from '../config/pageContent';
import { calculatorConfigs } from '../config/calculators';
import { calculatorSeoConfig } from '../config/seo';
import type { CalculatorKind } from '../types/calculator';
import { CalculatorForm } from './CalculatorForm';
import { ResourceBreadcrumbs } from './ResourceBreadcrumbs';
import classes from './CalculatorPageShell.module.scss';

type CalculatorPageShellProps = {
  kind: CalculatorKind;
};

export function CalculatorPageShell({ kind }: CalculatorPageShellProps) {
  const content = calculatorPageContent[kind];
  const config = calculatorConfigs[kind];

  return (
    <>
      <SectionWrapper
        className={classes.heroSection}
        containerClassName={classes.heroContainer}
        spacing="loose"
      >
        <div className={classes.heroContent}>
          <ResourceBreadcrumbs
            currentLabel={config.title}
            trail={[
              { name: 'Home', href: '/' },
              { name: 'Resources', href: '/resources' },
              { name: 'Calculators', href: '/resources/calculators' },
              {
                name: config.title,
                href: calculatorSeoConfig[kind].resourcePath,
              },
            ]}
          />
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
          <p className={classes.eyebrow}>Calculator guide</p>
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

      <SectionWrapper>
        <div className={classes.relatedIntro}>
          <p className={classes.eyebrow}>Related tools</p>
          <h2>{content.relatedToolsHeading}</h2>
          <p>{content.relatedToolsDescription}</p>
        </div>

        <div className={classes.relatedGrid}>
          {content.relatedTools.map((tool) => (
            <article className={classes.relatedCard} key={tool.href}>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
              <div className={classes.relatedActions}>
                <Link className={classes.primaryAction} href={tool.href}>
                  {tool.actionLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className={classes.resourcesLink}>
          Browse the full calculator hub in{' '}
          <Link href="/resources/calculators">Bellhouse calculators</Link>.
        </p>
      </SectionWrapper>

      <SectionWrapper
        className={classes.ctaSection}
        containerClassName={classes.ctaContainer}
      >
        <div className={classes.ctaShell}>
          <div className={classes.ctaContent}>
            <p className={classes.eyebrow}>Bellhouse next step</p>
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
              Need a different path first?{' '}
              <Link href="/resources/calculators">
                Browse all Bellhouse calculators
              </Link>{' '}
              or check <Link href="/service-areas">service areas</Link> and the{' '}
              <Link href="/contractors">contractor page</Link>.
            </p>
          </div>

          <div className={classes.nextStepsPanel}>
            <div className={classes.nextStepsIntro}>
              <p className={classes.eyebrow}>After the estimate</p>
              <h3>{content.nextStepsHeading}</h3>
              <p>{content.nextStepsDescription}</p>
            </div>

            <div className={classes.nextStepsGrid}>
              {content.nextSteps.map((step) => (
                <article className={classes.nextStepCard} key={step.href}>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                  <div className={classes.relatedActions}>
                    <Link className={classes.secondaryAction} href={step.href}>
                      {step.actionLabel}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
