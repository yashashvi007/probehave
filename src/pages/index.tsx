import Button from "@/components/Button/Button";
import ModuleCards from "../components/ModuleCards/ModuleCards";
import Layout from "../components/Layout/Layout";
import Testimonial from "@/components/Testimonial/Testimonial";

import Image from "next/image";
import React, { useEffect, useState, Component } from "react";
import Aboutuscarosalcard from "../components/CarousalTestimonial/Aboutuscarosalcard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import HeroCarousel from "../components/HeroCarousel/HeroCarousel"



interface Props {
  data: any;
}

export const getServerSideProps: any = async () => {
  const data = await fetch(`${process.env.API_SERVER_URL}/module`);
  const json = await data.json();


  const actives = json.modules.filter(
    (module: any) => module.module.isActive === true
  );

  return {
    props: {
      data: actives,
    },
  };
};

const HomePage: React.FC<Props> = ({ data }) => {
  const [modules, setModules] = useState<any>(data);

  const testimonials = [
    {
      name: "Jon",
      designation: "Product manager at @amazon",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod vel.",
    },
    {
      name: "Jon",
      designation: "Product manager at @amazon",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod vel.",
    },
  ];
    const images = [
      "Images/Home/HeroCarousel/Classic.png",
      "Images/Home/HeroCarousel/Future.png",
      "Images/Home/HeroCarousel/Present.png",
      "Images/Home/HeroCarousel/Kingdom.png",
    ];



  return (
    <div className="app-container">
      <Layout>
        {/* Hero-Section */}
        <section className="hero-section">
          <HeroCarousel images={images} />
          {/* <div className="hero-section_anya">
            <Image
              className="anya"
              src="./anya.svg"
              width={300}
              height={300}
              alt="anya"
            />
            <div className="hero-section_anya_chatIcon">
              <Image
                className="chat1"
                src="./chat1.svg"
                width={180}
                height={140}
                alt="chat"
              />
              <Image
                className="chat2"
                src="./chat2.svg"
                width={140}
                height={100}
                alt="chaticon"
              />
            </div>
          </div>
          <div className="hero-section_male">
            <Image
              className="male"
              src="./maleChar.svg"
              width={300}
              height={300}
              alt="maleChar"
            />
            <div className="hero-section_male_chatIcon">
              <Image
                className="chat1"
                src="./chat1.svg"
                width={180}
                height={140}
                alt="chat"
              />
              <Image
                className="chat2"
                src="./chat2.svg"
                width={140}
                height={100}
                alt="chaticon"
              />
            </div>
          </div> */}
        </section>

        {/* Inverted Wave */}
        <section className="inverted-wave">
          <div className="wave-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              fermentum nibh fringilla sagittis egestas. Pellentesque quis mi
              eget sem rutrum posuere.
            </p>
          </div>
        </section>
        {/* Module List  */}
        <h1 style={{ paddingLeft: "50px" }}>Modules</h1>
        {modules && (
          <ModuleCards modules={modules} title="Modules" hideCard="" />
        )}
        {/* <HorizontalList title="Modules" modules={modules} /> */}
        {/* Popular Section  */}
        <section className="popular-section-container">
          <div className="popular-section-cards-container">
            <div className="blue-gradient"></div>

            <div className="lonliness-card">
              <div className="lonliness-card-img"></div>
              <h3>Lonliness</h3>
              <Button btype="signup" type="" disable={false} onClick={() => {}}>
                Explore
              </Button>
            </div>

            <div className="user-card">
              <hr></hr>
              <div className="user-card-single">
                <div className="user-letter">J</div>
                <div className="user-card-detail">
                  <h4>Jay</h4>
                  <p>Loren ipsum</p>
                  <p>Lorem ipsum jipsum sipsum</p>
                </div>
              </div>
              <div className="user-card-single">
                <div className="user-letter">J</div>
                <div className="user-card-detail">
                  <h4>Jay</h4>
                  <p>Loren ipsum</p>
                  <p>Lorem ipsum jipsum sipsum</p>
                </div>
              </div>
            </div>
          </div>
          <div className="most-popular-container">
            <div className="green-gradient"></div>
            <div className="most-popular-container-content">
              <h1>Our Most</h1>
              <h2>Popular</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque sagittis leo sed dui congue, sit amet convallis
                elit cursus. Sed tempor metus et arcu volutpat, vitae eleifend
              </p>
            </div>
            <div className="mp-data-container">
              <div className="mp-data">
                <h3>50,000+</h3>
                <p>Active members</p>
              </div>
              <div className="mp-data">
                <h3>90%</h3>
                <p>Response Rate</p>
              </div>
            </div>
            <Button btype="signup" type="" disable={false} onClick={() => {}}>
              Get Started
            </Button>
          </div>
        </section>
        {/* Key Feature  */}
        <section className="key-features-container">
          <div className="key-features-blue-gradient"></div>
          <div className="key-features-desc">
            <div className="key-features-desc-heading">
              <h2>
                Boost yourself with <br />
                this Key features
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque sagittis leo sed dui congue, sit amet convallis
                elit cursus.
              </p>
            </div>
            <Button btype="signup" type="" disable={false} onClick={() => {}}>
              See all
            </Button>
          </div>
          <div className="key-features-cards">
            <div className="key-features-card">
              <h1>Title - Loren Ipsum</h1>
              <p>i done t know when i ll find true peace and dher sara paisa</p>
            </div>
            <div className="key-features-card">
              <h1>Title - Loren Ipsum</h1>
              <p>i done t know when i ll find true peace and dher sara paisa</p>
            </div>
            <div className="key-features-card">
              <h1>Title - Loren Ipsum</h1>
              <p>i done t know when i ll find true peace and dher sara paisa</p>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}

        <section className="testimonial-heading">
          <div className="testimonial-gradient"></div>
          <div className="">
            <div className="testimonial-heading-container">
              <h2>
                What our customer <br /> Are Saying?
              </h2>
              <p>i donet knowo know wo so mo ko</p>
            </div>
          </div>
          {/* <Testimonial testimonials={testimonials} /> */}
          <Aboutuscarosalcard testimonials={testimonials} />
        </section>

        {/* Become Insructor  */}
        <section className="instructor-container">
          <img src="/instructor.svg" alt="img" />
          <div className="instructor-container-details">
            <div className="become-instructor-container">
              <h1>
                Become an <br /> instructor
              </h1>
              <div className="ellipse-container">
                <Image
                  src="./smallellipse.svg"
                  width={22}
                  height={19}
                  alt="ellipse"
                />
                <Image
                  src="./smallellipse.svg"
                  width={22}
                  height={19}
                  alt="ellipse"
                />
                <Image
                  src="./smallellipse.svg"
                  width={22}
                  height={19}
                  alt="ellipse"
                />
                <Image
                  src="./smallellipse.svg"
                  width={22}
                  height={19}
                  alt="ellipse"
                />
              </div>
            </div>
            <div className="instructor">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                euismod vel tortor at tempus. Quisque elementum pulvinar mauris
              </p>
              <Button btype="signup" type="" disable={false} onClick={() => {}}>
                Read More
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default HomePage;
