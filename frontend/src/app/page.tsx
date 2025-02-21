import React from 'react';
import HomePage from './Home-page';
import { Metadata } from 'next';
import { validateMetadata } from '../lib/utils/seoValidation';

export const metadata: Metadata = {
  title: 'Excavation Services in Brantford | Bellhouse Excavating',
  description:
    'Expert excavation, site prep, drainage, septic installs & more in Brantford, Brant County & nearby. Contact Bellhouse Excavating for reliable service!',
};

validateMetadata(metadata.title, metadata.description);

export default function page() {
  return <HomePage />;
}
