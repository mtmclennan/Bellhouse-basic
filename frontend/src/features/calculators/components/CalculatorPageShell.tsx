import Image from 'next/image';
import Link from '@/components/SiteLink';
import SectionWrapper from '@/components/layout/SectionWrapper';
import {
  ArrowRight,
  ArrowsIn,
  ArrowsOut,
  CheckCircle,
  Cube,
  Drop,
  HardHat,
  HouseLine,
  Recycle,
  RoadHorizon,
  Ruler,
  Scales,
  StackSimple,
  Truck,
  Warning,
  Waves,
} from '@phosphor-icons/react/dist/ssr';
import { calculatorPageContent } from '../config/pageContent';
import { calculatorConfigs } from '../config/calculators';
import { getMaterialsByIds } from '../config/materials';
import { calculatorResourceCards } from '../config/resourceCards';
import { calculatorSeoConfig } from '../config/seo';
import type { CalculatorKind } from '../types/calculator';
import { CalculatorForm } from './CalculatorForm';
import { CalculatorTrackedLink } from './CalculatorTrackedLink';
import { ResourceBreadcrumbs } from './ResourceBreadcrumbs';
import classes from './CalculatorPageShell.module.scss';

type CalculatorPageShellProps = {
  kind: CalculatorKind;
};

const heroIcons = {
  cube: Cube,
  expand: ArrowsOut,
  truck: Truck,
  scales: Scales,
};

const guidanceIcons = {
  layers: StackSimple,
  water: Drop,
  access: ArrowsIn,
  measure: Ruler,
};

const serviceIcons = {
  foundation: HouseLine,
  site: RoadHorizon,
  reuse: Recycle,
  water: Waves,
  hauling: Truck,
  material: StackSimple,
  grading: Ruler,
};

const calculatorImagesByHref = new Map(
  calculatorResourceCards.map((card) => [card.href, card.imageSrc]),
);

const haulingReferenceRows = [
  {
    label: 'Normal hauling estimate',
    value: 'Entered legal payload',
    note: 'The default planning payload can be changed in Advanced features.',
  },
  {
    label: 'Half-load mode',
    value: '50% of entered payload',
    note: 'This changes estimated trips only, not project volume or total weight.',
  },
  {
    label: 'Estimated truck loads',
    value: 'Total weight / effective payload',
    note: 'Partial loads remain visible for planning; scheduled trips use whole trucks.',
  },
] as const;

const methodContent: Record<
  CalculatorKind,
  {
    eyebrow: string;
    title: string;
    description: string;
    steps: Array<{ title: string; formula: string; description: string }>;
    example: {
      title: string;
      lead: string;
      rows: Array<{ label: string; value: string }>;
      note: string;
    };
    referenceTitle: string;
    referenceDescription: string;
    referenceNote: string;
    referenceMaterialNotes: Record<string, string>;
  }
