'use client';
import { Fragment } from 'react';

import Image from 'next/image';
import logo from '../../public/assets/BellhouseLogo-text.png';
import { Phone } from '@phosphor-icons/react';
import reviews from '@/data/reviews.json';
import LayoutHome from '@/app/components/layoutsWeb/layoutHome';
import HomeAbout from '@/app/components/webpage/HomeAbout';
import HomeServices from '@/app/components/webpage/HomeServices';
// import ImageGallerySlider from '@/app/components/UI/ImageSlider';
import CallToAction from './components/webpage/CallToAction';
import Link from 'next/link';
import Reviews from './components/webpage/Reviews';
import ServiceArea from './components/webpage/ServiceArea';

const HomePage = () => {
  // const images = [
  //   {
  //     src: '/assets/excavator-digging-foundation.jpg',
  //     alt: 'a bucket of dirt',
  //   },
  //   { src: '/assets/Auto-level-floor-skid-steer.jpg', alt: 'a bucket of dirt' },
  //   { src: '/assets/dozer-pushing-dirt.jpg', alt: 'a bucket of dirt' },
  //   {
  //     src: '/assets/soil-conditioner-top-soil-skid-steer.jpg',
  //     alt: 'a bucket of dirt',
  //   },
  //   {
  //     src: '/assets/excavator-loading-tri-axle-foundation.jpg',
  //     alt: 'a bucket of dirt',
  //   },
  //   {
  //     src: '/assets/off-road-truck-dump-truck.jpg',
  //     alt: 'a bucket of dirt',
  //   },
  //   {
  //     src: '/assets/grading-driveway-laser-level.jpg',
  //     alt: 'a bucket of dirt',
  //   },
  //   {
  //     src: '/assets/foundation-backfill-packer.jpg',
  //     alt: 'a bucket of dirt',
  //   },
  //   {
  //     src: '/assets/retaining-wall-concrete.jpg',
  //     alt: 'a bucket of dirt',
  //   },
  //   {
  //     src: '/assets/tri-axle-dump-trucks.jpg',
  //     alt: 'a bucket of dirt',
  //   },
  //   {
  //     src: '/assets/site-preparation-dozer-brant-county.jpg',
  //     alt: 'a bucket of dirt',
  //   },
  // ];

  return (
    <Fragment>
      <LayoutHome>
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
                <span className="text text-yellow">Excavation</span> & Dump
                Truck Services in Brantford & Southern Ontario
              </h1>

              <h2 className="hero-desktop">
                Foundation excavation, dump truck hauling, and site work for
                residential and commercial projects across Brantford, Hamilton,
                and surrounding areas.
              </h2>

              {/* <p>
                Kick Off Your Project with a Solid Foundation—Contact Us Today!
              </p> */}

              <div className="hero__button-container">
                <Link href={'/contact'} id="cta-link">
                  Get a Free On-Site Quote
                </Link>
                <Link id="cta-btn" href={'/services'}>
                  View Services
                </Link>
                <Link className="hero-phone__mobile" href="tel:519-752-8500">
                  <Phone size={30} />
                  <h3>519-752-8500</h3>
                </Link>
              </div>
            </div>
          </section>
        </div>
        <HomeAbout />
        <HomeServices />
        {/* <section className="services">
          <ImageGallerySlider interval={7500} images={images} />
        </section> */}

        {/* <WhyChooseUs /> */}
        <Reviews reviews={reviews} />
        <CallToAction />
        <ServiceArea
          heading="Excavation Services Across Brant County & Southern Ontario
"
          subtext="Proudly serving Brantford, Paris, St. George, Burford, and nearby communities with over 40 years of local excavation experience."
          locations={[
            'Brantford',
            'Paris',
            'St. George',
            'Burford',
            'Hamilton',
          ]}
          variant="homepage"
        />
        {/* <LocalExperts colorDark={true} /> */}
      </LayoutHome>
    </Fragment>
  );
};

export default HomePage;
