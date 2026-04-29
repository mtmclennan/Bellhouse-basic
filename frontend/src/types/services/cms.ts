import type { ServiceAction, ServiceBlock } from './blocks';

export type CmsServiceMeta = {
  title: string;
  description: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
};

export type CmsServiceVisualBackground = {
  src: string;
  position?: string;
};

export type CmsServiceVisuals = {
  background?: CmsServiceVisualBackground;
};

export type CmsServiceCard = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type CmsServiceHero = {
  eyebrow?: string;
  heading: string;
  summary: string;
  actions?: ServiceAction[];
  proofPoints?: string[];
  emphasis?: 'compact' | 'standard' | 'high';
  image: string;
  alt: string;
};

export type CmsServicePage = {
  slug: string;
  title: string;
  navTitle: string;
  meta: CmsServiceMeta;
  card: CmsServiceCard;
  hero: CmsServiceHero;
  visuals?: CmsServiceVisuals;
  sections: ServiceBlock[];
};
