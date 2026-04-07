import React from 'react';
import classes from './WhyChooseUs.module.scss';

const items = [
  {
    title: 'Long-running experience',
    text: 'Bellhouse has been working in excavation and site work since 1982, with decades of local project history behind the company.',
  },
  {
    title: 'Local jobsite knowledge',
    text: 'Brantford-area work, rural access, subdivision lots, and older properties all come with different conditions. Bellhouse knows the region because this is where the company has worked for years.',
  },
  {
    title: 'Excavation and trucking together',
    text: 'Digging, haul-out, imported material, and equipment movement can stay under one company instead of being split across multiple suppliers.',
  },
  {
    title: 'Dependable when timing matters',
    text: 'Bellhouse works on home starts, additions, grading, access work, commercial site prep, and contractor-led jobs where the next stage has to be ready when promised.',
  },
  {
    title: 'Clear scope and scheduling',
    text: 'Customers need clear answers on fit, timing, access, truck needs, and what the job requires first. Bellhouse is straightforward about scope, schedule, and what it will take to keep the job moving.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div className={classes.intro}>
          <p className={classes.eyebrow}>Why Bellhouse</p>
          <h2>Why customers and contractors keep Bellhouse in rotation</h2>
          <p className={classes.subtext}>
            Bellhouse gets called back because the work is practical,
            coordinated, and backed by long local experience.
          </p>
        </div>
        <div className={classes.grid}>
          {items.map((item) => (
            <article className={classes.card} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}