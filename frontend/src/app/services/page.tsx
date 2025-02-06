import React from 'react';
import Services from './Serivces-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Excavation and Construction Services in Brant County | Bellhouse Excavating',
  description:
    'Explore our wide range of excavation and construction services at Bellhouse Excavating. From site preparation and foundations to drainage solutions and septic system installation, we offer reliable and high-quality services in Brant County, Brantford, Hamilton, Waterloo, Oxford, Halton, and surrounding areas. Contact us today to learn more about how we can assist with your next project!',
};

export default function page() {
  return <Services />;
}
