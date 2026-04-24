import fs from 'fs';
import path from 'path';
import type { ServicePage } from '../../types/interfaces';

const dir = path.join(process.cwd(), 'src/data/services');

function getFileSlug(filePath: string) {
  return path.basename(filePath, '.json');
}

function readServiceFile(filePath: string): ServicePage {
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(raw) as ServicePage | ServicePage[];

  if (Array.isArray(parsed)) {
    throw new Error(
      `Service data file "${path.basename(filePath)}" must contain exactly one service record.`,
    );
  }

  if (typeof parsed?.slug !== 'string' || parsed.slug.length === 0) {
    throw new Error(
      `Service data file "${path.basename(filePath)}" is missing a valid slug.`,
    );
  }

  const expectedSlug = getFileSlug(filePath);

  if (parsed.slug !== expectedSlug) {
    throw new Error(
      `Service data filename "${expectedSlug}.json" must match slug "${parsed.slug}".`,
    );
  }

  return parsed;
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
    .map((file) => {
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

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return readServiceFile(filePath);
}
