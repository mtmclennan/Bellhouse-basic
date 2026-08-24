'use client';

import { Fragment, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin } from '@phosphor-icons/react';
import ContactForm, { DEFAULT_WORK_TYPE_OPTIONS } from '../components/forms/ContactForm';
import ContactMethodsSection from '../components/sections/ContactMethodsSection/ContactMethodsSection';
import FaqSection from '../components/sections/FaqSection/FaqSection';
import FinalCtaSection from '../components/sections/FinalCtaSection/FinalCtaSection';
import HeroSection from '../components/sections/HeroSection/HeroSection';
import ServiceAreasSection from '../components/sections/ServiceAreaSection/ServiceAreaSection';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { resolveCalculatorWorkType } from '@/features/calculators/config/calculatorWorkType';
import {
  clearCalculatorLead,
  readCalculatorLead,
} from '@/features/calculators/lead/calculatorLeadStorage';
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

const Contact = () => {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service') ?? '';
  const source = searchParams.get('source');

  // A calculator handoff (source=calculator) resolves the work type through
  // the centralized calculator -> work-type mapping; every other ?service=
  // link keeps the existing exact-match-against-the-dropdown behaviour.
  const initialService =
    source === 'calculator'
      ? resolveCalculatorWorkType(serviceParam)
      : DEFAULT_WORK_TYPE_OPTIONS.find(
          (opt) => opt.toLowerCase() === serviceParam.toLowerCase(),
        );

  const [initialMessage, setInitialMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (source !== 'calculator') {
      return;
    }

    // sessionStorage only exists client-side, so this can't run any earlier
    // than mount — reading it here (not during render) also keeps SSR/SSG
    // output stable and avoids a hydration mismatch on the message field.
    const lead = readCalculatorLead();
    if (lead) {
      setInitialMessage(lead.message);
      clearCalculatorLead();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

            <section className={pageClasses.planningCard}>
              <h3 className={pageClasses.detailTitle}>
                <MapPin
                  size={20}
                  color="#ffc302"
                  weight="duotone"
                  className={pageClasses.addressIcon}
                  aria-hidden="true"
                />
                Mailing Address
              </h3>
              <address className={pageClasses.address}>
                573 Governors Rd E
                <br />
                Paris, ON N3L 3E1
              </address>
              <p className={pageClasses.responseNote}>
                Mon&ndash;Fri, 7:00 AM&ndash;5:00 PM
              </p>
            </section>
          </aside>

          <div className={pageClasses.formPane}>
            <div className={pageClasses.formColumn}>
              <ContactForm
                embedded={true}
                sectionId="contact-form"
                initialService={initialService}
                initialMessage={initialMessage}
              />
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


