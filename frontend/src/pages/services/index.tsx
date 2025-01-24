import LayoutHome from '@/components/layoutsWeb/layoutHome';
import React from 'react';
import Head from 'next/head';
import Image from 'next/legacy/image';
import logo from '../../public/assets/BellhouseLogowhite5.png';
import ServicesHero from '@/components/webpage/services/ServicesHero';
import ServicesSection from '@/components/webpage/ServicesSection';
import HomeServices from '@/components/webpage/HomeServices';
import LocalExperts from '@/components/webpage/LocalExperts';
import CallToAction from '@/components/webpage/CallToAction';
import ServiceCard from '@/components/webpage/ServiceCard';
import { title } from 'process';

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
      <Head>
        <title>
          Excavation and Construction Services in Brant County | Bellhouse
          Excavating
        </title>
        <meta
          name="description"
          content="Explore our wide range of excavation and construction services at Bellhouse Excavating. From site preparation and foundations to drainage solutions and septic system installation, we offer reliable and high-quality services in Brant County, Brantford, Hamilton, Waterloo, Oxford, Halton, and surrounding areas. Contact us today to learn more about how we can assist with your next project!"
        ></meta>
      </Head>
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
        <section className="services__services">
          <h2>How We Help You Build</h2>
          <div className="services__grid">
            {services.map((service) => (
              <ServiceCard
                title={service.title}
                description={service.description}
                image={service.image}
                alt={service.alt}
                link={service.link}
                large={service.large}
              />
            ))}
          </div>
        </section>
        <LocalExperts colorDark={true} />
        <CallToAction />
        {/* <section className="services__hero">
          <div className="logo__wrapper">
            <Image
              alt="Excavator logo"
              src={logo}
              width={250}
              height={200}
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
          <h1>Services We Provide</h1> */}
        {/* </section> */}

        {/* <div className="section--container">
          <ul className="services__content">
            <li>
              <h3>Foundation Excavation and Backfilling</h3>
              <p>
                Bellhouse Excavating: Your Expert in Foundation and Backfilling
                Services! Building a solid foundation is crucial for any
                construction project. At Bellhouse Excavating, we specialize in
                providing top-notch foundation digging and backfilling services
                to ensure the stability and durability of your structure. Our
                experienced team uses state-of-the-art equipment to excavate and
                prepare the site for foundation work. We then carefully backfill
                the foundation to provide proper support and prevent settling.
                Whether constructing a new building or adding an extension, you
                can rely on Bellhouse Excavating for quality foundation and
                backfilling services.
              </p>
            </li>
            <li>
              <h3>Trucking - Floating Equipment</h3>
              <p>
                Discover Bellhouse Excavating Equipment Floating Services! Do
                you need to transport heavy equipment safely and efficiently?
                Bellhouse Excavating offers equipment floating services to help
                you reach your destination without hassle. Our specialized
                equipment and experienced team ensure that your machinery is
                transported securely, minimizing downtime and maximizing
                productivity for your project.{' '}
              </p>
            </li>
            <li>
              <h3>Aggregates Delivery</h3>
              <p>
                Bellhouse Excavating: Your Trusted Aggregates Delivery Partner!
                Need high-quality aggregates for your construction project? Look
                no further! Bellhouse Excavating offers reliable aggregate
                delivery services to meet your needs. Whether you require
                gravel, sand, or other aggregates, we have the resources and
                expertise to deliver them to your job site on time and within
                budget. Our fleet of dump trucks ensures that your aggregates
                are transported safely and efficiently, making us your trusted
                partner for all your aggregates delivery needs.{' '}
              </p>
            </li>
            <li>
              <h3>Drainage Solutions</h3>
              <p>
                Bellhouse Excavating: Your Solution for Superior Drainage!
                Don&apos;t let poor drainage dampen your construction project!
                Bellhouse Excavating offers expert drainage solutions to keep
                your property dry and protected. Our team specializes in
                designing and implementing drainage systems that effectively
                manage water runoff, preventing erosion and water damage to your
                property. Whether you need catch basins, stormwater management,
                or erosion control, Bellhouse Excavating has the expertise to
                deliver reliable solutions tailored to your needs.{' '}
              </p>
            </li>
            <li>
              <h3>Driveways and Parking Lots</h3>
              <p>
                Bellhouse Excavating: Your Partner for Perfect Driveways and
                Parking Lots! Need a new driveway or parking lot that stands the
                test of time? Bellhouse Excavating has you covered with our
                expert services! Our team excavates and prepares surfaces for
                driveways and parking lots, ensuring a solid foundation for
                long-lasting results. Whether you&apos;re looking for a new
                installation, repairs, or maintenance, our team delivers
                exceptional quality and attention to detail every step of the
                way.{' '}
              </p>
            </li>
            <li>
              <h3>Off-road truck</h3>
              <p>
                Bellhouse Excavating: Rent our Off-Road Trucks with Operators
                for On-Site Material Transport! Need to move materials on-site
                through challenging terrain? Bellhouse Excavating has you
                covered with our off-road trucks, which are available for rent
                with experienced operators! Our off-road trucks are perfect for
                transporting aggregates and fill materials around your job site,
                even in the most challenging conditions. Don&apos;t let rough
                terrain slow you down. Contact us today to learn more about
                renting our off-road trucks with operators and streamline your
                on-site material transport!
              </p>
            </li>
            <li>
              <h3>Septic Systems</h3>
              <p>
                Bellhouse Excavating: Your Trusted Septic System Installation
                Experts! Need a new septic system or replace an old one?
                Bellhouse Excavating offers expert septic system installation
                services to meet your needs! Our experienced team handles every
                installation process with precision and care, from site
                evaluation to system design and installation. We use
                high-quality materials and industry-leading techniques to ensure
                that your new septic system meets all regulations and provides
                reliable performance for years to come.
              </p>
            </li>
            <li>
              <h3>Demolition and Site Clearing</h3>
              <p>
                Bellhouse Excavating: Your Demolition Experts! Ready to start a
                new project but need to clear the way first? Bellhouse
                Excavating offers professional demolition services to help you
                get started on the right foot! Our experienced team utilizes the
                latest equipment and techniques to safely and efficiently
                demolish structures of all sizes. Whether you need a complete
                building demolition or selective demolition for renovations,
                we&apos;ve got you covered. Trust Bellhouse Excavating to handle
                your demolition needs with precision and care.{' '}
              </p>
            </li>
          </ul> */}

        {/* <ServicesSection
          offset="right"
          image={excavtor}
          title="Excavating"
          message="We dig with excavators Residential and Commercial Excavating: Your Project, Perfected"
        />
        <ServicesSection
          offset="right"
          image={truck}
          title="Trucking"
          message="We dig with excavators Residential and Commercial Excavating: Your Project, Perfected"
        />
        <ServicesSection
          offset="right"
          image={skidSteer}
          title="Skid Steer"
          message="We dig with excavators Residential and Commercial Excavating: Your Project, Perfected"
        />
        <ServicesSection
          offset="right"
          image={dozer}
          title="Dozer"
          message="We dig with excavators Residential and Commercial Excavating: Your Project, Perfected"
        />
        <ServicesSection
          offset="right"
          image={rockTruck}
          title="OffRoad Truck"
          message="We dig with excavators Residential and Commercial Excavating: Your Project, Perfected"
        />
        <ServicesSection
          offset="right"
          image={septic}
          title="Septic Systems"
          message="We dig with excavators Residential and Commercial Excavating: Your Project, Perfected"
        />
        <ServicesSection
          offset="right"
          image={foundation}
          title="Foundation"
          message="We dig with excavators Residential and Commercial Excavating: Your Project, Perfected"
        />
        <ServicesSection
          offset="right"
          image={skidSteer}
          title="Skid Steer"
          message="We dig with excavators Residential and Commercial Excavating: Your Project, Perfected"
        />
        <ServicesSection
          offset="right"
          image={skidSteer}
          title="Skid Steer"
          message="We dig with excavators Residential and Commercial Excavating: Your Project, Perfected"
        /> */}
        {/* </div> */}
      </LayoutHome>
    </>
  );
};

export default Services;
