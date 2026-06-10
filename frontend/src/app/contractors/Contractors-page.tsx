import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from '@/components/SiteLink';
import {
  ArrowRight,
  Buildings,
  CaretRight,
  CheckCircle,
  CompassTool,
  HardHat,
  HouseLine,
  LinkSimple,
  MapPin,
  Phone,
  Shovel,
  Stack,
  Truck,
  TruckTrailer,
  Wall,
  Wrench,
} from '@phosphor-icons/react/dist/ssr';
import SectionWrapper from '@/components/layout/SectionWrapper';
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

type AudienceBand = {
  title: string;
  icon: ReactNode;
};

type NavLinkItem = {
  href: string;
  label: string;
};

type ProofItem = {
  title: string;
  detail: string;
  icon: ReactNode;
};

const proofItems: ProofItem[] = [
  {
    title: 'Southern Ontario',
    detail: 'Coverage area',
    icon: <MapPin size={22} weight="fill" />,
  },
  {
    title: 'Since 1982',
    detail: 'In business',
    icon: <CheckCircle size={22} weight="fill" />,
  },
  {
    title: 'Tri-axle hauling',
    detail: 'Own fleet',
    icon: <Truck size={22} weight="fill" />,
  },
  {
    title: 'Volvo A35',
    detail: 'Off-road haul',
    icon: <TruckTrailer size={22} weight="fill" />,
  },
  {
    title: 'Contractor work',
    detail: 'B2B focus',
    icon: <HardHat size={22} weight="fill" />,
  },
];

const audienceBand: AudienceBand[] = [
  { title: 'Home builders', icon: <HouseLine size={28} weight="fill" /> },
  { title: 'General contractors', icon: <HardHat size={28} weight="fill" /> },
  { title: 'Design-build firms', icon: <CompassTool size={28} weight="fill" /> },
  { title: 'Concrete contractors', icon: <Wall size={28} weight="fill" /> },
  { title: 'Property developers', icon: <Buildings size={28} weight="fill" /> },
];

type ScopeItem = {
  title: string;
  description: string;
  href: string;
};

const scopeItems: ScopeItem[] = [
  {
    title: 'Site Prep & Grading',
    description: 'Clearing, stripping, and rough grading to get the site ready for the build.',
    href: '/services/site-preparation-land-grading',
  },
  {
    title: 'Foundation Excavation & Trenching',
    description: 'Basements, footings, and service trenches dug to engineered depth.',
    href: '/services/foundation-excavation',
  },
  {
    title: 'Rough Grading & Pad Prep',
    description: 'Building pads and rough grades shaped for drainage and the next phase.',
    href: '/services/site-preparation-land-grading',
  },
  {
    title: 'Truck Hauling & Spoil Export',
    description: 'Triaxle haul-out of spoil and material, timed to keep the site clear.',
    href: '/services/dump-truck-rental',
  },
  {
    title: 'Aggregate Delivery & Material Import',
    description: 'Gravel, granular, and fill delivered and placed by type and tonnage.',
    href: '/services/dump-truck-rental',
  },
  {
    title: 'Equipment Support & Floating',
    description: 'Machines floated in for added capacity when the schedule tightens.',
    href: '/services/heavy-equipment-hauling',
  },
  {
    title: 'Volvo A35 Off-Road Dump Truck Support',
    description: 'Articulated off-road hauling for heavy-volume, rough-ground sites.',
    href: '/services/volvo-a35-off-road-dump-truck-rental',
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
    icon: <Shovel size={23} weight="fill" />,
  },
  {
    title: 'Tri-axle truck capacity for import and export',
    description: (
      <p>
        Truck capacity covers spoil export, aggregate import, and on-site
        material movement, including{' '}
        <Link href="/services/dump-truck-rental" className={classes.inlineLinkGold}>
          tri-axle dump truck work
        </Link>{' '}
        tied to the excavation schedule.
      </p>
    ),
    icon: <Truck size={23} weight="fill" />,
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
    icon: <TruckTrailer size={23} weight="fill" />,
  },
  {
    title: 'Machine moves and added capacity when production climbs',
    description: (
      <p>
        Bellhouse can also coordinate{' '}
        <Link href="/services/heavy-equipment-hauling" className={classes.inlineLinkGold}>
          heavy equipment floating
        </Link>{' '}
        and additional machine capacity when the pace of the site starts to
        change.
      </p>
    ),
    icon: <Wrench size={23} weight="fill" />,
  },
];

