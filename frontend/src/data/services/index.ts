import fs from 'fs';
import path from 'path';
import type { ServicePage } from '../../types/interfaces';

const dir = path.join(process.cwd(), 'src/data/services');

export function getAllServices(): ServicePage[] {
  const files = fs.readdirSync(dir);

  return files
    .filter((file) => file.endsWith('.json'))
    .map((file) => {
      const fullPath = path.join(dir, file);
      const raw = fs.readFileSync(fullPath, 'utf8');
      const parsed = JSON.parse(raw) as ServicePage;

      return parsed;
    })
    .sort((a, b) => {
      return (a as any).id - (b as any).id || a.slug.localeCompare(b.slug);
    });
}

export function getServiceBySlug(slug: string): ServicePage | null {
  const filePath = path.join(dir, `${slug}.json`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw) as ServicePage;
}
