import { applyServiceAreaImages } from './serviceAreaImages';

export type ServiceAreaImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ServiceAreaMap = {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: ServiceAreaImage;
};

export type ServiceAreaService = {
  slug: string;
  title: string;
  description: string;
  coreServiceHref: string;
  image?: ServiceAreaImage;
};

export type ServiceAreaFaq = {
  question: string;
  answer: string;
};

export type ServiceAreaProjectType = {
  title: string;
  description: string;
  links?: ServiceAreaLink[];
};

export type ServiceAreaSectionHeadings = {
  intro?: string;
  services?: string;
  projectTypes?: string;
  rightFit?: string;
  howProjectsAreHandled?: string;
  whoWeWorkWith?: string;
  whyChoose?: string;
  nearbyAreas?: string;
  faq?: string;
  whatHappensNext?: string;
};

export type ServiceAreaLink = {
  label: string;
  href: string;
};

export type ServiceAreaCtaContent = {
  title: string;
  description: string;
  supportingPoints?: string[];
};

export type ServiceAreaPage = {
  slug: string;
  city: string;
  province: string;
  heroTitle: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  heroImage?: ServiceAreaImage;
  introImage?: ServiceAreaImage;
  ctaImage?: ServiceAreaImage;
  map?: ServiceAreaMap;
  intro: string[];
  projectTypes?: ServiceAreaProjectType[];
  services: ServiceAreaService[];
  sectionHeadings?: ServiceAreaSectionHeadings;
  rightFitIntro?: string;
  rightFit: string[];
  howProjectsAreHandledIntro?: string;
  howProjectsAreHandled: string[];
  ctaTitle?: string;
  midPageCta?: ServiceAreaCtaContent;
  whoWeWorkWithIntro?: string;
  whoWeWorkWith: string[];
  whyChooseIntro?: string;
  whyChoose: string[];
  nearbyAreas: Array<string | ServiceAreaLink>;
  faqs: ServiceAreaFaq[];
  whatHappensNextIntro?: string;
  whatHappensNext: string[];
  bottomCta?: ServiceAreaCtaContent;
};
export type ServiceAreaServiceSlug =
  | 'excavation'
  | 'site-preparation'
  | 'grading'
  | 'foundation-excavation'
  | 'dump-truck-services'
  | 'material-delivery'
  | 'equipment-floating';

export type ServiceAreaServiceIndexEntry = {
  slug: ServiceAreaServiceSlug;
  label: string;
  coreServiceHref: string;
};

export const serviceAreaServiceIndex: Record<
  ServiceAreaServiceSlug,
  ServiceAreaServiceIndexEntry
> = {
  excavation: {
    slug: 'excavation',
    label: 'Excavation',
    coreServiceHref: '/services/foundation-excavation',
  },
  'site-preparation': {
    slug: 'site-preparation',
    label: 'Site Preparation',
    coreServiceHref: '/services/site-preparation-land-grading',
  },
  grading: {
    slug: 'grading',
    label: 'Grading',
    coreServiceHref: '/services/site-preparation-land-grading',
  },
  'foundation-excavation': {
    slug: 'foundation-excavation',
    label: 'Foundation Excavation',
    coreServiceHref: '/services/foundation-excavation',
  },
  'dump-truck-services': {
    slug: 'dump-truck-services',
    label: 'Dump Truck Services',
    coreServiceHref: '/services/dump-truck-rental',
  },
  'material-delivery': {
    slug: 'material-delivery',
    label: 'Material Delivery',
    coreServiceHref: '/services/dirt-gravel-delivery',
  },
  'equipment-floating': {
    slug: 'equipment-floating',
    label: 'Equipment Floating',
    coreServiceHref: '/services/heavy-equipment-hauling',
  },
};

