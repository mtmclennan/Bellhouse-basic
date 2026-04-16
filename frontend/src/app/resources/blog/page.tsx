import type { Metadata } from 'next';
import Link from 'next/link';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { ResourceBreadcrumbs } from '@/features/calculators/components/ResourceBreadcrumbs';
import { resourceBlogPosts } from '@/data/resourceBlog';
import { validateMetadata } from '@/lib/utils/seoValidation';
import classes from '../../calculators/page.module.scss';
import shellClasses from '@/features/calculators/components/CalculatorPageShell.module.scss';

export const metadata: Metadata = {
  title: 'Excavation Blog & Project Articles | Bellhouse',
  description:
    'Browse Bellhouse blog articles and practical excavation project guidance under the main resources section.',
  alternates: {
    canonical: 'https://bellhouseexcavating.ca/resources/blog',
  },
  openGraph: {
    title: 'Excavation Blog & Project Articles | Bellhouse',
    description:
      'Bellhouse blog hub for practical excavation, site work, and project-planning articles.',
    url: 'https://bellhouseexcavating.ca/resources/blog',
    siteName: 'Bellhouse Excavating',
    type: 'website',
  },
};

validateMetadata(metadata.title, metadata.description);

export default function ResourceBlogPage() {
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
                { name: 'Blog' },
              ]}
            />
            <p className={classes.eyebrow}>Bellhouse blog</p>
            <h1>Project guidance and practical excavation articles.</h1>
            <p className={classes.heroText}>
              The Bellhouse blog sits under the main resources section so
              project articles and estimating tools stay grouped in one
              discoverable place.
            </p>
            <p className={classes.heroText}>
              Use the blog when you want context around planning, sequencing,
              and service fit before moving into calculators or a quote
              request.
            </p>
            <div className={classes.heroActions}>
              <Link className={classes.primaryAction} href="/resources/calculators">
                Browse Calculators
              </Link>
              <Link className={classes.secondaryAction} href="/contact">
                Request a Quote
              </Link>
            </div>
          </div>

          <div className={classes.heroCard}>
            <p className={classes.heroCardTitle}>Blog section</p>
            <ul className={classes.heroCardList}>
              <li>Articles stay nested under resources for cleaner discovery</li>
              <li>Useful companion content for calculators and service pages</li>
              <li>Built to support practical project-planning intent</li>
            </ul>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className={shellClasses.relatedIntro}>
          <p className={classes.sectionEyebrow}>Published articles</p>
          <h2>Bellhouse article pages will live here.</h2>
          <p>
            {resourceBlogPosts.length > 0
              ? 'Browse the current Bellhouse articles below.'
              : 'No Bellhouse blog articles are published yet. The nested `/resources/blog/*` structure is ready for future articles without splitting them away from the calculator hub.'}
          </p>
        </div>

        {resourceBlogPosts.length > 0 ? (
          <div className={shellClasses.relatedGrid}>
            {resourceBlogPosts.map((post) => (
              <article className={shellClasses.relatedCard} key={post.slug}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <div className={shellClasses.relatedActions}>
                  <Link
                    className={classes.primaryAction}
                    href={`/resources/blog/${post.slug}`}
                  >
                    Read Article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={shellClasses.relatedGrid}>
            <article className={shellClasses.relatedCard}>
              <h3>No articles published yet</h3>
              <p>
                Bellhouse can add practical blog content here later without
                creating a separate content silo away from calculators and core
                services.
              </p>
              <div className={shellClasses.relatedActions}>
                <Link className={classes.secondaryAction} href="/resources">
                  Back to Resources
                </Link>
              </div>
            </article>
          </div>
        )}
      </SectionWrapper>
    </>
  );
}
