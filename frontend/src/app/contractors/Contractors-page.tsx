import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Bulldozer,
  Buildings,
  CompassRose,
  HardHat,
  MapPin,
  Shovel,
  Truck,
  TruckTrailer,
  UsersThree,
  Wrench,
} from '@phosphor-icons/react/dist/ssr';
import SectionWrapper from '@/components/layout/SectionWrapper';
import ServiceAreaCta from '@/components/service-areas/ServiceAreaCta';
import ServiceAreaHero from '@/components/service-areas/ServiceAreaHero';
import FAQAccordion from '../components/FAQAccordion';
import ContactForm from '../components/forms/ContactForm';
import heroImage from '../../../public/assets/services/dump-truck-hauling/excavator-loading-dump-truck-right.webp';
import ctaImage from '../../../public/assets/services/dump-truck-hauling/cat-320-excavator-loading-b-gravel.webp';
import capabilityImage from '../../../public/assets/off-road-dump-truck-rental.jpg';
import classes from './page.module.scss';

type ContentCard = {
  title: string;
  description: ReactNode;
  icon: ReactNode;
};

type NavLinkItem = {
  href: string;
  label: string;
};

type ProofItem = {
  title: string;
  detail: string;
};

const proofItems: ProofItem[] = [
  {
    title: 'Southern Ontario',
    detail: 'Brantford, Hamilton, Cambridge, Woodstock, Simcoe, and nearby areas.',
  },
  {
    title: 'Since 1982',
    detail: 'Long-running regional excavation and trucking experience.',
  },
  {
    title: 'Tri-axle hauling',
    detail: 'Truck capacity for spoil export, stone, and material import.',
  },
  {
    title: 'Volvo A35',
    detail: 'Extra production capacity for larger and rougher sites.',
  },
  {
    title: 'Contractor work',
    detail: 'Built for builders, GCs, concrete crews, and developers.',
  },
];

const audienceItems: ContentCard[] = [
  {
    title: 'Home builders',
    description:
      'Builders who need reliable excavation, rough grading, and truck hauling from lot opening through later site phases.',
    icon: <Buildings size={26} weight="fill" />,
  },
  {
    title: 'General contractors',
    description:
      'GCs that need excavation, spoil haul-out, imported stone, and schedule commitments handled cleanly.',
    icon: <HardHat size={26} weight="fill" />,
  },
  {
    title: 'Design-build firms',
    description:
      'Teams that want one excavation partner who can price clearly, communicate early, and execute in the field.',
    icon: <CompassRose size={26} weight="fill" />,
  },
  {
    title: 'Concrete contractors',
    description:
      'Concrete crews that need footing digs, subgrade prep, and truck timing lined up before forming and pours.',
    icon: <Bulldozer size={26} weight="fill" />,
  },
  {
    title: 'Property developers',
    description:
      'Developers running multi-lot, phased, or larger-site work that needs dependable earthmoving and hauling capacity.',
    icon: <UsersThree size={26} weight="fill" />,
  },
];

const scopeItems: ContentCard[] = [
  {
    title: 'Site Prep & Grading',
    description: (
      <p>
        Bellhouse handles stripping, cuts, fills, and working grades, including{' '}
        <Link
          href="/services/site-preparation-land-grading"
          className={classes.inlineLink}
        >
          site preparation and land grading
        </Link>{' '}
        that leaves the site ready for the next crew.
      </p>
    ),
    icon: <Bulldozer size={26} weight="fill" />,
  },
  {
    title: 'Foundation Excavation & Trenching',
    description: (
      <p>
        Work includes{' '}
        <Link
          href="/services/foundation-excavation"
          className={classes.inlineLink}
        >
          foundation excavation
        </Link>
        , utility trenches, and digging that matches builder layouts and
        elevations.
      </p>
    ),
    icon: <Shovel size={26} weight="fill" />,
  },
  {
    title: 'Rough Grading & Pad Prep',
    description: (
      <p>
        Building pads, subgrades, and rough grades are shaped so forming,
        concrete, utility, and framing crews step into usable ground.
      </p>
    ),
    icon: <MapPin size={26} weight="fill" />,
  },
  {
    title: 'Truck Hauling & Spoil Export',
    description: (
      <p>
        Excavated material is loaded out and hauled off with trucking tied to
        the dig instead of handled as a separate problem later.
      </p>
    ),
    icon: <Truck size={26} weight="fill" />,
  },
  {
    title: 'Aggregate Delivery & Material Import',
    description: (
      <p>
        Imported stone, gravel, and fill can be brought in as needed so the job
        keeps moving from cut to buildable surface.
      </p>
    ),
    icon: <Truck size={26} weight="fill" />,
  },
  {
    title: 'Equipment Support & Floating',
    description: (
      <p>
        Bellhouse can coordinate{' '}
        <Link
          href="/services/heavy-equipment-hauling"
          className={classes.inlineLink}
        >
          equipment floating
        </Link>{' '}
        and machine moves when excavators, skid steers, or other site equipment
        need to stay on schedule.
      </p>
    ),
    icon: <Wrench size={26} weight="fill" />,
  },
  {
    title: 'Volvo A35 Off-Road Dump Truck Support',
    description: (
      <p>
        When the site needs higher-volume internal hauling, Bellhouse can bring
        in the{' '}
        <Link
          href="/services/volvo-a35-off-road-dump-truck-rental"
          className={classes.inlineLink}
        >
          Volvo A35 off-road dump truck
        </Link>{' '}
        with operator for rougher or larger earthmoving work.
      </p>
    ),
    icon: <TruckTrailer size={26} weight="fill" />,
  },
];

