import React from "react";
import classes from "./Heading.module.scss";

const Heading = ({ text }: { text: string }) => {
  return (
    <div className={classes.heading}>
      <h1>{text.toLocaleUpperCase()}</h1>
    </div>
  );
};

export default Heading;
