import Link from "next/link";
import React from "react";

import classes from "./ButtonBox.module.scss";

interface ButtonBoxProps {
  label: string;
  link: string;
}

const ButtonBox = ({ label, link }: ButtonBoxProps) => {
  return (
    <div className={classes.container}>
      <Link className={classes.button} href={link}>
        {label}
      </Link>
    </div>
  );
};

export default ButtonBox;