const reasonItems: ContentCard[] = [
  {
    title: 'Excavation and trucking planned together',
    description:
      'Cuts, haul-out, imported material, and truck timing are handled as one scope instead of separate moving parts.',
    icon: <Truck size={26} weight="fill" />,
  },
  {
    title: 'Fewer handoffs on the job',
    description:
      'Keeping more of the work under one contractor reduces missed details between excavation, trucking, and the next phase.',
    icon: <Shovel size={26} weight="fill" />,
  },
  {
    title: 'Responsive when site conditions change',
    description:
      'Extra spoil, soft ground, access changes, or added stone can be handled without chasing a new supplier list.',
    icon: <CompassRose size={26} weight="fill" />,
  },
  {
    title: 'A fit for phased and repeat work',
    description:
      'Bellhouse is a good match for builders and developers that reopen jobs for later lots, later stages, or added hauling.',
    icon: <Buildings size={26} weight="fill" />,
  },
];

const capabilityItems: ContentCard[] = [
  {
    title: 'Excavation and grading fleet for working sites',
    description: (
      <p>
        Cuts, trenching, pad prep, grading, and cleanup are handled with
        equipment suited to changing site conditions and day-to-day production.
      </p>
    ),
    icon: <Shovel size={26} weight="fill" />,
  },
  {
    title: 'Tri-axle truck capacity for import and export',
    description: (
      <p>
        Truck capacity covers spoil export, aggregate import, and on-site
        material movement, including{' '}
        <Link
          href="/services/dump-truck-rental"
          className={classes.inlineLinkLight}
        >
          tri-axle dump truck work
        </Link>{' '}
        tied to the excavation schedule.
      </p>
    ),
    icon: <Truck size={26} weight="fill" />,
  },
  {
    title: 'Volvo A35 articulated off-road dump truck for heavy site movement',
    description: (
      <p>
        The Volvo A35 is useful on rough terrain, soft ground, deep cuts,
        subdivision work, bulk earthmoving, and long internal hauls where road
        trucks are not the best production fit.
      </p>
    ),
    icon: <TruckTrailer size={26} weight="fill" />,
  },
  {
    title: 'Machine moves and added capacity when production climbs',
    description: (
      <p>
        Bellhouse can also coordinate{' '}
        <Link
          href="/services/heavy-equipment-hauling"
          className={classes.inlineLinkLight}
        >
          heavy equipment floating
        </Link>{' '}
        and additional machine capacity when the pace of the site starts to
        change.
      </p>
    ),
    icon: <Wrench size={26} weight="fill" />,
  },
];

const processItems = [
  {
    title: 'Send the job information',
    description:
      'Start with the site location, scope, drawings if available, and the stage of work.',
  },
  {
    title: 'Confirm scope, access, and truck requirements',
    description:
      'Bellhouse reviews haul-out needs, imported material, access conditions, and where equipment should fit in.',
  },
  {
    title: 'Schedule the excavation and trucking',
    description:
      'The work is lined up around the build sequence so the next trade is not stepping into unfinished ground.',
  },
  {
    title: 'Bring Bellhouse back for later phases',
    description:
      'Later lots, later stages, added haul-out, or added machine work can be handled without starting over.',
  },
];

