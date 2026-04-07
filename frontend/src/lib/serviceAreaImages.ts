type ServiceAreaImageLike = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type ServiceAreaMapLike = {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: ServiceAreaImageLike;
};

type ServiceAreaServiceLike = {
  slug: string;
  image?: ServiceAreaImageLike;
  [key: string]: unknown;
};

type ServiceAreaPageLike = {
  slug: string;
  city: string;
  province: string;
  heroImage?: ServiceAreaImageLike;
  introImage?: ServiceAreaImageLike;
  ctaImage?: ServiceAreaImageLike;
  map?: ServiceAreaMapLike;
  services: ServiceAreaServiceLike[];
  [key: string]: unknown;
};

type PhotoAsset = {
  src: string;
  width: number;
  height: number;
};

type PhotoKey = keyof typeof photoCatalog;

type ServiceSlug =
  | 'excavation'
  | 'site-preparation'
  | 'grading'
  | 'foundation-excavation'
  | 'dump-truck-services'
  | 'material-delivery'
  | 'equipment-floating';

const photoCatalog = {
  'auto-level-fine-grading-skid-steer': {
    src: '/assets/services/auto-level-fine-grading-skid-steer.webp',
    width: 1434,
    height: 1080,
  },
  'concrete-floor-site-prep': {
    src: '/assets/services/concrete-floor-site-prep.webp',
    width: 904,
    height: 1200,
  },
  'concrete-foundation-backfill': {
    src: '/assets/services/concrete-foundation-backfill.webp',
    width: 900,
    height: 1200,
  },
  'dozer-stripping-site-prep': {
    src: '/assets/services/dozer-stripping-site-prep.webp',
    width: 1920,
    height: 1080,
  },
  'driveway-grading-concrete-base': {
    src: '/assets/services/driveway-grading-concrete-base.webp',
    width: 1440,
    height: 1080,
  },
  'dumptruck-foudation-excavator-loading': {
    src: '/assets/services/dumptruck-foudation-excavator-loading.webp',
    width: 1440,
    height: 1080,
  },
  'equipment-lined-up-large-site-prep': {
    src: '/assets/services/equipment-lined-up-large-site-prep.webp',
    width: 1200,
    height: 904,
  },
  'housing-development': {
    src: '/assets/services/housing-development.webp',
    width: 900,
    height: 1200,
  },
  'large-site-prep-equipment': {
    src: '/assets/services/large-site-prep-equipment.webp',
    width: 904,
    height: 1200,
  },
  'large-site-prep-two-excavators': {
    src: '/assets/services/large-site-prep-two-excavators.webp',
    width: 1434,
    height: 1080,
  },
  'large-yard-soil-grading-lawn': {
    src: '/assets/services/large-yard-soil-grading-lawn.webp',
    width: 1434,
    height: 1080,
  },
  'new-construction-infill': {
    src: '/assets/services/new-construction-infill.webp',
    width: 900,
    height: 1200,
  },
  'pool-retaining-wall': {
    src: '/assets/services/pool-retaining-wall.webp',
    width: 1440,
    height: 1080,
  },
  'site-prep-rocky-two-excavators-striping': {
    src: '/assets/services/site-prep-rocky-two-excavators-striping.webp',
    width: 1200,
    height: 904,
  },
} satisfies Record<string, PhotoAsset>;

const serviceAreaOrder = [
  'brantford',
  'paris',
  'hamilton',
  'cambridge',
  'dundas',
  'waterdown',
  'simcoe',
  'woodstock',
  'ancaster',
] as const;

const heroAssignments: Record<(typeof serviceAreaOrder)[number], PhotoKey> = {
  brantford: 'large-site-prep-two-excavators',
  paris: 'dozer-stripping-site-prep',
  hamilton: 'equipment-lined-up-large-site-prep',
  cambridge: 'large-site-prep-equipment',
  dundas: 'site-prep-rocky-two-excavators-striping',
  waterdown: 'housing-development',
  simcoe: 'new-construction-infill',
  woodstock: 'large-yard-soil-grading-lawn',
  ancaster: 'concrete-floor-site-prep',
};

const introRotation: PhotoKey[] = [
  'concrete-foundation-backfill',
  'concrete-floor-site-prep',
  'new-construction-infill',
];

const mapRotation: PhotoKey[] = [
  'driveway-grading-concrete-base',
  'auto-level-fine-grading-skid-steer',
  'pool-retaining-wall',
  'large-yard-soil-grading-lawn',
];

