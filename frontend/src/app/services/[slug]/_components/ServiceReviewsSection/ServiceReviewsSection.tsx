import { Star } from '@phosphor-icons/react/dist/ssr';

import type {
  ServiceBusinessContext,
  ServiceReview,
} from '@/lib/services/serviceSiteContext';
import type { ServiceReviewsSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceReviewsSection.module.scss';

interface ServiceReviewsSectionProps {
  section: ServiceReviewsSectionData;
  appearance: ServiceSectionAppearance;
  reviews: ServiceReview[];
  business: ServiceBusinessContext;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 1).toUpperCase();
}

export default function ServiceReviewsSection({
  appearance,
  section,
  reviews,
}: ServiceReviewsSectionProps) {
  if (reviews.length === 0) {
    return null;
  }

  const isLight = appearance.backgroundVariant === 'light';

  const sectionClassName = [
    classes.reviewsSection,
    isLight ? classes.reviewsSectionLight : classes.reviewsSectionDark,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ServiceSectionWrapper
      spacing="6"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={sectionClassName}
      heading={{
        eyebrow: section.eyebrow ?? 'What people say',
        title: section.heading ?? 'Bellhouse reviews',
        align: 'center',
      }}
    >
      <div className={classes.reviewsGrid}>
        {reviews.map((review) => (
          <article key={review.id} className={classes.reviewCard}>
            <div className={classes.reviewStars} aria-label={`${review.rating} star review`}>
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} size={17} weight="fill" color="#ffc302" aria-hidden />
              ))}
            </div>

            <p className={classes.reviewText}>&ldquo;{review.text}&rdquo;</p>

            <div className={classes.reviewMeta}>
              <div className={classes.reviewAvatar} aria-hidden="true">
                {getInitials(review.name)}
              </div>
              <div>
                <div className={classes.reviewName}>{review.name}</div>
                <div className={classes.reviewSource}>{review.source}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </ServiceSectionWrapper>
  );
}
