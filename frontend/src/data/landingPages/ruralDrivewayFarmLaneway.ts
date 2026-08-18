import type { LandingPageData } from './types';

export const ruralDrivewayFarmLanewayLandingPage = {
  slug: 'rural-driveway-farm-laneway-brant-county',
  serviceName: 'Rural Driveway & Farm Laneway Work',
  serviceKey: 'rural-driveway-farm-laneway',
  seo: {
    title: 'Rural Driveway & Farm Laneway Work Brant County | Bellhouse',
    description:
      'Farm laneway construction, rural gravel driveway repair, washout repair, grading, drainage correction, and aggregate base work across Brant County.',
    noindex: true,
    canonical: '/landing/rural-driveway-farm-laneway-brant-county',
    ogImage: {
      src: '/assets/services/driveways-laneways/brantwood-farms-driveway-laneway-excavation-brantford.webp',
      alt: 'Bellhouse excavator preparing a rural gravel driveway and farm laneway base near Brant County',
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
      trackingId: 'laneway-header-phone',
    },
    quoteCta: {
      label: 'Free Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'laneway-header-quote',
    },
  },
  hero: {
    eyebrow: 'Rural Driveways & Farm Laneways - Brant County',
    titleHighlight: 'Farm Laneway & Rural Driveway Work',
    title: 'Built for Gravel, Grading & Drainage',
    subtitle:
      'Bellhouse builds and repairs farm laneways, rural gravel driveways, washed-out access routes, and aggregate bases across Brant County. This is excavation, grading, drainage, and gravel work - not asphalt paving or decorative concrete.',
    bullets: [
      'New farm laneways and rural gravel driveways',
      'Washout repair, rut correction, regrading, and lost base replacement',
      'Culvert-related grading and drainage correction where appropriate',
    ],
    primaryCta: {
      label: 'Request a Rural Driveway or Laneway Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'laneway-hero-quote',
    },
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'laneway-hero-phone',
    },
    backgroundImage: {
      src: '/assets/services/driveways-laneways/brantwood-farms-driveway-laneway-excavation-brantford.webp',
      alt: 'Excavator preparing a rural gravel driveway and farm laneway base',
      width: 1600,
      height: 900,
      priority: true,
    },
  },
  form: {
    id: 'rural-driveway-farm-laneway-quote',
    heading: 'Get a rural driveway or laneway quote',
    description:
      'Send the location, access type, main issue, rough length, and photos if available.',
    submitLabel: 'Request My Driveway or Laneway Quote',
    successMessage:
      'Thanks. Bellhouse will review the rural driveway or farm laneway details and follow up shortly.',
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
        placeholder: 'Town, road, address, or nearest intersection',
        width: 'half',
      },
      {
        name: 'projectType',
        label: 'Project type',
        type: 'select',
        required: true,
        width: 'half',
        options: [
          'Farm laneway construction',
          'Rural gravel driveway construction',
          'Existing driveway reconstruction',
          'Washed-out driveway repair',
          'Laneway regrading',
          'Culvert-related grading',
          'Temporary construction access',
          'Other rural access work',
        ],
      },
      {
        name: 'mainIssue',
        label: 'Main issue',
        type: 'select',
        width: 'half',
        options: [
          'New access route',
          'Ruts or soft spots',
          'Heavy rain washout',
          'Poor drainage',
          'Lost gravel or failed base',
          'Culvert overflow or crossing issue',
          'Not sure yet',
        ],
      },
      {
        name: 'approxLength',
        label: 'Approximate length',
        type: 'text',
        placeholder: 'Example: 300 ft, 900 ft, or not sure',
        width: 'half',
      },
      {
        name: 'timeline',
        label: 'Timeline',
        type: 'select',
        width: 'half',
        options: [
          'As soon as possible',
          'After recent storm damage',
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
          'Tell us about the existing surface, drainage, access, culverts, equipment traffic, washout areas, and what needs to change.',
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
      { label: 'Gravel and aggregate base work', icon: 'stack' },
      { label: 'Excavation, grading, and drainage correction', icon: 'ruler' },
      { label: 'Farm and acreage access experience', icon: 'map-trifold' },
      { label: 'Trucking and material placement', icon: 'truck' },
    ],
  },
  audience: {
    eyebrow: 'Who it is for',
    heading: 'Rural access work for farms, acreages, and country properties',
    intro:
      'Bellhouse is a strong fit where a driveway or laneway has to carry real traffic, shed water properly, and hold up beyond a cosmetic top-up.',
    items: [
      {
        title: 'Farm properties',
        description: 'Laneways and access routes for equipment, trucks, barns, shops, fields, and farmyards.',
        icon: 'buildings',
      },
      {
        title: 'Rural homeowners',
        description: 'Long gravel driveways, washed-out access, soft spots, and drainage trouble on country properties.',
        icon: 'house-line',
      },
      {
        title: 'Acreage and equestrian sites',
        description: 'Stable, practical access for trailers, service vehicles, outbuildings, and daily property use.',
        icon: 'map-trifold',
      },
      {
        title: 'Builders and contractors',
        description: 'Temporary or permanent access routes that need base, grading, and truck-friendly layout.',
        icon: 'hard-hat',
      },
    ],
  },
  handles: {
    eyebrow: 'What Bellhouse handles',
    heading: 'Gravel access work with drainage and base planned in',
    intro:
      'The work is scoped around traffic, water, base depth, material delivery, and how the lane or driveway needs to perform.',
    items: [
      {
        title: 'New laneway construction',
        description: 'Farm laneways, rural driveways, and access routes built with excavation, base, and aggregate placement.',
        icon: 'path',
      },
      {
        title: 'Driveway reconstruction',
        description: 'Failed gravel driveways rebuilt where top-dressing alone will not solve ruts, soft spots, or drainage.',
        icon: 'shovel',
      },
      {
        title: 'Washout repair',
        description: 'Storm damage, erosion, lost gravel, and washed-out sections repaired with drainage and base in mind.',
        icon: 'drop',
      },
      {
        title: 'Grading and shaping',
        description: 'Crowns, slopes, transitions, and tie-ins shaped so water moves away from the driving surface.',
        icon: 'ruler',
      },
      {
        title: 'Culvert-related grading',
        description: 'Culvert crossings, ditch edges, and water flow areas reviewed where they affect the driveway or laneway.',
        icon: 'arrows-split',
      },
      {
        title: 'Aggregate placement',
        description: 'Granular base and surface material delivered, placed, graded, and compacted for the intended use.',
        icon: 'truck',
      },
    ],
  },
  pricing: {
    eyebrow: 'What affects price',
    heading: 'Priced around length, base, drainage, and material movement',
    intro:
      'A rural driveway or farm laneway quote depends on what is already there, what failed, and how the finished access route needs to perform.',
    basis: [
      { icon: 'path', kicker: 'By access', title: 'Length, width, and layout' },
      { icon: 'stack', kicker: 'By base', title: 'Depth, aggregate, and compaction' },
      { icon: 'drop', kicker: 'By water', title: 'Drainage, slope, and washouts' },
    ],
    factors: [
      {
        title: 'Existing base condition',
        description: 'Soft spots, organics, rutting, and failed base determine whether the lane needs repair or reconstruction.',
      },
      {
        title: 'Drainage and water flow',
        description: 'Ditching, crossfall, culvert crossings, low areas, and storm washouts shape the repair plan.',
      },
      {
        title: 'Driveway or laneway length',
        description: 'Longer access routes change material volume, equipment time, trucking, and grading sequence.',
      },
      {
        title: 'Traffic and use',
        description: 'Farm equipment, delivery trucks, trailers, and construction traffic need a stronger base than light-use lanes.',
      },
      {
        title: 'Aggregate requirements',
        description: 'Material type, base depth, surface stone, and compaction affect both cost and performance.',
      },
    ],
    rail: {
      eyebrow: 'The honest version',
      heading: 'Top-dressing gravel is not always enough',
      body: 'If water, soft spots, or a failed base caused the problem, Bellhouse reviews the structure of the driveway or laneway before quoting.',
      anchorLabel: 'Where your job fits',
      anchorLow: { value: 'Simple', sub: 'Regrade and add material' },
      anchorHigh: { value: 'Rebuild', sub: 'Failed base, washout, drainage, and culvert areas' },
      chips: ['No asphalt paving', 'No decorative concrete', 'Photos help us quote'],
      cta: {
        label: 'Get My Access Route Quoted',
        href: '#landing-quote',
        variant: 'primary',
        trackingId: 'laneway-pricing-quote',
      },
    },
  },
  proof: {
    eyebrow: 'Project fit',
    heading: 'Real rural driveway and laneway work',
    intro:
      'The strongest projects involve excavation, aggregate base, truck access, grading, and water control - not a cosmetic layer of stone over a failed surface.',
    stats: [
      { value: 'Farm', label: 'Laneways and yard access for equipment and trucks' },
      { value: 'Rural', label: 'Country driveways, acreage access, and long gravel lanes' },
      { value: 'Storm', label: 'Washout, rutting, erosion, and failed drainage repair' },
      { value: 'Not paving', label: 'No asphalt paving or decorative concrete driveway service' },
    ],
    gallery: [
      {
        src: '/assets/services/driveways-laneways/brantwood-farms-driveway-laneway-excavation-brantford.webp',
        alt: 'Excavator preparing a rural farm laneway base',
        caption: 'Farm laneway preparation',
      },
      {
        src: '/assets/services/driveways-laneways/brantwood-farms-laneway-base-excavation.webp',
        alt: 'Farm laneway base excavation and preparation',
        caption: 'Base correction',
      },
      {
        src: '/assets/services/driveways-laneways/long-gravel-driveway-brant-gravel.webp',
        alt: 'Long rural gravel driveway in Brant County',
        caption: 'Long gravel driveway',
      },
      {
        src: '/assets/services/driveways-laneways/skid-steer-final-grading-gravel-driveway-farm-shop.webp',
        alt: 'Skid steer final grading a gravel driveway near a farm shop',
        caption: 'Final grading',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Rural driveway and farm laneway questions',
    items: [
      {
        question: 'Do you pave driveways?',
        answer:
          'No. This service is focused on gravel and aggregate base work: excavation, grading, drainage correction, material placement, and compaction for rural driveways and farm laneways.',
      },
      {
        question: 'Can Bellhouse repair a washed-out driveway after heavy rain?',
        answer:
          'Yes, where the site is accessible and the repair is practical. Bellhouse reviews what washed out, how water is moving, whether base material failed, and whether culvert-related grading is part of the problem.',
      },
      {
        question: 'Do I need to own a farm to hire Bellhouse for driveway work?',
        answer:
          'No. Bellhouse also works with rural homeowners, acreage owners, equestrian properties, and country properties that need gravel driveway repair, reconstruction, grading, drainage correction, or aggregate base work.',
      },
      {
        question: 'Can you build a new farm laneway?',
        answer:
          'Yes. Bellhouse can excavate, shape, place aggregate base, grade, and compact farm laneways and rural access routes for equipment, trucks, shops, barns, and fields.',
      },
      {
        question: 'Do I need exact tonnage before asking for a quote?',
        answer:
          'No. A location, approximate length, photos, and a description of the problem are enough to start. Bellhouse can review material needs during the quote process.',
      },
    ],
  },
  finalCta: {
    eyebrow: 'Get Started',
    heading: 'Ready to quote your rural driveway or farm laneway?',
    body: 'Call or text Darryl directly, or send the project location, rough length, main issue, and photos through the form.',
    primaryCta: {
      label: 'Request a Rural Driveway or Laneway Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'laneway-final-quote',
    },
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'laneway-final-phone',
    },
  },
  footer: {
    logoLabel: 'Bellhouse Excavating',
    serviceLine: 'Farm laneway construction, rural driveway repair, washout repair, grading, and aggregate base work',
    locationLine:
      'Serving Brantford, Brant County, Paris, Cambridge, Hamilton, and surrounding areas',
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'laneway-footer-phone',
    },
  },
  mobileBar: {
    callCta: {
      label: 'Call',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'laneway-mobile-call',
    },
    textCta: {
      label: 'Text Us',
      href: 'sms:5197528500',
      variant: 'primary',
      trackingId: 'laneway-mobile-text',
    },
  },
} satisfies LandingPageData;
