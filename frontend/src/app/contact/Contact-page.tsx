'use client';

import { Fragment, useRef } from 'react';
import Image from 'next/image';
import logo from '../../../public/assets/BellhouseLogo-text.png';
import LayoutHome from '../components/layoutsWeb/layoutHome';
import Link from 'next/link';
import { Phone } from '@phosphor-icons/react/dist/ssr';
import LocalExperts from '../components/webpage/LocalExperts';
import Faq from '../components/webpage/Faq';
import ContactForm from '../components/forms/ContactForm';

const Contact = () => {
  const contactFormRef = useRef<{ scrollToForm: () => void } | null>(null);
  return (
    <Fragment>
      <LayoutHome>
        <section className="contact-hero__section">
          {/* <div className="logo__wrapper">
            <Image alt="Excavator logo" src={logo} fill />
          </div> */}
          <div className="contact-hero">
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
              Contact <span className="font-thin">BELLHOUSE</span>
              <span className="text text-yellow"> EXCAVATING</span>
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
            <Link href="tel:519-752-8500">
              <Phone size={60} color={'#ffc302'} />
              <h2 className="text-yellow">(519) 752-8500</h2>
            </Link>

            <div className="hero__button-container">
              <button onClick={() => contactFormRef.current?.scrollToForm()}>
                Contact Us Now
              </button>
            </div>
          </div>
        </section>
        <ContactForm ref={contactFormRef} />
        <LocalExperts colorDark={true} />
        <Faq />
      </LayoutHome>
    </Fragment>
  );
};

export default Contact;
