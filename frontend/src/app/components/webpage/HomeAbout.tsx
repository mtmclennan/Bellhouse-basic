import classes from './HomeAbout.module.scss';
import React from 'react';
import {
  UsersThree,
  ShieldCheck,
  Clock,
  MapPin,
} from '@phosphor-icons/react';
import Link from 'next/link';

export default function HomeAbout() {
  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <h2>About Our Excavation & Hauling Services in Brantford</h2>
        <div className={classes.about}>
          <span className={classes.italic}>
            <i>Experienced. Reliable. Built for Your Project.</i>
          </span>
          <p>
            At Bellhouse Excavating, we provide reliable excavation, foundation
            digging, and material hauling services for residential and
            commercial projects across Brantford and surrounding areas. Our team
            is known for precision, dependable scheduling, and doing the job
            right the first time.
          </p>
        </div>
        <div className={classes.why}>
          <h3>Why Clients Trust Bellhouse Excavating</h3>
          <div className={classes.whyContainer}>
            <div>
              <span>
                <UsersThree size={40} color={'#ffc302'} weight="fill" />
              </span>
              <span>
                <b>Experienced Team</b> - Our skilled operators bring years of
                hands-on experience, ensuring precision and efficiency on every
                job.
              </span>
            </div>
            <div>
              <span>
                <Clock size={40} color={'#ffc302'} weight="fill" />
              </span>
              <span>
                <b>Timely Project Completion</b> - We understand deadlines
                matter. Our team works efficiently to keep your project on
                schedule without sacrificing quality.
              </span>
            </div>
            <div>
              <span>
                <ShieldCheck size={40} color={'#ffc302'} weight="fill" />
              </span>
              <span>
                <b>Licensed & Insured</b> - Fully certified and insured for peace
                of mind, ensuring compliance with industry standards and job
                site safety regulations.
              </span>
            </div>
            <div>
              <span>
                <MapPin size={40} color={'#ffc302'} weight="fill" />
              </span>
              <span>
                <b>Serving Brantford & Beyond</b> - Covering Southern Ontario,
                including Hamilton, Cambridge, and Kitchener-Waterloo.
              </span>
            </div>
          </div>
        </div>
        <div className={classes.cta}>
          <h4>Ready to start your excavation project?</h4>
          <div className={classes.btnContainer}>
            <Link className={classes.btn} href={'/contact'}>
              Request a Quote
            </Link>
            <Link className={classes.btn} href={'/contractors'}>
              Contractor Project Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}