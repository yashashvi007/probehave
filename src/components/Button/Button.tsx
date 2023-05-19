import React, { ReactNode } from "react";
import style from "./Button.module.css";

const classes: any = {
  login: style.loginButton,
  signup: style.signupButton,
  modify: style.modifyButton,
  accept: style.acceptButton,
  create: style.createButton,
  inActive: style.inActive,
  deleteStaff: style.deleteStaff,
  transactionPageButton: style.transactionPageButton,
};

interface IProps {
  btype: any;
  children: any;
  type: any;
  onClick: any;
  disable: boolean;
}

function Button({ btype, children, type, onClick, disable }: IProps) {
  return (
    <button
      className={`${classes[btype]}`}
      type={type}
      onClick={onClick}
      disabled={disable}
    >
      {children}
    </button>
  );
}

export default Button;