const baseServiceAreaPages = {
  brantford: {
    slug: 'brantford',
    city: 'Brantford',
    province: 'Ontario',
    heroTitle:
      'Brantford Excavation Contractor for Site Work, Hauling & Float Service',
    heroDescription:
      'Bellhouse supports Brantford projects with excavation, foundation digging, site preparation, grading, dump truck hauling, material delivery, and equipment floating for builders, contractors, and property owners.',
    metaTitle:
      'Brantford Excavation & Site Prep | Bellhouse',
    metaDescription:
      'Brantford excavation contractor for foundations, site prep, grading, dump truck hauling, and equipment moves on residential and commercial jobs.',
    openGraphDescription:
      'Brantford excavation and hauling support for active streets, mixed urban-rural sites, and jobs that need digging, grading, and truck timing kept together.',
    heroImage: {
      src: '/assets/excavator-loading-tri-axle-foundation.jpg',
      alt: 'Excavator loading a tri-axle dump truck during active site excavation.',
    },
    introImage: {
      src: '/assets/grading-driveway-laser-level.jpg',
      alt: 'Laser-guided grading work preparing a building area for the next phase of construction.',
    },
    ctaImage: {
      src: '/assets/truck-hauling-heavy-equipment.jpg',
      alt: 'Float truck hauling heavy equipment to a prepared jobsite.',
    },
    map: {
      eyebrow: 'Coverage around Brantford',
      title:
        'Brantford jobs often connect to nearby work across Brant County and Hamilton.',
      description:
        'Bellhouse works across Brantford and the surrounding corridor, which makes it practical to keep excavation, truck hauling, and equipment moves coordinated across neighbouring communities.',
    },
    intro: [
      'Brantford work often means keeping excavation and trucking on the same schedule. A foundation dig, a building pad, or a redevelopment site can stall quickly if the spoil is not moving out, the imported stone is late, or the next machine cannot get to site when it is needed.',
      'Bellhouse works on residential starts, commercial site work, additions, yard regrades, laneways, and contractor-led jobs throughout Brantford. The practical advantage is having one crew handle the digging, rough grading, truck coordination, and equipment moves instead of handing those scopes to separate suppliers.',
      'That matters on active Brantford jobs where access is tight, streets are busy, and the next trade is already booked. The work has to be cut to grade, loaded out cleanly, and left ready for forming, servicing, backfill, or aggregate placement.',
    ],
    sectionHeadings: {
      intro: 'Brantford site work that needs digging, grading, and truck timing to line up',
      services:
        'Brantford excavation, grading, hauling, and float work Bellhouse can handle',
      rightFit: 'Is Bellhouse the right fit for your Brantford project?',
      howProjectsAreHandled: 'How Brantford projects are handled',
      whoWeWorkWith: 'Brantford jobs Bellhouse is a good fit for',
      whyChoose:
        'Why Brantford builders call Bellhouse when timing and access matter',
      nearbyAreas: 'Connected service areas near Brantford',
      faq: 'Questions about Brantford excavation, hauling, and site prep',
      whatHappensNext: 'What happens next on a Brantford job',
    },
    ctaTitle: 'Get a quote for Brantford excavation and hauling',
    rightFitIntro:
      'Bellhouse is a fit when the job needs excavation, grading, trucks, and machine timing handled together instead of split across separate suppliers.',
    rightFit: [
      'Builder-led starts, additions, commercial site work, and redevelopment parcels where the next crew is already booked',
      'Jobs that need excavation, spoil haul-out, imported stone, and rough grading lined up on the same schedule',
      'Sites with tighter access, active streets, or limited stockpile room where clean truck timing matters',
      'Owners or contractors who want a direct answer on fit instead of chasing separate excavation, trucking, and float providers',
    ],
    howProjectsAreHandledIntro:
      'Most Brantford jobs move better when the cut, truck cycle, and next delivery are planned together before equipment shows up.',
    howProjectsAreHandled: [
      'Bellhouse starts with the site address, scope, access conditions, and what the next trade needs so the dig is planned around the real job.',
      'Excavation, haul-out, imported material, and grading are sequenced together so the site does not stall between the cut and the next step.',
      'The ground is left ready for footing work, servicing, backfill, aggregate placement, or clean access for the next crew.',
      'If equipment needs to move in or out, float timing is handled against the same schedule instead of becoming a separate delay.',
    ],
    midPageCta: {
      title: 'Need Brantford excavation and trucking lined up?',
      description:
        'Send Bellhouse the address, scope, and rough timing to get a direct answer on fit, schedule pressure, and what the job needs first.',
      supportingPoints: [
        'Excavation, grading, hauling, and float service can stay coordinated.',
        'Useful for residential starts, access work, and redevelopment parcels.',
        'Clear answer on fit before the schedule gets tighter.',
      ],
    },
    services: [
      {
        slug: 'excavation',
        title: 'Excavation for foundations, additions, trenching, and removals',
        description:
          'Bellhouse handles excavation for new home foundations, garage and shop additions, trenching for site services, small demolition removals, and general machine work where grades and spoil handling need to stay controlled from the first cut.',
        coreServiceHref: '/services/foundation-excavation',
        image: {
          src: '/assets/foundation-excavation-machinery.jpg',
          alt: 'Excavator cutting a foundation footprint beside a new residential build.',
        },
      },
      {
        slug: 'site-preparation',
        title: 'Site preparation for residential and contractor-led starts',
        description:
          'Before forming crews, framers, or utility contractors arrive, Bellhouse can strip topsoil, clear working areas, cut access routes, shape laydown space, and get the site ready for the next stage of construction.',
        coreServiceHref: '/services/site-preparation-land-grading',
        image: {
          src: '/assets/site-preparation-dozer-brant-county.jpg',
          alt: 'Dozer shaping stripped ground for a building area and site access.',
        },
      },
      {
        slug: 'grading',
        title:
          'Grading for building pads, drainage, lanes, and finished access',
        description:
          'Brantford grading work includes rough grading around foundations, shaping pads for shops and outbuildings, correcting drainage around structures, and preparing drive lanes, parking areas, and approaches for gravel, asphalt, or concrete.',
        coreServiceHref: '/services/land-grading-drainage',
        image: {
          src: '/assets/driveway-parking-lot-construction.jpg',
          alt: 'Machine grading a driveway and access lane with compacted aggregate.',
        },
      },
      {
        slug: 'demolition',
        title: 'House and barn demolition for removals and site cleanup',
        description:
          'On Brantford properties where old structures, outbuildings, or small removals need to be cleared before new site work, Bellhouse can coordinate demolition with excavation, hauling, and cleanup.',
        coreServiceHref: '/services/house-barn-demolition',
        image: {
          src: '/assets/demo1.jpg',
          alt: 'Bellhouse equipment handling house and barn demolition work.',
        },
      },
      {
        slug: 'dump-truck-services',
        title:
          'Dump truck hauling for spoil removal, stone, gravel, soil, and fill',
        description:
          'Bellhouse uses dump trucks to haul excavated material out and deliver the next load back in, whether that is Granular A, gravel, topsoil, fill, or other site material needed to keep the project moving without extra handling.',
        coreServiceHref: '/services/dump-truck-rental',
        image: {
          src: '/assets/dump-truck-delivery-service.jpg',
          alt: 'Tri-axle dump truck delivering gravel to an active jobsite.',
        },
      },
      {
        slug: 'equipment-floating',
        title:
          'Equipment floating for excavators, skid steers, and site equipment',
        description:
          'When a Brantford job needs an excavator, skid steer, or other heavy equipment moved in or out on a deadline, Bellhouse can coordinate float service so machines arrive when the work is ready instead of sitting off site or waiting on third-party transport.',
        coreServiceHref: '/services/heavy-equipment-hauling',
        image: {
          src: '/assets/truck-hauling-heavy-equipment.jpg',
          alt: 'Float truck hauling an excavator and site equipment to a jobsite.',
        },
      },
    ],
    whoWeWorkWithIntro:
      'Bellhouse is usually brought into Brantford work when one crew needs to keep the ground work and truck coordination moving without extra handoffs.',
    whoWeWorkWith: [
      'Home builders starting foundations, garages, and additions in Brantford neighbourhoods and edge-of-city lots',
      'General contractors who need excavation, grading, and dump truck support kept aligned with the job',
      'Commercial and industrial site crews preparing pads, access, and service trenches',
      'Property owners handling drainage corrections, driveway builds, lot cleanup, or yard regrading',
      'Contractors who need machines floated between Brantford jobs without arranging separate transport',
    ],
    whyChooseIntro:
      'Brantford sites often have little room for stalled trucks or loose handoffs. Bellhouse keeps the ground work practical around access, stockpile space, and the next trade.',
    whyChoose: [
      'Excavation, grading, hauling, material delivery, and equipment moves can be coordinated without turning the site into a string of separate calls.',
      'The cut, haul-out, and imported material are handled with the next trade in mind.',
      'Useful on Brantford sites where tighter access and active streets make late trucks or missed deliveries expensive fast.',
      'Direct communication about fit, timing, and what the site actually needs next.',
    ],
    nearbyAreas: [
      { label: 'Paris', href: '/service-areas/paris' },
      { label: 'Hamilton', href: '/service-areas/hamilton' },
      { label: 'Simcoe', href: '/service-areas/simcoe' },
      'St. George',
      'Brant County',
    ],
    whatHappensNextIntro:
      'Most Brantford jobs do not need a long prequalification process. Bellhouse just needs enough detail to judge fit and timing properly.',
    whatHappensNext: [
      'Share the site address, job type, and rough schedule.',
      'Bellhouse reviews access, scope, and whether excavation, trucking, and float work should be coordinated together.',
      'You get a direct answer on fit, the likely next step, and what details are needed to quote properly.',
      'Once timing is set, the work is scheduled so the cut, trucks, and next delivery line up.',
    ],
    bottomCta: {
      title: 'Request a quote for Brantford excavation and hauling',
      description:
        'Call, text, or request a quote if you need help with Brantford access, haul-out, imported material, grading, or equipment timing.',
      supportingPoints: [
        'Useful for builder-led starts, access work, and redevelopment parcels.',
        'Good fit when active streets or limited stockpile room affect the work.',
        'Straight answer on scope, access, and timing.',
      ],
    },
    faqs: [
      {
        question:
          'Do you handle both excavation and dump truck hauling on Brantford jobs?',
        answer:
          'Yes. Bellhouse handles the excavation work and the truck support that goes with it, including spoil removal and gravel or fill delivery when both need to stay close to the dig.',
      },
      {
        question:
          'Can you excavate foundations and prepare the site for the next trade?',
        answer:
          'Yes. Bellhouse performs foundation excavation, trenching, rough grading, and general site preparation so the site is ready for footing crews, concrete work, utilities, or imported base material.',
      },
      {
        question:
          'Do you deliver gravel, fill, and other materials in Brantford?',
        answer:
          'Yes. Dump truck service includes material delivery for gravel, fill, and other site materials, along with export of excess dirt or unsuitable material from the excavation.',
      },
      {
        question:
          'Do you work with homeowners as well as builders and contractors?',
        answer:
          'Yes. Bellhouse works with builders and general contractors, but also with property owners who need drainage work, foundation digs for additions, driveway preparation, lot cleanup, grading, or trucked-in material for site improvement.',
      },
      {
        question:
          'Can Bellhouse coordinate spoil removal and imported material on the same Brantford project?',
        answer:
          'Yes. Bellhouse can coordinate spoil export and imported gravel, fill, or aggregate on the same Brantford job so the site is not left blocked between phases.',
      },
      {
        question: 'Can you move equipment between Brantford job sites?',
        answer:
          'Yes. Bellhouse offers equipment floating for excavators and other heavy equipment when machines need to move between Brantford jobs or arrive for a scheduled phase.',
      },
      {
        question:
          'What kinds of Brantford projects are a good fit for Bellhouse?',
        answer:
          'Typical work includes foundation excavation, site prep for new builds, grading around homes and shops, service trenching, driveway and access preparation, dump truck hauling, and equipment moves tied to active construction schedules.',
      },
      {
        question: 'Is Bellhouse a fit for smaller Brantford jobs as well as larger site work?',
        answer:
          'Yes. Bellhouse works on active contractor-led projects, but also on smaller Brantford jobs like additions, drainage corrections, driveway prep, trenching, lot cleanup, and other excavation or hauling work where the site still needs to be handled properly.',
      },
    ],
  },
  paris: {
    slug: 'paris',
    city: 'Paris',
    province: 'Ontario',
    heroTitle: 'Excavation, Site Prep & Dump Truck Services in Paris, Ontario',
    heroDescription:
      'Bellhouse provides excavation, grading, site preparation, dump truck hauling, and equipment floating for builders, contractors, and property owners in Paris and Brant County.',
    metaTitle:
      'Paris, ON Excavation & Rural Site Prep | Bellhouse',
    metaDescription:
      'Paris excavation contractor for rural site prep, grading, foundation digs, dump truck hauling, and material delivery across Brant County projects.',
    openGraphDescription:
      'Paris-area excavation and hauling for rural lots, uneven ground, and custom-home projects that need site work and truck support on one schedule.',
    map: {
      eyebrow: 'Coverage around Paris',
      title:
        'Paris work often blends rural lots, uneven grades, drainage decisions, and driveway access that has to hold up through the whole build.',
      description:
        'Bellhouse supports Paris-area projects where excavation, grading, truck hauling, and equipment movement need to stay practical across custom homes, rural properties, and access-heavy site work.',
    },
    intro: [
      'Work in and around Paris often starts on rural lots where the grades are uneven, the driveway run is longer, and the building area needs shaping before the site is ready for footings or utilities. On those jobs, drainage, truck access, and where material moves all affect the dig from day one.',
      'Bellhouse handles excavation, site prep, grading, dump truck hauling, material delivery, and equipment floating for Paris jobs where custom-home work, driveway access, and rough grading all need to stay tied together instead of being split across separate crews.',
      'Typical Paris work includes foundation digs, drainage corrections, driveway and lane prep, service trenching, grading around homes and outbuildings, and machine moves tied to rural construction schedules.',
    ],
    projectTypes: [
      {
        title: 'Rural lots and custom-home starts',
        description:
          'Paris-area rural lots often need the building area, truck access, spoil placement, and rough grades planned together before the foundation or shop pad starts.',
        links: [
          {
            label: 'site preparation and land grading',
            href: '/services/site-preparation-land-grading',
          },
          {
            label: 'foundation excavation',
            href: '/services/foundation-excavation',
          },
        ],
      },
      {
        title: 'Long driveways and access lanes',
        description:
          'Longer approaches and rural access lanes need base prep, compaction, drainage, and material delivery planned so trucks and trades can keep using the route.',
        links: [
          {
            label: 'driveway and parking lot preparation',
            href: '/services/driveway-parking-lot-preparation',
          },
          {
            label: 'land grading and drainage',
            href: '/services/land-grading-drainage',
          },
        ],
      },
      {
        title: 'Pond work and property improvements',
        description:
          'Farms and larger properties may need pond digging, cleaning, shoreline shaping, or drainage improvements tied into access and spoil handling.',
        links: [
          {
            label: 'pond digging and cleaning',
            href: '/services/pond-digging-cleaning',
          },
        ],
      },
      {
        title: 'In-town Paris homes and additions',
        description:
          'Standard in-town Paris projects — additions, garages, driveway prep, and drainage fixes — are handled the same way, reviewed for equipment and truck access rather than lot type.',
        links: [
          {
            label: 'foundation excavation',
            href: '/services/foundation-excavation',
          },
          {
            label: 'land grading and drainage',
            href: '/services/land-grading-drainage',
          },
        ],
      },
    ],
    sectionHeadings: {
      intro: 'Paris site work where grade, drainage, and access affect the whole build',
      services:
        'Paris excavation, grading, hauling, and float services Bellhouse can handle',
      rightFit: 'Is Bellhouse the right fit for your Paris project?',
      howProjectsAreHandled: 'How Paris projects are handled',
      whoWeWorkWith: 'Paris-area projects Bellhouse is a good fit for',
      whyChoose: 'Why Paris builders use Bellhouse on rural lots and custom builds',
      nearbyAreas: 'Nearby Bellhouse service areas around Paris',
      faq: 'Questions about Paris excavation, grading, drainage, and hauling',
      whatHappensNext: 'What happens next on a Paris-area job',
    },
    ctaTitle: 'Get a quote for Paris excavation and trucking',
    rightFitIntro:
      'Bellhouse is a fit for Paris jobs where grade change, drainage, driveway access, and truck movement all have to work together from the start.',
    rightFit: [
      'Custom-home builds, additions, shops, and outbuildings on rural or edge-of-town properties',
      'Lots where driveway access, grade transitions, and truck movement need to stay workable through the whole build',
      'Projects that need excavation, rough grading, spoil haul-out, and imported fill or gravel coordinated together',
      'Owners and builders who want a practical answer on fit before the ground gets opened up',
    ],
    howProjectsAreHandledIntro:
      'Paris work tends to go better when access, drainage, and ground shaping are settled before the first truck cycle starts.',
    howProjectsAreHandled: [
      'Bellhouse reviews the lot, the building area, the driveway route, and the amount of grade change before locking in the dig plan.',
      'Excavation, spoil removal, imported material, and rough grading are sequenced together so the site keeps working instead of getting churned up twice.',
      'Drainage and access are handled as part of the same scope, not left as afterthoughts once the cut is already done.',
      'If machinery needs to move between Paris and nearby jobs, float timing is tied to the same schedule.',
    ],
    midPageCta: {
      title: 'Need Paris excavation that accounts for access and drainage?',
      description:
        'Send Bellhouse the lot location, job type, and rough timing to get a direct read on fit, driveway access, and what the site needs first.',
      supportingPoints: [
        'Strong fit for rural lots, custom builds, and access-heavy work.',
        'Excavation, grading, hauling, and equipment moves can stay coordinated.',
        'Useful before the site gets committed to the wrong access or drainage plan.',
      ],
    },
    services: [
      {
        slug: 'excavation',
        title: 'Excavation for foundations, additions, trenching, and removals',
        description:
          'Bellhouse handles Paris excavation for custom-home foundations, garages, additions, trenching for utilities, and general machine work where cuts need to stay accurate across changing grades and rural site conditions.',
        coreServiceHref: '/services/foundation-excavation',
        image: {
          src: '/assets/foundation-excavation-machinery.jpg',
          alt: 'Excavator cutting a foundation footprint beside a new residential build.',
        },
      },
      {
        slug: 'site-preparation',
        title: 'Site preparation for new builds and rural properties',
        description:
          'Site prep includes stripping topsoil, shaping the building area, setting practical truck and machine access, and preparing rural ground so the next phase can start without avoidable rework.',
        coreServiceHref: '/services/site-preparation-land-grading',
        image: {
          src: '/assets/site-preparation-dozer-brant-county.jpg',
          alt: 'Dozer shaping stripped ground for a building area and site access.',
        },
      },
      {
        slug: 'grading',
        title: 'Grading for drainage, building pads, and access lanes',
        description:
          'Grading work in Paris often revolves around uneven ground, drainage control, driveway approaches, and access lanes that need to stay usable in wet conditions and through active construction.',
        coreServiceHref: '/services/land-grading-drainage',
        image: {
          src: '/assets/driveway-parking-lot-construction.jpg',
          alt: 'Machine grading a driveway and access lane with compacted aggregate.',
        },
      },
      {
        slug: 'pond-digging-cleaning',
        title: 'Pond digging and cleaning for rural properties',
        description:
          'For Paris farms and rural properties, pond excavation, cleaning, deepening, and shoreline shaping can be planned around access, drainage, spoil placement, and truck movement.',
        coreServiceHref: '/services/pond-digging-cleaning',
        image: {
          src: '/assets/pond-digging-cleaning-brant-county.jpg',
          alt: 'Excavator digging and shaping a pond on rural land in Brant County.',
        },
      },
      {
        slug: 'dump-truck-services',
        title: 'Dump truck hauling for gravel, soil, fill, and spoil removal',
        description:
          'Bellhouse handles both export and import of material in Paris, hauling excess dirt out and delivering gravel, fill, topsoil, or aggregate so rural jobs keep moving without relying on outside trucking.',
        coreServiceHref: '/services/dump-truck-rental',
        image: {
          src: '/assets/dump-truck-delivery-service.jpg',
          alt: 'Tri-axle dump truck delivering gravel to an active jobsite.',
        },
      },
      {
        slug: 'equipment-floating',
        title: 'Equipment floating for excavators and site equipment',
        description:
          'Equipment floating is available for moving excavators and site equipment between Paris-area jobs or bringing machinery in when the next phase is ready on a rural or edge-of-town property.',
        coreServiceHref: '/services/heavy-equipment-hauling',
        image: {
          src: '/assets/truck-hauling-heavy-equipment.jpg',
          alt: 'Float truck hauling an excavator and site equipment to a jobsite.',
        },
      },
    ],
    whoWeWorkWithIntro:
      'Most Paris jobs Bellhouse gets called into need more than a simple dig. The site has to keep working through drainage work, truck access, driveway prep, and the next stage of the build.',
    whoWeWorkWith: [
      'Custom-home builders working on rural and edge-of-town properties around Paris',
      'Contractors who need excavation, grading, and truck support kept aligned with the build',
      'Property owners improving land with drainage work, driveway access, trenching, or new construction',
      'Crews building shops, garages, outbuildings, and serviced pads on larger properties',
      'Teams moving machines between Paris, Brantford, St. George, and surrounding jobs',
    ],
    whyChooseIntro:
      'On a Paris lot, the test is whether the site still works after the first dig. Access, drainage, and rough grading need to support the whole build.',
    whyChoose: [
      'Excavation, grading, haul-out, material delivery, and float timing can be handled without making the property owner chase separate suppliers.',
      'Driveway approaches, grade transitions, and drainage shaping are handled with the whole build in mind, not patched in later.',
      'Rural access stays more workable for trucks, machines, and the next trade as the job moves ahead.',
      'You get a direct answer on what the lot needs before more ground is opened up.',
    ],
    nearbyAreas: [
      { label: 'Brantford', href: '/service-areas/brantford' },
      { label: 'Simcoe', href: '/service-areas/simcoe' },
      { label: 'Cambridge', href: '/service-areas/cambridge' },
      'St. George',
    ],
    whatHappensNextIntro:
      'On a Paris lot, the useful first step is usually simple: line up the ground conditions, the access route, and the rough build schedule before the digging starts.',
    whatHappensNext: [
      'Share the property location, project type, and where the main access and building area sit on the lot.',
      'Bellhouse reviews whether grade change, drainage, haul-out, and imported material need to be planned together.',
      'You get a practical answer on fit, the likely order of work, and whether a site look or more detail is needed for quoting.',
      'Once the sequence is clear, the work can be scheduled to keep access and ground conditions usable through the build.',
    ],
    bottomCta: {
      title: 'Request a quote for Paris excavation and trucking',
      description:
        'Call, text, or request a quote if you need help with Paris lot access, drainage, grading, haul-out, or the order of work.',
      supportingPoints: [
        'Useful for rural lots, custom homes, driveway prep, and drainage-heavy work.',
        'Helpful before driveway or drainage decisions get locked in.',
        'Direct answer on what should happen before the first cut.',
      ],
    },
    faqs: [
      {
        question: 'Do you handle both excavation and trucking in Paris?',
        answer:
          'Yes. Bellhouse manages excavation, dump truck hauling, and material delivery in Paris so spoil can leave and aggregate can come back in when the site is ready for it.',
      },
      {
        question: 'Can you prepare a site for a new build or addition?',
        answer:
          'Yes. Bellhouse prepares Paris sites for new builds and additions by stripping, grading, shaping the building area, and setting practical access for foundations, utilities, and the next stage of work.',
      },
      {
        question: 'Do you deliver gravel and fill in Paris?',
        answer:
          'Yes. Dump truck service in Paris includes delivery of gravel, fill, topsoil, and other materials, along with removal of excess soil or spoil from the excavation.',
      },
      {
        question: 'Do you work on rural lots with drainage and access challenges?',
        answer:
          'Yes. Bellhouse supports rural Paris-area jobs where uneven grades, drainage control, and driveway access all have to be planned into the excavation and grading work.',
      },
      {
        question: 'Who does Bellhouse typically work with on Paris-area jobs?',
        answer:
          'Bellhouse works with custom-home builders, contractors, and property owners in Paris and Brant County who need excavation, grading, truck support, or equipment movement tied to a real project schedule.',
      },
      {
        question: 'Can you move equipment between job sites?',
        answer:
          'Yes. Bellhouse provides equipment floating to move excavators and other machinery between Paris-area sites or bring equipment in for rural and edge-of-town work.',
      },
      {
        question: 'What kinds of Paris projects are a good fit for Bellhouse?',
        answer:
          'Good fits include custom-home starts, rural site prep, drainage corrections, driveway and access work, outbuilding pads, service trenching, dump truck hauling, material delivery, and machine moves tied to active construction or property improvement work.',
      },
    ],
  },
  hamilton: {
    slug: 'hamilton',
    city: 'Hamilton',
    province: 'Ontario',
    heroTitle: 'Hamilton Excavation Contractor, Grading & Dump Truck Services',
    heroDescription:
      'Bellhouse supports Hamilton infill builds, commercial sites, and redevelopment work with excavation, grading, dump truck hauling, material delivery, and equipment floating that stay coordinated on one schedule.',
    metaTitle:
      'Hamilton Infill Excavation Contractor | Bellhouse',
    metaDescription:
      'Hamilton excavation contractor for infill construction, site prep, grading, truck hauling, and equipment moves on redevelopment and commercial jobs.',
    openGraphDescription:
      'Hamilton excavation support for infill builds, redevelopment parcels, and commercial sites where tight access, haul-out, and machine timing shape the schedule.',
    map: {
      eyebrow: 'Hamilton coverage',
      title:
        'Hamilton work often means tighter schedules, faster turnover between trades, and excavation that has to keep pace with redevelopment activity.',
      description:
        'Bellhouse supports Hamilton jobs that need excavation, truck hauling, material delivery, and machine moves sequenced cleanly across redevelopment, commercial, and logistics-heavy sites.',
    },
    intro: [
      'Hamilton excavation work is often tied to redevelopment schedules, active commercial properties, and tighter urban access where delays spread fast. Once the dig starts, haul-out, imported material, and machine timing all have to keep pace with the wider job.',
      'Bellhouse handles excavation, site prep, grading, dump truck hauling, material delivery, and equipment floating for Hamilton work where infill builds, commercial upgrades, industrial yards, and redevelopment parcels need one crew to keep the ground work and truck movement in step.',
      'The practical job is to cut accurately, move spoil out without clogging the site, bring the next load in when the grade is ready, and leave the work area stable for utilities, concrete, paving prep, or the next subcontractor.',
    ],
    sectionHeadings: {
      intro: 'Hamilton jobs where schedule pressure and truck logistics matter',
      services:
        'Hamilton excavation, grading, hauling, and float work Bellhouse can handle',
      rightFit: 'Is Bellhouse the right fit for your Hamilton project?',
      howProjectsAreHandled: 'How Hamilton projects are handled',
      whoWeWorkWith:
        'Hamilton contractors, developers, and owners Bellhouse works with',
      whyChoose:
        'Why Hamilton jobs rely on Bellhouse for excavation and trucking',
      nearbyAreas: 'Connected Bellhouse service areas near Hamilton',
      faq: 'Questions about Hamilton excavation, haul-out, grading, and truck timing',
      whatHappensNext: 'What happens next on a Hamilton job',
    },
    ctaTitle: 'Get a quote for Hamilton excavation and truck support',
    rightFitIntro:
      'Bellhouse is a fit for Hamilton work where schedule pressure, redevelopment conditions, and truck logistics matter as much as the digging itself.',
    rightFit: [
      'Redevelopment, infill, commercial, industrial, and logistics-style jobs where crews overlap and access windows are short',
      'Projects that need excavation, haul-out, imported aggregate, and grading coordinated tightly instead of handed to separate suppliers',
      'Sites that stay active while the work is underway and cannot afford loose sequencing or late truck cycles',
      'Contractors and owners who need a direct answer on fit and timing before the schedule gets tighter',
    ],
    howProjectsAreHandledIntro:
      'Hamilton jobs usually need tighter sequencing because trucks, machines, and follow-on crews are all working around narrower windows.',
    howProjectsAreHandled: [
      'Bellhouse starts with the site conditions, access constraints, truck route, and what the next crew needs before the dig plan is set.',
      'Excavation, haul-out, imported material, and grading are sequenced to keep the site turning over without unnecessary downtime.',
      'Staging, turning space, and clean export of material are handled with the active site in mind, not as separate afterthoughts.',
      'If equipment needs to move between Hamilton-area jobs, float timing is tied into the same working schedule.',
    ],
    midPageCta: {
      title: 'Need Hamilton excavation that matches a tighter schedule?',
      description:
        'Send Bellhouse the address, scope, and timing pressure to get a direct read on fit, truck logistics, and the best next step for the site.',
      supportingPoints: [
        'Strong fit for redevelopment, commercial, industrial, and infill work.',
        'Excavation, haul-out, imported material, and float timing can stay coordinated.',
        'Useful before truck access and staging turn into schedule problems.',
      ],
    },
    services: [
      {
        slug: 'excavation',
        title: 'Excavation for foundations, trenching, removals, and site work',
        description:
          'Bellhouse excavates for Hamilton foundation starts, service trenching, removals, and general site work where cuts have to stay accurate and exported material has to move cleanly off active commercial and redevelopment properties.',
        coreServiceHref: '/services/foundation-excavation',
        image: {
          src: '/assets/foundation-excavation-machinery.jpg',
          alt: 'Excavator cutting a foundation footprint beside a new residential build.',
        },
      },
      {
        slug: 'site-preparation',
        title: 'Site preparation for commercial and residential construction',
        description:
          'Hamilton site prep includes stripping, controlled demolition support, access setup, work-pad shaping, and staged grading so concrete, utility, and framing crews can step into a site that is actually ready on a tight schedule.',
        coreServiceHref: '/services/site-preparation-land-grading',
        image: {
          src: '/assets/site-preparation-dozer-brant-county.jpg',
          alt: 'Dozer shaping stripped ground for a building area and site access.',
        },
      },
      {
        slug: 'grading',
        title: 'Grading for drainage, building pads, and construction flow',
        description:
          'Grading work in Hamilton often means balancing drainage, pad elevations, haul access, turning space, and usable staging on sites that stay active while multiple trades and deliveries cycle through.',
        coreServiceHref: '/services/land-grading-drainage',
        image: {
          src: '/assets/driveway-parking-lot-construction.jpg',
          alt: 'Machine grading a driveway and access lane with compacted aggregate.',
        },
      },
      {
        slug: 'dump-truck-services',
        title: 'Dump truck hauling for spoil removal and material delivery',
        description:
          'Bellhouse provides dump truck hauling for export and import on Hamilton jobs, removing excavated material and bringing in gravel, fill, or aggregate fast enough to keep redevelopment and commercial schedules moving.',
        coreServiceHref: '/services/dump-truck-rental',
        image: {
          src: '/assets/dump-truck-delivery-service.jpg',
          alt: 'Tri-axle dump truck delivering gravel to an active jobsite.',
        },
      },
      {
        slug: 'equipment-floating',
        title: 'Equipment floating for excavators and heavy equipment',
        description:
          'Equipment floating is available for excavators, skid steers, and site equipment moving between Hamilton projects so machines arrive when the schedule opens instead of sitting off site or waiting on outside transport.',
        coreServiceHref: '/services/heavy-equipment-hauling',
        image: {
          src: '/assets/truck-hauling-heavy-equipment.jpg',
          alt: 'Float truck hauling an excavator and site equipment to a jobsite.',
        },
      },
    ],
    whoWeWorkWithIntro:
      'Most Hamilton jobs Bellhouse gets called into already have pressure on them. The site needs excavation and truck movement handled without slowing down the rest of the schedule.',
    whoWeWorkWith: [
      'General contractors managing infill builds and redevelopment work across Hamilton neighbourhoods',
      'Developers coordinating phased commercial, industrial, logistics, or mixed-use site activity',
      'Builders who need excavation, haul-out, imported material, and machine timing aligned with tighter schedules',
      'Property and site managers upgrading yards, drainage, loading areas, access routes, and service spaces',
      'Crews requiring machines floated between Hamilton, Ancaster, Dundas, Stoney Creek, and surrounding jobs',
    ],
    whyChooseIntro:
      'On Hamilton work, the difference is usually control. Truck movement, staging, and material export need to fit the site window instead of fighting it.',
    whyChoose: [
      'Excavation, grading, haul-out, imported material, and equipment moves can be coordinated around tighter site windows.',
      'A better fit for redevelopment and commercial logistics where access windows are short and turnover between trades matters.',
      'Truck timing, staging, and handoff to the next trade stay cleaner when the same crew is handling the ground work sequence.',
      'You get a direct answer on fit, timing, and whether the work needs to be staged differently before it starts.',
    ],
    nearbyAreas: [
      { label: 'Ancaster', href: '/service-areas/ancaster' },
      { label: 'Dundas', href: '/service-areas/dundas' },
      { label: 'Waterdown', href: '/service-areas/waterdown' },
      'Stoney Creek',
    ],
    whatHappensNextIntro:
      'On Hamilton work, the useful first step is usually to settle the schedule pressure, truck movement, and access limits before the digging starts.',
    whatHappensNext: [
      'Share the site address, project scope, and rough timing or deadline pressure.',
      'Bellhouse reviews access, staging, haul-out needs, and whether imported material or float service should be tied into the same plan.',
      'You get a direct answer on fit, the likely order of work, and whether more site detail is needed to quote properly.',
      'Once the sequence is clear, the job can be scheduled to keep excavation and logistics moving together.',
    ],
    bottomCta: {
      title: 'Request a quote for Hamilton excavation and truck support',
      description:
        'Call, text, or request a quote if you need help with Hamilton access, haul-out, imported material, staging, or equipment moves.',
      supportingPoints: [
        'Useful for redevelopment, commercial, industrial, and infill work.',
        'Built around constrained access and shorter truck windows.',
        'Direct answer on fit, timing, and staging.',
      ],
    },
    faqs: [
      {
        question:
          'Do you handle both excavation and dump truck hauling in Hamilton?',
        answer:
          'Yes. Bellhouse handles excavation and dump truck hauling on Hamilton jobs, including spoil export, imported aggregate, and truck timing for redevelopment and commercial sites.',
      },
      {
        question:
          'Can you prepare a site for commercial or residential construction?',
        answer:
          'Yes. Bellhouse prepares Hamilton sites for foundations, utility work, paving prep, and follow-on trades by clearing, stripping, rough grading, and setting up functional access and work areas that support a tighter schedule.',
      },
      {
        question: 'Do you work with commercial contractors and redevelopment teams in Hamilton?',
        answer:
          'Yes. Bellhouse works with Hamilton contractors, developers, and site managers on redevelopment parcels, commercial upgrades, industrial improvements, and other jobs where excavation and truck timing have to fit a tighter schedule.',
      },
      {
        question: 'Do you deliver materials like gravel and fill?',
        answer:
          'Yes. Bellhouse delivers gravel, fill, aggregate, and other jobsite material in Hamilton while also hauling out excess soil or demolition-related spoil from the same project so the site keeps turning over properly.',
      },
      {
        question: 'Can you move equipment between Hamilton job sites?',
        answer:
          'Yes. Bellhouse provides float service for excavators and other site equipment when Hamilton jobs need machines delivered, removed, or shifted between active sites.',
      },
      {
        question: 'What types of projects are a good fit in Hamilton?',
        answer:
          'Good fits include infill housing, redevelopment sites, commercial additions, logistics yards, industrial yard work, foundation digs, service trenching, staged grading, dump truck hauling, and equipment moves tied to active construction schedules.',
      },
      {
        question: 'Can Bellhouse help keep a tighter Hamilton schedule moving between trades?',
        answer:
          'Yes. Bellhouse coordinates excavation, haul-out, imported material, grading, and machine movement so Hamilton sites are less likely to lose time between demolition, underground work, concrete, paving prep, and follow-on crews.',
      },
    ],
  },
  cambridge: {
    slug: 'cambridge',
    city: 'Cambridge',
    province: 'Ontario',
    heroTitle: 'Cambridge Excavation, Site Prep & Dump Truck Services',
    heroDescription:
      'Bellhouse provides excavation, grading, site preparation, dump truck hauling, and equipment floating for Cambridge construction, industrial, and multi-phase development work across Waterloo Region.',
    metaTitle:
      'Cambridge Site Prep & Excavation | Bellhouse',
    metaDescription:
      'Cambridge excavation contractor for site prep, grading, dump truck hauling, and material delivery on residential, commercial, and industrial projects.',
    openGraphDescription:
      'Cambridge excavation and hauling for staged builds, industrial properties, and Waterloo Region jobs that need grading, truck access, and material flow aligned.',
    map: {
      eyebrow: 'Cambridge coverage',
      title:
        'Cambridge projects often depend on steady site flow across mixed residential, commercial, and industrial work.',
      description:
        'Bellhouse supports Cambridge-area excavation where grading, trucking, material delivery, and equipment movement have to stay coordinated across mixed-use active sites.',
    },
    intro: [
      'Cambridge work often moves through active residential, commercial, and industrial sites where excavation is only one part of a broader flow. Crews, trucks, material deliveries, and machine moves all need to stay in sequence so the site keeps working instead of stalling between phases.',
      'Bellhouse handles excavation, site prep, rough grading, dump truck hauling, material delivery, and equipment floating for Cambridge jobs where imported material, spoil removal, haul routes, and machine timing all have to stay lined up through multiple stages of work.',
      'The practical focus is site flow: get the cut right, keep pads and haul routes usable, move material without bottlenecks, and leave the next crew a site that is ready to keep building.',
    ],
    sectionHeadings: {
      intro:
        'Site work for active Cambridge jobs that cannot lose flow',
      services:
        'Cambridge excavation, grading, hauling, and float work Bellhouse can handle',
      rightFit: 'Is Bellhouse the right fit for your Cambridge project?',
      howProjectsAreHandled: 'How Cambridge projects are handled',
      whoWeWorkWith: 'Cambridge jobs Bellhouse is a good fit for',
      whyChoose:
        'Why Cambridge jobs use Bellhouse for excavation, grading, and hauling',
      nearbyAreas:
        'Nearby Bellhouse service areas connected to Cambridge work',
      faq: 'Questions about Cambridge excavation, grading, haul-out, and site flow',
      whatHappensNext: 'What happens next on a Cambridge job',
    },
    ctaTitle: 'Get a quote for Cambridge excavation and truck support',
    rightFitIntro:
      'Bellhouse is a fit for Cambridge jobs where excavation has to keep pace with an active site instead of stopping the flow of crews, trucks, and materials.',
    rightFit: [
      'Residential, commercial, and industrial jobs that stay active while work moves through stages',
      'Projects that need excavation, grading, spoil export, imported aggregate, and float timing aligned on one plan',
      'Sites where haul routes, work pads, and staging areas need to stay functional during the build',
      'Builders, developers, and facility-side clients who want a direct answer on fit and sequencing before the site loses momentum',
    ],
    howProjectsAreHandledIntro:
      'Cambridge work usually goes best when the digging is planned around site flow, not treated as an isolated machine booking.',
    howProjectsAreHandled: [
      'Bellhouse starts by looking at access, work sequence, material movement, and which areas of the site need to stay usable while the job keeps moving.',
      'Excavation, grading, haul-out, and imported material are timed together so the site does not lose momentum between phases.',
      'Pads, haul routes, and work surfaces are left in condition for the next crew instead of getting handed off half ready.',
      'If machinery has to move between Cambridge and nearby jobs, float service can be tied to the same sequence.',
    ],
    midPageCta: {
      title: 'Need Cambridge excavation that keeps the site moving?',
      description:
        'Send Bellhouse the site address, scope, and rough stage of work to get a direct read on fit, site flow, and what should happen first.',
      supportingPoints: [
        'Strong fit for mixed residential, commercial, and industrial work.',
        'Excavation, truck support, grading, and machine movement can stay coordinated.',
        'Useful before haul routes and staging become the problem.',
      ],
    },
    services: [
      {
        slug: 'excavation',
        title: 'Excavation for foundations, trenching, and site development',
        description:
          'Bellhouse handles excavation for Cambridge foundations, service trenching, removals, and site development where grades, truck access, and clean material handling all need to stay controlled from the first cut on an active site.',
        coreServiceHref: '/services/foundation-excavation',
        image: {
          src: '/assets/foundation-excavation-machinery.jpg',
          alt: 'Excavator cutting a foundation footprint beside a new residential build.',
        },
      },
      {
        slug: 'site-preparation',
        title: 'Site preparation for active construction and staged builds',
        description:
          'Site prep includes stripping, clearing, shaping pads, organizing work areas, and preparing haul access so forming crews, underground trades, and follow-on contractors can move through the site without rework or bottlenecks.',
        coreServiceHref: '/services/site-preparation-land-grading',
        image: {
          src: '/assets/site-preparation-dozer-brant-county.jpg',
          alt: 'Dozer shaping stripped ground for a building area and site access.',
        },
      },
      {
        slug: 'grading',
        title: 'Grading for drainage, pads, and functional work surfaces',
        description:
          'Cambridge grading work supports drainage, pad elevations, yard shaping, haul routes, and stable working surfaces for projects that need to stay productive through multiple build stages.',
        coreServiceHref: '/services/land-grading-drainage',
        image: {
          src: '/assets/driveway-parking-lot-construction.jpg',
          alt: 'Machine grading a driveway and access lane with compacted aggregate.',
        },
      },
      {
        slug: 'material-delivery',
        title: 'Dirt and gravel delivery for active site material needs',
        description:
          'Cambridge jobs often need aggregate, fill, or gravel brought in while excavation spoil moves out, so material delivery can stay tied to the same schedule as grading and truck flow.',
        coreServiceHref: '/services/dirt-gravel-delivery',
        image: {
          src: '/assets/dump-truck-delivery-service.jpg',
          alt: 'Tri-axle dump truck delivering gravel to an active jobsite.',
        },
      },
      {
        slug: 'dump-truck-services',
        title: 'Dump truck hauling for material movement and supply',
        description:
          'Bellhouse provides Cambridge dump truck hauling for spoil export, aggregate delivery, fill placement support, and material movement that keeps excavation, grading, and the overall site flow from stalling.',
        coreServiceHref: '/services/dump-truck-rental',
        image: {
          src: '/assets/dump-truck-delivery-service.jpg',
          alt: 'Tri-axle dump truck delivering gravel to an active jobsite.',
        },
      },
      {
        slug: 'equipment-floating',
        title: 'Equipment floating for excavators and heavy machinery',
        description:
          'Equipment floating is available to move excavators and heavy machinery between Cambridge sites, industrial properties, and surrounding Waterloo Region jobs when the next phase is ready and the site flow depends on the machine being there on time.',
        coreServiceHref: '/services/heavy-equipment-hauling',
        image: {
          src: '/assets/truck-hauling-heavy-equipment.jpg',
          alt: 'Float truck hauling an excavator and site equipment to a jobsite.',
        },
      },
    ],
    whoWeWorkWithIntro:
      'Most Cambridge jobs Bellhouse gets called into are already active. The site still has to keep moving while excavation, haul-out, grading, and deliveries happen.',
    whoWeWorkWith: [
      'General contractors running residential, commercial, and industrial jobs across Cambridge',
      'Builders who need excavation, trucking, grading, and material flow aligned across staged lot or building sequences',
      'Developers coordinating spoil removal, imported aggregate, and machine movement across multiple phases',
      'Property owners and facility managers improving yards, drainage, access roads, serviced building areas, and industrial work zones',
      'Crews moving equipment between Cambridge, Kitchener, Ayr, and surrounding jobs',
    ],
    whyChooseIntro:
      'On Cambridge work, the difference is keeping active areas usable. Pads, haul routes, and deliveries need to support the next phase instead of blocking it.',
    whyChoose: [
      'Excavation, grading, haul-out, material delivery, and equipment moves can be coordinated around staged site activity.',
      'Active haul routes, work pads, and staging areas stay more usable through each phase of the job.',
      'Material leaves and arrives when the site can use it, which helps reduce bottlenecks on mixed-use active work.',
      'You get a direct answer on fit, timing, and how to keep the next step moving.',
    ],
    nearbyAreas: [
      { label: 'Paris', href: '/service-areas/paris' },
      { label: 'Woodstock', href: '/service-areas/woodstock' },
      'Kitchener',
      'Ayr',
    ],
    whatHappensNextIntro:
      'On Cambridge work, the first useful step is usually to line up access, staging, and material movement with the part of the site that has to stay active.',
    whatHappensNext: [
      'Share the site address, project type, and what stage the work is in now.',
      'Bellhouse reviews access, active haul routes, material movement, and whether excavation, trucking, grading, and float work should stay on one plan.',
      'You get a direct answer on fit, the likely order of work, and whether more site detail is needed to quote properly.',
      'Once the sequence is clear, the job can be scheduled to keep the site moving instead of waiting between phases.',
    ],
    bottomCta: {
      title: 'Request a quote for Cambridge excavation and truck support',
      description:
        'Call, text, or request a quote if you need help with Cambridge haul routes, staging, grading, spoil export, or material delivery.',
      supportingPoints: [
        'Useful for active residential, commercial, and industrial sites.',
        'Helpful when pads and work surfaces need to stay usable.',
        'Direct answer on fit, access, and sequencing.',
      ],
    },
    faqs: [
      {
        question:
          'Do you handle both excavation and dump truck hauling in Cambridge?',
        answer:
          'Yes. Bellhouse handles Cambridge excavation and dump truck hauling so spoil can be exported and gravel, fill, or aggregate can be delivered without blocking active site areas.',
      },
      {
        question: 'Can you prepare a site for construction in Cambridge?',
        answer:
          'Yes. Bellhouse prepares Cambridge sites for foundations, utilities, pads, access routes, and follow-on trades through stripping, grading, clearing, and construction-focused site shaping that keeps the job moving.',
      },
      {
        question: 'Who does Bellhouse usually work with on Cambridge projects?',
        answer:
          'Bellhouse works with general contractors, builders, developers, property owners, and facility managers in Cambridge who need excavation, grading, truck hauling, material delivery, or equipment movement coordinated on active sites.',
      },
      {
        question: 'Do you deliver gravel and fill materials?',
        answer:
          'Yes. Bellhouse delivers gravel, fill, aggregate, and related materials in Cambridge while also hauling out excess excavation spoil when the project needs both scopes coordinated on the same active site.',
      },
      {
        question: 'Can you move equipment between job sites?',
        answer:
          'Yes. Bellhouse provides float service to move excavators and other heavy machinery between Cambridge jobs or bring equipment into staged work when the next phase is ready.',
      },
      {
        question: 'What types of projects are a good fit in Cambridge?',
        answer:
          'Typical Cambridge work includes foundation excavation, site development, trenching, commercial additions, industrial yard improvements, staged lot prep, drainage grading, dump truck hauling, and equipment moves tied to active build schedules.',
      },
      {
        question: 'Can Bellhouse support Cambridge jobs that stay active while work is underway?',
        answer:
          'Yes. Bellhouse is a good fit for Cambridge sites that need to keep materials moving, haul routes usable, and equipment arriving on time while residential, commercial, or industrial work continues through multiple phases.',
      },
    ],
  },

  dundas: {
    slug: 'dundas',
    city: 'Dundas',
    province: 'Ontario',
    heroTitle:
      'Dundas Excavation Contractor for Tight Residential Site Work & Trucking',
    heroDescription:
      'Bellhouse handles Dundas excavation, site preparation, grading, dump truck hauling, material delivery, and equipment floating for older properties, additions, drainage work, and tight residential projects where access has to stay controlled.',
    metaTitle:
      'Dundas Excavation & Tight-Lot Site Prep | Bellhouse',
    metaDescription:
      'Dundas excavation contractor for additions, drainage, grading, trenching, and site prep on older properties with tighter access.',
    openGraphTitle:
      'Dundas excavation for tight residential site work | Bellhouse',
    openGraphDescription:
      'Dundas excavation and truck support for older properties, additions, drainage work, and tighter residential lots where access and grading need to stay controlled.',
    map: {
      eyebrow: 'Nearby work',
      title:
        'Dundas jobs often connect to nearby work, but the site conditions are usually tighter and more residential.',
      description:
        'Bellhouse handles excavation, grading, hauling, and equipment movement across the region from its Paris base, supporting Dundas work where access, neighbours, and clean truck movement matter from the start.',
    },
    intro: [
      'Dundas jobs often happen on older residential properties where the work area is tighter, the driveway is already established, and there is less room to stage spoil, stone, and truck movement without creating problems fast.',
      'That changes the work. Excavation has to stay controlled around existing houses, additions, garages, trees, fences, retaining edges, and neighbouring properties instead of treating the lot like an open site.',
      'Typical Dundas work includes additions, garage foundations, drainage corrections, service trenching, driveway and access improvements, rough grading, spoil haul-out, and imported material for smaller residential builds that still need proper truck support.',
    ],
    projectTypes: [
      {
        title: 'Additions and foundation work on older properties',
        description:
          'Dundas lots can require controlled excavation around existing homes, neighbouring structures, landscaping, and tighter working areas.',
        links: [
          {
            label: 'foundation excavation',
            href: '/services/foundation-excavation',
          },
        ],
      },
      {
        title: 'Driveway reconstruction and access fixes',
        description:
          'Driveway work often needs base prep, slope correction, drainage planning, and careful truck access on tighter residential properties.',
        links: [
          {
            label: 'driveway and parking lot preparation',
            href: '/services/driveway-parking-lot-preparation',
          },
          {
            label: 'land grading and drainage',
            href: '/services/land-grading-drainage',
          },
        ],
      },
      {
        title: 'Drainage correction on tight residential lots',
        description:
          'Established properties may need runoff redirected, low areas corrected, or grades reshaped without disrupting the rest of the lot.',
        links: [
          {
            label: 'land grading and drainage',
            href: '/services/land-grading-drainage',
          },
        ],
      },
      {
        title: 'Truck and equipment coordination',
        description:
          'Narrower access and busy residential streets make truck timing, haul-out, and equipment moves part of the actual excavation plan.',
        links: [
          {
            label: 'dump truck rental',
            href: '/services/dump-truck-rental',
          },
          {
            label: 'heavy equipment hauling',
            href: '/services/heavy-equipment-hauling',
          },
        ],
      },
    ],
    sectionHeadings: {
      intro: 'Tight residential site work in Dundas',
      services: 'Excavation, grading, hauling, and float work in Dundas',
      rightFit: 'Is Bellhouse the right fit for your Dundas project?',
      howProjectsAreHandled: 'How Dundas projects are handled',
      whoWeWorkWith: 'Who this Dundas work is for',
      whyChoose: 'Why Dundas jobs call Bellhouse',
      nearbyAreas: 'Nearby areas',
      faq: 'Dundas excavation and grading FAQs',
      whatHappensNext: 'What happens next on a Dundas job',
    },
    ctaTitle:
      'Get a quote for Dundas excavation, grading, or truck support',
    rightFitIntro:
      'Bellhouse is a fit for Dundas jobs where excavation has to stay practical on a tighter residential property, with trucking, grading, and material movement handled cleanly instead of improvised after the cut starts.',
    rightFit: [
      'Residential additions, garages, drainage fixes, and foundation work on older properties with limited room to stage materials',
      'Projects that need excavation, spoil haul-out, imported gravel or fill, and grading kept together so the lot stays usable',
      'Jobs where driveway access, neighbour proximity, established landscaping, or small work areas make clean truck movement important',
      'Owners, builders, and contractors who want a direct answer on fit before the site gets boxed in by the wrong sequence',
    ],
    howProjectsAreHandledIntro:
      'Dundas work usually goes better when the access route, spoil movement, and next step on site are sorted out before equipment starts cutting.',
    howProjectsAreHandled: [
      'Bellhouse starts with the address, the existing access, and what has to stay protected or usable while the work is underway.',
      'Excavation, truck hauling, imported aggregate, and rough grading are sequenced so the property does not get blocked off halfway through the job.',
      'The ground is left ready for the next residential step, whether that is footings, concrete, drainage work, backfill, or driveway prep.',
      'If machinery has to move between Dundas and nearby jobs, float timing can be tied into the same schedule.',
    ],
    midPageCta: {
      title: 'Need Dundas excavation that works on a tighter property?',
      description:
        'Send Bellhouse the address, the job type, and the rough timing to get a direct read on access, truck fit, and what should happen first.',
      supportingPoints: [
        'Strong fit for additions, garage foundations, drainage work, and driveway access improvements.',
        'Excavation, hauling, grading, and equipment movement can stay coordinated.',
        'Useful before a small site turns into a bigger cleanup problem.',
      ],
    },
    services: [
      {
        slug: 'excavation',
        title: 'Excavation for additions, foundations, trenches, and residential site changes',
        description:
          'Bellhouse handles Dundas excavation for additions, garage foundations, service trenching, removals, and residential site changes where the cut has to stay controlled around existing structures and tighter work zones.',
        coreServiceHref: '/services/foundation-excavation',
        image: {
          src: '/assets/foundation-excavation-machinery.jpg',
          alt: 'Excavator cutting a foundation footprint beside a new residential build.',
        },
      },
      {
        slug: 'site-preparation',
        title: 'Site preparation for older properties and build-ready access',
        description:
          'Dundas site prep includes stripping, shaping work areas, setting access, and preparing the lot so residential construction can move ahead without fighting mud, poor staging, or blocked driveways every day.',
        coreServiceHref: '/services/site-preparation-land-grading',
        image: {
          src: '/assets/site-preparation-dozer-brant-county.jpg',
          alt: 'Dozer shaping stripped ground for a building area and site access.',
        },
      },
      {
        slug: 'grading',
        title: 'Grading for drainage, driveway function, and controlled runoff',
        description:
          'Bellhouse handles Dundas grading for drainage corrections, driveway approaches, rough residential shaping, and finished grade prep where runoff and access have to work on a tighter lot with existing surroundings.',
        coreServiceHref: '/services/land-grading-drainage',
        image: {
          src: '/assets/driveway-parking-lot-construction.jpg',
          alt: 'Machine grading a driveway and access lane with compacted aggregate.',
        },
      },
      {
        slug: 'driveway-parking-lot-preparation',
        title: 'Driveway and parking lot preparation on tighter properties',
        description:
          'Dundas properties often need driveway base, access shaping, and drainage decisions handled carefully so vehicles and crews can use the space without fighting runoff or soft ground.',
        coreServiceHref: '/services/driveway-parking-lot-preparation',
        image: {
          src: '/assets/services/driveway-grading-concrete-base.webp',
          alt: 'Skid steer grading a driveway base and setting slope for drainage.',
        },
      },
      {
        slug: 'dump-truck-services',
        title: 'Dump truck hauling and material delivery for spoil, gravel, and fill',
        description:
          'Bellhouse provides Dundas dump truck hauling for spoil export and material delivery for gravel, topsoil, and fill so excavation and grading work can keep moving without waiting on separate truck availability.',
        coreServiceHref: '/services/dump-truck-rental',
        image: {
          src: '/assets/dump-truck-delivery-service.jpg',
          alt: 'Tri-axle dump truck delivering gravel to an active jobsite.',
        },
      },
      {
        slug: 'equipment-floating',
        title: 'Equipment floating for excavators and residential site machinery',
        description:
          'Equipment floating is available for excavators, skid steers, and heavy site machinery moving into Dundas or between nearby jobs when the machine has to land on schedule for a tight residential phase change.',
        coreServiceHref: '/services/heavy-equipment-hauling',
        image: {
          src: '/assets/truck-hauling-heavy-equipment.jpg',
          alt: 'Float truck hauling an excavator and site equipment to a jobsite.',
        },
      },
    ],
    whoWeWorkWithIntro:
      'This is a good fit for people who need the job handled cleanly on a smaller or older residential property without losing control of access, drainage, or truck movement.',
    whoWeWorkWith: [
      'Homeowners planning additions, garages, drainage improvements, and other residential site work in Dundas',
      'Builders and renovation contractors preparing tighter lots for foundations, trenching, and concrete work',
      'General contractors who want excavation, grading, hauling, and material delivery kept aligned with the job',
      'Concrete, utility, drainage, and landscape crews stepping into a site that has to be shaped properly first',
      'Teams moving machines between Dundas, Hamilton, Ancaster, Waterdown, and nearby jobs',
    ],
    whyChooseIntro:
      'Dundas work rewards careful sequencing. Existing driveways, neighbours, trees, fences, and drainage paths leave less room for rough truck movement.',
    whyChoose: [
      'Bellhouse can handle the dig, haul-out, imported material, and machine movement without crowding a smaller site with separate suppliers.',
      'Older residential properties usually leave less room for mistakes, so clean access and controlled grading matter more than broad production-style site work.',
      'The work is planned around the existing property, not generic open-site assumptions.',
      'You get a direct answer on fit, access, and likely sequence before the site gets crowded or the drainage plan goes sideways.',
    ],
    nearbyAreas: [
      { label: 'Hamilton', href: '/service-areas/hamilton' },
      { label: 'Ancaster', href: '/service-areas/ancaster' },
      { label: 'Waterdown', href: '/service-areas/waterdown' },
      'Flamborough',
    ],
    whatHappensNextIntro:
      'On Dundas work, the useful first step is usually to sort out site access, what has to stay protected, and how spoil and imported material will move through the property.',
    whatHappensNext: [
      'Share the address, the job type, and the rough timing.',
      'Bellhouse reviews access, staging room, spoil movement, material delivery, and whether excavation, grading, and trucking should stay together.',
      'You get a direct answer on fit, likely sequence, and whether more site detail is needed for quoting.',
      'Once the plan is clear, the job can be scheduled to keep the property workable while the next residential trade moves in.',
    ],
    bottomCta: {
      title: 'Request a quote for Dundas excavation and truck support',
      description:
        'Call, text, or request a quote if you need help with tight Dundas access, drainage grading, spoil haul-out, or driveway function.',
      supportingPoints: [
        'Useful for additions, drainage fixes, garage foundations, and tighter residential site work.',
        'Helpful where existing driveways, neighbours, or landscaping limit staging.',
        'Direct answer on fit, access, and sequence.',
      ],
    },
    faqs: [
      {
        question:
          'Do you handle excavation, truck hauling, and material delivery together in Dundas?',
        answer:
          'Yes. Bellhouse can handle Dundas excavation, dump truck hauling, and material delivery so spoil can leave, gravel or fill can come back in, and the property can stay workable between phases.',
      },
      {
        question:
          'Is Dundas a good fit for tighter residential excavation work?',
        answer:
          'Yes. Dundas is a strong fit for residential excavation tied to additions, garage foundations, drainage improvements, driveway access work, and service trenching on older properties. Bellhouse is a good fit when the lot is tighter, neighbours are close, and the work needs to stay controlled instead of being treated like an open subdivision site.',
      },
      {
        question:
          'Can you prepare a Dundas addition or garage site before the concrete or framing crew arrives?',
        answer:
          'Yes. Bellhouse can prepare a Dundas site by stripping the work area, handling excavation, hauling spoil out, bringing gravel or fill back in, and rough grading the lot so the footing, concrete, drainage, or framing crew is stepping into usable ground instead of fixing the site first.',
      },
      {
        question: 'Who does Bellhouse typically work with on Dundas projects?',
        answer:
          'Bellhouse works with homeowners, builders, renovation contractors, concrete crews, utility contractors, drainage crews, and landscape contractors in Dundas who need excavation, grading, dump truck hauling, material delivery, or equipment floating tied to the same residential project schedule.',
      },
      {
        question:
          'Do you provide grading and drainage work on older Dundas properties?',
        answer:
          'Yes. Bellhouse handles Dundas grading for drainage corrections, driveway approaches, rough site shaping, runoff control, and build-ready residential grades. On older properties, the grading has to work with the existing house, neighbouring lots, and the way water already moves through the site, not just the immediate cut area.',
      },
      {
        question:
          'Can you move equipment into or out of Dundas jobs when the timing changes?',
        answer:
          'Yes. Bellhouse provides equipment floating for excavators, skid steers, and heavy site machinery when Dundas projects need machines delivered, removed, or shifted between nearby jobs.',
      },
      {
        question: 'What kinds of Dundas projects are a good fit for Bellhouse?',
        answer:
          'Good Dundas fits include additions, garage foundations, service trenching, drainage work, driveway access improvements, spoil haul-out, imported gravel or fill, rough grading, and residential site prep on older or tighter properties. If the project needs excavation, trucking, and grading handled cleanly on a constrained lot, it is likely the right kind of fit.',
      },
    ],
  },

  waterdown: {
    slug: 'waterdown',
    city: 'Waterdown',
    province: 'Ontario',
    heroTitle:
      'Waterdown Excavation Contractor for New Builds, Site Prep & Trucking',
    heroDescription:
      'Bellhouse handles Waterdown excavation, site preparation, grading, dump truck hauling, material delivery, and equipment floating for new builds, subdivision lots, mixed residential work, and growing edge-of-town construction.',
    metaTitle:
      'Waterdown Excavation & New-Build Site Prep | Bellhouse',
    metaDescription:
      'Waterdown excavation contractor for new builds, lot prep, grading, hauling, and material delivery on active residential projects.',
    openGraphTitle:
      'Waterdown excavation for new builds and lot prep | Bellhouse',
    openGraphDescription:
      'Waterdown excavation and truck support for new builds, subdivision lots, and mixed residential site work where lot prep and material flow need to stay on schedule.',
    map: {
      eyebrow: 'Nearby work',
      title:
        'Waterdown jobs often sit between subdivision growth and nearby established communities.',
      description:
        'Bellhouse handles excavation, grading, hauling, and equipment movement across the region from its Paris base, supporting Waterdown work that needs new-build timing, lot prep, and material flow kept practical.',
    },
    intro: [
      'Waterdown work is often shaped by growth. New houses, additions, mixed residential construction, and edge-of-town lot prep all depend on the ground being ready before the next crew arrives and the schedule gets tighter.',
      'That creates a different kind of pressure than older in-town sites. The job usually has a little more room to move than Dundas, but it still needs excavation, trucking, imported material, and grading to land in the right order so the site stays buildable.',
      'Typical Waterdown work includes subdivision lot prep, custom-home and infill starts, foundation excavation, rough grading, service trenching, spoil haul-out, aggregate delivery, and machine moves tied to active residential construction.',
    ],
    projectTypes: [
      {
        title: 'New builds and subdivision lot starts',
        description:
          'Waterdown builds often need stripping, foundation excavation, truck access, and early grading coordinated before the next trade arrives.',
        links: [
          {
            label: 'foundation excavation',
            href: '/services/foundation-excavation',
          },
          {
            label: 'site preparation and land grading',
            href: '/services/site-preparation-land-grading',
          },
        ],
      },
      {
        title: 'Driveway base and residential access prep',
        description:
          'Driveways and access routes need gravel base, compaction, drainage, and material delivery planned around daily site traffic.',
        links: [
          {
            label: 'driveway and parking lot preparation',
            href: '/services/driveway-parking-lot-preparation',
          },
          {
            label: 'dirt and gravel delivery',
            href: '/services/dirt-gravel-delivery',
          },
        ],
      },
      {
        title: 'Lot grading and drainage corrections',
        description:
          'Rough grades, swales, and runoff control matter before yards, driveways, concrete, or landscaping lock the site into place.',
        links: [
          {
            label: 'land grading and drainage',
            href: '/services/land-grading-drainage',
          },
        ],
      },
      {
        title: 'Material movement during active construction',
        description:
          'Residential projects can stall when spoil export, imported aggregate, and truck timing are not kept close to excavation and grading.',
        links: [
          {
            label: 'dump truck rental',
            href: '/services/dump-truck-rental',
          },
          {
            label: 'dirt and gravel delivery',
            href: '/services/dirt-gravel-delivery',
          },
        ],
      },
    ],
    sectionHeadings: {
      intro: 'Site prep for growing Waterdown jobs',
      services: 'Excavation, grading, hauling, and float work in Waterdown',
      rightFit: 'Is Bellhouse the right fit for your Waterdown project?',
      howProjectsAreHandled: 'How Waterdown projects are handled',
      whoWeWorkWith: 'Who this Waterdown work is for',
      whyChoose: 'Why Waterdown jobs call Bellhouse',
      nearbyAreas: 'Nearby areas',
      faq: 'Waterdown excavation and site-prep FAQs',
      whatHappensNext: 'What happens next on a Waterdown job',
    },
    ctaTitle:
      'Get a quote for Waterdown excavation, site prep, or hauling',
    rightFitIntro:
      'Bellhouse is a fit for Waterdown jobs where a lot has to stay ready for the next phase, with excavation, trucking, grading, and imported material working together instead of showing up as separate problems.',
    rightFit: [
      'New builds, subdivision lots, custom-home starts, and mixed residential jobs that need the site ready on schedule',
      'Projects that need excavation, spoil haul-out, imported aggregate, and rough grading tied together from the start',
      'Sites with more room than tighter urban properties but no appetite for loose truck timing or unfinished working grades',
      'Builders, contractors, and owners who want a direct answer on fit before the ground work starts slowing the build down',
    ],
    howProjectsAreHandledIntro:
      'Waterdown jobs usually move best when the cut, truck cycle, imported material, and next residential step are planned around the build schedule from day one.',
    howProjectsAreHandled: [
      'Bellhouse starts with the address, scope, access, and what the next crew needs from the lot before digging starts.',
      'Excavation, haul-out, aggregate delivery, and rough grading are sequenced together so the lot stays workable for forms, utilities, concrete, and framing access.',
      'The site is shaped for the next trade, whether that means a subdivision start, a custom-home foundation, or mixed residential site work with more than one phase moving at once.',
      'If machines need to move between Waterdown and nearby jobs, float timing can stay tied to the same working schedule.',
    ],
    midPageCta: {
      title: 'Need Waterdown site prep that keeps the build moving?',
      description:
        'Send Bellhouse the lot location, the job type, and the rough timing to get a direct read on fit, access, imported material, and what should happen first.',
      supportingPoints: [
        'Strong fit for subdivision lots, new homes, mixed residential jobs, and rough grading work.',
        'Excavation, hauling, grading, and equipment movement can stay coordinated.',
        'Useful before the schedule tightens and the lot starts losing time.',
      ],
    },
    services: [
      {
        slug: 'excavation',
        title: 'Excavation for new homes, foundations, trenching, and mixed residential starts',
        description:
          'Bellhouse handles Waterdown excavation for new homes, foundations, service trenching, removals, and mixed residential starts where the cut has to be accurate enough to keep the lot moving into the next phase without rework.',
        coreServiceHref: '/services/foundation-excavation',
        image: {
          src: '/assets/foundation-excavation-machinery.jpg',
          alt: 'Excavator cutting a foundation footprint beside a new residential build.',
        },
      },
      {
        slug: 'site-preparation',
        title: 'Site preparation for subdivision lots, building areas, and clean access',
        description:
          'Waterdown site prep includes stripping, clearing, building-area setup, access shaping, and early lot work so builders and contractors can start from usable ground instead of chasing mud, poor grades, or late material movement.',
        coreServiceHref: '/services/site-preparation-land-grading',
        image: {
          src: '/assets/site-preparation-dozer-brant-county.jpg',
          alt: 'Dozer shaping stripped ground for a building area and site access.',
        },
      },
      {
        slug: 'grading',
        title: 'Grading for lot readiness, drainage, and residential working surfaces',
        description:
          'Bellhouse handles Waterdown grading for rough lot shaping, drainage control, access lanes, building pads, and working grades that need to stay practical through active residential construction and the next trade on site.',
        coreServiceHref: '/services/land-grading-drainage',
        image: {
          src: '/assets/driveway-parking-lot-construction.jpg',
          alt: 'Machine grading a driveway and access lane with compacted aggregate.',
        },
      },
      {
        slug: 'driveway-parking-lot-preparation',
        title: 'Driveway and parking lot preparation for residential access',
        description:
          'Waterdown new builds and property improvements often need gravel base, driveway access, compaction, and drainage planned before concrete, asphalt, or daily construction traffic arrives.',
        coreServiceHref: '/services/driveway-parking-lot-preparation',
        image: {
          src: '/assets/services/driveway-grading-concrete-base.webp',
          alt: 'Skid steer grading a driveway base and setting slope for drainage.',
        },
      },
      {
        slug: 'dump-truck-services',
        title: 'Dump truck hauling and material delivery for spoil, aggregate, and fill',
        description:
          'Bellhouse provides Waterdown dump truck hauling for spoil export, imported gravel, fill, and aggregate so excavation and grading can stay tied to the build schedule instead of waiting on separate truck coordination.',
        coreServiceHref: '/services/dump-truck-rental',
        image: {
          src: '/assets/dump-truck-delivery-service.jpg',
          alt: 'Tri-axle dump truck delivering gravel to an active jobsite.',
        },
      },
      {
        slug: 'equipment-floating',
        title: 'Equipment floating for excavators and heavy site machinery',
        description:
          'Equipment floating is available for excavators and heavy site machinery moving into Waterdown or between nearby jobs when the next construction phase is ready and the machine has to arrive on time.',
        coreServiceHref: '/services/heavy-equipment-hauling',
        image: {
          src: '/assets/truck-hauling-heavy-equipment.jpg',
          alt: 'Float truck hauling an excavator and site equipment to a jobsite.',
        },
      },
    ],
    whoWeWorkWithIntro:
      'This is a good fit for people who need the lot ready for the next residential step without letting truck timing, rough grades, or material delivery slow the job down.',
    whoWeWorkWith: [
      'Builders and general contractors running new builds, subdivision starts, and mixed residential work in Waterdown',
      'Custom-home and infill crews that need excavation, grading, and truck support kept on schedule',
      'Property owners preparing new homes, additions, driveway work, and drainage improvements',
      'Utility, concrete, and landscape contractors stepping into a lot that needs proper prep before their phase begins',
      'Teams moving machines between Waterdown, Dundas, Hamilton, Ancaster, and surrounding jobs',
    ],
    whyChooseIntro:
      'Waterdown jobs need lots ready for the next residential phase. Rough grades, truck timing, and imported material can slow a build quickly when they land out of order.',
    whyChoose: [
      'Bellhouse can handle excavation, haul-out, imported material, grading, and equipment movement without leaving the lot dependent on separate suppliers.',
      'Waterdown often gives more room to move than tighter residential areas, which means the work has to be efficient enough to keep up with active build schedules rather than recover from avoidable delays.',
      'New-build lots get practical decisions on sequence, truck flow, and readiness before trades stack up on unfinished ground.',
      'You get a direct answer on fit, timing, and what the lot needs first before the build starts stacking trades on unfinished ground.',
    ],
    nearbyAreas: [
      { label: 'Dundas', href: '/service-areas/dundas' },
      { label: 'Hamilton', href: '/service-areas/hamilton' },
      { label: 'Ancaster', href: '/service-areas/ancaster' },
      'Burlington',
    ],
    whatHappensNextIntro:
      'On Waterdown work, the useful first step is usually to confirm what the next crew needs and line up excavation, truck support, and rough grading around that schedule.',
    whatHappensNext: [
      'Share the address, lot type, and rough project timing.',
      'Bellhouse reviews access, spoil movement, imported material, grading, and whether excavation and trucking should be handled together.',
      'You get a direct answer on fit, likely sequence, and whether more site detail is needed for quoting.',
      'Once the plan is clear, the lot can be scheduled to stay build-ready for the next phase instead of turning into rework.',
    ],
    bottomCta: {
      title: 'Request a quote for Waterdown excavation and truck support',
      description:
        'Call, text, or request a quote if you need help with Waterdown lot prep, grading, spoil haul-out, imported material, or early access.',
      supportingPoints: [
        'Useful for new builds, subdivision lots, mixed residential work, and early site prep.',
        'Helpful before the next residential phase is waiting on rough grades.',
        'Direct answer on fit, access, and sequence.',
      ],
    },
    faqs: [
      {
        question:
          'Do you handle excavation, truck hauling, and material delivery together in Waterdown?',
        answer:
          'Yes. Bellhouse can handle Waterdown excavation, dump truck hauling, and material delivery so spoil can leave, imported gravel or fill can arrive, and the lot can stay ready for the next construction phase.',
      },
      {
        question:
          'Is Waterdown a good fit for new-build and subdivision lot work?',
        answer:
          'Yes. Waterdown is a strong fit for new homes, subdivision lot prep, custom-home starts, mixed residential construction, and grading tied to active build schedules. Bellhouse is a good fit when excavation, trucking, and rough site shaping need to keep the lot moving rather than simply open the ground and leave the rest to chance.',
      },
      {
        question:
          'Can you prepare a Waterdown lot before the foundation or utility crew arrives?',
        answer:
          'Yes. Bellhouse can prepare a Waterdown lot by stripping the site, handling excavation, hauling spoil out, importing gravel or fill, shaping the working grade, and leaving the ground ready for footings, utilities, concrete, or framing access without forcing the next crew to rework the lot first.',
      },
      {
        question: 'Who does Bellhouse typically work with on Waterdown projects?',
        answer:
          'Bellhouse works with builders, general contractors, custom-home crews, property owners, utility contractors, concrete crews, and landscape contractors in Waterdown who need excavation, grading, dump truck hauling, material delivery, or equipment floating tied to the same project schedule.',
      },
      {
        question:
          'Do you provide grading and drainage work for Waterdown lots and residential starts?',
        answer:
          'Yes. Bellhouse handles Waterdown grading for rough lot shaping, drainage control, working surfaces, access lanes, and build-ready grades that support new construction. The goal is to leave the lot practical for active residential work, not just roughly cut and left for the next crew to sort out.',
      },
      {
        question:
          'Can you move equipment into or out of Waterdown jobs when the schedule changes?',
        answer:
          'Yes. Bellhouse provides equipment floating for excavators and heavy site machinery when Waterdown projects need machines delivered, removed, or shifted between nearby jobs.',
      },
      {
        question: 'What kinds of Waterdown projects are a good fit for Bellhouse?',
        answer:
          'Good Waterdown fits include new homes, subdivision lot prep, custom-home starts, service trenching, rough grading, spoil haul-out, imported gravel or fill, driveway access work, and equipment moves tied to active residential construction. If the project depends on keeping the lot ready for the next phase, it is likely the right kind of fit.',
      },
    ],
  },
  simcoe: {
    slug: 'simcoe',
    city: 'Simcoe',
    province: 'Ontario',
    heroTitle:
      'Simcoe Excavation Contractor for Rural-Commercial Site Prep & Trucking',
    heroDescription:
      'Bellhouse handles Simcoe excavation, site preparation, grading, dump truck hauling, material delivery, and equipment floating for larger properties, rural-commercial work, and access-heavy site jobs.',
    metaTitle:
      'Simcoe Excavation & Rural-Commercial Site Prep | Bellhouse',
    metaDescription:
      'Simcoe excavation contractor for larger properties, rural site prep, grading, hauling, and material delivery where access matters.',
    openGraphTitle:
      'Simcoe excavation for larger properties and site access | Bellhouse',
    openGraphDescription:
      'Simcoe excavation and truck support for larger properties, rural-commercial work, access routes, and grading where material movement has to stay practical from the start.',
    map: {
      eyebrow: 'Nearby work',
      title:
        'Simcoe work often connects larger properties, small commercial sites, and nearby Norfolk County jobs.',
      description:
        'Bellhouse handles excavation, grading, hauling, and equipment movement across the region from its Paris base, supporting Simcoe work that depends on truck access, larger lots, and reliable material movement.',
    },
    intro: [
      'Simcoe work often starts on larger properties where access routes, stockpile space, and truck movement matter just as much as the excavation itself. The site may not be tight in the urban sense, but it still has to work cleanly for trucks, imported material, and the next phase of construction.',
      'That creates a different mix from a pure rural custom-home page or a tighter city redevelopment page. Simcoe jobs often blend rural ground conditions with commercial-style site needs such as pads, access lanes, drainage shaping, and controlled haul-out.',
      'Typical Simcoe work includes excavation for foundations and site changes, rural-commercial site prep, grading for access and drainage, spoil export, imported aggregate, and machine moves tied to active job schedules.',
    ],
    projectTypes: [
      {
        title: 'Rural-commercial pads and larger-lot prep',
        description:
          'Simcoe projects often need pads, access routes, and working ground shaped for trucks, equipment, and staged rural-commercial work.',
        links: [
          {
            label: 'site preparation and land grading',
            href: '/services/site-preparation-land-grading',
          },
          {
            label: 'land grading and drainage',
            href: '/services/land-grading-drainage',
          },
        ],
      },
      {
        title: 'Ponds, drainage, and larger-property water control',
        description:
          'Larger properties may need pond cleaning, pond excavation, drainage shaping, or access planning before the rest of the site can work properly.',
        links: [
          {
            label: 'pond digging and cleaning',
            href: '/services/pond-digging-cleaning',
          },
          {
            label: 'land grading and drainage',
            href: '/services/land-grading-drainage',
          },
        ],
      },
      {
        title: 'Material delivery and driveway access',
        description:
          'Driveways, lanes, pads, and access routes often need aggregate delivery and truck timing kept close to excavation and grading work.',
        links: [
          {
            label: 'dirt and gravel delivery',
            href: '/services/dirt-gravel-delivery',
          },
          {
            label: 'dump truck rental',
            href: '/services/dump-truck-rental',
          },
        ],
      },
      {
        title: 'Demolition cleanup before new site work',
        description:
          'Older structures, outbuildings, or cleanup areas may need demolition, haul-out, and grading coordinated before new access, pads, or excavation starts.',
        links: [
          {
            label: 'house and barn demolition',
            href: '/services/house-barn-demolition',
          },
        ],
      },
    ],
    sectionHeadings: {
      intro: 'Site work for larger lots, access routes, and material movement',
      services: 'Excavation, grading, hauling, and float work in Simcoe',
      rightFit: 'Is Bellhouse the right fit for your Simcoe project?',
      howProjectsAreHandled: 'How Simcoe projects are handled',
      whoWeWorkWith: 'Who this Simcoe work is for',
      whyChoose: 'Why Simcoe jobs call Bellhouse',
      nearbyAreas: 'Nearby areas',
      faq: 'Simcoe excavation and trucking FAQs',
      whatHappensNext: 'What happens next on a Simcoe job',
    },
    ctaTitle:
      'Get a quote for Simcoe excavation, grading, or truck support',
    rightFitIntro:
      'Bellhouse is a fit for Simcoe jobs where excavation has to work with larger properties, truck access, imported material, and practical site flow instead of being handled as an isolated dig.',
    rightFit: [
      'Rural-commercial and larger-lot jobs that need excavation, grading, haul-out, and imported material tied together',
      'Properties where access routes, lane prep, drainage, and truck movement all affect the usefulness of the site',
      'Projects that need enough room to work efficiently but still need the ground shaped properly for the next crew',
      'Owners, contractors, and builders who want a practical read on fit before the site starts moving the wrong way',
    ],
    howProjectsAreHandledIntro:
      'Simcoe jobs usually go better when the cut, truck routes, imported material, and access plan are worked through before the first cycle starts.',
    howProjectsAreHandled: [
      'Bellhouse starts with the address, access route, site use, and what the next phase needs from the ground work.',
      'Excavation, spoil haul-out, imported aggregate, and grading are sequenced together so the site stays usable instead of getting worked twice.',
      'Pads, lanes, and drainage are shaped around how trucks and crews actually need to move through the property.',
      'If equipment needs to move between Simcoe and nearby jobs, float timing can be tied into the same schedule.',
    ],
    midPageCta: {
      title: 'Need Simcoe excavation that keeps access and material flow workable?',
      description:
        'Send Bellhouse the address, project type, and rough timing to get a direct read on fit, access, truck movement, and what should happen first.',
      supportingPoints: [
        'Strong fit for larger properties, rural-commercial work, and access-heavy jobs.',
        'Excavation, hauling, grading, and equipment movement can stay coordinated.',
        'Useful before the site gets committed to the wrong access or grading plan.',
      ],
    },
    services: [
      {
        slug: 'excavation',
        title: 'Excavation for foundations, trenching, site changes, and larger-lot work',
        description:
          'Bellhouse handles Simcoe excavation for foundations, trenching, removals, site changes, and larger-lot work where grades, access, and clean spoil handling all need to stay under control from the first cut.',
        coreServiceHref: '/services/foundation-excavation',
        image: {
          src: '/assets/foundation-excavation-machinery.jpg',
          alt: 'Excavator cutting a foundation footprint beside a new residential build.',
        },
      },
      {
        slug: 'site-preparation',
        title: 'Site preparation for rural-commercial starts, pads, and access',
        description:
          'Simcoe site prep includes stripping, clearing, shaping work areas, setting practical haul access, and preparing building or equipment pads so the next phase can start without avoidable rework.',
        coreServiceHref: '/services/site-preparation-land-grading',
        image: {
          src: '/assets/site-preparation-dozer-brant-county.jpg',
          alt: 'Dozer shaping stripped ground for a building area and site access.',
        },
      },
      {
        slug: 'grading',
        title: 'Grading for drainage, lanes, pads, and usable working ground',
        description:
          'Bellhouse handles Simcoe grading for drainage control, pad work, lane construction, access routes, and stable working ground that has to stay useful for trucks, material movement, and the next crew.',
        coreServiceHref: '/services/land-grading-drainage',
        image: {
          src: '/assets/driveway-parking-lot-construction.jpg',
          alt: 'Machine grading a driveway and access lane with compacted aggregate.',
        },
      },
      {
        slug: 'pond-digging-cleaning',
        title: 'Pond digging and cleaning for rural and larger properties',
        description:
          'Simcoe-area larger properties may need pond excavation, cleaning, deepening, or shoreline reshaping coordinated with access, spoil placement, grading, and truck movement.',
        coreServiceHref: '/services/pond-digging-cleaning',
        image: {
          src: '/assets/pond-digging-cleaning-brant-county.jpg',
          alt: 'Excavator digging and shaping a pond on rural land in Brant County.',
        },
      },
      {
        slug: 'demolition',
        title: 'House and barn demolition for property cleanup',
        description:
          'Where older structures or outbuildings need to come down before new grading, pads, or access work, Bellhouse can coordinate demolition with excavation and hauling.',
        coreServiceHref: '/services/house-barn-demolition',
        image: {
          src: '/assets/demo1.jpg',
          alt: 'Bellhouse equipment handling house and barn demolition work.',
        },
      },
      {
        slug: 'dump-truck-services',
        title: 'Dump truck hauling for spoil export, aggregate supply, and site movement',
        description:
          'Bellhouse provides Simcoe dump truck hauling for spoil export, gravel and fill delivery, and material movement that keeps excavation, grading, and access work moving on one practical schedule.',
        coreServiceHref: '/services/dump-truck-rental',
        image: {
          src: '/assets/dump-truck-delivery-service.jpg',
          alt: 'Tri-axle dump truck delivering gravel to an active jobsite.',
        },
      },
      {
        slug: 'equipment-floating',
        title: 'Equipment floating for excavators and heavy site machinery',
        description:
          'Equipment floating is available to move excavators and heavy site machinery between Simcoe jobs, larger properties, and nearby county work when the next phase is ready and the schedule depends on the machine arriving on time.',
        coreServiceHref: '/services/heavy-equipment-hauling',
        image: {
          src: '/assets/truck-hauling-heavy-equipment.jpg',
          alt: 'Float truck hauling an excavator and site equipment to a jobsite.',
        },
      },
    ],
    whoWeWorkWithIntro:
      'This is a good fit for builders, contractors, and property-side teams who need the ground work to stay practical for trucks, pads, drainage, and the next stage of the job.',
    whoWeWorkWith: [
      'General contractors working on rural-commercial and larger-lot jobs around Simcoe',
      'Property owners improving access routes, drainage, trenching, pads, and building areas on larger properties',
      'Builders who need excavation, grading, dump truck support, and imported material aligned with site work',
      'Commercial and yard-focused crews preparing lanes, pads, and serviced work areas',
      'Teams moving machines between Simcoe, Paris, Woodstock, and nearby county jobs',
    ],
    whyChooseIntro:
      'Simcoe properties may have room to move, but long access routes, pads, drainage, and material travel still need to be thought through early.',
    whyChoose: [
      'Bellhouse can handle excavation, haul-out, imported material, grading, and equipment movement without splitting larger properties across suppliers.',
      'Lanes, pads, drainage, and working grades are shaped around how the property needs to function during the job, not patched in later.',
      'Simcoe work often gives more room than tighter city sites, which makes efficient truck movement and site layout more important than improvising around constraints.',
      'You get a direct answer on fit, sequence, and what the property needs first before poor material flow creates rework.',
    ],
    nearbyAreas: [
      { label: 'Paris', href: '/service-areas/paris' },
      { label: 'Brantford', href: '/service-areas/brantford' },
      { label: 'Woodstock', href: '/service-areas/woodstock' },
      'Port Dover',
    ],
    whatHappensNextIntro:
      'On Simcoe work, the useful first step is usually to line up access, truck routes, grading priorities, and imported material before the cut starts.',
    whatHappensNext: [
      'Share the site address, project type, and what part of the property has to stay workable.',
      'Bellhouse reviews access, haul-out, imported material, grading needs, and whether excavation and trucking should stay on one plan.',
      'You get a direct answer on fit, the likely order of work, and whether more site detail is needed for quoting.',
      'Once the sequence is clear, the job can be scheduled to keep trucks, materials, and the next phase moving together.',
    ],
    bottomCta: {
      title: 'Request a quote for Simcoe excavation and truck support',
      description:
        'Call, text, or request a quote if you need help with Simcoe access routes, grading, haul-out, imported material, or pad prep.',
      supportingPoints: [
        'Useful for larger properties, rural-commercial work, pads, and access routes.',
        'Helpful where truck paths and staging distance affect the job.',
        'Direct answer on fit, access, and sequence.',
      ],
    },
    faqs: [
      {
        question:
          'Do you handle excavation, trucking, and material delivery together in Simcoe?',
        answer:
          'Yes. Bellhouse can handle Simcoe excavation, dump truck hauling, and material delivery so spoil can leave and imported gravel or fill can come back in around access, stockpile space, and material flow.',
      },
      {
        question:
          'Is Simcoe a good fit for larger properties and rural-commercial site work?',
        answer:
          'Yes. Simcoe is a good fit for larger-lot excavation, rural-commercial site prep, pads, access routes, trenching, and grading where the work needs to stay practical for trucks, imported material, and the next phase of construction. Bellhouse is a better fit when the site needs to function, not just get dug out.',
      },
      {
        question:
          'Can you prepare access routes, pads, and working areas before the next crew arrives?',
        answer:
          'Yes. Bellhouse can prepare Simcoe access routes, pads, working areas, and haul lanes through stripping, excavation, grading, spoil haul-out, and imported aggregate so builders, utility crews, commercial contractors, or property-side teams are stepping into usable ground instead of reworking the site first.',
      },
      {
        question: 'Who does Bellhouse typically work with on Simcoe projects?',
        answer:
          'Bellhouse works with builders, general contractors, property owners, commercial crews, and site-side operators in Simcoe who need excavation, grading, dump truck hauling, material delivery, or equipment floating tied to the same practical schedule.',
      },
      {
        question:
          'Do you provide grading for lanes, pads, and drainage on Simcoe properties?',
        answer:
          'Yes. Bellhouse handles Simcoe grading for pads, access routes, drainage control, lane construction, and usable working surfaces that need to stay practical under truck traffic and active site use. The goal is to make the property work properly during the job, not leave that part until later cleanup.',
      },
      {
        question:
          'Can you move equipment into or out of Simcoe job sites when the schedule changes?',
        answer:
          'Yes. Bellhouse provides equipment floating for excavators and heavy site machinery when Simcoe projects need machines delivered, removed, or shifted between nearby jobs.',
      },
      {
        question: 'What kinds of Simcoe projects are a good fit for Bellhouse?',
        answer:
          'Good Simcoe fits include larger-lot excavation, rural-commercial site prep, pads, access routes, spoil haul-out, imported gravel or fill, trenching, grading, and equipment moves tied to active job schedules. If the project depends on practical truck access and reliable material movement, it is likely the right kind of fit.',
      },
    ],
  },
  woodstock: {
    slug: 'woodstock',
    city: 'Woodstock',
    province: 'Ontario',
    heroTitle:
      'Woodstock Excavation Contractor for Industrial Site Prep, Pads & Trucking',
    heroDescription:
      'Bellhouse handles Woodstock excavation, site preparation, grading, dump truck hauling, material delivery, and equipment floating for industrial, commercial, yard, and production-focused site work.',
    metaTitle:
      'Woodstock Industrial Site Prep & Excavation | Bellhouse',
    metaDescription:
      'Woodstock excavation contractor for industrial site prep, yard grading, pad construction, hauling, and material delivery.',
    openGraphDescription:
      'Woodstock excavation and trucking for industrial yards, commercial pads, haul routes, and active sites where production and material flow need to stay moving.',
    map: {
      eyebrow: 'Nearby work',
      title:
        'Woodstock jobs often connect to nearby industrial and commercial work across Oxford County and the 401 corridor.',
      description:
        'Bellhouse handles excavation, grading, hauling, and equipment movement across the region from its Paris base, supporting Woodstock work that depends on access, pads, and reliable material flow.',
    },
    intro: [
      'Woodstock work is often less about squeezing into a tight urban footprint and more about keeping larger industrial and commercial sites usable while excavation, truck cycles, and imported material keep moving.',
      'That changes the job. Yard prep, building pads, haul routes, loading areas, and drainage all have to work with the site flow instead of fighting production, deliveries, or the next phase of construction.',
      'Typical Woodstock work includes industrial and commercial site prep, yard grading, equipment pads, service trenching, spoil haul-out, imported aggregate, and machine moves tied to active site schedules.',
    ],
    sectionHeadings: {
      intro: 'Site work for pads, yards, and steady material flow',
      services: 'Excavation, grading, hauling, and float work in Woodstock',
      rightFit: 'Is Bellhouse the right fit for your Woodstock project?',
      howProjectsAreHandled: 'How Woodstock projects are handled',
      whoWeWorkWith: 'Who this Woodstock work is for',
      whyChoose: 'Why Woodstock jobs call Bellhouse',
      nearbyAreas: 'Nearby areas',
      faq: 'Woodstock excavation and trucking FAQs',
      whatHappensNext: 'What happens next on a Woodstock job',
    },
    ctaTitle:
      'Get a quote for Woodstock excavation, site prep, or truck support',
    rightFitIntro:
      'Bellhouse is a fit for Woodstock jobs where excavation has to support yard use, truck efficiency, pad construction, and material flow instead of interrupting the site every time the work changes phase.',
    rightFit: [
      'Industrial and commercial jobs that need yard prep, haul routes, pads, and working grades built for active use',
      'Projects that need excavation, spoil export, imported aggregate, and grading coordinated around site use',
      'Sites with enough room to move efficiently but still no tolerance for loose truck timing or half-finished work surfaces',
      'Owners, contractors, and facility-side teams who want a direct answer on fit before the site starts losing production time',
    ],
    howProjectsAreHandledIntro:
      'Woodstock jobs usually go better when the cut, truck flow, pad work, and imported material are planned around how the site actually operates.',
    howProjectsAreHandled: [
      'Bellhouse starts with access, yard use, truck paths, material movement, and what the next phase needs from the ground work.',
      'Excavation, haul-out, imported aggregate, and grading are sequenced together so the site stays usable instead of turning into a stop-start cleanup job.',
      'Pads, haul routes, and working surfaces are shaped for production, staging, and follow-on crews, not left loose until the end.',
      'If machines need to move between Woodstock and nearby jobs, float timing can be tied into the same schedule.',
    ],
    midPageCta: {
      title: 'Need Woodstock excavation that keeps the site moving?',
      description:
        'Send Bellhouse the address, scope, and rough timing to get a direct read on fit, truck flow, working pads, and what should happen first.',
      supportingPoints: [
        'Strong fit for industrial and commercial yards, pads, and access work.',
        'Excavation, hauling, grading, and equipment movement can stay coordinated.',
        'Useful before the site loses time to poor truck flow or rework.',
      ],
    },
    services: [
      {
        slug: 'excavation',
        title: 'Excavation for site development, trenching, foundations, and removals',
        description:
          'Bellhouse handles Woodstock excavation for industrial and commercial site development, service trenching, foundations, removals, and machine work where grades, access, and clean material handling all need to stay under control from the first cut.',
        coreServiceHref: '/services/foundation-excavation',
        image: {
          src: '/assets/foundation-excavation-machinery.jpg',
          alt: 'Excavator cutting a foundation footprint beside a new residential build.',
        },
      },
      {
        slug: 'site-preparation',
        title: 'Site preparation for yards, pads, access, and commercial starts',
        description:
          'Woodstock site prep includes stripping, clearing, shaping working areas, setting haul access, and preparing pads so builders, utility crews, and facility-side contractors can step into a site that is ready to work.',
        coreServiceHref: '/services/site-preparation-land-grading',
        image: {
          src: '/assets/site-preparation-dozer-brant-county.jpg',
          alt: 'Dozer shaping stripped ground for a building area and site access.',
        },
      },
      {
        slug: 'grading',
        title: 'Grading for yards, pads, drainage, and working surfaces',
        description:
          'Bellhouse handles Woodstock grading for yard prep, commercial pads, drainage control, haul routes, loading areas, and stable working surfaces that need to stay usable through active site work and the next stage of construction.',
        coreServiceHref: '/services/land-grading-drainage',
        image: {
          src: '/assets/driveway-parking-lot-construction.jpg',
          alt: 'Machine grading a driveway and access lane with compacted aggregate.',
        },
      },
      {
        slug: 'material-delivery',
        title: 'Dirt and gravel delivery for yards, pads, and access routes',
        description:
          'Woodstock commercial and industrial work often needs gravel, fill, aggregate, or topsoil delivered while the site is being shaped for pads, haul routes, loading areas, or drainage.',
        coreServiceHref: '/services/dirt-gravel-delivery',
        image: {
          src: '/assets/dump-truck-delivery-service.jpg',
          alt: 'Tri-axle dump truck delivering gravel to an active jobsite.',
        },
      },
      {
        slug: 'volvo-a35-off-road-dump-truck-rental',
        title: 'Volvo A35 off-road dump truck rental for larger site movement',
        description:
          'For larger Woodstock sites, the Volvo A35 can support bulk material movement across rough or active ground where production hauling needs to stay off public roads.',
        coreServiceHref: '/services/volvo-a35-off-road-dump-truck-rental',
        image: {
          src: '/assets/off-road-truck-dump-truck.jpg',
          alt: 'Volvo A35 off-road dump truck working on a large earthmoving site.',
        },
      },
      {
        slug: 'dump-truck-services',
        title: 'Dump truck hauling for spoil export, aggregate supply, and material flow',
        description:
          'Bellhouse provides Woodstock dump truck hauling for spoil export, aggregate delivery, fill placement support, and material movement that keeps excavation, grading, and yard work moving without breaking truck flow on site.',
        coreServiceHref: '/services/dump-truck-rental',
        image: {
          src: '/assets/dump-truck-delivery-service.jpg',
          alt: 'Tri-axle dump truck delivering gravel to an active jobsite.',
        },
      },
      {
        slug: 'equipment-floating',
        title: 'Equipment floating for excavators and heavy site machinery',
        description:
          'Equipment floating is available to move excavators and heavy machinery between Woodstock jobs, industrial properties, and nearby corridor work when the next phase is ready and the site depends on the machine arriving on schedule.',
        coreServiceHref: '/services/heavy-equipment-hauling',
        image: {
          src: '/assets/truck-hauling-heavy-equipment.jpg',
          alt: 'Float truck hauling an excavator and site equipment to a jobsite.',
        },
      },
    ],
    whoWeWorkWithIntro:
      'This is a good fit for contractors, builders, and operators who need the site to stay practical for trucks, pads, deliveries, and the next phase of work.',
    whoWeWorkWith: [
      'General contractors running industrial and commercial work across Woodstock',
      'Facility-side teams improving yards, pads, drainage, access roads, and service areas',
      'Builders and developers who need excavation, grading, truck support, and imported material aligned with site work',
      'Site crews preparing haul routes, loading areas, building pads, and trenching on active properties',
      'Teams moving machines between Woodstock, Ingersoll, Tillsonburg, Cambridge, and surrounding jobs',
    ],
    whyChooseIntro:
      'Woodstock work often depends on usable yards, pads, and truck routes. The dig only helps if the site can keep functioning around it.',
    whyChoose: [
      'Bellhouse can handle excavation, haul-out, imported material, grading, and equipment moves without splitting the site between suppliers.',
      'Pads, yard grades, truck routes, and loading areas are shaped around how the site needs to function during real use, not just how it looks after the last pass.',
      'Woodstock sites usually offer easier access than tighter urban work, which makes efficiency more important than improvising around constraints.',
      'You get a direct answer on fit, sequence, and what the site needs first before poor material flow starts costing time.',
    ],
    nearbyAreas: [
      { label: 'Cambridge', href: '/service-areas/cambridge' },
      { label: 'Simcoe', href: '/service-areas/simcoe' },
      'Ingersoll',
      'Tillsonburg',
    ],
    whatHappensNextIntro:
      'On Woodstock work, the useful first step is usually to line up access, truck routes, pad locations, and material movement before the site gets opened up.',
    whatHappensNext: [
      'Share the site address, project type, and what part of the property has to stay working.',
      'Bellhouse reviews access, truck flow, spoil export, imported material, and whether excavation, grading, and float work should stay on one plan.',
      'You get a direct answer on fit, the likely order of work, and whether more site detail is needed for quoting.',
      'Once the sequence is clear, the job can be scheduled to keep production, site flow, and ground work moving together.',
    ],
    bottomCta: {
      title: 'Request a quote for Woodstock excavation and truck support',
      description:
        'Call, text, or request a quote if you need help with Woodstock yard prep, pads, truck flow, grading, haul-out, or access work.',
      supportingPoints: [
        'Useful for industrial and commercial yards, pads, drainage, and access work.',
        'Helpful where working surfaces need to hold up under active site use.',
        'Direct answer on fit, access, and sequence.',
      ],
    },
    faqs: [
      {
        question:
          'Do you handle excavation, trucking, and material delivery together in Woodstock?',
        answer:
          'Yes. Bellhouse can handle Woodstock excavation, dump truck hauling, and material delivery so spoil can leave and aggregate or fill can come back in around active industrial and commercial site needs.',
      },
      {
        question:
          'Is Woodstock a good fit for industrial and commercial site prep work?',
        answer:
          'Yes. Woodstock is a strong fit for industrial and commercial site prep, yard grading, working pads, haul routes, loading areas, and trenching where the excavation has to support how the site actually operates. Bellhouse is a good fit when the work needs to stay practical for trucks, deliveries, equipment, and follow-on crews.',
      },
      {
        question:
          'Can you prepare yards, pads, and access areas before the next crew arrives?',
        answer:
          'Yes. Bellhouse can prepare Woodstock yards, building pads, access lanes, and working surfaces through stripping, excavation, rough grading, haul-out, and imported aggregate so concrete crews, utility contractors, builders, or facility-side teams are stepping into usable ground instead of reworking the site first.',
      },
      {
        question: 'Who does Bellhouse typically work with on Woodstock projects?',
        answer:
          'Bellhouse works with general contractors, builders, developers, facility-side teams, property owners, and industrial or commercial site crews in Woodstock who need excavation, grading, dump truck hauling, material delivery, or equipment floating tied to the same working schedule.',
      },
      {
        question:
          'Do you provide grading for yards, pads, and commercial drainage in Woodstock?',
        answer:
          'Yes. Bellhouse handles Woodstock grading for industrial yards, commercial pads, drainage control, haul routes, loading areas, and working surfaces that need to stay stable under truck traffic and active site use. The goal is to make the site function properly during the build, not just move dirt around once.',
      },
      {
        question:
          'Can you move equipment into or out of Woodstock job sites when timing changes?',
        answer:
          'Yes. Bellhouse provides equipment floating for excavators and heavy site machinery when Woodstock projects need machines delivered, removed, or shifted between nearby jobs.',
      },
      {
        question: 'What kinds of Woodstock projects are a good fit for Bellhouse?',
        answer:
          'Good Woodstock fits include industrial and commercial site prep, yard grading, building pads, access routes, service trenching, spoil haul-out, imported gravel or fill, drainage improvements, and equipment moves tied to active site schedules. If the project depends on truck efficiency, material flow, and usable working ground, it is likely the right kind of fit.',
      },
    ],
  },
  ancaster: {
    slug: 'ancaster',
    city: 'Ancaster',
    province: 'Ontario',
    heroTitle:
      'Ancaster Excavation Contractor for Estate Lots, Grading & Driveway Access',
    heroDescription:
      'Bellhouse handles Ancaster excavation, site preparation, grading, dump truck hauling, material delivery, and equipment floating for custom homes, estate lots, sloped sites, and driveway-heavy projects.',
    metaTitle:
      'Ancaster Estate-Lot Excavation | Bellhouse',
    metaDescription:
      'Ancaster excavation contractor for estate-lot site prep, grading, driveway access, dump truck hauling, and foundation work on sloped custom-home projects.',
    openGraphDescription:
      'Ancaster excavation and grading for estate lots, custom homes, driveway approaches, and sloped properties that need truck access and grade transitions planned properly.',
    map: {
      eyebrow: 'Nearby work',
      title:
        'A nearby page may be the better match if your lot sits just outside Ancaster.',
      description:
        'Bellhouse has handled excavation, grading, hauling, and equipment moves across the region since 1982, with one main base in Paris serving Ancaster and nearby communities.',
    },
    intro: [
      'Ancaster jobs often sit on larger lots where the building area is not flat, the driveway run is longer, and grade transitions have to be built properly instead of forced into a simple cut-and-fill plan.',
      'That changes the work. Excavation has to account for truck approach, spoil haul-out, imported stone or fill, drainage direction, and how the finished driveway and access lane will function once the build is underway.',
      'Typical Ancaster work includes foundation excavation, site prep for custom homes and additions, driveway and lane prep, drainage grading, service trenching, and machine moves tied to the build schedule.',
    ],
    sectionHeadings: {
      intro: 'Site work for slopes, access, and grade change',
      services: 'Excavation, grading, hauling, and float work in Ancaster',
      rightFit: 'Is Bellhouse the right fit for your Ancaster project?',
      howProjectsAreHandled: 'How Ancaster projects are handled',
      whoWeWorkWith: 'Who this Ancaster work is for',
      whyChoose: 'Why Ancaster jobs call Bellhouse',
      nearbyAreas: 'Nearby areas',
      faq: 'Ancaster excavation and grading FAQs',
      whatHappensNext: 'What happens next on an Ancaster job',
    },
    ctaTitle:
      'Get a quote for Ancaster excavation, grading, driveway prep, or hauling',
    rightFitIntro:
      'Bellhouse is a fit for Ancaster jobs where slope, driveway access, drainage, and truck movement all need to be planned before the ground gets opened up.',
    rightFit: [
      'Custom-home, addition, and estate-lot jobs where the building area needs more shaping than a simple subdivision site',
      'Projects that need driveway access, spoil haul-out, imported stone or fill, and grading coordinated together',
      'Properties with slope breaks, longer approaches, established surroundings, or limited tolerance for messy truck movement',
      'Owners and builders who want a practical read on fit before the lot gets committed to the wrong access or grading plan',
    ],
    howProjectsAreHandledIntro:
      'Ancaster jobs usually go best when the building area, driveway route, drainage plan, and truck access are worked through together before the cut starts.',
    howProjectsAreHandled: [
      'Bellhouse reviews the lot shape, slope changes, truck approach, and where material needs to move before the dig sequence is set.',
      'Excavation, haul-out, imported aggregate, and rough grading are timed together so the site stays usable for foundation, utility, and driveway work.',
      'Grade transitions and drainage are handled as part of the working plan, not left as cleanup after the main excavation is done.',
      'If machinery needs to move between Ancaster and nearby jobs, float timing can be tied into the same schedule.',
    ],
    midPageCta: {
      title: 'Need Ancaster excavation that accounts for slopes and access?',
      description:
        'Send Bellhouse the property location, project type, and rough timing to get a direct read on fit, driveway access, and what should be handled first.',
      supportingPoints: [
        'Strong fit for estate lots, custom homes, driveway prep, and drainage-heavy grading.',
        'Excavation, hauling, grading, and equipment movement can stay coordinated.',
        'Useful before slope and access issues get built into the wrong plan.',
      ],
    },
    services: [
      {
        slug: 'excavation',
        title:
          'Excavation for custom homes, additions, service trenches, and site changes',
        description:
          'Bellhouse handles Ancaster excavation for custom-home foundations, additions, service trenching, removals, and site changes where cuts have to stay controlled around existing landscaping, established homes, and changing elevations.',
        coreServiceHref: '/services/foundation-excavation',
        image: {
          src: '/assets/foundation-excavation-machinery.jpg',
          alt: 'Excavator cutting a foundation footprint beside a new residential build.',
        },
      },
      {
        slug: 'site-preparation',
        title: 'Site preparation for buildable ground and reliable site access',
        description:
          'Site preparation in Ancaster includes stripping, working through topsoil and fill conditions, shaping the building area, and setting practical access so crews can build without fighting the ground every day.',
        coreServiceHref: '/services/site-preparation-land-grading',
        image: {
          src: '/assets/site-preparation-dozer-brant-county.jpg',
          alt: 'Dozer shaping stripped ground for a building area and site access.',
        },
      },
      {
        slug: 'grading',
        title:
          'Grading for slope transitions, drainage control, and finished driveway access',
        description:
          'Ancaster grading often revolves around tying different elevations together properly, managing drainage around the house, and building driveway approaches and access lanes that work in wet weather and under construction traffic.',
        coreServiceHref: '/services/land-grading-drainage',
        image: {
          src: '/assets/driveway-parking-lot-construction.jpg',
          alt: 'Machine grading a driveway and access lane with compacted aggregate.',
        },
      },
      {
        slug: 'driveway-parking-lot-preparation',
        title: 'Driveway and parking lot preparation for estate-lot access',
        description:
          'Ancaster properties often need driveway approaches, gravel base, drainage, and compaction planned around slope changes before the finished surface or daily construction traffic arrives.',
        coreServiceHref: '/services/driveway-parking-lot-preparation',
        image: {
          src: '/assets/services/driveway-grading-concrete-base.webp',
          alt: 'Skid steer grading a driveway base and setting slope for drainage.',
        },
      },
      {
        slug: 'dump-truck-services',
        title:
          'Dump truck hauling and material delivery for fill, gravel, topsoil, and excavation spoil',
        description:
          'Bellhouse provides dump truck hauling and material delivery in Ancaster for spoil export, imported gravel, topsoil, fill, and aggregate so the excavation and grading plan keeps moving without waiting on separate trucking.',
        coreServiceHref: '/services/dump-truck-rental',
        image: {
          src: '/assets/dump-truck-delivery-service.jpg',
          alt: 'Tri-axle dump truck delivering gravel to an active jobsite.',
        },
      },
      {
        slug: 'equipment-floating',
        title: 'Equipment floating for excavators and heavy site machinery',
        description:
          'Equipment floating is available for excavators, skid steers, and heavy site machinery moving into Ancaster properties or between nearby jobs when the machine has to arrive exactly when the next phase is ready.',
        coreServiceHref: '/services/heavy-equipment-hauling',
        image: {
          src: '/assets/truck-hauling-heavy-equipment.jpg',
          alt: 'Float truck hauling an excavator and site equipment to a jobsite.',
        },
      },
    ],
    whoWeWorkWithIntro:
      'This is a good fit for builders, contractors, and owners who need the lot shaped properly before foundation, utility, concrete, or driveway work starts.',
    whoWeWorkWith: [
      'Custom-home builders working on Ancaster estate lots, infill homes, and larger residential additions',
      'Property owners improving site drainage, driveway access, trenching, and building areas on sloped ground',
      'General contractors who need excavation, grading, hauling, and material delivery aligned with the job',
      'Concrete, utility, and landscape contractors stepping into projects that need the site shaped properly first',
      'Crews scheduling machine transport between Ancaster, Hamilton, Dundas, Flamborough, and surrounding jobs',
    ],
    whyChooseIntro:
      'Ancaster lots need the driveway route, slope breaks, drainage, and building area read together before the site is opened up.',
    whyChoose: [
      'Bellhouse can handle the digging, haul-out, imported material, and equipment moves without splitting the lot between multiple suppliers.',
      'Grade transitions, driveway approaches, and drainage are shaped with the finished property in mind, not left as cleanup after the main excavation.',
      'Truck access, slope, and site control are treated as part of the job, not cleanup after the main excavation.',
      'You get a direct answer on fit, sequence, and what the lot needs first before the wrong cut creates rework.',
    ],
    nearbyAreas: [
      { label: 'Hamilton', href: '/service-areas/hamilton' },
      { label: 'Dundas', href: '/service-areas/dundas' },
      { label: 'Waterdown', href: '/service-areas/waterdown' },
      'Flamborough',
    ],
    whatHappensNextIntro:
      'On Ancaster work, the useful first step is usually to look at the building area, the driveway route, and the main grade transitions before the site starts getting cut up.',
    whatHappensNext: [
      'Share the property location, project type, and rough timing.',
      'Bellhouse reviews slope, driveway access, haul-out needs, and whether excavation, grading, and trucking should be handled together.',
      'You get a direct answer on fit, the likely order of work, and whether more site detail is needed for quoting.',
      'Once the sequence is clear, the job can be scheduled to keep the property usable while the build moves ahead.',
    ],
    bottomCta: {
      title: 'Request a quote for Ancaster excavation and grading',
      description:
        'Call, text, or request a quote if you need help with Ancaster driveway access, grade changes, drainage, haul-out, or site prep.',
      supportingPoints: [
        'Useful for estate lots, custom homes, driveway prep, and drainage work.',
        'Helpful before slope and access issues get built into the wrong plan.',
        'Direct answer on fit, access, and sequence.',
      ],
    },
    faqs: [
      {
        question:
          'Do you handle excavation, truck hauling, and material delivery together in Ancaster?',
        answer:
          'Yes. Bellhouse can handle Ancaster excavation, dump truck hauling, and material delivery so foundation digging, spoil removal, imported gravel or fill, and rough grading fit the same estate-lot conditions.',
      },
      {
        question:
          'Is Ancaster site work often different from a tighter in-town construction site?',
        answer:
          'Usually, yes. Ancaster excavation and grading often deal with longer driveways, larger building envelopes, slope breaks, drainage direction, and more room for trucks to move through the property. The challenge is less about squeezing into a tight footprint and more about shaping the lot properly so access, drainage, and grade transitions keep working after the build moves ahead.',
      },
      {
        question:
          'Can you prepare an Ancaster estate lot or custom-home site before the foundation crew arrives?',
        answer:
          'Yes. Bellhouse can prepare an Ancaster estate lot or custom-home site by stripping topsoil, excavating the foundation area, building working access, hauling spoil out, bringing stone or fill back in, and rough grading the site so the foundation, utility, concrete, or driveway crew is stepping into usable ground instead of reworking the lot first.',
      },
      {
        question: 'Who does Bellhouse typically work with on Ancaster projects?',
        answer:
          'Bellhouse works with custom-home builders, general contractors, concrete crews, utility contractors, and property owners in Ancaster who need excavation, site prep, grading, dump truck hauling, material delivery, or equipment floating tied to the same custom-build or estate-lot schedule.',
      },
      {
        question:
          'Do you provide grading and drainage work on sloped Ancaster properties?',
        answer:
          'Yes. Bellhouse handles Ancaster grading for slope transitions, drainage control, driveway approaches, building pads, and usable access lanes on sloped properties. The goal is not just to move dirt, but to make sure runoff, driveway pitch, and finished grades work together once the house, garage, or addition is in place.',
      },
      {
        question:
          'Can you move equipment into or out of Ancaster job sites when the schedule changes?',
        answer:
          'Yes. Bellhouse provides equipment floating for excavators, skid steers, and heavy site machinery when Ancaster projects need machines delivered, removed, or shifted between nearby jobs.',
      },
      {
        question: 'What kinds of Ancaster projects are a good fit for Bellhouse?',
        answer:
          'Good Ancaster fits include custom-home foundations, estate-lot site prep, driveway and lane construction, drainage grading, service trenching, spoil haul-out, imported gravel or fill, and equipment moves tied to active residential construction. If the project needs excavation, grading, trucking, and access planning to work together, it is likely the right kind of fit.',
      },
    ],
  },
} satisfies Record<string, ServiceAreaPage>;

