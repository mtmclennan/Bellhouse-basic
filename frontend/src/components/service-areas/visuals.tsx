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
  alt: 'Excavation crew and heavy equipment working on an active jobsite.',
};

export const defaultIntroImage: ServiceAreaImage = {
  src: '/assets/excavator-digging-foundation.jpg',
  alt: 'Excavator cutting and shaping ground for foundation and site-prep work.',
};

export const defaultCtaImage: ServiceAreaImage = {
  src: '/assets/truck-hauling-heavy-equipment.jpg',
  alt: 'Float truck hauling heavy equipment to a jobsite.',
};

export const defaultMapContent: ServiceAreaMap = {
  eyebrow: 'Nearby areas',
  title: 'Jobs outside the core city often need a closer local page.',
  description:
    'Use the nearest service-area page to check the kind of excavation, grading, hauling, and machine support Bellhouse handles in that part of the region.',
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
