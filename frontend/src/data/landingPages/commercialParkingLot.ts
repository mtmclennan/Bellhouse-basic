import type { LandingPageData } from './types';

export const commercialParkingLotLandingPage = {
  slug: 'commercial-parking-lot-brantford',
  serviceName: 'Commercial Parking Lot Construction',
  serviceKey: 'parking-lot',
  seo: {
    title: 'Commercial Parking Lot Construction Brantford | Bellhouse',
    description:
      'Commercial parking lot construction in Brantford and Brant County. Base excavation, gravel lots, drainage, compaction, and asphalt coordination.',
    noindex: true,
    canonical: '/landing/commercial-parking-lot-brantford',
    ogImage: {
      // Placeholder: replace with a real parking lot job photo when available.
      src: '/assets/driveway-parking-lot-construction.jpg',
      alt: 'Commercial parking lot base preparation and gravel surface construction',
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
      trackingId: 'parking-lot-header-phone',
    },
    quoteCta: {
      label: 'Free Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'parking-lot-header-quote',
    },
  },
  hero: {
    eyebrow: 'Brantford & Brant County',
    titleHighlight: 'Commercial Parking Lot Base Prep',
    title: 'in Brantford & Brant County',
    subtitle:
      'Base excavation, gravel surface preparation, aggregate placement, rough grading, and drainage-aware earthworks for commercial sites. Paving, line marking, and full civil scopes must be reviewed separately.',
    bullets: [
      'New commercial and industrial parking lots',
      'Gravel surface lots built and compacted',
      'Asphalt lots coordinated through trusted paving partners',
      'Drainage designed into every project',
    ],
    primaryCta: {
      label: 'Request a Parking Lot Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'parking-lot-hero-quote',
    },
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'parking-lot-hero-phone',
    },
    backgroundImage: {
      // Placeholder: replace with a real parking lot job photo when available.
      src: '/assets/driveway-parking-lot-construction.jpg',
      alt: 'Prepared gravel parking lot base for commercial site work',
      width: 1600,
      height: 900,
      priority: true,
    },
  },
  form: {
    id: 'commercial-parking-lot-quote',
    heading: 'Get a parking lot quote',
    description:
      'Send the site location, surface type, access details, timing, and any drainage concerns.',
    submitLabel: 'Request My Parking Lot Quote',
    successMessage:
      'Thanks. Bellhouse will review the parking lot details and follow up shortly.',
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
          'New asphalt parking lot',
          'New gravel parking lot',
          'Industrial yard or equipment parking',
          'Parking lot expansion',
          'Drainage and base reconstruction',
          'Other commercial parking lot work',
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
          'Tell us about the lot size, surface type, current site condition, drainage needs, access, and timing.',
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
      { label: 'Commercial and industrial lots', icon: 'buildings' },
      { label: 'Gravel surfaces built in-house', icon: 'stack' },
      { label: 'Asphalt coordinated through paving partners', icon: 'path' },
      { label: 'Drainage planned into the scope', icon: 'drop' },
    ],
  },
  audience: {
    eyebrow: 'Who it is for',
    heading: 'Parking lots for commercial and industrial properties',
    intro:
      'Bellhouse is set up for projects with room for equipment, trucks, material staging, and real site work.',
    items: [
      {
        title: 'Commercial property owners',
        description: 'New lots, expansions, and surface upgrades for business properties.',
        icon: 'buildings',
      },
      {
        title: 'Industrial operators',
        description: 'Parking and yard surfaces for warehouses, equipment, staff, and truck movement.',
        icon: 'truck',
      },
      {
        title: 'Developers and builders',
        description: 'Parking lot construction coordinated with broader commercial site work.',
        icon: 'hard-hat',
      },
      {
        title: 'Growing businesses',
        description: 'Site expansion support when parking, access, or drainage needs to improve.',
        icon: 'blueprint',
      },
    ],
  },
  handles: {
    eyebrow: 'What Bellhouse handles',
    heading: 'Full parking lot scope with the right partners involved',
    intro:
      'Bellhouse handles excavation, granular base, gravel surfacing, drainage, and compaction. Asphalt is coordinated through trusted paving partners.',
    items: [
      {
        title: 'Site clearing and grading',
        description: 'Existing material removed or reshaped so the lot starts from a workable base.',
        icon: 'shovel',
      },
      {
        title: 'Subgrade preparation',
        description: 'Soft spots, grade changes, and unsuitable material are reviewed before base goes in.',
        icon: 'ruler',
      },
      {
        title: 'Granular base installation',
        description: 'Aggregate placed and compacted to support the finished parking surface.',
        icon: 'stack',
      },
      {
        title: 'Gravel surface construction',
        description: 'Gravel lots are built, graded, and compacted directly by Bellhouse.',
        icon: 'truck',
      },
      {
        title: 'Drainage planning',
        description: 'Slope, drainage paths, and stormwater movement are considered as part of the scope.',
        icon: 'drop',
      },
      {
        title: 'Asphalt coordination',
        description: 'For paved lots, Bellhouse coordinates asphalt through trusted paving partners.',
        icon: 'path',
      },
      {
        title: 'Line marking coordination',
        description: 'Finished lot details can be coordinated so the project is ready for use.',
        icon: 'check-circle',
      },
    ],
  },
  pricing: {
    eyebrow: 'What affects price',
    heading: 'Priced around the lot, surface, drainage, and base',
    intro:
      'Parking lot pricing depends on the site conditions, size, surface type, and how much base and drainage work is needed.',
    basis: [
      { icon: 'ruler', kicker: 'By size', title: 'Lot area and layout' },
      { icon: 'stack', kicker: 'By base', title: 'Depth, aggregate, and compaction' },
      { icon: 'drop', kicker: 'By drainage', title: 'Slope, water movement, and tie-ins' },
    ],
    factors: [
      {
        title: 'Lot size and surface area',
        description: 'The total area drives excavation, aggregate volume, compaction time, and finishing scope.',
      },
      {
        title: 'Existing site conditions',
        description: 'Soft ground, organics, old material, or poor grade can add excavation and prep work.',
      },
      {
        title: 'Base depth required',
        description: 'Commercial and industrial traffic may require deeper base construction than light-use areas.',
      },
      {
        title: 'Surface type',
        description: 'Gravel surface lots and asphalt lots are scoped differently, with asphalt coordinated through paving partners.',
      },
      {
        title: 'Drainage requirements',
        description: 'Slope, drainage channels, and stormwater management affect both layout and construction.',
      },
      {
        title: 'Material haul distance',
        description: 'Aggregate delivery, spoil removal, and truck movement affect the final quote.',
      },
    ],
    rail: {
      eyebrow: 'The honest version',
      heading: 'The right fit is a real site project, not a small patch',
      body: 'Bellhouse is a strong fit for commercial and industrial lots, gravel yards, equipment parking, and projects with room for trucks and machines.',
      anchorLabel: 'Where your project fits',
      anchorLow: { value: 'Review scope', sub: 'Small lots or resurfacing only' },
      anchorHigh: { value: 'Best fit', sub: 'New lots, gravel yards, drainage, and base work' },
      chips: ['No charge to quote', 'Call or text Darryl directly', 'Not sure it fits? Send photos'],
      cta: {
        label: 'Get My Lot Quoted',
        href: '#landing-quote',
        variant: 'primary',
        trackingId: 'parking-lot-pricing-quote',
      },
    },
  },
  proof: {
    eyebrow: 'Project fit',
    heading: 'Built for sites with scope, access, and material movement',
    intro:
      'The best parking lot projects for Bellhouse involve base construction, gravel surfacing, drainage, and enough room to work efficiently.',
    stats: [
      { value: 'Best fit', label: 'New commercial and industrial parking lots' },
      { value: 'Gravel', label: 'Surface lots for farms, equipment yards, and industrial properties' },
      { value: 'Drainage', label: 'Industrial yards and lots with water management needs' },
      { value: 'Review scope', label: 'Resurfacing only, or tiny lots with no staging room' },
    ],
    gallery: [
      {
        src: '/assets/driveway-parking-lot-construction.jpg',
        alt: 'Gravel parking lot and access surface under construction',
        caption: 'Parking lot base construction',
      },
      {
        src: '/assets/aggregates.jpg',
        alt: 'Aggregate material used for parking lot base construction',
        caption: 'Granular base material',
      },
      {
        src: '/assets/dump-truck-delivery-service.jpg',
        alt: 'Dump truck delivering aggregate for commercial site work',
        caption: 'Material delivery',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Commercial parking lot questions',
    items: [
      {
        question: 'Do you do the full parking lot or just the base?',
        answer:
          'Full scope. Bellhouse handles base excavation, gravel surface lots we install ourselves, and asphalt coordination through trusted paving partners. You deal with one contractor managing the complete project.',
      },
      {
        question: 'Can you build a gravel parking lot without asphalt?',
        answer:
          'Yes. Gravel surface lots are a common choice for industrial yards, equipment storage, farms, and commercial properties. Bellhouse grades, bases, surfaces, and compacts gravel lots.',
      },
      {
        question: 'Do you handle drainage on parking lots?',
        answer:
          'Yes. Drainage is designed into every parking lot project. Proper slope, drainage paths, and stormwater management are part of the scope.',
      },
      {
        question: 'What size lots do you work on?',
        answer:
          'Bellhouse is set up for commercial and industrial scale, especially where equipment, trucks, base work, drainage, and material staging matter. Smaller or tighter lots can still be reviewed, but resurfacing-only work or jobs with no practical access may need a different contractor.',
      },
      {
        question: 'How long does parking lot construction take?',
        answer:
          'A standard commercial lot typically takes 1 to 2 weeks from start to finished surface, depending on size, drainage, surface type, and site conditions.',
      },
      {
        question: 'Do you coordinate the asphalt or do we need to find our own paving contractor?',
        answer:
          'Bellhouse coordinates asphalt through trusted paving partners. You deal with one contractor, Bellhouse, and we manage the rest.',
      },
    ],
  },
  finalCta: {
    eyebrow: 'Get Started',
    heading: 'Get a Quote on Your Parking Lot Project',
    body: 'Call or text Darryl directly, or fill out the form and we will get back to you the same day.',
    primaryCta: {
      label: 'Request a Parking Lot Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'parking-lot-final-quote',
    },
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'parking-lot-final-phone',
    },
  },
  footer: {
    logoLabel: 'Bellhouse Excavating',
    serviceLine: 'Commercial parking lot construction, gravel lots, drainage, base prep, and asphalt coordination',
    locationLine:
      'Serving Brantford, Brant County, Paris, Hamilton, Cambridge, and surrounding areas',
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'parking-lot-footer-phone',
    },
  },
  mobileBar: {
    callCta: {
      label: 'Call',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'parking-lot-mobile-call',
    },
    textCta: {
      label: 'Text Us',
      href: 'sms:5197528500',
      variant: 'primary',
      trackingId: 'parking-lot-mobile-text',
    },
  },
} satisfies LandingPageData;
