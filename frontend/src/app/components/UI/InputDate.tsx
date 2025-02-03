import { SetStateNumber, SetStateString } from "@/types/index.types";
import React, { ChangeEventHandler } from "react";
import classes from "./InputTextArea.module.scss";

const InputDate = ({
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
    <div className={classes.date}>
      <label htmlFor={inputLabel}>{inputLabel}</label>
      <input name={inputLabel} type="date" onChange={onChangeHandler}></input>
    </div>
  );
};

export default InputDate;
