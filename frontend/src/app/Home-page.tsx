'use client';
import { Fragment } from 'react';

import Image from 'next/image';
import logo from '../../public/assets/BellhouseLogo-text.png';
import { Phone } from '@phosphor-icons/react';
import reviews from '@/data/reviews.json';
import AudiencePaths from '@/app/components/webpage/AudiencePaths';
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
              Residential site work, farm and rural grading, and
              contractor-led excavation support across Brantford and nearby
              Southern Ontario communities.
            </h2>

            <div className="hero__button-container">
              <Link href={'/contact'} id="cta-link">
                Get a Free On-Site Quote
              </Link>
              <Link id="cta-btn" href={'/service-areas'}>
                View Service Areas
              </Link>
              <Link id="cta-btn" href={'/resources/calculators'}>
                Open Planning Tools
              </Link>
              <Link className="hero-phone__mobile" href="tel:5197528500">
                <Phone size={30} />
                <h3>519-752-8500</h3>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <AudiencePaths
        heading="Choose the Bellhouse path that fits the work."
        intro="Start with the audience route that matches the job instead of guessing from a long service list. That gets homeowners, rural property owners, and contractor-led projects to the right next page faster."
        footnote={
          <>
            Need to scan the full scope first? Browse{' '}
            <Link href="/services">all Bellhouse services</Link> or go straight
            to the <Link href="/resources/calculators">calculator hub</Link>{' '}
            for early planning numbers.
          </>
        }
      />
      <HomeServices />
      <HomeResources />
      <Reviews reviews={reviews} />
      <CallToAction />
      <ServiceArea
        heading="Excavation Services Across Brant County & Southern Ontario"
        subtext="Choose a local Bellhouse page to see service fit, access realities, and the best next step for excavation, hauling, grading, or truck-supported site work."
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
        variant="homepage"
      />
    </Fragment>
  );
};

export default HomePage;
