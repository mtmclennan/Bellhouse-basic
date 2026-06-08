import type { LandingPageData } from './types';

export const concreteSlabPrepLandingPage = {
  slug: 'concrete-slab-base-preparation-brantford',
  serviceName: 'Concrete Slab Base Preparation',
  serviceKey: 'concrete-slab-base-preparation',
  seo: {
    title: 'Concrete Slab Base Preparation Brantford | Bellhouse Excavating',
    description:
      'Excavation, grading, granular base, and compaction support for concrete slab preparation in Brantford and Brant County.',
    noindex: true,
    canonical: '/landing/concrete-slab-base-preparation-brantford',
    ogImage: {
      src: '/assets/grading-driveway-laser-level.jpg',
      alt: 'Bellhouse grading a prepared base for concrete work',
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
      trackingId: 'slab-header-phone',
    },
    quoteCta: {
      label: 'Free Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'slab-header-quote',
    },
  },
  hero: {
    eyebrow: 'Serving Brantford and Brant County',
    titleHighlight: 'Concrete Slab Prep',
    title: 'in Brantford',
    subtitle:
      'Excavation, grading, granular placement, and compaction support for garages, shops, driveways, pads, and concrete flatwork.',
    bullets: [
      'Cut, fill, grading, and granular base support',
      'Truck delivery coordinated with site access and schedule',
      'Prepared base conditions for concrete contractors and builders',
    ],
    primaryCta: {
      label: 'Request a Slab Prep Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'slab-hero-quote',
    },
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'slab-hero-phone',
    },
    backgroundImage: {
      src: '/assets/grading-driveway-laser-level.jpg',
      alt: 'Prepared and graded base for concrete slab work',
      width: 1600,
      height: 900,
      priority: true,
    },
  },
  form: {
    id: 'concrete-slab-base-prep-quote',
    heading: 'Get a slab base preparation quote',
    description:
      'Share the slab type, approximate size, access, timing, and any drawings or elevations.',
    submitLabel: 'Request My Slab Prep Quote',
    successMessage:
      'Thanks. Bellhouse will review the slab base preparation details and follow up shortly.',
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
          'Garage slab',
          'Shop or building pad',
          'Driveway or parking area',
          'Concrete patio or walkway',
          'Commercial slab prep',
          'Other concrete base prep',
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
          'Tell us about the slab size, garage/shop/pad type, excavation needed, granular base, access, and timing.',
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
      { label: 'Excavation and granular delivery', icon: 'truck' },
      { label: 'Grading and base preparation', icon: 'ruler' },
      { label: 'Practical schedule coordination', icon: 'calendar-check' },
      { label: '5.0 rating on Google', icon: 'star' },
    ],
  },
  audience: {
    eyebrow: 'Who it is for',
    heading: 'Base prep for concrete-ready projects',
    intro:
      'Bellhouse supports concrete contractors, builders, and property owners who need the base ready before forms and concrete arrive.',
    items: [
      {
        title: 'Concrete contractors',
        description: 'Base prep, access, granular placement, and grading before forming and pouring.',
        icon: 'wall',
      },
      {
        title: 'Home builders',
        description: 'Garage slabs, shop pads, additions, and concrete areas on active build sites.',
        icon: 'hard-hat',
      },
      {
        title: 'Property owners',
        description: 'Driveways, parking areas, outbuildings, and practical site improvements.',
        icon: 'buildings',
      },
      {
        title: 'General contractors',
        description: 'Reliable excavation and base support that fits the wider project schedule.',
        icon: 'blueprint',
      },
    ],
  },
  handles: {
    eyebrow: 'What Bellhouse handles',
    heading: 'The work before the concrete work',
    intro:
      'The base is planned around grade, drainage, granular depth, access, and what the next trade needs.',
    items: [
      {
        title: 'Cut and excavation',
        description: 'Unsuitable material removed and grade prepared for the base depth required.',
        icon: 'shovel',
      },
      {
        title: 'Granular delivery',
        description: 'Base material delivered and staged so the job keeps moving.',
        icon: 'truck',
      },
      {
        title: 'Grading',
        description: 'Rough and finish grading shaped around drainage and final concrete elevation.',
        icon: 'ruler',
      },
      {
        title: 'Compaction support',
        description: 'Material placed and prepared in practical lifts for a stable base.',
        icon: 'stack',
      },
      {
        title: 'Drainage awareness',
        description: 'Slope and surrounding grades reviewed so water does not become an afterthought.',
        icon: 'drop',
      },
      {
        title: 'Site handoff',
        description: 'The prepared area is left ready for forming, reinforcement, or the next step.',
        icon: 'check-circle',
      },
    ],
  },
  pricing: {
    eyebrow: 'What affects price',
    heading: 'Slab base pricing depends on prep conditions',
    intro:
      'Base prep changes with the current grade, material depth, access, trucking, and drainage requirements.',
    factors: [
      {
        title: 'Current site condition',
        description: 'Existing grade, soft spots, organics, and material that needs to be removed.',
      },
      {
        title: 'Base depth and material',
        description: 'Granular type, thickness, and compaction approach affect tonnage and time.',
      },
      {
        title: 'Drainage and slope',
        description: 'Finished grade, water movement, and tie-ins shape the prep work.',
      },
      {
        title: 'Access and trucking',
        description: 'Truck reach, equipment access, and staging room affect delivery and placement.',
      },
      {
        title: 'Coordination with concrete timing',
        description: 'The work may need to line up with forming, inspection, and pour schedules.',
      },
    ],
    sideNote: {
      heading: 'A better quote starts with the slab details',
      body: 'Approximate size, current site photos, desired base depth, and timing help Bellhouse price the real prep work.',
      cta: {
        label: 'Send Slab Prep Details',
        href: '#landing-quote',
        variant: 'primary',
        trackingId: 'slab-pricing-quote',
      },
    },
  },
  proof: {
    eyebrow: 'Proof',
    heading: 'Prepared for the work that follows',
    intro:
      'Bellhouse focuses on practical site conditions: clean access, shaped grade, granular support, and clear handoff.',
    stats: [
      { value: 'Base', label: 'Granular placement and grading support' },
      { value: 'Truck', label: 'Material delivery coordinated with site access' },
      { value: 'Grade', label: 'Drainage and elevation details reviewed' },
      { value: 'Ready', label: 'Prepared handoff for the next trade' },
    ],
    gallery: [
      {
        src: '/assets/grading-driveway-laser-level.jpg',
        alt: 'Laser grading for a prepared base',
        caption: 'Laser grading',
      },
      {
        src: '/assets/aggregates.jpg',
        alt: 'Aggregate material for site preparation',
        caption: 'Granular material',
      },
      {
        src: '/assets/driveway-parking-lot-construction.jpg',
        alt: 'Prepared driveway or parking area base',
        caption: 'Base preparation',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Concrete base prep questions',
    items: [
      {
        question: 'Can Bellhouse prepare the base before my concrete contractor arrives?',
        answer:
          'Yes. Bellhouse can handle excavation, granular delivery, grading, and preparation so the site is ready for the next step.',
      },
      {
        question: 'Do I need to know the exact granular depth?',
        answer:
          'If you have drawings or a concrete contractor specification, include it. If not, Bellhouse can review the site and discuss a practical approach.',
      },
      {
        question: 'Can you help with drainage and slope?',
        answer:
          'Yes. Drainage and surrounding grades are part of the prep conversation because they affect how the finished concrete area performs.',
      },
    ],
  },
  finalCta: {
    eyebrow: 'Get Started',
    heading: 'Ready to quote your slab base prep?',
    body: 'Send the slab size, access details, timing, and photos, or call Bellhouse to talk through the site.',
    primaryCta: {
      label: 'Request a Slab Prep Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'slab-final-quote',
    },
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'slab-final-phone',
    },
  },
  footer: {
    logoLabel: 'Bellhouse Excavating',
    serviceLine: 'Concrete slab base preparation, grading, granular delivery, and compaction support',
    locationLine: 'Serving Brantford, Brant County, and nearby areas',
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'slab-footer-phone',
    },
  },
  mobileBar: {
    callCta: {
      label: 'Call',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'slab-mobile-call',
    },
    textCta: {
      label: 'Text Us',
      href: 'sms:5197528500',
      variant: 'primary',
      trackingId: 'slab-mobile-text',
    },
  },
} satisfies LandingPageData;
