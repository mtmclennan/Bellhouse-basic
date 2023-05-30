import React, { Dispatch, useEffect, useState } from "react";
import { vehciles } from "../../data";
import EquipmentListItem from "./EquipmentListItem";
import classes from "./EquipmentList.module.scss";
import {
  LiOnClick,
  SetStateBoolean,
  SetStateString,
} from "@/types/index.types";
import useHttp from "@/hooks/use-http";
import { Equipment } from "@/types/interfaces";

const EquipmentList = ({
  setVehicleNumber,
  setUnitId,
  setOpenMenu,
  shortList,
}: {
  setVehicleNumber?: SetStateString;
  setUnitId?: SetStateString;
  setOpenMenu?: SetStateBoolean;
  shortList?: boolean;
}) => {
  const [vehciles, setVechiles] = useState<Equipment[]>([]);
  const { sendRequest } = useHttp();
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/equipment`;

  const onClickHandler = (event: LiOnClick) => {
    event.preventDefault();
    if (setVehicleNumber) {
      setVehicleNumber(event.currentTarget.value.toLocaleString());
    }
    if (setOpenMenu) {
      setOpenMenu(false);
    }
    if (setUnitId) {
      setUnitId(event.currentTarget.id);
    }
  };

  useEffect(() => {
    const applyData = ({ data }: any) => {
      setVechiles(data);
    };

    sendRequest({ url }, applyData);
  }, []);

  useEffect(() => {
    console.log(vehciles);
  }, [vehciles]);

  const listClasses = shortList
    ? `${classes.list} ${classes.shortList}`
    : classes.list;

  return (
    <>
      <ul className={classes.heading}>
        <li>
          <span>Unit #</span>
        </li>
        <li>
          <span>Year</span>
        </li>
        <li>
          <span>Make</span>
        </li>
        <li>
          <span>Model</span>
        </li>
      </ul>
      <ul className={listClasses}>
        {vehciles[0] &&
          vehciles.map((equipment: Equipment) => (
            <EquipmentListItem
              onClick={onClickHandler}
              key={equipment._id}
              id={equipment._id}
              vehicleNumber={equipment.unitNumber}
              make={equipment.make}
              model={equipment.model}
              year={equipment.year}
              vin={equipment.vin}
            />
          ))}
      </ul>
    </>
  );
};

export default EquipmentList;
