import React , {useState} from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import Button from '../../Button/Button'
import axios from 'axios';
import Style from './AddScenePopupForm.module.css'
import {IState , Iprops} from '../../../interfaces/AddScenePopupForm/AddScenePopupForm'
import { toast } from 'react-toastify';



const AddScenePopup = ({change , handleClose , module_id } : Iprops) => {

    const [state , setState] = useState<IState>({
        scene_name : '', 
        character1 : '' , 
        character2 : ''
    })

    const onChangeHandler = (e : any)=> {
        setState({
            ...state ,
            [e.target.name] : e.target.value
        })
    }
    

    const onSubmitHandler =async (e : any)=>{
        e.preventDefault()
        try {
            console.log(state);
          
            const {data} =  await axios.post(`${process.env.API_SERVER_URL}/scene/createSceneForModule/${module_id}` , {scene_name : state.scene_name , character1 : state.character1 ,character2 : state.character2 })
            console.log(data);
            
            change()
            toast.success("Scene created")
            handleClose()
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className={Style.main}>
           
            <p style={{display:"flex",justifyContent:"flex-end",width:"350px"}}><ClearIcon onClick={handleClose} /></p>
            
            <h3>Scene Information</h3>
            <form onSubmit={onSubmitHandler} >
            
                <div className={Style.form}>
                    <label>Scene Name</label>
                    <input type="text" value={state?.scene_name} name='scene_name' onChange={onChangeHandler} required />
                    <label>Character 1</label>
                    <input type="text" value={state?.character1} name='character1' onChange={onChangeHandler} required />
                    <label>Character 2</label>
                    <input type="text" value={state?.character2} name='character2' onChange={onChangeHandler} required />

                </div>
                <div className={Style.button}>
                    <Button btype='login' type='' disable={false} onClick={()=> {}} >Don&apos;t Save</Button>
                    <Button btype='signup' type='submit' disable={false} onClick={()=> {}} >Save</Button>
                </div>
            </form>
            
        </div>
    )
}

export default AddScenePopup