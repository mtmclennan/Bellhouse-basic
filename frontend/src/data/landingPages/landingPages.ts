import { concreteSlabPrepLandingPage } from './concreteSlabPrep';
import { demolitionContractorLandingPage } from './demolitionContractor';
import { foundationExcavationLandingPage } from './foundationExcavation';
import type { LandingPageData } from './types';

// Local TypeScript data is the current landing page content source.
// This registry can later be replaced by a CMS fetch layer without changing the route.
export const landingPages: LandingPageData[] = [
  foundationExcavationLandingPage,
  concreteSlabPrepLandingPage,
  demolitionContractorLandingPage,
];

export function getLandingPageBySlug(slug: string) {
  return landingPages.find((page) => page.slug === slug);
}

export type { LandingPageData } from './types';