const serviceLinks: NavLinkItem[] = [
  {
    href: '/services/site-preparation-land-grading',
    label: 'Site Preparation',
  },
  { href: '/services/foundation-excavation', label: 'Foundation Excavation' },
  { href: '/services/dump-truck-rental', label: 'Dump Truck Work' },
  { href: '/services/heavy-equipment-hauling', label: 'Equipment Floating' },
  {
    href: '/services/volvo-a35-off-road-dump-truck-rental',
    label: 'Volvo A35',
  },
];

const areaLinks: NavLinkItem[] = [
  { href: '/service-areas/brantford', label: 'Brantford contractor site work' },
  { href: '/service-areas/hamilton', label: 'Hamilton redevelopment support' },
  { href: '/service-areas/cambridge', label: 'Cambridge active-site support' },
  { href: '/service-areas/woodstock', label: 'Woodstock industrial site prep' },
  { href: '/service-areas/simcoe', label: 'Simcoe rural-commercial work' },
];

const heroDescription =
  'Bellhouse works with builders, GCs, concrete crews, and developers across Brantford, Hamilton, Cambridge, Woodstock, Simcoe, and nearby Southern Ontario areas for excavation, grading, site prep, truck hauling, spoil export, aggregate and material import, and operator-backed equipment.';

export default function ContractorsPage() {
  return (
    <>
      <ServiceAreaHero
        eyebrow="For builders, GCs, and developers"
        title="Contractor excavation, trucking, and site work across Southern Ontario."
        description={heroDescription}
        actions={[
          { href: '#contractor-form', label: 'Send Project Details' },
          {
            href: '/service-areas',
            label: 'View Service Areas',
            variant: 'secondary',
          },
        ]}
        image={{
          src: heroImage.src,
          alt: 'Bellhouse excavation crew working on an active construction site.',
          width: heroImage.width,
          height: heroImage.height,
        }}
        contactNote={{
          prefix: 'Need to talk through a live project schedule?',
          href: 'tel:5197528500',
          label: 'Call 519-752-8500',
        }}
        badges={['Excavation', 'Truck Hauling', 'Site Work']}
      />

      <SectionWrapper
        className={classes.proofSection}
        containerClassName={classes.proofContainer}
      >
        <ul className={classes.proofGrid}>
          {proofItems.map((item) => (
            <li key={item.title} className={classes.proofItem}>
              <span className={classes.proofTitle}>{item.title}</span>
              <p>{item.detail}</p>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      <SectionWrapper>
        <div className={`${classes.sectionIntro} ${classes.sectionIntroDark}`}>
          <p className={classes.sectionEyebrow}>Who we work with</p>
          <h2>
            Bellhouse fits builders and site crews that need the ground work
            handled properly.
          </h2>
          <p>
            The right fit is a builder or contractor who needs excavation and
            hauling done cleanly from first cut through later job phases.
          </p>
        </div>

        <div className={classes.cardGrid}>
          {audienceItems.map((item) => (
            <article className={classes.infoCard} key={item.title}>
              <span className={classes.cardIcon}>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className={classes.altSection}>
        <div className={`${classes.sectionIntro} ${classes.sectionIntroLight}`}>
          <p className={classes.sectionEyebrow}>
            Contractor scopes Bellhouse supports
          </p>
          <h2>
            Scopes Bellhouse can take on for builder and development work.
          </h2>
          <p>
            From site opening and footing digs to haul-out, imported stone, and
            added equipment, these are the contractor scopes Bellhouse can
            handle.
          </p>
        </div>

        <div className={classes.cardGrid}>
          {scopeItems.map((item) => (
            <article className={classes.infoCard} key={item.title}>
              <span className={classes.cardIcon}>{item.icon}</span>
              <h3>{item.title}</h3>
              {item.description}
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        className={classes.midCtaSection}
        containerClassName={classes.midCtaContainer}
      >
        <div className={classes.midCtaShell}>
          <div className={classes.midCtaContent}>
            <p className={classes.sectionEyebrow}>Project fit</p>
            <h2>
              Need Bellhouse lined up for excavation, trucking, or site work?
            </h2>
            <p>
              Send the scope, location, and timing to get a direct read on fit,
              likely sequencing, and what the job needs first.
            </p>
            <div className={classes.buttonRow}>
              <Link href="#contractor-form" className={classes.primaryButton}>
                Send Project Details
              </Link>
              <Link href="tel:5197528500" className={classes.secondaryButton}>
                Call 519-752-8500
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className={`${classes.sectionIntro} ${classes.sectionIntroDark}`}>
          <p className={classes.sectionEyebrow}>
            Why contractors work with Bellhouse
          </p>
          <h2>
            Bellhouse stays in rotation because the work is practical, clean,
            and reliable.
          </h2>
          <p>
            The difference is not another list of services. It is how
            excavation, trucking, and changing site conditions are handled in
            real time.
          </p>
        </div>

        <div className={classes.cardGrid}>
          {reasonItems.map((item) => (
            <article className={classes.infoCard} key={item.title}>
              <span className={classes.cardIcon}>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        className={classes.capabilitySection}
        containerClassName={classes.capabilityContainer}
      >
        <div className={classes.capabilityShell}>
          <div className={classes.capabilityContent}>
            <p className={classes.sectionEyebrow}>Equipment and capability</p>
            <h2>
              Production capacity for bigger earthmoving, rough ground, and
              internal haul work.
            </h2>
            <p className={classes.capabilityText}>
              Fleet and truck capacity matter when haul distances grow,
              conditions get rough, or production starts depending on faster
              site movement.
            </p>

            <div className={classes.capabilityGrid}>
              {capabilityItems.map((item) => (
                <article className={classes.capabilityCard} key={item.title}>
                  <span className={classes.capabilityIcon}>{item.icon}</span>
                  <div>
                    <h3>{item.title}</h3>
                    {item.description}
                  </div>
                </article>
              ))}
            </div>

            <div className={classes.capabilityCta}>
              <p className={classes.capabilityCtaText}>
                Need extra hauling capacity, an off-road dump truck, or machine
                movement lined up?
              </p>
              <div className={classes.buttonRow}>
                <Link href="#contractor-form" className={classes.primaryButton}>
                  Send Project Details
                </Link>
                <Link href="tel:5197528500" className={classes.secondaryButton}>
                  Call 519-752-8500
                </Link>
              </div>
            </div>
          </div>

          <div className={classes.capabilityMedia}>
            <div className={classes.capabilityImageFrame}>
              <Image
                src={capabilityImage}
                alt="Volvo A35 off-road dump truck supporting bulk hauling on a large construction site."
                fill
                className={classes.capabilityImage}
                sizes="(max-width: 1000px) 100vw, 38vw"
              />
              <div className={classes.capabilityOverlay} />
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className={classes.altSection}>
        <div className={`${classes.sectionIntro} ${classes.sectionIntroLight}`}>
          <p className={classes.sectionEyebrow}>
            How Bellhouse fits into your project
          </p>
          <h2>A straightforward process that keeps the job moving.</h2>
          <p>
            The goal is to know the scope, access, and timing early enough to
            price and schedule the work cleanly.
          </p>
        </div>

        <div className={classes.processGrid}>
          {processItems.map((item, index) => (
            <article className={classes.processCard} key={item.title}>
              <span className={classes.processNumber}>
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        as="section"
        className={classes.ctaSection}
        containerClassName={classes.ctaContainer}
      >
        <div className={classes.ctaShell}>
          <div className={classes.ctaContent}>
            <p className={classes.sectionEyebrow}>Start the conversation</p>
            <h2>
              Send over the job details and Bellhouse can review fit and timing.
            </h2>
            <p className={classes.ctaText}>
              Use the form to send the company, contact, site location, rough
              timeline, hauling needs, access conditions, and equipment
              requirements. If you have drawings, plans, or site photos, note
              that in the message and Bellhouse can advise the best way to send
              them after review.
            </p>
            <div className={classes.buttonRow}>
              <Link href="#contractor-form" className={classes.primaryButton}>
                Send Project Details
              </Link>
              <Link href="tel:5197528500" className={classes.secondaryButton}>
                Call 519-752-8500
              </Link>
            </div>
            <ul className={classes.ctaList}>
              <li>Excavation, grading, and site prep</li>
              <li>Truck hauling, spoil export, and material import</li>
              <li>Added equipment, float work, and Volvo A35 capacity</li>
            </ul>
            <div className={classes.supportingNav}>
              <div className={classes.supportingNavGroup}>
                <p className={classes.supportingNavLabel}>Related services</p>
                <div className={classes.supportingNavLinks}>
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={classes.supportingNavLinkLight}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className={classes.supportingNavGroup}>
                <p className={classes.supportingNavLabel}>
                  Related service areas
                </p>
                <div className={classes.supportingNavLinks}>
                  {areaLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={classes.supportingNavLinkLight}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={classes.formPane}>
            <ContactForm
              variant="contractor"
              embedded={true}
              heading="Send Project Details for Review"
              intro=""
              sectionId="contractor-form"
            />
          </div>
        </div>
      </SectionWrapper>

      <FAQAccordion
        heading="Contractor questions Bellhouse can answer early"
        subheading="A few practical answers before you send over the project details."
        defaultOpenId="repeat-work"
        variant="serviceArea"
        items={[
          {
            id: 'repeat-work',
            question:
              'Can Bellhouse support repeat work or multi-phase construction?',
            answer: (
              <p>
                Yes. Bellhouse is a fit for repeat builders, phased
                developments, and projects that reopen for later excavation,
                hauling, or added machine work.
              </p>
            ),
          },
          {
            id: 'truck-support',
            question:
              'Do you handle trucking and material hauling with the excavation scope?',
            answer: (
              <p>
                Yes. Bellhouse can tie excavation to spoil export, imported
                aggregate, truck hauling, and delivery timing so the site is not
                waiting on separate schedules.
              </p>
            ),
          },
          {
            id: 'a35-fit',
            question: 'When does the Volvo A35 make sense on a project?',
            answer: (
              <p>
                The Volvo A35 is a good fit when the site needs more production
                hauling than road trucks can give, especially on larger
                earthmoving work, soft ground, rough grades, or long internal
                hauls. The dedicated{' '}
                <Link
                  href="/services/volvo-a35-off-road-dump-truck-rental"
                  className={classes.inlineLink}
                >
                  Volvo A35 page
                </Link>{' '}
                shows where that truck usually makes sense.
              </p>
            ),
          },
          {
            id: 'coverage',
            question: 'What areas do you typically cover for contractor work?',
            answer: (
              <p>
                Bellhouse works across Brantford, Hamilton, Cambridge,
                Woodstock, Simcoe, and nearby Southern Ontario communities.
                You can review the local pages for{' '}
                <Link
                  href="/service-areas/brantford"
                  className={classes.inlineLink}
                >
                  Brantford
                </Link>
                ,{' '}
                <Link
                  href="/service-areas/hamilton"
                  className={classes.inlineLink}
                >
                  Hamilton
                </Link>
                ,{' '}
                <Link
                  href="/service-areas/cambridge"
                  className={classes.inlineLink}
                >
                  Cambridge
                </Link>
                ,{' '}
                <Link
                  href="/service-areas/woodstock"
                  className={classes.inlineLink}
                >
                  Woodstock
                </Link>
                , or{' '}
                <Link
                  href="/service-areas/simcoe"
                  className={classes.inlineLink}
                >
                  Simcoe
                </Link>{' '}
                if the project is tied to one of those areas.
              </p>
            ),
          },
          {
            id: 'pricing-info',
            question: 'What should we send for pricing or fit?',
            answer: (
              <p>
                A company name, contact name, project location, scope, rough
                timeline, haul-out expectations, access conditions, and any
                equipment requirements is enough to start. Bellhouse can use
                that information to judge fit and the likely next step.
              </p>
            ),
          },
          {
            id: 'quote-drawings',
            question: 'Can Bellhouse quote from drawings or site details?',
            answer: (
              <p>
                Yes. Bellhouse can review drawings, site details, grading
                information, haul-out expectations, and similar project
                information as part of early pricing or fit review. If you have
                plans or site photos, mention that in the form and Bellhouse can
                advise the best way to send them.
              </p>
            ),
          },
        ]}
      />

      <ServiceAreaCta
        title="Ready to send the project details?"
        description="Send the scope, location, timeline, hauling needs, and equipment requirements for review, or call if the job is moving now."
        image={{
          src: ctaImage.src,
          alt: 'Bellhouse excavator loading aggregate into a dump truck on an active Southern Ontario contractor site.',
          width: ctaImage.width,
          height: ctaImage.height,
        }}
        supportingPoints={[
          'Southern Ontario contractor work backed by a business that has been operating since 1982.',
          'Excavation, truck hauling, material import, and Volvo A35 capacity when the job calls for it.',
        ]}
        actions={[
          { href: '#contractor-form', label: 'Send Project Details' },
          {
            href: 'tel:5197528500',
            label: 'Call 519-752-8500',
            variant: 'secondary',
          },
        ]}
      />
    </>
  );
}
