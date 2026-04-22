import type {
  AudienceSectionData,
  FinalCtaSectionData,
  HeroSectionData,
  ProofSectionData,
  ResourcesSectionData,
  ServiceAreasSectionData,
  ServicesSectionData,
  TestimonialsSectionData,
} from '@/types/sections';
import serviceData from '@/data/services.json';
import reviews from '@/data/reviews.json';

const featuredServices = serviceData
  .filter((service) => service.featuredOnHome)
  .map((service) => ({
    id: service.id,
    title: service.card.title,
    description: service.card.description,
    image: service.card.image,
    alt: service.card.alt,
    href: `/services/${service.slug}`,
  }));

export const homeHeroData: HeroSectionData = {
  _type: 'heroSection',
  eyebrow: 'Bellhouse Excavating',
  headline: 'Excavation, Grading & Trucking in Brantford',
  subheadline:
    'Bellhouse handles foundation excavation, site grading, dump truck hauling, and site support for homeowners, builders, contractors, and commercial projects across Brantford, Brant County, and nearby areas.',
  primaryAction: {
    label: 'Request a Quote',
    href: '/contact',
  },
  secondaryAction: {
    label: 'View Services',
    href: '/services',
  },
  phone: {
    label: 'Call 519-752-8500',
    href: 'tel:5197528500',
  },
  review: {
    rating: 5.0,
    reviewCount: 3,
    label: '5.0 on Google',
    href: '/reviews',
  },
  proofItems: [
    { label: 'Since 1982' },
    { label: 'Licensed & Insured' },
    { label: 'Residential, Commercial & Contractor Work' },
    { label: 'Serving Brantford, Brant County & Nearby Areas' },
  ],
  density: 'compact',
  theme: 'dark',
  overlay: 'transparent',
  align: 'center',
};

export const homeProofSection: ProofSectionData = {
  _type: 'proofSection',
  eyebrow: 'Why Bellhouse',
  heading: 'Why Property Owners and Contractors Choose Bellhouse',
  intro: [
    'Bellhouse Excavating provides excavation, grading, foundation digging, haul-out, imported material, and truck support for residential, commercial, and contractor-led work.',
    'With decades of field experience, Bellhouse is known for practical scheduling, coordinated site support, and work that keeps projects moving.',
  ],
  items: [
    {
      icon: 'buildings',
      title: 'Since 1982',
      text: 'Decades of excavation and trucking experience supporting projects across Brantford, Brant County, and nearby areas.',
    },
    {
      icon: 'truck',
      title: 'Excavation + Trucking Together',
      text: 'Digging, haul-out, imported material, and site support handled in a more coordinated way.',
    },
    {
      icon: 'shield',
      title: 'Licensed & Insured',
      text: 'Reliable site work backed by experienced operators and proper coverage.',
    },
    {
      icon: 'mapPin',
      title: 'Serving Brantford & Beyond',
      text: 'Regular work in Brantford, Paris, St. George, Burford, Hamilton, Cambridge, and nearby communities.',
    },
  ],
  backgroundVariant: 'light',
  backgroundTone: 'default',
  footerLink: {
    label: 'View Services',
    href: '/services',
  },
};

export const homeServicesSection: ServicesSectionData = {
  _type: 'servicesSection',
  eyebrow: 'Core Services',
  heading: 'Core Excavation & Trucking Services',
  intro:
    'From foundations and grading to material delivery and equipment hauling, Bellhouse supports residential, contractor, and commercial site work with practical field experience and the right equipment.',
  items: featuredServices,
  actions: [
    {
      label: 'View All Services',
      href: '/services',
      variant: 'primary',
    },
    {
      label: 'For Builders & Contractors',
      href: '/contractors',
      variant: 'secondary',
    },
  ],
  backgroundVariant: 'dark',
  backgroundTone: 'default',
};

export const homeAudienceSection: AudienceSectionData = {
  _type: 'audienceSection',
  eyebrow: 'Who We Work With',
  heading: 'Built for Homeowners, Contractors, Farms & Site Work',
  intro:
    'Bellhouse works with homeowners, builders, contractors, farms, and commercial projects that need excavation, grading, trucking, and dependable site support.',
  items: [
    {
      title: 'Homeowners',
      text: 'Excavation, grading, driveway preparation, backfilling, and site work for new builds, additions, and property improvements.',
      href: '/services',
      linkLabel: 'Explore homeowner services',
      icon: 'house',
      tag: 'Residential Projects',
      relatedServiceSlugs: [
        'foundation-excavation',
        'driveway-parking-lot-preparation',
      ],
    },
    {
      title: 'Builders & Contractors',
      text: 'Excavation, trucking, spoil export, aggregate import, and site support lined up around real schedules and field conditions.',
      href: '/contractors',
      linkLabel: 'See contractor support',
      icon: 'hammer',
      tag: 'Builder & GC Support',
      relatedServiceSlugs: [
        'site-preparation-land-grading',
        'heavy-equipment-hauling',
        'volvo-a35-off-road-dump-truck-rental',
      ],
    },
    {
      title: 'Farms & Rural Properties',
      text: 'Pond digging, demolition, grading, septic work, and rural excavation support for agricultural and country properties.',
      href: '/services',
      linkLabel: 'Explore rural services',
      icon: 'leaf',
      tag: 'Rural Properties',
      relatedServiceSlugs: [
        'pond-digging-cleaning',
        'house-barn-demolition',
        'septic-system-installation',
      ],
    },
    {
      title: 'Commercial & Development Work',
      text: 'Site preparation, haul-out, material delivery, and larger-scale excavation support for commercial and development projects.',
      href: '/services',
      linkLabel: 'See service capabilities',
      icon: 'buildings',
      tag: 'Commercial Site Work',
      relatedServiceSlugs: [
        'site-preparation-land-grading',
        'dump-truck-rental',
      ],
    },
  ],
  backgroundVariant: 'light',
  backgroundTone: 'soft',
  footerLink: {
    label: 'Not sure where your project fits? Request a Quote',
    href: '/contact',
  },
};

