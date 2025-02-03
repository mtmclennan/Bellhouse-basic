import React from 'react';
import classes from './LocalExperts.module.scss';

interface LocalExperts {
  colorDark?: boolean;
}

export default function LocalExperts({ colorDark = false }: LocalExperts) {
  return (
    <section
      className={`${classes.container} ${colorDark ? classes.dark : null} `}
    >
      <div className={classes.local}>
        <h2>Serving Brantford and Brant County with Expertise</h2>
        <p>
          With over 40 years of experience in Brant County, Bellhouse Excavating
          understands the local soil conditions and construction needs. We are
          proud to be a trusted local partner in excavation services.
        </p>
      </div>
    </section>
  );
}
