export interface Equipment {
  _id: string;
  unitNumber: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  engine: string;
  unitType: string;
}

export interface Res {
  status: string;
}

export interface Html {
  __html: string;
}

export interface ServiceRequest {
  _id: string;
  unit: Equipment;
  serviceRequest: string;
  requestDate: string;
}

export type ServiceSectionId =
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

export type ServiceSectionEmphasis = 'low' | 'standard' | 'high';

export interface ServiceLayoutSection {
  id: ServiceSectionId;
  enabled?: boolean;
  emphasis?: ServiceSectionEmphasis;
}

export interface ServiceHeroLayoutConfig {
  emphasis?: 'compact' | 'standard' | 'high';
  eyebrow?: string;
  summary?: string;
  proofChips?: string[];
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export interface ServiceModuleCtaLayoutConfig {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export interface ServiceResourcesLayoutConfig {
  eyebrow?: string;
  title?: string;
  description?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
}

export interface ServiceFinalCtaLayoutConfig {
  mode?: 'quote' | 'contact' | 'contractor' | 'mixed';
  heading?: string;
  subheading?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export interface ServicePageLayout {
  hero?: ServiceHeroLayoutConfig;
  contractorCta?: ServiceModuleCtaLayoutConfig;
  resources?: ServiceResourcesLayoutConfig;
  finalCta?: ServiceFinalCtaLayoutConfig;
  sections?: Array<ServiceSectionId | ServiceLayoutSection>;
}

export interface ServicePage {
  meta: {
    title: string;
    description: string;
  };

  card: {
    title: string;
    description: string;
    image: string;
    alt: string;
  };

  slug: string;

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
    items: {
      title: string;
      description: string;
      projectTypes?: string[];
      outcome?: string;
    }[];
  };

  includes?: {
    heading: string;
    subheading?: string;
    items: {
      title: string;
      description: string;
    }[];
  };

  equipment?: {
    heading: string;
    subheading?: string;
    items: {
      icon?: string; // optional icon image
      title: string;
      description: string;
    }[];
  };

  process?: {
    heading: string;
    subheading?: string;
    steps: {
      title: string;
      description: string;
    }[];
  };

  serviceArea?: {
    heading: string;
    content: string;
    locations: string[];
  };

  faq?: {
    heading: string;
    items: {
      question: string;
      answer: string;
    }[];
  };

  cta?: {
    heading: string;
    subheading: string;
    button: string;
  };

  layout?: ServicePageLayout;
}

export interface Service {
  unit?: string | Equipment;
  serviceDate: string;
  hours?: number;
  mileage?: number;
  maintenance?: string;
  repair?: string;
  _id: string;
}
