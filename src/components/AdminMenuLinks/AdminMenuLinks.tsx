import React from "react";
import Style from "./AdminMenuLinks.module.css";
import Link from "next/link";
import Image from "next/image";

interface IProps {
  imageUrl: string;
  path: string;
  title: string;
}

const AdminMenuLinks = ({ imageUrl, path, title }: IProps) => {
  return (
    <Link className={Style.title} href={path}>
      <div style={{ marginLeft: "0%" }}>
        <div className={`flex  flex-align-center ${Style.main}`}>
          <Image
            className={Style.icon}
            src={imageUrl}
            alt="loading"
            height={60}
            width={60}
          />
          <span>{title}</span>
        </div>
      </div>
    </Link>
  );
};

export default AdminMenuLinks;
