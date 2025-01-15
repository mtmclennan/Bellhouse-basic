import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React from 'react';
import classes from './ServiceCard.module.scss';

interface ServiceCard {
  title: string;
  description: string;
  image: string | StaticImport;
  alt: string;
}

export default function ServiceCard({
  title,
  description,
  image,
  alt,
}: ServiceCard) {
  return (
    <div className={classes.card}>
      <div className={classes.imageContainer}>
        <Image
          className={classes.image}
          src={image}
          alt={alt}
          width={350}
          height={250}
        />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
