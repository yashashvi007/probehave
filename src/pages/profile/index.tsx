import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import React, { useEffect, useState } from "react";
import Style from "@/styles/profile.module.css";
import Button from "@mui/material/Button";
// import LowerMenuCard from "@/components/Profile/Module/LowerMenuCard";

// import LowerAbout from "@/components/Profile/About/LowerAbout";
import cookie from "cookie";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getUserDetails, updateUserProfile } from "@/redux/actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "@/redux/constants/userConstants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import axios from "axios";
import LowerMenuCard from "@/components/Profile/Module/LowerMenuCard";
import LowerAbout from "@/components/Profile/About/LowerAbout"
import Image from 'next/image';
import { uploadToS3 } from "@/utils/uploadToS3";
import Cookies from "js-cookie";

interface Props {
  userCookie: any;
  userModules: any;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  console.log(cookies);

  let userInfo: any = "not found";
  const userInfoCookie = cookies.userInfo;
  if (userInfoCookie) {
    const decodedUserInfo = decodeURIComponent(userInfoCookie);
    userInfo = JSON.parse(decodedUserInfo);
  }
  let userModules: any = null; // Set initial value to null

  if (userInfo !== "not found") {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `${process.env.API_SERVER_URL}/user/getUserModules`,
      config
    );
    userModules = await res.json();

    userModules = userModules?.modules?.filter((module: any) => module.moduleDetail !== null);
  }

  return {
    props: {
      userCookie: userInfo,
      userModules, // Assign the modified value to the prop
    },
  };
};


const Profile = ({ userCookie, userModules }: Props) => {

  const [handleMenu, setHandleMenu] = useState<any>(0);

  const [state, setState] = useState<any>({
    name: userCookie?.name,
    email: userCookie?.email,
    password: "",
    profession: userCookie?.profession || "",
    location: userCookie?.location || "",
    bio: userCookie?.bio || "",
    phone_number : userCookie?.phone_number || "", 
    imageUrl : userCookie?.image || ""
  });
  const [modules, setModules] = useState<any[]>(userModules);
  const [isBio, setIsBio] = useState<boolean>(false);
  const [isModules, setIsModules] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const userLogin = useAppSelector((state) => state.userLogin);
  const { userInfo, loading, error }: any = userLogin;

  const userUpdateProfile = useAppSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const userDetails = useAppSelector((state) => state.userDetails);
  const { user } = userDetails;

  const router = useRouter();

  // useEffect(() => {
  //   if (userCookie === "not found") {
  //     router.push("/authentication/login");
  //   }
  // }, []);

  useEffect(()=>{
    if(!Cookies.get("userInfo")){
      router.push('/authentication/login')
    }
  } ,[router , userInfo])

  const onChangeHandler = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log(state.name);
    // @ts-ignore is working
    dispatch(updateUserProfile({ name: state.name, email: state.email, profession: state.profession, location: state.location, bio: state.bio , phone_number : state.phone_number , image : state.imageUrl }));

    console.log(state);
  };

  const onLowerChangeHandler = (name : any , value : any)=> {
    setState({
      ...state , 
      [name] : value
    })
  }

  const changeImage =async (e : any)=> {
    console.log(e.target.files[0]);
    const url = await uploadToS3(e.target.files[0])
    setState({
      ...state , 
      imageUrl : url
    })
  }

  return (
    <>
      <Layout>
        <div className={Style.profile}>
          <div className={Style.profileUpper}>
            <div className={Style.profileUpper_bg}></div>
            <Image
              src={state.imageUrl}
              alt="img"
              height={140}
              width={140}
            />
            <input type="file" onChange={changeImage} />
            <div className={Style.profileUpper_detail}>
              <div className={Style.profileUpper_detailInput}>
                <input type="text" placeholder="name" name="name" value={state.name} onChange={onChangeHandler} />
                <input type="text" placeholder="profession" name="profession" value={state.profession} onChange={onChangeHandler} />
              </div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#7a9af0",
                  borderRadius: "22px",
                  height: "43px",
                  width: "144px",
                }}
                onClick={(e : any)=> onSubmit(e) }
              >
                Save Changes
              </Button>
            </div>
          </div>
          <div className={Style.profileLower}>
            <div className={Style.profileLower_menu}>
              <h3
                className={handleMenu ? Style.active : ""}
                onClick={() => {
                  setHandleMenu(1);
                }}
              >
                Module
              </h3>
              <h3
                className={!handleMenu ? Style.active : ""}
                onClick={() => {
                  setHandleMenu(0);
                }}
              >
                About
              </h3>
            </div>
            <hr />
            <div className={Style.profileLower_detail}>
              {!handleMenu ? (
                <LowerAbout onSubmit={onSubmit} email={state.email} bio={state.bio} location={state.location} phone_number={state.phone_number} onLowerChangeHandler={onLowerChangeHandler} />
              ) : (
                modules.map((data, i) => <LowerMenuCard module={data.moduleDetail} key={i} />)
              )}

             
              {/*  */}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};


export default Profile;

