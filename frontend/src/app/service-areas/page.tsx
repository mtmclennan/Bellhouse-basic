import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Bulldozer,
  MapPin,
  Shovel,
  Truck,
  TruckTrailer,
} from '@phosphor-icons/react/dist/ssr';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { ServiceAreaCta } from '@/components/service-areas';
import { defaultCtaImage, defaultHeroImage } from '@/components/service-areas/visuals';
import { serviceAreaPageList } from '@/lib/serviceAreas';
import { validateMetadata } from '@/lib/utils/seoValidation';
import classes from './page.module.scss';

const servicesOffered = [
  {
    title: 'Excavation and foundation starts',
    description:
      'Bellhouse handles digging for foundations, additions, trenching, and site cuts where the excavation work needs to be accurate from the first machine on site.',
    icon: <Shovel size={26} weight="fill" />,
  },
  {
    title: 'Site preparation and grading',
    description:
      'Pads, access routes, working grades, and drainage shaping are coordinated so the site is ready for the next trade instead of needing cleanup after the fact.',
    icon: <Bulldozer size={26} weight="fill" />,
  },
  {
    title: 'Hauling, delivery, and floating',
    description:
      'Dump truck hauling, aggregate delivery, and equipment floating stay tied to the excavation schedule so machines, material, and trucking move on one plan.',
    icon: <Truck size={26} weight="fill" />,
  },
];

const valuePoints = [
  {
    title: 'One coordinated scope',
    description:
      'Excavation, grading, hauling, and equipment movement are planned together instead of split across separate providers.',
    icon: <TruckTrailer size={24} weight="fill" />,
  },
  {
    title: 'Built for contractors and property owners',
    description:
      'The service area pages speak to both active build schedules and smaller private-site jobs that still need proper machine and truck support.',
    icon: <MapPin size={24} weight="fill" />,
  },
];

export const metadata: Metadata = {
  title: 'Service Areas | Bellhouse Excavating',
  description:
    'Explore Bellhouse Excavating service areas across Brantford, Paris, Hamilton, Cambridge, Ancaster, and nearby communities for excavation, grading, hauling, and equipment float support.',
  alternates: {
    canonical: 'https://bellhouseexcavating.ca/service-areas',
  },
  openGraph: {
    title: 'Bellhouse Excavating Service Areas',
    description:
      'Local excavation, grading, dump truck hauling, and equipment floating across Bellhouse service areas in Southern Ontario.',
    url: 'https://bellhouseexcavating.ca/service-areas',
    siteName: 'Bellhouse Excavating',
    type: 'website',
  },
};

validateMetadata(metadata.title, metadata.description);

export default function ServiceAreasPage() {
  return (
    <>
      <SectionWrapper
        className={classes.heroSection}
        containerClassName={classes.heroContainer}
        spacing="loose"
      >
        <div className={classes.heroShell}>
          <div className={classes.heroContent}>
            <p className={classes.eyebrow}>Bellhouse service areas</p>
            <h1>Excavation, hauling, and site work support across Southern Ontario.</h1>
            <p className={classes.heroText}>
              Bellhouse Excavating supports local jobs that need more than one machine on site. These service
              area pages are built around real work: excavation contractor services, site preparation, grading,
              dump truck hauling, material delivery, and equipment floating.
            </p>
            <p className={classes.heroText}>
              Whether the job is a residential dig, a builder-led foundation start, or an active contractor site
              that needs trucking and equipment movement tied together, Bellhouse can support the local scope.
            </p>
            <div className={classes.heroActions}>
              <Link className={classes.primaryAction} href="/contact">
                Request a quote
              </Link>
              <Link className={classes.secondaryAction} href="/services">
                View core services
              </Link>
            </div>
          </div>
          <div className={classes.heroMedia}>
            <div className={classes.heroImageFrame}>
              <Image
                src={defaultHeroImage.src}
                alt={defaultHeroImage.alt}
                fill
                className={classes.heroImage}
                sizes="(max-width: 1000px) 100vw, 42vw"
              />
              <div className={classes.heroOverlay} />
              <div className={classes.heroBadgeRow}>
                <span>Excavation</span>
                <span>Grading</span>
                <span>Hauling</span>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.valueGrid}>
          {valuePoints.map((point) => (
            <article className={classes.valueCard} key={point.title}>
              <span className={classes.valueIcon}>{point.icon}</span>
              <div>
                <h2>{point.title}</h2>
                <p>{point.description}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper containerClassName={classes.servicesContainer}>
        <div className={classes.servicesIntro}>
          <p className={classes.sectionEyebrow}>How Bellhouse works across these areas</p>
          <h2>Local pages built around excavation capability, truck support, and real project flow.</h2>
          <p>
            These pages are not generic location blurbs. They are structured around the work Bellhouse actually
            performs and the mix of clients Bellhouse supports across service areas.
          </p>
        </div>
        <div className={classes.servicesGrid}>
          {servicesOffered.map((service) => (
            <article className={classes.serviceCard} key={service.title}>
              <span className={classes.serviceIcon}>{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        className={classes.areasSection}
        containerClassName={classes.areasContainer}
      >
        <div className={classes.areasIntro}>
          <p className={classes.sectionEyebrow}>Areas Bellhouse serves</p>
          <h2>Choose the local service area page that matches your project location.</h2>
          <p>
            Each page focuses on the local market while staying grounded in Bellhouse&apos;s core scope: excavation,
            site preparation, grading, dump truck hauling, material delivery, and equipment floating.
          </p>
        </div>
        <ul className={classes.areasGrid}>
          {serviceAreaPageList.map((area) => (
            <li key={area.slug}>
              <Link className={classes.areaCard} href={`/service-areas/${area.slug}`}>
                <div className={classes.areaImageFrame}>
                  <Image
                    src={(area.heroImage ?? defaultHeroImage).src}
                    alt={(area.heroImage ?? defaultHeroImage).alt}
                    fill
                    className={classes.areaImage}
                    sizes="(max-width: 1000px) 100vw, 48vw"
                  />
                  <div className={classes.areaOverlay} />
                  <p className={classes.areaLabel}>
                    {area.city}, {area.province}
                  </p>
                </div>
                <div className={classes.areaCardCopy}>
                  <h3>{area.heroTitle}</h3>
                  <p>{area.metaDescription}</p>
                  <div className={classes.areaMeta}>
                    {area.nearbyAreas.slice(0, 3).map((nearby) => (
                      <span key={`${area.slug}-${nearby}`}>{nearby}</span>
                    ))}
                  </div>
                  <span className={classes.areaLink}>View local page</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      <ServiceAreaCta
        title="Talk to Bellhouse about the area your project is in"
        description="If your job needs excavation, grading, dump truck hauling, or equipment floating, Bellhouse can help you plan the right local approach and next step."
        image={defaultCtaImage}
        actions={[
          { href: '/contact', label: 'Start your quote' },
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
