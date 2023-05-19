import React, { useEffect, useState } from 'react'
import Image from 'next/image'



import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { useRouter } from 'next/router';
import { register } from '@/redux/actions/userActions';

import { uploadToS3 } from '@/utils/uploadToS3';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { notify } from '@/components/Toast/Toast';
import Link from 'next/link';
import Cookies from 'js-cookie';


interface IUser{
    fullName: string , 
    email : string , 
    phoneNumber : string ,
    password : string  , 
    countryCode : string 
}

interface IErrorMessage {
        fullName : string , 
        email : string , 
        phoneNumber : string ,
        password : string ,
        countryCode : string
}



function Register() {
    const [fields , setFields] = useState<IUser>({fullName : '', email : '', password : '' , phoneNumber : '' , countryCode : '+91'})
    const [errorFields , setErrorFields] = useState<IErrorMessage>({fullName : '' , email : '' , password : '' , phoneNumber : '' , countryCode : ''})
    const [acceptToTermsAndConditions , setAcceptToTermsAndConditions] = useState<boolean>(false)
    const [imageUrl , setImageUrl] = useState<any>('')
    const router = useRouter()
    const dispatch = useAppDispatch()
   

    useEffect(()=> {
        if(Cookies.get("userInfo")){
            router.push('/')
        }
    } , [])
    
    
    const Regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/

    function containsOnlyNumbers(str : string) : boolean {
        return /^[-+*/\d\s()]+$/.test(str);
    }
    
    const handleChange = (event :React.ChangeEvent<HTMLInputElement>)=>{
        setFields({
            ...fields ,
            [event.target.name] : event.target.value
        })

        switch(event.target.name){
            case 'fullName':
                setErrorFields({
                    ...errorFields ,
                    fullName : ((event.target.value.length < 1) && event.target.value.length !== 0 ) ? 'Full Name cannot be empty' : ''
                })
                break;
            case 'email':
                setErrorFields({
                    ...errorFields ,
                    email : ((Regex.test(event.target.value)) || event.target.value.length === 0) ? '' : 'Email is not valid'
                })
                break;
            case 'phoneNumber':
                setErrorFields({
                    ...errorFields , 
                    phoneNumber :  ((event.target.value.length === 10 && containsOnlyNumbers(event.target.value) ) || event.target.value.length === 0 ) ? '' : 'Phone number is invalid'
                })
                break;
            case 'password':
                setErrorFields({
                    ...errorFields ,
                    password : event.target.value.length < 5 ? 'Password should be more than 5' :''
                })
                break;
            case 'countryCode':
                setErrorFields({
                    ...errorFields , 
                    countryCode : (event.target.value.length > 4) ? 'Country code should less than 3' : ''
                })
        }
    }

    const onImageChange =async (e : any) => {
        try {
            const url = await uploadToS3(e.target.files[0])
            setImageUrl(url)
        } catch (error) {
            
        }
    }
    

    const handleSubmit = async (event : React.FormEvent)=>{
        event.preventDefault()
        try {
            const res = await axios.post(`${process.env.API_SERVER_URL}/user/create` , {name : fields.fullName , email : fields.email , password : fields.password ,phone_number :  fields.countryCode +  fields.phoneNumber , image : imageUrl })
            const otp = res.data
            if(res.statusText === 'OK'){
                await axios.post(`${process.env.API_CLIENT_URL}/api/sendEmail`, {email : "yashashvimaurya@gmail.com", otp : otp})

                router.push({
                    pathname : '/otpVerification/otpVerification2', 
                    query : {email : fields.email , userId : res.data._id}
                })
            }
        } catch (error : any) {
            console.log(error);
            
            notify("error" , error.response.data.error)
        }
    }

  return (
    <>
       <div className='register-page' >
            <div className='register-form' >
            <ToastContainer/>
                <Image style={{marginBottom : '10px'}} src='/logo.svg' height={50} width={50} alt='logo' />
                <h3>Probahve</h3>
                <h1>Create an account</h1>
                <form onSubmit={handleSubmit} >
                    <div className='input-container'>
                        {/* <label htmlFor="fullName">Full Name</label> */}
                        <input type='text' name='fullName' placeholder='Full Name' onChange={handleChange} />
                        <span>{errorFields.fullName}</span>
                    </div>
                    <div className='input-container'>
                        {/* <label htmlFor="email">Email</label> */}
                        <input type='email' name='email' placeholder='Email' onChange={handleChange}  />
                        <span>{errorFields.email}</span>
                    </div>
                    <div className='input-container'>
                        <label htmlFor="profile">Profile</label>
                        <input type='file' name='profile' onChange={onImageChange}  />
                        {/* <span>{errorFields.email}</span> */}
                    </div>
                <div className='input-container'>
                    {/* <label htmlFor="phoneNumber">phoneNumber</label> */}
                    <input type='phoneNumber' name='countryCode' placeholder='+91' onChange={handleChange} value={fields.countryCode} />
                    <span>{errorFields.countryCode}</span>
                    <input type='phoneNumber' name='phoneNumber' placeholder='PhoneNumber' onChange={handleChange}  />
                    <span>{errorFields.phoneNumber}</span>
                </div>
                <div className='input-container'>
                    {/* <label htmlFor="password">Password</label> */}
                    <input type='password' name='password' placeholder='password' onChange={handleChange}  />
                    <span>{errorFields.password}</span>
                </div>
                <div className='input-container'>
                    {/* <label htmlFor="password">Password</label> */}
                    <input type='password' name='password' placeholder='Confirm Password' onChange={handleChange}  />
                    <span>{errorFields.password}</span>
                </div>
           
                <div className='input-container' >
                   
                    <label className='radio-button' >
                        <input type='radio'  checked={!acceptToTermsAndConditions} onClick={()=> setAcceptToTermsAndConditions(!acceptToTermsAndConditions)} onChange={(e)=> {}}  />
                        <span>I agree to all terms and conditions</span>
                    </label>
                </div>
                <div className='input-container submit' >
                    <button type='submit' disabled={acceptToTermsAndConditions} >Register Me</button>
                </div>
                <div className='input-container' >
                 <span className='text' >{" have an account "}<Link href='/authentication/login' >Login</Link></span>
                </div>
                
                </form>

                <div className='sign-up-options' >
                    <div className='sign-up-option' >
                        <div className='google-signup' >

                        </div>
                    </div>
                   
                </div>
            </div>
           
            <div className='register-bg-img' >
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

export default Register