const ctaRotation: PhotoKey[] = [
  'dumptruck-foudation-excavator-loading',
  'equipment-lined-up-large-site-prep',
  'large-site-prep-equipment',
];

const serviceImageRotation: Record<ServiceSlug, PhotoKey[]> = {
  excavation: [
    'new-construction-infill',
    'concrete-floor-site-prep',
    'concrete-foundation-backfill',
  ],
  'site-preparation': [
    'dozer-stripping-site-prep',
    'large-site-prep-two-excavators',
    'equipment-lined-up-large-site-prep',
    'site-prep-rocky-two-excavators-striping',
    'housing-development',
  ],
  grading: [
    'auto-level-fine-grading-skid-steer',
    'driveway-grading-concrete-base',
    'large-yard-soil-grading-lawn',
    'pool-retaining-wall',
  ],
  'foundation-excavation': [
    'concrete-foundation-backfill',
    'concrete-floor-site-prep',
    'new-construction-infill',
  ],
  'dump-truck-services': ['dumptruck-foudation-excavator-loading'],
  'material-delivery': [
    'dumptruck-foudation-excavator-loading',
    'driveway-grading-concrete-base',
  ],
  'equipment-floating': [
    'equipment-lined-up-large-site-prep',
    'large-site-prep-equipment',
    'site-prep-rocky-two-excavators-striping',
  ],
};

function getRotatedItem<T>(items: T[], index: number) {
  return items[index % items.length];
}

function createImage(key: PhotoKey, alt: string): ServiceAreaImageLike {
  const asset = photoCatalog[key];

  return {
    src: asset.src,
    alt,
    width: asset.width,
    height: asset.height,
  };
}

function getHeroAlt(city: string) {
  return `Large-scale site preparation and excavation work for a ${city}, Ontario construction project.`;
}

function getIntroAlt(city: string) {
  return `Foundation excavation and backfill work on a ${city}, Ontario building site.`;
}

function getMapAlt(city: string) {
  return `Grading and access preparation for a ${city}, Ontario construction site.`;
}

function getCtaAlt(city: string) {
  return `Truck hauling and material handling for a ${city}, Ontario construction project.`;
}

function getServiceAlt(serviceSlug: ServiceSlug, city: string) {
  switch (serviceSlug) {
    case 'excavation':
      return `Excavation work for a ${city}, Ontario construction site.`;
    case 'site-preparation':
      return `Site preparation work on a ${city}, Ontario building site.`;
    case 'grading':
      return `Grading and pad preparation on a ${city}, Ontario project.`;
    case 'foundation-excavation':
      return `Foundation excavation and backfill work on a ${city}, Ontario build site.`;
    case 'dump-truck-services':
      return `Dump truck hauling and spoil export for a ${city}, Ontario construction project.`;
    case 'material-delivery':
      return `Aggregate delivery and material import for a ${city}, Ontario jobsite.`;
    case 'equipment-floating':
      return `Equipment support and machine movement for a ${city}, Ontario construction site.`;
    default:
      return `Construction support work for a ${city}, Ontario project.`;
  }
}

export function applyServiceAreaImages<
  T extends Record<string, ServiceAreaPageLike>,
>(pages: T): T {
  const entries = Object.entries(pages).map(([slug, page]) => {
    const pageIndex = serviceAreaOrder.indexOf(slug as (typeof serviceAreaOrder)[number]);

    if (pageIndex === -1) {
      return [slug, page] as const;
    }

    const updatedServices = page.services.map((service) => {
      const rotation = serviceImageRotation[service.slug as ServiceSlug];

      if (!rotation) {
        return service;
      }

      return {
        ...service,
        image: createImage(
          getRotatedItem(rotation, pageIndex),
          getServiceAlt(service.slug as ServiceSlug, page.city),
        ),
      };
    });

    return [
      slug,
      {
        ...page,
        heroImage: createImage(
          heroAssignments[slug as (typeof serviceAreaOrder)[number]],
          getHeroAlt(page.city),
        ),
        introImage: createImage(
          getRotatedItem(introRotation, pageIndex),
          getIntroAlt(page.city),
        ),
        ctaImage: createImage(
          getRotatedItem(ctaRotation, pageIndex),
          getCtaAlt(page.city),
        ),
        map: {
          ...page.map,
          image: createImage(
            getRotatedItem(mapRotation, pageIndex),
            getMapAlt(page.city),
          ),
        },
        services: updatedServices,
      },
    ] as const;
  });

  return Object.fromEntries(entries) as T;
}
