import reviews from '@/data/reviews.json';
import type { ServiceReviewsSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceReviewsSection.module.scss';

interface ServiceReviewsSectionProps {
  appearance: ServiceSectionAppearance;
  section?: ServiceReviewsSectionData;
}

function getReviewSummary(items: typeof reviews) {
  const sourceLabels = Array.from(new Set(items.map((review) => review.source)));

  if (sourceLabels.length === 0) {
    return 'Local customer feedback';
  }

  if (sourceLabels.length === 1) {
    return `${items.length} local review${items.length === 1 ? '' : 's'} from ${sourceLabels[0]}`;
  }

  const lastSource = sourceLabels[sourceLabels.length - 1];
  const leadingSources = sourceLabels.slice(0, -1);
  const sourcesLabel = `${leadingSources.join(', ')} and ${lastSource}`;

  return `${items.length} local reviews from ${sourcesLabel}`;
}

export default function ServiceReviewsSection({
  appearance,
  section,
}: ServiceReviewsSectionProps) {
  const visibleReviews =
    typeof section?.limit === 'number' ? reviews.slice(0, section.limit) : reviews;

  if (visibleReviews.length === 0) {
    return null;
  }

  const sectionClassName = [
    classes.reviewsSection,
    appearance.backgroundVariant === 'dark'
      ? classes.reviewsSectionDark
      : classes.reviewsSectionLight,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ServiceSectionWrapper
      spacing="6"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={sectionClassName}
      containerClassName={classes.reviewsShell}
      heading={{
        eyebrow: section?.eyebrow ?? 'Testimonials',
        title: section?.heading ?? 'What customers say about Bellhouse',
        subtext:
          section?.subheading ??
          'Feedback from local homeowners, builders, and job-site customers Bellhouse has worked with.',
        align: 'left',
      }}
    >
      <div className={classes.reviewsIntroBar}>
        <div className={classes.reviewSummary}>
          <span className={classes.reviewStars} aria-hidden="true">
            {'★★★★★'}
          </span>
          <strong>5.0 rating</strong>
          <span>{getReviewSummary(visibleReviews)}</span>
        </div>
      </div>

      <ul className={classes.reviewList}>
        {visibleReviews.map((review, index) => (
          <li
            className={classes.reviewItem}
            key={`${review.name}-${review.source}-${review.text.slice(0, 24)}`}
          >
            <article className={classes.reviewCard}>
              <div className={classes.reviewMeta}>
                <span className={classes.reviewIndex}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={classes.reviewSource}>{review.source}</span>
              </div>

              <p className={classes.reviewText}>{review.text}</p>

              <div className={classes.reviewFooter}>
                <span className={classes.reviewName}>{review.name}</span>
                <span className={classes.reviewRating} aria-label={`${review.rating} star review`}>
                  {'★'.repeat(review.rating)}
                </span>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </ServiceSectionWrapper>
  );
}
