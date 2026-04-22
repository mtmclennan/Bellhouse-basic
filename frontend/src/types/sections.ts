export type SectionLink = {
  label: string;
  href: string;
};

export type SectionActionLink = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
};

export type HeroReview = {
  rating: number;
  reviewCount: number;
  label?: string;
  href: string;
};

export type HeroProofItem = {
  label: string;
};

export type HeroImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type HeroSectionData = {
  _type: 'heroSection';
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  primaryAction?: SectionLink;
  secondaryAction?: SectionLink;
  phone?: SectionLink;
  review?: HeroReview;
  proofItems?: HeroProofItem[];
  align?: 'left' | 'center';
  theme?: 'dark' | 'light';
  overlay?: 'dark' | 'light' | 'transparent' | 'none';
  density?: 'default' | 'compact';
};

export type ProofIcon =
  | 'buildings'
  | 'truck'
  | 'shield'
  | 'mapPin'
  | 'clock'
  | 'users';

export type ProofItem = {
  title: string;
  text: string;
  icon?: ProofIcon;
};

export type ProofSectionData = {
  _type: 'proofSection';
  eyebrow?: string;
  heading: string;
  intro?: string[];
  items: ProofItem[];
  backgroundVariant?: 'light' | 'dark' | 'transparent';
  backgroundTone?: 'default' | 'soft' | 'muted';
  footerLink?: SectionLink;
};

export type ServicesSectionCard = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
};

export type ServicesSectionData = {
  _type: 'servicesSection';
  eyebrow?: string;
  heading: string;
  intro?: string;
  items: ServicesSectionCard[];
  actions?: SectionActionLink[];
  backgroundVariant?: 'light' | 'dark' | 'transparent';
  backgroundTone?: 'default' | 'soft' | 'muted';
};

export type AudienceSectionItem = {
  title: string;
  text: string;
  href: string;
  linkLabel: string;
  icon?: 'house' | 'hammer' | 'leaf' | 'buildings';
  tag?: string;
  relatedServiceSlugs?: string[];
};

export type AudienceSectionData = {
  _type: 'audienceSection';
  eyebrow?: string;
  heading: string;
  intro?: string;
  items: AudienceSectionItem[];
  backgroundVariant?: 'light' | 'dark' | 'transparent';
  backgroundTone?: 'default' | 'soft' | 'muted';
  footerLink?: SectionLink;
};

export type TestimonialItem = {
  name: string;
  rating: number;
  text: string;
  source: string;
};

export type TestimonialsSectionData = {
  _type: 'testimonialsSection';
  eyebrow?: string;
  heading: string;
  subtext?: string;
  items: TestimonialItem[];
  reviewSummary?: string;
  footerLink?: SectionLink;
  backgroundVariant?: 'light' | 'dark' | 'transparent';
  backgroundTone?: 'default' | 'soft' | 'muted';
};

export type ServiceAreaLocation = {
  label: string;
  href?: string;
};

export type ServiceAreasSectionData = {
  _type: 'serviceAreasSection';
  eyebrow?: string;
  heading: string;
  subtext?: string;
  locations: ServiceAreaLocation[];
  actions?: SectionActionLink[];
  backgroundVariant?: 'light' | 'dark' | 'transparent';
  backgroundTone?: 'default' | 'soft' | 'muted';
};

export type ResourcesSectionData = {
  _type: 'resourcesSection';
  eyebrow?: string;
  heading: string;
  subtext?: string;
  items: ResourceSectionCard[];
  footerText?: string;
  footerActions?: SectionActionLink[];
  backgroundVariant?: 'light' | 'dark' | 'transparent';
  backgroundTone?: 'default' | 'soft' | 'muted';
};

export type BackgroundVariant = 'light' | 'dark' | 'transparent';
export type BackgroundTone = 'default' | 'soft' | 'muted';

export type ResourceSectionCard = {
  id: string;
  title: string;
  description: string;
  meta?: string;
  detail?: string;
  icon?: ResourceIcon;
  image?: string;
  outputs?: string[];
  tag?: string;
  href?: string;
  linkLabel?: string;
  actions?: SectionActionLink[];
};

export type ResourceIcon =
  | 'calculator'
  | 'truck'
  | 'ruler'
  | 'layers'
  | 'shovel';

export type FinalCtaProofItem = {
  label: string;
};

export type FinalCtaSectionData = {
  _type: 'finalCtaSection';
  eyebrow?: string;
  heading: string;
  text: string;
  primaryAction: SectionLink;
  secondaryAction?: SectionLink;
  phone?: SectionLink;
  proofItems?: FinalCtaProofItem[];
  note?: string;
  backgroundVariant?: 'light' | 'dark' | 'transparent';
  backgroundTone?: 'default' | 'soft' | 'muted';
};

export type AboutStoryImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type AboutStorySectionData = {
  _type: 'aboutStorySection';
  eyebrow?: string;
  heading: string;
  intro: string[];
  image: AboutStoryImage;
  imageBadges?: string[];
  historyHeading?: string;
  history: string[];
  primaryAction?: SectionLink;
  secondaryAction?: SectionLink;
  backgroundVariant?: 'light' | 'dark' | 'transparent';
  backgroundTone?: 'default' | 'soft' | 'muted';
};

export type FaqItemData = {
  id?: string;
  question: string;
  answer: string | string[];
};

export type FaqSectionData = {
  _type: 'faqSection';
  eyebrow?: string;
  heading: string;
  subtext?: string;
  items: FaqItemData[];
  footerLink?: SectionLink;
  backgroundVariant?: 'light' | 'dark' | 'transparent';
  backgroundTone?: 'default' | 'soft' | 'muted';
};
