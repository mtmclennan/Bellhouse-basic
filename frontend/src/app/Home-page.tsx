'use client';
import { Fragment } from 'react';

import Image from 'next/image';
import logo from '../../public/assets/BellhouseLogo-text.png';
import { Phone } from '@phosphor-icons/react';
import reviews from '@/data/reviews.json';
import HomeAbout from '@/app/components/webpage/HomeAbout';
import HomeServices from '@/app/components/webpage/HomeServices';
import CallToAction from './components/webpage/CallToAction';
import Link from 'next/link';
import Reviews from './components/webpage/Reviews';
import ServiceArea from './components/webpage/ServiceArea';
import HomeResources from './components/webpage/HomeResources';

const HomePage = () => {
  return (
    <Fragment>
      <div className="hero__container">
        <section className="hero">
          <div className="hero-title">
            <div className="hero-logo__mobile">
              <Image
                src={logo}
                alt="Bellhouse Excavating logo"
                quality={80}
                width={100}
                height={55}
                style={{
                  width: 'auto',
                  height: 'auto',
                }}
                sizes="(max-width: 375px) 100px, (max-width: 768px) 130px, 200px"
              />
            </div>
            <h1>
              <span className="text text-yellow">Excavation</span> & Dump Truck
              Services in Brantford & Southern Ontario
            </h1>

            <h2 className="hero-desktop">
              Foundation excavation, dump truck hauling, and site work for
              residential and commercial projects across Brantford, Hamilton,
              and surrounding areas.
            </h2>

            <div className="hero__button-container">
              <Link href={'/contact'} id="cta-link">
                Get a Free On-Site Quote
              </Link>
              <Link id="cta-btn" href={'/services'}>
                View Services
              </Link>
              <Link className="hero-phone__mobile" href="tel:5197528500">
                <Phone size={30} />
                <h3>519-752-8500</h3>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <HomeAbout />
      <HomeServices />
      <HomeResources />
      <Reviews reviews={reviews} />
      <CallToAction />
      <ServiceArea
        heading="Excavation Services Across Brant County & Southern Ontario"
        subtext="Proudly serving Brantford, Paris, Hamilton, Cambridge, and nearby communities with over 40 years of local excavation experience."
        locations={[
          { label: 'Brantford', href: '/service-areas/brantford' },
          { label: 'Paris', href: '/service-areas/paris' },
          { label: 'Hamilton', href: '/service-areas/hamilton' },
          { label: 'Cambridge', href: '/service-areas/cambridge' },
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
        variant="homepage"
      />
    </Fragment>
  );
};

export default HomePage;
