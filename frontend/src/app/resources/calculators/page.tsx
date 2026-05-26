import type { Metadata } from 'next';
import Link from 'next/link';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { ResourceBreadcrumbs } from '@/features/calculators/components/ResourceBreadcrumbs';
import { CalculatorResourceCardGrid } from '@/features/calculators/components/CalculatorResourceCardGrid';
import { calculatorSeoConfig } from '@/features/calculators/config/seo';
import { validateMetadata } from '@/lib/utils/seoValidation';
import classes from '../../../app/calculators/page.module.scss';

export const metadata: Metadata = {
  title: 'Excavation, Gravel & Topsoil Calculators | Bellhouse',
  description:
    'Use Bellhouse estimating calculators for excavation, gravel, and topsoil quantities, truck loads, and rough material planning.',
  alternates: {
    canonical: 'https://bellhouseexcavating.ca/resources/calculators',
  },
  openGraph: {
    title: 'Excavation, Gravel & Topsoil Calculators | Bellhouse',
    description:
      'Bellhouse calculator hub for excavation, gravel, and topsoil estimating tools.',
    url: 'https://bellhouseexcavating.ca/resources/calculators',
    siteName: 'Bellhouse Excavating',
    type: 'website',
  },
};

validateMetadata(metadata.title, metadata.description);

export default function CalculatorsPage() {
  return (
    <>
      <SectionWrapper
        className={classes.heroSection}
        containerClassName={classes.heroContainer}
        spacing="loose"
      >
        <div className={classes.heroShell}>
          <div className={classes.heroContent}>
            <ResourceBreadcrumbs
              trail={[
                { name: 'Home', href: '/' },
                { name: 'Resources', href: '/resources' },
                { name: 'Calculators' },
              ]}
            />
            <p className={classes.eyebrow}>Bellhouse calculators</p>
            <h1>Estimating tools for excavation, gravel, and topsoil work.</h1>
            <p className={classes.heroText}>
              Bellhouse calculators are practical estimating tools for quick
              field checks, early planning, and rough material takeoffs before a
              project is quoted or scheduled.
            </p>
            <p className={classes.heroText}>
              Use them to compare excavation, gravel, or topsoil needs fast,
              then send Bellhouse the job details when you need a real number
              based on site conditions.
            </p>
            <div className={classes.heroActions}>
              <Link
                className={classes.primaryAction}
                href={calculatorSeoConfig.excavation.resourcePath}
              >
                Start With Excavation
              </Link>
              <Link className={classes.secondaryAction} href="/contact">
                Request a Quote
              </Link>
            </div>
          </div>

          <div className={classes.heroCard}>
            <p className={classes.heroCardTitle}>Built for quick estimating</p>
            <ul className={classes.heroCardList}>
              <li>Metric or imperial dimension entry, depending on the job</li>
              <li>Volume, tonnage, and truck-load estimates in one place</li>
              <li>Material and hauling assumptions where they matter</li>
              <li>Built for early planning before quote review</li>
            </ul>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className={classes.sectionIntro}>
          <p className={classes.sectionEyebrow}>Calculator hub</p>
          <h2>Choose the estimating tool that matches the work.</h2>
          <p>
            Each calculator uses the same Bellhouse framework, but the inputs,
            labels, materials, and assumptions stay focused on the type of work
            you are actually pricing or planning.
          </p>
        </div>

        <CalculatorResourceCardGrid />
      </SectionWrapper>

      <SectionWrapper
        className={classes.ctaSection}
        containerClassName={classes.ctaContainer}
      >
        <div className={classes.ctaShell}>
          <div className={classes.ctaContent}>
            <p className={classes.eyebrow}>Need a real job read?</p>
            <h2>Use the calculator, then send Bellhouse the project details.</h2>
            <p className={classes.ctaText}>
              If the estimate looks close, the next step is to send the scope,
              location, access conditions, and timing so Bellhouse can review
              fit and what the job actually needs.
            </p>
            <ul className={classes.ctaPoints}>
              <li>Useful for excavation, imported aggregate, and topsoil work</li>
              <li>Helpful when truck counts and material volumes matter early</li>
              <li>Best followed by a direct quote request for real site conditions</li>
            </ul>
            <div className={classes.ctaActions}>
              <Link className={classes.primaryAction} href="/contact">
                Request a Quote
              </Link>
              <Link className={classes.secondaryAction} href="/services">
                View Services
              </Link>
            </div>
            <p className={classes.ctaNote}>
              Looking for the full Bellhouse resource section? Visit{' '}
              <Link href="/resources">all resources</Link>.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
