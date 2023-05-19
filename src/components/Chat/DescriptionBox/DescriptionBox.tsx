import Image from "next/image";
import React from "react";
import TypeWriterAnimation from "../TypeWriterAnimation/TypeWriterAnimation";
import Style from "./DescriptionBox.module.css";

interface IProps {
    TapOn : any ,
    TapOff : any , 
  vars : any , 
  children: any;
}

function DescriptionBox({TapOff , TapOn ,  vars , children }: IProps) {
  return (
    <div style={{ width: "100%", height: "100%", margin: "20px 0px" }}>
      <div className={Style.description}>
        <div className={Style.description_box}>
          <TypeWriterAnimation
            TapOff={TapOff}
            TapOn={TapOn}
            vars={vars}
            text={children}
          />
        </div>
      </div>
    </div>
  );
}

export default DescriptionBox;