> = {
  excavation: {
    eyebrow: 'The method',
    title: 'How to calculate excavation volume',
    description:
      'The calculator follows the same order used for early haul planning: bank volume first, then loose material, truck loads, and weight.',
    steps: [
      {
        title: 'In-place volume',
        formula: 'length x width x depth = bank volume',
        description:
          'This is the size of the cut before soil is disturbed. Metric dimensions calculate directly in cubic metres.',
      },
      {
        title: 'Loose volume after swell',
        formula: 'bank volume x swell factor = loose volume',
        description:
          'Excavated material expands after digging. Clay, fill, and mixed native soil all behave differently once loaded.',
      },
      {
        title: 'Truck loads',
        formula: 'total tonnes / legal payload = estimated loads',
        description:
          'Half-load mode changes the payload assumption only. It does not change site volume or total material weight.',
      },
      {
        title: 'Material weight',
        formula: 'adjusted volume x material density = tonnes',
        description:
          'Weight affects whether a truck reaches its legal payload before the box is physically full.',
      },
    ],
    example: {
      title: 'Worked example',
      lead: 'A 12 m x 8 m basement cut 2.4 m deep in native soil.',
      rows: [
        { label: 'Bank volume', value: '12 x 8 x 2.4 = 230.4 m3' },
        { label: 'Native soil swell', value: '230.4 x 1.2 = 276.5 m3 loose' },
        { label: 'Truck loads', value: '511.5 / 21.5 = 23.8 loads' },
        { label: 'Estimated weight', value: '276.5 x 1.85 = 511.5 t' },
      ],
      note:
        'Actual jobs may need allowance for working room, sloped sides, groundwater, and material that changes across the cut.',
    },
    referenceTitle: 'Material swell and weight reference',
    referenceDescription:
      'These defaults feed the calculator before any advanced overrides. They are planning assumptions, not a final haul plan.',
    referenceNote:
      'Swell is measured from in-place volume. Moisture affects weight, and road restrictions should be controlled manually with half-load mode.',
    referenceMaterialNotes: {
      'native-soil': 'Default for mixed residential excavation.',
      clay: 'High swell and heavier when wet.',
      sand: 'Low swell; moisture still changes hauling weight.',
      silt: 'Fine material with moderate swell.',
      topsoil: 'Lighter material that may be reused on site.',
      gravel: 'Dense material with relatively low swell.',
      'mixed-fill': 'Composition can vary across the cut.',
    },
  },
  gravel: {
    eyebrow: 'The method',
    title: 'How to calculate gravel quantity',
    description:
      'The calculator starts with placed area and depth, then applies material density, compaction, moisture, and payload assumptions.',
    steps: [
      {
        title: 'Base volume',
        formula: 'length x width x depth = placed volume',
        description:
          'This gives the starting base quantity before compaction or wet material adjustments.',
      },
      {
        title: 'Compaction allowance',
        formula: 'placed volume x compaction % = adjusted volume',
        description:
          'Compacted aggregate can require extra delivered material depending on base depth and subgrade condition.',
      },
      {
        title: 'Truck loads',
        formula: 'total tonnes / legal payload = estimated loads',
        description:
          'Half-load mode reduces legal payload for hauling estimates only. The material quantity stays the same.',
      },
      {
        title: 'Material weight',
        formula: 'adjusted volume x aggregate density = tonnes',
        description:
          'Granular A and Granular B carry different density assumptions, so tonnage changes by material.',
      },
    ],
    example: {
      title: 'Worked example',
      lead: 'A 20 m x 4 m lane with 150 mm of Granular A.',
      rows: [
        { label: 'Placed volume', value: '20 x 4 x 0.15 = 12.0 m3' },
        { label: 'Compaction allowance', value: '12.0 x 1.12 = 13.4 m3' },
        { label: 'Truck loads', value: '29.5 / 21.5 = 1.4 loads' },
        { label: 'Estimated weight', value: '13.4 x 2.2 = 29.5 t' },
      ],
      note:
        'Soft subgrade, deeper edges, drainage correction, and access limits can change the amount actually delivered.',
    },
    referenceTitle: 'Aggregate density and compaction reference',
    referenceDescription:
      'These defaults support early ordering and delivery planning before the base is reviewed on site.',
    referenceNote:
      'Compaction is an allowance for delivered material. Wet material changes weight, not the placed area or target depth.',
    referenceMaterialNotes: {
      'granular-a': 'Dense finish base for driveways and pads.',
      'granular-b': 'Deeper sub-base with a higher placement allowance.',
    },
  },
  topsoil: {
    eyebrow: 'The method',
    title: 'How to calculate topsoil coverage',
    description:
      'The calculator turns coverage area and finish depth into placed volume, estimated weight, and truck-load planning.',
    steps: [
      {
        title: 'Coverage volume',
        formula: 'length x width x depth = placed topsoil volume',
        description:
          'Metric depth can be entered in metres, centimetres, or millimetres so finish coverage is easier to plan.',
      },
      {
        title: 'Finish allowance',
        formula: 'placed volume x adjustment % = material volume',
        description:
          'Light compaction or settling allowance helps account for spreading and shaping after delivery.',
      },
      {
        title: 'Truck loads',
        formula: 'total tonnes / legal payload = estimated loads',
        description:
          'Load counts are planning numbers. Access, legal payload, and timing still need review before delivery.',
      },
      {
        title: 'Material weight',
        formula: 'material volume x topsoil density = tonnes',
        description:
          'Moisture can make screened topsoil much heavier without changing the area covered.',
      },
    ],
    example: {
      title: 'Worked example',
      lead: 'A 15 m x 10 m yard area with 100 mm of topsoil.',
      rows: [
        { label: 'Coverage volume', value: '15 x 10 x 0.10 = 15.0 m3' },
        { label: 'Finish allowance', value: '15.0 x 1.05 = 15.8 m3' },
        { label: 'Truck loads', value: '21.3 / 21.5 = 1.0 loads' },
        { label: 'Estimated weight', value: '15.8 x 1.35 = 21.3 t' },
      ],
      note:
        'Low spots, cleanup, rough grading, and uneven spreading depth can change the final topsoil requirement.',
    },
    referenceTitle: 'Topsoil density and finish reference',
    referenceDescription:
      'These defaults support finish grading and delivery planning before existing grade and access are reviewed.',
    referenceNote:
      'Moisture affects topsoil weight and legal hauling. Finish grade and cleanup can change actual material needs.',
    referenceMaterialNotes: {
      topsoil: 'Screened material varies most with moisture and finish condition.',
    },
  },
};

