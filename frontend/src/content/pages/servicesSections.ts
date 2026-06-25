import type {
  FinalCtaSectionData,
  HeroSectionData,
  ServiceAreasSectionData,
  ServicesSectionData,
} from '@/types/sections';
import { getServiceCardsBySlugs } from '@/data/services/index';

function buildServiceCards(slugs: string[]) {
  return getServiceCardsBySlugs(slugs);
}

export const servicesHeroData: HeroSectionData = {
  _type: 'heroSection',
  eyebrow: 'Bellhouse Services',
  headline:
    'Farm, Rural & Large-Site Excavation Services in Brant County',
  subheadline:
    'Bellhouse Excavating handles excavation, grading, demolition, trucking, pond work, and site preparation for farm properties, rural lots, acreages, commercial sites, and builder projects across Brant County and surrounding areas.',
  primaryAction: {
    label: 'Explore Services',
    href: '#services-list',
  },
  secondaryAction: {
    label: 'Get a Quote',
    href: '/contact',
  },
  proofItems: [
    { label: 'Excavation' },
    { label: 'Trucking & Hauling' },
    { label: 'Grading & Site Prep' },
    { label: 'Contractor Support' },
  ],
  align: 'center',
  theme: 'dark',
  overlay: 'none',
  density: 'default',
};

export const servicesServicesSection: ServicesSectionData = {
  _type: 'servicesSection',
  id: 'services-list',
  eyebrow: 'Service Hub',
  heading: 'Explore Excavation, Hauling, and Site Services',
  intro:
    'Bellhouse is set up for jobs with room for equipment, trucks, and material staging — rural properties, farm operations, commercial sites, and builder-led projects. If you’re looking for a contractor who can handle scale, access, and volume, you’re in the right place.',
  groups: [
    {
      id: 'rural-farm',
      heading: 'Rural & Farm Work',
      description:
        'Pond work, demolition, laneway grading, and property excavation for farms and rural sites.',
      items: buildServiceCards([
        'pond-digging-cleaning',
        'house-barn-demolition',
        'driveway-parking-lot-preparation',
      ]),
    },
    {
      id: 'site-preparation-excavation',
      heading: 'Site Preparation & Excavation',
      description:
        'Foundation digs, backfilling, grading, drainage, and structural site excavation for new builds, additions, and development sites.',
      items: buildServiceCards([
        'foundation-excavation',
        'site-preparation-land-grading',
        'land-grading-drainage',
      ]),
    },
    {
      id: 'trucking-delivery',
      heading: 'Trucking & Material Delivery',
      description:
        'Dump truck support, aggregate delivery, bulk material hauling, and truck hire for active sites and standalone deliveries.',
      items: buildServiceCards([
        'dirt-gravel-delivery',
        'dump-truck-rental',
      ]),
    },
    {
      id: 'contractor-support',
      heading: 'Contractor Equipment & Support',
      description:
        'Float services and larger-site hauling support for active job sites and contractor-led earthmoving.',
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
    label: 'Get a Free Estimate',
    href: '/contact',
  },
  secondaryAction: {
    label: 'View Service Areas',
    href: '/service-areas',
  },
  tertiaryAction: {
    label: 'For Builders & Contractors',
    href: '/contractors',
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
