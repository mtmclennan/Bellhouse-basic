import { SetStateNumber, SetStateString } from "@/types/index.types";
import React, { ChangeEventHandler } from "react";
import classes from "./InputTextArea.module.scss";

const InputNumber = ({
  inputLabel,
  setText,
}: {
  inputLabel: string;
  setText: SetStateNumber;
}) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.valueAsNumber);
  };

  return (
    <div className={classes.number}>
      <label htmlFor={inputLabel}>{inputLabel}</label>
      <input name={inputLabel} type="number" onChange={onChangeHandler}></input>
    </div>
  );
};

export default InputNumber;