export const homeTestimonialsSection: TestimonialsSectionData = {
  _type: 'testimonialsSection',
  eyebrow: 'Testimonials',
  heading: 'What Customers Say About Bellhouse',
  subtext:
    'Real feedback from homeowners, builders, and local customers Bellhouse has worked with.',
  reviewSummary: '5.0 on Google from local customers',
  items: reviews,
  footerLink: {
    label: 'Read Google Reviews',
    href: '/reviews',
  },
  backgroundVariant: 'dark',
  backgroundTone: 'default',
};

export const homeServiceAreasSection: ServiceAreasSectionData = {
  _type: 'serviceAreasSection',
  eyebrow: 'Service Areas',
  heading: 'Excavation Services Across Brant County & Nearby Areas',
  subtext:
    'Bellhouse provides excavation, grading, trucking, and site work across Brantford, Paris, St. George, Burford, Hamilton, Cambridge, and surrounding communities.',
  locations: [
    { label: 'Brantford', href: '/service-areas/brantford' },
    { label: 'Paris', href: '/service-areas/paris' },
    { label: 'Hamilton', href: '/service-areas/hamilton' },
    { label: 'Cambridge', href: '/service-areas/cambridge' },
    { label: 'St. George' },
    { label: 'Burford' },
  ],
  actions: [
    {
      label: 'View All Service Areas',
      href: '/service-areas',
      variant: 'primary',
    },
    {
      label: 'For Builders & Contractors',
      href: '/contractors',
      variant: 'secondary',
    },
  ],
  backgroundVariant: 'light',
  backgroundTone: 'muted',
};

export const homeResourcesSection: ResourcesSectionData = {
  _type: 'resourcesSection',
  eyebrow: 'Bellhouse Resources',
  heading: 'Quick estimating tools for excavation, gravel, and topsoil.',
  subtext:
    'Use Bellhouse calculators for early planning, then move into the right service or quote request when the job needs real site review.',
  items: [
    {
      id: 'excavation-calculator',
      title: 'Excavation Calculator',
      description:
        'Estimate excavation volume, loose material, weight, and truck loads for early job planning.',
      meta: 'Planning Tool',
      detail:
        'Best for foundation excavation, site prep, and bulk material planning.',
      icon: 'calculator',
      actions: [
        { label: 'Open Calculator', href: '/resources/excavation-calculator' },
        {
          label: 'Related Service',
          href: '/services/foundation-excavation',
          variant: 'secondary',
        },
      ],
    },
    {
      id: 'gravel-calculator',
      title: 'Gravel Calculator',
      description:
        'Estimate gravel quantity, tonnage, and loads for driveways, access lanes, and parking areas.',
      meta: 'Planning Tool',
      detail:
        'Useful for driveway prep, base material, and rough site access planning.',
      icon: 'truck',
      actions: [
        { label: 'Open Calculator', href: '/resources/gravel-calculator' },
        {
          label: 'Related Service',
          href: '/services/driveway-parking-lot-preparation',
          variant: 'secondary',
        },
      ],
    },
    {
      id: 'topsoil-calculator',
      title: 'Topsoil Calculator',
      description:
        'Estimate topsoil coverage and delivery needs for finish grading and restoration work.',
      meta: 'Planning Tool',
      detail:
        'Useful for yard grading, restoration, and landscape material planning.',
      icon: 'layers',
      actions: [
        { label: 'Open Calculator', href: '/resources/topsoil-calculator' },
        {
          label: 'Related Service',
          href: '/services/dirt-gravel-delivery',
          variant: 'secondary',
        },
      ],
    },
  ],
  footerText: 'Need a job-specific number instead of a planning estimate?',
  footerActions: [
    { label: 'View All Resources', href: '/resources' },
    { label: 'Request a Quote', href: '/contact', variant: 'secondary' },
    { label: 'View Services', href: '/services', variant: 'secondary' },
  ],
  backgroundVariant: 'dark',
  backgroundTone: 'default',
};

export const homeFinalCtaSection: FinalCtaSectionData = {
  _type: 'finalCtaSection',
  eyebrow: 'Get Started',
  heading: 'Need excavation, grading, trucking, or site prep?',
  text: 'Talk with Bellhouse about foundation work, grading, haul-out, imported material, and site support across Brantford, Brant County, and nearby areas.',
  primaryAction: {
    label: 'Request a Quote',
    href: '/contact',
  },
  secondaryAction: {
    label: 'View Services',
    href: '/services',
  },
  phone: {
    label: '519-752-8500',
    href: 'tel:5197528500',
  },
  proofItems: [
    { label: 'Since 1982' },
    { label: 'Licensed & Insured' },
    { label: 'Excavation + Trucking' },
  ],
  note: 'For larger site work, contractor support, and material hauling, Bellhouse can help.',
  backgroundVariant: 'dark',
  backgroundTone: 'default',
};
