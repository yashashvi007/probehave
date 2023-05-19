import React, { useState, useEffect } from "react";
import Style from "../../styles/moduledetails.module.css";
import Rating from "@mui/material/Rating";
import LanguageIcon from "@mui/icons-material/Language";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TvIcon from "@mui/icons-material/Tv";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useRouter } from "next/router";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { notify } from "@/components/Toast/Toast";
import { toast, ToastContainer } from "react-toastify";
import { GetServerSideProps } from "next";
import cookie from "cookie";
import Cookies from "js-cookie";
import { log } from "console";
import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import Link from "next/link";
import ModuleCards from "@/components/ModuleCards/ModuleCards";


interface Props {
  data: any;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { moduleId } = query;




  try {
    const { data } = await axios.get(
      `${process.env.API_SERVER_URL}/module/${moduleId}`
    );


    
    const scene_res = await fetch(
      `${process.env.API_SERVER_URL}/scene/getScenesForModule/${moduleId}`
    );
    const scene_data = await scene_res.json();

      const moduleData = await fetch(`${process.env.API_SERVER_URL}/module`);
      const json = await moduleData.json();

      const actives = json.modules.filter(
        (module: any) => module.module.isActive === true
      );
      
      const newActives = actives.filter((data:any ) =>data.Id !== moduleId)

    return {
      props: {
        module_data: data.module,
        sceneId: scene_data.scenes ? scene_data.scenes[0]._id : "",
        moduleCardData: newActives,
      },
    };
  } catch (error) {
    console.log("mai hu eror", error);
    return {
      props: {
        data: null,
      },
    };
  }
};

interface IProps {
  module_data: any;
  sceneId: any;
  moduleCardData:any;
}