const reasonItems = [
  {
    title: 'Excavation and trucking planned together',
    description:
      "One crew lines up the dig and the haul-out, so phases don't stall waiting on a truck.",
    icon: <LinkSimple size={26} weight="fill" />,
  },
  {
    title: 'Fewer handoffs on the job',
    description:
      'Excavation, grading, and trucking under one roster means fewer trades to chase.',
    icon: <Truck size={26} weight="fill" />,
  },
  {
    title: 'Responsive when conditions change',
    description:
      'Hit rock, water, or a schedule shift and the plan adjusts on the spot.',
    icon: <CompassTool size={26} weight="fill" />,
  },
  {
    title: 'A fit for phased and repeat work',
    description:
      'Built to come back for later phases and the next project on your slate.',
    icon: <Stack size={26} weight="fill" />,
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
  { href: '/services/site-preparation-land-grading', label: 'Site Preparation' },
  { href: '/services/foundation-excavation', label: 'Foundation Excavation' },
  { href: '/services/dump-truck-rental', label: 'Dump Truck Work' },
  { href: '/services/heavy-equipment-hauling', label: 'Equipment Floating' },
  { href: '/services/volvo-a35-off-road-dump-truck-rental', label: 'Volvo A35' },
];

const areaLinks: NavLinkItem[] = [
  { href: '/service-areas/brantford', label: 'Brantford contractor site work' },
  { href: '/service-areas/hamilton', label: 'Hamilton redevelopment support' },
  { href: '/service-areas/cambridge', label: 'Cambridge active-site support' },
  { href: '/service-areas/woodstock', label: 'Woodstock industrial site prep' },
  { href: '/service-areas/simcoe', label: 'Simcoe rural-commercial work' },
];

const heroChips = [
  { label: 'Excavation', href: '#scopes' },
  { label: 'Trucking & Hauling', href: '#scopes' },
  { label: 'Grading & Site Prep', href: '#scopes' },
  { label: 'Contractor Support', href: '#scopes' },
];

const heroDescription =
  "Bellhouse lines up excavation, grading, and trucking for builders, general contractors, and developers — handled together so phases don't stall waiting on a truck or a trade.";

function ContentDescription({ children }: { children: ReactNode }) {
  return typeof children === 'string' ? <p>{children}</p> : children;
}

export default function ContractorsPage() {
  return (
    <>
      <section className={classes.heroSection}>
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          className={classes.heroBackgroundImage}
          sizes="100vw"
        />
        <div className={classes.heroOverlay} />
        <div className={classes.heroContainer}>
          <div className={classes.heroContent}>
            <p className={classes.sectionEyebrow}>
              <HardHat size={16} weight="fill" style={{ color: '#ffc302' }} />
              {' '}For builders, GCs &amp; developers
            </p>
            <h1>
              Contractor{' '}
              <span>excavation, trucking &amp; site work</span>{' '}
              across Southern Ontario
            </h1>
            <p className={classes.heroDescription}>{heroDescription}</p>
            <ul className={classes.heroBullets}>
              {[
                'Excavation, grading & trucking handled by one crew',
                'Triaxle & Volvo A35 capacity for heavy-volume, rough-ground sites',
                'Set up for phased and repeat construction',
              ].map((item) => (
                <li key={item}>
                  <CheckCircle size={21} weight="fill" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className={classes.heroActions}>
              <Link href="#contractor-form" className={classes.primaryButton}>
                Send Project Details
              </Link>
              <Link href="tel:5197528500" className={classes.heroPhone}>
                <Phone size={24} weight="duotone" />
                519-752-8500
              </Link>
            </div>
            <div className={classes.heroChips}>
              {heroChips.map((chip) => (
                <Link key={chip.label} href={chip.href} className={classes.heroChip}>
                  {chip.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className={classes.proofBar}>
          <ul className={classes.proofGrid}>
            {proofItems.map((item) => (
              <li key={item.title} className={classes.proofItem}>
                <span className={classes.proofIcon}>{item.icon}</span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHO WE WORK WITH — segmented band */}
      <SectionWrapper className={classes.altSection}>
        <div className={`${classes.sectionIntro} ${classes.sectionIntroLight}`}>
          <p className={classes.sectionEyebrow}>Who we work with</p>
          <h2>Bellhouse fits builders and site crews</h2>
          <p>
            The ground work handled properly — for the trades and developers who
            need excavation, trucking, and site prep lined up around a real schedule.
          </p>
        </div>
        <div className={classes.audienceBand}>
          {audienceBand.map((item) => (
            <div className={classes.audienceBandItem} key={item.title}>
              <span className={classes.audienceBandIcon}>{item.icon}</span>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* SCOPES — numbered editorial list, dark background */}
      <SectionWrapper as="section">
        <div className={classes.scopesLayout} id="scopes">
          <div className={classes.scopesIntro}>
            <p className={classes.sectionEyebrow}>Contractor scopes</p>
            <h2>
              Scopes Bellhouse takes on for builder &amp; development work
            </h2>
            <p>
              From opening up the site through to internal haul roads and
              material import — the scopes contractors line up with one call.
            </p>
            <div className={classes.scopesNote}>
              <LinkSimple size={16} weight="bold" />
              <span>Every scope links to a detailed service page with equipment and process specifics.</span>
            </div>
          </div>

          <div className={classes.scopeList}>
            {scopeItems.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className={classes.scopeItem}
              >
                <span className={classes.scopeNumber}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={classes.scopeBody}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <CaretRight size={16} weight="bold" className={classes.scopeCaret} />
              </Link>
            ))}
            <div className={classes.scopeCtaCard}>
              <Link href="#contractor-form" className={classes.scopeCtaLink}>
                <ArrowRight size={18} weight="bold" />
                Not sure which scope? Send the details
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* CAPABILITY — light/sand background, white cards */}
      <SectionWrapper className={classes.altSection}>
        <div className={classes.capabilityShell}>
          <div className={classes.capabilityContent}>
            <p className={`${classes.sectionEyebrow} ${classes.sectionEyebrowGold}`}>
              Equipment &amp; capability
            </p>
            <h2>
              Production capacity for bigger earthmoving &amp; haul work
            </h2>
            <p className={classes.capabilityText}>
              Rough ground, big volume, and internal haul roads — Bellhouse brings
              the fleet and the off-road capacity to keep contractor sites moving.
            </p>

            <div className={classes.capabilityRows}>
              {capabilityItems.map((item) => (
                <article className={classes.capabilityRow} key={item.title}>
                  <span className={classes.capabilityRowIcon}>{item.icon}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <ContentDescription>{item.description}</ContentDescription>
                  </div>
                </article>
              ))}
            </div>

            <Link href="#contractor-form" className={classes.primaryButtonGold}>
              Line Up Bellhouse
            </Link>
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

      {/* WHY CONTRACTORS — 2x2 with index watermark */}
      <SectionWrapper>
        <div className={`${classes.sectionIntro} ${classes.sectionIntroDark} ${classes.sectionIntroLeft}`}>
          <p className={classes.sectionEyebrow}>Why contractors choose Bellhouse</p>
          <h2>
            The work stays practical, clean &amp; reliable
          </h2>
          <p>
            The difference is one roster handling the excavation and the
            trucking — so the schedule holds and the site stays workable.
          </p>
        </div>

        <div className={classes.reasonGrid}>
          {reasonItems.map((item, index) => (
            <article className={classes.reasonCard} key={item.title}>
              <span className={classes.reasonIcon}>{item.icon}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <span className={classes.reasonIndex} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            </article>
          ))}
        </div>
      </SectionWrapper>

      {/* PROCESS */}
      <SectionWrapper className={classes.altSection}>
        <div className={`${classes.sectionIntro} ${classes.sectionIntroLight}`}>
          <p className={classes.sectionEyebrow}>How it works</p>
          <h2>A straightforward process that keeps the job moving</h2>
        </div>

        <div className={classes.processGrid}>
          {processItems.map((item, index) => (
            <article className={classes.processCard} key={item.title}>
              <span className={classes.processNumber}>
                {index + 1}
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionWrapper>

      {/* FINAL CTA + FORM */}
      <SectionWrapper
        as="section"
        className={classes.ctaSection}
        containerClassName={classes.ctaContainer}
      >
        <div className={classes.ctaShell}>
          <div className={classes.ctaContent}>
            <p className={classes.sectionEyebrow}>Talk to the crew</p>
            <h2>
              Send the job details and Bellhouse can review fit &amp; timing
            </h2>
            <p className={classes.ctaText}>
              Use the form to send the company, contact, site location, rough
              timeline, hauling needs, access conditions, and equipment
              requirements. If you have drawings, plans, or site photos, note
              that in the message and Bellhouse can advise the best way to send
              them after review.
            </p>
            <div className={classes.buttonRow}>
              <Link href="tel:5197528500" className={classes.secondaryButton}>
                <Phone size={20} weight="duotone" />
                Call 519-752-8500
              </Link>
              <Link href="#contractor-form" className={classes.primaryButton}>
                Send Project Details
              </Link>
            </div>
            <ul className={classes.ctaList}>
              {[
                'Excavation, grading & trucking under one roster',
                'Triaxle & Volvo A35 capacity for big volume',
                'Set up for phased and repeat construction',
              ].map((item) => (
                <li key={item}>
                  <CheckCircle size={20} weight="fill" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className={classes.supportingNav}>
              <div className={classes.supportingNavGroup}>
                <p className={classes.supportingNavLabel}>
                  <Wrench size={14} weight="fill" />
                  Related services
                </p>
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
                  <MapPin size={14} weight="fill" />
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
        heading="Contractor questions, answered early"
        subheading="A few practical answers before you send over the project details."
        defaultOpenId="repeat-work"
        variant="light"
        items={[
          {
            id: 'repeat-work',
            question: 'Can Bellhouse support repeat work or multi-phase construction?',
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
            question: 'Do you handle trucking and material hauling with the excavation scope?',
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
                Bellhouse works across Brantford, Hamilton, Cambridge, Woodstock,
                Simcoe, and nearby Southern Ontario communities.
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
                equipment requirements is enough to start.
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
                information as part of early pricing or fit review.
              </p>
            ),
          },
        ]}
      />

      <section className={classes.banner}>
        <div className={classes.bannerBg}>
          <Image
            src={ctaImage}
            alt=""
            fill
            className={classes.bannerImage}
            sizes="100vw"
            priority
          />
          <div className={classes.bannerScrim} />
        </div>
        <div className={classes.bannerContainer}>
          <div className={classes.bannerInner}>
            <p className={classes.sectionEyebrow}>Ready when you are</p>
            <h2>Ready to send the project details?</h2>
            <p className={classes.bannerBody}>
              Send over scope, access, and timing and Bellhouse will review
              fit for excavation, trucking, and site work.
            </p>
            <ul className={classes.bannerPoints}>
              {[
                'No-obligation review',
                'Reviewed by the crew, not a call centre',
                'Fast reply on fit & timing',
              ].map((point) => (
                <li key={point}>
                  <CheckCircle size={18} weight="fill" />
                  {point}
                </li>
              ))}
            </ul>
            <div className={classes.bannerCta}>
              <Link href="#contractor-form" className={classes.primaryButton}>
                Send Project Details
              </Link>
              <Link href="tel:5197528500" className={classes.bannerCallBtn}>
                <Phone size={22} weight="duotone" />
                Call 519-752-8500
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
