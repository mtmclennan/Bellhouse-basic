'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Gear, Star } from '@phosphor-icons/react/dist/ssr';

import logo from '../../../../../public/assets/BellhouseLogo-text.png';
import FAQAccordion from '@/app/components/FAQAccordion';
import TestimonialsSection from '@/app/components/sections/TestimonialsSection/TestimonialsSection';
import reviews from '@/data/reviews.json';
import type { ServicePage } from '@/types/interfaces';
import type {
  RelatedServiceLinkItem,
  ServiceLocalIntentContent,
} from '@/lib/servicePageLinks';
import type {
  ResolvedServiceContractorCtaConfig,
  ResolvedServiceFinalCtaConfig,
  ResolvedServiceHeroConfig,
  ResolvedServiceResourcesConfig,
} from '@/lib/servicePageLayout';
import classes from './ServiceLayout.module.scss';

type SectionProps = {
  emphasis?: 'low' | 'standard' | 'high';
};

export function ServiceHeroSection({
  service,
  heroConfig,
}: {
  service: ServicePage;
  heroConfig: ResolvedServiceHeroConfig;
}) {
  return (
    <section className={classes.container} data-hero-emphasis={heroConfig.emphasis}>
      <div className={classes.heroShell}>
        <div className={classes.heroContent}>
          <div className="contact-hero">
            <div className="hero-logo__mobile">
              <Image
                src={logo}
                alt="Bellhouse Excavating logo"
                quality={80}
                width={200}
                height={155}
                sizes="(max-width: 375px) 120px, (max-width: 768px) 160px, 200px"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </div>

          {heroConfig.eyebrow ? (
            <p className={classes.heroEyebrow}>{heroConfig.eyebrow}</p>
          ) : null}

          <div className={classes.hero}>
            <h1>{service.hero.heading}</h1>
            <p className={classes.heroSummary}>{heroConfig.summary}</p>

            <div className={classes.contractorActions}>
              <Link href={heroConfig.primaryAction.href} className={classes.btn}>
                {heroConfig.primaryAction.label}
              </Link>
              {heroConfig.secondaryAction ? (
                <Link
                  href={heroConfig.secondaryAction.href}
                  className={classes.btnSecondary}
                >
                  {heroConfig.secondaryAction.label}
                </Link>
              ) : null}
            </div>

            {heroConfig.proofChips.length > 0 ? (
              <div className={classes.heroProofList}>
                {heroConfig.proofChips.map((chip) => (
                  <span key={chip} className={classes.heroProofChip}>
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className={classes.heroMedia}>
          <div className={classes.heroImageFrame}>
            <Image
              className={classes.image}
              src={service.hero.image}
              alt={service.hero.alt}
              width={650}
              height={550}
              priority
              sizes="(max-width: 768px) 100vw, 42vw"
            />
            <div className={classes.heroImageOverlay} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceIntroSection({
  service,
  emphasis = 'standard',
}: {
  service: ServicePage;
} & SectionProps) {
  return (
    <section className={classes.introContainer} data-section-emphasis={emphasis}>
      <h2>{service.intro.heading}</h2>

      <div className={classes.introContent}>
        <p>{service.intro.content}</p>

        <ul>
          {service.intro.keypoints.map((point) => (
            <li key={point}>
              <Star size={24} color="#ffc302" weight="fill" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServiceProofSection({
  service,
  emphasis = 'standard',
}: {
  service: ServicePage;
} & SectionProps) {
  if (!service.includes) {
    return null;
  }

  return (
    <section className={classes.section} data-section-emphasis={emphasis}>
      <h2>{service.includes.heading}</h2>
      {service.includes.subheading ? (
        <p className={classes.subtext}>{service.includes.subheading}</p>
      ) : null}

      <div className={classes.featureGrid}>
        {service.includes.items.map((item) => (
          <div key={item.title} className={classes.featureCard}>
            <div className={classes.featureHeading}>
              <CheckCircle size={32} weight="regular" className={classes.icon} />
              <h3>{item.title}</h3>
            </div>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServiceFitSection({
  service,
  emphasis = 'standard',
}: {
  service: ServicePage;
} & SectionProps) {
  if (!service.fit) {
    return null;
  }

  return (
    <section className={classes.section} data-section-emphasis={emphasis}>
      <p className={classes.eyebrow}>Project fit</p>
      <h2>{service.fit.heading}</h2>
      {service.fit.subheading ? (
        <p className={classes.subtext}>{service.fit.subheading}</p>
      ) : null}

      <div className={classes.featureGrid}>
        {service.fit.items.map((item) => (
          <div key={item.title} className={classes.featureCard}>
            <div className={classes.featureHeading}>
              <CheckCircle size={32} weight="regular" className={classes.icon} />
              <h3>{item.title}</h3>
            </div>

            <p>{item.description}</p>

            {item.projectTypes && item.projectTypes.length > 0 ? (
              <div className={classes.fitTagList}>
                {item.projectTypes.map((projectType) => (
                  <span key={projectType} className={classes.fitTag}>
                    {projectType}
                  </span>
                ))}
              </div>
            ) : null}

            {item.outcome ? (
              <p className={classes.fitOutcome}>
                <strong>What this supports:</strong> {item.outcome}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServiceEquipmentSection({
  service,
  emphasis = 'standard',
}: {
  service: ServicePage;
} & SectionProps) {
  if (!service.equipment) {
    return null;
  }

  return (
    <section
      className={classes.equipmentSection}
      data-section-emphasis={emphasis}
    >
      <div className={classes.heading}>
        <h2>{service.equipment.heading}</h2>
        {service.equipment.subheading ? <p>{service.equipment.subheading}</p> : null}
      </div>

      <div className={classes.equipmentGrid}>
        {service.equipment.items.map((item) => (
          <div key={item.title} className={classes.equipmentItem}>
            <div className={classes.equipmentIcon}>
              {item.icon ? (
                <Image src={item.icon} alt={item.title} width={150} height={150} />
              ) : (
                <Gear size={40} weight="fill" />
              )}
            </div>

            <div className={classes.eqText}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServiceProcessSection({
  service,
  emphasis = 'standard',
}: {
  service: ServicePage;
} & SectionProps) {
  if (!service.process) {
    return null;
  }

  return (
    <section className={classes.processSection} data-section-emphasis={emphasis}>
      <h2>{service.process.heading}</h2>
      {service.process.subheading ? (
        <p className={classes.subtext}>{service.process.subheading}</p>
      ) : null}

      <div className={classes.processList}>
        {service.process.steps.map((step, index) => (
          <div key={step.title} className={classes.processItem}>
            <div className={classes.stepNumber}>{index + 1}</div>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServiceLocalIntentSection({
  service,
  localIntent,
  emphasis = 'standard',
}: {
  service: ServicePage;
  localIntent: ServiceLocalIntentContent | null;
} & SectionProps) {
  if (!service.serviceArea || !localIntent) {
    return null;
  }

  return (
    <section
      className={`${classes.section} ${classes.serviceAreaSection}`}
      data-section-emphasis={emphasis}
    >
      <p className={classes.eyebrow}>Service areas</p>
      <h2>{service.serviceArea.heading}</h2>
      <p className={classes.subtext}>{localIntent.paragraph}</p>

      {localIntent.linkedAreas.length > 0 ? (
        <div className={classes.locationGrid}>
          {localIntent.linkedAreas.map((location) => (
            <Link
              className={classes.locationLinkCard}
              href={location.href}
              key={`${location.href}-${location.label}`}
            >
              See service in {location.label}
            </Link>
          ))}
        </div>
      ) : null}

      <div className={classes.locationActions}>
        <Link href={localIntent.viewAllHref} className={classes.btnSecondary}>
          {localIntent.viewAllLabel}
        </Link>
      </div>
    </section>
  );
}

export function ServiceContractorCtaSection({
  contractorCta,
  emphasis = 'standard',
}: {
  contractorCta: ResolvedServiceContractorCtaConfig | null;
} & SectionProps) {
  if (!contractorCta) {
    return null;
  }

  return (
    <section
      className={classes.contractorCtaSection}
      data-section-emphasis={emphasis}
    >
      <div className={classes.contractorCtaShell}>
        <p className={classes.eyebrow}>{contractorCta.eyebrow}</p>
        <h2>{contractorCta.title}</h2>
        <p>{contractorCta.description}</p>
        <div className={classes.contractorActions}>
          <Link href={contractorCta.primaryAction.href} className={classes.btn}>
            {contractorCta.primaryAction.label}
          </Link>
          {contractorCta.secondaryAction ? (
            <Link
              href={contractorCta.secondaryAction.href}
              className={classes.btnSecondary}
            >
              {contractorCta.secondaryAction.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function ServiceResourcesSection({
  resourcesConfig,
  emphasis = 'standard',
}: {
  resourcesConfig: ResolvedServiceResourcesConfig | null;
} & SectionProps) {
  if (!resourcesConfig) {
    return null;
  }

  return (
    <section className={classes.calculatorSection} data-section-emphasis={emphasis}>
      <div className={classes.calculatorShell}>
        <p className={classes.eyebrow}>{resourcesConfig.eyebrow}</p>
        <h2>{resourcesConfig.title}</h2>
        <p>{resourcesConfig.description}</p>
        <div className={classes.calculatorGrid}>
          {resourcesConfig.links.map((linkItem) => (
            <div className={classes.calculatorCard} key={linkItem.href}>
              <h3>{linkItem.title}</h3>
              <p>{linkItem.description}</p>
              <div className={classes.contractorActions}>
                <Link href={linkItem.href} className={classes.btn}>
                  {linkItem.actionLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className={classes.contractorActions}>
          <Link href={resourcesConfig.viewAllAction.href} className={classes.btnSecondary}>
            {resourcesConfig.viewAllAction.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ServiceFaqSection({
  service,
  emphasis = 'standard',
}: {
  service: ServicePage;
} & SectionProps) {
  if (!service.faq) {
    return null;
  }

  return (
    <div data-section-emphasis={emphasis}>
      <FAQAccordion
        heading={service.faq.heading}
        subheading="Clear, helpful answers for builders and homeowners."
        items={service.faq.items}
      />
    </div>
  );
}

export function ServiceRelatedServicesSection({
  relatedServices,
  emphasis = 'standard',
}: {
  relatedServices: RelatedServiceLinkItem[];
} & SectionProps) {
  if (relatedServices.length === 0) {
    return null;
  }

  return (
    <section
      className={classes.relatedServicesSection}
      data-section-emphasis={emphasis}
    >
      <p className={classes.eyebrow}>Related services</p>
      <h2>Related excavation and hauling services</h2>
      <div className={classes.relatedServicesGrid}>
        {relatedServices.map((relatedService) => (
          <Link
            className={classes.relatedServiceCard}
            href={relatedService.href}
            key={relatedService.href}
          >
            <h3>{relatedService.title}</h3>
            <p>{relatedService.description}</p>
            <span className={classes.relatedServiceAction}>View Service</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ServiceReviewsSection({ emphasis = 'standard' }: SectionProps) {
  return (
    <div data-section-emphasis={emphasis}>
      <TestimonialsSection
        data={{
          _type: 'testimonialsSection',
          eyebrow: 'Testimonials',
          heading: 'What customers say about Bellhouse',
          subtext:
            'Feedback from local homeowners, builders, and job-site customers Bellhouse has worked with.',
          reviewSummary: '5.0 on Google from local customers',
          items: reviews,
          backgroundVariant: 'dark',
          backgroundTone: 'default',
        }}
      />
    </div>
  );
}

export function ServiceFinalCtaSection({
  finalCtaConfig,
  emphasis = 'standard',
}: {
  finalCtaConfig: ResolvedServiceFinalCtaConfig;
} & SectionProps) {
  return (
    <section className={classes.cta} data-section-emphasis={emphasis}>
      <h2>{finalCtaConfig.heading}</h2>
      <p>{finalCtaConfig.subheading}</p>

      <div className={classes.contractorActions}>
        <Link href={finalCtaConfig.primaryAction.href} className={classes.btn}>
          {finalCtaConfig.primaryAction.label}
        </Link>
        {finalCtaConfig.secondaryAction ? (
          <Link
            href={finalCtaConfig.secondaryAction.href}
            className={classes.btnSecondary}
          >
            {finalCtaConfig.secondaryAction.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
