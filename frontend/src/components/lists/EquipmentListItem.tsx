import {
  LiOnClick,
  SetStateBoolean,
  SetStateString,
} from "@/types/index.types";
import React from "react";
import classes from "./EquipmentList.module.scss";

interface EquipmentListItemProps {
  vehicleNumber: string;
  make: string;
  model: string;
  vin: string;
  year: number;
  onClick: (event: LiOnClick) => void;
  id: string;
}

const EquipmentListItem = ({
  onClick,
  vehicleNumber,
  make,
  model,
  year,
  vin,
  id,
}: EquipmentListItemProps) => {
  return (
    <li
      className={classes.item}
      value={vehicleNumber}
      onClick={onClick}
      id={id}
    >
      <p>{vehicleNumber}</p>
      <p>{year}</p>
      <p>{make}</p>
      <p>{model}</p>
      <span>{vin}</span>
    </li>
  );
};

export default EquipmentListItem;
