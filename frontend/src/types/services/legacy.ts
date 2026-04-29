import type { CmsServiceVisuals } from './cms';

export type LegacyServiceSectionId =
  | 'intro'
  | 'fit'
  | 'proof'
  | 'equipment'
  | 'process'
  | 'localIntent'
  | 'contractorCta'
  | 'resources'
  | 'faq'
  | 'relatedServices'
  | 'reviews'
  | 'finalCta';

export type LegacyServiceHeroLayoutConfig = {
  emphasis?: 'compact' | 'standard' | 'high';
  eyebrow?: string;
  summary?: string;
  proofChips?: string[];
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type LegacyServiceModuleCtaLayoutConfig = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type LegacyServiceResourcesLayoutConfig = {
  eyebrow?: string;
  title?: string;
  description?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
};

export type LegacyServiceFinalCtaLayoutConfig = {
  mode?: 'quote' | 'contact' | 'contractor' | 'mixed';
  heading?: string;
  subheading?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type LegacyServicePageLayout = {
  hero?: LegacyServiceHeroLayoutConfig;
  contractorCta?: LegacyServiceModuleCtaLayoutConfig;
  resources?: LegacyServiceResourcesLayoutConfig;
  finalCta?: LegacyServiceFinalCtaLayoutConfig;
  sections?: LegacyServiceSectionId[];
};

export type LegacyServicePage = {
  slug: string;
  meta: {
    title: string;
    description: string;
    openGraphTitle?: string;
    openGraphDescription?: string;
  };
  card: {
    title: string;
    description: string;
    image: string;
    alt: string;
  };
  hero: {
    heading: string;
    subheading: string;
    image: string;
    alt: string;
  };
  intro: {
    heading: string;
    content: string;
    keypoints: string[];
  };
  fit?: {
    heading: string;
    subheading?: string;
    items: Array<{
      title: string;
      description: string;
      projectTypes?: string[];
      outcome?: string;
    }>;
  };
  includes?: {
    heading: string;
    subheading?: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  equipment?: {
    heading: string;
    subheading?: string;
    items: Array<{
      icon?: string;
      title: string;
      description: string;
    }>;
  };
  process?: {
    heading: string;
    subheading?: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  serviceArea?: {
    heading: string;
    content: string;
    locations: string[];
  };
  faq?: {
    heading: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta?: {
    heading: string;
    subheading: string;
    button: string;
  };
  visuals?: CmsServiceVisuals;
  layout?: LegacyServicePageLayout;
};
