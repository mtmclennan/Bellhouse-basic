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
import FAQAccordion from '../components/FAQAccordion';
import ContactForm from '../components/forms/ContactForm';
import heroImage from '../../../public/assets/Bellhouse-excavating-contractor.jpg';
import capabilityImage from '../../../public/assets/off-road-dump-truck-rental.jpg';
import classes from './page.module.scss';

type ContentCard = {
  title: string;
  description: ReactNode;
  icon: ReactNode;
};

const audienceItems: ContentCard[] = [
  {
    title: 'Home builders',
    description:
      'Builders who need excavation, grading, truck support, and dependable follow-through from the first cut through later site phases.',
    icon: <Buildings size={26} weight="fill" />,
  },
  {
    title: 'General contractors',
    description:
      'GCs managing active schedules, changing site conditions, and multiple trades that need the ground work and trucking kept aligned.',
    icon: <HardHat size={26} weight="fill" />,
  },
  {
    title: 'Design-build firms',
    description:
      'Teams that want one excavation partner who can support planning conversations, field coordination, and execution on site.',
    icon: <CompassRose size={26} weight="fill" />,
  },
  {
    title: 'Concrete contractors',
    description:
      'Concrete crews that need accurate footing digs, subgrade prep, truck timing, and clean site conditions before the next pour.',
    icon: <Bulldozer size={26} weight="fill" />,
  },
  {
    title: 'Property developers',
    description:
      'Developers running larger or phased work where Bellhouse can support earthmoving, hauling, and added production capacity as the site opens up.',
    icon: <UsersThree size={26} weight="fill" />,
  },
];

const scopeItems: ContentCard[] = [
  {
    title: 'Site prep before the next trade shows up',
    description: (
      <p>
        Bellhouse handles stripping, cuts, fills, working grades, and prep
        tied to real construction schedules, including{' '}
        <Link
          href="/services/site-preparation-land-grading"
          className={classes.inlineLink}
        >
          site preparation and land grading
        </Link>{' '}
        that gets the site ready for foundations, servicing, or paving.
      </p>
    ),
    icon: <Shovel size={26} weight="fill" />,
  },
  {
    title: 'Foundation digs, trenching, and rough grading',
    description: (
      <p>
        Support includes{' '}
        <Link
          href="/services/foundation-excavation"
          className={classes.inlineLink}
        >
          foundation excavation
        </Link>
        , trenching, pad shaping, and rough grades that fit builder layouts and
        keep follow-on crews moving.
      </p>
    ),
    icon: <MapPin size={26} weight="fill" />,
  },
  {
    title: 'Truck hauling, spoil export, and material import',
    description: (
      <p>
        Bellhouse ties excavation to truck cycles, spoil removal, and{' '}
        <Link
          href="/services/dirt-gravel-delivery"
          className={classes.inlineLink}
        >
          aggregate delivery
        </Link>{' '}
        or{' '}
        <Link
          href="/services/dump-truck-rental"
          className={classes.inlineLink}
        >
          dump truck support
        </Link>{' '}
        so material keeps moving on one plan.
      </p>
    ),
    icon: <Truck size={26} weight="fill" />,
  },
  {
    title: 'Added equipment and operator support on active sites',
    description: (
      <p>
        When production needs to increase, Bellhouse can support the site with
        more hauling capacity, machine moves, and operator-backed equipment
        instead of leaving that coordination to separate suppliers.
      </p>
    ),
    icon: <Wrench size={26} weight="fill" />,
  },
];

const reasonItems: ContentCard[] = [
  {
    title: 'Built around active jobs, not one-off homeowner work',
    description:
      'Bellhouse fits contractor-led schedules where excavation, trucking, and follow-up phases need to stay coordinated over time.',
    icon: <HardHat size={26} weight="fill" />,
  },
  {
    title: 'One crew for excavation, grading, hauling, and support',
    description:
      'Keeping more of the site work under one contractor reduces handoffs and makes schedule changes easier to manage.',
    icon: <Shovel size={26} weight="fill" />,
  },
  {
    title: 'Practical coordination when site conditions change',
    description:
      'Access issues, weather, spoil volumes, and added material needs can be addressed without losing the thread between scopes.',
    icon: <MapPin size={26} weight="fill" />,
  },
  {
    title: 'A better fit for repeat builders and phased work',
    description:
      'Bellhouse is positioned to support returning contractors, multi-lot work, and projects that reopen for additional phases later.',
    icon: <Buildings size={26} weight="fill" />,
  },
];

