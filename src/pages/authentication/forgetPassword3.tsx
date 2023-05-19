import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import Style from '../../styles/forgotpassword.module.css'
import { useRouter } from 'next/router'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IUser {
    password: string
}

interface IErrorMessage {
    password: string
}

function ForgotPasswword3() {
    const [fields, setFields] = useState<IUser>({ password: '' })
    const [errorFields, setErrorFields] = useState<IErrorMessage>({ password: '' })

    const router = useRouter()
    
    


    const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            [event.target.name]: event.target.value
        })

        switch (event.target.name) {
            case 'password':
                setErrorFields({
                    ...errorFields,
                    password: event.target.value.length < 5 ? 'Password should be more than 5' : ''
                })
                break;
        }
    }

    const handleSubmit =async (event: any) => {
        event.preventDefault()

        try {
            const {data} = await axios.post(`${process.env.API_SERVER_URL}/user/reset-password` , {newPassword : fields.password , userId : router.query.id , token : router.query.token})
            toast.success("Successfully set" , {
                position : 'top-center'
            })
        } catch (error : any) {
            console.log(error);
            toast.error(error.response.data.error , {
                position : 'top-center'
            })
        }
    }

    return (
        <>
            <div className={Style.forgot_page} >
                <div className={Style.forgot_form} >
                    <ToastContainer/>
                    <Image style={{ marginTop: '50px' }} src='./logo.svg' height={50} width={50} alt='logo' />
                    <h3>Probehave</h3>
                    <h1>Create Password  </h1>

                    <div className={Style.description} style={{ margin: "25px auto" }}>Your new password must be different
                        from previous used passwords.</div>

                    <form onSubmit={handleSubmit} >
                        <div className={Style.input_container} style={{ marginTop: "0px ", marginBottom: "0px" }}>
                            <label className={Style.label}>Password</label>
                            <input type='password' name='password' placeholder='New Passowrd' onChange={handleChange} />
                            <span style={{ marginBottom: "20px" }}>{errorFields.password}</span>
                        </div>
                        <div className={Style.input_container} style={{ marginTop: "0px " }}>
                            <label className={Style.label}>Confirm Password</label>
                            <input type='password' name='password' placeholder='Confirm Password' onChange={handleChange} />
                            <span>{errorFields.password}</span>
                        </div>
                        <div className={`${Style.input_container} ${Style.submit}`} >
                            <button type='submit' >Reset Password</button>
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

export default ForgotPasswword3