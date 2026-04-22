'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import FAQAccordion from '../components/FAQAccordion';
import classes from '../components/webpage/Faq.module.scss';
import LocalExperts from '../components/webpage/LocalExperts';
import ContactForm from '../components/forms/ContactForm';
import HeroSection from '../components/sections/HeroSection/HeroSection';
import { contactHeroData } from '@/content/pages/contactSections';

const Contact = () => {
  return (
    <Fragment>
      <HeroSection data={contactHeroData} />
      <ContactForm sectionId="contact-form" />
      <LocalExperts colorDark={true} />
      <FAQAccordion
        heading="Questions Before You Reach Out?"
        subheading="Here are a few quick answers to the things people usually ask before calling."
        items={[
          {
            id: 'service-area',
            question: 'What areas do you serve?',
            answer: (
              <p>
                We provide excavation and hauling services throughout Brantford,
                Brant County, Woodstock, Hamilton, Cambridge,
                Kitchener-Waterloo, Halton, and surrounding areas.
              </p>
            ),
          },
          {
            id: 'free-estimates',
            question: 'Do you offer free estimates?',
            answer: (
              <p>
                Yes. All estimates are free and no-obligation. We&apos;ll review your
                project details and provide clear pricing before any work
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
            question: 'What information should I include when contacting you?',
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
            <h3>
              <Link href="tel:5197528500" className={classes.inlineLink}>
                Call
              </Link>{' '}
              or{' '}
              <Link href="sms:5197528500" className={classes.inlineLink}>
                text
              </Link>{' '}
              <span className="text-yellow">519-752-8500</span>
            </h3>
          </div>
        }
      />
    </Fragment>
  );
};

export default Contact;


