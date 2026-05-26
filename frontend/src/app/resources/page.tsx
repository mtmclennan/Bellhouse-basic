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
    'Explore Bellhouse resources for excavation planning, including calculator tools tied to Bellhouse services.',
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
              Bellhouse resources now live under one section so visitors can
              move cleanly between estimating tools and related service paths
              without competing hubs or duplicate routes.
            </p>
            <p className={classes.heroText}>
              Start with calculators when you need a quick planning number,
              then move into the matching service page or quote request when
              the job needs review.
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
              <li>A calculator hub for excavation, gravel, and topsoil planning</li>
              <li>Direct paths into service pages and quote requests</li>
              <li>Practical early estimates before site-specific quote review</li>
              <li>One umbrella section for planning tools</li>
            </ul>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className={classes.sectionIntro}>
          <p className={classes.sectionEyebrow}>Calculator hub</p>
          <h2>Use the estimator that matches the material and the work.</h2>
          <p>
            The calculator section keeps excavation haul-out, compacted
            gravel/base placement, and topsoil planning in one consistent
            nested hub.
          </p>
        </div>

        <CalculatorResourceCardGrid />
        <p className={shellClasses.resourcesLink}>
          Need the full calculator section?{' '}
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
