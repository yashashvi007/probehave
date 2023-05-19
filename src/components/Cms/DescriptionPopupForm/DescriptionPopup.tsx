import React, { useEffect, useState } from 'react'
import Style from "./Description.module.css"
import Button from '@/components/Button/Button'


interface Iprops {
    addInput : (message : any)=> void ,
    handleDescriptionClose : ()=> void , 
    edit : boolean ,
    data : any
}


function DescriptionPopup({addInput , handleDescriptionClose , edit , data} : Iprops) {

    const [description , setDescription] = useState('')
    const [disabled , setDisabled] = useState(true)


    useEffect(()=> {
        if(edit){
            setDescription(data)
            setDisabled(false)
        }
    } , [])

    const onSubmitHandler =(e : any)=> {
        e.preventDefault()
        addInput({description : description , type : "description"})
        handleDescriptionClose()
    }

    const onChangeHandler = (e : any)=> {
        setDescription(e.target.value)
        setDisabled(false)
    }

    return (
    <div className={Style.main}>
        <h3>Add Description</h3>
        
        <form onSubmit={onSubmitHandler}>
            <div  className={Style.form}>
                <input  type='text'  placeholder='Enter description'  onChange={onChangeHandler} name='description' value={description}  />
            </div>
            <div className={Style.button}><Button btype={disabled ? 'inActive' : 'create'} type='submit' disable={disabled} onClick={()=> {}} >Done</Button></div>
        </form>
    </div>
    )
}

export default DescriptionPopup