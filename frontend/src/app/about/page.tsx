import React from 'react';
import About from './About-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'About Bellhouse Excavating | Expert Excavation Services in Brant County',
  description:
    'Learn about Bellhouse Excavating, your trusted excavation and construction partner serving Brant County, Brantford, Hamilton, Waterloo, Oxford, Halton, and surrounding areas. With over 30 years of experience, we are committed to delivering high-quality excavation services.',
};

export default function page() {
  return <About />;
}
