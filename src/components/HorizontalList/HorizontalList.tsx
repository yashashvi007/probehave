import Style from "./HorizontalList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Button from "../Button/Button";

interface Module {
  moduleTitle: string;
  description: string;
  rating: number;
}

interface IProps {
  title: string;
  modules: Module[];
}

function HorizontalList({ title, modules }: IProps) {
  const router = useRouter();

  const clickHandler = (id: any) => {
    router.push(`/module/${id}`);
  };

  return (
    <div className={Style.horizontalList}>
      <h1>{title}</h1>

      <div className={Style.horizontalList_books}>
        {modules.map((module: any, i: any) => (
          <Link
            href={`/module/${module.module?._id}`}
            key={i}
            className={Style.booksCard}
            style={{ textDecoration: "none" }}
          >
            <Image
              src={module.module?.image}
              width={254}
              height={380}
              alt="book"
              style={{ borderRadius: 12 }}
            />
            <div className={Style.horizontalList_info}>
              <h3>{module.module?.title}</h3>
              <span>{module.module?.description}</span>
              <div className={Style.infoRating}>
                <div className={Style.infoRating_stars}>
                  {[...Array(module.module?.rating)].map((_, i) => (
                    <Image
                      key={i}
                      src="./filledStar.svg"
                      width={10}
                      height={10}
                      alt="star"
                    />
                  ))}
                </div>
                <span>{module.module?.rating}</span>
              </div>
              <Button btype="signup" type="" disable={false} onClick={() => {}}>
                Add to cart
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HorizontalList;
