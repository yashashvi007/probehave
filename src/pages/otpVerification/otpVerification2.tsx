import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Style from "../../styles/otpverification.module.css";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { notify } from "@/components/Toast/Toast";

function OtpVerication2() {
  const router = useRouter();
  const { email }: any = router.query;

  console.log(router.query);

  const [otp, setOtp] = useState<any>(new Array(6).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;

    const newOtp: string[] = [...otp];
    newOtp[index] = value.substring(value.length - 1);

    if (!value) setActiveOtpIndex(index - 1);
    else setActiveOtpIndex(index + 1);
    setOtp(newOtp);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.API_SERVER_URL}/user/verify-email`,
        { userId: router.query.userId, otp: otp.join("") }
      );
      notify("success", "Successfully signed up");
      if (data.message === "success") {
        router.push("/authentication/login");
      }
    } catch (error: any) {
      console.log(error);
      notify("error", "ERRor");
    }
  };

  return (
    <>
      <div className={Style.forgot_page}>
        <div className={Style.forgot_form}>
          <ToastContainer />
          <h1 style={{ marginTop: "70px" }}>OTP Confirmation</h1>
          <Image
            style={{ marginTop: "30px", width: "150px" }}
            src="/otp/otp2.svg"
            alt="logo"
            height={100}
            width={150}
          />

          {/* <div className={Style.description} style={{ color: "#000000",marginTop:"30px" }}>Mobile verification has successfully done</div> */}

          {email && (
            <div className={Style.description} style={{ color: "#656565" }}>
              We have send the OTP on {email.substring(0, 2)}
              {"*****"}
              {email.substring(email.length - 3)}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={Style.input_container}>
              {otp.map((_: any, index: any) => {
                return (
                  <React.Fragment key={index}>
                    <input
                      ref={index === activeOtpIndex ? inputRef : null}
                      value={otp[index]}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </React.Fragment>
                );
              })}
            </div>

            <div
              className={`${Style.input_container} ${Style.submit}`}
              style={{ marginTop: "40px" }}
            >
              <button type="submit">Verify</button>
            </div>
          </form>
        </div>
        <div className={`register-bg-img ${Style.herosection}`}>
          <div className="r-bg-c-1"></div>
          <div className="r-bg-c-2"></div>
          <div className="r-bg-c-3"></div>
          <div className="register-bg-img-text">
            <h1>Welcome to </h1>
            <h1>Probehave</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtpVerication2;
