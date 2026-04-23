'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { ChatText, ClipboardText, PhoneCall } from '@phosphor-icons/react';
import ContactForm from '../components/forms/ContactForm';
import FaqSection from '../components/sections/FaqSection/FaqSection';
import HeroSection from '../components/sections/HeroSection/HeroSection';
import ServiceAreasSection from '../components/sections/ServiceAreaSection/ServiceAreaSection';
import SectionWrapper from '@/components/layout/SectionWrapper';
import {
  contactBusinessContextData,
  contactFaqSection,
  contactHeroData,
  contactSupportData,
  contactTrustPanelData,
  contactServiceAreasSection,
} from '@/content/pages/contactSections';
import pageClasses from './Contact-page.module.scss';

function renderMethodIcon(methodId: 'call' | 'text' | 'form') {
  const iconProps = { size: 24, weight: 'fill' as const };

  switch (methodId) {
    case 'call':
      return <PhoneCall {...iconProps} />;
    case 'text':
      return <ChatText {...iconProps} />;
    case 'form':
      return <ClipboardText {...iconProps} />;
    default:
      return null;
  }
}

const Contact = () => {
  return (
    <Fragment>
      <HeroSection data={contactHeroData} />
      <SectionWrapper
        spacing="tight"
        className={pageClasses.formSection}
        containerClassName={pageClasses.formSectionContainer}
      >
        <div className={pageClasses.formShell}>
          <aside className={pageClasses.supportPanel}>
            <p className={pageClasses.eyebrow}>{contactSupportData.eyebrow}</p>
            <h2 className={pageClasses.supportHeading}>
              {contactSupportData.heading}
            </h2>
            <p className={pageClasses.supportIntro}>
              {contactSupportData.intro}
            </p>

            <div className={pageClasses.businessSummaryLine}>
              <strong>{contactBusinessContextData.heading}</strong>
              <span>{contactBusinessContextData.summary}</span>
            </div>

            <section className={pageClasses.contactGuideCard}>
              {contactSupportData.methods.map((method) => (
                <div key={method.id} className={pageClasses.methodRow}>
                  <div className={pageClasses.methodLabelWrap}>
                    <span className={pageClasses.methodIcon} aria-hidden="true">
                      {renderMethodIcon(method.id)}
                    </span>
                    <h3 className={pageClasses.methodTitle}>{method.label}</h3>
                  </div>
                  <p className={pageClasses.methodText}>{method.text}</p>
                  <Link
                    href={method.actionHref}
                    className={pageClasses.methodLink}
                  >
                    {method.actionLabel}
                  </Link>
                </div>
              ))}
            </section>

            <section className={pageClasses.planningCard}>
              <h3 className={pageClasses.detailTitle}>
                {contactSupportData.planning.title}
              </h3>
              <ul className={pageClasses.detailList}>
                {contactSupportData.planning.items.map((item) => (
                  <li key={item} className={pageClasses.detailItem}>
                    {item}
                  </li>
                ))}
              </ul>
              <p className={pageClasses.responseNote}>
                {contactSupportData.planning.responseNote}
              </p>
              <div className={pageClasses.linkList}>
                {contactSupportData.linkGroups.flatMap((group) =>
                  group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={pageClasses.supportLink}
                    >
                      {link.label}
                    </Link>
                  )),
                )}
              </div>
            </section>
          </aside>

          <div className={pageClasses.formPane}>
            <div className={pageClasses.formColumn}>
              <ContactForm embedded={true} sectionId="contact-form" />
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
    </Fragment>
  );
};

export default Contact;


