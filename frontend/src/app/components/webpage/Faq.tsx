import {
  NumberCircleFour,
  NumberCircleThree,
  NumberCircleTwo,
  QuestionMark,
} from '@phosphor-icons/react';
import { NumberCircleOne } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import React from 'react';
import classes from './Faq.module.scss';

export default function Faq() {
  return (
    <section className={classes.container}>
      <h2>
        <QuestionMark size={65} weight={'bold'} color={'#ffc302'} /> Frequently
        Asked Questions
      </h2>
      <div className={classes.faq}>
        <h4>
          <NumberCircleOne color={'#ffc302'} />
          What areas do you serve?
        </h4>
        <p>
          We provide excavation and hauling services in Brantford, Brant,
          Wookstock, Hamilton, Cambridge, Kitchener-Waterloo, Halton and
          surrounding areas.
        </p>
        <h4>
          <NumberCircleTwo color={'#ffc302'} />
          How soon can you start my project?
        </h4>
        <p>
          Project availability depends on our current bookings, but we aim for
          quick turnaround times. Contact us to check availability.
        </p>
        <h4>
          <NumberCircleThree color={'#ffc302'} />
          Do you offer free estimates?
        </h4>
        <p>
          Yes! We provide no-obligation, free quotes tailored to your project
          needs.
        </p>
        <h4>
          <NumberCircleFour color={'#ffc302'} />
          What types of excavation work do you specialize in?
        </h4>
        <p>
          We handle foundation digging, land clearing, trenching, grading,
          septic systems, ponds, and more.
        </p>
        <div className={classes.call}>
          <h3>Still have questions?</h3>
          <Link href="tel:519-752-8500">
            <h3>
              Call us at <span className="text">519-752-8500</span>
            </h3>
          </Link>
        </div>
      </div>
    </section>
  );
}
