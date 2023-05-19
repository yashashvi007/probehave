import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const notify = (type:string , message : string)=>{
    if(type === "error"){
        toast.error(`${message}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }else if(type === 'success'){
        toast.success(`${message}` ,{
            position : 'top-center' ,
            autoClose : 5000 , 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }
}