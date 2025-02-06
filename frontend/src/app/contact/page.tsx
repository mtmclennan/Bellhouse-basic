import React from 'react';
import Contact from './Contact-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Contact Bellhouse Excavating | Professional Excavation Services in Brant County',
  description:
    'Contact Bellhouse Excavating for reliable excavation services in Brant County, Brantford, Hamilton, Waterloo, Oxford, Halton, and surrounding areas.',
};

export default function page() {
  return <Contact />;
}
