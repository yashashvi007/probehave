import Button from '@/components/Button/Button'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Style from "./RedirectPopup.module.css"

interface Iprops {
    scenes : any,
    addRedirect : (flowObj : any)=> void, 
    handleClose : ()=> void , 
    edit : any , 
    data : any , 
    scene : any
}

const RedirectPopup = ({scenes , addRedirect , handleClose ,edit = false , data , scene} : Iprops) => {
    console.log(scenes);
    console.log("reidrect" , data);
    
    const [redirect_to , setRedirectTo] = useState('')
    const [initial_scene_id , setInitialSceneId] = useState('')
    const [initial_scene_name , setInitialSceneName] = useState('')

   

    useEffect(()=> {
        if(edit){
            // setRedirectTo(data.redirect_scene_name)
            // setInitialSceneId(data.redirect_to)
            setInitialSceneName(data.redirect_scene_name)
        }
    } , [])

    const onSubmitHandler = async (e : any)=> {
        e.preventDefault()
        // const id = edit ? initial_scene_id : redirect_to

        console.log(redirect_to);

        const {data} = await axios.get(`${process.env.API_SERVER_URL}/scene/getScene/${redirect_to}`)
        console.log(data);
        
        addRedirect({
            type : "redirect" , 
            redirect_to , 
            redirect_scene_name : data.scene.scene_name
        })
        handleClose()
    }

    const onChangeHandler =(e : any)=> {
        console.log('redirect change');
        
        setRedirectTo(e.target.value)
    }

    return (
        <div className={Style.main}>
            <h3>Redirect</h3>
            <form onSubmit={onSubmitHandler} >
            <div className={Style.form}>
                
                <select onChange={onChangeHandler} value={redirect_to} >
                    <option value="" >__select__</option>
                    {scenes.map((curr_scene : any , i : any) => (
                        <option key={i} value={curr_scene.id} disabled={(edit && curr_scene.name === initial_scene_name) || (scene.scene_name === curr_scene.name)} >{curr_scene.name}</option>
                    ))}
                </select>
                </div>
                
                <div className={Style.button}>
                    <Button btype='create' type='submit' disable={false} onClick={()=> {}} >Done</Button>
                </div>
            </form>
         
        </div>
    )
}

export default RedirectPopup