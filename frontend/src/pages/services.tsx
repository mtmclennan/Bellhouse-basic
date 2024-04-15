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
import Image from "next/image";
import logo from "../../public/assets/excvator-white.png";

const Services = () => {
  return (
    <Layout>
      <section className="services__hero">
        <div className="logo__wrapper">
          <Image alt="Excavator logo" src={logo} fill />
        </div>
        <h1>Services We Provide</h1>
      </section>

      <div className="section--container">
        <ServicesSection
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
        />
      </div>
    </Layout>
  );
};

export default Services;
