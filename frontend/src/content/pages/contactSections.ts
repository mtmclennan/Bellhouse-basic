import type { HeroSectionData } from '@/types/sections';

export const contactHeroData: HeroSectionData = {
  _type: 'heroSection',
  eyebrow: 'Contact Bellhouse Excavating',
  headline: 'Call, text, or send the project details.',
  subheadline:
    'Bellhouse handles excavation, grading, hauling, and site work across Brantford, Brant County, and nearby areas. Share the job location, scope, and timing, and Bellhouse can confirm fit and the best next step.',
  primaryAction: {
    label: 'Request a Quote',
    href: '#contact-form',
  },
  secondaryAction: {
    label: 'Text 519-752-8500',
    href: 'sms:5197528500',
  },
  phone: {
    label: 'Call 519-752-8500',
    href: 'tel:5197528500',
  },
  proofItems: [
    { label: 'Brantford, Brant County & Nearby Areas' },
    { label: 'Excavation, Grading & Trucking' },
    { label: 'Residential, Contractor & Commercial Work' },
  ],
  density: 'tight',
  theme: 'dark',
  overlay: 'transparent',
  align: 'center',
};