const capabilityItems: ContentCard[] = [
  {
    title: 'Excavation and grading equipment for working sites',
    description: (
      <p>
        Bellhouse supports cuts, trenching, pad prep, grading, and clean-up
        with excavation and grading equipment sized for active construction and
        changing jobsite conditions.
      </p>
    ),
    icon: <Shovel size={26} weight="fill" />,
  },
  {
    title: 'Tri-axle trucking and material movement',
    description: (
      <p>
        Truck support covers spoil export, aggregate import, and on-site
        material movement tied to the excavation pace, including{' '}
        <Link
          href="/services/dump-truck-rental"
          className={classes.inlineLinkLight}
        >
          tri-axle dump truck support
        </Link>{' '}
        for active projects.
      </p>
    ),
    icon: <Truck size={26} weight="fill" />,
  },
  {
    title: 'Volvo A35 support for larger and rougher sites',
    description: (
      <p>
        For bulk earthmoving, deep cuts, subdivision work, soft ground, or
        long internal hauls, Bellhouse can bring in the{' '}
        <Link
          href="/services/volvo-a35-off-road-dump-truck-rental"
          className={classes.inlineLinkLight}
        >
          Volvo A35 articulated off-road dump truck with operator
        </Link>{' '}
        as added production support.
      </p>
    ),
    icon: <TruckTrailer size={26} weight="fill" />,
  },
  {
    title: 'Equipment moves and supplemental site support',
    description: (
      <p>
        Bellhouse can also coordinate{' '}
        <Link
          href="/services/heavy-equipment-hauling"
          className={classes.inlineLinkLight}
        >
          heavy equipment floating
        </Link>{' '}
        and machine support when excavators, skid steers, or other site
        equipment need to move in step with the job.
      </p>
    ),
    icon: <Wrench size={26} weight="fill" />,
  },
];

const processItems = [
  {
    title: 'Review the job and where Bellhouse fits',
    description:
      'Start with the location, drawings, intended scope, and the stage of work so Bellhouse can understand what the site needs first.',
  },
  {
    title: 'Line up excavation, trucking, and equipment support',
    description:
      'Scope, truck timing, access conditions, and any added equipment support are planned together instead of as separate calls.',
  },
  {
    title: 'Work inside the live construction schedule',
    description:
      'Bellhouse supports the active phase, communicates around changes, and keeps the site moving without unnecessary downtime between scopes.',
  },
  {
    title: 'Stay available for the next phase or next project',
    description:
      'Repeat builders and contractors can bring Bellhouse back for later phases, added hauling, or the next development without restarting from scratch.',
  },
];

