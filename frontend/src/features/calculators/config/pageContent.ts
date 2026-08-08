import type { CalculatorKind } from '../types/calculator';
import { calculatorSeoConfig } from './seo';

export type CalculatorPageContent = {
  pageTitle: string;
  heroDescription: string;
  heroCapabilities: Array<{
    icon: 'cube' | 'expand' | 'truck' | 'scales';
    label: string;
  }>;
  guidanceHeading: string;
  guidanceDescription: string;
  guidanceCallout: {
    title: string;
    paragraphs: string[];
    check: string;
  };
  guidanceItems: Array<{
    icon: 'layers' | 'water' | 'access' | 'measure';
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
    icon:
      | 'foundation'
      | 'site'
      | 'reuse'
      | 'water'
      | 'hauling'
      | 'material'
      | 'grading';
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
  resultsCta: {
    heading: string;
    description: string;
    buttonLabel: string;
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
    pageTitle: 'Excavation Calculator for Volume, Loose Material, and Loads',
    heroDescription:
      'Multiply length × width × depth, divide by 27, and multiply by the material swell factor. This calculator does that for you — in-place cut volume, loose excavated material, truck loads, and weight, in cubic yards or cubic metres.',
    heroCapabilities: [
      { icon: 'cube', label: 'In-place volume' },
      { icon: 'expand', label: 'Loose material' },
      { icon: 'truck', label: 'Truck load count' },
      { icon: 'scales', label: 'Material weight' },
    ],
    guidanceHeading: 'What moves the number on a real site',
    guidanceDescription:
      'The calculator assumes a rectangular cut of uniform depth in one material. These site conditions most often change the real haul plan.',
    guidanceCallout: {
      title: 'Road restrictions can double the number of trips',
      paragraphs: [
        'Posted load limits reduce the legal payload a truck can carry without changing the volume or total weight of material on the project.',
        'Turn on half-load mode when the actual route is restricted. The calculator uses half of the entered legal payload for the load estimate, and the setting remains fully manual.',
      ],
      check:
        'Confirm current route restrictions with the municipality before locking the haul plan.',
    },
    guidanceItems: [
      {
        icon: 'layers',
        title: 'Layered or unexpected material',
        description:
          'A cut that starts in topsoil and ends in clay has more than one swell factor. Buried fill, shale, or rock can change the equipment and hauling plan.',
      },
      {
        icon: 'water',
        title: 'Groundwater and wet soil',
        description:
          'Saturated material is heavier. Trucks can reach their legal payload sooner, raising the trip count without changing the cut volume.',
      },
      {
        icon: 'access',
        title: 'Access and truck staging',
        description:
          'Tight lots, narrow entrances, soft shoulders, and limited turnarounds can reduce the truck size or cycle speed available to the job.',
      },
      {
        icon: 'measure',
        title: 'Over-dig for forming',
        description:
          'Foundations need working room for forms, waterproofing, drainage stone, and safe side slopes. That clearance is real excavation beyond the building footprint.',
      },
    ],
    relatedToolsHeading: 'Where the excavation number goes next',
    relatedToolsDescription:
      'Excavation is one stage of the job. Use the connected tools for imported base or finish material, then review the site work Bellhouse can coordinate.',
    relatedTools: [
      {
        href: calculatorSeoConfig.gravel.resourcePath,
        title: 'Gravel calculator',
        description:
          'Helpful when excavation is followed by granular fill, driveway base, pad prep, or compacted aggregate placement.',
        actionLabel: 'Open Gravel Calculator',
      },
      {
        href: calculatorSeoConfig.topsoil.resourcePath,
        title: 'Topsoil calculator',
        description:
          'Useful when the excavation job ends with topsoil placement, yard shaping, or final surface restoration.',
        actionLabel: 'Open Topsoil Calculator',
      },
    ],
    relatedServicesHeading: 'Related Bellhouse services',
    relatedServicesDescription:
      'Once the rough excavation volume is known, these services help connect the estimate to the actual site work, access, haul-out, and next construction step.',
    relatedServices: [
      {
        icon: 'foundation',
        href: '/services/foundation-excavation',
        title: 'Foundation excavation',
        description:
          'Houses, additions, garages, and shops.',
        actionLabel: 'View Foundation Excavation',
      },
      {
        icon: 'site',
        href: '/services/site-preparation-land-grading',
        title: 'Site preparation',
        description:
          'Clearing, stripping, access, and rough grade.',
        actionLabel: 'Plan Site Preparation',
      },
      {
        icon: 'water',
        href: '/services/pond-digging-cleaning',
        title: 'Pond digging and cleanout',
        description:
          'Bulk excavation, reshaping, and spoil handling.',
        actionLabel: 'View Pond Work',
      },
    ],
    ctaTitle: 'Need Bellhouse to review the excavation properly?',
    ctaDescription:
      'Send the location, dimensions, material assumptions, and access details for a practical job review before the haul plan is priced.',
    ctaPoints: [
      'Site location, dimensions, and access details reviewed',
      'Material and hauling assumptions checked against the job',
      'Straightforward follow-up before a written quote',
    ],
    relatedServiceLink: {
      href: '/services/foundation-excavation',
      label: 'View Foundation Excavation',
    },
    resultsCta: {
      heading: 'Need this material excavated or hauled?',
      description:
        'Send Bellhouse this estimate along with the project location and timeline for a real quote — the numbers above carry over automatically.',
      buttonLabel: 'Request a project estimate',
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
    pageTitle: 'Gravel Calculator for Base Quantity and Truck Loads',
    heroDescription:
      'Multiply length × width × depth and apply the material compaction allowance. This calculator estimates placed volume, delivered gravel, truck loads, and weight in cubic yards or cubic metres.',
    heroCapabilities: [
      { icon: 'cube', label: 'Placed volume' },
      { icon: 'expand', label: 'Compaction allowance' },
      { icon: 'truck', label: 'Truck load count' },
      { icon: 'scales', label: 'Material weight' },
    ],
    guidanceHeading: 'What changes a gravel order on site',
    guidanceDescription:
      'The calculator assumes a consistent finished depth over a prepared area. Subgrade, compaction, moisture, and access determine how closely delivery matches that estimate.',
    guidanceCallout: {
      title: 'Road restrictions affect trips, not material quantity',
      paragraphs: [
        'A restricted route lowers the effective legal payload and can increase delivery trips even though the required compacted base and total material weight stay the same.',
        'Use half-load mode only when the route is actually restricted. It applies 50% of the entered payload to the load calculation and does not alter the gravel quantity.',
      ],
      check:
        'Confirm the legal payload, delivery route, and current restrictions before scheduling aggregate.',
    },
    guidanceItems: [
      {
        icon: 'layers',
        title: 'Soft or uneven subgrade',
        description:
          'Weak areas and deeper edges can consume more aggregate than a uniform design depth suggests, especially before the base is trimmed.',
      },
      {
        icon: 'water',
        title: 'Drainage correction',
        description:
          'Low areas, wet subgrade, and drainage shaping may need undercutting or extra stone before the planned compacted lift can be placed.',
      },
      {
        icon: 'access',
        title: 'Delivery and stockpile access',
        description:
          'Truck size, turnaround room, overhead clearance, and where material can be dumped all affect delivery cycles and placement work.',
      },
      {
        icon: 'measure',
        title: 'Lift depth and compaction',
        description:
          'Deep bases are built and compacted in lifts. Material type, moisture, and equipment determine the practical allowance above finished volume.',
      },
    ],
    relatedToolsHeading: 'What connects to the gravel quantity',
    relatedToolsDescription:
      'Base material usually follows excavation and often finishes beside graded topsoil. Use the connected calculators, then review delivery and base-preparation services.',
    relatedTools: [
      {
        href: calculatorSeoConfig.excavation.resourcePath,
        title: 'Excavation calculator',
        description:
          'Use it when the job starts with stripping, undercutting, trenching, or hauling out unsuitable material before base is installed.',
        actionLabel: 'Open Excavation Calculator',
      },
      {
        href: calculatorSeoConfig.topsoil.resourcePath,
        title: 'Topsoil calculator',
        description:
          'Helpful when a driveway, pad, or lane project also needs topsoil coverage and finish shaping around the completed work.',
        actionLabel: 'Open Topsoil Calculator',
      },
    ],
    relatedServicesHeading: 'Related Bellhouse services',
    relatedServicesDescription:
      'A gravel quantity is usually only useful when it is tied to delivery, base preparation, grading, and truck access on the actual site.',
    relatedServices: [
      {
        icon: 'material',
        href: '/services/dirt-gravel-delivery',
        title: 'Dirt and gravel delivery',
        description:
          'Aggregate supply, load planning, and delivery.',
        actionLabel: 'Plan Gravel Delivery',
      },
      {
        icon: 'grading',
        href: '/services/driveway-parking-lot-preparation',
        title: 'Driveway and parking base',
        description:
          'Grading, placement, and compacted base work.',
        actionLabel: 'View Driveway Base Preparation',
      },
      {
        icon: 'site',
        href: '/services/site-preparation-land-grading',
        title: 'Site preparation',
        description:
          'Stripping, shaping, and subgrade preparation.',
        actionLabel: 'Plan Site Preparation',
      },
      {
        icon: 'hauling',
        href: '/services/dump-truck-rental',
        title: 'Dump truck hauling',
        description:
          'Repeated aggregate and spoil movement.',
        actionLabel: 'Plan Truck Hauling',
      },
    ],
    ctaTitle: 'Need Bellhouse to price gravel supply, grading, or delivery?',
    ctaDescription:
      'Send the location, area dimensions, target depth, material choice, and access details so the quantity can be checked against the actual base work.',
    ctaPoints: [
      'Area, target depth, and intended use reviewed',
      'Material, compaction, and subgrade assumptions checked',
      'Delivery access and truck planning confirmed before pricing',
    ],
    relatedServiceLink: {
      href: '/services/dirt-gravel-delivery',
      label: 'Plan Gravel Delivery',
    },
    resultsCta: {
      heading: 'Need this gravel delivered and placed?',
      description:
        'Send Bellhouse this estimate along with the project location and timeline for a real quote — the numbers above carry over automatically.',
      buttonLabel: 'Request a project estimate',
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
    pageTitle: 'Topsoil Calculator for Coverage, Volume, and Loads',
    heroDescription:
      'Multiply length × width × depth and apply the finish allowance. This calculator estimates topsoil coverage, placed volume, truck loads, and weight in cubic yards or cubic metres.',
    heroCapabilities: [
      { icon: 'cube', label: 'Coverage volume' },
      { icon: 'expand', label: 'Finish allowance' },
      { icon: 'truck', label: 'Truck load count' },
      { icon: 'scales', label: 'Material weight' },
    ],
    guidanceHeading: 'What changes topsoil coverage on site',
    guidanceDescription:
      'The calculator assumes a prepared area with a consistent finish depth. Existing grade, moisture, cleanup, and spreading conditions change how far each load goes.',
    guidanceCallout: {
      title: 'Wet topsoil can reach payload sooner',
      paragraphs: [
        'Moisture adds weight without increasing the area to cover. A truck may reach its legal payload before carrying the same loose volume as a dry load.',
        'Use the moisture adjustment for material condition and half-load mode only for a posted route restriction. Each setting changes hauling, not the target coverage depth.',
      ],
      check:
        'Confirm material condition, truck access, and route restrictions before arranging delivery.',
    },
    guidanceItems: [
      {
        icon: 'layers',
        title: 'Low spots and rough grade',
        description:
          'Topsoil used to correct grade disappears into low areas before it creates the planned growing layer across the full surface.',
      },
      {
        icon: 'water',
        title: 'Moisture and handling',
        description:
          'Wet material is heavier, harder to spread evenly, and more likely to compact during handling without improving coverage.',
      },
      {
        icon: 'access',
        title: 'Delivery and spreading access',
        description:
          'Dump location, gate width, soft ground, slopes, and travel distance across the property affect how the material can be placed.',
      },
      {
        icon: 'measure',
        title: 'Finish depth and settling',
        description:
          'The required growing layer should be measured after rough grading. Light settling allowance helps maintain the intended final depth.',
      },
    ],
    relatedToolsHeading: 'What comes before the topsoil quantity',
    relatedToolsDescription:
      'Topsoil usually follows excavation, drainage, or compacted base work. Use the connected calculators, then review the grading and delivery services tied to the finish.',
    relatedTools: [
      {
        href: calculatorSeoConfig.excavation.resourcePath,
        title: 'Excavation calculator',
        description:
          'Useful when the project includes digging, spoil removal, or bulk reshaping before final topsoil placement happens.',
        actionLabel: 'Open Excavation Calculator',
      },
      {
        href: calculatorSeoConfig.gravel.resourcePath,
        title: 'Gravel calculator',
        description:
          'Helpful when the job needs gravel underlayment, access routes, or a compacted base before finish grading and topsoil coverage.',
        actionLabel: 'Open Gravel Calculator',
      },
    ],
    relatedServicesHeading: 'Related Bellhouse services',
    relatedServicesDescription:
      'Topsoil estimates are strongest when the finish grade, drainage, delivery access, and earlier site work are understood together.',
    relatedServices: [
      {
        icon: 'grading',
        href: '/services/land-grading-drainage',
        title: 'Land grading and drainage',
        description:
          'Slope correction, drainage, and finish shaping.',
        actionLabel: 'View Land Grading & Drainage',
      },
      {
        icon: 'material',
        href: '/services/dirt-gravel-delivery',
        title: 'Material delivery',
        description:
          'Topsoil, fill, and aggregate delivery planning.',
        actionLabel: 'Plan Material Delivery',
      },
      {
        icon: 'site',
        href: '/services/site-preparation-land-grading',
        title: 'Site preparation',
        description:
          'Cleanup, rough grading, and site readiness.',
        actionLabel: 'Plan Site Preparation',
      },
      {
        icon: 'grading',
        href: '/services/driveway-parking-lot-preparation',
        title: 'Driveway edge preparation',
        description:
          'Finish grading around lanes, pads, and bases.',
        actionLabel: 'View Driveway Base Preparation',
      },
    ],
    ctaTitle: 'Need Bellhouse to quote topsoil delivery or finish grading?',
    ctaDescription:
      'Send the area, target depth, current grade, access details, and finish expectations so coverage and placement can be reviewed properly.',
    ctaPoints: [
      'Coverage area, finish depth, and current grade reviewed',
      'Moisture, settling, and cleanup allowances checked',
      'Delivery and spreading access confirmed before pricing',
    ],
    relatedServiceLink: {
      href: '/services/land-grading-drainage',
      label: 'View Land Grading & Drainage',
    },
    resultsCta: {
      heading: 'Need this topsoil delivered and placed?',
      description:
        'Send Bellhouse this estimate along with the project location and timeline for a real quote — the numbers above carry over automatically.',
      buttonLabel: 'Request a project estimate',
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
