import type {
  AboutStorySectionData,
  FinalCtaSectionData,
  HeroSectionData,
  ProofSectionData,
  ServiceAreasSectionData,
  ServicesSectionData,
  TestimonialsSectionData,
} from '@/types/sections';
import serviceData from '@/data/services.json';
import reviews from '@/data/reviews.json';
import darryl from '../../../public/assets/about-bellhouse-excavating.jpg';
import type { FaqSectionData } from '@/types/sections';

const aboutFeaturedServices = serviceData
  .filter((service) =>
    [
      'foundation-excavation',
      'site-preparation-land-grading',
      'dirt-gravel-delivery',
      'heavy-equipment-hauling',
      'driveway-parking-lot-preparation',
      'volvo-a35-off-road-dump-truck-rental',
    ].includes(service.slug),
  )
  .map((service) => ({
    id: service.id,
    title: service.card.title,
    description: service.card.description,
    image: service.card.image,
    alt: service.card.alt,
    href: `/services/${service.slug}`,
  }));

export const aboutHeroData: HeroSectionData = {
  _type: 'heroSection',
  eyebrow: 'About Bellhouse Excavating',
  headline: 'Built on field experience since 1982',
  subheadline:
    'Bellhouse Excavating supports Brantford, Brant County, and nearby communities with excavation, grading, trucking, material delivery, and practical site support for homeowners, contractors, farms, and commercial work.',
  primaryAction: {
    label: 'Request an Estimate',
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
  proofItems: [
    { label: 'Since 1982' },
    { label: 'Excavation + Trucking' },
    { label: 'Licensed & Insured' },
    { label: 'Serving Brantford & Nearby Areas' },
  ],
  theme: 'dark',
  overlay: 'transparent',
  align: 'center',
};

export const aboutStorySection: AboutStorySectionData = {
  _type: 'aboutStorySection',
  eyebrow: 'Local Experience',
  heading: 'A local excavation company built on real field experience',
  intro: [
    'Since 1982, Bellhouse Excavating has worked across Brantford, Brant County, Paris, Hamilton-area communities, Cambridge, Woodstock, and nearby job sites. The company has stayed in rotation by doing practical site work, keeping schedules dependable, and showing up with equipment ready to work.',
    'Bellhouse handles foundation excavation, site preparation and grading, dump truck hauling, material delivery, and equipment floating for residential, commercial, agricultural, and contractor-led work.',
    'That includes homeowners who need the site handled properly, builders who need the next stage ready on time, and contractors who want excavation and trucking kept on one plan.',
  ],
  image: {
    src: darryl,
    alt: 'Bellhouse Excavating operator working on an excavation and site-prep project near Brantford.',
    width: 600,
    height: 600,
  },
  imageBadges: ['Excavation', 'Grading', 'Hauling'],
  historyHeading: 'What that experience means on site',
  history: [
    'In 2020, Darryl, a long-time Bellhouse employee with hands-on excavation experience, took over management of the company. That continuity matters. Bellhouse kept the local reputation it had built while staying focused on modern equipment, site-specific planning, and straightforward communication.',
    'The work stays grounded in what real projects need: a foundation cut to grade, spoil hauled out on time, imported material delivered when the site is ready, and the next trade able to move in without rework.',
    'That is what Bellhouse is known for on smaller local jobs and active contractor-led sites.',
  ],
  primaryAction: {
    label: 'Talk About Your Project',
    href: '/contact',
  },
  secondaryAction: {
    label: 'Contractor Project Support',
    href: '/contractors',
  },
  backgroundVariant: 'light',
  backgroundTone: 'soft',
};

export const aboutServicesSection: ServicesSectionData = {
  _type: 'servicesSection',
  eyebrow: 'Selected Services',
  heading: 'Services Bellhouse handles most often',
  intro:
    'If Bellhouse looks like the right fit, these are some of the excavation, trucking, and site-support services handled most often across local projects and active sites.',
  items: aboutFeaturedServices,
  actions: [
    {
      label: 'View Services',
      href: '/services',
      variant: 'primary',
    },
  ],
  backgroundVariant: 'dark',
  backgroundTone: 'muted',
};

export const aboutProofSection: ProofSectionData = {
  _type: 'proofSection',
  eyebrow: 'Why Bellhouse',
  heading: 'The kind of site support Bellhouse is known for',
  intro: [
    'Bellhouse is known for practical site work, dependable scheduling, and coordination that helps projects keep moving.',
  ],
  items: [
    {
      icon: 'clock',
      title: 'Dependable Scheduling',
      text: 'Work planned around real job timing, site access, and what the next stage needs.',
    },
    {
      icon: 'truck',
      title: 'Excavation + Trucking Together',
      text: 'Digging, haul-out, imported material, and support equipment coordinated through one company.',
    },
    {
      icon: 'users',
      title: 'Built for Real Projects',
      text: 'Support for homeowners, farms, contractors, and commercial work without overcomplicating the job.',
    },
    {
      icon: 'shield',
      title: 'Straightforward Communication',
      text: 'Clear expectations, practical decisions, and field experience that helps avoid rework.',
    },
  ],
  backgroundVariant: 'light',
  backgroundTone: 'default',
};

export const aboutServiceAreasSection: ServiceAreasSectionData = {
  _type: 'serviceAreasSection',
  eyebrow: 'Where Bellhouse Works',
  heading:
    'Local excavation and trucking support across Brant County and nearby areas',
  subtext:
    'Bellhouse supports excavation, grading, hauling, and site work across Brantford, Paris, Hamilton, Cambridge, Woodstock, St. George, Burford, and nearby communities.',
  locations: [
    { label: 'Brantford', href: '/service-areas/brantford' },
    { label: 'Paris', href: '/service-areas/paris' },
    { label: 'Hamilton', href: '/service-areas/hamilton' },
    { label: 'Cambridge', href: '/service-areas/cambridge' },
    { label: 'Woodstock' },
    { label: 'St. George' },
    { label: 'Burford' },
  ],
  actions: [
    {
      label: 'View Service Areas',
      href: '/service-areas',
      variant: 'primary',
    },
  ],
  backgroundVariant: 'light',
  backgroundTone: 'soft',
};

export const aboutTestimonialsSection: TestimonialsSectionData = {
  _type: 'testimonialsSection',
  eyebrow: 'Testimonials',
  heading: 'What customers say about working with Bellhouse',
  subtext:
    'Feedback from homeowners and local customers who have used Bellhouse for excavation, hauling, and site work.',
  reviewSummary: '5.0 on Google from local customers',
  items: reviews,
  footerLink: {
    label: 'Read Google Reviews',
    href: '/reviews',
  },
  backgroundVariant: 'dark',
  backgroundTone: 'soft',
};

export const aboutFinalCtaSection: FinalCtaSectionData = {
  _type: 'finalCtaSection',
  eyebrow: 'Get Started',
  heading: 'Need excavation, grading, hauling, or site support?',
  text: 'Talk with Bellhouse about your project, service area, schedule, and site requirements before the work starts moving.',
  primaryAction: {
    label: 'Request an Estimate',
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
  note: 'For repeat project support, contractor coordination, and local site work, Bellhouse can help.',
  backgroundVariant: 'dark',
  backgroundTone: 'default',
};

export const aboutFaqSection: FaqSectionData = {
  _type: 'faqSection',
  eyebrow: 'FAQ',
  heading: 'Questions about Bellhouse Excavating',
  subtext:
    'Helpful answers for homeowners, builders, contractors, farms, and commercial customers considering Bellhouse for excavation, grading, hauling, and site support.',
  items: [
    {
      question: 'What kind of work does Bellhouse Excavating handle?',
      answer: [
        'Bellhouse handles excavation, grading, foundation work, material hauling, dump truck services, equipment floating, and related site support for residential, contractor-led, agricultural, and commercial projects.',
        'That includes work such as foundation excavation, driveway and parking lot prep, site grading, haul-out, and material delivery.',
      ],
    },
    {
      question: 'Does Bellhouse work with homeowners as well as contractors?',
      answer:
        'Yes. Bellhouse supports homeowners, builders, contractors, farms, and commercial projects that need practical excavation, trucking, and site coordination.',
    },
    {
      question: 'What areas does Bellhouse serve?',
      answer:
        'Bellhouse regularly supports work in Brantford, Brant County, Paris, St. George, Burford, Cambridge, Hamilton, Woodstock, and nearby communities.',
    },
    {
      question: 'Does Bellhouse handle excavation and trucking together?',
      answer:
        'Yes. Bellhouse can coordinate excavation, haul-out, imported material, and truck support together, which helps keep projects more organized and practical on site.',
    },
    {
      question: 'How do I know if Bellhouse is the right fit for my project?',
      answer:
        'If your project needs excavation, grading, haul-out, trucking, material delivery, or site support, Bellhouse is worth contacting. The easiest next step is to share the job location, scope, and timing.',
    },
    {
      question: 'Can Bellhouse review a project before work starts?',
      answer:
        'Yes. Bellhouse can review the service area, the type of work involved, and the project scope to help determine next steps and whether a quote or site visit makes sense.',
    },
  ],
  footerLink: {
    label: 'Talk About Your Project',
    href: '/contact',
  },
  backgroundVariant: 'dark',
  backgroundTone: 'soft',
};
