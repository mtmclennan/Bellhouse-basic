import type { Metadata } from 'next';
import Link from 'next/link';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { ResourceBreadcrumbs } from '@/features/calculators/components/ResourceBreadcrumbs';
import { CalculatorResourceCardGrid } from '@/features/calculators/components/CalculatorResourceCardGrid';
import { resourceBlogPosts } from '@/data/resourceBlog';
import { validateMetadata } from '@/lib/utils/seoValidation';
import classes from '../calculators/page.module.scss';
import shellClasses from '@/features/calculators/components/CalculatorPageShell.module.scss';

export const metadata: Metadata = {
  title: 'Excavation Resources, Calculators & Articles | Bellhouse',
  description:
    'Explore Bellhouse resources for excavation planning, including calculator tools and practical project articles tied to Bellhouse services.',
  alternates: {
    canonical: 'https://bellhouseexcavating.ca/resources',
  },
  openGraph: {
    title: 'Excavation Resources, Calculators & Articles | Bellhouse',
    description:
      'Bellhouse resource hub for calculators, planning tools, and practical excavation articles.',
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
            <h1>Calculators and project guidance for excavation work.</h1>
            <p className={classes.heroText}>
              Bellhouse resources now live under one section so visitors can
              move cleanly between estimating tools and practical project
              guidance without competing hubs or duplicate paths.
            </p>
            <p className={classes.heroText}>
              Start with calculators when you need a quick planning number, or
              move into the blog section when you want a clearer read on scope,
              sequencing, and service fit before requesting a quote.
            </p>
            <div className={classes.heroActions}>
              <Link className={classes.primaryAction} href="/resources/calculators">
                Browse Calculators
              </Link>
              <Link className={classes.secondaryAction} href="/resources/blog">
                Visit the Blog
              </Link>
            </div>
          </div>

          <div className={classes.heroCard}>
            <p className={classes.heroCardTitle}>What you will find here</p>
            <ul className={classes.heroCardList}>
              <li>A calculator hub for excavation, gravel, and topsoil planning</li>
              <li>A blog section for practical Bellhouse project guidance</li>
              <li>Direct paths into service pages and quote requests</li>
              <li>One umbrella section instead of split resource clusters</li>
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

      <SectionWrapper>
        <div className={shellClasses.relatedIntro}>
          <p className={classes.sectionEyebrow}>Blog section</p>
          <h2>Project guidance lives under the same resource umbrella.</h2>
          <p>
            Bellhouse blog content sits beside the calculators so planning
            tools and supporting articles are discoverable in one place.
          </p>
        </div>

        <div className={shellClasses.relatedGrid}>
          <article className={shellClasses.relatedCard}>
            <h3>Bellhouse excavation blog</h3>
            <p>
              Browse practical articles that can support planning, service
              selection, and project-readiness decisions before you move into a
              quote request.
            </p>
            <div className={shellClasses.relatedActions}>
              <Link className={classes.primaryAction} href="/resources/blog">
                Visit the Blog
              </Link>
            </div>
          </article>
          <article className={shellClasses.relatedCard}>
            <h3>
              {resourceBlogPosts.length > 0
                ? `${resourceBlogPosts.length} published article${
                    resourceBlogPosts.length === 1 ? '' : 's'
                  }`
                : 'Blog architecture is ready for articles'}
            </h3>
            <p>
              {resourceBlogPosts.length > 0
                ? 'Published articles will appear under the nested `/resources/blog/*` structure for cleaner discovery and stronger topical grouping.'
                : 'The nested blog routes are in place so Bellhouse can add practical articles without splitting them away from calculators and service-support content.'}
            </p>
            <div className={shellClasses.relatedActions}>
              <Link className={classes.secondaryAction} href="/services">
                View Services
              </Link>
            </div>
          </article>
        </div>
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
            <p className={classes.ctaNote}>
              Looking for the article section instead? Visit the{' '}
              <Link href="/resources/blog">Bellhouse blog</Link>.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
