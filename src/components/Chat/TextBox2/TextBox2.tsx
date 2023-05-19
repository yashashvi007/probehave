import Image from "next/image";
import React , {useState , useEffect} from "react";
import TypeWriterAnimation from "../TypeWriterAnimation/TypeWriterAnimation";
import Style from "./TextBox2.module.css";
import { TypeAnimation } from "react-type-animation";

interface IProps {
  TapOff : any , 
  TapOn : any , 
  char2Image : any , 
  vars : any , 
  speed : any , 
  children: any
}

function TextBox2({TapOff , TapOn , char2Image ,  vars , speed ,  children }: IProps) {

  const [obj , setObj] = useState<any>({})
  const [newText , setNewText] = useState(``)

  useEffect(() => {
    vars.forEach((item : any) => {
      const key = Object.keys(item)[0];
      obj[key] = item[key];
    });
    setObj(obj);
    setNewText(children.replace(/\{(.*?)\}/g, (match : any, p1 : any) => obj[p1]))
  } , [])

  return (
    <div style={{ width: "100%", height: "220px", paddingTop: "30px",display:'flex', justifyContent:'flex-start' }}>
      <div className={Style.textBox2}>
        <Image
          src={`${char2Image}`} 
          width={150}
          height={150}
          className={Style.textBox2_img}
          alt="char"
        />
        <div className={Style.textBox2_box}>
          {/* <TypeWriterAnimation
            TapOff={TapOff}
            TapOn={TapOn}
            vars={vars}
            text={children}
          
          /> */}
           <TypeAnimation
             sequence={[
              // Same String at the start will only be typed once, initially
              children
            ]}
            speed={speed}
            cursor={false}
            style={{ fontSize: '1em' }}
          />
        </div>
      </div>
    </div>
  );
}

export default TextBox2;
