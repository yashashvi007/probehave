import Button from '@/components/Button/Button'
import React, { useEffect, useState } from 'react'
import Style from "./AddTextPopupForm.module.css"

interface Iprops {
    char1 : any , 
    char2 : any , 
    addText : (textObj : any)=> void , 
    handleTextClose : ()=> void  , 
    edit : boolean ,
    data : any
}

const AddTextPopupForm = ({char1 , char2 , addText , handleTextClose , edit , data} : Iprops) => {

    

    const [text , setText] = useState('')
    const [sequence , setSequence] = useState('')
    const [sequenceActive , setSequenceActive] = useState<boolean>(false)
    const [disabled , setDisabled] =useState(true)
    

    useEffect(()=> {
        if(edit){
            setText(data.message)
            setSequence(data.character)
        }
    } ,[])

    const handleTextChange = (e : any)=>{
        setText(e.target.value)
        if(sequence !== ''){
            setDisabled(e.target.value.length === 0 ? true : false)
        }
    }

    const onSubmitHandler = (e : any)=>{
        e.preventDefault()
       
        addText({
            text : text, 
            character : sequence ,
            characterName : (sequence === '1' )? char1 : char2 , 
            type : "text"
        })

        handleTextClose()
    }

    const onSequenceClickHandler = (side : any)=> {
        setSequence(side)
        if(text.length !== 0){
            setDisabled(false)
        }
    }

    return (
        <div className={Style.main}>
            <h3>Add Text</h3>
            <form onSubmit={onSubmitHandler} >
                <div  className={Style.form}>
                    <textarea cols={30} rows={6} value={text} name='text' onChange={handleTextChange} ></textarea>
                </div>
                <div style={{display:"flex",paddingTop:"10px"}}>
                    <p onClick={()=> onSequenceClickHandler('1') } className={sequence === '1' ? Style.selectedOutline : Style.outline } >{char1}</p> 
                    <p onClick={()=> onSequenceClickHandler('2') } className={sequence === '2' ? Style.selectedOutline : Style.outline } style={{marginLeft:"15px"}}>{char2}</p> 
                </div>
                <div className={Style.button}> <Button btype={disabled ? 'inActive' : 'create'} type='submit' disable={disabled} onClick={()=> {}} >Done</Button></div>
            </form>
        </div>
    )
}

export default AddTextPopupForm