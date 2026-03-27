import fs from 'fs';
import path from 'path';
import type { ServicePage } from '../../types/interfaces';

const dir = path.join(process.cwd(), 'src/data/services');

type ServiceRecord = ServicePage | ServicePage[];

function readServiceFile(filePath: string): ServicePage[] {
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(raw) as ServiceRecord;

  return Array.isArray(parsed) ? parsed : [parsed];
}

function getServiceId(service: ServicePage) {
  const value = (service as ServicePage & { id?: unknown }).id;
  return typeof value === 'number' ? value : Number.MAX_SAFE_INTEGER;
}

function getServiceSlug(service: ServicePage) {
  return typeof service.slug === 'string' ? service.slug : '';
}

export function getAllServices(): ServicePage[] {
  const files = fs.readdirSync(dir);

  return files
    .filter((file) => file.endsWith('.json'))
    .flatMap((file) => {
      const fullPath = path.join(dir, file);
      return readServiceFile(fullPath);
    })
    .filter((service) => typeof service?.slug === 'string' && service.slug.length > 0)
    .sort((a, b) => {
      return getServiceId(a) - getServiceId(b) || getServiceSlug(a).localeCompare(getServiceSlug(b));
    });
}

export function getServiceBySlug(slug: string): ServicePage | null {
  const filePath = path.join(dir, `${slug}.json`);

  if (fs.existsSync(filePath)) {
    const directMatch = readServiceFile(filePath).find((service) => service.slug === slug);
    if (directMatch) return directMatch;
  }

  return getAllServices().find((service) => service.slug === slug) ?? null;
}
