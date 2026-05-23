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
  'Excavator-loading-dump-truck': {
    src: '/assets/services/Excavator-loading-dump-truck.webp',
    width: 900,
    height: 1200,
  },
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
  'excavator-dozer-building-driveway': {
    src: '/assets/services/excavator-dozer-building-driveway.webp',
    width: 1440,
    height: 1080,
  },
  'excavator-farm-driveway': {
    src: '/assets/services/excavator-farm-driveway.webp',
    width: 1440,
    height: 1080,
  },
  'excavator-loading-dump-truck-right': {
    src: '/assets/services/dump-truck-hauling/excavator-loading-dump-truck-right.webp',
    width: 1440,
    height: 1080,
  },
  'dumptruck-foudation-excavator-loading': {
    src: '/assets/services/dumptruck-foudation-excavator-loading.webp',
    width: 1440,
    height: 1080,
  },
  'farm-laneway-base-dozer': {
    src: '/assets/services/driveways-laneways/farm-laneway-base-dozer.webp',
    width: 900,
    height: 1200,
  },
  'equipment-lined-up-large-site-prep': {
    src: '/assets/services/equipment-lined-up-large-site-prep.webp',
    width: 1200,
    height: 904,
  },
  'cat-320-excavator-loading-b-gravel': {
    src: '/assets/services/dump-truck-hauling/cat-320-excavator-loading-b-gravel.webp',
    width: 1440,
    height: 1080,
  },
  'cat-320D-excavator-leveling-aggregates-pile': {
    src: '/assets/services/cat-320D-excavator-leveling-aggregates-pile.webp',
    width: 900,
    height: 1200,
  },
  'cat-excavator-digging-in-aggregates-pile': {
    src: '/assets/services/cat-excavator-digging-in-aggregates-pile.webp',
    width: 900,
    height: 1200,
  },
  'cat315D-excavator-farm-laneway': {
    src: '/assets/services/cat315D-excavator-farm-laneway.webp',
    width: 900,
    height: 1200,
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
    src: '/assets/services/foundation-excavation/new-construction-infill.webp',
    width: 900,
    height: 1200,
  },
  'pool-retaining-wall': {
    src: '/assets/services/foundation-excavation/pool-retaining-wall.webp',
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
  brantford: 'excavator-loading-dump-truck-right',
  paris: 'excavator-farm-driveway',
  hamilton: 'cat-320-excavator-loading-b-gravel',
  cambridge: 'excavator-dozer-building-driveway',
  dundas: 'site-prep-rocky-two-excavators-striping',
  waterdown: 'large-site-prep-two-excavators',
  simcoe: 'dozer-stripping-site-prep',
  woodstock: 'large-yard-soil-grading-lawn',
  ancaster: 'driveway-grading-concrete-base',
};

const introRotation: PhotoKey[] = [
  'cat315D-excavator-farm-laneway',
  'concrete-floor-site-prep',
  'cat-320D-excavator-leveling-aggregates-pile',
  'concrete-foundation-backfill',
  'new-construction-infill',
  'cat-excavator-digging-in-aggregates-pile',
];

const mapRotation: PhotoKey[] = [
  'driveway-grading-concrete-base',
  'auto-level-fine-grading-skid-steer',
  'excavator-farm-driveway',
  'farm-laneway-base-dozer',
  'large-yard-soil-grading-lawn',
];

const ctaRotation: PhotoKey[] = [
  'excavator-loading-dump-truck-right',
  'Excavator-loading-dump-truck',
  'dumptruck-foudation-excavator-loading',
  'cat-320-excavator-loading-b-gravel',
];

