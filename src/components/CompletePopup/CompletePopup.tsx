import React , {useState} from "react";
import Button from "../Button/Button";
import Style from "./CompletePopup.module.css";
import { useRouter } from "next/router";
import { Rating } from "@mui/material";
import axios from "axios";

interface IProps {
  userInfo : any ;
  moduleId : any;
  closePopup: any;
}

function FeedBackPopup({ userInfo ,  moduleId , closePopup }: IProps) {
  const Router = useRouter();
  const [value  , setValue] = useState<any>(0)
  const [text , setText] = useState('Give your feedback')

  const onSubmit = ()=> {
     try {
      const config = {
        headers : {
            'Content-Type' : 'application/json' , 
            Authorization : `Bearer ${userInfo.token}`
        }
    }
       axios.post(`${process.env.API_SERVER_URL}/module/rate/${moduleId}` , {rating : value} , config)
       setText('Thank you for your feedback')
       closePopup()
     } catch (error) {
       
     }
  }

  return (
    <div className={Style.main}>
      <h3>{text}</h3>
      <div className={Style.button}>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Button btype='create' onClick={onSubmit} disable={value !== 0 ? false : true} type='' >
        Submit
      </Button>
      </div>
    </div>
  );
}

export default FeedBackPopup;
