import Style from "./ModuleCards.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Button from "../Button/Button";
import Rating from "@mui/material/Rating";

// import { url } from "inspector";

interface Module {
  moduleTitle: string;
  description: string;
  rating: number;
}

interface IProps {
  title: string;
  modules: any;
  hideCard: any;
}

const ModuleCards = ({ modules, hideCard }: IProps) => {
  const router = useRouter();

  console.log(modules);
  const clickHandler = (id: any) => {
    router.push(`/module/${id}`);
  };


  return (
    <div className={Style.moduleCards}>
      {/* <h1>{title}</h1> */}
      <div className={Style.moduleCards_card}>
        {modules
          .filter((data: any) => data.module?._id !== hideCard)
          .map((module: any, i: any) => (
      
            <Link
              href={`/module/${module.module?._id}`}
              key={i}
              className={Style.cardLink}
              style={{ textDecoration: "none" }}
            >
              <div className={Style.cardLink_container}>
                <div
                  className={Style.cardLink_containerImg}
                  style={{ background: `url(${module.module?.image})` }}
                ></div>
                <div className={Style.cardLink_info}>
                  <p style={{fontSize:'25px', fontWeight:'600'}} >{module.module?.title}</p>
                  {/* <span className={Style.cardLink_info_category}>Category</span> */}
                  <div className={Style.infoRating}>
                    <div className={Style.infoRating_stars}>
                      {/* {[...Array(module.module?.rating)].map((_, i) => (
                      <Image
                        key={i}
                        src="./filledStar.svg"
                        width={10}
                        height={10}
                        alt="star"
                      />
                    ))} */}
                      <Rating name="read-only" value={5} readOnly />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ModuleCards;
