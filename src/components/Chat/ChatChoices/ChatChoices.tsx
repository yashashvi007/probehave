import { useRouter } from "next/router";
import React from "react";
import ChatOption from "../ChatOption/ChatOption";
import TextBox1 from "../TextBox1/TextBox1";
import Style from "./ChatChoices.module.css";

interface IProps {
  choose: any;
  children: any;
  options: any;
}

function ChatChoices({ choose, children, options }: IProps) {
  const onChoose = (option: any) => {
    console.log(option);
    choose(option);
  };

 // console.log("option", options);

  return (
    <div className={Style.chatChoices}>
      {options.map((option: any, i: any) => (
        <ChatOption
          key={i}
          onClick={() => onChoose(option)}
          id={option.redirect_to}
        >
          {option.choice}
        </ChatOption>
      ))}
    </div>
  );
}

export default ChatChoices;
