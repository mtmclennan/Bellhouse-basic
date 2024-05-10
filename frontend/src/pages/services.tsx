import Layout from "@/components/layoutsWeb/LayoutWeb";
import ServicesSection from "@/components/webpage/ServicesSection";
import React from "react";
import excavtor from "../../public/assets/20230509_103809.jpg";
import truck from "../../public/assets/20230523_133832.jpg";
import skidSteer from "../../public/assets/20230523_133653.jpg";
import dozer from "../../public/assets/IMG_0889[2382].jpg";
import septic from "../../public/assets/Septic_tank_Bolduc.jpg";
import rockTruck from "../../public/assets/8420228339_78691eb78c_b.jpg";
import foundation from "../../public/assets/iStock_996232320-1-scaled.jpg.optimal.jpg";
import Image from "next/legacy/image";
import logo from "../../public/assets/BellhouseLogowhite5.png";

const Services = () => {
  return (
    <Layout>
      <section className="services__hero">
        <div className="logo__wrapper">
          <Image
            alt="Excavator logo"
            src={logo}
            width={250}
            height={200}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <h1>Services We Provide</h1>
      </section>

      <div className="section--container">
        <ul className="services__content">
          <li>
            <h3>Fountain Excavation and Backfilling</h3>
            <p>
              Bellhouse Excavating: Your Expert in Foundation and Backfilling
              Services! Building a solid foundation is crucial for any
              construction project. At Bellhouse Excavating, we specialize in
              providing top-notch foundation digging and backfilling services to
              ensure the stability and durability of your structure. Our
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
              Discover Bellhouse Excavating Equipment Floating Services! Do you
              need to transport heavy equipment safely and efficiently?
              Bellhouse Excavating offers equipment floating services to help
              you reach your destination without hassle. Our specialized
              equipment and experienced team ensure that your machinery is
              transported securely, minimizing downtime and maximizing
              productivity for your project.{" "}
            </p>
          </li>
          <li>
            <h3>Aggregates Delivery</h3>
            <p>
              Bellhouse Excavating: Your Trusted Aggregates Delivery Partner!
              Need high-quality aggregates for your construction project? Look
              no further! Bellhouse Excavating offers reliable aggregate
              delivery services to meet your needs. Whether you require gravel,
              sand, or other aggregates, we have the resources and expertise to
              deliver them to your job site on time and within budget. Our fleet
              of dump trucks ensures that your aggregates are transported safely
              and efficiently, making us your trusted partner for all your
              aggregates delivery needs.{" "}
            </p>
          </li>
          <li>
            <h3>Drainage Solutions</h3>
            <p>
              Bellhouse Excavating: Your Solution for Superior Drainage!
              Don&apos;t let poor drainage dampen your construction project!
              Bellhouse Excavating offers expert drainage solutions to keep your
              property dry and protected. Our team specializes in designing and
              implementing drainage systems that effectively manage water
              runoff, preventing erosion and water damage to your property.
              Whether you need catch basins, stormwater management, or erosion
              control, Bellhouse Excavating has the expertise to deliver
              reliable solutions tailored to your needs.{" "}
            </p>
          </li>
          <li>
            <h3>Driveways and Parking Lots</h3>
            <p>
              Bellhouse Excavating: Your Partner for Perfect Driveways and
              Parking Lots! Need a new driveway or parking lot that stands the
              test of time? Bellhouse Excavating has you covered with our expert
              services! Our team excavates and prepares surfaces for driveways
              and parking lots, ensuring a solid foundation for long-lasting
              results. Whether you&apos;re looking for a new installation,
              repairs, or maintenance, our team delivers exceptional quality and
              attention to detail every step of the way.{" "}
            </p>
          </li>
          <li>
            <h3>Off-road truck</h3>
            <p>
              Bellhouse Excavating: Rent our Off-Road Trucks with Operators for
              On-Site Material Transport! Need to move materials on-site through
              challenging terrain? Bellhouse Excavating has you covered with our
              off-road trucks, which are available for rent with experienced
              operators! Our off-road trucks are perfect for transporting
              aggregates and fill materials around your job site, even in the
              most challenging conditions. Don&apos;t let rough terrain slow you
              down. Contact us today to learn more about renting our off-road
              trucks with operators and streamline your on-site material
              transport!
            </p>
          </li>
          <li>
            <h3>Septic Systems</h3>
            <p>
              Bellhouse Excavating: Your Trusted Septic System Installation
              Experts! Need a new septic system or replace an old one? Bellhouse
              Excavating offers expert septic system installation services to
              meet your needs! Our experienced team handles every installation
              process with precision and care, from site evaluation to system
              design and installation. We use high-quality materials and
              industry-leading techniques to ensure that your new septic system
              meets all regulations and provides reliable performance for years
              to come.
            </p>
          </li>
          <li>
            <h3>Demolition and Site Clearing</h3>
            <p>
              Bellhouse Excavating: Your Demolition Experts! Ready to start a
              new project but need to clear the way first? Bellhouse Excavating
              offers professional demolition services to help you get started on
              the right foot! Our experienced team utilizes the latest equipment
              and techniques to safely and efficiently demolish structures of
              all sizes. Whether you need a complete building demolition or
              selective demolition for renovations, we&apos;ve got you covered.
              Trust Bellhouse Excavating to handle your demolition needs with
              precision and care.{" "}
            </p>
          </li>
        </ul>

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
      </div>
    </Layout>
  );
};

export default Services;
