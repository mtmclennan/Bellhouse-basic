import type { LandingPageData } from './types';

export const commercialSitePreparationLandingPage = {
  slug: 'commercial-site-preparation-brantford',
  serviceName: 'Commercial Site Preparation',
  serviceKey: 'commercial-site-prep',
  seo: {
    title: 'Commercial Site Preparation Brantford | Bellhouse Excavating',
    description:
      'Commercial site preparation in Brantford and Brant County — excavation, grading, drainage, gravel yards, building pads, and material placement.',
    noindex: true,
    canonical: '/landing/commercial-site-preparation-brantford',
    ogImage: {
      src: '/assets/site-preparation-dozer-brant-county.jpg',
      alt: 'Bellhouse dozer grading a commercial site preparation project in Brant County',
      width: 1200,
      height: 630,
    },
  },
  header: {
    logoLabel: 'Bellhouse Excavating',
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'commercial-site-prep-header-phone',
    },
    quoteCta: {
      label: 'Free Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'commercial-site-prep-header-quote',
    },
  },
  hero: {
    eyebrow: 'Brantford & Brant County',
    titleHighlight: 'Commercial Site Preparation',
    title: 'in Brantford & Brant County',
    subtitle:
      'Bellhouse handles commercial and industrial earthworks across Brantford and Brant County: bulk excavation, cut and fill, building pads, rough grading, aggregate base, drainage, site-servicing components, trucking, material movement, and industrial yard preparation.',
    bullets: [
      'Industrial yard grading and aggregate base work',
      'Warehouse and commercial building pad prep',
      'Drainage, catch-basin, trenching, and related backfill scopes reviewed with the work',
      'Commercial earthmoving, trucking, and fill placement',
    ],
    primaryCta: {
      label: 'Request a Site Prep Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'commercial-site-prep-hero-quote',
    },
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'commercial-site-prep-hero-phone',
    },
    backgroundImage: {
      src: '/assets/site-preparation-dozer-brant-county.jpg',
      alt: 'Dozer grading a commercial site preparation project in Brant County',
      width: 1600,
      height: 900,
      priority: true,
    },
  },
  form: {
    id: 'commercial-site-preparation-quote',
    heading: 'Get a commercial site prep quote',
    description:
      'Send the site location, scope, access details, material needs, and project timing.',
    submitLabel: 'Request My Site Prep Quote',
    successMessage:
      'Thanks. Bellhouse will review the commercial site preparation details and follow up shortly.',
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        required: true,
        placeholder: 'Your name',
        width: 'half',
      },
      {
        name: 'phone',
        label: 'Phone',
        type: 'tel',
        placeholder: 'Best number',
        width: 'half',
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        placeholder: 'you@example.com',
        width: 'half',
      },
      {
        name: 'jobLocation',
        label: 'Project location',
        type: 'text',
        required: true,
        placeholder: 'Town, address, or nearest intersection',
        width: 'half',
      },
      {
        name: 'projectType',
        label: 'Project type',
        type: 'select',
        required: true,
        width: 'half',
        options: [
          'Industrial yard grading',
          'Commercial building pad prep',
          'Gravel yard construction',
          'Drainage or site-servicing components',
          'Outdoor storage area base prep',
          'Construction entrance or mud control pad',
          'Large-volume fill placement',
          'Other commercial site prep',
        ],
      },
      {
        name: 'timeline',
        label: 'Timeline',
        type: 'select',
        width: 'half',
        options: [
          'As soon as possible',
          'Within 2 to 4 weeks',
          '1 to 3 months out',
          'Planning or budgeting',
        ],
      },
      {
        name: 'details',
        label: 'Project details',
        type: 'textarea',
        placeholder:
          'Tell us about site size, current conditions, grading, drainage, aggregate, fill, access, phasing, and timing.',
        width: 'full',
      },
      {
        name: 'files',
        label: 'Jobsite photos',
        type: 'file',
        width: 'full',
      },
      {
        name: 'smsConsent',
        label: 'I agree to receive SMS messages from Bellhouse Excavating if I provide a phone number.',
        type: 'checkbox',
        width: 'full',
      },
    ],
  },
  trustBar: {
    items: [
      { label: 'Commercial earthworks and building pads', icon: 'buildings' },
      { label: 'Rough grading and aggregate base', icon: 'ruler' },
      { label: 'High-volume material movement', icon: 'truck' },
      { label: 'Volvo A35 support where useful', icon: 'stack' },
    ],
  },
  audience: {
    eyebrow: 'Who it is for',
    heading: 'Site prep for commercial operators, developers, and contractors',
    intro:
      'Bellhouse is set up for commercial-scale projects with meaningful scope, equipment access, material movement, and practical site coordination.',
    items: [
      {
        title: 'Industrial operators',
        description: 'Yard grading, drainage, gravel surfaces, and access improvements for active industrial properties.',
        icon: 'buildings',
      },
      {
        title: 'Commercial developers',
        description: 'Building pad prep, rough grading, and site work for new commercial developments.',
        icon: 'blueprint',
      },
      {
        title: 'Trucking and logistics companies',
        description: 'Gravel yards, outdoor storage, truck movement areas, and heavy-use access surfaces.',
        icon: 'truck',
      },
      {
        title: 'General contractors',
        description: 'Commercial excavation and site preparation support that fits the broader project schedule.',
        icon: 'hard-hat',
      },
    ],
  },
  handles: {
    eyebrow: 'What Bellhouse handles',
    heading: 'Commercial site work built around access, drainage, and material movement',
    intro:
      'Bellhouse handles clearing, bulk excavation, cut and fill, rough grading, aggregate base, gravel yard construction, building pad preparation, trucking, and material placement for commercial and industrial sites.',
    items: [
      {
        title: 'Site clearing and rough grading',
        description: 'Existing material, uneven grade, and access issues reviewed before shaping the site.',
        icon: 'shovel',
      },
      {
        title: 'Building pad preparation',
        description: 'Commercial and warehouse building pad excavation, base prep, and rough grading.',
        icon: 'buildings',
      },
      {
        title: 'Industrial yard grading',
        description: 'Yard surfaces shaped for equipment, trucks, drainage, and day-to-day operation.',
        icon: 'ruler',
      },
      {
        title: 'Gravel yard construction',
        description: 'Aggregate delivery, placement, grading, and compaction for outdoor storage and working yards.',
        icon: 'stack',
      },
      {
        title: 'Drainage planning',
        description: 'Surface drainage, slope, water movement, and rough grading considerations built into the earthworks scope.',
        icon: 'drop',
      },
      {
        title: 'Scope boundaries',
        description: 'Site servicing components, drainage, catch basins, trenching, and related backfill can be reviewed with the earthworks scope. Larger civil-servicing packages, major watermain, extensive sanitary, and complex storm sewer systems may require additional civil partners.',
        icon: 'check-square',
      },
      {
        title: 'Construction entrances',
        description: 'Mud control pads, access surfaces, and temporary working areas for active construction sites.',
        icon: 'path',
      },
      {
        title: 'Large-volume fill placement',
        description: 'Fill and aggregate placement coordinated around grade, compaction, and truck access.',
        icon: 'truck',
      },
      {
        title: 'Off-road material placement',
        description: 'On-site material placement with the Volvo A35 articulated off-road dump truck where road trucks cannot safely reach.',
        icon: 'cube',
      },
    ],
  },
  pricing: {
    eyebrow: 'What affects price',
    heading: 'Priced around scope, material, drainage, and phasing',
    intro:
      'Commercial site prep pricing depends on how much material moves, what the finished surface needs to do, and how the work fits around site access or active operations.',
    basis: [
      { icon: 'map-trifold', kicker: 'By site', title: 'Area, access, and staging' },
      { icon: 'stack', kicker: 'By material', title: 'Cut, fill, aggregate, and compaction' },
      { icon: 'drop', kicker: 'By drainage', title: 'Slope, water movement, and tie-ins' },
    ],
    factors: [
      {
        title: 'Site size and scope',
        description: 'A larger yard, building pad, or development area changes equipment time, trucking, and material volume.',
      },
      {
        title: 'Existing conditions',
        description: 'Soft ground, old material, vegetation, poor drainage, or unsuitable fill can affect the prep required.',
      },
      {
        title: 'Fill or aggregate import',
        description: 'Imported aggregate, fill placement, and compaction requirements are major pricing factors.',
      },
      {
        title: 'Drainage complexity',
        description: 'Surface drainage, slope, water movement, tie-ins, and manageable servicing components affect grading and layout. Large civil-servicing packages are reviewed separately.',
      },
      {
        title: 'Access and staging',
        description: 'Truck routes, equipment movement, stockpile areas, and working room shape the construction plan.',
      },
      {
        title: 'Timeline and phasing',
        description: 'Active sites may need staged work so operations can keep moving while site prep is underway.',
      },
    ],
    rail: {
      eyebrow: 'The honest version',
      heading: 'Best suited to commercial-scale site work',
      body: 'Bellhouse is the right fit for industrial yards, trucking facilities, warehouse pads, gravel storage areas, and sites with meaningful material movement.',
      anchorLabel: 'Where your project fits',
      anchorLow: { value: 'Review scope', sub: 'Small sites, interiors, or finish grade only' },
      anchorHigh: { value: 'Best fit', sub: 'Commercial yards, building pads, drainage, and gravel surfaces' },
      chips: ['No charge to quote', 'Call or text Darryl directly', 'Not sure it fits? Send photos'],
      cta: {
        label: 'Get My Site Quoted',
        href: '#landing-quote',
        variant: 'primary',
        trackingId: 'commercial-site-prep-pricing-quote',
      },
    },
  },
  proof: {
    eyebrow: 'Project fit',
    heading: 'Built for commercial sites with room, volume, and operational needs',
    intro:
      'Bellhouse is strongest where grading, drainage, gravel surfaces, and material placement need to be planned as one practical site-work scope.',
    stats: [
      { value: 'Industrial', label: 'Yards, trucking facilities, and outdoor storage areas' },
      { value: 'Commercial', label: 'Warehouse and commercial building site preparation' },
      { value: 'Volume', label: 'High-volume material movement, fill placement, and compaction' },
      { value: 'Review scope', label: 'Confined excavation, landscaping, or finish grade only' },
    ],
    gallery: [
      {
        src: '/assets/services/large-site-prep-two-excavators.webp',
        alt: 'Two excavators working on a large commercial site preparation project',
        caption: 'Large-site preparation',
      },
      {
        src: '/assets/services/off-road-truck-dump-truck.jpg',
        alt: 'Off-road dump truck moving material on a commercial site',
        caption: 'On-site material movement',
      },
      {
        src: '/assets/services/cat-320D-excavator-leveling-aggregates-pile.webp',
        alt: 'Excavator leveling aggregate for commercial site preparation',
        caption: 'Aggregate placement',
      },
      {
        src: '/assets/site-preparation-dozer-brant-county.jpg',
        alt: 'Dozer grading a commercial site in Brant County',
        caption: 'Grading and drainage',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Commercial site preparation questions',
    items: [
      {
        question: 'Do you work on active commercial sites?',
        answer:
          'Yes. Bellhouse can work around active operations where needed. Schedule, phasing, and access are reviewed at quote so site work does not shut down your operation.',
      },
      {
        question: 'Can you handle the full scope or do we need multiple contractors?',
        answer:
          'Bellhouse can handle earthworks scopes such as clearing, bulk excavation, cut and fill, rough grading, aggregate base, gravel yards, trucking, material placement, site servicing components, drainage, catch basins, trenching, related excavation, and backfill where the scope fits. Large civil packages, major watermain work, extensive sanitary systems, or complex storm sewer networks are reviewed separately and may require additional civil partners.',
      },
      {
        question: 'Do you handle the gravel surface on industrial yards?',
        answer:
          'Yes. Gravel yard construction is a core service: base prep, aggregate delivery, placement, grading, and compaction. Bellhouse operates a Volvo A35 for on-site material placement in areas road trucks cannot safely reach.',
      },
      {
        question: 'What is the minimum project size you work on?',
        answer:
          'Bellhouse is set up for commercial-scale work, but project size is reviewed by scope rather than a hard cutoff. Projects with meaningful excavation, grading, drainage, trucking, access, or material volume are where Bellhouse works best.',
      },
      {
        question: 'Do you serve Hamilton and surrounding areas?',
        answer:
          'Yes. Bellhouse serves Brantford, Brant County, Hamilton, Cambridge, Burlington, and surrounding Southern Ontario areas for commercial work.',
      },
    ],
  },
  finalCta: {
    eyebrow: 'Get Started',
    heading: 'Get a Quote on Your Commercial Site Prep Project',
    body: 'Call or text Darryl directly, or send the site location, scope, access details, and timeline through the form.',
    primaryCta: {
      label: 'Request a Site Prep Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'commercial-site-prep-final-quote',
    },
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'commercial-site-prep-final-phone',
    },
  },
  footer: {
    logoLabel: 'Bellhouse Excavating',
    serviceLine: 'Commercial site preparation, industrial yard grading, gravel surfaces, drainage, and building pad prep',
    locationLine:
      'Serving Brantford, Brant County, Paris, Hamilton, Cambridge, and surrounding areas',
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'commercial-site-prep-footer-phone',
    },
  },
  mobileBar: {
    callCta: {
      label: 'Call',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'commercial-site-prep-mobile-call',
    },
    textCta: {
      label: 'Text Us',
      href: 'sms:5197528500',
      variant: 'primary',
      trackingId: 'commercial-site-prep-mobile-text',
    },
  },
} satisfies LandingPageData;
