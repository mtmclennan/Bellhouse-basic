'use client';

import LayoutHome from '@/app/components/layoutsWeb/layoutHome';
import React from 'react';
import Head from 'next/head';
import Image from 'next/legacy/image';
import logo from '../../public/assets/BellhouseLogowhite5.png';
import ServicesHero from '@/app/components/webpage/services/ServicesHero';
import ServicesSection from '@/app/components/webpage/ServicesSection';
import HomeServices from '@/app/components/webpage/HomeServices';
import LocalExperts from '@/app/components/webpage/LocalExperts';
import CallToAction from '@/app/components/webpage/CallToAction';
import ServiceCard from '@/app/components/webpage/ServiceCard';
import { title } from 'process';
import ServicesGrid from '@/app/components/webpage/services/ServicesGrid';

const services = [
  {
    title: 'Foundation Excavation and Backfill',
    description:
      'Expert foundation digging and backfilling to ensure stability and support for your construction projects.',
    image: '/assets/foundation-excavation-machinery.jpg',
    alt: 'Excavation machinery working on foundation digging',
    link: '/Foundation-backfill',
    large: true,
  },
  {
    title: 'Trucking - Heavy Equipment floating',
    description:
      'We offer reliable float truck services to transport heavy equipment like excavators to construction sites, ensuring secure and timely delivery every time.',
    image: '/assets/truck-hauling-heavy-equipment.jpg',
    alt: 'A truck hooked to a float trailer carrying an excavator, ready for transport on a construction site.',
    link: '/truck-floating-equipment',
    large: true,
  },
  {
    title: 'Dump Truck Services - dirt and gravel delivery',
    description:
      'Reliable dump truck services for dirt and gravel delivery. Trucks for hire available for construction, landscaping, and driveway needs.',
    image: '/assets/dump-truck-delivery-service.jpg',
    alt: 'A tri-axle dump truck being loaded with material by an excavator on a construction site, showcasing heavy equipment in action.',
    link: '/dump-truck-gravel-delivery',
    large: true,
  },
  {
    title: 'Driveways and Parking Lots',
    description:
      'We provide expert grading and leveling services for driveways and parking lots. Our skid steer or dozer ensures smooth, durable surfaces for your property."',
    image: '/assets/Driveway-parking-lot-skid-steer.jpg',
    alt: 'A skid steer leveling a large driveway, preparing the surface for a smooth and even finish, showcasing driveway grading services.',
    link: '/driveways-parking-lots',
    large: true,
  },
  {
    title: 'Septic System Installation',
    description:
      'Expert septic system installation services. Our experienced team ensures efficient and reliable installation for your home or business needs.',
    image: '/assets/septic-system-installation-contractor.jpg',
    alt: 'An excavator digging for septic system installation, preparing the site for tank placement, showcasing professional septic system services.',
    link: '/septic-system-contractor',
    large: true,
  },
  {
    title: 'Off-road Dump Truck',
    description:
      'Off-road truck A35 bulk material moving and rentals with operator. Ideal for heavy hauling on tough terrain, we ensure efficient and reliable service.',
    image: '/assets/off-road-truck-rock-truck-rental.jpg',
    alt: 'An excavator digging for septic system installation, preparing the site for tank placement, showcasing professional septic system services.',
    link: '/off-road-dump-truck',
    large: true,
  },
];

const Services = () => {
  return (
    <>
      <LayoutHome>
        <ServicesHero />
        <section className="services__intro">
          <div>
            <h2>Transforming Construction Sites</h2>
            <p>
              At Bellhouse Excavating, we offer reliable excavation services in
              Brant county and surrounding areas, specializing in foundation
              digging, dump truck services, and aggregate delivery for
              residential and commercial projects. With years of experience and
              the latest equipment, we ensure every job is done with precision
              and care. Our knowledge of local soil conditions and building
              codes allows us to deliver tailored solutions that meet your
              specific needs, all while maintaining the highest standards of
              safety and quality.
            </p>
          </div>
        </section>

        <ServicesGrid />
        <LocalExperts colorDark={true} />
        <CallToAction />
      </LayoutHome>
    </>
  );
};

export default Services;
