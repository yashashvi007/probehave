import { notify } from './../../components/Toast/Toast';
import { IUserLogin, IUserRegister } from './../../interfaces/IUser';
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS , USER_REGISTER_REQUEST , USER_REGISTER_SUCCESS , USER_REGISTER_FAIL , USER_LOGOUT, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL } from "../constants/userConstants";
import axios from 'axios'
import {Dispatch} from 'redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

interface Iul {
    email : string , 
    password : string
}


export const login = (user : Iul)=>async (dispatch : Dispatch )=>{
 
    try {
        dispatch({type : USER_LOGIN_REQUEST})

        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        
      
        const {data} = await axios.post(`${process.env.API_SERVER_URL}/user/login` ,{ email :user.email , password  :user.password} )
        console.log(data);
        dispatch({
            type : USER_LOGIN_SUCCESS , 
            payload : data
        })

        // notify('success' , 'Successfully logged in' )

        // window.localStorage.setItem('userInfo' , JSON.stringify(data))

        Cookies.set("userInfo" , JSON.stringify(data) , {expires : 7} )
      
    } catch (error : any) {
        console.log(error);
        
        dispatch({
            type : USER_LOGIN_FAIL , 
            payload : error.response && error.response.data.error ? error.response.data.error : error.message
        })

        notify("error" , error?.response?.data?.error)
    }
}


export const logout = ()=> (dispatch : Dispatch)=>{
  
    Cookies.remove("userInfo")
    dispatch({
        type : USER_LOGOUT
    })
}



interface Iur {
    name : string , 
    email : string , 
    password : string ,
    phone_number : string , 
    image : String 
}


export const register = (user :  Iur)=>async (dispatch : Dispatch)=>{
   
    try {
        console.log(user);
        
        dispatch({
            type : USER_REGISTER_REQUEST
        })
        
        const config = {
            mode : 'cors' ,
            headers : {
                'Content-Type' : 'application/json'
            }
        }
  
        const {data} = await axios.post(`${process.env.API_SERVER_URL}/user/create` , {name : user.name , email : user.email , password : user.password ,phone_number : user.phone_number , image : user.image} , config)
      
        dispatch({
            type : USER_REGISTER_SUCCESS ,
            payload : data
        })
  
   
       
    } catch (error : any) {
      
        console.log(error);
      dispatch({
          type : USER_REGISTER_FAIL , 
          payload : error.response && error.response.data.error ? error.response.data.error : error.message
      })

      notify("error" , error.response.data.error)

    }
}



export const getUserDetails = ()=>async (dispatch : Dispatch , getState : any)=>{
    try {
  
        dispatch({
            type : USER_DETAILS_REQUEST
        })

        const { userRegister : {userInfo} } = getState()
        
        const config = {
            headers : {
                'Content-Type' : 'application/json' , 
                Authorization : `Bearer ${userInfo.token}`
            }
        }
  
        const {data} = await axios.get(`${process.env.API_SERVER_URL}/user/fetch-user` , config )
        console.log(data);
        
        dispatch({
            type : USER_DETAILS_SUCCESS ,
            payload : data
        })
  
       
    } catch (error : any) {
      dispatch({
          type : USER_DETAILS_FAIL, 
          payload : error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
}


export const updateUserProfile = (user : any)=>async (dispatch : Dispatch , getState : any)=>{
    try {
  
        dispatch({
            type : USER_UPDATE_PROFILE_REQUEST
        })

        const userInfoCookie = Cookies.get("userInfo");
        const userInfo = userInfoCookie ? JSON.parse(userInfoCookie) : null;

        console.log(userInfo);
        
        const config = {
            headers : {
                'Content-Type' : 'application/json' , 
                Authorization : `Bearer ${userInfo.token}`
            }
        }
  
        const {data} = await axios.patch(`${process.env.API_SERVER_URL}/user/update-user` ,user ,config )
        
        
        dispatch({
            type : USER_UPDATE_PROFILE_SUCCESS ,
            payload : data
        })

        dispatch({
            type : USER_LOGIN_SUCCESS ,
            payload : data
        })


        Cookies.set("userInfo" , JSON.stringify(data))
       
    } catch (error : any) {
      dispatch({
          type : USER_UPDATE_PROFILE_FAIL , 
          payload : error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }