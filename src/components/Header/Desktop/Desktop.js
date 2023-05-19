import Link from "next/link";
import Style from "./Desktop.module.css";
// import NavigationIcon from '@mui/icons-material/Navigation';
import { logout } from "@/redux/actions/userActions";
import { useAppDispatch } from "@/redux/hooks/hooks";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../../Button/Button";



const Navbar = () => {

  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userInfoString = Cookies.get("userInfo");
    if (userInfoString) {
      setUserInfo(JSON.parse(userInfoString));
    }
  }, []);

  const handleClick = () => {
    // @ts-ignore is working
    dispatch(logout());
    setUserInfo(null);
  };




  return (
    <>
      <div className={Style.main}>
        <div className={Style.logo}>
        </div>
        <div className={Style.menu}>
          <Link className={Style.link} href={`/`}>
            HOME
          </Link>
          <Link className={Style.link} href={`/aboutus`}>
            ABOUTUS
          </Link>
          <Link className={Style.link} href={`/profile`}>
            PROFILE
          </Link>
          <Link className={Style.link} href={`/#contact`}>
            CONTACT
          </Link>
        </div>
        <div className={Style.authButtonContainer}>
          {!userInfo ? (
            <div className={Style.authButtonContainer_ins}>
              <Link href="/authentication/login">
                <Button btype="login" type="" disable={false} onClick={() => { }}>
                  Login
                </Button>
              </Link>
              <Link href="/authentication/register">
                <Button btype="signup" type="" disable={false} onClick={() => { }}>
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <div className={Style.authButtonContainer_ins}>
              <Link href="/profile">
                <Button btype="signup" type="" disable={false} onClick={() => { }}>
                  Profile
                </Button>
                {/* <NavigationIcon variant="extended" btype="signup" type="" disable={false} onClick={() => { }}> Profile </NavigationIcon> */}
              </Link>
              <Button btype="login" onClick={handleClick} disable={false} type="">
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Navbar;
