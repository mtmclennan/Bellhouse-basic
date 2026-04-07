import type { Metadata } from 'next';
import ContractorsPage from './Contractors-page';
import { validateMetadata } from '@/lib/utils/seoValidation';

export const metadata: Metadata = {
  title: 'Excavation Support for Builders & Contractors | Bellhouse',
  description:
    'Bellhouse supports builders, contractors, and developers with excavation, grading, trucking, and site support across Brantford and Southern Ontario.',
  alternates: {
    canonical: 'https://bellhouseexcavating.ca/contractors',
  },
};

validateMetadata(metadata.title, metadata.description);

export default function Page() {
  return <ContractorsPage />;
}
