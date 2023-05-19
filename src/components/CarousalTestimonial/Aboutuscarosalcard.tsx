import Style from "./Aboutuscarosalcard.module.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useState } from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Image from "next/image";

interface testimonial {
  name: string;
  designation: string;
  description: string;
}

interface IProps {
  testimonials: testimonial[];
}

const Aboutuscarosalcard = ({ testimonials }: IProps) => {
  const [currentCard, setCurrentCard] = useState(1);

  const handlePrevClick = () => {
    if (currentCard === 1) {
      setCurrentCard(3);
    } else {
      setCurrentCard(currentCard - 1);
    }
  };

  const handleNextClick = () => {
    if (currentCard === 3) {
      setCurrentCard(1);
    } else {
      setCurrentCard(currentCard + 1);
    }
  };
  console.log(testimonials);

  return (
    <>
      <div className={Style.container}>
        <div
          className={
            currentCard === 1
              ? `${Style.card} ${Style.current_card}`
              : currentCard === 2
              ? `${Style.card} ${Style.card_left}`
              : `${Style.card} ${Style.card_right}`
          }
        >
          <Image
            src="/Images/Home/Testimonial/TestimoniaImg.jpg"
            alt="Img"
            width={150}
            height={150}
            // style={{ borderRadius: "50%" }}
          />
          <p className={Style.CardHeading}>{testimonials[0].description}</p>
          {/* <h3 className={Style.CardSubHeading}>subheading</h3> */}
          <span className={Style.CardDescription}>{testimonials[0].name}</span>
        </div>
        <div
          className={
            currentCard === 2
              ? `${Style.card} ${Style.current_card}`
              : currentCard === 3
              ? `${Style.card} ${Style.card_left}`
              : `${Style.card} ${Style.card_right}`
          }
        >
          <Image
            src="/Images/Home/Testimonial/TestimoniaImg.jpg"
            alt="Img"
            width={150}
            height={150}
            // style={{ borderRadius: "50%" }}
          />
          <div className={Style.Img}></div>
          <p className={Style.CardHeading}>{testimonials[1].description}</p>
          {/* <h3 className={Style.CardSubHeading}>subheading</h3> */}
          <span className={Style.CardDescription}>{testimonials[1].name}</span>
        </div>
        <div
          className={
            currentCard === 3
              ? `${Style.card} ${Style.current_card}`
              : currentCard === 1
              ? `${Style.card} ${Style.card_left}`
              : `${Style.card} ${Style.card_right}`
          }
        >
          <Image
            src="/Images/Home/Testimonial/TestimoniaImg.jpg"
            alt="Img"
            width={150}
            height={150}
            // style={{ borderRadius: "50%" }}
          />
          <p className={Style.CardHeading}>{testimonials[1].description}</p>
          {/* <h3 className={Style.CardSubHeading}>subheading</h3> */}
          <span className={Style.CardDescription}>{testimonials[1].name}</span>
        </div>
        <div className={Style.buttons}>
          <button className={Style.button} onClick={handlePrevClick}>
            <KeyboardArrowLeftIcon
              sx={{ fontSize: "40px", color: "#000000" }}
            />
          </button>
          <button className={Style.button} onClick={handleNextClick}>
            <ChevronRightIcon sx={{ fontSize: "40px", color: "#000000" }} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Aboutuscarosalcard;
