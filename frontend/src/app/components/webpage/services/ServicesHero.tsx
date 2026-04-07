import React from 'react';
import classes from './ServicesHero.module.scss';
import Link from 'next/link';
import logo from '../../../../../public/assets/BellhouseLogo-text.png';
import Image from 'next/image';

export default function ServicesHero() {
  return (
    <section className={classes.container}>
      <div className="hero-logo__mobile">
        <Image
          src={logo}
          alt="Bellhouse Excavating logo"
          quality={80}
          width={200}
          height={155}
          style={{
            width: 'auto',
            height: 'auto',
          }}
          sizes="(max-width: 375px) 120px, (max-width: 768px) 160px, 200px"
        />
      </div>
      <div className={classes.hero}>
        <h1>
          Professional <span className={classes.text}>Excavating </span>
          Services in Brant County
        </h1>
        <h2>
          Expert excavation, grading, hauling, and site support for residential,
          commercial, and contractor-led work across Brant County and nearby
          Southern Ontario communities.
        </h2>
        <div className={classes.actions}>
          <Link className={classes.btn} href={'/contact'}>
            Get a Free Estimate
          </Link>
          <Link className={classes.btnSecondary} href={'/service-areas'}>
            View Service Areas
          </Link>
          <Link className={classes.btnSecondary} href={'/contractors'}>
            For Builders & Contractors
          </Link>
        </div>
      </div>
    </section>
  );
}
