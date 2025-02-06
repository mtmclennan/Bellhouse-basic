import { SetStateBoolean } from '@/types/index.types';
import classes from './ButtonDropDown.module.scss';
import React from 'react';
import { CaretCircleDown } from '@phosphor-icons/react';

interface ButtonDropDownProps {
  label: string;
  setOpen: SetStateBoolean;
}

const ButtonDropDown = ({ label, setOpen }: ButtonDropDownProps) => {
  const onCLickHandler = () => {
    setOpen((currentState) => !currentState);
  };

  return (
    <button className={classes.drop} onClick={onCLickHandler}>
      {label}
      <CaretCircleDown />
    </button>
  );
};

export default ButtonDropDown;
