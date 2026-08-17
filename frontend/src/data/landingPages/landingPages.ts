import { concreteSlabPrepLandingPage } from './concreteSlabPrep';
import { commercialParkingLotLandingPage } from './commercialParkingLot';
import { commercialSitePreparationLandingPage } from './commercialSitePreparation';
import { demolitionContractorLandingPage } from './demolitionContractor';
import { foundationExcavationBrantCountyLandingPage } from './foundationExcavationBrantCounty';
import { foundationExcavationLandingPage } from './foundationExcavation';
import { ruralDrivewayFarmLanewayLandingPage } from './ruralDrivewayFarmLaneway';
import type { LandingPageData } from './types';

// Local TypeScript data is the current landing page content source.
// This registry can later be replaced by a CMS fetch layer without changing the route.
export const landingPages: LandingPageData[] = [
  foundationExcavationLandingPage,
  foundationExcavationBrantCountyLandingPage,
  concreteSlabPrepLandingPage,
  commercialParkingLotLandingPage,
  commercialSitePreparationLandingPage,
  demolitionContractorLandingPage,
  ruralDrivewayFarmLanewayLandingPage,
];

export function getLandingPageBySlug(slug: string) {
  return landingPages.find((page) => page.slug === slug);
}

export type { LandingPageData } from './types';
