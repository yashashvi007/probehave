import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import Style from '../../styles/forgotpassword.module.css'


function ForgotPasswword2() {

    const handleSubmit =  (event : any)=>{
        
    }

  return (
    <>
       <div className={Style.forgot_page} >
            <div className={Style.forgot_form} >
                <Image style={{marginTop : '50px'}}  src='./logo.svg' height={50} width={50} alt='logo' />
                <h3>Probehave</h3>
                <h1>Reset Password</h1>
                <Image style={{marginTop : '20px'}}  src='/admin/forgot2.png' height={100} width={100} alt='logo' />

                <div className={Style.description}>We have send a password recover
instruction to your email</div>

                <form onSubmit={handleSubmit} >
                    
                
              
                
                </form>
               
                <div className={Style.description} style={{textAlign:"center",marginTop:"80px"}} >Did not receive the email? Check your spam filte,
or try another email address</div>
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

export default ForgotPasswword2