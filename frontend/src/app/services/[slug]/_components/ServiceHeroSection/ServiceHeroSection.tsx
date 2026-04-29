import Image from 'next/image';
import Link from 'next/link';

import type { ServicePage } from '@/types/interfaces';
import type { ResolvedServiceHeroConfig } from '@/lib/servicePageLayout';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceHeroSection.module.scss';

interface ServiceHeroSectionProps {
  service: ServicePage;
  heroConfig: ResolvedServiceHeroConfig;
}

function formatRating(rating: number) {
  return rating.toFixed(1);
}

export default function ServiceHeroSection({
  service,
  heroConfig,
}: ServiceHeroSectionProps) {
  const hasSecondaryAction = Boolean(heroConfig.secondaryAction);
  const hasProofChips = heroConfig.proofChips.length > 0;
  const hasTrustRow = Boolean(heroConfig.phone || heroConfig.review);
  const heroContainerClassName = [classes.shell, classes.heroContainer]
    .filter(Boolean)
    .join(' ');
  const isExternalReviewLink = Boolean(
    heroConfig.review?.href?.startsWith('http://') ||
    heroConfig.review?.href?.startsWith('https://'),
  );

  return (
    <section
      className={classes.section}
      data-hero-emphasis={heroConfig.emphasis}
    >
      <ServiceSectionWrapper
        as="div"
        spacing="10"
        className={classes.inner}
        containerClassName={heroContainerClassName}
      >
        <div className={classes.copyPanel}>
          <nav className={classes.breadcrumbs} aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li aria-current="page">{service.hero.heading}</li>
            </ol>
          </nav>

          {heroConfig.eyebrow ? (
            <p className={classes.eyebrow}>{heroConfig.eyebrow}</p>
          ) : null}

          <div className={classes.headingGroup}>
            <h1>{service.hero.heading}</h1>
            <p className={classes.summary}>{heroConfig.summary}</p>
          </div>

          <div className={classes.actions}>
            <Link
              href={heroConfig.primaryAction.href}
              className={classes.primaryButton}
            >
              {heroConfig.primaryAction.label}
            </Link>

            {hasSecondaryAction && heroConfig.secondaryAction ? (
              <Link
                href={heroConfig.secondaryAction.href}
                className={classes.secondaryButton}
              >
                {heroConfig.secondaryAction.label}
              </Link>
            ) : null}
          </div>

          {hasTrustRow ? (
            <div className={classes.trustRow}>
              {heroConfig.phone ? (
                <Link
                  href={heroConfig.phone.href}
                  className={classes.phoneLink}
                >
                  {/* <span className={classes.phoneIcon} aria-hidden="true">
                    Call
                  </span> */}
                  <span>{heroConfig.phone.label}</span>
                </Link>
              ) : null}

              {heroConfig.review ? (
                <Link
                  href={heroConfig.review.href}
                  className={classes.reviewLink}
                  target={isExternalReviewLink ? '_blank' : undefined}
                  rel={isExternalReviewLink ? 'noopener noreferrer' : undefined}
                >
                  <span className={classes.stars} aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={`hero-review-star-${index}`}>{'\u2605'}</span>
                    ))}
                  </span>
                  <span>
                    {formatRating(heroConfig.review.rating)} on Google (
                    {heroConfig.review.reviewCount}{' '}
                    {heroConfig.review.reviewCount === 1 ? 'review' : 'reviews'}
                    )
                  </span>
                  <span className={classes.reviewCta}>
                    {heroConfig.review.label ?? 'Read Reviews'}
                  </span>
                </Link>
              ) : null}
            </div>
          ) : null}

          {hasProofChips ? (
            <ul className={classes.proofList} aria-label="Service highlights">
              {heroConfig.proofChips.map((chip) => (
                <li key={chip} className={classes.proofItem}>
                  {chip}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className={classes.mediaPanel}>
          <div className={classes.imageFrame}>
            <Image
              className={classes.image}
              src={service.hero.image}
              alt={service.hero.alt}
              width={650}
              height={550}
              priority
              sizes="(max-width: 768px) 100vw, 42vw"
            />
            <div className={classes.imageOverlay} aria-hidden="true" />
          </div>
        </div>
      </ServiceSectionWrapper>
    </section>
  );
}
