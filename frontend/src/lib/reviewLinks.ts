// TODO: Replace this fallback with the verified Bellhouse Google Business Profile review URL before launch.
export const GOOGLE_REVIEWS_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ||
  'https://www.google.com/search?q=Bellhouse+Excavating+reviews';

export const GOOGLE_REVIEW_SUMMARY = {
  rating: 5.0,
  reviewCount: 4,
  label: '5.0 on Google',
  href: GOOGLE_REVIEWS_URL,
} as const;
