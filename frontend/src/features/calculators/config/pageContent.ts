import type { CalculatorKind } from '../types/calculator';
import { calculatorSeoConfig } from './seo';

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
  relatedToolsHeading: string;
  relatedToolsDescription: string;
  relatedTools: Array<{
    href: string;
    title: string;
    description: string;
    actionLabel: string;
  }>;
  ctaTitle: string;
  ctaDescription: string;
  ctaPoints: string[];
  nextStepsHeading: string;
  nextStepsDescription: string;
  nextSteps: Array<{
    href: string;
    title: string;
    description: string;
    actionLabel: string;
  }>;
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
    pageTitle: 'Excavation Calculator for Volume, Loose Material, and Loads',
    intro: [
      'Use this excavation calculator to estimate in-place cut volume, loose excavated material, truck loads, and weight before the job is priced or the haul plan is finalized.',
      'It is built for excavation and material removal, so the workflow follows real cut work: bank volume first, then swell, then loose haul-out, then load and weight estimates.',
    ],
    supportHeading: 'How to use this excavation calculator properly',
    supportDescription:
      'This page is meant to help with excavation planning, not replace a site-specific quote. It works best when you need a practical first estimate for removed material and hauling.',
    supportItems: [
      {
        title: 'How it works',
        description:
          'The calculator starts with in-place excavation volume, applies the selected material swell factor, then converts the loose material into estimated truck loads and weight.',
      },
      {
        title: 'When to use it',
        description:
          'Use it for foundation digs, trenching, pond excavation, cut work, and spoil haul-out when you need a quick planning number before production details are confirmed.',
      },
      {
        title: 'Who it is for',
        description:
          'It is useful for homeowners pricing a dig, builders comparing haul quantities, and contractors checking truck requirements before requesting a formal quote.',
      },
      {
        title: 'Material and hauling assumptions',
        description:
          'Material type, swell, moisture, truck payload, and half-load restrictions all affect the estimate. Rock, wet ground, over-excavation, and access can change the real number.',
      },
    ],
    relatedToolsHeading: 'Related Bellhouse tools for the next step',
    relatedToolsDescription:
      'Excavation is often only one part of the job. If the project also needs base material or finish grading, these related calculators help you plan the next material stage.',
    relatedTools: [
      {
        href: calculatorSeoConfig.gravel.resourcePath,
        title: 'Gravel calculator for imported base material',
        description:
          'Helpful when excavation is followed by granular fill, driveway base, pad prep, or compacted aggregate placement.',
        actionLabel: 'Open Gravel Calculator',
      },
      {
        href: calculatorSeoConfig.topsoil.resourcePath,
        title: 'Topsoil calculator for finish grading',
        description:
          'Useful when the excavation job ends with topsoil placement, yard shaping, or final surface restoration.',
        actionLabel: 'Open Topsoil Calculator',
      },
    ],
    ctaTitle: 'Move this excavation estimate into a workable dig plan',
    ctaDescription:
      'Send the site address, cut dimensions, and access details so Bellhouse can review haul-out, truck access, and what the excavation really needs.',
    ctaPoints: [
      'Useful for foundation digs, trenching, spoil haul-out, and cut work.',
      'Groundwater, over-excavation, access, and truck limits can change the real number.',
    ],
    nextStepsHeading: 'Move this excavation estimate into the right next step',
    nextStepsDescription:
      'Most excavation jobs split three ways after the rough number is done: review the dig itself, confirm Bellhouse covers the location, or route a builder-led scope through the contractor path.',
    nextSteps: [
      {
        href: '/services/foundation-excavation',
        title: 'Review the dig, trench, or cut work',
        description:
          'Best when you already know the job needs excavation and want Bellhouse to look at access, haul-out, spoil handling, and what the cut really involves.',
        actionLabel: 'View Excavation Service',
      },
      {
        href: '/service-areas',
        title: 'Check local excavation coverage',
        description:
          'Use the service-area hub when you are comparing locations, checking coverage, or finding the right Bellhouse page for the property.',
        actionLabel: 'Explore Service Areas',
      },
      {
        href: '/contractors',
        title: 'Route builder-led or phased site work',
        description:
          'Use the contractor path for active jobs where excavation, trucking, and schedule coordination need to stay under one working plan.',
        actionLabel: 'Open Contractor Path',
      },
    ],
    relatedServiceLink: {
      href: '/services/foundation-excavation',
      label: 'View Foundation Excavation Service',
    },
  },
  gravel: {
    eyebrow: 'Gravel estimating',
    pageTitle: 'Gravel Calculator for Base Quantity and Truck Loads',
    intro: [
      'Use this gravel calculator to estimate compacted base volume, delivered gravel quantity, truck loads, and weight for driveways, pads, lanes, and aggregate prep.',
      'It is built for placed and compacted material, not excavation haul-out, so the estimate stays focused on base work, imported aggregate, and ordering decisions.',
    ],
    supportHeading: 'How to use this gravel calculator properly',
    supportDescription:
      'This tool is useful when you need a practical aggregate estimate for ordering, delivery planning, or comparing depths before the site is reviewed in detail.',
    supportItems: [
      {
        title: 'How it works',
        description:
          'The calculator works from the placed area and target depth, then applies the selected gravel density and compaction-based assumptions to estimate quantity, loads, and weight.',
      },
      {
        title: 'When to use it',
        description:
          'Use it when planning driveway base, parking lot prep, access lanes, building pads, or imported stone before material is ordered or delivered.',
      },
      {
        title: 'Who it is for',
        description:
          'It is useful for homeowners comparing gravel depth, contractors checking rough tonnage, and crews planning deliveries for compacted base work.',
      },
      {
        title: 'Material and site assumptions',
        description:
          'Subgrade condition, drainage correction, compaction needs, material choice, and truck payload can all change the real job quantity. Half-load mode affects hauling assumptions only.',
      },
    ],
    relatedToolsHeading: 'Related Bellhouse tools around gravel work',
    relatedToolsDescription:
      'Base material planning often connects to excavation before placement or topsoil work after the aggregate is in. These tools help you move between those job stages naturally.',
    relatedTools: [
      {
        href: calculatorSeoConfig.excavation.resourcePath,
        title: 'Excavation calculator for cut and removal',
        description:
          'Use it when the job starts with stripping, undercutting, trenching, or hauling out unsuitable material before base is installed.',
        actionLabel: 'Open Excavation Calculator',
      },
      {
        href: calculatorSeoConfig.topsoil.resourcePath,
        title: 'Topsoil calculator for final grading around the base',
        description:
          'Helpful when a driveway, pad, or lane project also needs topsoil coverage and finish shaping around the completed work.',
        actionLabel: 'Open Topsoil Calculator',
      },
    ],
    ctaTitle: 'Turn this gravel estimate into a delivery and site plan',
    ctaDescription:
      'Send the location, dimensions, target depth, and site access so Bellhouse can review the aggregate plan against the real job.',
    ctaPoints: [
      'Useful for driveways, pads, lanes, and imported aggregate work.',
      'Subgrade correction and drainage can change the real stone requirement.',
    ],
    nextStepsHeading: 'Choose the right Bellhouse path after the gravel number',
    nextStepsDescription:
      'Gravel estimates usually lead into one of four next moves: aggregate delivery, grading and base prep, local coverage, or a contractor path for active jobs and repeat work.',
    nextSteps: [
      {
        href: '/services/dirt-gravel-delivery',
        title: 'Book gravel delivery with the right truck plan',
        description:
          'Best when you need Bellhouse to review aggregate type, quantity, access, and delivery timing for a driveway, pad, lane, or yard.',
        actionLabel: 'View Gravel Delivery Service',
      },
      {
        href: '/services/site-preparation-land-grading',
        title: 'Tie the stone number into site prep and grading',
        description:
          'Useful when the gravel is only one part of a larger prep scope that also needs stripping, shaping, drainage correction, or pad grading.',
        actionLabel: 'View Site Prep Service',
      },
      {
        href: '/service-areas',
        title: 'Check local delivery and site coverage',
        description:
          'Use the service-area hub to confirm Bellhouse coverage and pick the best local page before you send the job location.',
        actionLabel: 'Explore Service Areas',
      },
      {
        href: '/contractors',
        title: 'Route aggregate and access work through contractors',
        description:
          'Use the contractor path for builder-led site prep, commercial yards, access routes, and jobs that need trucks and grading aligned with production.',
        actionLabel: 'Open Contractor Path',
      },
    ],
    relatedServiceLink: {
      href: '/services/dirt-gravel-delivery',
      label: 'View Dirt & Gravel Delivery Service',
    },
  },
  topsoil: {
    eyebrow: 'Topsoil estimating',
    pageTitle: 'Topsoil Calculator for Coverage, Volume, and Loads',
    intro: [
      'Use this topsoil calculator to estimate placed topsoil volume, coverage, truck loads, and weight for finish grading, yard shaping, and delivery planning.',
      'It is built for topsoil placement and surface coverage, so it works best when you need to plan finish material rather than excavation removal or compacted gravel base.',
    ],
    supportHeading: 'How to use this topsoil calculator properly',
    supportDescription:
      'This page works best as a planning guide for finish grading and topsoil delivery before the final surface condition, cleanup scope, and target depth are confirmed on site.',
    supportItems: [
      {
        title: 'How it works',
        description:
          'The calculator uses the placed area and selected depth to estimate topsoil volume, then converts that into likely truck loads and weight based on the chosen material assumptions.',
      },
      {
        title: 'When to use it',
        description:
          'Use it when planning lawn prep, finish grading, yard reshaping, and topsoil delivery for residential or light commercial projects.',
      },
      {
        title: 'Who it is for',
        description:
          'It is useful for property owners checking coverage, landscapers planning delivery, and contractors roughing out topsoil quantities before a final site review.',
      },
      {
        title: 'Material and finish assumptions',
        description:
          'Existing grade, cleanup needs, moisture, target finish depth, and truck payload can all change the real number. Half-load mode changes hauling assumptions only.',
      },
    ],
    relatedToolsHeading: 'Related Bellhouse tools before topsoil goes down',
    relatedToolsDescription:
      'Topsoil usually follows earlier site work. If the job also involves excavation or compacted gravel/base, these tools help you estimate those stages separately and more clearly.',
    relatedTools: [
      {
        href: calculatorSeoConfig.excavation.resourcePath,
        title: 'Excavation calculator for earlier cut work',
        description:
          'Useful when the project includes digging, spoil removal, or bulk reshaping before final topsoil placement happens.',
        actionLabel: 'Open Excavation Calculator',
      },
      {
        href: calculatorSeoConfig.gravel.resourcePath,
        title: 'Gravel calculator for pads, lanes, and compacted base',
        description:
          'Helpful when the job needs gravel underlayment, access routes, or a compacted base before finish grading and topsoil coverage.',
        actionLabel: 'Open Gravel Calculator',
      },
    ],
    ctaTitle: 'Turn this topsoil estimate into finish grading or delivery',
    ctaDescription:
      'Send the area, target depth, location, and finish expectations so Bellhouse can review how the topsoil plan fits the real site.',
    ctaPoints: [
      'Best for early planning before finish grading and material delivery are scheduled.',
      'Existing grade, cleanup, and final surface expectations can change actual quantities.',
    ],
    nextStepsHeading: 'Move from a topsoil estimate to the right finishing path',
    nextStepsDescription:
      'Topsoil work usually leads into finish grading, delivery planning, local service checks, or a contractor route when the surface work is part of a larger active site.',
    nextSteps: [
      {
        href: '/services/site-preparation-land-grading',
        title: 'Review finish grading and surface shaping',
        description:
          'Best when the topsoil number needs to turn into real finish grading, yard shaping, or restored final surfaces around the project.',
        actionLabel: 'View Grading Service',
      },
      {
        href: '/services/dirt-gravel-delivery',
        title: 'Book topsoil delivery and placement support',
        description:
          'Useful when Bellhouse should review material volume, truck access, and whether the topsoil needs to be delivered or placed in stages.',
        actionLabel: 'View Delivery Service',
      },
      {
        href: '/service-areas',
        title: 'Check local coverage before final grading',
        description:
          'Use the service-area hub when the next question is local availability, site access, or the best Bellhouse page for the property.',
        actionLabel: 'Explore Service Areas',
      },
      {
        href: '/contractors',
        title: 'Route builder and light-commercial finish work',
        description:
          'Use the contractor path for subdivision, infill, facility, or site-finish work where topsoil, grading, and truck timing need to stay coordinated.',
        actionLabel: 'Open Contractor Path',
      },
    ],
    relatedServiceLink: {
      href: '/services/dirt-gravel-delivery',
      label: 'View Dirt & Gravel Delivery Service',
    },
  },
};
