import type { Metadata } from 'next';
import ContractorsPage from './Contractors-page';
import { createPageMetadata } from '@/lib/siteMetadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Excavation Support for Builders & Contractors | Bellhouse',
  description:
    'Bellhouse supports builders, contractors, and developers with excavation, grading, trucking, and site support across Brantford and Southern Ontario.',
  pathname: '/contractors',
  openGraphDescription:
    'Builder and contractor path for Bellhouse excavation, grading, trucking, and coordinated site support across Brantford and Southern Ontario.',
});

export default function Page() {
  return <ContractorsPage />;
}
