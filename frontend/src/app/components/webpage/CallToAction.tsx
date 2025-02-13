import Link from 'next/link';
import React from 'react';
import classes from './CallToAction.module.scss';

export default function CallToAction() {
  return (
    <section className={classes.container}>
      <div className={classes.cta}>
        <h2>Ready to Get Started?</h2>
        <p>
          Get in touch with us today for a free estimate on your excavation
          project. We’re here to help you bring your vision to life!
        </p>
        <Link className={classes.btn} href={'/contact'}>
          Start Your Project Today
        </Link>
      </div>
    </section>
  );
}
