import Link from '@/components/SiteLink';
import HeroSection from '@/app/components/sections/HeroSection/HeroSection';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { calculatorPageContent } from '../config/pageContent';
import { calculatorConfigs } from '../config/calculators';
import { calculatorSeoConfig } from '../config/seo';
import type { CalculatorKind } from '../types/calculator';
import type { HeroSectionData } from '@/types/sections';
import { CalculatorForm } from './CalculatorForm';
import { CalculatorTrackedLink } from './CalculatorTrackedLink';
import { ResourceBreadcrumbs } from './ResourceBreadcrumbs';
import classes from './CalculatorPageShell.module.scss';

type CalculatorPageShellProps = {
  kind: CalculatorKind;
};

export function CalculatorPageShell({ kind }: CalculatorPageShellProps) {
  const content = calculatorPageContent[kind];
  const config = calculatorConfigs[kind];
  const heroData: HeroSectionData = {
    _type: 'heroSection',
    eyebrow: content.eyebrow,
    headline: content.pageTitle,
    subheadline: content.intro[0],
    primaryAction: {
      label: 'Use Calculator',
      href: '#calculator',
    },
    secondaryAction: {
      label: 'Request a Quote',
      href: '/contact',
    },
    proofItems: [
      { label: 'Metric or imperial entry' },
      { label: config.description },
      { label: 'Material and hauling assumptions' },
      { label: 'Built for early planning' },
    ],
    align: 'left',
    theme: 'dark',
    overlay: 'none',
    density: 'tight',
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <div className={classes.breadcrumbBar}>
        <ResourceBreadcrumbs
          trail={[
            { name: 'Home', href: '/' },
            { name: 'Resources', href: '/resources' },
            { name: 'Calculators', href: '/resources/calculators' },
            { name: config.title, href: calculatorSeoConfig[kind].resourcePath },
          ]}
        />
      </div>

      <HeroSection data={heroData} />

      <div id="calculator" className={classes.scrollTarget}>
        <CalculatorForm kind={kind} />
      </div>

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
        <div className={classes.guidanceIntro}>
          <p className={classes.eyebrow}>Practical guidance</p>
          <h2>{content.guidanceHeading}</h2>
          <p>{content.guidanceDescription}</p>
        </div>

        <div className={classes.guidanceGrid}>
          {content.guidanceItems.map((item) => (
            <article className={classes.guidanceCard} key={item.title}>
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
                <CalculatorTrackedLink
                  className={classes.primaryAction}
                  href={tool.href}
                  kind={kind}
                  destinationType="calculator"
                >
                  {tool.actionLabel}
                </CalculatorTrackedLink>
              </div>
            </article>
          ))}
        </div>

        <p className={classes.resourcesLink}>
          Browse the full calculator hub in{' '}
          <Link href="/resources/calculators">Bellhouse calculators</Link>.
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <div className={classes.relatedIntro}>
          <p className={classes.eyebrow}>Related services</p>
          <h2>{content.relatedServicesHeading}</h2>
          <p>{content.relatedServicesDescription}</p>
        </div>

        <div className={classes.serviceGrid}>
          {content.relatedServices.map((service) => (
            <article className={classes.relatedCard} key={service.href}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className={classes.relatedActions}>
                <CalculatorTrackedLink
                  className={classes.secondaryAction}
                  href={service.href}
                  kind={kind}
                  destinationType="service"
                >
                  {service.actionLabel}
                </CalculatorTrackedLink>
              </div>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className={classes.faqLayout}>
          <div className={classes.faqIntro}>
            <p className={classes.eyebrow}>Calculator FAQ</p>
            <h2>{content.faqHeading}</h2>
            <p>{content.faqDescription}</p>
          </div>

          <div className={classes.faqList}>
            {content.faqs.map((item, index) => (
              <details className={classes.faqItem} key={item.question}>
                <summary className={classes.faqQuestion}>
                  <span className={classes.faqNumber}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{item.question}</span>
                  <span className={classes.faqToggle} aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

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
              <CalculatorTrackedLink
                className={classes.secondaryAction}
                href={content.relatedServiceLink.href}
                kind={kind}
                destinationType="service"
              >
                {content.relatedServiceLink.label}
              </CalculatorTrackedLink>
            </div>
            <p>
              Need a different estimating tool first?{' '}
              <Link href="/resources/calculators">
                Browse all Bellhouse calculators
              </Link>
              .
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
