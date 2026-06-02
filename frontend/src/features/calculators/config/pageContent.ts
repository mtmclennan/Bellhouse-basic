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
  guidanceHeading: string;
  guidanceDescription: string;
  guidanceItems: Array<{
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
  relatedServicesHeading: string;
  relatedServicesDescription: string;
  relatedServices: Array<{
    href: string;
    title: string;
    description: string;
    actionLabel: string;
  }>;
  ctaTitle: string;
  ctaDescription: string;
  ctaPoints: string[];
  relatedServiceLink: {
    href: string;
    label: string;
  };
  faqHeading: string;
  faqDescription: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
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
    guidanceHeading: 'Practical notes before using the excavation number',
    guidanceDescription:
      'Excavation estimates are most useful when the site conditions, haul route, truck access, and next construction step are known early.',
    guidanceItems: [
      {
        title: 'What the estimate covers',
        description:
          'Use the result as a rough planning number for cut volume, loose material after swell, likely truck loads, and material weight.',
      },
      {
        title: 'Where it can change',
        description:
          'Wet ground, rock, over-dig, poor access, buried debris, and half-load restrictions can change the actual hauled quantity and load count.',
      },
      {
        title: 'What Bellhouse needs',
        description:
          'Send the location, rough dimensions, material type, access details, drawings if available, and what the site needs to be ready for next.',
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
    relatedServicesHeading: 'Bellhouse services tied to excavation quantities',
    relatedServicesDescription:
      'Once the rough excavation volume is known, these services help connect the estimate to the actual site work, access, haul-out, and next construction step.',
    relatedServices: [
      {
        href: '/services/foundation-excavation',
        title: 'Foundation excavation for accurate building cuts',
        description:
          'Use this when the estimate is for a house, addition, garage, shop, or building footprint that needs a clean foundation dig and haul-out plan.',
        actionLabel: 'View Foundation Excavation',
      },
      {
        href: '/services/site-preparation-land-grading',
        title: 'Site preparation before the dig starts',
        description:
          'Helpful when excavation is part of a larger site setup that also needs stripping, access shaping, rough grading, or imported material planning.',
        actionLabel: 'Plan Site Preparation',
      },
      {
        href: '/services/septic-system-installation',
        title: 'Septic excavation and backfill support',
        description:
          'Useful for rural projects where tank excavation, bed prep, bedding material, backfill, and grading need to stay coordinated.',
        actionLabel: 'View Septic Installation',
      },
      {
        href: '/services/pond-digging-cleaning',
        title: 'Pond digging, cleaning, and spoil handling',
        description:
          'A fit when the calculated volume is tied to pond excavation, dredging, reshaping, or cleanup where access and material movement matter.',
        actionLabel: 'View Pond Work',
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
      label: 'View Foundation Excavation',
    },
    faqHeading: 'Excavation calculator FAQs',
    faqDescription:
      'Short answers for the most common questions before turning an excavation estimate into a real quote request.',
    faqs: [
      {
        question: 'How accurate is an excavation calculator?',
        answer:
          'It is useful for early planning, but it is not a final quote. Soil type, water, rock, access, over-excavation, and truck limits can all change the real number.',
      },
      {
        question: 'Why does loose material volume differ from bank volume?',
        answer:
          'Soil expands when it is excavated. The calculator starts with in-place volume, then applies swell so the hauled loose volume is closer to what trucks actually carry.',
      },
      {
        question: 'How many dump truck loads will excavation produce?',
        answer:
          'Load count depends on loose volume, material weight, truck payload, access, and whether half-load restrictions apply. The calculator gives a planning estimate, not a guaranteed load count.',
      },
      {
        question: 'What information is needed before quoting excavation?',
        answer:
          'Bellhouse needs the project location, rough dimensions or drawings, material type if known, access route, timing, and whether spoil stays on site or needs hauling out.',
      },
    ],
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
    guidanceHeading: 'Practical notes before ordering gravel',
    guidanceDescription:
      'A gravel estimate works best when the base depth, subgrade condition, compaction needs, and delivery access are reviewed together.',
    guidanceItems: [
      {
        title: 'What the estimate covers',
        description:
          'Use the result to plan placed volume, rough tonnage, and truck loads for driveways, pads, lanes, and compacted aggregate areas.',
      },
      {
        title: 'Where it can change',
        description:
          'Soft subgrade, drainage correction, deeper edges, compaction, material choice, and truck payload can all change the final amount delivered.',
      },
      {
        title: 'What Bellhouse needs',
        description:
          'Send the location, area dimensions, target depth, intended use, access details, preferred material if known, and whether grading or base prep is needed.',
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
    relatedServicesHeading: 'Bellhouse services that connect to gravel estimates',
    relatedServicesDescription:
      'A gravel quantity is usually only useful when it is tied to delivery, base preparation, grading, and truck access on the actual site.',
    relatedServices: [
      {
        href: '/services/dirt-gravel-delivery',
        title: 'Dirt and gravel delivery for the material order',
        description:
          'Use this when the calculator estimate is turning into an aggregate order, delivery plan, or truck-load discussion.',
        actionLabel: 'Plan Gravel Delivery',
      },
      {
        href: '/services/driveway-parking-lot-preparation',
        title: 'Driveway and parking lot base preparation',
        description:
          'Helpful when gravel quantities are for a driveway, parking area, lane, or compacted base that needs grading and compaction.',
        actionLabel: 'View Driveway Base Preparation',
      },
      {
        href: '/services/site-preparation-land-grading',
        title: 'Site preparation before imported aggregate',
        description:
          'A fit when the ground still needs stripping, shaping, access prep, or rough grading before gravel can be placed properly.',
        actionLabel: 'Plan Site Preparation',
      },
      {
        href: '/services/dump-truck-rental',
        title: 'Dump truck rental for gravel and spoil movement',
        description:
          'Useful when the estimate needs to become a hauling plan for aggregate delivery, spoil export, or repeated truck cycles.',
        actionLabel: 'Plan Truck Hauling',
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
      label: 'Plan Gravel Delivery',
    },
    faqHeading: 'Gravel calculator FAQs',
    faqDescription:
      'Short answers for gravel quantity, compaction, material choice, and truck-load planning before the job is reviewed.',
    faqs: [
      {
        question: 'How much gravel do I need for a driveway?',
        answer:
          'It depends on driveway size, target depth, subgrade condition, and whether the base needs correction. The calculator gives a starting quantity for review.',
      },
      {
        question: 'Why does compaction matter?',
        answer:
          'Compacted gravel settles into a denser base. If compaction is ignored, the ordered amount may be short once the material is placed and packed properly.',
      },
      {
        question: 'How many tons are in a truck load?',
        answer:
          'Truck payload depends on the truck, material weight, access, and road restrictions. Half-load season can reduce the legal payload used for load estimates.',
      },
      {
        question: 'Should I use Granular A or another material?',
        answer:
          'Material choice depends on the use, drainage, compaction needs, and finished surface. Bellhouse can help confirm the right aggregate before delivery or base prep.',
      },
    ],
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
    guidanceHeading: 'Practical notes before spreading topsoil',
    guidanceDescription:
      'Topsoil coverage depends on finish grade, surface prep, moisture, target depth, and how cleanly the area is ready to receive material.',
    guidanceItems: [
      {
        title: 'What the estimate covers',
        description:
          'Use the result to plan placed topsoil volume, rough tonnage, and likely truck loads for lawn prep, yard shaping, or finish grading.',
      },
      {
        title: 'Where it can change',
        description:
          'Low spots, rough grading, cleanup, moisture, uneven spreading depth, and access limits can change actual coverage and delivery needs.',
      },
      {
        title: 'What Bellhouse needs',
        description:
          'Send the location, area size, target depth, current grade condition, access details, and whether grading or drainage work is needed first.',
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
    relatedServicesHeading: 'Bellhouse services that support topsoil planning',
    relatedServicesDescription:
      'Topsoil estimates are strongest when the finish grade, drainage, delivery access, and earlier site work are understood together.',
    relatedServices: [
      {
        href: '/services/land-grading-drainage',
        title: 'Land grading and drainage before finish material',
        description:
          'Use this when topsoil placement depends on correcting slope, runoff, low areas, or rough grades before the final surface goes down.',
        actionLabel: 'View Land Grading & Drainage',
      },
      {
        href: '/services/dirt-gravel-delivery',
        title: 'Dirt, gravel, and topsoil delivery support',
        description:
          'Helpful when the estimate is ready to become a material delivery plan with truck access, load counts, and site timing.',
        actionLabel: 'Plan Material Delivery',
      },
      {
        href: '/services/site-preparation-land-grading',
        title: 'Site preparation before lawn or yard restoration',
        description:
          'A fit when topsoil is part of broader lot shaping, cleanup, pad work, access prep, or final site readiness.',
        actionLabel: 'Plan Site Preparation',
      },
      {
        href: '/services/driveway-parking-lot-preparation',
        title: 'Driveway edge and base preparation',
        description:
          'Useful when topsoil quantities relate to dressing around a driveway, lane, parking area, or compacted base after grading.',
        actionLabel: 'View Driveway Base Preparation',
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
      href: '/services/land-grading-drainage',
      label: 'View Land Grading & Drainage',
    },
    faqHeading: 'Topsoil calculator FAQs',
    faqDescription:
      'Short answers for coverage, depth, truck loads, and when grading should happen before topsoil is delivered.',
    faqs: [
      {
        question: 'How deep should topsoil be placed?',
        answer:
          'Depth depends on the use and existing grade. Lawn and restoration work often needs enough depth for a workable growing layer, but low spots or rough areas can need more.',
      },
      {
        question: 'Why does screened topsoil coverage vary?',
        answer:
          'Moisture, spreading depth, settling, uneven ground, and cleanup needs can all affect how far a load goes once it is placed and shaped.',
      },
      {
        question: 'How many truck loads of topsoil do I need?',
        answer:
          'Load count depends on volume, material weight, truck payload, access, and road restrictions. The calculator gives a planning estimate for review.',
      },
      {
        question: 'Can Bellhouse help with grading before topsoil?',
        answer:
          'Yes. If the area needs rough grading, drainage correction, or low-spot repair before topsoil, Bellhouse can review that as part of the quote.',
      },
    ],
  },
};
