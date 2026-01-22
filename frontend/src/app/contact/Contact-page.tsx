'use client';

import { Fragment, useRef } from 'react';
import Image from 'next/image';
import logo from '../../../public/assets/BellhouseLogo-text.png';
import LayoutHome from '../components/layoutsWeb/layoutHome';
import Link from 'next/link';
import FAQAccordion from '../components/FAQAccordion';
import { Phone } from '@phosphor-icons/react/dist/ssr';
import classes from '../components/webpage/Faq.module.scss';
import LocalExperts from '../components/webpage/LocalExperts';
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
                width={160}
                height={124}
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
        {/* <Faq /> */}
        <FAQAccordion
          heading="Questions Before You Reach Out?"
          subheading="Here are a few quick answers to the things people usually ask before calling."
          items={[
            {
              id: 'service-area',
              question: 'What areas do you serve?',
              answer: (
                <p>
                  We provide excavation and hauling services throughout
                  Brantford, Brant County, Woodstock, Hamilton, Cambridge,
                  Kitchener-Waterloo, Halton, and surrounding areas.
                </p>
              ),
            },
            {
              id: 'free-estimates',
              question: 'Do you offer free estimates?',
              answer: (
                <p>
                  Yes. All estimates are free and no-obligation. We’ll review
                  your project details and provide clear pricing before any work
                  begins.
                </p>
              ),
            },
            {
              id: 'response-time',
              question: 'How quickly will you respond?',
              answer: (
                <p>
                  We typically respond within one business day. Urgent requests
                  are prioritized whenever possible.
                </p>
              ),
            },
            {
              id: 'project-size',
              question: 'Is my project too small?',
              answer: (
                <p>
                  No. We handle everything from small residential jobs to larger
                  commercial and agricultural projects.
                </p>
              ),
            },
            {
              id: 'what-to-provide',
              question:
                'What information should I include when contacting you?',
              answer: (
                <p>
                  A brief description of the work, the project location, and any
                  known timelines is usually enough to get started.
                </p>
              ),
            },
          ]}
          cta={
            <div className={classes.call}>
              <h3>Still have questions?</h3>
              <Link href="tel:519-752-8500">
                <h3>
                  Call us at <span className="text-yellow">519-752-8500</span>
                </h3>
              </Link>
            </div>
          }
        />
      </LayoutHome>
    </Fragment>
  );
};

export default Contact;
