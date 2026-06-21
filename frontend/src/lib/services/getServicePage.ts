import { getServiceBySlug } from '@/data/services/index';
import type { ServiceBlock } from '@/types/services/blocks';
import type { CmsServicePage } from '@/types/services/cms';
import type { LegacyServicePage } from '@/types/services/legacy';
import { adaptLegacyServicePage } from './adaptLegacyServicePage';

type RawServicePage = CmsServicePage | LegacyServicePage;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isServiceBlock(value: unknown): value is ServiceBlock {
  return isRecord(value) && typeof value.type === 'string';
}

function isCmsServicePage(value: unknown): value is CmsServicePage {
  if (!isRecord(value)) {
    return false;
  }

  if (
    typeof value.slug !== 'string' ||
    typeof value.title !== 'string' ||
    typeof value.navTitle !== 'string'
  ) {
    return false;
  }

  if (!isRecord(value.meta) || !isRecord(value.card) || !isRecord(value.hero)) {
    return false;
  }

  if (!Array.isArray(value.sections) || !value.sections.every(isServiceBlock)) {
    return false;
  }

  return (
    typeof value.meta.title === 'string' &&
    typeof value.meta.description === 'string' &&
    typeof value.card.title === 'string' &&
    typeof value.card.description === 'string' &&
    typeof value.card.image === 'string' &&
    typeof value.card.alt === 'string' &&
    typeof value.hero.heading === 'string' &&
    typeof value.hero.summary === 'string' &&
    typeof value.hero.image === 'string' &&
    typeof value.hero.alt === 'string'
  );
}

function rewriteContactHrefs<T>(value: T, param: string): T {
  if (Array.isArray(value)) {
    return value.map((item) => rewriteContactHrefs(item, param)) as unknown as T;
  }
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [
        k,
        k === 'href' && v === '/contact' ? `/contact${param}` : rewriteContactHrefs(v, param),
      ]),
    ) as T;
  }
  return value;
}

function applyContactService(page: CmsServicePage): CmsServicePage {
  if (!page.contactService) return page;
  const param = `?service=${encodeURIComponent(page.contactService)}`;
  return rewriteContactHrefs(page, param);
}

export function getServicePage(slug: string): CmsServicePage | null {
  const rawService = getServiceBySlug(slug) as RawServicePage | null;

  if (!rawService) {
    return null;
  }

  if (isCmsServicePage(rawService)) {
    return applyContactService(rawService);
  }

  return adaptLegacyServicePage(rawService as LegacyServicePage);
}
