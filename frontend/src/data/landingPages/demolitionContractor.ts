import type { LandingPageData } from './types';

export const demolitionContractorLandingPage = {
  slug: 'demolition-contractor-brantford',
  serviceName: 'Demolition Contractor',
  serviceKey: 'demolition-contractor',
  seo: {
    title: 'Demolition Contractor Brantford | Bellhouse Excavating',
    description:
      'Demolition, removal, trucking, and site cleanup support for Brantford and Brant County properties.',
    noindex: true,
    canonical: '/landing/demolition-contractor-brantford',
    ogImage: {
      src: '/assets/house-demolition-excavator-brant-county.png',
      alt: 'Bellhouse excavator working on a demolition project near Brantford',
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
      trackingId: 'demo-header-phone',
    },
    quoteCta: {
      label: 'Free Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'demo-header-quote',
    },
  },
  hero: {
    eyebrow: 'Serving Brantford and Brant County',
    titleHighlight: 'Demolition Contractor',
    title: 'in Brantford',
    subtitle:
      'Demolition, removal, trucking, and site cleanup handled with practical planning around access, debris, neighbours, and the next phase of work.',
    bullets: [
      'House, barn, outbuilding, and small structure demolition',
      'Debris removal and trucking coordinated with the tear-down',
      'Site cleanup and grading support after demolition',
    ],
    primaryCta: {
      label: 'Request a Demolition Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'demo-hero-quote',
    },
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'demo-hero-phone',
    },
    backgroundImage: {
      src: '/assets/house-demolition-excavator-brant-county.png',
      alt: 'Excavator working on a demolition site in Brant County',
      width: 1600,
      height: 900,
      priority: true,
    },
  },
  form: {
    id: 'demolition-contractor-quote',
    heading: 'Get a demolition quote',
    description:
      'Send the structure type, location, access details, timing, and any photos so Bellhouse can review the job.',
    submitLabel: 'Request My Demolition Quote',
    successMessage:
      'Thanks. Bellhouse will review the demolition details and follow up shortly.',
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
          'House demolition',
          'Barn demolition',
          'Garage or shed demolition',
          'Concrete or foundation removal',
          'Interior or partial demolition',
          'Other demolition work',
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
          'Tell us about the structure, approximate size, utilities, foundation removal, cleanup, access, and timing.',
        width: 'full',
      },
      {
        name: 'files',
        label: 'Photos or documents',
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
      { label: 'Demolition and haul-out coordinated', icon: 'truck' },
      { label: 'Site access reviewed before work', icon: 'map-pin' },
      { label: 'Efficient cleanup and removal', icon: 'broom' },
      { label: '5.0 rating on Google', icon: 'star' },
    ],
  },
  audience: {
    eyebrow: 'Who it is for',
    heading: 'Demolition support for owners, builders, and contractors',
    intro:
      'Bellhouse helps remove structures and debris so the site can move toward cleanup, grading, rebuilding, or sale.',
    items: [
      {
        title: 'Property owners',
        description: 'Older houses, garages, barns, sheds, and unwanted site structures.',
        icon: 'house-line',
      },
      {
        title: 'Builders',
        description: 'Tear-down and removal before redevelopment, additions, or new construction.',
        icon: 'hard-hat',
      },
      {
        title: 'General contractors',
        description: 'Demolition and hauling support coordinated around the project schedule.',
        icon: 'blueprint',
      },
      {
        title: 'Rural properties',
        description: 'Barns, outbuildings, concrete, and cleanup work where access and hauling matter.',
        icon: 'barn',
      },
    ],
  },
  handles: {
    eyebrow: 'What Bellhouse handles',
    heading: 'Demolition with removal planned from the start',
    intro:
      'The work is scoped around what is coming down, what needs to leave the site, and what condition the site should be left in.',
    items: [
      {
        title: 'Structure demolition',
        description: 'Homes, garages, sheds, barns, and other site structures reviewed by scope.',
        icon: 'buildings',
      },
      {
        title: 'Material separation',
        description: 'Debris handling planned around disposal needs and site conditions.',
        icon: 'arrows-split',
      },
      {
        title: 'Debris haul-out',
        description: 'Trucking coordinated so material leaves the site efficiently.',
        icon: 'truck',
      },
      {
        title: 'Concrete removal',
        description: 'Slabs, foundations, and hardscape removal considered when part of the job.',
        icon: 'hammer',
      },
      {
        title: 'Rough grading',
        description: 'Basic cleanup and shaping after demolition so the site is workable.',
        icon: 'ruler',
      },
      {
        title: 'Site cleanup',
        description: 'A cleaner, safer handoff for the next project step.',
        icon: 'broom',
      },
    ],
  },
  pricing: {
    eyebrow: 'What affects price',
    heading: 'Demolition pricing depends on more than size',
    intro:
      'A useful demolition quote needs structure details, access, material type, disposal needs, and site cleanup expectations.',
    factors: [
      {
        title: 'Structure type and material',
        description: 'Wood, concrete, brick, metal, and mixed debris all affect removal and disposal.',
      },
      {
        title: 'Access and neighbours',
        description: 'Tight lots, shared driveways, overhead lines, and nearby structures shape the plan.',
      },
      {
        title: 'Utilities and permits',
        description: 'Disconnected services, local requirements, and documentation can affect timing.',
      },
      {
        title: 'Debris volume',
        description: 'Truck loads, sorting, disposal, and tipping fees are major cost factors.',
      },
      {
        title: 'Final site condition',
        description: 'Cleanup, concrete removal, backfill, and rough grading can be included as needed.',
      },
    ],
    sideNote: {
      heading: 'Photos help price demolition faster',
      body: 'Exterior photos, structure dimensions, access notes, and disposal expectations help Bellhouse understand the job before visiting.',
      cta: {
        label: 'Send Demolition Details',
        href: '#landing-quote',
        variant: 'primary',
        trackingId: 'demo-pricing-quote',
      },
    },
  },
  proof: {
    eyebrow: 'Proof',
    heading: 'Demolition backed by trucking and cleanup',
    intro:
      'Bellhouse pairs demolition work with hauling support so debris removal is not an afterthought.',
    stats: [
      { value: 'Demo', label: 'Houses, barns, garages, and outbuildings' },
      { value: 'Haul', label: 'Debris removal and trucking coordination' },
      { value: 'Clean', label: 'Practical site cleanup after removal' },
      { value: 'Local', label: 'Brantford and Brant County support' },
    ],
    gallery: [
      {
        src: '/assets/house-demolition-excavator-brant-county.png',
        alt: 'Excavator demolishing a house in Brant County',
        caption: 'Structure demolition',
      },
      {
        src: '/assets/house-demolition-excavator-paris-ontario.jpg',
        alt: 'Excavator working on a demolition site near Paris Ontario',
        caption: 'Demolition support',
      },
      {
        src: '/assets/demo1.jpg',
        alt: 'Demolition and removal work on a jobsite',
        caption: 'Removal and cleanup',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Demolition questions',
    items: [
      {
        question: 'Can Bellhouse haul away demolition debris?',
        answer:
          'Yes. Demolition and haul-out can be coordinated together so debris removal is planned into the job.',
      },
      {
        question: 'Do utilities need to be disconnected first?',
        answer:
          'Utilities and site safety requirements should be handled before demolition begins. Bellhouse can discuss what needs to be ready during the quote process.',
      },
      {
        question: 'Can the site be graded after demolition?',
        answer:
          'Yes. Cleanup, rough grading, and related excavation work can be included depending on what the site needs next.',
      },
    ],
  },
  finalCta: {
    eyebrow: 'Get Started',
    heading: 'Ready to quote your demolition project?',
    body: 'Send photos, location, timing, and structure details, or call Bellhouse to talk through the job directly.',
    primaryCta: {
      label: 'Request a Demolition Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'demo-final-quote',
    },
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'demo-final-phone',
    },
  },
  footer: {
    logoLabel: 'Bellhouse Excavating',
    serviceLine: 'Demolition, debris removal, trucking, cleanup, and grading support',
    locationLine: 'Serving Brantford, Brant County, and nearby areas',
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'demo-footer-phone',
    },
  },
  mobileBar: {
    callCta: {
      label: 'Call',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'demo-mobile-call',
    },
    textCta: {
      label: 'Text Us',
      href: 'sms:5197528500',
      variant: 'primary',
      trackingId: 'demo-mobile-text',
    },
  },
} satisfies LandingPageData;
