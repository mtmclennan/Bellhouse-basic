import type { Metadata } from 'next';
import Link from '@/components/SiteLink';
import { notFound } from 'next/navigation';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { ResourceBreadcrumbs } from '@/features/calculators/components/ResourceBreadcrumbs';
import {
  getResourceBlogPost,
  resourceBlogPosts,
} from '@/data/resourceBlog';
import { validateMetadata } from '@/lib/utils/seoValidation';
import classes from './page.module.scss';

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

const baseUrl = 'https://bellhouseexcavating.ca';

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getResourceBlogPost(slug);

  if (!post) {
    return {
      title: 'Article Not Found | Bellhouse',
      description: 'Requested resource article does not exist.',
    };
  }

  validateMetadata(post.title, post.description);

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${baseUrl}/resources/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${baseUrl}/resources/blog/${post.slug}`,
      siteName: 'Bellhouse Excavating',
      type: 'article',
    },
  };
}

export default async function ResourceBlogPostPage({
  params,
}: BlogPageProps) {
  const { slug } = await params;
  const post = getResourceBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <SectionWrapper
        className={classes.heroSection}
        containerClassName={classes.heroContainer}
        spacing="loose"
      >
        <div className={classes.heroContent}>
          <ResourceBreadcrumbs
            trail={[
              { name: 'Home', href: '/' },
              { name: 'Resources', href: '/resources' },
              { name: 'Blog', href: '/resources/blog' },
              { name: post.title, href: `/resources/blog/${post.slug}` },
            ]}
          />
          <p className={classes.eyebrow}>Bellhouse resource article</p>
          <h1>{post.h1 ?? post.title}</h1>
          <p>{post.description}</p>
          <p className={classes.meta}>
            Published {post.publishedAt}
            {post.updatedAt ? ` | Updated ${post.updatedAt}` : ''}
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper as="article">
        <div className={classes.article}>
          <div className={classes.intro}>
            {post.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {post.sections.map((section) => (
            <section className={classes.section} key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className={classes.ctaCard}>
          <h2>Need a calculator or a quote next?</h2>
          <p>
            Use Bellhouse calculators for planning, or move straight into a
            service review if the job needs a real site-specific number.
          </p>
          <div className={classes.actions}>
            <Link className={classes.primaryAction} href="/resources/calculators">
              Browse Calculators
            </Link>
            <Link className={classes.secondaryAction} href="/contact">
              Request a Quote
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

export function generateStaticParams() {
  return resourceBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}
