import type {
  AudienceSectionData,
  AudienceSectionItem,
  FinalCtaSectionData,
  HeroSectionData,
  ProofSectionData,
  ResourcesSectionData,
  ServiceAreasSectionData,
  ServicesSectionData,
  TestimonialsSectionData,
} from '@/types/sections';
import { getFeaturedServices, getServiceTitleMap } from '@/data/services/index';
import reviews from '@/data/reviews.json';
import { GOOGLE_REVIEWS_URL, GOOGLE_REVIEW_SUMMARY } from '@/lib/reviewLinks';

const featuredServices = getFeaturedServices();
const serviceTitleMap = getServiceTitleMap();

function addRelatedServiceTitles(
  item: AudienceSectionItem,
): AudienceSectionItem {
  return {
    ...item,
    relatedServiceTitles:
      item.relatedServiceSlugs
        ?.map((slug) => serviceTitleMap.get(slug))
        .filter((title): title is string => Boolean(title))
        .slice(0, 3) ?? [],
  };
}

export const homeHeroData: HeroSectionData = {
  _type: 'heroSection',
  eyebrow: 'Bellhouse Excavating',
  headline: 'Excavation & Site Preparation for Rural, Farm, Commercial, and Large-Site Projects',
  subheadline:
    'Bellhouse Excavating provides grading, demolition, trucking, pond excavation, laneway construction, drainage, and site preparation across Brant County, Brantford, Hamilton, and surrounding areas.',
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
  review: GOOGLE_REVIEW_SUMMARY,
  proofItems: [
    { label: 'Since 1982' },
    { label: 'Licensed & Insured' },
    { label: 'Farm, Rural, Commercial & Builder Work' },
    { label: 'Serving Brant County, Brantford & Southern Ontario' },
  ],
  density: 'default',
  theme: 'dark',
  overlay: 'transparent',
  align: 'center',
};

export const homeProofSection: ProofSectionData = {
  _type: 'proofSection',
  eyebrow: 'Why Bellhouse',
  heading: 'Why Property Owners and Contractors Choose Bellhouse',
  intro: [
    'Since 1982, Bellhouse Excavating has been the go-to excavation contractor for farmers, rural property owners, commercial developers, and builders across Brant County and Southern Ontario.',
    'We bring large-site equipment — including an articulated off-road dump truck and float — to projects that most residential contractors can\'t take on. If the job needs serious equipment, serious hauling, or serious site prep, that\'s where we work best.',
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
  items: (
    [
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
        text: 'Pond digging, demolition, grading, and rural excavation support for agricultural and country properties.',
        href: '/services',
        linkLabel: 'Explore rural services',
        icon: 'leaf',
        tag: 'Rural Properties',
        relatedServiceSlugs: [
          'pond-digging-cleaning',
          'house-barn-demolition',
          'dirt-gravel-delivery',
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
    ] satisfies AudienceSectionItem[]
  ).map(addRelatedServiceTitles),
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
    href: GOOGLE_REVIEWS_URL,
  },
  backgroundVariant: 'dark',
  backgroundTone: 'default',
};

export const homeServiceAreasSection: ServiceAreasSectionData = {
  _type: 'serviceAreasSection',
  eyebrow: 'Service Areas',
  heading: 'Areas We Serve for Excavation, Grading & Trucking',
  subtext:
    'Start with the area page that best matches your site conditions, from Brantford access work and Paris rural lots to Hamilton, Cambridge, Ancaster, and Woodstock project support.',
  locations: [
    {
      label: 'Brantford excavation and site work',
      href: '/service-areas/brantford',
    },
    { label: 'Paris rural site prep', href: '/service-areas/paris' },
    {
      label: 'Hamilton contractor excavation',
      href: '/service-areas/hamilton',
    },
    {
      label: 'Cambridge active-site support',
      href: '/service-areas/cambridge',
    },
    { label: 'Ancaster estate-lot grading', href: '/service-areas/ancaster' },
    {
      label: 'Woodstock industrial site prep',
      href: '/service-areas/woodstock',
    },
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
        { label: 'Open Calculator', href: '/resources/calculators/excavation' },
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
        { label: 'Open Calculator', href: '/resources/calculators/gravel' },
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
        { label: 'Open Calculator', href: '/resources/calculators/topsoil' },
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
    { label: 'View Calculators', href: '/resources/calculators' },
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
