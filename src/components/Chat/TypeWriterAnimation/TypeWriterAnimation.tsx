import React, { useState, useEffect } from 'react';

import Style from './TypeWriterAnimation.module.css'

interface IProps {
  TapOff: any;
  TapOn: any;
  vars: any;
  text: any;
}

const TypeWriterAnimation = ({ TapOff , TapOn ,  vars ,  text  } : IProps) => {

  console.log();
  
  const [obj , setObj] = useState<any>({})
 
  // const [timeoutId, setTimeoutId] = useState<any>(null);

  // `my name is {name} and my age is {age}`
  const [displayText, setDisplayText] = useState(``);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newText , setNewText] = useState(``)
  const [varObj , setVarObj]  = useState<any>()
  // const [timer , setTimer] = useState(fast ? 0 : 80)

  useEffect(() => {
    vars.forEach((item : any) => {
      const key = Object.keys(item)[0];
      obj[key] = item[key];
    });
  
    setObj(obj);
   // {name : 'yash'}
   // "my name is {name}"

    setNewText(text.replace(/\{(.*?)\}/g, (match : any, p1 : any) => obj[p1]))
    // console.log(newText);
    if(currentIndex === 0){
      TapOff()
    }
    if (currentIndex < newText?.length) {
      
      setTimeout(() => {
        setDisplayText(newText?.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 80)
         
    }
    if(currentIndex === newText.length - 1){
      TapOn()
    }

    // return () => {
    //   if (timeoutId) {
    //     clearTimeout(timeoutId);
    //   }
    // };
  }, [currentIndex, newText  ]);


  // function handleStopTyping() {
  //   if (timeoutId) {
  //     clearTimeout(timeoutId);
  //     setTimeoutId(null);
  //   }
  // }


  // useEffect(()=> {
  //   console.log("fast");
    
  //   if(fast){
  //     handleStopTyping()
  //   }
  // } , [fast])


  return <p className={Style.box} >{displayText}</p>;
};

export default TypeWriterAnimation;
