import ReactDOM from "react-dom";
import React, { Children, Fragment, useEffect, useRef, useState } from "react";
import classes from "./Modal.module.scss";

const Backdrop = ({ onClose }: { onClose: () => void }) => {
  return (
    <div onClick={onClose} className={classes.backdrop}>
      <div className={classes.closeTop}></div>
      <div className={classes.closeBottom}></div>
    </div>
  );
};

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  return (
    <Fragment>
      <Backdrop onClose={onClose}></Backdrop>
      <div className={classes.modal}>{children}</div>
    </Fragment>
  );
};

export default Modal;
