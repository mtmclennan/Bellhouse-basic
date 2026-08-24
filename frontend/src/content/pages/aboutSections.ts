import type {
  AboutStorySectionData,
  FinalCtaSectionData,
  HeroSectionData,
  ProofSectionData,
  ServiceAreasSectionData,
  ServicesSectionData,
  TestimonialsSectionData,
} from '@/types/sections';
import { getServiceCardsBySlugs } from '@/data/services/index';
import reviews from '@/data/reviews.json';
import darryl from '../../../public/assets/about-bellhouse-excavating.jpg';
import type { FaqSectionData } from '@/types/sections';
import { GOOGLE_REVIEWS_URL } from '@/lib/reviewLinks';

const aboutFeaturedServices = getServiceCardsBySlugs([
  'foundation-excavation',
  'site-preparation-land-grading',
  'dirt-gravel-delivery',
  'heavy-equipment-hauling',
  'driveway-parking-lot-preparation',
  'volvo-a35-off-road-dump-truck-rental',
]);

export const aboutHeroData: HeroSectionData = {
  _type: 'heroSection',
  eyebrow: 'About Bellhouse Excavating',
  headline: 'Built on field experience since 1982',
  subheadline:
    'Bellhouse Excavating is a Paris, Ontario-based excavation company known for practical site work, dependable scheduling, and field-led support across Brantford, Brant County, and nearby communities.',
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
    { label: 'Local Field Experience' },
    { label: 'Licensed & Insured' },
    { label: 'Brant County & Nearby' },
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
    'Since 1982, Bellhouse Excavating has stayed in rotation across Brantford, Brant County, and nearby job sites by doing practical work, planning around real site conditions, and showing up ready to work.',
    [
      'That local experience shows up in how Bellhouse works: straightforward planning, dependable site timing, and field support that connects cleanly with ',
      { label: 'excavation and site services', href: '/services' },
      ' and ',
      { label: 'contractor-led projects', href: '/contractors' },
      ' without unnecessary delays.',
    ],
  ],
  proofItems: [
    {
      icon: 'truck',
      label: 'One-Plan Site Support',
      detail: 'Digging, haul-out, delivery, and support equipment coordinated together.',
    },
    {
      icon: 'users',
      label: 'Built for Working Sites',
      detail: 'Support that fits smaller local jobs and active contractor-led work.',
    },
  ],
  image: {
    src: darryl,
    alt: 'Bellhouse Excavating operator working on an excavation and site-prep project near Brantford.',
    width: 600,
    height: 600,
  },
  imageBadges: ['Brant County Work', 'Field-Led Planning'],
  historyHeading: 'What that experience means on site',
  history: [
    [
      'In 2020, Darryl, a long-time Bellhouse employee with hands-on excavation experience, took over management of the company. That continuity matters. Bellhouse kept the local reputation it had built while staying focused on modern equipment, site-specific planning, and straightforward communication for ',
      { label: 'Brantford-area projects', href: '/service-areas/brantford' },
      '.',
    ],
  ],
  historyHighlights: [
    {
      icon: 'clock',
      title: 'Scheduled around real site timing',
      text: 'Work planned around access, sequencing, and when the next trade needs the site ready.',
    },
    {
      icon: 'truck',
      title: 'Digging and truck support on one plan',
      text: 'Spoil haul-out, imported material, and float support can be coordinated through one company.',
    },
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
    'Bellhouse is known for practical field decisions, dependable scheduling, and coordination that helps jobs stay ready for the next step.',
  ],
  items: [
    {
      icon: 'clock',
      title: 'Dependable Scheduling',
      text: 'Work planned around real job timing, site access, and what the next stage needs.',
    },
    {
      icon: 'truck',
      title: 'One-Plan Site Support',
      text: 'Digging, haul-out, imported material, and support equipment coordinated through one company.',
    },
    {
      icon: 'users',
      title: 'Built for Working Sites',
      text: 'Support that fits smaller local jobs and active contractor-led work without overcomplicating the plan.',
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
  heading: 'Brantford, Brant County, and nearby job sites',
  subtext:
    'If your project is in one of these nearby areas, Bellhouse can quickly confirm service fit and next steps.',
  locations: [
    { label: 'Brantford', href: '/service-areas/brantford' },
    { label: 'Paris', href: '/service-areas/paris' },
    { label: 'Hamilton', href: '/service-areas/hamilton' },
    { label: 'Cambridge', href: '/service-areas/cambridge' },
    { label: 'Woodstock' },
    { label: 'St. George' },
    { label: 'Burford' },
  ],
  backgroundVariant: 'light',
  backgroundTone: 'soft',
};

export const aboutTestimonialsSection: TestimonialsSectionData = {
  _type: 'testimonialsSection',
  eyebrow: 'Testimonials',
  heading: 'What customers say about working with Bellhouse',
  subtext:
    'Feedback from local customers who have worked with Bellhouse on excavation and site-support projects in the Brantford area.',
  reviewSummary: '5.0 on Google from local customers',
  items: reviews,
  footerLink: {
    label: 'Read Google Reviews',
    href: GOOGLE_REVIEWS_URL,
  },
  backgroundVariant: 'dark',
  backgroundTone: 'soft',
};

export const aboutFinalCtaSection: FinalCtaSectionData = {
  _type: 'finalCtaSection',
  eyebrow: 'Get Started',
  heading: 'Want to know if Bellhouse is the right fit for your project?',
  text: 'Share your location, scope, and timing. Bellhouse can help confirm fit, outline practical next steps, and tell you whether a quote or site visit makes sense.',
  primaryAction: {
    label: 'Talk About Your Project',
    href: '/contact',
  },
  secondaryAction: {
    label: 'Contractor Project Support',
    href: '/contractors',
  },
  phone: {
    label: '519-752-8500',
    href: 'tel:5197528500',
  },
  proofItems: [
    { label: 'Project Fit Check' },
    { label: 'Local Service Area' },
    { label: 'Quote or Site Visit' },
  ],
  note: 'Bellhouse can review the job and help you decide the most practical next step before work starts moving.',
  backgroundVariant: 'dark',
  backgroundTone: 'default',
};

export const aboutFaqSection: FaqSectionData = {
  _type: 'faqSection',
  eyebrow: 'FAQ',
  heading: 'Questions about Bellhouse Excavating',
  subtext:
    'Helpful answers for people deciding whether Bellhouse is the right fit for their project, location, and timeline.',
  items: [
    {
      question: 'What kind of work does Bellhouse Excavating handle?',
      answer: [
        'Bellhouse handles excavation, grading, foundation work, material hauling, dump truck services, equipment floating, and related site support for local projects that need practical field coordination.',
        [
          'That includes work such as ',
          { label: 'foundation excavation', href: '/services/foundation-excavation' },
          ', driveway and parking lot prep, ',
          {
            label: 'site preparation and grading',
            href: '/services/site-preparation-land-grading',
          },
          ', haul-out, and material delivery.',
        ],
      ],
    },
    {
      question: 'Does Bellhouse work with homeowners as well as contractors?',
      answer: [
        'Yes. Bellhouse works on smaller local jobs, contractor-led work, and active sites that need excavation, hauling, or site support handled practically.',
        [
          'If you are coordinating work as a builder or trade partner, the ',
          { label: 'contractor support page', href: '/contractors' },
          ' gives a clearer picture of how Bellhouse fits into active projects.',
        ],
      ],
    },
    {
      question: 'What areas does Bellhouse serve?',
      answer: [
        'Bellhouse regularly supports work in Brantford, Brant County, Paris, Cambridge, Hamilton-area communities, St. George, Burford, Woodstock, and nearby job sites.',
        [
          'If you want to confirm a local fit first, start with ',
          { label: 'Brantford service-area details', href: '/service-areas/brantford' },
          ' or contact Bellhouse with the job location.',
        ],
      ],
    },
    {
      question: 'Does Bellhouse handle excavation and trucking together?',
      answer:
        'Yes. Bellhouse can coordinate digging, haul-out, imported material, and truck support together, which helps keep the work more organized and practical on site.',
    },
    {
      question: 'How do I know if Bellhouse is the right fit for my project?',
      answer: [
        'If your project needs excavation, grading, haul-out, trucking, material delivery, or site support, Bellhouse is worth contacting.',
        [
          'The easiest next step is to share the job location, scope, and timing through the ',
          { label: 'contact page', href: '/contact' },
          ', and Bellhouse can help you confirm fit.',
        ],
      ],
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
