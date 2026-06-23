import Image from 'next/image';
import Link from '@/components/SiteLink';
import { CheckCircle, Phone } from '@phosphor-icons/react/dist/ssr';

import type { ServicePage } from '@/types/interfaces';
import type { ResolvedServiceHeroConfig } from '@/lib/servicePageLayout';
import { SERVICE_SITE_CONTEXT } from '@/lib/services/serviceSiteContext';
import type { CmsServicePage, CmsServiceHeroProofBarItem } from '@/types/services/cms';
import { getHeroFormWorkType } from '@/lib/services/serviceFormDefaults';
import LandingIcon from '@/components/landing/LandingIcon';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import ServiceHeroQuoteForm from './ServiceHeroQuoteForm';
import classes from './ServiceHeroSection.module.scss';

type RenderHero = {
  eyebrow?: string;
  heading: string;
  summary: string;
  image: string;
  alt: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  proofChips: string[];
  proofBar?: CmsServiceHeroProofBarItem[];
  sideForm?: boolean;
  phone?: {
    label: string;
    href: string;
  };
  review?: {
    rating: number;
    reviewCount: number;
    href: string;
    label?: string;
  };
  emphasis: 'compact' | 'standard' | 'high';
  breadcrumbLabel: string;
};

type ServiceHeroSectionProps =
  | {
      mode: 'cms';
      hero: CmsServicePage['hero'];
      breadcrumbLabel: string;
      business: typeof SERVICE_SITE_CONTEXT.business;
      serviceSlug?: string;
    }
  | {
      mode: 'legacy';
      service: ServicePage;
      heroConfig: ResolvedServiceHeroConfig;
    };

const defaultPrimaryAction = {
  label: 'Get a Free Estimate',
  href: '/contact',
} as const;

const serviceAreaNote =
  'Serving Brantford, Paris, Hamilton, Cambridge, and surrounding Southern Ontario job sites.';

function renderHeroHeading(heading: string, kwClassName: string) {
  // Design highlights the trailing location phrase ("… in Brantford") in yellow.
  const match = heading.match(/^(.*?)(\bin\s+.+)$/i);
  if (!match) {
    return heading;
  }
  return (
    <>
      {match[1]}
      <span className={kwClassName}>{match[2]}</span>
    </>
  );
}

function formatRating(rating: number) {
  return rating.toFixed(1);
}

function formatReviewSummary(review: NonNullable<RenderHero['review']>) {
  const label = review.label ?? `${formatRating(review.rating)} on Google`;
  const reviewNoun = review.reviewCount === 1 ? 'review' : 'reviews';

  return `${label} (${review.reviewCount} ${reviewNoun})`;
}

function toRenderHero(props: ServiceHeroSectionProps): RenderHero {
  if (props.mode === 'cms') {
    const actions = Array.isArray(props.hero.actions) ? props.hero.actions : [];

    const primaryAction = actions[0]
      ? {
          label: actions[0].label,
          href: actions[0].href,
        }
      : defaultPrimaryAction;

    const secondaryAction = actions[1]
      ? {
          label: actions[1].label,
          href: actions[1].href,
        }
      : undefined;

    return {
      eyebrow: props.hero.eyebrow,
      heading: props.hero.heading,
      summary: props.hero.summary,
      image: props.hero.image,
      alt: props.hero.alt,
      primaryAction,
      secondaryAction,
      proofChips: props.hero.proofPoints?.slice(0, 4) ?? [],
      proofBar: props.hero.proofBar,
      sideForm: props.hero.sideForm,
      phone: {
        label: props.business.phoneLabel,
        href: props.business.phoneHref,
      },
      review: {
        rating: props.business.reviewRating,
        reviewCount: props.business.reviewCount,
        href: props.business.reviewsHref,
        label: props.business.reviewLabel,
      },
      emphasis: props.hero.emphasis ?? 'standard',
      breadcrumbLabel: props.breadcrumbLabel,
    };
  }

  return {
    eyebrow: props.heroConfig.eyebrow,
    heading: props.service.hero.heading,
    summary: props.heroConfig.summary,
    image: props.service.hero.image,
    alt: props.service.hero.alt,
    primaryAction: props.heroConfig.primaryAction,
    secondaryAction: props.heroConfig.secondaryAction,
    proofChips: props.heroConfig.proofChips,
    phone: props.heroConfig.phone,
    review: props.heroConfig.review,
    emphasis: props.heroConfig.emphasis,
    breadcrumbLabel: props.service.hero.heading,
  };
}

