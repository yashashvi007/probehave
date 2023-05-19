import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import Style from '../../styles/otpverification.module.css'
import { useRouter } from 'next/router'
interface IUser {
    email : string 
}

interface IErrorMessage {
    email : string 
}

function OtpVerication1() {

    const router = useRouter()
    console.log(router.query);
    
    const [fields, setFields] = useState<IUser>({  email : ''})
    const [errorFields, setErrorFields] = useState<IErrorMessage>({email : '' })

   

    const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            [event.target.name]: event.target.value
        })
        switch (event.target.name) { 
            case 'email':
                setErrorFields({
                    ...errorFields ,
                    email : ((Regex.test(event.target.value)) || event.target.value.length === 0) ? '' : 'Email is not valid'
                })
                break;
          
        }
    }

    const handleSubmit = (event: React.FormEvent) => {

    }

    return (
        <>
            <div className={Style.forgot_page} >
                <div className={Style.forgot_form} >
                    <h1 style={{ marginTop: "70px" }}>OTP Confirmation</h1>
                    {/* <Image style={{marginTop : '10px'}}  src='/admin/otpverification1.png' height={200} width={200} alt='logo' /> */}
                    {/* <img style={{ marginTop: '20px' }} src='/admin/otpverification1.png' width="150px" alt='logo' /> */}
                    <img style={{ marginTop: '30px' }} src='/otp/otp1.svg' width="150px" alt='logo' />

                    <div className={Style.description} style={{ color: "#000000",marginTop:"30px" }}>Enter your email id to
                        confirm .</div>

                    <div className={Style.description} style={{ color: "#656565" }}>We will send you one time
                        password(OTP)</div>

                    <form onSubmit={handleSubmit} >

                        <div className={Style.input_container}>
                            <input type='email' name='email' placeholder='Enter your email id' onChange={handleChange} />
                            <span>{errorFields.email}</span>
                        </div>

                        <div className={`${Style.input_container} ${Style.submit}`} >
                            <button type='submit' >Send</button>
                        </div>

                    </form>
                </div>
                <div className={`register-bg-img ${Style.herosection}`} >
                    <div className='r-bg-c-1' >

                    </div>
                    <div className='r-bg-c-2' >

                    </div>
                    <div className='r-bg-c-3' >

                    </div>
                    <div className='register-bg-img-text' >
                        <h1>Welcome to </h1>
                        <h1>Probehave</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OtpVerication1