const serviceImageRotation: Record<ServiceSlug, PhotoKey[]> = {
  excavation: [
    'cat-excavator-digging-in-aggregates-pile',
    'new-construction-infill',
    'cat-320D-excavator-leveling-aggregates-pile',
    'concrete-floor-site-prep',
    'cat315D-excavator-farm-laneway',
  ],
  'site-preparation': [
    'excavator-dozer-building-driveway',
    'dozer-stripping-site-prep',
    'large-site-prep-two-excavators',
    'site-prep-rocky-two-excavators-striping',
    'farm-laneway-base-dozer',
  ],
  grading: [
    'auto-level-fine-grading-skid-steer',
    'driveway-grading-concrete-base',
    'excavator-farm-driveway',
    'large-yard-soil-grading-lawn',
    'pool-retaining-wall',
  ],
  'foundation-excavation': [
    'concrete-foundation-backfill',
    'concrete-floor-site-prep',
    'new-construction-infill',
    'cat-320D-excavator-leveling-aggregates-pile',
  ],
  'dump-truck-services': [
    'excavator-loading-dump-truck-right',
    'dumptruck-foudation-excavator-loading',
    'Excavator-loading-dump-truck',
  ],
  'material-delivery': [
    'cat-320-excavator-loading-b-gravel',
    'excavator-loading-dump-truck-right',
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

function getHeroAlt(city: string, key: PhotoKey) {
  switch (key) {
    case 'excavator-loading-dump-truck-right':
    case 'cat-320-excavator-loading-b-gravel':
      return `Excavator loading a dump truck for spoil removal and material movement on a ${city}, Ontario jobsite.`;
    case 'excavator-farm-driveway':
      return `Excavator shaping a rural driveway and access route for a ${city}, Ontario property.`;
    case 'excavator-dozer-building-driveway':
      return `Excavator and dozer preparing access and rough grades for a ${city}, Ontario construction site.`;
    case 'site-prep-rocky-two-excavators-striping':
      return `Excavators preparing rocky ground and controlled work areas for a ${city}, Ontario residential project.`;
    case 'large-site-prep-two-excavators':
      return `Two excavators preparing a larger building site for a ${city}, Ontario new-build project.`;
    case 'dozer-stripping-site-prep':
      return `Dozer stripping and shaping open ground for a ${city}, Ontario site preparation project.`;
    case 'large-yard-soil-grading-lawn':
      return `Large yard grading and soil shaping for a ${city}, Ontario commercial or industrial property.`;
    case 'driveway-grading-concrete-base':
      return `Machine grading a driveway base and access approach for a ${city}, Ontario property.`;
    default:
      return `Excavation and site preparation equipment working on a ${city}, Ontario project.`;
  }
}

function getIntroAlt(city: string, key: PhotoKey) {
  switch (key) {
    case 'cat315D-excavator-farm-laneway':
      return `Excavator preparing a farm laneway and access route for a ${city}, Ontario property.`;
    case 'concrete-floor-site-prep':
      return `Site preparation for a concrete floor and building area on a ${city}, Ontario project.`;
    case 'cat-320D-excavator-leveling-aggregates-pile':
      return `Excavator leveling aggregate for site preparation on a ${city}, Ontario jobsite.`;
    case 'concrete-foundation-backfill':
      return `Backfill and foundation support work beside a concrete foundation on a ${city}, Ontario build.`;
    case 'new-construction-infill':
      return `New construction excavation and site preparation on a ${city}, Ontario infill or residential project.`;
    case 'cat-excavator-digging-in-aggregates-pile':
      return `Excavator digging and handling aggregate material for a ${city}, Ontario site-work project.`;
    default:
      return `Excavation and site preparation work on a ${city}, Ontario project.`;
  }
}

function getMapAlt(city: string, key: PhotoKey) {
  switch (key) {
    case 'driveway-grading-concrete-base':
      return `Graded driveway base and access route for a ${city}, Ontario jobsite.`;
    case 'auto-level-fine-grading-skid-steer':
      return `Skid steer fine grading a level work surface for a ${city}, Ontario construction project.`;
    case 'excavator-farm-driveway':
      return `Excavator shaping rural driveway access for a ${city}, Ontario property.`;
    case 'farm-laneway-base-dozer':
      return `Dozer preparing a farm laneway base and access route near ${city}, Ontario.`;
    case 'large-yard-soil-grading-lawn':
      return `Large yard grading and soil preparation for a ${city}, Ontario property.`;
    default:
      return `Grading and access preparation for a ${city}, Ontario jobsite.`;
  }
}

function getCtaAlt(city: string, key: PhotoKey) {
  switch (key) {
    case 'excavator-loading-dump-truck-right':
    case 'Excavator-loading-dump-truck':
    case 'dumptruck-foudation-excavator-loading':
      return `Excavator loading a dump truck during excavation and haul-out work for a ${city}, Ontario project.`;
    case 'cat-320-excavator-loading-b-gravel':
      return `Excavator loading gravel for material delivery and site support on a ${city}, Ontario project.`;
    default:
      return `Excavation and hauling work for a ${city}, Ontario construction project.`;
  }
}

function getServiceAlt(serviceSlug: ServiceSlug, city: string) {
  switch (serviceSlug) {
    case 'excavation':
      return `Excavator digging and shaping the work area on a ${city}, Ontario construction site.`;
    case 'site-preparation':
      return `Heavy equipment stripping and preparing ground on a ${city}, Ontario building site.`;
    case 'grading':
      return `Machine grading a driveway, pad, or working surface on a ${city}, Ontario project.`;
    case 'foundation-excavation':
      return `Foundation excavation and backfill preparation on a ${city}, Ontario build site.`;
    case 'dump-truck-services':
      return `Dump truck loading or hauling material for a ${city}, Ontario construction project.`;
    case 'material-delivery':
      return `Aggregate loading and material delivery support for a ${city}, Ontario jobsite.`;
    case 'equipment-floating':
      return `Heavy equipment staged for transport or jobsite support on a ${city}, Ontario construction site.`;
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
          getHeroAlt(
            page.city,
            heroAssignments[slug as (typeof serviceAreaOrder)[number]],
          ),
        ),
        introImage: createImage(
          getRotatedItem(introRotation, pageIndex),
          getIntroAlt(page.city, getRotatedItem(introRotation, pageIndex)),
        ),
        ctaImage: createImage(
          getRotatedItem(ctaRotation, pageIndex),
          getCtaAlt(page.city, getRotatedItem(ctaRotation, pageIndex)),
        ),
        map: {
          ...page.map,
          image: createImage(
            getRotatedItem(mapRotation, pageIndex),
            getMapAlt(page.city, getRotatedItem(mapRotation, pageIndex)),
          ),
        },
        services: updatedServices,
      },
    ] as const;
  });

  return Object.fromEntries(entries) as T;
}
