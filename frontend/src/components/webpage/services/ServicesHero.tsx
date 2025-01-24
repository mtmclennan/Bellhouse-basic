import React from 'react';
import classes from './ServicesHero.module.scss';

export default function ServicesHero() {
  return (
    <section className={classes.container}>
      <div className={classes.hero}>
        <h1>
          Professional <span className={classes.text}>Excavating </span>
          Services in Brant County
        </h1>
        <h2>
          Expert Excavation Services for Residential and Commercial Projects
        </h2>
        <button>Get a Free Estimate!</button>
      </div>
    </section>
  );
}
