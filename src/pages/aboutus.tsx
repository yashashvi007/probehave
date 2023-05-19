import React from "react";
import Style from "../styles/aboutus.module.css";
import Layout from "../../src/components/Layout/Layout";
import Image from "next/image";

// /instructor.svg

const AboutUs = () => {
  return (
    <>
      <Layout>
        <div className={Style.aboutUs}>
          <h1>ABOUT US</h1>
          <div className={Style.aboutUs_upper}>
            <p>
              Lorem ipsum dolor sit amet consectetur. Aliquam id ut phasellus
              diam dapibus sed. Id nisl fermentum ipsum lacus tincidunt. Enim
              senectus maecenas porta feugiat lectus venenatis quis. Enim aenean
              tellus sed sed convallis adipiscing. Leo bibendum pellentesque non
              cum nunc et at amet. Tellus semper erat penatibus sapien vitae a
              ridiculus ornare. Convallis ut ut etiam tristique accumsan. Justo
              justo in semper cursus purus mattis scelerisque etiam vel. Felis
              id quam in ipsum fringilla tristique nisl fames nulla. Euismod nec
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur. Aliquam id ut phasellus
              diam dapibus sed. Id nisl fermentum ipsum lacus tincidunt. Enim
              senectus maecenas porta feugiat lectus venenatis quis. Enim aenean
              tellus sed sed convallis adipiscing. Leo bibendum pellentesque non
              cum nunc et at amet. Tellus semper erat penatibus sapien vitae a
              ridiculus ornare. Convallis ut ut etiam tristique accumsan. Justo
              justo in semper cursus purus mattis scelerisque etiam vel. Felis
              id quam in ipsum fringilla tristique nisl fames nulla. Euismod nec
            </p>
            <div className={Style.blur}></div>
          </div>
          <div className={Style.aboutUs_middle}>
            <Image src="/Images/AboutUs/MiddleImg.svg" style={{ objectFit: 'cover', objectPosition: 'center' }} width={100} height={400} alt="Img" />
            <Image src="/Images/AboutUs/MiddleImgBgCircle.svg" width={100} height={100} alt="Img" />
            <Image src="/Images/AboutUs/MiddleImgBgCircle.svg" width={100} height={100} alt="Img" />
          </div>
          <div className={Style.aboutUs_lower}>
            <Image src="/Images/AboutUs/instructor.svg" width={100} height={100} alt="n" />

            <div className={Style.aboutUs_lowerContent}>
              <div className={Style.aboutUs_lower_quote}>
                <p className={Style.aboutUs_lower_quote_p}>
                  &quot, Lorem ipsum dolor sit amet consectetur. Aliquam id
                  dapibus sed. Id nisl fermentum ipsum lacus tincidunt. Enim
                  senectus maecenas porta &quot,
                </p>
                <span
                  className={Style.aboutUs_lower_quote_span}
                  style={{ fontSize: "15px", padding: "0px 0px", opacity: 0.8 }}
                >
                  ~ Lorem ipsum dolor sit amet ~
                </span>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur. Aliquam id ut phasellus
                diam dapibus sed. Id nisl fermentum ipsum lacus tincidunt. Enim
                senectus maecenas porta feugiat lectus venenatis quis. Enim
                aenean tellus sed sed convallis adipiscing. Leo bibendum
                pellentesque non cum nunc et at amet. Tellus semper erat
                penatibus sapien vitae a ridiculus ornare. Convallis ut ut etiam
                tristique accumsan. Justo justo in semper cursus purus mattis
                scelerisque etiam vel. Felis id quam in ipsum fringilla
                tristique nisl fames nulla. Euismod nec id aliquam pellentesque
                faucibus. Augue vulputate ultricies augue netus tincidunt
                tincidunt posuere. Magna eget pellentesque lobortis sed euismod
                dui blandit malesuada purus. Pretium nibh at amet scelerisque
                adipiscing urna.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AboutUs;
