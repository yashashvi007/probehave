import React , {useState} from "react";
import Button from "../Button/Button";
import Style from "./DownloadPopup.module.css";
import { useRouter } from "next/router";
import { Rating } from "@mui/material";
import axios from "axios";

interface IProps {
  closeAudio : any , 
  closePopup: any;
}

function DownloadPopup({ closeAudio ,  closePopup }: IProps) {
  const router = useRouter();
    
  const onClick = ()=> {
    router.push('/profile')
    closeAudio()
    closePopup()
  }

  return (
    <div className={Style.main}>
       Download Report
       <Button btype='create' onClick={onClick} type='' disable={false} >
          Profile
       </Button>
    </div>
  );
}

export default DownloadPopup;