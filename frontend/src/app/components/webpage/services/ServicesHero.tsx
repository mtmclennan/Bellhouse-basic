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
          Excavation, hauling, and site services across Southern Ontario.
        </h1>
        <h2>
          Start here if you need to sort between residential work, farm or
          rural jobs, and commercial or contractor-led site support before
          getting into the full service list.
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
          <Link className={classes.btnSecondary} href={'/resources/calculators'}>
            Open Planning Tools
          </Link>
        </div>
      </div>
    </section>
  );
}
