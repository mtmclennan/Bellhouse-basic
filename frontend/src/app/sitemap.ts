import fs from 'fs';
import path from 'path';
import { MetadataRoute } from 'next';
import { getAllServices } from '@/data/services/index';
import { calculatorSeoConfig } from '@/features/calculators/config/seo';
import { serviceAreaPageList } from '@/lib/serviceAreas';

const baseUrl = 'https://bellhouseexcavating.ca';
const appRoot = process.cwd();
const serviceLayoutFiles = [
  'src/app/services/[slug]/page.tsx',
  'src/app/services/[slug]/_components/ServiceLayout.tsx',
  'src/app/services/[slug]/_components/ServiceLayout.module.scss',
];
const sharedCalculatorFiles = [
  'src/features/calculators/components/CalculatorPageShell.tsx',
  'src/features/calculators/components/CalculatorPageShell.module.scss',
  'src/features/calculators/config/pageContent.ts',
  'src/features/calculators/config/calculators.ts',
  'src/features/calculators/config/seo.ts',
  'src/features/calculators/components/ResourceBreadcrumbs.tsx',
];
const resourceHubFiles = [
  'src/app/resources/page.tsx',
  'src/features/calculators/components/CalculatorResourceCardGrid.tsx',
  'src/features/calculators/components/CalculatorResourceCardGrid.module.scss',
  'src/features/calculators/config/resourceCards.tsx',
];
const calculatorHubFiles = [
  'src/app/calculators/page.tsx',
  'src/app/calculators/page.module.scss',
  'src/features/calculators/components/CalculatorResourceCardGrid.tsx',
  'src/features/calculators/components/CalculatorResourceCardGrid.module.scss',
  'src/features/calculators/config/resourceCards.tsx',
];

function getLastModified(relativePaths: string[]): Date | undefined {
  const timestamps = relativePaths
    .map((relativePath) => path.join(appRoot, relativePath))
    .filter((absolutePath) => fs.existsSync(absolutePath))
    .map((absolutePath) => fs.statSync(absolutePath).mtime.getTime());

  if (timestamps.length === 0) {
    return undefined;
  }

  return new Date(Math.max(...timestamps));
}

function createSitemapEntry(
  pathname: string,
  relativePaths: string[],
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>,
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${baseUrl}${pathname}`,
    lastModified: getLastModified(relativePaths),
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    createSitemapEntry('/', ['src/app/page.tsx', 'src/app/Home-page.tsx'], 'yearly', 1),
    createSitemapEntry('/about', ['src/app/about/page.tsx', 'src/app/about/About-page.tsx'], 'yearly', 0.8),
    createSitemapEntry('/services', ['src/app/services/page.tsx', 'src/app/services/Services-page.tsx'], 'yearly', 0.9),
    createSitemapEntry('/calculators', calculatorHubFiles, 'monthly', 0.8),
    createSitemapEntry('/resources/', resourceHubFiles, 'monthly', 0.9),
    createSitemapEntry('/service-areas', ['src/app/service-areas/page.tsx', 'src/lib/serviceAreas.ts'], 'weekly', 0.9),
    createSitemapEntry('/contractors', ['src/app/contractors/page.tsx', 'src/app/contractors/Contractors-page.tsx'], 'monthly', 0.9),
    createSitemapEntry('/contact', ['src/app/contact/page.tsx', 'src/app/contact/Contact-page.tsx'], 'yearly', 1),
    createSitemapEntry('/privacy-policy', ['src/app/privacy-policy/page.tsx'], 'yearly', 0.3),
  ];

  const servicePages: MetadataRoute.Sitemap = getAllServices().map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: getLastModified([
      `src/data/services/${service.slug}.json`,
      ...serviceLayoutFiles,
    ]),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const serviceAreaPages: MetadataRoute.Sitemap = serviceAreaPageList.map((page) => ({
    url: `${baseUrl}/service-areas/${page.slug}`,
    lastModified: getLastModified([
      'src/app/service-areas/[slug]/page.tsx',
      'src/lib/serviceAreas.ts',
      'src/components/service-areas/visuals.tsx',
    ]),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const resourceCalculatorPages: MetadataRoute.Sitemap = (
    Object.values(calculatorSeoConfig) as Array<
      (typeof calculatorSeoConfig)[keyof typeof calculatorSeoConfig]
    >
  ).map((calculator) => {
    const routeSegment = calculator.resourcePath.replace(/^\/resources\/|\/$/g, '');

    return {
      url: `${baseUrl}${calculator.resourcePath}`,
      lastModified: getLastModified([
        `src/app/resources/${routeSegment}/page.tsx`,
        ...sharedCalculatorFiles,
      ]),
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  });

  return [
    ...staticPages,
    ...servicePages,
    ...serviceAreaPages,
    ...resourceCalculatorPages,
  ];
}