const ModuleDetailsLandingPage = ({
  module_data,
  sceneId,
  moduleCardData,
}: IProps) => {
  const router = useRouter();

  // console.log(module_data);

  const userInfoCookie = Cookies.get("userInfo");
  let userInfo: any;
  if (userInfoCookie !== undefined) {
    userInfo = JSON.parse(userInfoCookie);
  }

  const [value, setValue] = React.useState(4);
  const [module, setModule] = useState(module_data);
  const [isPurchasedByUser, setIsPurchasedByUser] = useState(false);
  const [updatedDate, setUpdatedDate] = useState<any>("");

  useEffect(() => {
    if (!userInfo) {
      router.push("/authentication/login");
      return;
    }

    const fetchUser = async () => {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      try {
        const { data } = await axios.get(
          `${process.env.API_SERVER_URL}/user/fetch-user`,
          config
        );

        setIsPurchasedByUser(
          data.user.modules.find(
            (module: any) => module.module_id === router.query.moduleId
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

    const date = new Date(module.updatedAt);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    setUpdatedDate(`${day}/${month}/${year}`);

    if (!router.isReady) {
      return;
    }

    fetchUser();
  }, [router.isReady]);


  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };


  const onBuy = async (amount : any)=> {
    // const {data} = await axios.post("localhost:5000/probehave/api/module/checkout" , {
    //   amount
    // })

    if (!userInfo) {
      router.push("/authentication/login");
      return;
    }

    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    console.log("success");


    const { moduleId } = router.query;

   

  

    const {data} = await axios.post(`${process.env.API_SERVER_URL}/module/checkout` , {
        amount
      })
  console.log(data);
  var options = {
    key: process.env.RAZOR_PAY_KEY_ID, // Enter the Key ID generated from the Dashboard
    name: "Manu Arora Pvt Ltd",
    currency: data.order.currency,
    amount: data.order.amount,
    order_id: data.order.id,
    description: "Thankyou for your test donation",
    image: "https://manuarora.in/logo.png",
    handler:async function (response:any) {
      // Validate payment at server - using webhooks is a better idea.
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);

      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
  
        const res = await axios.post(
          `${process.env.API_SERVER_URL}/module/buy/${moduleId}`,
          { moduleId , payment_id :  response.razorpay_payment_id , module_name : module?.title, price : module?.price , user_name : userInfo.name  },
          config
        );
  
        setIsPurchasedByUser(true);
      } catch (error: any) {
        console.log(error);
        notify("error", error.response.data.error);
      }
    },
    prefill: {
      name: "Manu Arora",
      email: "manuarorawork@gmail.com",
      contact: "8718044432",
    },
  };

  //@ts-ignore
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
    
  }

  // const onBuyClick = async () => {
  //   console.log("asdsad");
  //   const { moduleId } = router.query;

  //   if (!userInfo) {
  //     router.push("/authentication/login");
  //     return;
  //   }

  //   try {
  //     const config = {
  //       headers: { Authorization: `Bearer ${userInfo.token}` },
  //     };

  //     const res = await axios.post(
  //       `${process.env.API_SERVER_URL}/module/buy/${moduleId}`,
  //       { moduleId },
  //       config
  //     );

  //     setIsPurchasedByUser(true);
  //   } catch (error: any) {
  //     console.log(error);
  //     notify("error", error.response.data.error);
  //   }
  // };

  const onStartClick = () => {
    console.log("hasbdh");
    if (sceneId) {
      router.push(`/chat/${module._id}/${sceneId}`);
    }
  };

  console.log("module data is", module_data);
  console.log("scene data is", sceneId);

  return (
    <>
      <Layout>
        <ToastContainer />
        <div className={Style.hero}>
          <h3 className={Style.heroheading}>{module?.title}</h3>
          <p className={Style.herodesc1}>{module?.description}</p>
          <p className={Style.herorating}>
            <Rating name="read-only" value={module?.rating} readOnly />{" "}
            <span>{module?.ratings.length} ratings</span>
          </p>
          <p>Created by Chetan</p>
          <div className={Style.herolast}>
            <p>
              <InfoOutlinedIcon />
              {`Last update ${updatedDate}`}
              {/* <LanguageIcon />
            {module?.language}
            <SubtitlesIcon />
            English */}
            </p>
            <p>
              <LanguageIcon />
              {module?.language}
            </p>
            <p>
              <SubtitlesIcon />
              English
            </p>
          </div>
        </div>
        <div className={Style.card_container}>
          <div className={Style.card}>
            <Image
              src={module?.image}
              alt="m"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
              }}
              width={100}
              height={200}
            />

            <div className={Style.price}>
              <p style={{ fontSize: "25px", fontWeight: "700" }}>
                ₹{module?.price}
              </p>
              <p style={{ opacity: "0.8" }}>
                <span
                  style={{
                    textDecoration: "line-through",
                    marginRight: "10px",
                  }}
                >
                  ₹3000
                </span>
                81%off
              </p>
            </div>
            {isPurchasedByUser ? (
              <button className={Style.cardbtn1} onClick={() => onStartClick()}>
                Start
              </button>
            ) : (
              <>
                <button className={Style.cardbtn1} onClick={() => onBuy(module?.price)}>
                  Buy it
                </button>
                <button className={Style.cardbtn2}>Try it</button>
              </>
            )}
            <p className={Style.cardheading}>Category:</p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                paddingTop: "10px",
                color: "#1D1D1D",
                gap: "10px",
              }}
            >
              {module?.categories[0].name}
            </p>
            <p className={Style.cardheading} style={{ marginTop: "10px" }}>
              Tags:
            </p>
            {module?.tags.map((tag: any, i: any) => (
              <li key={i}>{tag.name}</li>
            ))}
          </div>
        </div>
        <div className="module-blue1-gradient"></div>
        {/* <div className={Style.image3}>
          <Image src="/admin/11.png" alt="m" width={100} height={100} />
        </div> */}
        <div className={Style.main}>
          <h3 className={Style.mainheading}>What you’ll learn</h3>
          <div className={Style.maindesc}>
            {module_data?.what_you_learn.map((point: any, i: any) => (
              <p
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "10px",
                  color: "rgba(105, 105, 105, 1)",
                }}
              >
                <CheckIcon />
                {point.point}
              </p>
            ))}
            {/* <p style={{display:"flex",alignItems:"center",paddingTop:"10px",color:"rgba(105, 105, 105, 1)"}}><CheckIcon/>ornare morbi eget sed felis mattis</p>
                <p style={{display:"flex",alignItems:"center",paddingTop:"10px",color:"rgba(105, 105, 105, 1)"}}><CheckIcon/>ornare morbi eget sed felis mattis</p> */}
          </div>
        </div>
        <div className={Style.detail}>
          <h3 className={Style.details}>Details</h3>
          <p className={Style.detailsdesc}>{module_data.detailDescription}</p>
        </div>
        <div className={Style.relatedVideos}>
          <h3 className={Style.details}>Related Videos</h3>
          <div style={{ marginLeft: "-50px" }}>
            <ModuleCards
              modules={moduleCardData}
              title="Modules"
              hideCard={module._id}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};
export default ModuleDetailsLandingPage;
