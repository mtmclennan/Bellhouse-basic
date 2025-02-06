import React from 'react';
import HomePage from './Home-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Excavation Services in Brantford | Bellhouse Excavating | Serving Brant County & Surrounding Areas',
  description:
    'Bellhouse Excavating is your trusted excavation and construction partner serving Brant County, Brantford, Hamilton, Waterloo, Oxford, Halton, and surrounding areas.  We specialize in site preparation, foundations, drainage solutions, septic system installation, aggregates delivery, off-road truck rental, equipment floating, and more. Contact us today for reliable, high-quality services!',
};

export default function page() {
  return <HomePage />;
}
