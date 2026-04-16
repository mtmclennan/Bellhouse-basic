import type { ReactElement } from 'react';
import {
  CompassTool,
  Shovel,
  Stack,
} from '@phosphor-icons/react/dist/ssr';
import { calculatorSeoConfig } from './seo';
import type { CalculatorKind } from '../types/calculator';

export type CalculatorResourceCard = {
  slug: CalculatorKind;
  href: string;
  serviceHref: string;
  serviceLabel: string;
  imageSrc: string;
  icon: ReactElement;
  meta: string;
  shortDescription: string;
  blurb: string;
  whatItEstimates: string;
  whoItsFor: string;
  outputs: readonly string[];
};

export const calculatorResourceCards: readonly CalculatorResourceCard[] = [
  {
    slug: 'excavation',
    href: calculatorSeoConfig.excavation.resourcePath,
    serviceHref: '/services/foundation-excavation',
    serviceLabel: 'Related service: Foundation excavation',
    imageSrc: '/assets/calculators/excavation-calculator.webp',
    icon: <Shovel size={26} weight="fill" />,
    meta: 'Excavation estimating',
    shortDescription:
      'Estimate excavation removals, loose haul-out, and truck loads for foundation digs and cut work.',
    blurb:
      'Plan excavation removals with a swell-based estimate that keeps in-place volume, loose haul-out, loads, and weight in the right order.',
    whatItEstimates:
      'In-place excavation volume, loose material to haul, estimated weight, and truck loads.',
    whoItsFor:
      'Homeowners, builders, and crews pricing foundation digs, cut work, trenching, and general haul-out.',
    outputs: ['Excavation volume', 'Loose material', 'Truck loads'],
  },
  {
    slug: 'gravel',
    href: calculatorSeoConfig.gravel.resourcePath,
    serviceHref: '/services/dirt-gravel-delivery',
    serviceLabel: 'Related service: Dirt and gravel delivery',
    imageSrc: '/assets/calculators/gravel-calculator.webp',
    icon: <Stack size={26} weight="fill" />,
    meta: 'Aggregate estimating',
    shortDescription:
      'Check gravel and base quantities for driveways, pads, lanes, and compacted placement work.',
    blurb:
      'Check compacted gravel and base quantities for placed material, with compaction-focused math that stays separate from excavation hauling logic.',
    whatItEstimates:
      'Compacted base volume, delivered material quantity, estimated weight, and truck loads.',
    whoItsFor:
      'Homeowners and contractors ordering gravel for driveways, lanes, pads, base prep, and imported aggregate.',
    outputs: ['Compacted base', 'Estimated weight', 'Truck loads'],
  },
  {
    slug: 'topsoil',
    href: calculatorSeoConfig.topsoil.resourcePath,
    serviceHref: '/services/site-preparation-land-grading',
    serviceLabel: 'Related service: Site prep and grading',
    imageSrc: '/assets/calculators/Topsoil-calculator.webp',
    icon: <CompassTool size={26} weight="fill" />,
    meta: 'Topsoil estimating',
    shortDescription:
      'Estimate topsoil coverage, delivery quantity, and loads for grading, yard shaping, and finish work.',
    blurb:
      'Estimate topsoil coverage for placed material and finish-grading work without mixing it up with excavation-only assumptions.',
    whatItEstimates:
      'Placed topsoil volume, estimated coverage quantity, weight, and truck loads.',
    whoItsFor:
      'Property owners, landscapers, and site crews planning finish grading, yard shaping, and topsoil delivery.',
    outputs: ['Placed topsoil', 'Coverage volume', 'Truck loads'],
  },
] as const;
