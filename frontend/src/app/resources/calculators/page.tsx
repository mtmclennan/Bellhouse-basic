import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/app/components/sections/HeroSection/HeroSection';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { CalculatorResourceCardGrid } from '@/features/calculators/components/CalculatorResourceCardGrid';
import { validateMetadata } from '@/lib/utils/seoValidation';
import type { HeroSectionData } from '@/types/sections';
import classes from '../../../app/calculators/page.module.scss';

export const metadata: Metadata = {
  title: 'Excavation, Gravel & Topsoil Calculators | Bellhouse',
  description:
    'Use Bellhouse estimating calculators for excavation, gravel, and topsoil quantities, truck loads, and rough material planning.',
  alternates: {
    canonical: 'https://bellhouseexcavating.ca/resources/calculators',
  },
  openGraph: {
    title: 'Excavation, Gravel & Topsoil Calculators | Bellhouse',
    description:
      'Bellhouse calculator hub for excavation, gravel, and topsoil estimating tools.',
    url: 'https://bellhouseexcavating.ca/resources/calculators',
    siteName: 'Bellhouse Excavating',
    type: 'website',
  },
};

validateMetadata(metadata.title, metadata.description);

const calculatorsHeroData: HeroSectionData = {
  _type: 'heroSection',
  eyebrow: 'Resources',
  headline: 'Excavation, Gravel & Topsoil Calculators',
  subheadline:
    'Use Bellhouse estimating calculators to plan excavation volumes, gravel base quantities, topsoil coverage, material weights, and rough truck-load counts before requesting a quote.',
  primaryAction: {
    label: 'View Calculators',
    href: '#calculators',
  },
  secondaryAction: {
    label: 'Request a Quote',
    href: '/contact',
  },
  proofItems: [
    { label: 'Metric or imperial entry' },
    { label: 'Volume, tonnage, and truck-load estimates' },
    { label: 'Material and hauling assumptions' },
    { label: 'Built for early planning' },
  ],
  align: 'left',
  theme: 'dark',
  overlay: 'none',
  density: 'tight',
};

export default function CalculatorsPage() {
  return (
    <>
      <HeroSection data={calculatorsHeroData} />

      <div id="calculators" className={classes.scrollTarget}>
        <SectionWrapper>
          <div className={classes.sectionIntro}>
            <p className={classes.sectionEyebrow}>Calculator hub</p>
            <h2>Choose the estimating tool that matches the work.</h2>
            <p>
              Each calculator uses the same Bellhouse framework, but the inputs,
              labels, materials, and assumptions stay focused on the type of work
              you are actually pricing or planning.
            </p>
          </div>

          <CalculatorResourceCardGrid />
        </SectionWrapper>
      </div>

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
              <Link className={classes.secondaryAction} href="/services">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
