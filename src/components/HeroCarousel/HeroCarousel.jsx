import React, { useState, useEffect } from "react";
import Style from "./HeroCarousel.module.css";

const Carousel = ({ images }) => {
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className={Style.carouselContainer}>
            <div
                className={Style.carouselSlide}
                style={{ transform: `translateX(-${slideIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                        <img src={image} alt='img' key={index}  />
                ))}
            </div>
        </div>
    );
};

export default Carousel;