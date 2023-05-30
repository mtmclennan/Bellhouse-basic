import { SetStateNumber, SetStateString } from "@/types/index.types";
import React from "react";
import classes from "./InputTextArea.module.scss";

const InputTextArea = ({
  label,
  setText,
}: {
  label: string;
  setText: SetStateString;
}) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div className={classes.container}>
      <label htmlFor={label}>{label}</label>
      <textarea onChange={onChangeHandler} name={label}></textarea>
    </div>
  );
};

export default InputTextArea;
