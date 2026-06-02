import type { Metadata } from 'next';
import Link from 'next/link';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { ResourceBreadcrumbs } from '@/features/calculators/components/ResourceBreadcrumbs';
import { CalculatorResourceCardGrid } from '@/features/calculators/components/CalculatorResourceCardGrid';
import { validateMetadata } from '@/lib/utils/seoValidation';
import classes from '../calculators/page.module.scss';
import shellClasses from '@/features/calculators/components/CalculatorPageShell.module.scss';

export const metadata: Metadata = {
  title: 'Excavation Resources & Calculators | Bellhouse',
  description:
    'Use Bellhouse excavation calculators and planning resources to estimate material quantities, truck loads, gravel, topsoil, and site work needs.',
  alternates: {
    canonical: 'https://bellhouseexcavating.ca/resources',
  },
  openGraph: {
    title: 'Excavation Resources & Calculators | Bellhouse',
    description:
      'Bellhouse resource hub for calculators and practical excavation planning tools.',
    url: 'https://bellhouseexcavating.ca/resources',
    siteName: 'Bellhouse Excavating',
    type: 'website',
  },
};

validateMetadata(metadata.title, metadata.description);

export default function ResourcesPage() {
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
                { name: 'Resources' },
              ]}
            />
            <p className={classes.eyebrow}>Bellhouse resources</p>
            <h1>Calculators and planning tools for excavation work.</h1>
            <p className={classes.heroText}>
              Use these planning tools to estimate early material quantities,
              truck loads, and site work needs before requesting a quote or
              scheduling the next phase.
            </p>
            <p className={classes.heroText}>
              Start with a quick calculator estimate, then move into the
              matching Bellhouse service when the project needs site-specific
              review.
            </p>
            <div className={classes.heroActions}>
              <Link className={classes.primaryAction} href="/resources/calculators">
                Browse Calculators
              </Link>
              <Link className={classes.secondaryAction} href="/services">
                View Services
              </Link>
            </div>
          </div>

          <div className={classes.heroCard}>
            <p className={classes.heroCardTitle}>What you will find here</p>
            <ul className={classes.heroCardList}>
              <li>Excavation, gravel, and topsoil estimating calculators</li>
              <li>Rough material quantities and truck-load planning</li>
              <li>Useful starting points before a site-specific quote review</li>
              <li>Clear next steps into related Bellhouse services</li>
            </ul>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className={classes.sectionIntro}>
          <p className={classes.sectionEyebrow}>Calculator hub</p>
          <h2>Use the estimator that matches the material and the work.</h2>
          <p>
            Choose the calculator that matches the job stage, whether you are
            planning excavation haul-out, compacted gravel or base placement,
            or topsoil for finish grading.
          </p>
        </div>

        <CalculatorResourceCardGrid />
        <p className={shellClasses.resourcesLink}>
          Want to compare all estimating tools?{' '}
          <Link href="/resources/calculators">Open Bellhouse calculators</Link>.
        </p>
      </SectionWrapper>

      <SectionWrapper
        className={classes.ctaSection}
        containerClassName={classes.ctaContainer}
      >
        <div className={classes.ctaShell}>
          <div className={classes.ctaContent}>
            <p className={classes.eyebrow}>Need a site-specific number?</p>
            <h2>Use Bellhouse resources to plan, then move into the real job review.</h2>
            <p className={classes.ctaText}>
              Material type, moisture, access, haul distance, and site
              conditions all affect the actual scope. When you are ready,
              Bellhouse can review the project and quote the work properly.
            </p>
            <ul className={classes.ctaPoints}>
              <li>Helpful for early takeoffs before ordering or scheduling</li>
              <li>Built to point you toward the right Bellhouse service</li>
              <li>Best followed by a direct quote request for real job conditions</li>
            </ul>
            <div className={classes.ctaActions}>
              <Link className={classes.primaryAction} href="/contact">
                Request a Quote
              </Link>
              <Link className={classes.secondaryAction} href="/resources/calculators">
                Open Calculators
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