export default function ServiceHeroSection(props: ServiceHeroSectionProps) {
  const hero = toRenderHero(props);
  const hasSecondaryAction = Boolean(hero.secondaryAction);
  const hasProofChips = hero.proofChips.length > 0;
  const hasTrustRow = Boolean(hero.phone || hero.review);
  const hasProofBar = Boolean(hero.proofBar && hero.proofBar.length > 0);

  const heroContainerClassName = [classes.shell, classes.heroContainer]
    .filter(Boolean)
    .join(' ');

  const isExternalReviewLink = Boolean(
    hero.review?.href?.startsWith('http://') ||
    hero.review?.href?.startsWith('https://'),
  );

  const copyPanel = (
    <div className={classes.copyPanel}>
      <nav className={classes.breadcrumbs} aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/services">Services</Link>
          </li>
          <li aria-current="page">{hero.breadcrumbLabel}</li>
        </ol>
      </nav>

      {hero.eyebrow ? (
        <p className={classes.eyebrow}>{hero.eyebrow}</p>
      ) : null}

      <div className={classes.headingGroup}>
        <h1>{hero.heading}</h1>
        <p className={classes.summary}>{hero.summary}</p>
      </div>

      <div className={classes.actions}>
        <Link
          href={hero.primaryAction.href}
          className={classes.primaryButton}
        >
          {hero.primaryAction.label}
        </Link>

        {hasSecondaryAction && hero.secondaryAction ? (
          <Link
            href={hero.secondaryAction.href}
            className={classes.secondaryButton}
          >
            {hero.secondaryAction.label}
          </Link>
        ) : null}
      </div>

      <p className={classes.ctaNote}>{serviceAreaNote}</p>
    </div>
  );

  if (hero.sideForm) {
    const sideFormCopy = (
      <div className={classes.copyPanel}>
        <nav className={classes.breadcrumbs} aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li aria-current="page">{hero.breadcrumbLabel}</li>
          </ol>
        </nav>

        {hero.eyebrow ? (
          <p className={classes.eyebrow}>{hero.eyebrow}</p>
        ) : null}

        <div className={classes.sideFormHeadingGroup}>
          <h1>{renderHeroHeading(hero.heading, classes.kw)}</h1>
          <p className={classes.summary}>{hero.summary}</p>
        </div>

        {hasProofChips ? (
          <ul className={classes.heroBullets} aria-label="Service highlights">
            {hero.proofChips.map((chip) => (
              <li key={chip} className={classes.heroBulletItem}>
                <CheckCircle size={20} color="#ffc302" weight="fill" aria-hidden />
                <span>{chip}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className={classes.actions}>
          <Link href={hero.primaryAction.href} className={classes.primaryButton}>
            {hero.primaryAction.label}
          </Link>
          {hero.phone ? (
            <Link href={hero.phone.href} className={classes.phoneCta}>
              <Phone size={22} color="#ffc302" weight="duotone" aria-hidden />
              {hero.phone.label}
            </Link>
          ) : null}
        </div>
      </div>
    );

    return (
      <section className={classes.section} data-variant="side-form" data-hero-emphasis={hero.emphasis}>
        <div className={classes.heroBg} aria-hidden="true">
          <Image
            src={hero.image}
            alt=""
            fill
            priority
            className={classes.heroBgImg}
            sizes="100vw"
          />
          <div className={classes.heroBgScrim} />
        </div>

        <ServiceSectionWrapper
          as="div"
          spacing="10"
          className={classes.inner}
          containerClassName={[classes.sideFormShell, classes.heroContainer].join(' ')}
        >
          {sideFormCopy}

          <div className={classes.sideFormPanel}>
            <ServiceHeroQuoteForm
              heading={hero.primaryAction.label}
              workType={
                props.mode === 'cms'
                  ? getHeroFormWorkType(props.serviceSlug ?? '')
                  : getHeroFormWorkType(props.service.slug)
              }
            />
          </div>
        </ServiceSectionWrapper>

        {hasProofBar ? (
          <div className={classes.proofBar} role="list" aria-label="Why choose Bellhouse">
            <div className={classes.proofBarInner}>
              {hero.proofBar!.map((item) => (
                <div key={item.title} className={classes.proofBarItem} role="listitem">
                  {item.icon ? (
                    <span className={classes.proofBarIcon} aria-hidden="true">
                      <LandingIcon name={item.icon} size={22} color="#ffc302" weight="fill" />
                    </span>
                  ) : null}
                  <div className={classes.proofBarText}>
                    <div className={classes.proofBarTitle}>{item.title}</div>
                    {item.subtitle ? (
                      <div className={classes.proofBarSubtitle}>{item.subtitle}</div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    );
  }

  return (
    <section className={classes.section} data-hero-emphasis={hero.emphasis}>
      <ServiceSectionWrapper
        as="div"
        spacing="10"
        className={classes.inner}
        containerClassName={heroContainerClassName}
      >
        {copyPanel}

        <div className={classes.mediaPanel}>
          <div className={classes.imageFrame}>
            <Image
              className={classes.image}
              src={hero.image}
              alt={hero.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw, 500px"
            />
            <div className={classes.imageOverlay} aria-hidden="true" />
          </div>

          {hasTrustRow || hasProofChips ? (
            <div className={classes.mediaSupportCard}>
              <div className={classes.supportHeader}>
                <span>Need pricing or availability?</span>

                {hero.phone ? (
                  <Link
                    href={hero.phone.href}
                    className={classes.supportPhoneLink}
                  >
                    {hero.phone.label}
                  </Link>
                ) : null}
              </div>

              {hero.review ? (
                <Link
                  href={hero.review.href}
                  className={classes.supportReviewLink}
                  target={isExternalReviewLink ? '_blank' : undefined}
                  rel={isExternalReviewLink ? 'noopener noreferrer' : undefined}
                >
                  <span className={classes.stars} aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={`hero-review-star-${index}`}>{'\u2605'}</span>
                    ))}
                  </span>

                  <span>{formatReviewSummary(hero.review)}</span>

                  <span className={classes.reviewCta}>Read Reviews</span>
                </Link>
              ) : null}

              {hasProofChips ? (
                <ul
                  className={classes.supportProofList}
                  aria-label="Service highlights"
                >
                  {hero.proofChips.map((chip) => (
                    <li key={chip} className={classes.supportProofItem}>
                      {chip}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>
      </ServiceSectionWrapper>

      {hasProofBar ? (
        <div className={classes.proofBar} role="list" aria-label="Why choose Bellhouse">
          <div className={classes.proofBarInner}>
            {hero.proofBar!.map((item) => (
              <div key={item.title} className={classes.proofBarItem} role="listitem">
                {item.icon ? (
                  <span className={classes.proofBarIcon} aria-hidden="true">
                    <LandingIcon name={item.icon} size={22} color="#ffc302" weight="fill" />
                  </span>
                ) : null}
                <div className={classes.proofBarText}>
                  <div className={classes.proofBarTitle}>{item.title}</div>
                  {item.subtitle ? (
                    <div className={classes.proofBarSubtitle}>{item.subtitle}</div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
