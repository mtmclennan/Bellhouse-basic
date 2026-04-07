import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import classes from './ServiceCard.module.scss';

interface ServiceCard {
  title: string;
  description: string;
  image: string | StaticImport;
  alt: string;
  link: string;
  large?: boolean;
}

export default function ServiceCard({
  title,
  description,
  image,
  alt,
  link,
  large = false,
}: ServiceCard) {
  const width = large ? 450 : 350;
  const height = large ? 335 : 250;
  const router = useRouter();

  const onClickHandler = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    router.push(link);
  };

  return (
    <li className={`${large ? classes.large : classes.card}`} onClick={onClickHandler}>
      <div className={classes.imageContainer}>
        <Image
          className={classes.image}
          src={image}
          alt={alt}
          width={width}
          height={height}
        />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        {link ? <Link href={link}>View Service</Link> : null}
      </div>
    </li>
  );
}
