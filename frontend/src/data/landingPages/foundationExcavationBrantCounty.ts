import type { LandingPageData } from './types';

export const foundationExcavationBrantCountyLandingPage = {
  slug: 'foundation-excavation-brant-county',
  serviceName: 'Foundation Excavation in Brant County',
  serviceKey: 'foundation-excavation',
  seo: {
    title: 'Foundation Excavation Brant County | Bellhouse Excavating',
    description:
      'Foundation excavation, haul-out, backfill, and rough grading for homes, additions, garages, farms, shops, and builder projects across Brant County.',
    noindex: true,
    canonical: '/landing/foundation-excavation-brant-county',
    ogImage: {
      src: '/assets/foundation-excavation-dump-truck-loading-brantford.webp',
      alt: 'Bellhouse excavator loading a dump truck during a foundation excavation project in Brant County',
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
      trackingId: 'foundation-county-header-phone',
    },
    quoteCta: {
      label: 'Free Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'foundation-county-header-quote',
    },
  },
  hero: {
    eyebrow: 'Foundation Excavation - Brant County',
    titleHighlight: 'Foundation Excavation',
    title: 'in Brant County',
    subtitle:
      'Bellhouse handles foundation excavation, haul-out, backfill, and rough grading for new homes, additions, garages, farm buildings, shops, and builder projects throughout Brant County.',
    bullets: [
      'Residential, rural, acreage, farm, and builder foundation excavation',
      'Especially well equipped for larger lots and projects requiring trucking and material handling',
      'Excavation, haul-out, backfill, and rough grading coordinated together',
    ],
    primaryCta: {
      label: 'Request a Foundation Excavation Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'foundation-county-hero-quote',
    },
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'foundation-county-hero-phone',
    },
    backgroundImage: {
      src: '/assets/foundation-excavation-dump-truck-loading-brantford.webp',
      alt: 'Excavator loading a dump truck during foundation excavation on a Brant County property',
      width: 1600,
      height: 900,
      priority: true,
    },
  },
  form: {
    id: 'foundation-excavation-brant-county-quote',
    heading: 'Get a Brant County foundation excavation quote',
    description:
      'Send the property location, building type, timing, access notes, and whether plans are available.',
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
        placeholder: 'Town, road, address, or nearest intersection',
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
          'Garage or addition foundation',
          'Rural foundation excavation',
          'Acreage home foundation',
          'Farm shop or barn foundation',
          'Agricultural building foundation',
          'Subdivision foundation contract',
          'Backfill and rough grading',
          'Other foundation work',
        ],
      },
      {
        name: 'timeline',
        label: 'Approximate start date',
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
        name: 'plansStatus',
        label: 'Plans or drawings',
        type: 'select',
        width: 'half',
        options: [
          'Plans are available',
          'Plans are in progress',
          'No drawings yet',
          'Not sure',
        ],
      },
      {
        name: 'siteAccess',
        label: 'Site access',
        type: 'select',
        width: 'half',
        options: [
          'Clear truck and machine access',
          'Limited access',
          'Sloped or wet access',
          'Not sure yet',
        ],
      },
      {
        name: 'haulOut',
        label: 'Excess material',
        type: 'select',
        width: 'half',
        options: [
          'Haul-out likely needed',
          'Material can stay on site',
          'Some material can stay on site',
          'Not sure yet',
        ],
      },
      {
        name: 'details',
        label: 'Project details',
        type: 'textarea',
        placeholder:
          'Tell us about the foundation type, building size, new construction or addition, depth, soil, access, staging room, and timing.',
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
      { label: 'Residential, rural, and acreage foundations', icon: 'map-trifold' },
      { label: 'Excavation, trucking, and backfill', icon: 'truck' },
      { label: 'Built around access and staging', icon: 'path' },
      { label: 'Clean, well-maintained equipment', icon: 'shield-check' },
    ],
  },
  audience: {
    eyebrow: 'Who it is for',
    heading: 'Foundation excavation for homeowners, farms, and builders',
    intro:
      'Bellhouse handles Brant County foundation excavation for homeowners, builders, farms, and larger sites, with particular strength where equipment, trucks, spoil handling, and material staging can be planned clearly.',
    items: [
      {
        title: 'Homeowners',
        description: 'New homes, additions, garages, acreage homes, and private builds where access and scope can be reviewed clearly.',
        icon: 'house-line',
      },
      {
        title: 'Farm operators',
        description: 'Foundation excavation for shops, barns, and agricultural buildings.',
        icon: 'buildings',
      },
      {
        title: 'Subdivision builders',
        description: 'Foundation excavation, haul-out, backfill, and rough grading support for multiple starts.',
        icon: 'hard-hat',
      },
      {
        title: 'Custom home builders',
        description: 'Home foundations of any size where access, depth, staging, and schedule matter — especially rural and estate builds.',
        icon: 'blueprint',
      },
    ],
  },
  handles: {
    eyebrow: 'What Bellhouse handles',
    heading: 'Foundation excavation with truck access planned from the start',
    intro:
      'The work is scoped around foundation depth, soil, spoil movement, backfill, rough grading, and how trucks and machines will move safely on the property.',
    items: [
      {
        title: 'Foundation excavation',
        description: 'Basements, walkouts, crawl spaces, shops, barns, and larger building foundations excavated to plan.',
        icon: 'shovel',
      },
      {
        title: 'Spoil loading and haul-out',
        description: 'Excavated material loaded and hauled as part of the foundation scope.',
        icon: 'truck',
      },
      {
        title: 'Drainage coordination',
        description: 'Foundation-area drainage and grading needs can be coordinated around the excavation schedule.',
        icon: 'drop',
      },
      {
        title: 'Backfill support',
        description: 'Backfill after foundation work is complete, coordinated under the same excavation scope.',
        icon: 'stack',
      },
      {
        title: 'Rough grading',
        description: 'Rough shaping around the new foundation so the site is workable after the dig.',
        icon: 'ruler',
      },
      {
        title: 'Access and staging planning',
        description: 'Truck movement, equipment access, and material staging reviewed before scheduling.',
        icon: 'map-trifold',
      },
    ],
  },
  pricing: {
    eyebrow: 'What affects price',
    heading: 'Priced around depth, soil, access, and material movement',
    intro:
      'Foundation excavation depends on the size of the dig, what comes out of the ground, where it goes, and how the site can be accessed.',
    basis: [
      { icon: 'ruler', kicker: 'By foundation', title: 'Size, depth, and elevations' },
      { icon: 'truck', kicker: 'By hauling', title: 'Spoil movement and backfill' },
      { icon: 'path', kicker: 'By access', title: 'Truck room, staging, and site layout' },
    ],
    factors: [
      {
        title: 'Foundation size and depth',
        description: 'Full basements, walkouts, shops, barns, and agricultural buildings all carry different excavation volumes.',
      },
      {
        title: 'Soil and rock conditions',
        description: 'Clay, wet ground, rock, and unstable material affect the excavation plan and time on site.',
      },
      {
        title: 'Spoil haul distance',
        description: 'Keeping material on site, moving it elsewhere on the property, or hauling it away changes the scope.',
      },
      {
        title: 'Backfill material requirements',
        description: 'Granular material, native backfill, and compaction needs are reviewed with the foundation plan.',
      },
      {
        title: 'Site access and staging',
        description: 'Projects with clear room for machines, trucks, material staging, and safe movement can usually be planned more efficiently.',
      },
    ],
    rail: {
      eyebrow: 'The honest version',
      heading: 'Fit comes down to access, not address',
      body: 'Bellhouse handles foundation excavation for homes, additions, and builder projects anywhere equipment and trucks can safely reach the work area — and is especially well suited to rural lots, farms, acreages, and subdivision builds where there is more room to work.',
      anchorLabel: 'Where your job fits',
      anchorLow: { value: 'Review access', sub: 'Tight infill or confined additions' },
      anchorHigh: { value: 'Best fit', sub: 'Room for equipment and trucks to work safely' },
      chips: ['No charge to quote', 'Call or text with your timeline'],
      cta: {
        label: 'Get My Foundation Quoted',
        href: '#landing-quote',
        variant: 'primary',
        trackingId: 'foundation-county-pricing-quote',
      },
    },
  },
  proof: {
    eyebrow: 'Project fit',
    heading: 'Foundation work with excavation, trucking, and backfill planned together',
    intro:
      'Bellhouse foundation excavation is strongest where access, trucking, spoil movement, and backfill can be planned as one practical site-work scope.',
    stats: [
      { value: 'Home', label: 'Residential foundations, additions, garages, and acreage properties' },
      { value: 'Farm', label: 'Shops, barns, bins, and agricultural building foundations' },
      { value: 'Builder', label: 'New subdivision lots with clear equipment and truck access' },
      { value: 'Review access', label: 'Tight infill, underpinning, or interior foundation work' },
    ],
    gallery: [
      {
        src: '/assets/services/foundation-excavation/Foundation-footings-excavation-paris.webp',
        alt: 'Excavator digging a foundation on a Brant County property',
        caption: 'Foundation excavation',
      },
      {
        src: '/assets/services/foundation-excavation/garage-foundation-excavation-residential-site-brant.webp',
        alt: 'Excavator loading foundation spoil into a triaxle truck',
        caption: 'Spoil haul-out',
      },
      {
        src: '/assets/services/foundation-excavation/foundation-backfilling-lifts-ontario-garage-house.webp',
        alt: 'Backfill and compaction equipment beside a foundation',
        caption: 'Backfill support',
      },
      {
        src: '/assets/services/foundation-excavation/barn-shop-foundation-subgrade-laser-level-floor-concrete.webp',
        alt: 'Dozer rough grading soil near a foundation project',
        caption: 'Rough grading',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Brant County foundation excavation questions',
    items: [
      {
        question: 'Do you do foundations in town on tight lots?',
        answer:
          'Yes. Bellhouse handles in-town and residential foundation excavation where access can be managed. Rural lots, farms, acreages, and new subdivision builds are an especially strong fit because trucks, equipment, spoil, and staging are easier to plan, but that is a strength, not a requirement. For tight infill or confined additions, send the address, photos, or plans so Bellhouse can review access before confirming the approach.',
      },
      {
        question: 'Do you handle backfill after the foundation is done?',
        answer:
          'Yes. Excavation, haul-out, and backfill can all be handled under one scope so you are not coordinating separate contractors.',
      },
      {
        question: 'What types of foundations do you excavate?',
        answer:
          'Full basement foundations, walkout basements, crawl space foundations, garage and shop slabs, barn foundations, and agricultural building foundations. If it needs a machine and a truck, Bellhouse can usually handle it.',
      },
      {
        question: 'Do you work with builders or only direct with property owners?',
        answer:
          'Both. Bellhouse works directly with builders on subdivision contracts and directly with property owners on private builds, including in-town, rural, and acreage projects where access and scope can be reviewed.',
      },
      {
        question: 'How far in advance should I book?',
        answer:
          'As early as possible. Spring and summer fill up fast. Call or text with your timeline and Bellhouse will confirm availability.',
      },
    ],
  },
  finalCta: {
    eyebrow: 'Get Started',
    heading: 'Ready to quote your Brant County foundation excavation?',
    body: 'Call or text Darryl directly, or send the property location, drawings, access details, and timeline through the form.',
    primaryCta: {
      label: 'Request a Foundation Excavation Quote',
      href: '#landing-quote',
      variant: 'primary',
      trackingId: 'foundation-county-final-quote',
    },
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'foundation-county-final-phone',
    },
  },
  footer: {
    logoLabel: 'Bellhouse Excavating',
    serviceLine: 'Foundation excavation, farm building excavation, haul-out, backfill, and rough grading',
    locationLine:
      'Serving Brantford, Brant County, Paris, Hamilton, Cambridge, and surrounding areas',
    phoneCta: {
      label: '519-752-8500',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'foundation-county-footer-phone',
    },
  },
  mobileBar: {
    callCta: {
      label: 'Call',
      href: 'tel:5197528500',
      variant: 'phone',
      trackingId: 'foundation-county-mobile-call',
    },
    textCta: {
      label: 'Text Us',
      href: 'sms:5197528500',
      variant: 'primary',
      trackingId: 'foundation-county-mobile-text',
    },
  },
} satisfies LandingPageData;
