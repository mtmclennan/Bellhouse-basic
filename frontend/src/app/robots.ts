import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://bellhouseexcavating.ca/sitemap.xml',
    host: 'https://bellhouseexcavating.ca',
  };
}
