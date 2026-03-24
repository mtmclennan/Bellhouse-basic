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

export type ServiceAreaPage = {
  slug: string;
  city: string;
  province: string;
  heroTitle: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  heroImage?: ServiceAreaImage;
  introImage?: ServiceAreaImage;
  ctaImage?: ServiceAreaImage;
  map?: ServiceAreaMap;
  intro: string[];
  services: ServiceAreaService[];
  whoWeWorkWith: string[];
  whyChoose: string[];
  nearbyAreas: string[];
  faqs: ServiceAreaFaq[];
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
      'Brantford Excavation Contractor, Grading & Hauling | Bellhouse Excavating',
    metaDescription:
      'Excavation contractor services in Brantford including site preparation, foundation excavation, grading, dump truck hauling, material delivery, and equipment floating.',
    heroImage: {
      src: '/assets/excavator-loading-tri-axle-foundation.jpg',
      alt: 'Excavator loading a tri-axle dump truck on an active Brantford construction site.',
    },
    introImage: {
      src: '/assets/grading-driveway-laser-level.jpg',
      alt: 'Grading and laser level work preparing a site surface for the next construction phase.',
    },
    ctaImage: {
      src: '/assets/truck-hauling-heavy-equipment.jpg',
      alt: 'Bellhouse float truck moving heavy equipment to a job site.',
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
    services: [
      {
        slug: 'excavation',
        title: 'Excavation for foundations, additions, trenching, and removals',
        description:
          'Bellhouse handles excavation for new home foundations, garage and shop additions, trenching for site services, small demolition removals, and general machine work where grades and spoil handling need to stay controlled from the first cut.',
        coreServiceHref: '/services/foundation-excavation',
        image: {
          src: '/assets/foundation-excavation-machinery.jpg',
          alt: 'Excavator digging for foundation work on a residential construction site.',
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
          alt: 'Dozer shaping a site and preparing ground for construction.',
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
          alt: 'Machine grading and finishing a driveway and access surface.',
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
          alt: 'Tri-axle dump truck delivering gravel and aggregate to a site.',
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
          alt: 'Float truck carrying heavy construction equipment to a job site.',
        },
      },
    ],
    whoWeWorkWith: [
      'Home builders starting foundations, garages, and additions in Brantford neighbourhoods and edge-of-city lots',
      'General contractors who need excavation, grading, and dump truck support kept under one schedule',
      'Commercial and industrial site crews preparing pads, access, and service trenches',
      'Property owners handling drainage corrections, driveway builds, lot cleanup, or yard regrading',
      'Contractors who need machines floated between Brantford jobs without arranging separate transport',
    ],
    whyChoose: [
      'Bellhouse can dig, grade, haul, and move equipment as one sequence, which helps Brantford jobs stay on schedule when trucks, machine time, and follow-on trades all need to line up.',
      'The crew works in the kind of conditions common around Brantford: active streets, tighter lot access, mixed urban and rural work, and jobs where material has to move cleanly in both directions.',
      'Builders and property owners do not have to separate foundation excavation, rough grading, spoil removal, and imported aggregate into disconnected scopes.',
      'The work stays grounded in actual site tasks: cut to grade, load out the excess, bring in the right material, shape the site properly, and move equipment when the schedule requires it.',
    ],
    nearbyAreas: ['Paris', 'St. George', 'Burford', 'Hamilton', 'Brant County'],
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
      'Paris Ontario Excavation Contractor & Hauling | Bellhouse Excavating',
    metaDescription:
      'Excavation, grading, site prep, and dump truck services in Paris, Ontario. Foundation digging, material delivery, and equipment floating for local projects.',
    intro: [
      'Work in and around Paris often means dealing with uneven ground, rural lots, and sites where access is not as straightforward as a subdivision build. Excavation and trucking have to stay coordinated or the job slows down quickly.',
      'Bellhouse supports projects throughout Paris and Brant County with excavation, grading, site preparation, and dump truck hauling handled under one schedule. That means material is moved when it needs to be, and the site is ready for the next phase without delays.',
      'Whether it is a new build, a shop pad, drainage correction, or a property improvement project, the work is focused on getting the site cut, shaped, and ready without overcomplicating the process.',
    ],
    services: [
      {
        slug: 'excavation',
        title: 'Excavation for foundations, additions, trenching, and removals',
        description:
          'Bellhouse handles excavation for new homes, garages, additions, trenching for utilities, and general machine work where accurate cuts and controlled material handling are required.',
        coreServiceHref: '/services/foundation-excavation',
        image: {
          src: '/assets/foundation-excavation-machinery.jpg',
          alt: 'Excavator digging for foundation work on a residential construction site.',
        },
      },
      {
        slug: 'site-preparation',
        title: 'Site preparation for new builds and rural properties',
        description:
          'Site prep includes stripping topsoil, shaping building areas, creating access routes, and preparing the ground so construction can begin without delays or rework.',
        coreServiceHref: '/services/site-preparation-land-grading',
        image: {
          src: '/assets/site-preparation-dozer-brant-county.jpg',
          alt: 'Dozer shaping a site and preparing ground for construction.',
        },
      },
      {
        slug: 'grading',
        title: 'Grading for drainage, building pads, and access lanes',
        description:
          'Grading work in Paris often involves managing slopes, directing water away from structures, and preparing driveways, lanes, and pads for gravel or finished surfaces.',
        coreServiceHref: '/services/site-preparation-land-grading',
        image: {
          src: '/assets/driveway-parking-lot-construction.jpg',
          alt: 'Machine grading and finishing a driveway and access surface.',
        },
      },
      {
        slug: 'dump-truck-services',
        title: 'Dump truck hauling for gravel, soil, fill, and spoil removal',
        description:
          'Bellhouse handles both export and import of material, hauling excess dirt away and delivering gravel, fill, or topsoil so the project keeps moving without relying on outside trucking.',
        coreServiceHref: '/services/dump-truck-rental',
        image: {
          src: '/assets/dump-truck-delivery-service.jpg',
          alt: 'Tri-axle dump truck delivering gravel and aggregate to a site.',
        },
      },
      {
        slug: 'equipment-floating',
        title: 'Equipment floating for excavators and site equipment',
        description:
          'Equipment floating is available for moving excavators and machinery between Paris job sites or bringing equipment in when the next phase of work is ready.',
        coreServiceHref: '/services/heavy-equipment-hauling',
        image: {
          src: '/assets/truck-hauling-heavy-equipment.jpg',
          alt: 'Float truck carrying heavy construction equipment to a job site.',
        },
      },
    ],
    whoWeWorkWith: [
      'Custom home builders working on rural and edge-of-town properties',
      'Contractors needing excavation and trucking under one schedule',
      'Property owners improving land with grading, drainage, or new construction',
      'Crews moving equipment between Paris, Brantford, and surrounding jobs',
    ],
    whyChoose: [
      'Excavation, grading, hauling, and equipment moves are handled together, reducing delays between phases of work.',
      'Experience with rural and uneven sites common around Paris, where access and grading require more planning.',
      'Material handling stays controlled from excavation through to final grading and delivery.',
      'Work is focused on practical site results: clean cuts, proper grades, and keeping the job ready for the next step.',
    ],
    nearbyAreas: ['Brantford', 'St. George', 'Ayr', 'Burford'],
    faqs: [
      {
        question: 'Do you handle both excavation and trucking in Paris?',
        answer:
          'Yes. Bellhouse manages both excavation and dump truck hauling so material can be removed and delivered without relying on separate schedules.',
      },
      {
        question: 'Can you prepare a site for a new build or addition?',
        answer:
          'Yes. Site preparation includes stripping, grading, and shaping the ground so it is ready for foundations, utilities, or the next stage of construction.',
      },
      {
        question: 'Do you deliver gravel and fill in Paris?',
        answer:
          'Yes. Dump truck service includes delivery of gravel, fill, and other materials, along with removal of excess soil from excavation work.',
      },
      {
        question: 'Can you move equipment between job sites?',
        answer:
          'Yes. Bellhouse provides equipment floating to move excavators and other machinery between sites or bring equipment in as needed.',
      },
    ],
  },
  hamilton: {
    slug: 'hamilton',
    city: 'Hamilton',
    province: 'Ontario',
    heroTitle: 'Hamilton Excavation Contractor, Grading & Dump Truck Services',
    heroDescription:
      'Bellhouse supports Hamilton construction projects with excavation, site preparation, grading, dump truck hauling, material delivery, and equipment floating for contractors and developers.',
    metaTitle:
      'Hamilton Excavation Contractor & Dump Truck Hauling | Bellhouse Excavating',
    metaDescription:
      'Excavation, grading, site prep, and dump truck services in Hamilton. Foundation digging, material hauling, and equipment floating for construction projects.',
    intro: [
      'Hamilton jobs move fast and usually involve multiple crews working on tight timelines. Excavation, trucking, and equipment movement all have to stay aligned or the entire schedule starts to slip.',
      'Bellhouse supports Hamilton-area construction with excavation, grading, site preparation, and dump truck hauling handled together. That means material is removed, delivered, and placed without waiting on separate contractors to catch up.',
      'From redevelopment sites to new builds and commercial work, the focus is on keeping the site moving. Cut to grade, move material efficiently, and leave the job ready for the next trade.',
    ],
    services: [
      {
        slug: 'excavation',
        title: 'Excavation for foundations, trenching, removals, and site work',
        description:
          'Bellhouse handles excavation for foundation digs, trenching for services, removals, and general machine work where accuracy and clean material handling are required.',
        coreServiceHref: '/services/foundation-excavation',
        image: {
          src: '/assets/foundation-excavation-machinery.jpg',
          alt: 'Excavator digging for foundation work on a residential construction site.',
        },
      },
      {
        slug: 'site-preparation',
        title: 'Site preparation for commercial and residential construction',
        description:
          'Site preparation includes clearing, stripping, shaping, and setting up working areas so forming crews, utilities, and other trades can start without delays.',
        coreServiceHref: '/services/site-preparation-land-grading',
        image: {
          src: '/assets/site-preparation-dozer-brant-county.jpg',
          alt: 'Dozer shaping a site and preparing ground for construction.',
        },
      },
      {
        slug: 'grading',
        title: 'Grading for drainage, building pads, and construction flow',
        description:
          'Grading work supports proper drainage, stable building pads, access routes, and work areas that need to perform under active construction conditions.',
        coreServiceHref: '/services/site-preparation-land-grading',
        image: {
          src: '/assets/driveway-parking-lot-construction.jpg',
          alt: 'Machine grading and finishing a driveway and access surface.',
        },
      },
      {
        slug: 'dump-truck-services',
        title: 'Dump truck hauling for spoil removal and material delivery',
        description:
          'Bellhouse provides dump truck hauling to remove excavated material and deliver gravel, fill, and aggregate so projects stay on schedule without material delays.',
        coreServiceHref: '/services/dump-truck-rental',
        image: {
          src: '/assets/dump-truck-delivery-service.jpg',
          alt: 'Tri-axle dump truck delivering gravel and aggregate to a site.',
        },
      },
      {
        slug: 'equipment-floating',
        title: 'Equipment floating for excavators and heavy equipment',
        description:
          'Equipment floating is available to move excavators and site equipment between Hamilton jobs or bring machines in when the next phase of work is ready.',
        coreServiceHref: '/services/heavy-equipment-hauling',
        image: {
          src: '/assets/truck-hauling-heavy-equipment.jpg',
          alt: 'Float truck carrying heavy construction equipment to a job site.',
        },
      },
    ],
    whoWeWorkWith: [
      'General contractors managing active Hamilton construction sites',
      'Developers coordinating multi-phase residential and commercial projects',
      'Builders who need excavation and trucking aligned with tight schedules',
      'Crews requiring equipment moved between Hamilton and surrounding job sites',
    ],
    whyChoose: [
      'Excavation, grading, hauling, and equipment movement are handled together to keep projects moving without delays between trades.',
      'Experience working in active construction environments where timing, access, and coordination matter.',
      'Material is moved efficiently in both directions, reducing downtime and rehandling on site.',
      'Work is focused on keeping the site ready for the next phase, not just completing a single scope in isolation.',
    ],
    nearbyAreas: ['Ancaster', 'Dundas', 'Stoney Creek', 'Binbrook'],
    faqs: [
      {
        question:
          'Do you handle both excavation and dump truck hauling in Hamilton?',
        answer:
          'Yes. Bellhouse provides both excavation and truck support, including removing spoil and delivering gravel or fill so the job stays on schedule.',
      },
      {
        question:
          'Can you prepare a site for commercial or residential construction?',
        answer:
          'Yes. Site preparation includes clearing, grading, and shaping the ground so it is ready for foundations, utilities, and other trades.',
      },
      {
        question: 'Do you deliver materials like gravel and fill?',
        answer:
          'Yes. Dump truck services include delivery of aggregate, fill, and other materials, along with removal of excess excavation material.',
      },
      {
        question: 'Can you move equipment between Hamilton job sites?',
        answer:
          'Yes. Bellhouse provides equipment floating for excavators and other heavy equipment when machines need to be moved between sites.',
      },
      {
        question: 'What types of projects are a good fit in Hamilton?',
        answer:
          'Typical work includes foundation excavation, site preparation, grading, trenching, dump truck hauling, and equipment moves tied to active construction schedules.',
      },
    ],
  },
  cambridge: {
    slug: 'cambridge',
    city: 'Cambridge',
    province: 'Ontario',
    heroTitle: 'Cambridge Excavation, Site Prep & Dump Truck Services',
    heroDescription:
      'Bellhouse provides excavation, grading, site preparation, dump truck hauling, and equipment floating for construction projects throughout Cambridge and Waterloo Region.',
    metaTitle:
      'Cambridge Excavation Contractor & Dump Truck Services | Bellhouse Excavating',
    metaDescription:
      'Excavation, grading, site prep, and dump truck services in Cambridge. Foundation digging, material hauling, and equipment floating for active construction sites.',
    intro: [
      'Cambridge projects often involve steady site activity, multiple crews, and tight timelines where excavation, trucking, and grading all need to stay in sync.',
      'Bellhouse supports construction work across Cambridge with excavation, site preparation, grading, and dump truck hauling handled together. Material is moved when needed, and the site is kept ready for the next phase without delays.',
      'From residential builds to commercial and industrial work, the focus is on keeping the job moving. Cut to grade, move material efficiently, and maintain a site that supports ongoing construction.',
    ],
    services: [
      {
        slug: 'excavation',
        title: 'Excavation for foundations, trenching, and site development',
        description:
          'Bellhouse handles excavation for foundation digs, service trenching, removals, and general site work where accurate cuts and controlled material handling are required.',
        coreServiceHref: '/services/foundation-excavation',
      },
      {
        slug: 'site-preparation',
        title: 'Site preparation for active construction and staged builds',
        description:
          'Site prep includes clearing, stripping, shaping, and preparing work areas so forming crews, utilities, and other trades can begin without delays.',
        coreServiceHref: '/services/site-preparation-land-grading',
      },
      {
        slug: 'grading',
        title: 'Grading for drainage, pads, and functional work surfaces',
        description:
          'Grading supports proper drainage, stable building pads, and usable work areas that need to perform under ongoing construction activity.',
        coreServiceHref: '/services/site-preparation-land-grading',
      },
      {
        slug: 'dump-truck-services',
        title: 'Dump truck hauling for material movement and supply',
        description:
          'Bellhouse provides dump truck hauling to remove excavated material and deliver gravel, fill, and aggregate so excavation work continues without interruption.',
        coreServiceHref: '/services/dump-truck-rental',
      },
      {
        slug: 'equipment-floating',
        title: 'Equipment floating for excavators and heavy machinery',
        description:
          'Equipment floating is available to move excavators and other machinery between Cambridge job sites or bring equipment in when needed.',
        coreServiceHref: '/services/heavy-equipment-hauling',
      },
    ],
    whoWeWorkWith: [
      'General contractors managing residential, commercial, and industrial projects',
      'Builders who need excavation and trucking aligned with active job schedules',
      'Developers coordinating material movement across multiple lots or phases',
      'Crews moving equipment between Cambridge, Kitchener, and surrounding areas',
    ],
    whyChoose: [
      'Excavation, grading, hauling, and equipment movement are handled together, keeping projects moving without delays between trades.',
      'Experience working on active job sites where timing, coordination, and material flow matter.',
      'Efficient handling of both imported and exported material reduces downtime and rework.',
      'Work is focused on keeping the site ready for the next phase, not just completing a single scope.',
    ],
    nearbyAreas: ['Kitchener', 'Ayr', 'Paris', 'Puslinch'],
    faqs: [
      {
        question:
          'Do you handle both excavation and dump truck hauling in Cambridge?',
        answer:
          'Yes. Bellhouse manages both excavation and trucking so material can be removed and delivered without relying on separate schedules.',
      },
      {
        question: 'Can you prepare a site for construction in Cambridge?',
        answer:
          'Yes. Site preparation includes clearing, grading, and shaping the ground so it is ready for foundations, utilities, and other trades.',
      },
      {
        question: 'Do you deliver gravel and fill materials?',
        answer:
          'Yes. Dump truck services include delivery of aggregate, fill, and other materials, along with removal of excess excavation material.',
      },
      {
        question: 'Can you move equipment between job sites?',
        answer:
          'Yes. Bellhouse provides equipment floating to move excavators and other machinery between sites or bring them in as needed.',
      },
      {
        question: 'What types of projects are a good fit in Cambridge?',
        answer:
          'Typical work includes foundation excavation, site preparation, grading, trenching, dump truck hauling, and equipment moves tied to active construction schedules.',
      },
    ],
  },
  ancaster: {
    slug: 'ancaster',
    city: 'Ancaster',
    province: 'Ontario',
    heroTitle: 'Ancaster Excavation, Grading & Float Truck Support',
    heroDescription:
      'Structured placeholder content for an Ancaster page built around Bellhouse excavation, site preparation, grading, dump truck hauling, and equipment floating.',
    metaTitle:
      'Ancaster Excavation & Equipment Float Services | Bellhouse Excavating',
    metaDescription:
      'Placeholder Ancaster service-area content for Bellhouse excavation, grading, site preparation, dump truck hauling, and heavy equipment floating.',
    intro: [
      'Ancaster should read like a page for estate-lot work, commercial edges of Hamilton, and sites where grading, access, and machine movement all matter at once.',
      'This placeholder draft leaves room to later describe Bellhouse work on sloped sites, long drive approaches, and coordinated truck access without overfilling the page.',
      'The wording is intentionally local and service-specific so it can be refined instead of replaced.',
    ],
    services: [
      {
        slug: 'excavation',
        title: 'Excavation for custom homes, additions, and site changes',
        description:
          'Use this section for Ancaster digging work where cuts, removals, and trenching need to be handled carefully around established properties or new builds.',
        coreServiceHref: '/services/foundation-excavation',
        image: {
          src: '/assets/foundation-excavation-machinery.jpg',
          alt: 'Excavator digging for foundation work on a residential construction site.',
        },
      },
      {
        slug: 'site-preparation',
        title: 'Site preparation for buildable and accessible ground',
        description:
          'Placeholder copy should explain stripping, shaping, and preparing sites so the next phase of construction can start on solid footing.',
        coreServiceHref: '/services/site-preparation-land-grading',
        image: {
          src: '/assets/site-preparation-dozer-brant-county.jpg',
          alt: 'Dozer shaping a site and preparing ground for construction.',
        },
      },
      {
        slug: 'grading',
        title: 'Grading for slope control, drainage, and finished access',
        description:
          'Ancaster content can later be refined around elevation changes, driveway approaches, and grades that need to work visually and practically.',
        coreServiceHref: '/services/site-preparation-land-grading',
        image: {
          src: '/assets/driveway-parking-lot-construction.jpg',
          alt: 'Machine grading and finishing a driveway and access surface.',
        },
      },
      {
        slug: 'dump-truck-services',
        title: 'Dump truck hauling for fill, gravel, and excavated material',
        description:
          'This block should focus on material movement that supports the excavation plan, whether Bellhouse is exporting spoil or importing the next layer of aggregate.',
        coreServiceHref: '/services/dump-truck-rental',
        image: {
          src: '/assets/dump-truck-delivery-service.jpg',
          alt: 'Tri-axle dump truck delivering gravel and aggregate to a site.',
        },
      },
      {
        slug: 'equipment-floating',
        title: 'Equipment floating for excavators and heavy site machinery',
        description:
          'Use this entry to cover float truck support for moving equipment into Ancaster properties and nearby Hamilton-area sites without relying on third-party transport.',
        coreServiceHref: '/services/heavy-equipment-hauling',
        image: {
          src: '/assets/truck-hauling-heavy-equipment.jpg',
          alt: 'Float truck carrying heavy construction equipment to a job site.',
        },
      },
    ],
    whoWeWorkWith: [
      'Custom builders working on Ancaster home and estate-lot projects',
      'Property owners improving sites with excavation and grading requirements',
      'Contractors needing truck support for aggregate, fill, and spoil removal',
      'Teams scheduling machine transport between Ancaster, Hamilton, and Brant County',
    ],
    whyChoose: [
      'Ancaster placeholder language is built around terrain, access, and coordinated machine-and-truck support.',
      "The page stays clear about Bellhouse's real operating scope rather than drifting into unrelated trades.",
      'Each content block is distinct so future refinements can add local detail without rewriting the model.',
    ],
    nearbyAreas: ['Hamilton', 'Dundas', 'Mount Hope', 'Binbrook'],
    faqs: [
      {
        question: 'What local angle should Ancaster eventually emphasize?',
        answer:
          'The strongest fit is site access, grade changes, and the coordination needed between excavation, grading, hauling, and float service.',
      },
      {
        question:
          'Is the Ancaster content intentionally different from Hamilton?',
        answer:
          'Yes. Hamilton is framed around larger urban logistics, while Ancaster leans toward estate lots, slopes, and property-specific site preparation.',
      },
      {
        question: 'How complete is this content?',
        answer:
          'It is structured placeholder content. The data model is production-ready, while the copy is meant to be refined with real Bellhouse examples later.',
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

