import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import classes from './ServiceCard.module.scss';

type ServiceCardProps = {
  title: string;
  description: string;
  image: string | StaticImport;
  alt: string;
  link: string;
  large?: boolean;
};

export default function ServiceCard({
  title,
  description,
  image,
  alt,
  link,
  large = false,
}: ServiceCardProps) {
  return (
    <li className={large ? classes.large : classes.card}>
      <Link
        href={link}
        className={classes.cardLink}
        aria-label={`View ${title}`}
      >
        <div className={classes.imageContainer}>
          <Image
            className={classes.image}
            src={image}
            alt={alt}
            fill
            sizes={
              large
                ? '(max-width: 768px) 100vw, 530px'
                : '(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 350px'
            }
          />
        </div>

        <div className={classes.content}>
          <h3>{title}</h3>
          <p>{description}</p>
          <span className={classes.linkText}>View Service</span>
        </div>
      </Link>
    </li>
  );
}
