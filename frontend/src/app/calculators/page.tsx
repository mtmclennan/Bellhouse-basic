import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import {
  CompassTool,
  Shovel,
  Stack,
} from '@phosphor-icons/react/dist/ssr';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { calculatorConfigs } from '@/features/calculators/config/calculators';
import { validateMetadata } from '@/lib/utils/seoValidation';
import classes from './page.module.scss';

const calculatorCards = [
  {
    slug: 'excavation',
    href: '/calculators/excavation',
    serviceHref: '/services/foundation-excavation',
    serviceLabel: 'Related service: Foundation excavation',
    imageSrc: '/assets/calculators/excavation-calculator.webp',
    icon: <Shovel size={26} weight="fill" />,
    meta: 'Excavation estimating',
    blurb:
      'Estimate excavation volume, tonnage, and truck loads for foundation digs, cut work, and general earthmoving.',
    bestFor: 'Best for: digs, cut-and-fill, and haul-out planning',
    outputs: ['Volume', 'Tonnage', 'Truck loads'],
  },
  {
    slug: 'gravel',
    href: '/calculators/gravel',
    serviceHref: '/services/dirt-gravel-delivery',
    serviceLabel: 'Related service: Dirt and gravel delivery',
    imageSrc: '/assets/calculators/gravel-calculator.webp',
    icon: <Stack size={26} weight="fill" />,
    meta: 'Aggregate estimating',
    blurb:
      'Work out gravel quantities, tonnage, and likely truck loads for pads, lanes, base prep, and imported aggregate.',
    bestFor: 'Best for: driveways, pads, lanes, and base prep',
    outputs: ['Volume', 'Tonnage', 'Truck loads'],
  },
  {
    slug: 'topsoil',
    href: '/calculators/topsoil',
    serviceHref: '/services/site-preparation-land-grading',
    serviceLabel: 'Related service: Site prep and grading',
    imageSrc: '/assets/calculators/Topsoil-calculator.webp',
    icon: <CompassTool size={26} weight="fill" />,
    meta: 'Topsoil estimating',
    blurb:
      'Estimate topsoil coverage, weight, and load count for grading, finish shaping, and landscape prep.',
    bestFor: 'Best for: finish grading, coverage checks, and topsoil planning',
    outputs: ['Volume', 'Tonnage', 'Truck loads'],
  },
] as const;

export const metadata: Metadata = {
  title: 'Excavation, Gravel & Topsoil Calculators | Bellhouse',
  description:
    'Use Bellhouse estimating calculators for excavation, gravel, and topsoil quantities, truck loads, and rough material planning.',
  alternates: {
    canonical: 'https://bellhouseexcavating.ca/calculators',
  },
  openGraph: {
    title: 'Excavation, Gravel & Topsoil Calculators | Bellhouse',
    description:
      'Bellhouse calculator hub for excavation, gravel, and topsoil estimating tools.',
    url: 'https://bellhouseexcavating.ca/calculators',
    siteName: 'Bellhouse Excavating',
    type: 'website',
  },
};

validateMetadata(metadata.title, metadata.description);

export default function CalculatorsPage() {
  return (
    <>
      <SectionWrapper
        className={classes.heroSection}
        containerClassName={classes.heroContainer}
        spacing="loose"
      >
        <div className={classes.heroShell}>
          <div className={classes.heroContent}>
            <p className={classes.eyebrow}>Bellhouse calculators</p>
            <h1>Estimating tools for excavation, gravel, and topsoil work.</h1>
            <p className={classes.heroText}>
              Bellhouse calculators are practical estimating tools for quick
              field checks, early planning, and rough material takeoffs before a
              project is quoted or scheduled.
            </p>
            <p className={classes.heroText}>
              Use them to compare excavation, gravel, or topsoil needs fast,
              then send Bellhouse the job details when you need a real number
              based on site conditions.
            </p>
            <div className={classes.heroActions}>
              <Link className={classes.primaryAction} href="/calculators/excavation">
                Start With Excavation
              </Link>
              <Link className={classes.secondaryAction} href="/contact">
                Request a Quote
              </Link>
            </div>
          </div>

          <div className={classes.heroCard}>
            <p className={classes.heroCardTitle}>Built for quick estimating</p>
            <ul className={classes.heroCardList}>
              <li>Metric or imperial dimension entry, depending on the job</li>
              <li>Volume, tonnage, and truck-load estimates in one place</li>
              <li>Result display that can stay with input units or switch</li>
              <li>Estimate-first planning before a quote or site review</li>
            </ul>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className={classes.sectionIntro}>
          <p className={classes.sectionEyebrow}>Calculator hub</p>
          <h2>Choose the estimating tool that matches the work.</h2>
          <p>
            Each calculator uses the same Bellhouse estimating framework, but
            the materials, dimension entry, and settings stay focused on the
            type of work you are actually pricing or planning.
          </p>
        </div>

        <div className={classes.cardGrid}>
          {calculatorCards.map((card) => {
            const cardStyle = {
              ['--card-image' as const]: `url("${card.imageSrc}")`,
            } as CSSProperties;

            return (
            <article className={classes.card} key={card.slug} style={cardStyle}>
              <div className={classes.cardHeader}>
                <span className={classes.cardIcon}>{card.icon}</span>
                <span className={classes.cardMeta}>{card.meta}</span>
              </div>
              <h3>{calculatorConfigs[card.slug].title}</h3>
              <p>{card.blurb}</p>
              <p className={classes.cardBestFor}>{card.bestFor}</p>
              <div className={classes.outputList} aria-label={`${calculatorConfigs[card.slug].title} outputs`}>
                {card.outputs.map((output) => (
                  <span className={classes.outputChip} key={output}>
                    {output}
                  </span>
                ))}
              </div>
              <div className={classes.cardActions}>
                <Link className={classes.cardPrimaryLink} href={card.href}>
                  Open Calculator
                </Link>
                <Link className={classes.cardSecondaryLink} href={card.serviceHref}>
                  {card.serviceLabel}
                </Link>
              </div>
            </article>
            );
          })}
        </div>
      </SectionWrapper>

      <SectionWrapper
        className={classes.ctaSection}
        containerClassName={classes.ctaContainer}
      >
        <div className={classes.ctaShell}>
          <div className={classes.ctaContent}>
            <p className={classes.eyebrow}>Need a real job read?</p>
            <h2>Use the calculator, then send Bellhouse the project details.</h2>
            <p className={classes.ctaText}>
              If the estimate looks close, the next step is to send the scope,
              location, access conditions, and timing so Bellhouse can review
              fit and what the job actually needs.
            </p>
            <ul className={classes.ctaPoints}>
              <li>Useful for excavation, imported aggregate, and topsoil work</li>
              <li>Helpful when truck counts and material volumes matter early</li>
              <li>Best followed by a direct quote request for real site conditions</li>
            </ul>
            <div className={classes.ctaActions}>
              <Link className={classes.primaryAction} href="/contact">
                Request a Quote
              </Link>
              <Link className={classes.secondaryAction} href="tel:5197528500">
                Call 519-752-8500
              </Link>
            </div>
            <p className={classes.ctaNote}>
              Looking for Bellhouse service coverage too? View the{' '}
              <Link href="/service-areas">service areas page</Link>.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
