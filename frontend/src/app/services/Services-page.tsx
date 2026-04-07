'use client';

import React from 'react';
import ServicesHero from '@/app/components/webpage/services/ServicesHero';
import ServicesGrid from '@/app/components/webpage/services/ServicesGrid';
import CallToAction from '@/app/components/webpage/CallToAction';
import ServiceArea from '@/app/components/webpage/ServiceArea';

const Services = () => {
  return (
    <>
      <ServicesHero />
      <ServicesGrid dark />
      <ServiceArea
        heading="Service Areas for Excavation, Hauling, and Site Work"
        subtext="Bellhouse handles excavation, grading, truck hauling, material delivery, and equipment moves across Brantford, Paris, Hamilton, Cambridge, and nearby Southern Ontario communities."
        locations={[
          { label: 'Brantford', href: '/service-areas/brantford' },
          { label: 'Paris', href: '/service-areas/paris' },
          { label: 'Hamilton', href: '/service-areas/hamilton' },
          { label: 'Cambridge', href: '/service-areas/cambridge' },
          { label: 'Ancaster', href: '/service-areas/ancaster' },
          { label: 'Woodstock', href: '/service-areas/woodstock' },
          'Brant County',
          'St. George',
          'Burford',
        ]}
        actions={[
          { label: 'View All Service Areas', href: '/service-areas' },
          {
            label: 'For Builders & Contractors',
            href: '/contractors',
            variant: 'secondary',
          },
        ]}
      />
      <CallToAction />
    </>
  );
};

export default Services;
