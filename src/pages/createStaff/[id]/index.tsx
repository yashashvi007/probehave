import { useRouter } from 'next/router'
import React , {useEffect , useState} from 'react'
import Image from 'next/image'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';



function CreateStaff() {

  
    const router = useRouter()

    console.log(router.query);

    useEffect(()=>{
        if(!Cookies.get("userInfo")){
          router.push('/authentication/login')
        }else if(Cookies.get("userInfo")){
            const userCookie = Cookies.get("userInfo");
            const user = userCookie ? JSON.parse(userCookie) : null;

            if(user.role === 'user'){
                router.push('/')
            }
        }
      } ,[router])

    const [state , setState] = useState({
        name : '', 
        email: '' , 
        phoneNumber : '',
        password : '' , 
        confirmPassword : ''
    })

    useEffect(()=> {

        const fetchStaffToken = async ()=> {
            try {
                const {data} = await axios.get(`${process.env.API_SERVER_URL}/user/getStaffToken/${router.query.id}`)
                console.log(data.staffToken);
                setState({
                    ...state , 
                    name : data.staffToken.name , 
                    email : data.staffToken.email , 
                    phoneNumber : data.staffToken.phoneNumber
                })
            } catch (error) {
                
            }
        }

        if(!router.isReady){
            return
        }
        fetchStaffToken()
    },[router.isReady])

    const handleChange = (e : any)=> {
        setState({
            ...state , 
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit =async (e : any)=> {
        e.preventDefault()
        if(state.password !== state.confirmPassword){
            toast.error("Passwords do not match")
            return
        }

        try {
            const {data} = await axios.post(`${process.env.API_SERVER_URL}/user/setStaffPassword/${router.query.id}` , {state})
            console.log(data);
            toast.success("You are all set to go")
            router.push('/admin')
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
    <div className='register-page' >
         
         <div className='register-form' >
             <ToastContainer/>
         
             <Image style={{marginBottom : '10px'}} src='./logo.svg' height={50} width={50} alt='logo' />
             <h3>Probehave</h3>
             <h1>Please Set Your Password</h1>
             <form onSubmit={handleSubmit} >

                <div className='input-container'>
                     {/* <label htmlFor="email">Email</label> */}
                     <input disabled type='nanme' name='nanme' placeholder='Name' onChange={handleChange} value={state.name} />
                     {/* <span>{errorFields.email}</span> */}
                 </div>

                 <div className='input-container'>
                     {/* <label htmlFor="email">Email</label> */}
                     <input disabled type='email' name='email' placeholder='Email' onChange={handleChange} value={state.email} />
                     {/* <span>{errorFields.email}</span> */}
                 </div>
                 
                <div className='input-container'>
                     {/* <label htmlFor="email">Email</label> */}
                     <input disabled type='phoneNumber' name='phoneNumber' placeholder='Phone Number' onChange={handleChange} value={state.phoneNumber}  />
                     {/* <span>{errorFields.email}</span> */}
                 </div>
            
             <div className='input-container'>
                 {/* <label htmlFor="password">Password</label> */}
                 <input  type='password' name='password' placeholder='password' onChange={handleChange}  value={state.password}  />
                 {/* <span>{errorFields.password}</span> */}
             </div>

             <div className='input-container'>
                 {/* <label htmlFor="password">Password</label> */}
                 <input  type='password' name='confirmPassword' placeholder='confirmPassword' onChange={handleChange} value={state.confirmPassword} />
                 {/* <span>{errorFields.password}</span> */}
             </div>
           
             <div className='input-container submit' >
                 <button type='submit'>Save</button>
             </div>
             
             </form>

             
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

export default CreateStaff