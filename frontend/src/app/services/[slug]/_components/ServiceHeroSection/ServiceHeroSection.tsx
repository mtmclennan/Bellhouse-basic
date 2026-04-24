import Image from 'next/image';
import Link from 'next/link';

import logo from '../../../../../../public/assets/BellhouseLogo-text.png';
import type { ServicePage } from '@/types/interfaces';
import type { ResolvedServiceHeroConfig } from '@/lib/servicePageLayout';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceHeroSection.module.scss';

interface ServiceHeroSectionProps {
  service: ServicePage;
  heroConfig: ResolvedServiceHeroConfig;
}

export default function ServiceHeroSection({
  service,
  heroConfig,
}: ServiceHeroSectionProps) {
  return (
    <section className={classes.container} data-hero-emphasis={heroConfig.emphasis}>
      <ServiceSectionWrapper
        as="div"
        spacing="10"
        className={classes.heroSection}
        containerClassName={classes.heroShell}
      >
        <div className={classes.heroContent}>
          <div className={classes.heroBrand}>
            <div className={classes.heroBrandMark}>
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

          <div className={classes.heroCopy}>
            {heroConfig.eyebrow ? (
              <p className={classes.heroEyebrow}>{heroConfig.eyebrow}</p>
            ) : null}

            <div className={classes.hero}>
              <h1>{service.hero.heading}</h1>
              <p className={classes.heroSummary}>{heroConfig.summary}</p>
            </div>

            <div className={classes.heroActions}>
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
      </ServiceSectionWrapper>
    </section>
  );
}
