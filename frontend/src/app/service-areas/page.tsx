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
import heroImage from '../../../public/assets/services/southern-ontario-excavation-service-area-3d-map-hero.webp';

import {
  defaultCtaImage,
  defaultHeroImage,
} from '@/components/service-areas/visuals';
import { serviceAreaPageList } from '@/lib/serviceAreas';
import { validateMetadata } from '@/lib/utils/seoValidation';
import classes from './page.module.scss';

const servicesOffered = [
  {
    title: 'Excavation and foundation starts',
    description:
      'Bellhouse handles excavation for foundations, additions, trenching, and site cuts where the work needs to be accurate from the first pass.',
    icon: <Shovel size={26} weight="fill" />,
  },
  {
    title: 'Site preparation and grading',
    description:
      'Pads, access routes, working grades, and drainage are shaped so the site is ready for the next trade without rework or delays.',
    icon: <Bulldozer size={26} weight="fill" />,
  },
  {
    title: 'Hauling, delivery, and floating',
    description:
      'Dump truck hauling, material delivery, and equipment floating stay aligned with the excavation schedule so everything moves on one plan.',
    icon: <Truck size={26} weight="fill" />,
  },
];

const valuePoints = [
  {
    title: 'One coordinated scope',
    description:
      'Excavation, grading, hauling, and equipment movement are handled together, reducing delays between trades and keeping the job moving.',
    icon: <TruckTrailer size={24} weight="fill" />,
  },
  {
    title: 'Built for active job sites',
    description:
      'Working with builders, contractors, and property owners who need excavation and trucking aligned with real construction schedules.',
    icon: <MapPin size={24} weight="fill" />,
  },
];

export const metadata: Metadata = {
  title:
    'Excavation Service Areas in Southern Ontario | Bellhouse',
  description:
    'Explore Bellhouse service areas for excavation, grading, hauling, and site work across Brantford, Hamilton, Cambridge, Paris, and nearby communities.',
  alternates: {
    canonical: 'https://bellhouseexcavating.ca/service-areas',
  },
  openGraph: {
    title:
      'Excavation Service Areas in Southern Ontario | Bellhouse',
    description:
      'Explore Bellhouse service areas for excavation, grading, hauling, and site work across Southern Ontario communities.',
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
            <h1>Excavation, hauling, and site work across Southern Ontario.</h1>
            <p className={classes.heroText}>
              Bellhouse Excavating provides excavation, grading, dump truck
              hauling, material delivery, and equipment floating across
              Brantford, Hamilton-area communities, Norfolk County, Oxford
              County, and surrounding Southern Ontario areas.
            </p>

            <p className={classes.heroText}>
              Working with builders, contractors, and property owners to keep
              projects moving and sites ready for the next stage of
              construction.
            </p>
            <div className={classes.heroActions}>
              <Link className={classes.primaryAction} href="/contact">
                Get a quote
              </Link>
              <Link className={classes.secondaryAction} href="/services">
                View core services
              </Link>
              <Link
                className={classes.secondaryAction}
                href="/resources/calculators"
              >
                Use Estimating Calculators
              </Link>
            </div>
          </div>
          <div className={classes.heroMedia}>
            <div className={classes.heroImageFrame}>
              <Image
                src={heroImage}
                alt="Stylized 3D map of Southern Ontario showing the Brantford-area excavation service region with construction vehicles and a location pin on a dark background."
                fill
                className={classes.heroImage}
                sizes="(max-width: 1000px) 100vw, 42vw"
              />
              <div className={classes.heroOverlay} />
              {/* <div className={classes.heroBadgeRow}>
                <span>Excavation</span>
                <span>Grading</span>
                <span>Hauling</span>
              </div> */}
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
          <p className={classes.sectionEyebrow}>
            How Bellhouse supports local projects
          </p>

          <h2>
            Excavation, grading, and hauling support built around real jobsite
            work.
          </h2>
          <p>
            Bellhouse works across Southern Ontario service areas, supporting
            projects that need excavation, truck support, and site work handled
            properly from the start.
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

          <h2>
            Local excavation, grading, and hauling across Southern Ontario.
          </h2>

          <p>
            Select your area to see how Bellhouse supports excavation, site
            preparation, and trucking for projects in your region.
          </p>
        </div>
        <ul className={classes.areasGrid}>
          {serviceAreaPageList.map((area) => (
            <li key={area.slug}>
              <Link
                className={classes.areaCard}
                href={`/service-areas/${area.slug}`}
              >
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
                      <span
                        key={
                          typeof nearby === 'string'
                            ? `${area.slug}-${nearby}`
                            : `${area.slug}-${nearby.label}-${nearby.href}`
                        }
                      >
                        {typeof nearby === 'string' ? nearby : nearby.label}
                      </span>
                    ))}
                  </div>
                  <span className={classes.areaLink}>
                    Explore {area.city} service area
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      <ServiceAreaCta
        title="Have a project that needs excavation or trucking?"
        description="Bellhouse supports excavation, grading, hauling, and equipment movement across Southern Ontario. Reach out to get your project moving."
        image={defaultCtaImage}
        actions={[
          { href: '/contact', label: 'Request a Quote' },
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





