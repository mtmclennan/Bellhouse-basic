import type {
  ContactMethodsSectionData,
  FaqSectionData,
  FinalCtaSectionData,
  HeroSectionData,
  ServiceAreasSectionData,
} from '@/types/sections';

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

export const contactTrustPanelData: {
  text: string;
  quote: {
    text: string;
    name: string;
    source: string;
  };
} = {
  text:
    'Local excavation, grading, hauling, and backfill support across Brantford, Paris, and Brant County.',
  quote: {
    text: 'They did a great job for the excavation and backfill of our addition renovation. We have no complaints.',
    name: 'M C',
    source: 'Google',
  },
};

export const contactMethodsSection: ContactMethodsSectionData = {
  _type: 'contactMethodsSection',
  eyebrow: 'Choose the Best Way to Reach Out',
  heading: 'Call, text, or send the job details.',
  intro:
    'Bellhouse is a fit for foundation excavation, site grading, hauling, material delivery, backfill, and related site work across Brantford, Paris, Brant County, and nearby serviced areas.',
  fitText:
    'Use the option that matches how much detail you have ready and how quickly you need an answer.',
  methods: [
    {
      id: 'call',
      title: 'Call',
      text: 'Best for urgent timing, scheduling questions, or a quick fit check before you send details.',
      action: {
        label: 'Call 519-752-8500',
        href: 'tel:5197528500',
      },
      icon: 'call',
    },
    {
      id: 'text',
      title: 'Text',
      text: 'Best for photos, a site address, a location pin, or quick context about access or material conditions.',
      action: {
        label: 'Text 519-752-8500',
        href: 'sms:5197528500',
      },
      icon: 'text',
    },
    {
      id: 'form',
      title: 'Quote form',
      text: 'Best when you want Bellhouse to review the scope, location, and timing together before following up.',
      action: {
        label: 'Use the quote form',
        href: '#contact-form',
      },
      icon: 'form',
    },
  ],
  supportingLinks: [
    {
      label: 'For Builders & Contractors',
      href: '/contractors',
      variant: 'secondary',
    },
    {
      label: 'View Service Areas',
      href: '/service-areas',
      variant: 'secondary',
    },
    {
      label: 'Planning Calculators',
      href: '/resources/calculators',
      variant: 'secondary',
    },
  ],
  backgroundVariant: 'dark',
  backgroundTone: 'soft',
};

export const contactFormSupportData: {
  eyebrow: string;
  heading: string;
  intro: string;
  planning: {
    title: string;
    items: string[];
    responseNote: string;
  };
} = {
  eyebrow: 'Before You Submit',
  heading: 'Send the details that help Bellhouse respond clearly.',
  intro:
    'The form works best when you can share the project location, the type of work, and any timing or access notes that may affect scheduling or pricing.',
  planning: {
    title: 'What helps Bellhouse review the job',
    items: [
      'Project location or site address',
      'Type of work needed',
      'Approximate size, quantity, or scope if known',
      'Timing, access notes, photos, or site constraints',
    ],
    responseNote:
      'After submission, Bellhouse reviews the location, scope, and timing, then follows up by phone or email, usually within one business day.',
  },
};

export const contactServiceAreasSection: ServiceAreasSectionData = {
  _type: 'serviceAreasSection',
  eyebrow: 'Service Area Fit',
  heading: 'Brantford, Paris, Brant County, and nearby job sites',
  subtext:
    'If your project is in Brantford, Paris, St. George, Burford, Cambridge, Hamilton, or nearby areas, Bellhouse can quickly confirm fit, timing, and the right next step.',
  locations: [
    { label: 'Brantford', href: '/service-areas/brantford' },
    { label: 'Paris', href: '/service-areas/paris' },
    { label: 'Brant County' },
    { label: 'St. George' },
    { label: 'Burford' },
    { label: 'Cambridge', href: '/service-areas/cambridge' },
    { label: 'Hamilton', href: '/service-areas/hamilton' },
  ],
  actions: [
    {
      label: 'View All Service Areas',
      href: '/service-areas',
      variant: 'primary',
    },
  ],
  backgroundVariant: 'light',
  backgroundTone: 'soft',
};

export const contactFaqSection: FaqSectionData = {
  _type: 'faqSection',
  eyebrow: 'Contact FAQ',
  heading: 'Questions people ask before they reach out',
  subtext:
    'A few practical answers about service area, timing, project fit, and what helps Bellhouse review the job properly.',
  items: [
    {
      question: 'What areas does Bellhouse usually serve?',
      answer: [
        'Bellhouse regularly works in Brantford, Paris, Brant County, St. George, Burford, Cambridge, Hamilton, and nearby areas.',
        [
          'If you want to confirm the location first, review the ',
          { label: 'service area pages', href: '/service-areas' },
          ' or send the job location through the contact form.',
        ],
      ],
    },
    {
      question: 'How quickly will Bellhouse respond?',
      answer:
        'Most inquiries get a call or email back within one business day. If the request is time-sensitive, calling is the best way to flag that right away.',
    },
    {
      question: 'What information helps before I reach out?',
      answer:
        'The most useful starting details are the project location, the type of work needed, rough size or quantity if known, and any timing or access notes that could affect pricing or scheduling.',
    },
    {
      question: 'Should I call, text, or use the quote form?',
      answer:
        'Call when timing is urgent or you want to talk through the job quickly. Text when photos or a location pin help explain the site. Use the quote form when you want Bellhouse to review the scope, location, and timing together.',
    },
    {
      question: 'Is my project too small or not the right fit?',
      answer: [
        'Bellhouse handles a mix of residential, contractor, agricultural, and commercial work. If the job needs excavation, grading, hauling, truck support, or related site work, it is worth reaching out.',
        [
          'If you are coordinating builder or trade work, the ',
          { label: 'contractor support page', href: '/contractors' },
          ' may be the better place to start. You can also ',
          { label: 'read customer reviews', href: '/reviews' },
          ' before reaching out.',
        ],
      ],
    },
  ],
  backgroundVariant: 'light',
  backgroundTone: 'soft',
};

export const contactFinalCtaSection: FinalCtaSectionData = {
  _type: 'finalCtaSection',
  eyebrow: 'Ready to Reach Out?',
  heading: 'Send the job details or talk it through.',
  text:
    'If the location, scope, or timing is still rough, that is fine. Bellhouse can help confirm fit and the best next step before the work is scheduled.',
  primaryAction: {
    label: 'Back to Quote Form',
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
    { label: 'Brantford' },
    { label: 'Paris' },
    { label: 'Brant County' },
  ],
  note: 'Calling is best for urgent timing. Use the form when you want Bellhouse to review the details together.',
  backgroundVariant: 'dark',
  backgroundTone: 'soft',
  density: 'compact',
};
