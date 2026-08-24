import type { ReactNode } from 'react';
import {
  Bulldozer,
  Buildings,
  ClipboardText,
  CompassRose,
  DropHalfBottom,
  Drop,
  Hammer,
  HardHat,
  HouseLine,
  MapPin,
  Mountains,
  Plugs,
  Ruler,
  Shovel,
  Truck,
  TruckTrailer,
  UsersThree,
  Wrench,
} from '@phosphor-icons/react/dist/ssr';
import type {
  ServiceAreaConditionKind,
  ServiceAreaGlanceKind,
  ServiceAreaImage,
  ServiceAreaMap,
  ServiceAreaService,
} from '@/lib/serviceAreas';

export const defaultHeroImage: ServiceAreaImage = {
  src: '/assets/services/excavator-dozer-building-driveway.webp',
  alt: 'Excavator and dozer preparing a Southern Ontario construction site for the next phase of work.',
  width: 1440,
  height: 1080,
};

export const defaultIntroImage: ServiceAreaImage = {
  src: '/assets/services/cat-320D-excavator-leveling-aggregates-pile.webp',
  alt: 'Excavator shaping material on a Southern Ontario excavation and grading project.',
  width: 900,
  height: 1200,
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

export function getGlanceIcon(kind: ServiceAreaGlanceKind): ReactNode {
  switch (kind) {
    case 'projects':
      return <HardHat size={22} weight="fill" />;
    case 'audience':
      return <UsersThree size={22} weight="fill" />;
    case 'coverage':
      return <MapPin size={22} weight="fill" />;
    case 'quote':
      return <ClipboardText size={22} weight="fill" />;
    default:
      return <Wrench size={22} weight="fill" />;
  }
}

export function getConditionIcon(kind: ServiceAreaConditionKind): ReactNode {
  switch (kind) {
    case 'ground':
      return <Mountains size={24} weight="fill" />;
    case 'drainage':
      return <Drop size={24} weight="fill" />;
    case 'access':
      return <Truck size={24} weight="fill" />;
    case 'utilities':
      return <Plugs size={24} weight="fill" />;
    default:
      return <Wrench size={24} weight="fill" />;
  }
}

export function getProjectTypeIcon(index: number): ReactNode {
  const icons = [
    <HouseLine key="house" size={24} weight="fill" />,
    <Ruler key="ruler" size={24} weight="fill" />,
    <Hammer key="hammer" size={24} weight="fill" />,
    <DropHalfBottom key="drop" size={24} weight="fill" />,
  ];

  return icons[index % icons.length];
}
