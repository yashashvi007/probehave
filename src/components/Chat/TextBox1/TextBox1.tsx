import Image from "next/image";
import React , {useState , useEffect} from "react";
import TypeWriterAnimation from "../TypeWriterAnimation/TypeWriterAnimation";
import Style from "./TextBox1.module.css";
import { TypeAnimation } from 'react-type-animation';

interface IProps {
  TapOn: any;
  TapOff: any;
  char1Image :any,
  vars: any;
  speed : any;
  children: any;
}

function TextBox1({ TapOn , TapOff , char1Image ,  vars , speed   , children  }: IProps) {
  

  const [obj , setObj] = useState<any>({})
  const [newText , setNewText] = useState(``)
  const [imgUrl , setImgUrl] = useState()

  useEffect(() => {
    vars.forEach((item : any) => {
      const key = Object.keys(item)[0];
      obj[key] = item[key];
    });
    setObj(obj);
    setNewText(children.replace(/\{(.*?)\}/g, (match : any, p1 : any) => obj[p1]))
  } , [])

  return (
    <div style={{width:'100%', paddingTop:'30px', display:'flex', justifyContent:'flex-end'}}>
      <div className={Style.textBox1}>
        <Image
          src={`${char1Image}`}
          width={150}
          height={150}
          className={Style.textBox1_img}
          alt="anya"
        />
        <div className={Style.textBox1_box}>
          {/* <TypeWriterAnimation
            TapOff={TapOff}
            TapOn={TapOn}
            vars={vars}
            text={children}
          /> */}
          <TypeAnimation 
             sequence={[
              // Same String at the start will only be typed once, initially
              children , 1000
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

export default TextBox1;
