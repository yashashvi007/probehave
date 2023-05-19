import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { login } from "@/redux/actions/userActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import cookie from "cookie";
import Cookies from "js-cookie";
import { notify } from "@/components/Toast/Toast";

interface IUser {
  email: string;

  password: string;
}

interface IErrorMessage {
  email: string;

  password: string;
}

interface Props {
  data: any;
}

function Login() {
  const [fields, setFields] = useState<IUser>({ email: "", password: "" });
  const [errorFields, setErrorFields] = useState<IErrorMessage>({
    email: "",
    password: "",
  });
  const [acceptToTermsAndConditions, setAcceptToTermsAndConditions] =
    useState<boolean>(false);
  const [apiError, setApiError] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const userLogin = useAppSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  useEffect(() => {
    if (userInfo || Cookies.get("userInfo")) {
      const userCookie = Cookies.get("userInfo");
      const user = userCookie ? JSON.parse(userCookie) : null;

      if (user.role === "admin") {
        router.push("/admin");
      } else if (user.role === "staff") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [userInfo, router]);

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      if (url === "/otpVerification/otpVerfication1") {
        router.events.emit("routeChangeError");
        router.replace("/authentication/login");
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  const Regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

  function containsOnlyNumbers(str: string): boolean {
    return /^\d+$/.test(str);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });

    switch (event.target.name) {
      case "email":
        setErrorFields({
          ...errorFields,
          email:
            Regex.test(event.target.value) || event.target.value.length === 0
              ? ""
              : "Email is not valid",
        });
        break;

      case "password":
        setErrorFields({
          ...errorFields,
          password:
            event.target.value.length < 5
              ? "Password should be more than 5"
              : "",
        });
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // @ts-ignore is working
    dispatch(login({ email: fields.email, password: fields.password }));
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="register-page">
        <div className="register-form">
          <ToastContainer />

          <Image
            style={{ marginBottom: "10px" }}
            src="/logo.svg"
            height={50}
            width={50}
            alt="logo"
          />
          <h3>Probehave</h3>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              {/* <label htmlFor="email">Email</label> */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <span>{errorFields.email}</span>
            </div>

            <div className="input-container">
              {/* <label htmlFor="password">Password</label> */}
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
              />
              <span>{errorFields.password}</span>
            </div>

            <div className="input-container submit">
              <button type="submit" disabled={acceptToTermsAndConditions}>
                Login
              </button>
            </div>

            <div className="input-container">
              <span className="text">
                {"don't have an account "}
                <Link href="/authentication/register">sign up</Link>
              </span>
              <span className="text">
                {"forget password "}
                <Link href="/authentication/forgetPassword1">
                  reset password
                </Link>
              </span>
            </div>
          </form>

          <div className="sign-up-options">
            <div className="sign-up-option">
              <div className="google-signup"></div>
            </div>
          </div>
        </div>
        <div className="register-bg-img">
          {/* <div className='r-bg-c-1' ></div>
                <div className='r-bg-c-2' ></div>
                <div className='r-bg-c-3' ></div> */}
          <div className="register-bg-img-text">
            <h1>
              Welcome to <br />
              <span className="register-bg-img-text-span">Probehave</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="BgImgOne MoblieHide"></div>
      <div className="BgImgTwo MoblieHide"></div>
      <div className="BgImgThree MoblieHide"></div>
      <div className="BgImgFour MoblieHide"></div>
    </div>
  );
}

export default Login;
