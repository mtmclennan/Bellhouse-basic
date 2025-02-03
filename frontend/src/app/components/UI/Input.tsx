import { SetStateNumber, SetStateString } from "@/types/index.types";
import React, { ChangeEventHandler } from "react";
import classes from "./InputTextArea.module.scss";

const Input = ({
  inputLabel,
  setText,
}: {
  inputLabel: string;
  setText: SetStateString;
}) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };

  return (
    <div className={classes.text}>
      <label htmlFor={inputLabel}>{inputLabel}</label>
      <input name={inputLabel} type="text" onChange={onChangeHandler}></input>
    </div>
  );
};

export default Input;
