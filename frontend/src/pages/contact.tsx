import { Fragment } from "react";
import Head from "next/head";
import ContactForm from "../components/forms/ContactForm";
import Layout from "@/components/layoutsWeb/LayoutWeb";
import logo from "../../public/assets/excvator-white.png";
import Image from "next/image";

const Contact = () => {
  return (
    <Fragment>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Contact page" />
      </Head>

      <Layout>
        <section className="contact-hero__section">
          <div className="logo__wrapper">
            <Image alt="Excavator logo" src={logo} fill />
          </div>
          <div className="contact-hero">
            <h3>Reach Out and Let's Get Digging</h3>
            <h1>Contact Us Now</h1>
            <h2>Call Us: (519) 752-8500</h2>
          </div>
        </section>
        <div className="contact-form__container">
          <ContactForm />
        </div>
      </Layout>
    </Fragment>
  );
};

export default Contact;
