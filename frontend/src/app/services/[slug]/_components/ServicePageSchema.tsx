import Script from 'next/script';

import { buildServiceStructuredData } from '@/lib/services/serviceSchema';
import type { ServicePage } from '@/types/interfaces';
import type { CmsServicePage } from '@/types/services/cms';
import { getServicePageSchemaGraph } from '@/lib/servicePageSeo';

function isCmsServicePage(value: ServicePage | CmsServicePage): value is CmsServicePage {
  return (
    'title' in value &&
    'navTitle' in value &&
    Array.isArray((value as CmsServicePage).sections)
  );
}

export default function ServicePageSchema({
  service,
}: {
  service: ServicePage | CmsServicePage;
}) {
  const schema = isCmsServicePage(service)
    ? buildServiceStructuredData(service)
    : getServicePageSchemaGraph(service);

  return (
    <Script
      id={`service-page-schema-${service.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
