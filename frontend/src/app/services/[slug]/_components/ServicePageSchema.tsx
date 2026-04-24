import Script from 'next/script';

import type { ServicePage } from '@/types/interfaces';
import { getServicePageSchemaGraph } from '@/lib/servicePageSeo';

export default function ServicePageSchema({ service }: { service: ServicePage }) {
  const schema = getServicePageSchemaGraph(service);

  return (
    <Script
      id={`service-page-schema-${service.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
