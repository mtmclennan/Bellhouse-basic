import React from 'react';
import About from './About-page';
import { Metadata } from 'next';
import { validateMetadata } from '../../lib/utils/seoValidation';

export const metadata: Metadata = {
  title: 'About Bellhouse Excavating | Brant County Excavation',
  description:
    'Bellhouse Excavating has 30+ years of experience providing expert excavation & construction services in Brant County, Brantford, Hamilton, Waterloo & beyond.',
};

validateMetadata(metadata.title, metadata.description);

export default function page() {
  return <About />;
}
