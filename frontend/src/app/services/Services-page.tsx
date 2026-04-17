'use client';

import React from 'react';
import Link from 'next/link';
import AudiencePaths from '@/app/components/webpage/AudiencePaths';
import ServicesHero from '@/app/components/webpage/services/ServicesHero';
import ServicesGrid from '@/app/components/webpage/services/ServicesGrid';
import CallToAction from '@/app/components/webpage/CallToAction';
import ServiceArea from '@/app/components/webpage/ServiceArea';

const Services = () => {
  return (
    <>
      <ServicesHero />
      <AudiencePaths
        eyebrow="Audience routes"
        heading="Start with the audience path that matches the job."
        intro="Not every Bellhouse visitor needs the same next page. Homeowners usually need local fit and service clarity, rural jobs often need access and material planning, and contractor-led work usually needs a more direct capability path."
        footnote={
          <>
            If you are still roughing out quantities before choosing the exact
            scope, use the{' '}
            <Link href="/resources/calculators">Bellhouse calculators</Link>.
          </>
        }
      />
      <ServicesGrid
        dark
        heading="Bellhouse services, with clearer next steps."
        intro={
          <>
            Use the service list below when you already know the kind of work
            you need. If the job is still being scoped, the better next step is
            usually the <Link href="/service-areas">local service-area page</Link>, the{' '}
            <Link href="/contractors">contractor page</Link>, or the{' '}
            <Link href="/resources/calculators">planning tools</Link> depending
            on who is trying to move the project forward.
          </>
        }
        actions={[
          { href: '/service-areas', label: 'View Service Areas' },
          {
            href: '/contractors',
            label: 'For Builders & Contractors',
            variant: 'secondary',
          },
          {
            href: '/resources/calculators',
            label: 'Use Planning Tools',
            variant: 'secondary',
          },
        ]}
      />
      <ServiceArea
        heading="Service Areas for Excavation, Hauling, and Site Work"
        subtext="Choose the local page when access, terrain, schedule pressure, or service fit depends on where the work is happening."
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
            label: 'Use Estimating Calculators',
            href: '/resources/calculators',
            variant: 'secondary',
          },
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
