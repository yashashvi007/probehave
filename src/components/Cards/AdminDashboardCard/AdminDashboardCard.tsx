import React from "react";
import Style from "./AdminDashboardCard.module.css";
import Image from "next/image";

interface Iprops {
  title: string;
  description: string;
  count: number;
  image: string;
}

const AdminDashboardCard = ({ title, description, count, image }: Iprops) => {
  const countfunction = (number: number) => {
    if (number >= 0) {
      return true;
    } else {
      return false;
    }
  };

  const countColor = {
    color: countfunction(count) ? "#00A389" : "#FF5B5B",
  };

  return (
    <div className={Style.main}>
      <div className={Style.text}>
        <div className={Style.text1}>
          <p className={Style.title}>{title}</p>
          <p className={Style.description}>{description}</p>
        </div>
        <div>
          <p className={Style.count} style={countColor}>
            {count > 0 ? "+" + count : count}%
          </p>
        </div>
      </div>
      <div className={Style.image}>
        <Image src={image} alt="img" />
      </div>
    </div>
  );
};

export default AdminDashboardCard;
