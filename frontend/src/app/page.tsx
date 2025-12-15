import React from 'react';
import HomePage from './Home-page';
import { Metadata } from 'next';
import { validateMetadata } from '../lib/utils/seoValidation';

export const metadata: Metadata = {
  title: 'Excavation & Dump Truck Services in Brantford',

  description:
    'Professional excavation and dump truck hauling services in Brantford and Southern Ontario. Get a free on-site quote today.',

  alternates: {
    canonical: 'https://bellhouseexcavating.ca/',
  },

  openGraph: {
    title:
      'Excavation & Dump Truck Services in Brantford & Southern Ontario | Bellhouse',
    description:
      'Reliable excavation and dump truck services for residential and commercial projects across Brantford and Southern Ontario.',
    url: 'https://bellhouseexcavating.ca/',
    siteName: 'Bellhouse Excavating',
    type: 'website',
  },

  robots: {
    index: true,
    follow: true,
  },
};

validateMetadata(metadata.title, metadata.description);

export default function page() {
  return <HomePage />;
}
