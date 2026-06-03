import type { LandingPageData } from './types';

export const foundationExcavationLandingPage = {
  slug: 'foundation-excavation-brantford',
  serviceName: 'Foundation Excavation',
  serviceKey: 'foundation-excavation',
  seo: {
    title: 'Foundation Excavation Brantford | Bellhouse Excavating',
    description:
      'Foundation excavation, haul-out, backfill, and site prep support for Brantford and Brant County builds.',
    canonical: '/landing/foundation-excavation-brantford',
    ogImage: {
      src: '/assets/foundation-excavation-dump-truck-loading-brantford.webp',
      alt: 'Bellhouse excavator loading a dump truck during a foundation excavation project near Brantford',
      width: 1200,
      height: 630,
    },
  },
  header: {
    logoLabel: 'Bellhouse Excavating',
    phoneCta: {
      label: 'Call 519-802-3857',
      href: 'tel:5198023857',
      variant: 'phone',
      trackingId: 'foundation-header-phone',
    },
    quoteCta: {
      label: 'Free Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'foundation-header-quote',
    },
  },
  hero: {
    eyebrow: 'Serving Brantford and Brant County',
    title: 'Foundation excavation in Brantford',
    subtitle:
      'Excavation, trucking, backfill, and site prep coordinated by a local crew that understands access, depth, elevations, and real construction schedules.',
    bullets: [
      'Foundation digs, basements, footings, and garage pads',
      'Spoil haul-out and material delivery planned with the dig',
      'Clean equipment, practical communication, and a tidy site handoff',
    ],
    primaryCta: {
      label: 'Request a Foundation Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'foundation-hero-quote',
    },
    phoneCta: {
      label: 'Call 519-802-3857',
      href: 'tel:5198023857',
      variant: 'phone',
      trackingId: 'foundation-hero-phone',
    },
    backgroundImage: {
      src: '/assets/foundation-excavation-dump-truck-loading-brantford.webp',
      alt: 'Excavator loading a dump truck during a foundation excavation project',
      width: 1600,
      height: 900,
      priority: true,
    },
  },
  form: {
    id: 'foundation-excavation-quote',
    heading: 'Get a foundation excavation quote',
    description:
      'Send the site location, timing, drawings, and access details so Bellhouse can review the project clearly.',
    submitLabel: 'Request My Foundation Quote',
    successMessage:
      'Thanks. Bellhouse will review the foundation excavation details and follow up shortly.',
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
          'Foundation excavation',
          'Basement excavation',
          'Garage or slab excavation',
          'Footings or addition',
          'Backfill and grading',
          'Other foundation work',
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
          'Tell us about the foundation, garage, addition, shop, drawings, depth, access, or start date.',
        width: 'full',
      },
      {
        name: 'files',
        label: 'Photos or drawings',
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
      { label: 'Local excavation and trucking', icon: 'truck' },
      { label: 'Clean, well-maintained equipment', icon: 'shield-check' },
      { label: 'Practical jobsite communication', icon: 'chat-circle' },
      { label: 'Quote reviewed by the crew', icon: 'clipboard-text' },
    ],
  },
  audience: {
    eyebrow: 'Who it is for',
    heading: 'Foundation excavation for builders and property owners',
    intro:
      'Bellhouse helps keep the early site work organized so the next phase can move without avoidable delays.',
    items: [
      {
        title: 'Home builders',
        description: 'New home digs, garages, additions, and repeat residential projects.',
        icon: 'hard-hat',
      },
      {
        title: 'General contractors',
        description: 'Excavation and hauling support that fits into the broader construction schedule.',
        icon: 'blueprint',
      },
      {
        title: 'Concrete contractors',
        description: 'Footing, slab, and base prep coordination before forming and pouring.',
        icon: 'wall',
      },
      {
        title: 'Homeowners',
        description: 'Clear answers for excavation scope, site access, timing, and what happens next.',
        icon: 'house-line',
      },
    ],
  },
  handles: {
    eyebrow: 'What Bellhouse handles',
    heading: 'Foundation excavation with the hauling planned in',
    intro:
      'The work is scoped around access, elevations, soil, backfill, and material movement before equipment arrives.',
    items: [
      {
        title: 'Foundation digs',
        description: 'Basements, footings, additions, garage pads, and related structural excavation.',
        icon: 'shovel',
      },
      {
        title: 'Spoil haul-out',
        description: 'Material removed from site with trucking coordinated around the excavation flow.',
        icon: 'truck',
      },
      {
        title: 'Backfill support',
        description: 'Backfill, compaction, and grading coordinated after walls and services are ready.',
        icon: 'stack',
      },
      {
        title: 'Access planning',
        description: 'Equipment, staging, and truck movement reviewed before the work is scheduled.',
        icon: 'map-trifold',
      },
      {
        title: 'Granular material',
        description: 'Imported gravel or granular base delivered when the job calls for it.',
        icon: 'circles-three-plus',
      },
      {
        title: 'Site handoff',
        description: 'The work area is left stable, workable, and ready for the next trade.',
        icon: 'check-circle',
      },
    ],
  },
  pricing: {
    eyebrow: 'What affects price',
    heading: 'Foundation excavation is priced around the site',
    intro:
      'A useful quote depends on access, depth, volume, soil, trucking, and the details shown on drawings.',
    factors: [
      {
        title: 'Depth and footprint',
        description: 'Basement depth, footing layout, and total cut volume shape the excavation scope.',
      },
      {
        title: 'Access and staging',
        description: 'Narrow lots, overhead lines, slopes, and truck access affect equipment choices.',
      },
      {
        title: 'Soil and water conditions',
        description: 'Clay, wet ground, rock, or unstable material changes how the dig is handled.',
      },
      {
        title: 'Haul-out and disposal',
        description: 'Spoil volume, truck loads, and disposal location are major cost drivers.',
      },
      {
        title: 'Backfill and granular needs',
        description: 'Imported material, lifts, compaction, and grading can be included when needed.',
      },
    ],
    sideNote: {
      heading: 'The honest version',
      body: 'Photos, drawings, and clear access details help Bellhouse quote the real job instead of guessing from a generic square-foot number.',
      cta: {
        label: 'Send Foundation Details',
        href: '#landing-quote',
        variant: 'primary',
        trackingId: 'foundation-pricing-quote',
      },
    },
  },
  proof: {
    eyebrow: 'Proof',
    heading: 'Real equipment on real sites',
    intro:
      'Bellhouse brings excavation and trucking together so foundations, haul-out, and backfill are not treated as disconnected jobs.',
    stats: [
      { value: 'Local', label: 'Brantford and Brant County project support' },
      { value: 'Own fleet', label: 'Excavators and triaxle hauling support' },
      { value: 'Clean', label: 'Well-maintained trucks and equipment' },
      { value: 'Direct', label: 'Practical communication before work starts' },
    ],
    gallery: [
      {
        src: '/assets/excavator-digging-foundation.jpg',
        alt: 'Excavator digging a foundation',
        caption: 'Foundation excavation',
      },
      {
        src: '/assets/excavator-loading-tri-axle-foundation.jpg',
        alt: 'Excavator loading material into a triaxle truck',
        caption: 'Haul-out coordination',
      },
      {
        src: '/assets/foundation-backfill-packer.jpg',
        alt: 'Backfill and compaction equipment beside a foundation',
        caption: 'Backfill and compaction',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Foundation excavation questions',
    items: [
      {
        question: 'Can Bellhouse handle both excavation and trucking?',
        answer:
          'Yes. Excavation and trucking can be coordinated together so spoil haul-out, material delivery, and site access are planned as part of the same job.',
      },
      {
        question: 'Do I need drawings before asking for a quote?',
        answer:
          'Drawings help, especially for depth and elevations, but photos, a location, and a short description are enough to start the conversation.',
      },
      {
        question: 'Can you work on tight residential lots?',
        answer:
          'Often, yes. Access, staging, and equipment size are reviewed before the work is scheduled.',
      },
    ],
  },
  finalCta: {
    heading: 'Ready to quote your foundation excavation?',
    body: 'Send the site details, drawings, and timing, or call Bellhouse to talk through the project directly.',
    primaryCta: {
      label: 'Request a Foundation Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'foundation-final-quote',
    },
    phoneCta: {
      label: 'Call 519-802-3857',
      href: 'tel:5198023857',
      variant: 'phone',
      trackingId: 'foundation-final-phone',
    },
  },
  footer: {
    logoLabel: 'Bellhouse Excavating',
    serviceLine: 'Foundation excavation, backfill, grading, and trucking',
    locationLine: 'Serving Brantford, Brant County, and nearby areas',
    phoneCta: {
      label: '519-802-3857',
      href: 'tel:5198023857',
      variant: 'phone',
      trackingId: 'foundation-footer-phone',
    },
  },
  mobileBar: {
    callCta: {
      label: 'Call',
      href: 'tel:5198023857',
      variant: 'phone',
      trackingId: 'foundation-mobile-call',
    },
    quoteCta: {
      label: 'Free Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'foundation-mobile-quote',
    },
  },
  relatedServiceLink: {
    label: 'Foundation excavation services',
    href: '/services/foundation-excavation',
  },
} satisfies LandingPageData;
