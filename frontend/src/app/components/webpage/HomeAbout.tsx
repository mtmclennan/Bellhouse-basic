import classes from './HomeAbout.module.scss';
import React from 'react';
import {
  Bulldozer,
  UsersThree,
  HardHat,
  ShieldCheck,
  Clock,
  CurrencyDollar,
} from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

export default function HomeAbout() {
  const router = useRouter();
  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <h2>About Us</h2>
        <div className={classes.about}>
          <p>
            At Bellhouse Excavating, we specialize in providing reliable and
            efficient excavation services for both residential and commercial
            projects. With over 20 years of experience in the industry, our team
            is dedicated to delivering the highest quality of work, on time and
            within budget.
          </p>
          <p>
            We pride ourselves on our commitment to safety, precision, and
            professionalism. Whether you&apos;re building a new foundation,
            needing aggregate delivery, or requiring excavation for any
            construction project, Bellhouse Excavating has the expertise and the
            equipment to get the job done right.
          </p>
        </div>
        <div>
          <h3>Why Choose Bellhouse Excavating?</h3>
          <div className={classes.whyContainer}>
            <div>
              <span>
                <UsersThree size={28} />
              </span>
              <span>Experienced Team</span>
            </div>
            <div>
              <span>
                <Bulldozer size={28} />
              </span>
              <span>Well Maintained Equipment</span>
            </div>
            <div>
              <span>
                <Clock size={28} />
              </span>
              <span>Timely Project Completion</span>
            </div>
            <div>
              <span>
                <CurrencyDollar size={28} />
              </span>
              <span>Competitive Pricing</span>
            </div>
            <div>
              <span>
                <ShieldCheck size={28} />
              </span>
              <span>Licensed & Insured</span>
            </div>
            <div>
              <span>
                <HardHat size={28} />
              </span>
              <span>Safety Focus</span>
            </div>
          </div>
        </div>
        <div className={classes.cta}>
          <h4>
            Let us take care of your excavation needs so you can focus on the
            next steps of your project.
          </h4>
          <div className={classes.btnContainer}>
            <button
              className={classes.btn}
              onClick={() => router.push('/about')}
            >
              Learn More About Us
            </button>
            <button onClick={() => router.push('/contact')}>Contact Us</button>
          </div>
        </div>
      </div>
    </section>
  );
}
