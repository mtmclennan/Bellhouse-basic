import { serviceAreaPageList } from '@/lib/serviceAreas';
import { getAllServices } from '@/data/services/index';
import reviewsData from '@/data/reviews.json';
import { GOOGLE_REVIEW_SUMMARY, GOOGLE_REVIEWS_URL } from '@/lib/reviewLinks';

export type ServiceAreaIndexEntry = {
  label: string;
  href: string;
};

export type ServiceIndexEntry = {
  title: string;
  description: string;
  href: string;
};

export type ServiceBusinessContext = {
  phoneLabel: string;
  phoneHref: string;
  reviewsHref: string;
  reviewRating: number;
  reviewCount: number;
  reviewLabel: string;
};

export type ServiceReview = {
  id: string;
  name: string;
  rating: number;
  text: string;
  source: string;
};

function buildServiceAreaIndex(): Record<string, ServiceAreaIndexEntry> {
  return Object.fromEntries(
    serviceAreaPageList.map((page) => [
      page.slug,
      {
        label: page.city,
        href: `/service-areas/${page.slug}`,
      },
    ]),
  );
}

function buildServiceIndex(): Record<string, ServiceIndexEntry> {
  return Object.fromEntries(
    getAllServices().map((service) => [
      service.slug,
      {
        title: service.card.title,
        description: service.card.description,
        href: `/services/${service.slug}`,
      },
    ]),
  );
}

function buildServiceReviews(): ServiceReview[] {
  return reviewsData.map((review, index) => ({
    id: `${review.source.toLowerCase()}-${review.name.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`,
    name: review.name,
    rating: review.rating,
    text: review.text,
    source: review.source,
  }));
}

export const SERVICE_SITE_CONTEXT = {
  business: {
    phoneLabel: 'Call or Text Bellhouse',
    phoneHref: 'tel:5197528500',
    reviewsHref: GOOGLE_REVIEWS_URL,
    reviewRating: GOOGLE_REVIEW_SUMMARY.rating,
    reviewCount: GOOGLE_REVIEW_SUMMARY.reviewCount,
    reviewLabel: GOOGLE_REVIEW_SUMMARY.label,
  },
  areaIndex: buildServiceAreaIndex(),
  serviceIndex: buildServiceIndex(),
  reviews: buildServiceReviews(),
} as const;
