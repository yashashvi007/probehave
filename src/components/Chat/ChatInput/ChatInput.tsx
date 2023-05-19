import React, { useEffect, useState } from "react";
import Style from "./ChatInput.module.css";
import SendIcon from "@mui/icons-material/Send";

interface IProps {
  name : any , 
  inputSubmit: any;
  addListener: any;
  children: any;
}

function ChatInput({name , inputSubmit, addListener, children }: IProps) {
  const [input, setInput] = useState("");

  // useEffect(()=> {
  //     window.removeEventListener('click' , increaseIterator)
  // } , [])

  const onChangeHandler = (e: any) => {
    setInput(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    inputSubmit({name , input});
    addListener();
  };

  return (
    <>
      <form onSubmit={onSubmit} className={Style.box}>
        <div className={Style.container}>
          <input
            className={Style.input}
            value={input}
            name="input"
            onChange={onChangeHandler}
          />

          <button type="submit" className={Style.button}>
            <SendIcon />
          </button>
        </div>
      </form>
    </>
  );
}

export default ChatInput;
