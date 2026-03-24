import type { ReactNode } from 'react';
import {
  Bulldozer,
  Buildings,
  CompassRose,
  HardHat,
  HouseLine,
  MapPin,
  ShieldCheck,
  Shovel,
  Truck,
  TruckTrailer,
  UsersThree,
  Wrench,
} from '@phosphor-icons/react/dist/ssr';
import type {
  ServiceAreaImage,
  ServiceAreaMap,
  ServiceAreaService,
} from '@/lib/serviceAreas';

export const defaultHeroImage: ServiceAreaImage = {
  src: '/assets/Bellhouse-excavating-contractor.jpg',
  alt: 'Bellhouse excavation crew and heavy equipment working on site.',
};

export const defaultIntroImage: ServiceAreaImage = {
  src: '/assets/excavator-digging-foundation.jpg',
  alt: 'Excavator digging and shaping a construction site for foundation work.',
};

export const defaultCtaImage: ServiceAreaImage = {
  src: '/assets/truck-hauling-heavy-equipment.jpg',
  alt: 'Bellhouse float truck moving heavy equipment to a construction site.',
};

export const defaultMapContent: ServiceAreaMap = {
  eyebrow: 'Areas we serve',
  title: 'Service coverage is coordinated around the city, not tied to a separate branch office.',
  description:
    'Bellhouse can support nearby jobs where excavation, hauling, and equipment movement need to stay on one schedule.',
};

export function getServiceAreaServiceIcon(slug: ServiceAreaService['slug']): ReactNode {
  switch (slug) {
    case 'excavation':
    case 'foundation-excavation':
      return <Shovel size={24} weight="fill" />;
    case 'site-preparation':
      return <Bulldozer size={24} weight="fill" />;
    case 'grading':
      return <CompassRose size={24} weight="fill" />;
    case 'dump-truck-services':
    case 'material-delivery':
      return <Truck size={24} weight="fill" />;
    case 'equipment-floating':
      return <TruckTrailer size={24} weight="fill" />;
    default:
      return <Wrench size={24} weight="fill" />;
  }
}

export function getAudienceIcon(index: number): ReactNode {
  const icons = [
    <HouseLine key="house" size={24} weight="fill" />,
    <HardHat key="hard-hat" size={24} weight="fill" />,
    <Buildings key="buildings" size={24} weight="fill" />,
    <Truck key="truck" size={24} weight="fill" />,
    <UsersThree key="users" size={24} weight="fill" />,
  ];

  return icons[index % icons.length];
}

export function getWhyChooseIcon(index: number): ReactNode {
  const icons = [
    <ShieldCheck key="shield" size={24} weight="fill" />,
    <CompassRose key="compass" size={24} weight="fill" />,
    <TruckTrailer key="float" size={24} weight="fill" />,
    <MapPin key="pin" size={24} weight="fill" />,
  ];

  return icons[index % icons.length];
}
