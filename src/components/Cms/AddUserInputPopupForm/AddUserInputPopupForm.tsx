import Button from '@/components/Button/Button'

import React , {useEffect, useState} from 'react'
import Style from './AddUserInputPopupForm.module.css'


import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Iprops {
    addInput : (message : any)=> void ,
    handleUserInputClose : ()=> void , 
    edit : boolean ,
    data : any
}


function AddUserInputPopupForm({addInput , handleUserInputClose , edit , data } : Iprops) {
    console.log(data);
    
    const [message , setMessage] = useState('')
    const [fieldName , setFieldName] = useState('')
    const [disabled , setDisabled] = useState(true)

    useEffect(()=> {
        if(edit){
            setMessage(data.message)
            setFieldName(data.fieldName)
            setDisabled(false)
        }
    } , [])


    const messageChangeHandler = (e : any)=>{
        setMessage(e.target.value)
        setDisabled(e.target.value ? false : true)
    }

    const fieldNameChangeHandler = (e : any) => {
        setFieldName(e.target.value)
    }

    const onSubmitHandler = (e : any)=>{
        e.preventDefault()
        addInput({message , fieldName , type : "input"})
        handleUserInputClose()
    }

  return (
  
        <div className={Style.main}>
            <h3>Add User Input</h3>
            
            <form onSubmit={onSubmitHandler} >
                <div  className={Style.form}>
                    <input  type='text'  placeholder='Enter message'  onChange={messageChangeHandler} name='message' value={message}  />
                    <input  type='text'  placeholder='Enter field name'  onChange={fieldNameChangeHandler} name='fieldName' value={fieldName}  />
                </div>
               
                <div className={Style.button}><Button btype={disabled ? 'inActive' : 'create'} type='submit' disable={disabled} onClick={()=> {}} >Done</Button></div>
            </form>
        </div>
    
  )
}

export default AddUserInputPopupForm