import React from "react";
import Style from "./ChatOption.module.css";

interface IProps {
  children: any;
  onClick: any;
  id: any;
}

function ChatOption({ children, onClick, id }: IProps) {
  return (
    <div className={Style.chatOption} onClick={onClick}>
      <div className={Style.chatOption_option}>{children}</div>
    </div>
  );
}

export default ChatOption;
