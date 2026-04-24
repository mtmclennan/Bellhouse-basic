import type { ServiceHeroSectionData, ServiceSection } from './serviceSections';

export type ServicePageV2 = {
  slug: string;
  title: string;
  navTitle: string;
  meta: {
    title: string;
    description: string;
  };
  card: {
    title: string;
    description: string;
  };
  hero: ServiceHeroSectionData;
  sections: ServiceSection[];
};
