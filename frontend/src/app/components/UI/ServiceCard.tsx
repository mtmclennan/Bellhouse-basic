import React from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./ServiceCard.module.scss";

interface ServiceCardProps {
  image: string;
  heading: string;
  text: string;
  link: string;
}

const ServiceCard = ({ image, heading, text, link }: ServiceCardProps) => {
  return (
    <li className={classes.service}>
      <div className={classes.background}>
        <Image
          src={image}
          alt={heading}
          width={650}
          height={975}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <div className={classes.headingContainer}>
        <h3>{heading}</h3>
      </div>
      <p>{text}</p>
      <Link href={link}></Link>
    </li>
  );
};

export default ServiceCard;
