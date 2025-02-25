'use client';
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/assets/BellhouseLogo-text.png';
import darryl from '../../../public/assets/about-bellhouse-excavating.jpg';

import LayoutHome from '../components/layoutsWeb/layoutHome';

import ServicesGrid from '../components/webpage/services/ServicesGrid';
import WhyChooseUs from '../components/webpage/WhyChooseUs';
import CallToAction from '../components/webpage/CallToAction';
import LocalExperts from '../components/webpage/LocalExperts';

const About = () => {
  return (
    <Fragment>
      <LayoutHome>
        <section className="about-hero__section">
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
          <div className="about-hero">
            <h1>
              Over 40 Years of Trusted{' '}
              <span className="text-yellow text">Excavation </span>
              Services
            </h1>
            <h2>Quality, Safety, and Customer Satisfaction Since 1982</h2>
            <Link href={'/contact'}>Request a Quote</Link>
          </div>
        </section>
        <section className="about-content__container">
          <div className="about-content__intro">
            <div>
              <h3>
                Over 40 Years of Trusted{' '}
                <span className="text-yellow text">Excavation </span>
                Services
              </h3>
              <p>
                Since 1982, Bellhouse Excavating has been a trusted name in
                excavation and construction services throughout Brant County,
                Brantford, Hamilton, Waterloo Region, Woodstock, Oxford County,
                Halton, and surrounding areas. Built on a foundation of
                expertise, reliability, and customer satisfaction, we take pride
                in delivering high-quality workmanship and dependable service on
                every project.
              </p>
            </div>
            <Image
              width={600}
              height={600}
              src={darryl}
              sizes="(max-width: 768px) 100vw, 600px"
              style={{
                objectFit: 'cover',
                borderRadius: '8px',
                width: '100%',
                height: 'auto',
                maxWidth: '600px',
              }}
              alt="Darryl, an experienced excavator operator, skillfully maneuvering heavy machinery on a construction site. Showcasing precision and expertise, he ensures safe and efficient excavation work for Bellhouse Excavating."
            />
          </div>
          <div className="about-content__intro">
            <div className="about-content__future">
              <h3>
                A Legacy of <span className="text text-yellow">Excellence</span>
                , A Future of Innovation
              </h3>
              <p>
                In 2020, Bellhouse Excavating entered a new era of leadership.
                Darryl, a long-time employee with extensive experience in all
                facets of excavation, took over the management of the company.
                His deep industry knowledge, hands-on approach, and commitment
                to innovation have allowed Bellhouse Excavating to continue its
                tradition of excellence while adapting to modern industry
                standards.
              </p>
            </div>
          </div>
        </section>
        <ServicesGrid />
        <WhyChooseUs />
        <LocalExperts colorDark={true} />
        <CallToAction />
      </LayoutHome>
    </Fragment>
  );
};

export default About;
