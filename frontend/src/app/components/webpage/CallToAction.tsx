import Link from 'next/link';
import React from 'react';
import classes from './CallToAction.module.scss';

type CallToActionProps = {
  heading?: string;
  text?: string;
  buttonLabel?: string;
  href?: string;
};

export default function CallToAction({
  heading = 'Need excavation, grading, or hauling?',
  text = 'Talk with Bellhouse about excavation, site prep, trucking, and material hauling across Brantford and nearby Southern Ontario areas.',
  buttonLabel = 'Request a Quote',
  href = '/contact',
}: CallToActionProps) {
  return (
    <section className={classes.container}>
      <div className={classes.cta}>
        <h2>{heading}</h2>
        <p>{text}</p>
        <Link className={classes.btn} href={href}>
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
