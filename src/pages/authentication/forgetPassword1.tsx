import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import Style from '../../styles/forgotpassword.module.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

interface IUser{
    email : string 
}

interface IErrorMessage {
        email : string 
}

function ForgotPasswword1() {
    const [fields , setFields] = useState<IUser>({ email : ''})
    const [errorFields , setErrorFields] = useState<IErrorMessage>({ email : ''})
    const router = useRouter()

    const Regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/

    const handleChange = (event :React.ChangeEvent<HTMLInputElement>)=>{
        setFields({
            ...fields ,
            [event.target.name] : event.target.value
        })
        switch(event.target.name){
            
            case 'email':
                setErrorFields({
                    ...errorFields ,
                    email : ((Regex.test(event.target.value)) || event.target.value.length === 0) ? '' : 'Email is not valid'
                })
                break;
        }
    }
    const handleSubmit =async  (event : any)=>{
        event.preventDefault()
        try {
            const {data} =await axios.post(`${process.env.API_SERVER_URL}/user/forget-password` , {email : fields.email}) 
            router.push('/authentication/forgetPassword2')
        } catch (error) {
            toast("Cannot send email")
        }
    }

  return (
    <>
       <div className={Style.forgot_page} >
            <div className={Style.forgot_form} >
                <ToastContainer/>
                <Image style={{marginTop : '70px'}}  src='./logo.svg' height={50} width={50} alt='logo' />
                <h3>Probehave</h3>
                <h1>Reset Password</h1>

                <div className={Style.description}>Enter the email associated with your account
                    and we’ll send email with instructions to 
                    reset your password.
                </div>

                <form onSubmit={handleSubmit} >
                    
                   <div className={Style.input_container}>
                   <label className={Style.label}>Email Address</label>
                        <input type='email' name='email' placeholder='Email' onChange={handleChange}  />
                        <span>{errorFields.email}</span>
                    </div>
                
                <div className={`${Style.input_container} ${Style.submit}`} >
                    <button type='submit' >Send Link</button>
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

export default ForgotPasswword1