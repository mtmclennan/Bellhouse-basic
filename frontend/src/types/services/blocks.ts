export type ServiceActionVariant = 'primary' | 'secondary' | 'text';

export type ServiceAction = {
  label: string;
  href: string;
  variant?: ServiceActionVariant;
};

export type ServiceBlockImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ServiceSectionTone = 'light' | 'dark' | 'soft' | 'muted' | 'accent';

export type ServiceBaseBlock = {
  id?: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  tone?: ServiceSectionTone;
};

export type ServiceProofStripBlock = ServiceBaseBlock & {
  type: 'proofStrip';
  items: Array<{
    label: string;
    value?: string;
    description?: string;
  }>;
};

export type ServiceIntroBlock = ServiceBaseBlock & {
  type: 'intro';
  body: string;
  bullets?: string[];
};

export type ServiceProjectFitBlock = ServiceBaseBlock & {
  type: 'projectFit';
  cards: Array<{
    title: string;
    body: string;
    tags?: string[];
    outcome?: string;
  }>;
};

export type ServiceScopeBlock = ServiceBaseBlock & {
  type: 'scope';
  items: Array<{
    title: string;
    body: string;
  }>;
};

export type ServiceJobsiteProofBlock = ServiceBaseBlock & {
  type: 'jobsiteProof';
  heading: string;
  body?: string;
  image: ServiceBlockImage;
  caption?: string;
};

export type ServiceProblemsPreventedBlock = ServiceBaseBlock & {
  type: 'problemsPrevented';
  items: Array<{
    problem: string;
    solution: string;
  }>;
};

export type ServiceOutcomesBlock = ServiceBaseBlock & {
  type: 'outcomes';
  items: Array<{
    title: string;
    body: string;
  }>;
};

export type ServiceEquipmentBlock = ServiceBaseBlock & {
  type: 'equipment';
  items: Array<{
    name: string;
    body: string;
    image?: ServiceBlockImage;
  }>;
};

export type ServiceProcessBlock = ServiceBaseBlock & {
  type: 'process';
  image?: ServiceBlockImage;
  caption?: string;
  steps: Array<{
    title: string;
    body: string;
  }>;
};

export type ServiceContractorCtaBlock = ServiceBaseBlock & {
  type: 'contractorCta';
  body: string;
  image?: ServiceBlockImage;
  caption?: string;
  actions: ServiceAction[];
};

export type ServiceResourcesBlock = ServiceBaseBlock & {
  type: 'resources';
  cards: Array<{
    title: string;
    body: string;
    href: string;
    label?: string;
  }>;
  actions?: ServiceAction[];
};

export type ServiceAreasBlock = ServiceBaseBlock & {
  type: 'serviceAreas';
  body?: string;
  areaSlugs?: string[];
};

export type ServiceRelatedServicesBlock = ServiceBaseBlock & {
  type: 'relatedServices';
  serviceSlugs: string[];
};

export type ServiceReviewsBlock = ServiceBaseBlock & {
  type: 'reviews';
  reviewIds?: string[];
  limit?: number;
};

export type ServiceFaqBlock = ServiceBaseBlock & {
  type: 'faq';
  items: Array<{
    question: string;
    answer: string;
  }>;
};

export type ServiceFinalCtaBlock = ServiceBaseBlock & {
  type: 'finalCta';
  body: string;
  actions: ServiceAction[];
};

export type ServiceBlock =
  | ServiceProofStripBlock
  | ServiceIntroBlock
  | ServiceProjectFitBlock
  | ServiceScopeBlock
  | ServiceJobsiteProofBlock
  | ServiceProblemsPreventedBlock
  | ServiceOutcomesBlock
  | ServiceEquipmentBlock
  | ServiceProcessBlock
  | ServiceContractorCtaBlock
  | ServiceResourcesBlock
  | ServiceAreasBlock
  | ServiceRelatedServicesBlock
  | ServiceReviewsBlock
  | ServiceFaqBlock
  | ServiceFinalCtaBlock;
