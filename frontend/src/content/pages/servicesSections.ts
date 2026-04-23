import type {
  FinalCtaSectionData,
  HeroSectionData,
  ServiceAreasSectionData,
  ServicesSectionData,
} from '@/types/sections';
import serviceData from '@/data/services.json';

type ServiceDataItem = (typeof serviceData)[number];

const servicesBySlug = new Map(
  serviceData.map((service) => [service.slug, service]),
);

function buildServiceCards(slugs: string[]) {
  return slugs
    .map((slug) => servicesBySlug.get(slug))
    .filter((service): service is ServiceDataItem => Boolean(service))
    .map((service) => ({
      id: service.id,
      title: service.card.title,
      description: service.card.description,
      image: service.card.image,
      alt: service.card.alt,
      href: `/services/${service.slug}`,
    }));
}

export const servicesHeroData: HeroSectionData = {
  _type: 'heroSection',
  eyebrow: 'Bellhouse Services',
  headline: 'Excavation, Hauling, Grading & Contractor Site Services in Brant County',
  subheadline:
    'Use this services hub to find the right Bellhouse service for local excavation, truck hauling, site grading, material delivery, equipment moves, and active contractor-led work.',
  proofItems: [
    { label: 'Excavation' },
    { label: 'Trucking & Hauling' },
    { label: 'Grading & Site Prep' },
    { label: 'Contractor Support' },
  ],
  align: 'center',
  theme: 'dark',
  overlay: 'transparent',
  density: 'tight',
};

export const servicesServicesSection: ServicesSectionData = {
  _type: 'servicesSection',
  eyebrow: 'Service Hub',
  heading: 'Explore Excavation, Hauling, and Site Services',
  intro: [
    'Start with the service group closest to your job. Each card links to a specific service page, while early quantity checks can start with Bellhouse ',
    { label: 'estimating calculators', href: '/resources/calculators' },
    ' and larger active sites can move through ',
    { label: 'contractor project support', href: '/contractors' },
    '.',
  ],
  groups: [
    {
      id: 'excavation',
      heading: 'Excavation',
      description: [
        'Foundation digs, backfilling, septic excavation, and structural site excavation. For rough cut, spoil, or load planning, start with the ',
        {
          label: 'excavation calculator',
          href: '/resources/calculators/excavation',
        },
        '.',
      ],
      items: buildServiceCards([
        'foundation-excavation',
        'septic-system-installation',
      ]),
    },
    {
      id: 'trucking-hauling',
      heading: 'Trucking / Material Hauling',
      description: [
        'Dump truck support, aggregate delivery, bulk material hauling, and truck hire. For gravel quantities before ordering, use the ',
        { label: 'gravel calculator', href: '/resources/calculators/gravel' },
        '.',
      ],
      items: buildServiceCards(['dirt-gravel-delivery', 'dump-truck-rental']),
    },
    {
      id: 'grading-site-prep',
      heading: 'Grading / Site Prep',
      description: [
        'Driveways, parking areas, land grading, drainage prep, and build-ready surfaces. If you are planning base material or finish restoration, the ',
        { label: 'gravel calculator', href: '/resources/calculators/gravel' },
        ' and ',
        { label: 'topsoil calculator', href: '/resources/calculators/topsoil' },
        ' can help frame early quantities.',
      ],
      items: buildServiceCards([
        'driveway-parking-lot-preparation',
        'site-preparation-land-grading',
      ]),
    },
    {
      id: 'rural-property',
      heading: 'Rural / Property Work',
      description:
        'Pond work, demolition, cleanup, and property excavation for farms and rural sites.',
      items: buildServiceCards([
        'pond-digging-cleaning',
        'house-barn-demolition',
      ]),
    },
    {
      id: 'contractor-support',
      heading: 'Contractor Equipment / Support',
      description: [
        'Float services and larger-site hauling support for active job sites. Builders, GCs, and trades can also review ',
        { label: 'contractor support', href: '/contractors' },
        ' for coordination on repeat or larger scopes.',
      ],
      items: buildServiceCards([
        'heavy-equipment-hauling',
        'volvo-a35-off-road-dump-truck-rental',
      ]),
    },
  ],
  backgroundVariant: 'dark',
  backgroundTone: 'default',
  cardSize: 'large',
};

export const servicesServiceAreasSection: ServiceAreasSectionData = {
  _type: 'serviceAreasSection',
  eyebrow: 'Where Bellhouse Works',
  heading: 'Local Excavation, Hauling, and Site Work Service Areas',
  subtext:
    'Bellhouse supports local job sites across Brantford, Paris, Hamilton, Cambridge, and nearby Southern Ontario communities. Use the linked area pages to confirm local service fit before requesting a quote.',
  locations: [
    { label: 'Brantford', href: '/service-areas/brantford' },
    { label: 'Paris', href: '/service-areas/paris' },
    { label: 'Hamilton', href: '/service-areas/hamilton' },
    { label: 'Cambridge', href: '/service-areas/cambridge' },
    { label: 'Ancaster', href: '/service-areas/ancaster' },
    { label: 'Woodstock', href: '/service-areas/woodstock' },
    { label: 'Brant County' },
    { label: 'St. George' },
    { label: 'Burford' },
  ],
  actions: [
    { label: 'View All Service Areas', href: '/service-areas' },
    {
      label: 'Use Estimating Calculators',
      href: '/resources/calculators',
      variant: 'secondary',
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

export const servicesFinalCtaSection: FinalCtaSectionData = {
  _type: 'finalCtaSection',
  eyebrow: 'Next Step',
  heading: 'Know which service fits your job?',
  text: 'Send Bellhouse the project location, scope, and timing. If you are still sorting out the right service, start with the closest match and Bellhouse can help confirm the practical next step.',
  primaryAction: {
    label: 'Contact Bellhouse',
    href: '/contact',
  },
  secondaryAction: {
    label: 'View Service Areas',
    href: '/service-areas',
  },
  phone: {
    label: '519-752-8500',
    href: 'tel:5197528500',
  },
  proofItems: [
    { label: 'Project Fit Check' },
    { label: 'Local Job Review' },
    { label: 'Contractor Support Available' },
  ],
  note: 'Builders and contractors can also use the contractor support page for active job-site coordination.',
  backgroundVariant: 'dark',
  backgroundTone: 'soft',
  density: 'compact',
};
