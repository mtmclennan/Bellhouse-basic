'use client';

import { ServicePage } from '@/types/interfaces';
import React from 'react';
import CallToAction from '../webpage/CallToAction';
import WhyChooseUs from '../webpage/WhyChooseUs';
import LayoutHome from './layoutHome';
import Image from 'next/image';
import classes from './ServiceLayout.module.scss';
import Link from 'next/link';
import { Star } from '@phosphor-icons/react/dist/ssr';
import ServicesGrid from '../webpage/services/ServicesGrid';

export default function ServiceLayout({ service }: ServicePage) {
  return (
    <LayoutHome background="off">
      <section className={classes.container}>
        <div className={classes.hero}>
          <h1>{service.hero.heading}</h1>
          <h3>{service.hero.subheading}</h3>
          <Link className={classes.btn} href={'/contact'}>
            Get a Free Estimate
          </Link>
        </div>
        {/* <div className={classes.mask}> */}
        <Image
          className={classes.image}
          width={650}
          height={550}
          src={service.hero.image}
          alt={service.hero.alt}
          layout="intrinsic"
        />
        {/* <div className={classes.overlay}>
            <Image layout="fill" src="/assets/exc.png" alt="mask" />
          </div> */}
        {/* </div> */}
      </section>
      <section className={classes.introContainer}>
        <h2>{service.intro.heading}</h2>
        <div className={classes.introContent}>
          <p>{service.intro.content}</p>
          <ul>
            {service.intro.keypoints.map((keypoint) => (
              <li key={crypto.randomUUID()}>
                <Star size={24} color="#ffc302" weight="fill" />
                <span>{keypoint}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CallToAction />
      <WhyChooseUs />
      <ServicesGrid />
    </LayoutHome>
  );
}
