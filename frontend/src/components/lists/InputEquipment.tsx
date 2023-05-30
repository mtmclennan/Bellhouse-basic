import React, { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { SetStateString } from "@/types/index.types";
import EquipmentList from "./EquipmentList";
import classes from "./InputEquipment.module.scss";

const InputEquipment = ({
  setUnitId,
}: {
  // setVehicleNumber: SetStateString;
  // vehicleNum: string;
  setUnitId: SetStateString;
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [unitNumber, setUnitNumber] = useState("");

  const onClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenMenu((currentState) => !currentState);
  };
  return (
    <div className={classes.container}>
      <label htmlFor="unit-number">Unit Number</label>
      <div className={classes.buttonContainer}>
        {unitNumber && (
          <div
            className={classes.unit}
            id="unit-number"
            onClick={onClickHandler}
          >
            {unitNumber}
            <ExpandMoreRoundedIcon />
          </div>
        )}

        {!unitNumber && (
          <button onClick={onClickHandler}>
            Select Unit
            <ExpandMoreRoundedIcon />
          </button>
        )}
      </div>
      {openMenu && (
        <EquipmentList
          shortList={true}
          setVehicleNumber={setUnitNumber}
          setOpenMenu={setOpenMenu}
          setUnitId={setUnitId}
        />
      )}
    </div>
  );
};

export default InputEquipment;
