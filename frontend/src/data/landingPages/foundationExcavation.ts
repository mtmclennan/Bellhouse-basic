import type { LandingPageData } from './types';

export const foundationExcavationLandingPage = {
  slug: 'foundation-excavation-brantford',
  serviceName: 'Foundation Excavation',
  serviceKey: 'foundation-excavation',
  seo: {
    title: 'Foundation Excavation Brantford | Bellhouse Excavating',
    description:
      'Foundation excavation, haul-out, backfill, and site prep support for Brantford and Brant County builds.',
    noindex: true,
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
      label: '519-752-8500',
      href: 'tel:5197528500',
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
    eyebrow: 'Foundation Excavation - Brantford Area',
    titleHighlight: 'Foundation Excavation',
    title: 'in Brantford & Brant County',
    subtitle:
      'Excavation, trucking, backfill, and site prep for new homes, additions, garages, shops, farm buildings, and builder projects across Brantford and Brant County.',
    bullets: [
      'Residential foundations, basements, footings, garage pads, and additions',
      'Spoil haul-out and material delivery planned with the dig',
      'Tighter properties reviewed for equipment access, trucking, and spoil handling',
    ],
    primaryCta: {
      label: 'Request a Foundation Excavation Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'foundation-hero-quote',
    },
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
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
      'Send the site location, timing, drawings, and access details so Bellhouse can review the practical excavation and trucking approach.',
    submitLabel: 'Request My Foundation Excavation Quote',
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
        defaultValue: 'Foundation excavation',
        options: [
          'Foundation excavation',
          'Residential foundation excavation',
          'Basement excavation',
          'Garage or slab excavation',
          'Footings or addition',
          'Backfill and grading',
          'Rural or large-lot foundation work',
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
      { label: 'Local excavation and trucking', icon: 'truck' },
      { label: 'Clean, well-maintained equipment', icon: 'shield-check' },
      { label: 'Practical jobsite communication', icon: 'chat-circle' },
      { label: '5.0 rating on Google', icon: 'star' },
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
    heading: 'Priced around the site, not a flat rate',
    intro:
      'Excavation is quoted on three things first — then refined by the conditions below once we see the site.',
    basis: [
      { icon: 'path',  kicker: 'By access',   title: 'Lot, staging & equipment fit' },
      { icon: 'stack', kicker: 'By volume',   title: 'Depth & total cut moved' },
      { icon: 'truck', kicker: 'By haul-out', title: 'Loads & disposal distance' },
    ],
    factors: [
      {
        title: 'Access',
        description: 'Tight lots, slopes, and staging change the equipment and time needed.',
      },
      {
        title: 'Depth & volume',
        description: 'How much material is cut and moved drives both labour and truck loads.',
      },
      {
        title: 'Soil conditions',
        description: 'Clay, rock, or wet ground affects how the dig has to be handled.',
      },
      {
        title: 'Disposal',
        description: 'Where spoil goes and tipping fees factor into haul-out cost.',
      },
      {
        title: 'Drawings',
        description: 'Engineered plans and elevations help us scope and quote accurately.',
      },
      {
        title: 'Material',
        description: 'Imported gravel, granular, or topsoil is priced by type and tonnage.',
      },
      {
        title: 'Site conditions',
        description: 'Weather, season, and existing structures shape the approach.',
      },
    ],
    rail: {
      eyebrow: 'The honest version',
      heading: 'You get the number for your job — not a placeholder',
      body: 'Share your site details, photos, or drawings and we\'ll review access, depth, soil, and disposal before quoting.',
      anchorLabel: 'Where your job sits',
      anchorLow: { value: 'Smaller jobs', sub: 'Garage pad & shallow footings' },
      anchorHigh: { value: 'Larger jobs', sub: 'Full basement, haul-out & backfill' },
      chips: ['No charge to quote', 'Reply in ~1 business day'],
      cta: {
        label: 'Get My Site Quoted',
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
        src: '/assets/services/foundation-excavation/Foundation-footings-excavation-paris.webp',
        alt: 'Excavator digging a foundation',
        caption: 'Foundation excavation',
      },
      {
        src: '/assets/services/foundation-excavation/garage-foundation-excavation-residential-site-brant.webp',
        alt: 'Excavator loading material into a triaxle truck',
        caption: 'Haul-out coordination',
      },
      {
        src: '/assets/services/foundation-excavation/foundation-backfilling-lifts-ontario-garage-house.webp',
        alt: 'Backfill and compaction equipment beside a foundation',
        caption: 'Backfill and compaction',
      },
      {
        src: '/assets/services/foundation-excavation/barn-shop-foundation-subgrade-laser-level-floor-concrete.webp',
        alt: 'Dozer pushing dirt while grading a site',
        caption: 'Site grading and cut/fill',
      },
      {
        src: '/assets/finished-garage-foundation-excavation-backfilled-for-slab.webp',
        alt: 'Finished foundation excavation backfilled and graded for a slab',
        caption: 'Graded and ready for slab',
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
          'Yes. Bellhouse handles in-town and residential foundation excavation where access can be managed. Tighter properties may require a different equipment, trucking, or spoil-handling approach, so send the location or plans and Bellhouse can review access before confirming the scope.',
      },
    ],
  },
  finalCta: {
    eyebrow: 'Get Started',
    heading: 'Ready to quote your Brantford-area foundation excavation?',
    body: 'Send the site details, drawings, timing, and access notes, or call Bellhouse to talk through the excavation, hauling, and access plan.',
    primaryCta: {
      label: 'Request a Foundation Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'foundation-final-quote',
    },
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'foundation-final-phone',
    },
  },
  footer: {
    logoLabel: 'Bellhouse Excavating',
    serviceLine: 'Foundation excavation, backfill, grading, and trucking',
    locationLine: 'Serving Brantford, Brant County, and nearby areas',
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'foundation-footer-phone',
    },
  },
  mobileBar: {
    callCta: {
      label: 'Call',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'foundation-mobile-call',
    },
    textCta: {
      label: 'Text Us',
      href: 'sms:5197528500',
      variant: 'primary',
      trackingId: 'foundation-mobile-text',
    },
  },
} satisfies LandingPageData;
