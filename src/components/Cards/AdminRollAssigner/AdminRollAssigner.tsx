import Button from "@/components/Button/Button";
import React from "react";
import Style from "./AdminRollAssigner.module.css";
import Image from "next/image";

interface Iprops {
  img: string;
  name: string;
  description: string;
}

const AdminRollAssigner = ({ img, name, description }: Iprops) => {
  return (
    <>
      <div className={Style.main}>
        <Image className={Style.img} src={img} alt="" />
        <h3 className={Style.h3}>{name}</h3>
        <span className={Style.description}>{description}</span>
        <div className={Style.buttons}>
          <Button btype="modify" type="" disable={false} onClick={() => {}}>
            Modify
          </Button>
          <Button btype="accept" type="" disable={false} onClick={() => {}}>
            Accept
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminRollAssigner;