export const serviceAreaPages = applyServiceAreaImages(baseServiceAreaPages);

export type ServiceAreaSlug = keyof typeof serviceAreaPages;

export const serviceAreaPageList: ServiceAreaPage[] =
  Object.values(serviceAreaPages);

export function getServiceAreaPage(slug: string): ServiceAreaPage | undefined {
  return serviceAreaPages[slug as ServiceAreaSlug];
}

export function getServiceAreaMetadata(page: ServiceAreaPage, baseUrl: string) {
  const canonicalUrl = `${baseUrl}/service-areas/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.openGraphTitle ?? page.metaTitle,
      description: page.openGraphDescription ?? page.metaDescription,
      url: canonicalUrl,
      siteName: 'Bellhouse Excavating',
      type: 'website' as const,
    },
  };
}

export function getServiceAreaServicePath(
  serviceAreaSlug: ServiceAreaSlug,
  serviceSlug: ServiceAreaServiceSlug,
) {
  return `/service-areas/${serviceAreaSlug}/${serviceSlug}`;
}

export function getServiceAreaService(
  serviceAreaSlug: ServiceAreaSlug,
  serviceSlug: ServiceAreaServiceSlug,
) {
  const page = serviceAreaPages[serviceAreaSlug];

  return page?.services.find((service) => service.slug === serviceSlug);
}






