import React, { useState } from "react";
import classes from "./SmallTextBox.module.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type SmallTextBoxProps = {
  className: string;
  fieldName: string;
  value: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};

const SmallTextBox = ({
  className,
  fieldName,
  value,
  onChange,
  onBlur,
  type,
}: SmallTextBoxProps) => {
  const [showPassword, setShowPassword] = useState(
    type === "password" ? false : true
  );

  const onclickHandler = () => {
    setShowPassword((currentState) => !currentState);
  };

  if (type === "password") {
  }

  return (
    <div className={classes.wrapper}>
      <label className="form__label" htmlFor={fieldName}>
        {fieldName}
      </label>
      <div className={classes.container}>
        <input
          className={className}
          id={fieldName}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        ></input>
        {type === "password" && (
          <div className={classes.icon} onClick={onclickHandler}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmallTextBox;
