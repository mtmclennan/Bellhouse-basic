export type ServiceAction = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'text';
};

export type ServiceImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ServiceSectionTone = 'light' | 'dark' | 'soft' | 'muted' | 'accent';

export type ServiceBaseSection = {
  id?: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  tone?: ServiceSectionTone;
};

export type ServiceHeroSectionData = {
  eyebrow?: string;
  heading: string;
  summary: string;
  actions?: ServiceAction[];
  proofPoints?: string[];
  image?: ServiceImage;
  emphasis?: 'compact' | 'standard' | 'high';
};

export type ServiceProofStripSectionData = ServiceBaseSection & {
  type: 'proofStrip';
  items: Array<{
    label: string;
    value?: string;
    description?: string;
  }>;
};

export type ServiceIntroSectionData = ServiceBaseSection & {
  type: 'intro';
  body: string;
  bullets?: string[];
};

export type ServiceProjectFitSectionData = ServiceBaseSection & {
  type: 'projectFit';
  cards: Array<{
    title: string;
    body: string;
    tags?: string[];
    outcome?: string;
  }>;
};

export type ServiceScopeSectionData = ServiceBaseSection & {
  type: 'scope';
  items: Array<{
    title: string;
    body: string;
    icon?: string;
  }>;
};

export type ServiceJobsiteProofSectionData = ServiceBaseSection & {
  type: 'jobsiteProof';
  heading: string;
  body?: string;
  image: ServiceImage;
  caption?: string;
};

export type ServiceProblemsPreventedSectionData = ServiceBaseSection & {
  type: 'problemsPrevented';
  items: Array<{
    problem: string;
    solution: string;
  }>;
};

export type ServiceOutcomesSectionData = ServiceBaseSection & {
  type: 'outcomes';
  items: Array<{
    title: string;
    body: string;
  }>;
  stats?: Array<{
    label: string;
    body: string;
  }>;
  photos?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
};

export type ServiceEquipmentSectionData = ServiceBaseSection & {
  type: 'equipment';
  items: Array<{
    name: string;
    body: string;
    image?: ServiceImage;
  }>;
};

export type ServiceProcessSectionData = ServiceBaseSection & {
  type: 'process';
  image?: ServiceImage;
  caption?: string;
  steps: Array<{
    title: string;
    body: string;
  }>;
};

export type ServiceContractorCtaSectionData = ServiceBaseSection & {
  type: 'contractorCta';
  body: string;
  image?: ServiceImage;
  caption?: string;
  actions: ServiceAction[];
};

export type ServiceResourcesSectionData = ServiceBaseSection & {
  type: 'resources';
  cards: Array<{
    title: string;
    body: string;
    href: string;
    label?: string;
  }>;
  actions?: ServiceAction[];
};

export type ServiceAreasSectionData = ServiceBaseSection & {
  type: 'serviceAreas';
  body?: string;
  areaSlugs?: string[];
};

export type ServiceRelatedServicesSectionData = ServiceBaseSection & {
  type: 'relatedServices';
  serviceSlugs: string[];
};

export type ServiceReviewsSectionData = ServiceBaseSection & {
  type: 'reviews';
  reviewIds?: string[];
  limit?: number;
};

export type ServiceFaqSectionData = ServiceBaseSection & {
  type: 'faq';
  items: Array<{
    question: string;
    answer: string;
  }>;
};

export type ServiceFinalCtaNavGroup = {
  label: string;
  icon?: string;
  links: Array<{ label: string; href: string; icon?: string }>;
};

export type ServiceFinalCtaSectionData = ServiceBaseSection & {
  type: 'finalCta';
  body: string;
  actions: ServiceAction[];
  bullets?: string[];
  form?: boolean;
  navGroups?: ServiceFinalCtaNavGroup[];
};

export type ServicePricingFactorsSectionData = ServiceBaseSection & {
  type: 'pricingFactors';
  body?: string;
  tiers?: Array<{
    name: string;
    eg: string;
    position?: 'low' | 'mid' | 'high';
  }>;
  rangeNote?: string;
  factors: Array<{
    title: string;
    body: string;
  }>;
  aside?: {
    label?: string;
    heading: string;
    body: string;
    action?: { label: string; href: string };
    phone?: { label: string; href: string };
  };
};

export type ServiceBannerSectionData = ServiceBaseSection & {
  type: 'banner';
  image: ServiceImage;
  body?: string;
  bullets?: string[];
  actions: ServiceAction[];
};

export type ServiceSection =
  | ServiceProofStripSectionData
  | ServiceIntroSectionData
  | ServiceProjectFitSectionData
  | ServiceScopeSectionData
  | ServiceJobsiteProofSectionData
  | ServiceProblemsPreventedSectionData
  | ServiceOutcomesSectionData
  | ServiceEquipmentSectionData
  | ServiceProcessSectionData
  | ServiceContractorCtaSectionData
  | ServiceResourcesSectionData
  | ServiceAreasSectionData
  | ServiceRelatedServicesSectionData
  | ServiceReviewsSectionData
  | ServiceFaqSectionData
  | ServiceFinalCtaSectionData
  | ServicePricingFactorsSectionData
  | ServiceBannerSectionData;
