'use client';
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/assets/BellhouseLogo-text.png';
import darryl from '../../../public/assets/about-bellhouse-excavating.jpg';
import reviews from '@/data/reviews.json';
import ServicesGrid from '../components/webpage/services/ServicesGrid';
import WhyChooseUs from '../components/webpage/WhyChooseUs';
import CallToAction from '../components/webpage/CallToAction';
import ServiceArea from '../components/webpage/ServiceArea';
import Reviews from '../components/webpage/Reviews';
import classes from './About-page.module.scss';

const proofItems = [
  {
    title: 'Long-running local work',
    text: 'Decades of excavation and trucking work across Brantford and nearby Southern Ontario communities.',
  },
  {
    title: 'Local Coverage',
    text: 'Brantford, Paris, Hamilton, Cambridge, Woodstock, and nearby active job sites.',
  },
  {
    title: 'Core Site Work',
    text: 'Excavation, grading, trucking, material delivery, and equipment moves handled under one company.',
  },
  {
    title: 'Project Fit',
    text: 'Residential, commercial, agricultural, and contractor-led work with practical scheduling and coordination.',
  },
];

const About = () => {
  return (
    <Fragment>
      <section className={classes.heroSection}>
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
        <div className={classes.hero}>
          <p className={classes.eyebrow}>About Bellhouse Excavating</p>
          <h1>
            Trusted excavation, grading, and trucking since{' '}
            <span className={classes.text}>1982</span>
          </h1>
          <h2>
            Bellhouse Excavating supports Brantford and nearby Southern Ontario
            projects with foundation excavation, site prep, dump truck hauling,
            material delivery, and equipment moves.
          </h2>
          <div className={classes.actions}>
            <Link className={classes.btn} href={'/contact'}>
              Request an Estimate
            </Link>
            <Link className={classes.btnSecondary} href={'/services'}>
              View Services
            </Link>
            <Link className={classes.btnSecondary} href={'/service-areas'}>
              View Service Areas
            </Link>
          </div>
        </div>

        <div className={classes.proofGrid}>
          {proofItems.map((item) => (
            <article className={classes.proofItem} key={item.title}>
              <span className={classes.proofTitle}>{item.title}</span>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={classes.contentSection}>
        <div className={classes.contentContainer}>
          <div className={classes.contentGrid}>
            <div className={classes.copyBlock}>
              <h3>
                A local excavation company built on real field{' '}
                <span className={classes.inlineAccent}>experience</span>
              </h3>
              <p>
                Since 1982, Bellhouse Excavating has worked across Brantford,
                Brant County, Hamilton-area communities, Cambridge, Woodstock,
                and nearby Southern Ontario. The company has stayed in rotation
                by doing practical site work, keeping schedules dependable, and
                showing up with equipment ready to work.
              </p>
              <p>
                Bellhouse handles{' '}
                <Link href="/services/foundation-excavation">
                  foundation excavation
                </Link>
                ,{' '}
                <Link href="/services/site-preparation-land-grading">
                  site preparation and grading
                </Link>
                , <Link href="/services/dump-truck-rental">dump truck hauling</Link>,{' '}
                <Link href="/services/dirt-gravel-delivery">
                  material delivery
                </Link>
                , and{' '}
                <Link href="/services/heavy-equipment-hauling">
                  equipment floating
                </Link>{' '}
                for residential, commercial, agricultural, and contractor-led
                work.
              </p>
              <p>
                That includes homeowners who need the site handled properly,
                builders who need the next stage ready on time, and contractors
                who want excavation and trucking kept on one plan. For repeat
                project support, visit the{' '}
                <Link href="/contractors">contractor project support page</Link>.
              </p>
            </div>
            <div className={classes.mediaBlock}>
              <div className={classes.imageFrame}>
                <Image
                  width={600}
                  height={600}
                  src={darryl}
                  sizes="(max-width: 768px) 100vw, 600px"
                  className={classes.featureImage}
                  alt="Bellhouse Excavating operator working on an excavation and site-prep project near Brantford."
                />
                <div className={classes.imageOverlay} />
                <div className={classes.imageBadge}>
                  <span>Excavation</span>
                  <span>Grading</span>
                  <span>Hauling</span>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.historyBlock}>
            <h3>
              What that experience means on{' '}
              <span className={classes.inlineAccent}>site</span>
            </h3>
            <p>
              In 2020, Darryl, a long-time Bellhouse employee with hands-on
              excavation experience, took over management of the company. That
              continuity matters. Bellhouse kept the local reputation it had
              built while staying focused on modern equipment, site-specific
              planning, and straightforward communication.
            </p>
            <p>
              The work stays grounded in what real projects need: a foundation
              cut to grade, spoil hauled out on time, imported material
              delivered when the site is ready, and the next trade able to move
              in without rework. That is what Bellhouse is known for on smaller
              local jobs and active contractor-led sites.
            </p>
            <p>
              If you need pricing or want to confirm whether Bellhouse is the
              right fit, <Link href="/contact">talk about your project</Link>,{' '}
              explore the local <Link href="/service-areas">service areas</Link>,
              or review the{' '}
              <Link href="/contractors">contractor project support page</Link>.
            </p>
          </div>
        </div>
      </section>

      <ServicesGrid
        dark
        heading="Core work Bellhouse handles most often"
        intro="If Bellhouse looks like the right fit, these are the services customers, builders, and contractors call for most often across local projects and active sites."
        actions={[
          { href: '/services', label: 'View Services' },
          {
            href: '/contact',
            label: 'Talk About Your Project',
            variant: 'secondary',
          },
        ]}
      />
      <WhyChooseUs />
      <ServiceArea
        heading="Where Bellhouse works"
        subtext="Bellhouse supports excavation, grading, hauling, and site work across Brantford, Paris, Hamilton, Cambridge, and nearby Southern Ontario communities."
        locations={[
          { label: 'Brantford', href: '/service-areas/brantford' },
          { label: 'Paris', href: '/service-areas/paris' },
          { label: 'Hamilton', href: '/service-areas/hamilton' },
          { label: 'Cambridge', href: '/service-areas/cambridge' },
          'St. George',
          'Burford',
        ]}
        actions={[
          { label: 'View Service Areas', href: '/service-areas' },
          {
            label: 'Contractor Project Support',
            href: '/contractors',
            variant: 'secondary',
          },
        ]}
      />
      <Reviews reviews={reviews} />
      <CallToAction buttonLabel="Request an Estimate" />
    </Fragment>
  );
};

export default About;