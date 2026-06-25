export const GOOGLE_REVIEWS_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ||
  'https://g.page/r/CZtOlkcv7cW2EAI/review';

export const GOOGLE_REVIEW_SUMMARY = {
  rating: 5.0,
  reviewCount: 4,
  label: '5.0 on Google',
  href: GOOGLE_REVIEWS_URL,
} as const;