export function CalculatorPageShell({ kind }: CalculatorPageShellProps) {
  const content = calculatorPageContent[kind];
  const config = calculatorConfigs[kind];
  const method = methodContent[kind];
  const materialRows = getMaterialsByIds(config.allowedMaterialIds);

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <section className={classes.calculatorHero}>
        <div className={classes.heroContainer}>
          <ResourceBreadcrumbs
            trail={[
              { name: 'Home', href: '/' },
              { name: 'Resources', href: '/resources' },
              { name: 'Calculators', href: '/resources/calculators' },
              { name: config.title, href: calculatorSeoConfig[kind].resourcePath },
            ]}
          />

          <div className={classes.heroContent}>
            <h1>{content.pageTitle}</h1>
            <p className={classes.heroDescription}>{content.heroDescription}</p>
            <div className={classes.heroChips} role="list">
              {content.heroCapabilities.map((item) => {
                const Icon = heroIcons[item.icon];

                return (
                  <span key={item.label} role="listitem">
                    <Icon aria-hidden="true" size={14} weight="fill" />
                    {item.label}
                  </span>
                );
              })}
            </div>
            <p className={classes.heroByline}>
              <HardHat aria-hidden="true" size={15} weight="fill" />
              <span>
                Reviewed by the Bellhouse Excavating estimating team, Brantford
                &amp; Brant County
              </span>
              <span className={classes.heroBylineSeparator} aria-hidden="true">
                ·
              </span>
              <span>
                Updated <time dateTime="2026-08">August 2026</time>
              </span>
            </p>
          </div>
        </div>
      </section>

      <div id="calculator" className={classes.scrollTarget}>
        <CalculatorForm kind={kind} />
      </div>

      <SectionWrapper className={classes.methodSection} spacing="6">
        <div className={classes.methodIntro}>
          <p className={classes.eyebrow}>{method.eyebrow}</p>
          <h2>{method.title}</h2>
          <p>{method.description}</p>
        </div>

        <div className={classes.methodLayout}>
          <ol className={classes.methodSteps}>
            {method.steps.map((step, index) => (
              <li key={step.title} className={classes.methodStep}>
                <span className={classes.methodStepNumber}>
                  {index + 1}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <code>{step.formula}</code>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <aside className={classes.workedExample}>
            <h3>{method.example.title}</h3>
            <p>{method.example.lead}</p>
            <dl>
              {method.example.rows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className={classes.workedNote}>{method.example.note}</p>
          </aside>
        </div>
      </SectionWrapper>

      <SectionWrapper className={classes.referenceSection} spacing="6">
        <div className={classes.referenceIntro}>
          <p className={classes.eyebrow}>Reference data</p>
          <h2>{method.referenceTitle}</h2>
          <p>{method.referenceDescription}</p>
        </div>

        <div className={classes.referenceTables}>
          <div className={classes.referenceTableBlock}>
            <h3>
              {config.workflow.kind === 'swell-based'
                ? 'Swell factor and weight by material'
                : 'Material density and placement allowance'}
            </h3>
            <div className={classes.referenceTableWrap}>
              <table className={classes.referenceTable}>
                <thead>
                  <tr>
                    <th scope="col">Material</th>
                    <th scope="col">
                      {config.workflow.kind === 'swell-based'
                        ? 'Swell'
                        : 'Allowance'}
                    </th>
                    <th className={classes.referenceFactor} scope="col">
                      Factor
                    </th>
                    <th scope="col">
                      t / m<sup>3</sup>
                    </th>
                    <th className={classes.referenceNotes} scope="col">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {materialRows.map((material) => {
                    const adjustment =
                      config.workflow.kind === 'swell-based'
                        ? Math.round(
                            ((material.defaultSwellFactor ?? 1) - 1) * 100,
                          )
                        : (material.defaultCompactionPercentage ?? 0);
                    const factor =
                      config.workflow.kind === 'swell-based'
                        ? (material.defaultSwellFactor ?? 1)
                        : 1 + adjustment / 100;

                    return (
                      <tr key={material.id}>
                        <th scope="row">{material.name}</th>
                        <td>{adjustment ? `+${adjustment}%` : 'Base'}</td>
                        <td className={classes.referenceFactor}>
                          {factor.toFixed(2)}
                        </td>
                        <td>{material.densityTonsPerM3.toFixed(2)}</td>
                        <td className={classes.referenceNotes}>
                          {method.referenceMaterialNotes[material.id]}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className={classes.referenceTableNote}>{method.referenceNote}</p>
          </div>

          <div className={classes.referenceTableBlock}>
            <h3>Payload rules used for load estimates</h3>
            <div className={classes.referenceTableWrap}>
              <table
                className={`${classes.referenceTable} ${classes.haulingTable}`}
              >
                <thead>
                  <tr>
                    <th scope="col">Setting</th>
                    <th scope="col">Calculator behavior</th>
                    <th className={classes.referenceNotes} scope="col">
                      Planning note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {haulingReferenceRows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>{row.value}</td>
                      <td className={classes.referenceNotes}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={classes.referenceTableNote}>
              Confirm the legal payload and any posted road restriction for the
              actual route before scheduling trucks.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className={classes.guidanceSection} spacing="6">
        <div className={classes.guidanceIntro}>
          <p className={classes.eyebrow}>Field notes</p>
          <h2>{content.guidanceHeading}</h2>
          <p>{content.guidanceDescription}</p>
        </div>

        <aside className={classes.guidanceCallout}>
          <span className={classes.guidanceCalloutIcon} aria-hidden="true">
            <Warning size={22} weight="fill" />
          </span>
          <div>
            <h3>{content.guidanceCallout.title}</h3>
            {content.guidanceCallout.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className={classes.guidanceCalloutCheck}>
              <CheckCircle aria-hidden="true" size={17} weight="fill" />
              {content.guidanceCallout.check}
            </p>
          </div>
        </aside>

        <div className={classes.guidanceGrid}>
          {content.guidanceItems.map((item) => {
            const Icon = guidanceIcons[item.icon];

            return (
              <article className={classes.guidanceCard} key={item.title}>
                <span className={classes.guidanceCardIcon} aria-hidden="true">
                  <Icon size={18} weight="fill" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </SectionWrapper>

      <SectionWrapper className={classes.nextStepsSection} spacing="6">
        <div className={classes.relatedIntro}>
          <p className={classes.eyebrow}>Next step</p>
          <h2>{content.relatedToolsHeading}</h2>
          <p>{content.relatedToolsDescription}</p>
        </div>

        <div className={classes.nextStepsLayout}>
          <div className={classes.relatedToolGrid}>
            {content.relatedTools.map((tool) => {
              const imageSrc = calculatorImagesByHref.get(tool.href);

              return (
                <CalculatorTrackedLink
                  className={classes.relatedToolCard}
                  href={tool.href}
                  kind={kind}
                  destinationType="calculator"
                  key={tool.href}
                >
                  <span className={classes.relatedToolImage}>
                    {imageSrc ? (
                      <Image
                        alt=""
                        fill
                        sizes="(max-width: 780px) 100vw, 180px"
                        src={imageSrc}
                      />
                    ) : null}
                  </span>
                  <span className={classes.relatedToolBody}>
                    <strong>{tool.title}</strong>
                    <span>{tool.description}</span>
                    <span className={classes.relatedToolAction}>
                      {tool.actionLabel}
                      <ArrowRight aria-hidden="true" size={14} weight="bold" />
                    </span>
                  </span>
                </CalculatorTrackedLink>
              );
            })}
          </div>

          <div className={classes.relatedServiceList}>
            <h3>{content.relatedServicesHeading}</h3>
            {content.relatedServices.map((service) => {
              const Icon = serviceIcons[service.icon];

              return (
                  <CalculatorTrackedLink
                    aria-label={service.actionLabel}
                    className={classes.relatedServiceRow}
                    href={service.href}
                    kind={kind}
                    destinationType="service"
                    key={service.href}
                  >
                    <span
                      className={classes.relatedServiceIcon}
                      aria-hidden="true"
                    >
                      <Icon size={17} weight="fill" />
                    </span>
                    <span className={classes.relatedServiceText}>
                      <strong>{service.title}</strong>
                      <span>{service.description}</span>
                    </span>
                    <ArrowRight
                      className={classes.relatedServiceArrow}
                      aria-hidden="true"
                      size={14}
                      weight="bold"
                    />
                  </CalculatorTrackedLink>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className={classes.faqSection} spacing="6">
        <div className={classes.faqLayout}>
          <div className={classes.faqIntro}>
            <p className={classes.eyebrow}>Calculator FAQ</p>
            <h2>{content.faqHeading}</h2>
            <p>{content.faqDescription}</p>
          </div>

          <div className={classes.faqList}>
            {content.faqs.map((item) => (
              <details className={classes.faqItem} key={item.question}>
                <summary className={classes.faqQuestion}>
                  <span>{item.question}</span>
                  <span className={classes.faqToggle} aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <SectionWrapper
        className={classes.ctaSection}
        containerClassName={classes.ctaContainer}
      >
        <div className={classes.ctaShell}>
          <div className={classes.ctaContent}>
            <p className={classes.eyebrow}>Need a real quote?</p>
            <h2>{content.ctaTitle}</h2>
            <p>{content.ctaDescription}</p>
            <ul className={classes.ctaPoints}>
              {content.ctaPoints.map((point) => (
                <li key={point}>
                  <CheckCircle aria-hidden="true" size={18} weight="fill" />
                  {point}
                </li>
              ))}
            </ul>
            <div className={classes.ctaActions}>
              <Link className={classes.primaryAction} href="/contact">
                Request a Quote
              </Link>
              <CalculatorTrackedLink
                className={classes.secondaryAction}
                href={content.relatedServiceLink.href}
                kind={kind}
                destinationType="service"
              >
                {content.relatedServiceLink.label}
              </CalculatorTrackedLink>
            </div>
            <p>
              Need a different estimating tool first?{' '}
              <Link href="/resources/calculators">
                Browse all Bellhouse calculators
              </Link>
              .
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
