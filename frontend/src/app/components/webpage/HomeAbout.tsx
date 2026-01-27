import classes from './HomeAbout.module.scss';
import React from 'react';
import {
  Bulldozer,
  UsersThree,
  HardHat,
  ShieldCheck,
  Clock,
  CurrencyDollar,
  MapPin,
} from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomeAbout() {
  const router = useRouter();
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
          {/* <h3>Our Story</h3>
          <p>
            Founded with a commitment to quality and efficiency, Bellhouse
            Excavating was built to provide contractors, builders, and
            homeowners with a trusted excavation partner. We’ve worked on
            projects ranging from small residential digs to large-scale
            commercial developments, always delivering with expertise and
            integrity.
          </p>
          <h3>Our Equipment & Expertise</h3>
          <p>
            With years of experience in excavation and a fleet of
            high-performance equipment, we handle everything from foundation
            excavation to site preparation and aggregate hauling. Our team is
            skilled, fully licensed, and dedicated to safety on every job.
          </p> */}
        </div>
        <div className={classes.why}>
          <h3>Why Clients Trust Bellhouse Excavating</h3>
          <div className={classes.whyContainer}>
            <div>
              <span>
                <UsersThree size={40} color={'#ffc302'} weight="fill" />
              </span>
              <span>
                <b>Experienced Team</b>– Our skilled operators bring years of
                hands-on experience, ensuring precision and efficiency on every
                job.
              </span>
            </div>
            {/* <div>
              <span>
                <Bulldozer size={40} color={'#ffc302'} weight="fill" />
              </span>
              <span>
                <b>Well Maintained Equipment</b>– We use top-quality, regularly
                serviced excavation and hauling equipment to maximize
                performance and minimize downtime.
              </span>
            </div> */}
            <div>
              <span>
                <Clock size={40} color={'#ffc302'} weight="fill" />
              </span>
              <span>
                <b>Timely Project Completion</b>– We understand deadlines
                matter. Our team works efficiently to keep your project on
                schedule without sacrificing quality.
              </span>
            </div>
            {/* <div>
              <span>
                <CurrencyDollar size={40} color={'#ffc302'} weight="fill" />
              </span>
              <span>
                <b>Competitive Pricing</b>– Get top-tier excavation services at
                fair, transparent rates with no hidden costs. We provide upfront
                quotes tailored to your project.
              </span>
            </div> */}
            <div>
              <span>
                <ShieldCheck size={40} color={'#ffc302'} weight="fill" />
              </span>
              <span>
                <b>Licensed & Insured</b>– Fully certified and insured for peace
                of mind, ensuring compliance with industry standards and job
                site safety regulations.
              </span>
            </div>
            {/* <div>
              <span>
                <HardHat size={40} color={'#ffc302'} weight="fill" />
              </span>
              <span>
                <b>Safety Focus</b>– Safety is our top priority. We follow
                strict protocols to protect our team, clients, and job sites
                while maintaining efficiency.
              </span>
            </div> */}
            <div>
              <span>
                <MapPin size={40} color={'#ffc302'} weight="fill" />
              </span>
              <span>
                <b>Serving Brantford & Beyond</b>– Covering Southern Ontario,
                including Hamilton, Cambridge, and Kitchener-Waterloo.
              </span>
            </div>
          </div>
        </div>
        <div className={classes.cta}>
          <h4>Ready to start your excavation project?</h4>
          <div className={classes.btnContainer}>
            <Link className={classes.btn} href={'/contact'}>
              Let’s Talk About Your Project
            </Link>
            <Link className={classes.btn} href={'/about'}>
              Our Story & Experience
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
