'use client';
import { Fragment } from 'react';

import Image from 'next/image';
import logo from '../../public/assets/BellhouseLogo-text.png';
import { useRouter } from 'next/navigation';
import { Phone } from '@phosphor-icons/react';

import LayoutHome from '@/app/components/layoutsWeb/layoutHome';
import HomeAbout from '@/app/components/webpage/HomeAbout';
import HomeServices from '@/app/components/webpage/HomeServices';
import ImageGallerySlider from '@/app/components/UI/ImageSlider';
import WhyChooseUs from '@/app/components/webpage/WhyChooseUs';
import CallToAction from './components/webpage/CallToAction';
import LocalExperts from './components/webpage/LocalExperts';
import Link from 'next/link';
// import ServiceCard from "@/components/UI/ServiceCard";

const HomePage = () => {
  const router = useRouter();

  const images = [
    {
      src: '/assets/excavator-digging-foundation.jpg',
      alt: 'a bucket of dirt',
    },
    { src: '/assets/Auto-level-floor-skid-steer.jpg', alt: 'a bucket of dirt' },
    { src: '/assets/dozer-pushing-dirt.jpg', alt: 'a bucket of dirt' },
    {
      src: '/assets/soil-conditioner-top-soil-skid-steer.jpg',
      alt: 'a bucket of dirt',
    },
    {
      src: '/assets/excavator-loading-tri-axle-foundation.jpg',
      alt: 'a bucket of dirt',
    },
    {
      src: '/assets/off-road-truck-dump-truck.jpg',
      alt: 'a bucket of dirt',
    },
    {
      src: '/assets/grading-driveway-laser-level.jpg',
      alt: 'a bucket of dirt',
    },
    {
      src: '/assets/foundation-backfill-packer.jpg',
      alt: 'a bucket of dirt',
    },
    {
      src: '/assets/retaining-wall-concrete.jpg',
      alt: 'a bucket of dirt',
    },
    {
      src: '/assets/tri-axle-dump-trucks.jpg',
      alt: 'a bucket of dirt',
    },
    {
      src: '/assets/site-preparation-dozer-brant-county.jpg',
      alt: 'a bucket of dirt',
    },
  ];

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
                  width={200}
                  height={155}
                  style={{
                    width: 'auto',
                    height: 'auto',
                  }}
                  sizes="(max-width: 375px) 120px, (max-width: 768px) 160px, 200px"
                />
              </div>
              <h1>
                <span className="text text-yellow">Excavation</span> & Dump
                Truck Services You Can Count On
              </h1>
              <h2 className="hero-desktop">
                Precision excavation, foundation digging, and hauling services
                for residential, commercial, and industrial projects in
                Brantford & beyond. Built for efficiency. Delivered with
                expertise.
              </h2>
              {/* <p>
                Kick Off Your Project with a Solid Foundation—Contact Us Today!
              </p> */}

              <div className="hero__button-container">
                <button onClick={() => router.push('/contact')}>
                  Get a Free Quote!
                </button>
                <button id="cta-btn" onClick={() => router.push('/services')}>
                  Explore Our Services
                </button>
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
        <section className="services">
          <ImageGallerySlider interval={7500} images={images} />
          {/* <ul>
            <li>
              <Image
                src={'/assets/gallery1.jpg'}
                alt={'bucket of dirt'}
                // placeholder="blur"
                quality={70}
                width={750}
                height={750}
                sizes="(min-width: 800px) 750px, calc(93.75vw + 19px)"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </li>
            <li>
              <Image
                src={'/assets/gallery2.jpg'}
                alt={'view out of bulldozer'}
                // placeholder="blur"
                quality={70}
                width={750}
                height={750}
                sizes="(min-width: 800px) 750px, calc(93.75vw + 19px)"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </li>
            <li>
              <Image
                src={'/assets/gallery3.jpg'}
                alt={'Dump truck with float and excavator'}
                // placeholder="blur"
                quality={70}
                width={750}
                height={750}
                sizes="(min-width: 800px) 750px, calc(93.75vw + 19px)"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </li>
            <li>
              <Image
                src={'/assets/gallery4.jpg'}
                alt={'excavator digging'}
                // placeholder="blur"
                quality={70}
                width={750}
                height={750}
                sizes="(min-width: 800px) 750px, calc(93.75vw + 19px)"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </li>
          </ul> */}
          {/* <h2>Our Services</h2> */}

          {/* <ul>
            <ServiceCard
              heading="FOUNDATIONS"
              image="/assets/foundation.jpg"
              link="/trucking"
              text="Your Expert in Foundation and Backfilling Services! "
            />
            <ServiceCard
              heading="TRUCKING"
              link="/trucking"
              image="/assets/trucking.jpg"
              text="From Dump trucks to equipment floating, we can help"
            />
            <ServiceCard
              heading="AGGREGATES"
              link="/trucking"
              image="/assets/aggregates.jpg"
              text="Your Trusted Aggregates Delivery Partner!"
            />
            <ServiceCard
              heading="DOZER"
              link="/trucking"
              image="/assets/IMG_0889[2382].jpg"
              text="From Dump trucks to equipment floating, we can help"
            />
            <ServiceCard
              heading="EXCAVATOR"
              image="/assets/hero.jpg"
              link="/trucking"
              text="From Dump trucks to equipment floating, we can help"
            />
            <ServiceCard
              heading="ROCK TRUCK"
              image="/assets/8420228339_78691eb78c_b.jpg"
              link="/offroad"
              text="From Dump trucks to equipment floating, we can help"
            />
            <ServiceCard
              heading="SEPTIC SYSTEMS"
              link="/trucking"
              image="/assets/Septic_tank_Bolduc.jpg"
              text="From Dump trucks to equipment floating, we can help"
            />
            <ServiceCard
              heading="FOUNDATIONS"
              image="/assets/iStock_996232320-1-scaled.jpg.optimal.jpg"
              link="/trucking"
              text="From Dump trucks to equipment floating, we can help"
            />
          </ul> */}
        </section>

        {/* <section className="reviews">
          <h3>Proudly Serving Brant County and Surrounding Areas</h3>
          {/* <div className="review-image__container">
            <Image src={pinevest} alt="PineVest Homes" layout="responsive" />
          </div>
          <div className="review-image__container">
            <Image
              src={navacon}
              alt="PineVest Homes"
              layout="responsive"
              width={30}
              height={15}
            />
          </div> */}
        {/* </section> */}
        <LocalExperts colorDark={true} />
        <WhyChooseUs />
        {/* <section className="last-call">
          <div>
            <h2>Lets get started on your next project</h2>
            <button id="cta-btn" onClick={() => router.push('/contact')}>
              Contact Us
            </button>
          </div>
        </section> */}
        <CallToAction />
      </LayoutHome>
    </Fragment>
  );
};

export default HomePage;
