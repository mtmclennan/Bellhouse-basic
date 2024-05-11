import { Fragment } from "react";
import Head from "next/head";
// import ContactForm from "../components/forms/ContactForm";
import Layout from "@/components/layoutsWeb/LayoutWeb";
import logo from "../../public/assets/BellhouseLogowhite5.png";
import Image from "next/image";

const Contact = () => {
  return (
    <Fragment>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Contact page" />
      </Head>

      <Layout>
        <section className="contact-hero__section">
          <div className="logo__wrapper">
            <Image alt="Excavator logo" src={logo} fill />
          </div>
          <div className="contact-hero">
            <h3>Reach Out and Let&apos;s Get Digging</h3>
            <h1>Contact Us Now</h1>
            <h2>(519) 752-8500</h2>

            <div className="hero__button-container">
              <a href="tel:519-752-8500">Call Now</a>
              <a href="mailto:belhouseexcavating@gmail.com">Email Us</a>
            </div>
          </div>
        </section>
        <div className="contact-form__container">{/* <ContactForm /> */}</div>
      </Layout>
    </Fragment>
  );
};

export default Contact;
