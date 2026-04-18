import React from 'react';
import Services from './Services-page';
import { Metadata } from 'next';
import { validateMetadata } from '../../lib/utils/seoValidation';

export const metadata: Metadata = {
  title: 'Excavation, Hauling & Site Services | Bellhouse',
  description:
    'Explore Bellhouse excavation, grading, hauling, floating, and site prep services across Brantford and nearby Southern Ontario areas.',
};

validateMetadata(metadata.title, metadata.description);

export default function page() {
  return <Services />;
}
