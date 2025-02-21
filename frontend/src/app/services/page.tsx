import React from 'react';
import Services from './Services-page';
import { Metadata } from 'next';
import { validateMetadata } from '../../lib/utils/seoValidation';

export const metadata: Metadata = {
  title: 'Excavation & Construction Services in Brant County',
  description:
    'We provide expert excavation, site prep, drainage & septic services in Brant County, Brantford, Hamilton, Waterloo, Oxford, Halton & nearby areas. Call today!',
};

validateMetadata(metadata.title, metadata.description);

export default function page() {
  return <Services />;
}
