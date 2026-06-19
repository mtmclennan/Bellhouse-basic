'use client';

import { Fragment } from 'react';
import { useSearchParams } from 'next/navigation';
import ContactForm from '../components/forms/ContactForm';
import ContactMethodsSection from '../components/sections/ContactMethodsSection/ContactMethodsSection';
import FaqSection from '../components/sections/FaqSection/FaqSection';
import FinalCtaSection from '../components/sections/FinalCtaSection/FinalCtaSection';
import HeroSection from '../components/sections/HeroSection/HeroSection';
import ServiceAreasSection from '../components/sections/ServiceAreaSection/ServiceAreaSection';
import SectionWrapper from '@/components/layout/SectionWrapper';
import {
  contactFaqSection,
  contactFinalCtaSection,
  contactFormSupportData,
  contactHeroData,
  contactMethodsSection,
  contactTrustPanelData,
  contactServiceAreasSection,
} from '@/content/pages/contactSections';
import pageClasses from './Contact-page.module.scss';

const DEFAULT_WORK_TYPE_OPTIONS = [
  'Other','Foundation Excavation','Site Grading','Land Clearing','Demolition',
  'Retaining Walls','Utility Trenches','Erosion Control','Septic System','Drainage',
  'Dump Truck Services','Equipment Hauling','Gravel Delivery','Sand Delivery',
  'Topsoil Delivery','Fill Dirt','Driveway','Parking Lot',
];

const Contact = () => {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service') ?? '';
  const initialService = DEFAULT_WORK_TYPE_OPTIONS.find(
    (opt) => opt.toLowerCase() === serviceParam.toLowerCase(),
  );

  return (
    <Fragment>
      <HeroSection data={contactHeroData} />
      <ContactMethodsSection data={contactMethodsSection} />
      <SectionWrapper
        spacing="tight"
        className={pageClasses.formSection}
        containerClassName={pageClasses.formSectionContainer}
      >
        <div className={pageClasses.formShell}>
          <aside className={pageClasses.supportPanel}>
            <p className={pageClasses.eyebrow}>
              {contactFormSupportData.eyebrow}
            </p>
            <h2 className={pageClasses.supportHeading}>
              {contactFormSupportData.heading}
            </h2>
            <p className={pageClasses.supportIntro}>
              {contactFormSupportData.intro}
            </p>

            <section className={pageClasses.planningCard}>
              <h3 className={pageClasses.detailTitle}>
                {contactFormSupportData.planning.title}
              </h3>
              <ul className={pageClasses.detailList}>
                {contactFormSupportData.planning.items.map((item) => (
                  <li key={item} className={pageClasses.detailItem}>
                    {item}
                  </li>
                ))}
              </ul>
              <p className={pageClasses.responseNote}>
                {contactFormSupportData.planning.responseNote}
              </p>
            </section>
          </aside>

          <div className={pageClasses.formPane}>
            <div className={pageClasses.formColumn}>
              <ContactForm embedded={true} sectionId="contact-form" initialService={initialService} />
              <section className={pageClasses.trustPanel}>
                <p className={pageClasses.trustIntro}>
                  {contactTrustPanelData.text}
                </p>
                <p className={pageClasses.trustQuoteText}>
                  &ldquo;{contactTrustPanelData.quote.text}&rdquo;
                </p>
                <p className={pageClasses.trustQuoteMeta}>
                  {contactTrustPanelData.quote.name} |{' '}
                  {contactTrustPanelData.quote.source}
                </p>
              </section>
            </div>
          </div>
        </div>
      </SectionWrapper>
      <ServiceAreasSection data={contactServiceAreasSection} />
      <FaqSection data={contactFaqSection} />
      <FinalCtaSection data={contactFinalCtaSection} />
    </Fragment>
  );
};

export default Contact;


