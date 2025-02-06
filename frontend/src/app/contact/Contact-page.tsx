'use client';

import { Fragment } from 'react';
// import ContactForm from "../components/forms/ContactForm";
import LayoutHome from '../components/layoutsWeb/layoutHome';
import Link from 'next/link';
import { PaperPlane, Phone } from '@phosphor-icons/react/dist/ssr';
import { PhoneCall } from '@phosphor-icons/react';
import LocalExperts from '../components/webpage/LocalExperts';
import Faq from '../components/webpage/Faq';

const Contact = () => {
  return (
    <Fragment>
      <LayoutHome>
        <section className="contact-hero__section">
          {/* <div className="logo__wrapper">
            <Image alt="Excavator logo" src={logo} fill />
          </div> */}
          <div className="contact-hero">
            <h1>
              Contact <span className="font-thin">BELLHOUSE</span>
              <span className="text"> EXCAVATING</span>
            </h1>
            <span>
              <i>Reliable. Efficient. Ready to Get to Work.</i>
            </span>
            <p>
              Have a question or need a free estimate for your project? Our team
              is ready to help! Whether you need excavation, dump truck
              services, or equipment rentals, we’re here to discuss your project
              and provide a competitive quote.
            </p>
            <h3>Reach Out and Let&apos;s Get Digging</h3>
            {/* <h2>(519) 752-8500</h2> */}

            <div className="hero__button-container">
              <Link href="tel:519-752-8500">
                <Phone size={24} />
                Call Us Now
              </Link>
              <Link href="mailto:bellhouseexcavating@gmail.com">
                <PaperPlane size={24} />
                Email Us
              </Link>
            </div>
          </div>
        </section>
        <LocalExperts colorDark={true} />
        <Faq />
      </LayoutHome>
    </Fragment>
  );
};

export default Contact;
