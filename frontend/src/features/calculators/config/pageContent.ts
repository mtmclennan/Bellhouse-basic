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
      'Use this calculator for a quick excavation volume, tonnage, and truck-load estimate before the dig is priced or the haul plan is finalized.',
    ],
    supportHeading: 'What this excavation estimate is good for',
    supportDescription:
      'It is for quick planning, not final quoting.',
    supportItems: [
      {
        title: 'Useful for early haul planning',
        description:
          'Use it to get a rough read on spoil quantity and likely truck count.',
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
    pageTitle: 'Gravel calculator for base prep, pads, and imported aggregate.',
    intro: [
      'Use this calculator for a quick gravel volume, tonnage, and truck-load estimate for pads, lanes, driveways, and base work.',
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
    pageTitle: 'Topsoil calculator for coverage, finish grading, and material planning.',
    intro: [
      'Use this calculator for a quick topsoil quantity, tonnage, and truck-load estimate for coverage, finish grading, and lawn prep.',
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
