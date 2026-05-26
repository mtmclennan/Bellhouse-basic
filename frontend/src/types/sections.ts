import type { StaticImageData } from 'next/image';

export type SectionLink = {
  label: string;
  href: string;
};

export type RichTextLink = {
  label: string;
  href: string;
};

export type RichTextPart = string | RichTextLink;
export type RichTextParagraph = string | RichTextPart[];

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
  src: string | StaticImageData;
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
  density?: 'default' | 'compact' | 'tight';
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

export type ServicesSectionGroup = {
  id: string;
  heading: string;
  description?: RichTextParagraph;
  items: ServicesSectionCard[];
};

export type ServicesSectionData = {
  _type: 'servicesSection';
  id?: string;
  eyebrow?: string;
  heading: string;
  intro?: RichTextParagraph;
  items?: ServicesSectionCard[];
  groups?: ServicesSectionGroup[];
  actions?: SectionActionLink[];
  backgroundVariant?: 'light' | 'dark' | 'transparent';
  backgroundTone?: 'default' | 'soft' | 'muted';
  cardSize?: 'default' | 'large';
};

export type AudienceSectionItem = {
  title: string;
  text: string;
  href: string;
  linkLabel: string;
  icon?: 'house' | 'hammer' | 'leaf' | 'buildings';
  tag?: string;
  relatedServiceSlugs?: string[];
  relatedServiceTitles?: string[];
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
  density?: 'compact' | 'default' | 'relaxed';
  headingAlign?: 'left' | 'center';
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
  locationLinkLabelPrefix?: string;
  actions?: SectionActionLink[];
  backgroundVariant?: 'light' | 'dark' | 'transparent';
  backgroundTone?: 'default' | 'soft' | 'muted';
  density?: 'compact' | 'default' | 'relaxed';
};

export type CardGridSectionCard = {
  title: string;
  description: string;
  tags?: string[];
  outcome?: string;
};

export type CardGridSectionData = {
  _type: 'cardGridSection';
  eyebrow?: string;
  heading: string;
  subtext?: string;
  cards: CardGridSectionCard[];
  backgroundVariant?: 'light' | 'dark' | 'transparent';
  backgroundTone?: 'default' | 'soft' | 'muted';
  density?: 'compact' | 'default' | 'relaxed';
  headingAlign?: 'left' | 'center';
  layoutStyle?: 'default' | 'proof' | 'fit';
};

export type ContactMethodIcon = 'call' | 'text' | 'form';

export type ContactMethodsSectionMethod = {
  id: string;
  title: string;
  text: string;
  action: SectionLink;
  icon?: ContactMethodIcon;
};

export type ContactMethodsSectionData = {
  _type: 'contactMethodsSection';
  eyebrow?: string;
  heading: string;
  intro: string;
  fitText?: string;
  methods: ContactMethodsSectionMethod[];
  supportingLinks?: SectionActionLink[];
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
  density?: 'compact' | 'default' | 'relaxed';
  headingAlign?: 'left' | 'center';
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
  density?: 'default' | 'compact';
};

export type AboutStoryImage = {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
};

export type AboutStoryProofItem = {
  label: string;
  detail?: string;
  icon?: ProofIcon;
};

export type AboutStoryHighlightItem = {
  title: string;
  text: string;
  icon?: ProofIcon;
};

export type AboutStorySectionData = {
  _type: 'aboutStorySection';
  eyebrow?: string;
  heading: string;
  intro: RichTextParagraph[];
  proofItems?: AboutStoryProofItem[];
  image: AboutStoryImage;
  supportingImage?: AboutStoryImage;
  supportingImageLabel?: string;
  imageBadges?: string[];
  historyHeading?: string;
  history: RichTextParagraph[];
  historyHighlights?: AboutStoryHighlightItem[];
  primaryAction?: SectionLink;
  secondaryAction?: SectionLink;
  backgroundVariant?: 'light' | 'dark' | 'transparent';
  backgroundTone?: 'default' | 'soft' | 'muted';
};

export type FaqItemData = {
  id?: string;
  question: string;
  answer: RichTextParagraph | RichTextParagraph[];
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
  density?: 'compact' | 'default' | 'relaxed';
  headingAlign?: 'left' | 'center';
};
