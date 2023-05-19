import  Cookies  from 'js-cookie';
import { userLoginReducer, userRegisterReducer , userDetailsReducer ,userUpdateProfileReducer } from './reducers/userReducer';
import { legacy_createStore as createStore , compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'
import { configureStore } from '@reduxjs/toolkit'



// const store = configureStore({
//   reducer: {
//     userLogin : userLoginReducer , 
//     userRegister : userRegisterReducer
//   }
// })

const reducer = combineReducers({
  userLogin : userLoginReducer , 
  userRegister : userRegisterReducer , 
  userDetails : userDetailsReducer , 
  userUpdateProfile : userUpdateProfileReducer, 
})

declare const window: typeof globalThis & {
  localStorage: Storage;
};

// const myValue = window.localStorage.getItem('userInfo');

// Parse a JSON string from localStorage
let userInfoFromStorage : any= null;
// if(process.browser){
  
// userInfoFromStorage = JSON.parse(
//     Cookies.get("userInfo")
// );
// }

// console.log(userInfoFromStorage);

// const x= window.localStorage.getItem('userInfo')

// const userInfoFromStorage  = x ? JSON.parse(x) : null
// // const userOrdersInfo = localStorage.get('orders') ? JSON.parse(localStorage.getItem('orders')) : null
// console.log(userInfoFromStorage);


const initialState = {
   userLogin : {userInfo : userInfoFromStorage}   , 
   userRegister : {userInfo : userInfoFromStorage} , 
  //  userOrders : {orders : userOrdersInfo}  
}



const middleware = [thunk]

// @ts-ignore is working
const store = createStore(reducer , initialState , composeWithDevTools(applyMiddleware(...middleware)))



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export default store