export default function ContractorsPage() {
  return (
    <>
      <SectionWrapper
        className={classes.heroSection}
        containerClassName={classes.heroContainer}
        spacing="loose"
      >
        <div className={classes.heroShell}>
          <div className={classes.heroContent}>
            <p className={classes.eyebrow}>
              Excavation support for builders and contractors
            </p>
            <h1 className={classes.heroTitle}>
              Excavation, trucking, and site support that fits active
              construction schedules.
            </h1>
            <p className={classes.heroText}>
              Bellhouse Excavating supports builders, general contractors,
              design-build companies, concrete contractors, and developers with
              excavation, grading, site prep, trucking, material hauling, and
              operator-backed equipment support.
            </p>
            <p className={classes.heroText}>
              Bring Bellhouse in when the project needs one crew that can
              handle the ground work, truck coordination, and added production
              support without creating another handoff.
            </p>
            <div className={classes.heroActions}>
              <Link className={classes.primaryAction} href="#contractor-form">
                Talk about your project
              </Link>
              <Link className={classes.secondaryAction} href="/service-areas">
                View service areas
              </Link>
            </div>
            <ul className={classes.heroTags}>
              <li>Excavation and grading</li>
              <li>Truck hauling and delivery</li>
              <li>Equipment and operator support</li>
            </ul>
          </div>

          <div className={classes.heroMedia}>
            <div className={classes.heroImageFrame}>
              <Image
                src={heroImage}
                alt="Bellhouse excavation crew working on an active construction site."
                fill
                className={classes.heroImage}
                sizes="(max-width: 1000px) 100vw, 42vw"
                priority
              />
              <div className={classes.heroOverlay} />
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className={classes.sectionIntro}>
          <p className={classes.sectionEyebrow}>Who we work with</p>
          <h2>
            Bellhouse is built for contractor-led work where schedules, access,
            and site flow all matter.
          </h2>
          <p>
            The right fit is a builder or contractor who needs excavation and
            hauling support tied to real project conditions, not a one-time
            handoff with no follow-through.
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
        <div className={classes.sectionIntro}>
          <p className={classes.sectionEyebrow}>Project support</p>
          <h2>Scopes Bellhouse can handle on active builds and development work.</h2>
          <p>
            Bellhouse supports the parts of the job that need dirt moving,
            grades shaped, material hauled, and equipment coordinated without
            breaking site momentum.
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

      <SectionWrapper>
        <div className={classes.sectionIntro}>
          <p className={classes.sectionEyebrow}>Why contractors work with Bellhouse</p>
          <h2>Bellhouse is set up to be a repeat-use project partner.</h2>
          <p>
            The value is not just having equipment on site. It is having a crew
            that can stay coordinated across excavation, trucking, and the next
            phase of work.
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
              Capacity that supports excavation, hauling, and larger-site
              production.
            </h2>
            <p className={classes.capabilityText}>
              Bellhouse supports more than the initial dig. The crew can keep
              truck movement, site equipment, and added hauling capacity lined
              up as the job develops.
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
        <div className={classes.sectionIntro}>
          <p className={classes.sectionEyebrow}>How Bellhouse fits into your project</p>
          <h2>A straightforward process that works with live site conditions.</h2>
          <p>
            Bellhouse fits best when the job needs practical coordination from
            first conversation through later phases of excavation and trucking.
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
              Send over the project details and Bellhouse can review fit,
              timing, and support.
            </h2>
            <p className={classes.ctaText}>
              Use the form to share the company name, site location, scope, and
              timeline. Bellhouse supports contractor work across Brantford,
              Paris, Hamilton, Cambridge, and surrounding Southern Ontario
              areas.
            </p>
            <ul className={classes.ctaList}>
              <li>Excavation, grading, and site prep support</li>
              <li>Truck hauling, material delivery, and spoil export</li>
              <li>Additional equipment, float support, and Volvo A35 capacity</li>
            </ul>
            <p className={classes.ctaLinks}>
              Relevant pages:{' '}
              <Link href="/services" className={classes.inlineLinkLight}>
                core services
              </Link>
              ,{' '}
              <Link
                href="/service-areas/brantford"
                className={classes.inlineLinkLight}
              >
                Brantford
              </Link>
              ,{' '}
              <Link
                href="/service-areas/hamilton"
                className={classes.inlineLinkLight}
              >
                Hamilton
              </Link>
              , and{' '}
              <Link
                href="/service-areas/cambridge"
                className={classes.inlineLinkLight}
              >
                Cambridge
              </Link>
              .
            </p>
            <p className={classes.ctaPhone}>
              Prefer to call first?{' '}
              <Link href="tel:5197528500" className={classes.inlineLinkLight}>
                519-752-8500
              </Link>
            </p>
          </div>

          <div className={classes.formPane}>
            <ContactForm
              variant="contractor"
              embedded={true}
              sectionId="contractor-form"
            />
          </div>
        </div>
      </SectionWrapper>

      <FAQAccordion
        heading="Contractor questions Bellhouse can answer early"
        subheading="A few practical answers before you send over the project details."
        defaultOpenId="repeat-work"
        items={[
          {
            id: 'repeat-work',
            question:
              'Can Bellhouse support repeat work or multi-phase construction?',
            answer: (
              <p>
                Yes. Bellhouse is positioned to support repeat builders, phased
                developments, and projects that reopen for later excavation,
                grading, hauling, or added equipment support.
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
                aggregate, truck hauling, and delivery support so the site keeps
                moving on one schedule instead of separate truck and excavation
                timelines.
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
                shows where that support usually makes sense.
              </p>
            ),
          },
          {
            id: 'coverage',
            question: 'What areas do you typically cover for contractor work?',
            answer: (
              <p>
                Bellhouse supports contractor and builder work across Brantford,
                Paris, Hamilton, Cambridge, and nearby Southern Ontario
                communities. You can review the local pages for{' '}
                <Link
                  href="/service-areas/brantford"
                  className={classes.inlineLink}
                >
                  Brantford
                </Link>
                ,{' '}
                <Link
                  href="/service-areas/paris"
                  className={classes.inlineLink}
                >
                  Paris
                </Link>
                ,{' '}
                <Link
                  href="/service-areas/hamilton"
                  className={classes.inlineLink}
                >
                  Hamilton
                </Link>
                , or{' '}
                <Link
                  href="/service-areas/cambridge"
                  className={classes.inlineLink}
                >
                  Cambridge
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
                A company name, contact name, project location, scope, and
                timing is enough to start. If you already have site plans,
                haul-out expectations, or equipment support requirements, add
                those details so Bellhouse can respond more accurately.
              </p>
            ),
          },
        ]}
        cta={
          <div className={classes.faqCall}>
            <h3>Need an answer tied to a live project?</h3>
            <p>
              <Link href="#contractor-form" className={classes.inlineLinkLight}>
                Send the project details
              </Link>{' '}
              or call{' '}
              <Link
                href="tel:5197528500"
                className={classes.inlineLinkLight}
              >
                519-752-8500
              </Link>
              .
            </p>
          </div>
        }
      />
    </>
  );
}
