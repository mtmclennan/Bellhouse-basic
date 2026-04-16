import type { Metadata } from 'next';
import Link from 'next/link';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { ResourceBreadcrumbs } from '@/features/calculators/components/ResourceBreadcrumbs';
import { CalculatorResourceCardGrid } from '@/features/calculators/components/CalculatorResourceCardGrid';
import { calculatorSeoConfig } from '@/features/calculators/config/seo';
import { validateMetadata } from '@/lib/utils/seoValidation';
import classes from '../calculators/page.module.scss';

export const metadata: Metadata = {
  title: 'Resources & Calculators for Excavation Projects | Bellhouse',
  description:
    'Explore Bellhouse resources for excavation, gravel, and topsoil estimating with direct links to calculators, services, and quote requests.',
  alternates: {
    canonical: 'https://bellhouseexcavating.ca/resources',
  },
  openGraph: {
    title: 'Resources & Calculators for Excavation Projects | Bellhouse',
    description:
      'Bellhouse resource hub for excavation, gravel, and topsoil calculators plus related service links.',
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
            <ResourceBreadcrumbs />
            <p className={classes.eyebrow}>Bellhouse resources</p>
            <h1>Planning tools for excavation, gravel, and topsoil work.</h1>
            <p className={classes.heroText}>
              The Bellhouse resources hub brings the estimating tools into one
              place so homeowners, builders, and crews can check quantities
              before they order material, plan haul-out, or request a quote.
            </p>
            <p className={classes.heroText}>
              Use the calculators for fast planning, then move into Bellhouse
              services when the job needs site-specific pricing, access review,
              and real production conditions.
            </p>
            <div className={classes.heroActions}>
              <Link
                className={classes.primaryAction}
                href={calculatorSeoConfig.excavation.resourcePath}
              >
                Start With Excavation
              </Link>
              <Link className={classes.secondaryAction} href="/services">
                View Services
              </Link>
            </div>
          </div>

          <div className={classes.heroCard}>
            <p className={classes.heroCardTitle}>What you will find here</p>
            <ul className={classes.heroCardList}>
              <li>Estimating tools for excavation, gravel/base, and topsoil</li>
              <li>Practical links into Bellhouse service pages and contact</li>
              <li>Useful for early homeowner planning and field checks</li>
              <li>Metric or imperial entry depending on the project</li>
            </ul>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className={classes.sectionIntro}>
          <p className={classes.sectionEyebrow}>Estimator tools</p>
          <h2>Choose the calculator that matches the material and the work.</h2>
          <p>
            Each tool is built around a specific workflow so excavation
            haul-out, compacted gravel/base placement, and topsoil planning do
            not get mixed together.
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
            <p className={classes.eyebrow}>Need a site-specific number?</p>
            <h2>Use the tools for planning, then bring Bellhouse in to price the real job.</h2>
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
              <Link className={classes.secondaryAction} href="/services">
                View Core Services
              </Link>
            </div>
            <p className={classes.ctaNote}>
              Looking for the calculator-only hub? Visit{' '}
              <Link href="/calculators">Bellhouse calculators</Link>.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
