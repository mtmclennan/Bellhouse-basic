import type { ServiceHeroSectionData, ServiceSection } from './serviceSections';
import type { ServiceVisualsConfig } from './interfaces';

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
  visuals?: ServiceVisualsConfig;
  sections: ServiceSection[];
};
