import classes from "./ServicesSection.module.scss";
import React from "react";
import Image, { StaticImageData } from "next/image";

interface ServicesSectionProps {
  image: StaticImageData;
  offset: "left" | "right";
  title: string;
  message: string;
}

const ServicesSection = ({
  image,
  offset,
  title,
  message,
}: ServicesSectionProps) => {
  const sectionClassNames =
    offset === "left"
      ? `${classes.left} ${classes.section}`
      : `${classes.right} ${classes.section}`;

  const ImageComponent = () => {
    return (
      <div className={classes.image}>
        <Image
          alt="title"
          src={image}
          width={400}
          height={600}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
    );
  };

  return (
    <section className={sectionClassNames}>
      <div className={classes.container}>
        {offset === "right" ? <ImageComponent /> : ""}
        <div className={classes.wrapper}>
          <h2>{title}</h2>
          <p>{message}</p>
          <button>Learn More</button>
        </div>
        {offset === "left" ? <ImageComponent /> : ""}
      </div>
    </section>
  );
};

export default ServicesSection;
