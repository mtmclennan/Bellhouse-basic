import type { Metadata } from 'next';
import ContractorsPage from './Contractors-page';
import { validateMetadata } from '@/lib/utils/seoValidation';

export const metadata: Metadata = {
  title: 'Contractor Excavation & Trucking | Bellhouse',
  description:
    'Bellhouse supports builders, contractors, and developers with excavation, grading, hauling, and equipment support for active construction sites.',
  alternates: {
    canonical: 'https://bellhouseexcavating.ca/contractors',
  },
};

validateMetadata(metadata.title, metadata.description);

export default function Page() {
  return <ContractorsPage />;
}
