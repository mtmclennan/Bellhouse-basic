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
    pageTitle: 'Estimate excavation volume, loose haul-out, and truck loads.',
    intro: [
      'Use this tool for a quick cut-and-haul estimate before the job is priced or the haul plan is finalized.',
    ],
    supportHeading: 'What this excavation estimate is good for',
    supportDescription:
      'It is for quick planning, not final quoting.',
    supportItems: [
      {
        title: 'Useful for early cut-and-haul planning',
        description:
          'Use it to compare in-place cut volume against loose excavated volume and likely truck count.',
      },
      {
        title: 'Site conditions still matter',
        description:
          'Rock, wet ground, access, and over-excavation can all change the real number.',
      },
      {
        title: 'Half-load mode is only for road-legal hauling assumptions',
        description:
          'It changes load count only, not volume or tonnage.',
      },
    ],
    ctaTitle: 'Need Bellhouse to review the excavation properly?',
    ctaDescription:
      'Send the location, scope, and access details for a real job review.',
    ctaPoints: [
      'Best for early estimating before quote review.',
      'Site conditions can change actual quantities.',
    ],
    relatedServiceLink: {
      href: '/services/foundation-excavation',
      label: 'View Foundation Excavation Service',
    },
  },
  gravel: {
    eyebrow: 'Gravel estimating',
    pageTitle: 'Estimate gravel quantity, tonnage, and truck loads for base work.',
    intro: [
      'Use this tool for quick aggregate planning on pads, lanes, driveways, and base prep before ordering or site review.',
    ],
    supportHeading: 'How to use the gravel estimate properly',
    supportDescription:
      'It is useful for ordering and planning, not a final site review.',
    supportItems: [
      {
        title: 'Good for rough ordering and comparison',
        description:
          'Compare depths, materials, and likely truck count quickly.',
      },
      {
        title: 'Subgrade and compaction change the real job',
        description:
          'Soft ground, drainage, and added shaping can increase the actual amount needed.',
      },
      {
        title: 'Half-load mode affects hauling assumptions only',
        description:
          'It changes load count only, not gravel volume or tonnage.',
      },
    ],
    ctaTitle: 'Need Bellhouse to price gravel supply, grading, or delivery?',
    ctaDescription:
      'Send the location, dimensions, depth, and access details for a real site review.',
    ctaPoints: [
      'Useful for imported aggregate, pads, and lane prep.',
      'Subgrade correction can change actual stone volume.',
    ],
    relatedServiceLink: {
      href: '/services/dirt-gravel-delivery',
      label: 'View Dirt & Gravel Delivery Service',
    },
  },
  topsoil: {
    eyebrow: 'Topsoil estimating',
    pageTitle: 'Estimate topsoil coverage, tonnage, and truck loads for grading work.',
    intro: [
      'Use this tool for early topsoil planning before final grading, delivery, or finish work is confirmed.',
    ],
    supportHeading: 'Where this topsoil estimate helps most',
    supportDescription:
      'Use it as a planning guide before final grading or delivery is confirmed.',
    supportItems: [
      {
        title: 'Useful for coverage planning',
        description:
          'Get a rough read on how much soil a larger area may need.',
      },
      {
        title: 'Depth and finish expectations affect the final number',
        description:
          'Existing grade, cleanup, and finish expectations can change the real quantity.',
      },
      {
        title: 'Half-load mode only changes the load estimate',
        description:
          'It changes load count only, not topsoil volume or weight.',
      },
    ],
    ctaTitle: 'Need Bellhouse to quote topsoil delivery or finish grading?',
    ctaDescription:
      'Send the area, target depth, location, and finish expectations for a real review.',
    ctaPoints: [
      'Best for early planning before final grading review.',
      'Existing grade and finish expectations can change actual quantities.',
    ],
    relatedServiceLink: {
      href: '/services/dirt-gravel-delivery',
      label: 'View Dirt & Gravel Delivery Service',
    },
  },
};
