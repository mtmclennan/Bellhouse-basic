import type { CalculatorKind } from '../types/calculator';

export type CalculatorPageContent = {
  eyebrow: string;
  pageTitle: string;
  intro: string[];
  supportHeading: string;
  supportDescription: string;
  supportItems: Array<{
    title: string;
    description: string;
  }>;
  ctaTitle: string;
  ctaDescription: string;
  ctaPoints: string[];
  relatedServiceLink: {
    href: string;
    label: string;
  };
};

export const calculatorPageContent: Record<
  CalculatorKind,
  CalculatorPageContent
> = {
  excavation: {
    eyebrow: 'Excavation estimating',
    pageTitle: 'Excavation calculator for rough cut, haul-out, and truck planning.',
    intro: [
      'Use this calculator to work out a rough excavation quantity, tonnage, and likely truck count before the job is priced or the haul plan is finalized.',
      'It is useful for foundation digs, site cuts, trenching-related volume checks, and general earthmoving where the next question is often how much material is coming out and how many loads that likely means.',
    ],
    supportHeading: 'What this excavation estimate is good for',
    supportDescription:
      'The goal is to get a practical working number quickly, not to replace a site visit or a real excavation quote.',
    supportItems: [
      {
        title: 'Useful for early haul planning',
        description:
          'Rough tonnage and truck-load counts can help you judge whether a job is small, moderate, or likely to need more coordinated haul-out.',
      },
      {
        title: 'Site conditions still matter',
        description:
          'Rock, wet ground, over-excavation, stockpile limits, access, and trucking distance can all change the actual scope once the site is reviewed.',
      },
      {
        title: 'Half-load mode is only for road-legal hauling assumptions',
        description:
          'Turning half-load mode on changes truck-load estimates only. It does not change excavation volume or estimated tonnage.',
      },
    ],
    ctaTitle: 'Need Bellhouse to review the excavation properly?',
    ctaDescription:
      'Send the location, scope, access conditions, and what the next trade needs so Bellhouse can review fit, likely sequencing, and hauling requirements.',
    ctaPoints: [
      'Best used as an estimating tool before quote review.',
      'Actual excavation quantities can shift with site conditions and machine access.',
      'Half-load mode only reflects a more conservative hauling assumption.',
    ],
    relatedServiceLink: {
      href: '/services/foundation-excavation',
      label: 'View Foundation Excavation Service',
    },
  },
  gravel: {
    eyebrow: 'Gravel estimating',
    pageTitle: 'Gravel calculator for base prep, pads, and imported aggregate.',
    intro: [
      'Use this calculator to estimate gravel volume, tonnage, and truck loads for driveways, parking areas, building pads, access lanes, and similar aggregate work.',
      'It is meant to help you get a workable material number before ordering stone or asking Bellhouse about imported aggregate, grading, or truck support.',
    ],
    supportHeading: 'How to use the gravel estimate properly',
    supportDescription:
      'Gravel quantities are often close enough for planning at this stage, but the final material number still depends on what the ground actually needs.',
    supportItems: [
      {
        title: 'Good for rough ordering and comparison',
        description:
          'The estimate helps compare possible depths, materials, and likely truck count before the final base thickness is confirmed on site.',
      },
      {
        title: 'Subgrade and compaction change the real job',
        description:
          'Soft spots, pumping ground, poor drainage, or added shaping can increase the real quantity beyond the first estimate.',
      },
      {
        title: 'Half-load mode affects hauling assumptions only',
        description:
          'Use half-load mode when you want a more conservative load estimate. It does not change the calculated gravel volume or tonnage.',
      },
    ],
    ctaTitle: 'Need Bellhouse to price gravel supply, grading, or delivery?',
    ctaDescription:
      'Send the project location, dimensions, target depth, access conditions, and material type so Bellhouse can review the real site requirements.',
    ctaPoints: [
      'Useful for aggregate import, lane prep, and building pads.',
      'Actual stone volume can change if the subgrade needs more correction.',
      'Half-load mode is only about truck payload assumptions.',
    ],
    relatedServiceLink: {
      href: '/services/dirt-gravel-delivery',
      label: 'View Dirt & Gravel Delivery Service',
    },
  },
  topsoil: {
    eyebrow: 'Topsoil estimating',
    pageTitle: 'Topsoil calculator for coverage, finish grading, and material planning.',
    intro: [
      'Use this calculator to estimate topsoil quantity, tonnage, and truck loads for spreading, finish grading, lawn prep, and similar surface work.',
      'It is a practical way to get a rough material number before ordering soil or asking Bellhouse about grading, delivery, or final shaping.',
    ],
    supportHeading: 'Where this topsoil estimate helps most',
    supportDescription:
      'Topsoil work is often driven by final depth, finish expectations, and the shape of the site, so the calculator is best used as a planning guide.',
    supportItems: [
      {
        title: 'Useful for coverage planning',
        description:
          'It helps compare how much topsoil may be needed across larger lawn areas, finish grades, or rough landscape prep.',
      },
      {
        title: 'Depth and finish expectations affect the final number',
        description:
          'Existing grade, cleanup needs, settlement, and how smooth the finished surface needs to be can all change actual material quantities.',
      },
      {
        title: 'Half-load mode only changes the load estimate',
        description:
          'It is there for conservative road-legal hauling assumptions only. It does not reduce the estimated topsoil volume or weight.',
      },
    ],
    ctaTitle: 'Need Bellhouse to quote topsoil delivery or finish grading?',
    ctaDescription:
      'Send the project size, target depth, location, and finish expectations so Bellhouse can review the likely material need and the best next step.',
    ctaPoints: [
      'Best used for early planning before final grading review.',
      'Actual topsoil quantities vary with existing grade and finish requirements.',
      'Half-load mode only affects the truck-load count assumption.',
    ],
    relatedServiceLink: {
      href: '/services/dirt-gravel-delivery',
      label: 'View Dirt & Gravel Delivery Service',
    },
  },
};
