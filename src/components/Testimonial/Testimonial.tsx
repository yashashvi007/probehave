import React from "react";
import Style from "./Testomonial.module.css";

interface testimonial {
  name: string;
  designation: string;
  description: string;
}

interface IProps {
  testimonials: testimonial[];
}

function Testimonial({ testimonials }: IProps) {
  return (
    <div className={Style.testimonialsContainer}>
      {testimonials.map((testimonial, i) => (
        <div key={i} className={Style.testimonial}>
          <p>{testimonial.description}</p>
          <div className={Style.nameDesignationContainer}>
            <div className={Style.testimonialLetterCircle}>J</div>
            <div>
              <h1>{testimonial.name}</h1>
              <p>{testimonial.designation}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Testimonial;
