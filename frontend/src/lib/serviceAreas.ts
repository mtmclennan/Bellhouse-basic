export type ServiceAreaImage = {
  src: string;
  alt: string;
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

export type ServiceAreaSectionHeadings = {
  intro?: string;
  services?: string;
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

export const serviceAreaPages = {
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
      intro: 'How Bellhouse supports Brantford site work',
      services:
        'Brantford excavation and trucking services Bellhouse coordinates in-house',
      rightFit: 'Is Bellhouse the right fit for your Brantford project?',
      howProjectsAreHandled: 'How Brantford projects are handled',
      whoWeWorkWith: 'Brantford clients and crews Bellhouse typically supports',
      whyChoose:
        'Why Brantford builders call Bellhouse when timing and access matter',
      nearbyAreas: 'Connected service areas near Brantford',
      faq: 'Brantford excavation and hauling FAQs',
      whatHappensNext: 'What happens next on a Brantford job',
    },
    ctaTitle: 'Get a quote for Brantford excavation and hauling',
    rightFitIntro:
      'Bellhouse is a fit when the job needs excavation, grading, trucks, and machine timing kept under one working plan instead of split across separate suppliers.',
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
        'Excavation, grading, hauling, and float service can stay under one plan.',
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
        coreServiceHref: '/services/site-preparation-land-grading',
        image: {
          src: '/assets/driveway-parking-lot-construction.jpg',
          alt: 'Machine grading a driveway and access lane with compacted aggregate.',
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
      'General contractors who need excavation, grading, and dump truck support kept under one schedule',
      'Commercial and industrial site crews preparing pads, access, and service trenches',
      'Property owners handling drainage corrections, driveway builds, lot cleanup, or yard regrading',
      'Contractors who need machines floated between Brantford jobs without arranging separate transport',
    ],
    whyChooseIntro:
      'The main benefit is less schedule chasing. Bellhouse keeps the dig, truck work, material delivery, and machine timing tied to the same job instead of leaving the site to coordinate all of it.',
    whyChoose: [
      'One point of coordination for excavation, grading, truck hauling, material delivery, and equipment moves instead of several calls to keep the job moving.',
      'Cleaner handoff to the next trade because the cut, haul-out, and imported material are planned together.',
      'Useful on Brantford sites where tighter access and active streets make late trucks or missed deliveries expensive fast.',
      'Direct communication about fit, timing, and what the site actually needs next.',
    ],
    nearbyAreas: [
      { label: 'Paris', href: '/service-areas/paris' },
      'St. George',
      'Burford',
      { label: 'Hamilton', href: '/service-areas/hamilton' },
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
      title: 'Talk through your Brantford job before the schedule tightens',
      description:
        'If the site needs digging, grading, haul-out, and imported material timed together, Bellhouse can tell you quickly whether the job fits and how to move it forward.',
      supportingPoints: [
        'Useful for builder-led starts, access work, and redevelopment parcels.',
        'Straight answer on scope, timing, and the next step.',
        'Ground work, trucking, and equipment moves can stay on one schedule.',
      ],
    },
    faqs: [
      {
        question:
          'Do you handle both excavation and dump truck hauling on Brantford jobs?',
        answer:
          'Yes. Bellhouse handles the excavation work and the truck support that goes with it. That includes hauling spoil away, bringing in gravel or fill, and keeping the job moving without relying on a separate trucking schedule.',
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
          'Yes. Bellhouse can coordinate spoil export and imported gravel, fill, or aggregate on the same Brantford job so the site is not left waiting on separate truck schedules between phases.',
      },
      {
        question: 'Can you move equipment between Brantford job sites?',
        answer:
          'Yes. Bellhouse offers equipment floating for excavators and other heavy equipment when machines need to be moved between sites or brought in for a scheduled phase of work.',
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
      'Work in and around Paris often means starting on rural lots where the grades are not simple, the driveway route is longer, and the building area needs more shaping before the site is truly ready. On those jobs, drainage, access, and material movement all affect the excavation plan from day one.',
      'Bellhouse supports Paris and Brant County projects with excavation, site preparation, grading, dump truck hauling, material delivery, and equipment floating handled together. That is useful on custom builds and property-specific work where spoil has to leave cleanly, imported gravel or fill has to come in at the right time, and the access route needs to keep working as the build moves forward.',
      'Typical Paris work includes foundation digs, drainage corrections, driveway and lane prep, service trenching, grading around new homes and outbuildings, and machine moves tied to rural construction schedules.',
    ],
    sectionHeadings: {
      intro: 'Excavation and trucking context for Paris-area projects',
      services:
        'Paris excavation, grading, and hauling work Bellhouse handles directly',
      rightFit: 'Is Bellhouse the right fit for your Paris project?',
      howProjectsAreHandled: 'How Paris projects are handled',
      whoWeWorkWith: 'Paris-area projects Bellhouse is commonly brought into',
      whyChoose: 'Why Paris and Brant County jobs use Bellhouse',
      nearbyAreas: 'Nearby Bellhouse service areas around Paris',
      faq: 'Paris excavation and site-prep FAQs',
      whatHappensNext: 'What happens next on a Paris-area job',
    },
    ctaTitle: 'Get a quote for Paris excavation and trucking',
    rightFitIntro:
      'Bellhouse is a fit for Paris jobs where uneven grades, drainage, access, and material movement all affect the excavation plan from the start.',
    rightFit: [
      'Custom-home builds, additions, shops, and outbuildings on rural or edge-of-town properties',
      'Lots where driveway access, grade transitions, and truck movement need to work through the whole build',
      'Projects that need excavation, rough grading, spoil haul-out, and imported fill or gravel coordinated together',
      'Owners and builders who want practical site advice instead of generic sales language',
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
        coreServiceHref: '/services/site-preparation-land-grading',
        image: {
          src: '/assets/driveway-parking-lot-construction.jpg',
          alt: 'Machine grading a driveway and access lane with compacted aggregate.',
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
      'Paris jobs usually bring Bellhouse in when the lot is more demanding than a simple subdivision dig and the site needs to function through the whole build.',
    whoWeWorkWith: [
      'Custom-home builders working on rural and edge-of-town properties around Paris',
      'Contractors who need excavation, grading, and truck support kept under one schedule',
      'Property owners improving land with drainage work, driveway access, trenching, or new construction',
      'Crews building shops, garages, outbuildings, and serviced pads on larger properties',
      'Teams moving machines between Paris, Brantford, St. George, and surrounding jobs',
    ],
    whyChooseIntro:
      'The value on Paris work is not just that Bellhouse can dig. It is that the crew can help keep the lot usable, the drainage practical, and the truck movement controlled while the build moves ahead.',
    whyChoose: [
      'One crew can handle excavation, grading, haul-out, material delivery, and float timing instead of leaving the builder to piece those scopes together.',
      'Better control over rural access, driveway approaches, and grade transitions that affect every truck and every next trade.',
      'Drainage-focused grading stays tied to the excavation plan instead of being patched in later.',
      'Direct communication about fit, timing, and what the ground actually needs before more work starts.',
    ],
    nearbyAreas: [
      { label: 'Brantford', href: '/service-areas/brantford' },
      'St. George',
      'Ayr',
      'Burford',
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
      title: 'Talk through your Paris lot before access or drainage becomes a problem',
      description:
        'Bellhouse can help judge the fit, sequence, and truck needs for Paris excavation and grading work before the site gets boxed into a bad plan.',
      supportingPoints: [
        'Useful for rural lots, custom homes, driveway prep, and drainage-heavy work.',
        'Direct answer on what to handle first and what can wait.',
        'Ground work, trucking, and equipment moves can stay under one schedule.',
      ],
    },
    faqs: [
      {
        question: 'Do you handle both excavation and trucking in Paris?',
        answer:
          'Yes. Bellhouse manages excavation, dump truck hauling, and material delivery together in Paris so spoil can leave, aggregate can come back in, and the site can keep moving on one schedule.',
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
          'Yes. Bellhouse provides equipment floating to move excavators and other machinery between Paris-area sites or bring equipment in when the next phase is ready.',
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
      'Hamilton excavation work is often tied to redevelopment schedules, active commercial properties, and urban sites where crews are stacked tightly and delays spread fast. Once the dig starts, haul-out, imported material, and machine timing all have to keep pace with the broader job schedule.',
      'Bellhouse supports Hamilton builders, contractors, developers, and site managers who need excavation, site preparation, grading, dump truck hauling, material delivery, and equipment floating handled together. That is especially useful on infill builds, commercial upgrades, logistics yards, industrial improvements, and redevelopment parcels where access windows are short and the next trade is already booked.',
      'The practical job is to cut accurately, move spoil out without clogging the site, bring the next load in when the grade is ready, and leave the work area stable for utilities, concrete, paving prep, or the next subcontractor.',
    ],
    sectionHeadings: {
      intro: 'What Hamilton excavation projects usually demand',
      services:
        'Hamilton excavation and hauling services Bellhouse can coordinate on one schedule',
      rightFit: 'Is Bellhouse the right fit for your Hamilton project?',
      howProjectsAreHandled: 'How Hamilton projects are handled',
      whoWeWorkWith:
        'Hamilton contractors, developers, and owners Bellhouse works with',
      whyChoose:
        'Why Hamilton jobs rely on Bellhouse for excavation and trucking',
      nearbyAreas: 'Connected Bellhouse service areas near Hamilton',
      faq: 'Hamilton excavation and dump truck FAQs',
      whatHappensNext: 'What happens next on a Hamilton job',
    },
    ctaTitle: 'Get a quote for Hamilton excavation and truck support',
    rightFitIntro:
      'Bellhouse is a fit for Hamilton work where schedule pressure, redevelopment conditions, and truck logistics all matter as much as the dig itself.',
    rightFit: [
      'Redevelopment, infill, commercial, industrial, and logistics-style jobs where crews overlap and access windows are short',
      'Projects that need excavation, haul-out, imported aggregate, and grading coordinated tightly instead of handed to separate suppliers',
      'Sites that stay active while the work is underway and cannot afford loose sequencing or late truck cycles',
      'Contractors and owners who need a direct answer on fit and timing, not vague availability language',
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
        coreServiceHref: '/services/site-preparation-land-grading',
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
      'Bellhouse is commonly brought into Hamilton work where the site has to keep moving and the excavation scope cannot be separated cleanly from truck timing and material flow.',
    whoWeWorkWith: [
      'General contractors managing infill builds and redevelopment work across Hamilton neighbourhoods',
      'Developers coordinating phased commercial, industrial, logistics, or mixed-use site activity',
      'Builders who need excavation, haul-out, imported material, and machine timing aligned with tighter schedules',
      'Property and site managers upgrading yards, drainage, loading areas, access routes, and service spaces',
      'Crews requiring machines floated between Hamilton, Ancaster, Dundas, Stoney Creek, and surrounding jobs',
    ],
    whyChooseIntro:
      'The benefit on Hamilton jobs is tighter control. Bellhouse helps keep truck movement, digging, grading, and machine timing from working against the rest of the site schedule.',
    whyChoose: [
      'One crew can coordinate excavation, grading, haul-out, imported material, and equipment moves instead of forcing the site to manage those scopes separately.',
      'Better fit for redevelopment and commercial logistics where access windows are short and site turnover matters.',
      'Cleaner scheduling for trucks, staging, and next-trade handoff so the job keeps moving instead of waiting on one missed piece.',
      'Direct communication about fit, timing, and whether the work should be staged differently before it starts.',
    ],
    nearbyAreas: [
      { label: 'Ancaster', href: '/service-areas/ancaster' },
      'Dundas',
      'Stoney Creek',
      'Binbrook',
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
      title: 'Talk through your Hamilton schedule before the site gets pinched',
      description:
        'Bellhouse can help judge whether the job needs excavation, truck support, grading, and equipment movement handled under one tighter working plan.',
      supportingPoints: [
        'Useful for redevelopment, commercial, industrial, and infill work.',
        'Direct answer on fit, timing, and the next step.',
        'Built around real logistics pressure, not generic service copy.',
      ],
    },
    faqs: [
      {
        question:
          'Do you handle both excavation and dump truck hauling in Hamilton?',
        answer:
          'Yes. Bellhouse handles excavation and dump truck hauling together on Hamilton jobs, including spoil export, imported aggregate, and the truck timing needed to keep redevelopment and commercial schedules moving.',
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
          'Yes. Bellhouse provides float service for excavators and other site equipment when Hamilton jobs need machines delivered, removed, or shifted between active redevelopment, commercial, or industrial projects.',
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
      'Bellhouse supports Cambridge contractors and property owners by handling excavation, site preparation, rough grading, dump truck hauling, material delivery, and equipment floating as one coordinated scope. That helps keep imported material, spoil removal, access routes, and machine timing aligned on jobs that move through multiple stages of work.',
      'The practical focus is site flow: get the cut right, keep pads and haul routes usable, move material without bottlenecks, and leave the next crew a site that is ready to keep building.',
    ],
    sectionHeadings: {
      intro:
        'How Cambridge projects benefit from coordinated excavation and trucking',
      services:
        'Cambridge site work and hauling services Bellhouse can keep under one schedule',
      rightFit: 'Is Bellhouse the right fit for your Cambridge project?',
      howProjectsAreHandled: 'How Cambridge projects are handled',
      whoWeWorkWith: 'Cambridge-area clients Bellhouse typically supports',
      whyChoose:
        'Why Cambridge jobs use Bellhouse for excavation, grading, and hauling',
      nearbyAreas:
        'Nearby Bellhouse service areas connected to Cambridge work',
      faq: 'Cambridge excavation and trucking FAQs',
      whatHappensNext: 'What happens next on a Cambridge job',
    },
    ctaTitle: 'Get a quote for Cambridge excavation and truck support',
    rightFitIntro:
      'Bellhouse is a fit for Cambridge jobs where excavation has to keep pace with an active site instead of stopping the flow of crews, trucks, and materials.',
    rightFit: [
      'Residential, commercial, and industrial jobs that stay active while work moves through stages',
      'Projects that need excavation, grading, spoil export, imported aggregate, and float timing aligned on one plan',
      'Sites where haul routes, work pads, and staging areas need to stay functional during the build',
      'Builders, developers, and facility-side clients who want direct guidance on fit and sequencing',
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
      },
      {
        slug: 'site-preparation',
        title: 'Site preparation for active construction and staged builds',
        description:
          'Site prep includes stripping, clearing, shaping pads, organizing work areas, and preparing haul access so forming crews, underground trades, and follow-on contractors can move through the site without rework or bottlenecks.',
        coreServiceHref: '/services/site-preparation-land-grading',
      },
      {
        slug: 'grading',
        title: 'Grading for drainage, pads, and functional work surfaces',
        description:
          'Cambridge grading work supports drainage, pad elevations, yard shaping, haul routes, and stable working surfaces for projects that need to stay productive through multiple build stages.',
        coreServiceHref: '/services/site-preparation-land-grading',
      },
      {
        slug: 'dump-truck-services',
        title: 'Dump truck hauling for material movement and supply',
        description:
          'Bellhouse provides Cambridge dump truck hauling for spoil export, aggregate delivery, fill placement support, and material movement that keeps excavation, grading, and the overall site flow from stalling.',
        coreServiceHref: '/services/dump-truck-rental',
      },
      {
        slug: 'equipment-floating',
        title: 'Equipment floating for excavators and heavy machinery',
        description:
          'Equipment floating is available to move excavators and heavy machinery between Cambridge sites, industrial properties, and surrounding Waterloo Region jobs when the next phase is ready and the site flow depends on the machine being there on time.',
        coreServiceHref: '/services/heavy-equipment-hauling',
      },
    ],
    whoWeWorkWithIntro:
      'Bellhouse is usually brought into Cambridge work when the site is already moving and the excavation scope has to support that flow instead of disrupting it.',
    whoWeWorkWith: [
      'General contractors running residential, commercial, and industrial jobs across Cambridge',
      'Builders who need excavation, trucking, grading, and material flow aligned across staged lot or building sequences',
      'Developers coordinating spoil removal, imported aggregate, and machine movement across multiple phases',
      'Property owners and facility managers improving yards, drainage, access roads, serviced building areas, and industrial work zones',
      'Crews moving equipment between Cambridge, Kitchener, Ayr, and surrounding jobs',
    ],
    whyChooseIntro:
      'The benefit on Cambridge jobs is steadier site flow. Bellhouse helps keep the cut, truck movement, material delivery, and next-trade handoff tied together so one missed piece does not stall the rest of the work.',
    whyChoose: [
      'One crew can coordinate excavation, grading, haul-out, material delivery, and equipment moves instead of forcing the site to manage those scopes separately.',
      'Better control over active haul routes, work pads, and staging areas that need to stay usable through multiple phases.',
      'Material leaves and arrives when the job can use it, which reduces bottlenecks on mixed-use active sites.',
      'Direct communication about fit, timing, and how to keep the next step moving.',
    ],
    nearbyAreas: [
      'Kitchener',
      'Ayr',
      { label: 'Paris', href: '/service-areas/paris' },
      'Puslinch',
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
      title: 'Talk through your Cambridge site before flow turns into friction',
      description:
        'Bellhouse can help judge whether the job needs excavation, grading, trucking, and machine movement handled as one coordinated working sequence.',
      supportingPoints: [
        'Useful for active residential, commercial, and industrial sites.',
        'Direct answer on fit, sequence, and the next step.',
        'Built around active site flow, not generic excavation copy.',
      ],
    },
    faqs: [
      {
        question:
          'Do you handle both excavation and dump truck hauling in Cambridge?',
        answer:
          'Yes. Bellhouse handles Cambridge excavation and dump truck hauling together so spoil can be exported and gravel, fill, or aggregate can be delivered on the same project schedule without breaking site flow.',
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
          'Yes. Bellhouse provides float service to move excavators and other heavy machinery between Cambridge jobs or bring equipment into staged work when the next phase is ready to keep moving.',
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
  ancaster: {
    slug: 'ancaster',
    city: 'Ancaster',
    province: 'Ontario',
    heroTitle:
      'Ancaster Excavation Contractor for Estate Lots, Grading & Driveway Access',
    heroDescription:
      'Bellhouse supports Ancaster projects with excavation, site preparation, grading, dump truck hauling, material delivery, and equipment floating for custom homes, estate lots, sloped sites, and property-specific construction work.',
    metaTitle:
      'Ancaster Estate-Lot Excavation | Bellhouse',
    metaDescription:
      'Ancaster excavation contractor for estate-lot site prep, grading, driveway access, dump truck hauling, and foundation work on sloped custom-home projects.',
    openGraphDescription:
      'Ancaster excavation and grading for estate lots, custom homes, driveway approaches, and sloped properties that need truck access and grade transitions planned properly.',
    map: {
      eyebrow: 'Coverage around Ancaster',
      title:
        'Ancaster jobs often combine estate-lot access, slope changes, and driveway work that has to function long after the dig is done.',
      description:
        'Bellhouse supports Ancaster projects where excavation, grading, truck hauling, material delivery, and equipment movement have to stay coordinated across larger lots and nearby Hamilton-area work.',
    },
    intro: [
      'Ancaster work often happens on larger properties where the site is not flat, the driveway run is longer, and the building area has to be shaped through real grade transitions instead of simple subdivision conditions. On those jobs, excavation is tied closely to how trucks enter the site, where material is staged, and how the finished access will actually work.',
      'Bellhouse supports Ancaster custom-home and estate-lot projects with excavation, site preparation, grading, dump truck hauling, material delivery, and equipment floating handled as one coordinated scope. That matters when spoil has to move out cleanly, imported stone or fill has to come back in on time, and the site needs to stay usable for foundation crews, concrete, utilities, and driveway prep.',
      'Typical Ancaster work includes foundation excavation, driveway and lane preparation, pad construction for garages or outbuildings, drainage grading around existing homes, service trenching, and machine moves tied to the build schedule.',
    ],
    sectionHeadings: {
      intro: 'What Ancaster estate-lot and custom-home site work usually requires',
      services:
        'Ancaster excavation, grading, hauling, and float services Bellhouse coordinates',
      rightFit: 'Is Bellhouse the right fit for your Ancaster project?',
      howProjectsAreHandled: 'How Ancaster projects are handled',
      whoWeWorkWith:
        'Ancaster clients and crews Bellhouse commonly supports on site-work-heavy projects',
      whyChoose:
        'Why Ancaster projects use Bellhouse for excavation, grading, and truck support',
      nearbyAreas: 'Nearby Bellhouse service areas connected to Ancaster jobs',
      faq: 'Ancaster excavation and hauling FAQs',
      whatHappensNext: 'What happens next on an Ancaster job',
    },
    ctaTitle:
      'Get a quote for Ancaster excavation, grading, driveway prep, or hauling',
    rightFitIntro:
      'Bellhouse is a fit for Ancaster work where estate-lot access, slope changes, driveway runs, and grade transitions all shape how the excavation needs to be handled.',
    rightFit: [
      'Custom-home, addition, and estate-lot jobs where the building area needs more shaping than a simple subdivision site',
      'Projects that need driveway access, spoil haul-out, imported stone or fill, and grading coordinated together',
      'Properties with slope breaks, longer approaches, established surroundings, or limited tolerance for messy truck movement',
      'Owners and builders who want a practical read on fit before committing the site to the wrong access or grading plan',
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
        coreServiceHref: '/services/site-preparation-land-grading',
        image: {
          src: '/assets/driveway-parking-lot-construction.jpg',
          alt: 'Machine grading a driveway and access lane with compacted aggregate.',
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
      'Bellhouse is usually brought into Ancaster work when the lot has more slope, more access planning, and more grade work than a standard in-town site.',
    whoWeWorkWith: [
      'Custom-home builders working on Ancaster estate lots, infill homes, and larger residential additions',
      'Property owners improving site drainage, driveway access, trenching, and building areas on sloped ground',
      'General contractors who need excavation, grading, hauling, and material delivery kept under one schedule',
      'Concrete, utility, and landscape contractors stepping into projects that need the site shaped properly first',
      'Crews scheduling machine transport between Ancaster, Hamilton, Dundas, Mount Hope, and surrounding jobs',
    ],
    whyChooseIntro:
      'The benefit on Ancaster work is better control over slope, access, and the transition from rough site work to the next phase of the build.',
    whyChoose: [
      'One crew can coordinate excavation, grading, haul-out, material delivery, and equipment movement instead of leaving the builder to tie those scopes together.',
      'Better handling of driveway approaches, grade breaks, and drainage shaping that affect how the property works long after the dig is finished.',
      'Useful on larger or more established lots where sloppy truck movement and loose grading create problems fast.',
      'Direct communication about fit, timing, and what the site needs before more work starts.',
    ],
    nearbyAreas: [
      { label: 'Hamilton', href: '/service-areas/hamilton' },
      'Dundas',
      'Mount Hope',
      'Binbrook',
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
      title: 'Talk through your Ancaster lot before slope and access create rework',
      description:
        'Bellhouse can help judge the fit, sequence, and truck needs for Ancaster excavation and grading work before the site gets committed to the wrong plan.',
      supportingPoints: [
        'Useful for estate lots, custom homes, driveway prep, and drainage work.',
        'Direct answer on fit, sequence, and the next step.',
        'Ground work, hauling, and equipment movement can stay on one schedule.',
      ],
    },
    faqs: [
      {
        question:
          'Do you handle excavation, truck hauling, and material delivery together in Ancaster?',
        answer:
          'Yes. Bellhouse handles Ancaster excavation together with dump truck hauling and material delivery so spoil can leave, stone or fill can come back in, and the site can keep moving without relying on separate trucking schedules.',
      },
      {
        question:
          'Is Ancaster site work often different from a tighter in-town construction site?',
        answer:
          'Yes. Ancaster work often involves longer approaches, more grade change, larger building envelopes, and more room to shape access and drainage. That is different from tighter in-town jobs where the main challenge is working inside smaller urban footprints.',
      },
      {
        question:
          'Can you prepare an Ancaster estate lot or custom-home site before the foundation crew arrives?',
        answer:
          'Yes. Bellhouse prepares Ancaster estate-lot and custom-home sites for the next phase by stripping, excavating, rough grading, organizing truck access, and leaving the site ready for foundation, concrete, utility, or driveway work.',
      },
      {
        question: 'Who does Bellhouse typically work with on Ancaster projects?',
        answer:
          'Bellhouse works with custom-home builders, contractors, and property owners in Ancaster who need excavation, grading, truck support, material delivery, or equipment movement tied to estate-lot and custom-build site work.',
      },
      {
        question:
          'Do you provide grading and drainage work on sloped Ancaster properties?',
        answer:
          'Yes. Bellhouse handles grading for slope transitions, drainage control, driveway approaches, and usable site access on Ancaster properties where elevation changes affect how the whole project functions.',
      },
      {
        question:
          'Can you move equipment into or out of Ancaster job sites when the schedule changes?',
        answer:
          'Yes. Bellhouse provides equipment floating for excavators and heavy site machinery when Ancaster projects need machines delivered, removed, or shifted between nearby jobs to match the construction schedule.',
      },
      {
        question: 'What kinds of Ancaster projects are a good fit for Bellhouse?',
        answer:
          'Good fits include custom-home foundations, estate-lot site prep, driveway and access work, grading across slope changes, drainage improvements, trenching, dump truck hauling, material delivery, and machine moves tied to active construction schedules.',
      },
    ],
  },
} satisfies Record<string, ServiceAreaPage>;

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

