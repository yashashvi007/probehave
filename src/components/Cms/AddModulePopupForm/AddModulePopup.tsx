import React , {useEffect, useState} from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import Button from '../../Button/Button'
import Style from "./AddModulePopup.module.css"
import Select from 'react-select';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {IState , Iprops , category , tag} from '../../../interfaces/AddModulePopupForm/AddModulePopupForm'
import { uploadToS3 } from '@/utils/uploadToS3';
import index from '@/pages/admin/transaction';





const AddModulePopup = ({id , userInfo ,  changeState ,handleClose ,categories , tags , editData} : Iprops ) => {
    console.log(userInfo);

    const [state , setState] = useState<IState>({
        title : '',
        sub_heading : '',
        module_image : ''  , 
        description : '',
        detailDescription : '',
        language : '' , 
        price : 0 , 
        char1Image : '' , 
        char2Image : ''
    })

    const onDescriptionChangeHandler = (e : any)=> {
        const value = e.target.value 
        if(value.length > 250){
            return;
        }
        setState({
            ...state , 
            description : e.target.value 
        })
    }

    const onDetailDescriptionChangeHandler = (e : any)=> {
        const value = e.target.value 
        if(value.length > 1000){
            return;
        }
        setState({
            ...state , 
            detailDescription : e.target.value 
        })
    }

    const [isActive , setIsActive] = useState(true)

    const [wyl_points , setWylPoints] = useState([{point : ''}])

    const [selectedcatOptions, setSelectedcatOptions] = useState<any>([]);
    const [selectedtagOptions, setSelectedtagOptions] = useState<any>([]);

    useEffect(()=> {
        if(editData){
            console.log(editData);
            setState({
                title : editData.title , 
                sub_heading : editData.sub_heading , 
                description : editData.description , 
                detailDescription : editData.detailDescription , 
                price : editData.price , 
                language : editData.language , 
                module_image : editData.image , 
                char1Image : editData.char1Image , 
                char2Image : editData.char2Image
            })

            setWylPoints(editData.what_you_learn)
            setIsActive(editData.isActive)

            let cats : any = []
            for(var i = 0 ; i< editData.categories.length ; i++){
               let cat = categories.find((x : any) => x._id === editData.categories[i]._id)
               console.log(`cat ${i}` ,cat);
               cats = [...cats , cat]
            }
            cats = cats.map((cat: any) => {return {value : cat?._id  , label : cat?.name}})
            setSelectedcatOptions(cats)

            let tgs : any = []
            for(var i = 0 ; i< editData.tags.length ; i++){
               let tag = tags.find((x : any) => x._id === editData.tags[i]._id)
               console.log(`tag ${i}` ,tag);
               tgs = [...tgs , tag]
            }
            tgs = tgs.map((cat : any) => {return {value : cat?._id  , label : cat?.name}})
            setSelectedtagOptions(tgs)
        }
    } ,[])


    const catoptions = categories.map((category : category ) => {
        return {
            value : `${category._id}`, 
            label : `${category.name}`
        }
    })

    const tagoptions = tags.map((tag : tag ) => {
        return {
            value : `${tag._id}`, 
            label : `${tag.name}`
        }
    })
      
    

    const handlecatSelect = (selectedOptions : any) => {
        setSelectedcatOptions(selectedOptions);
    };

    const handletagSelect = (selectedOptions : any) => {
        setSelectedtagOptions(selectedOptions);
    };
      
    
    const onChangeHandler = (e : React.ChangeEvent<HTMLInputElement> |  React.ChangeEvent<HTMLTextAreaElement>)=>{
        setState({
            ...state ,
            [e.target.name] : e.target.value
        })
    }

    const onImageChangeHandler =async (e : any) => {
        const value = e.target.files[0]
        const url =await uploadToS3(value)
        
        setState({
            ...state , 
            module_image : url
        })
    }

    const char1ImageHandler =async (e : any)=> {
        const value = e.target.files[0]
        const url = await uploadToS3(value)

        setState({
            ...state , 
            char1Image : url
        })
    }

    const char2ImageHandler =async (e : any)=> {
        const value = e.target.files[0]
        const url = await uploadToS3(value)

        setState({
            ...state , 
            char2Image : url
        })
    }
  

    const submitHandler =async (e : React.SyntheticEvent<HTMLFormElement>)=>{
        e.preventDefault()

        console.log(selectedcatOptions);
        

        let catarray = [selectedcatOptions.value]

        let tagarray = selectedtagOptions.map((x: any) => {
            return x.value
        })

        if(editData){
           
            try {
                await axios.patch(`${process.env.API_SERVER_URL}/module/${id}` , 
                    {
                        ...state,
                        what_you_learn : wyl_points ,
                        image : state.module_image  ,
                        categories : catarray , 
                        tags : tagarray , 
                        isActive : isActive , 
                        char1Image : state.char1Image , 
                        char2Image : state.char2Image
                    }
                )

            } catch (error) {
                
            }

            handleClose()
            changeState()

            return
        }
       
      
        console.log(wyl_points);
            
        try {
            //config to add 
            const res = await axios.post(`${process.env.API_SERVER_URL}/module` , 
                {
                    ...state,
                    what_you_learn : wyl_points ,
                    image : state.module_image ,
                    categories : catarray , 
                    tags : tagarray , 
                    isActive : isActive , 
                    created_by : userInfo.name ,
                    char1Image : state.char1Image , 
                    char2Image : state.char2Image
                }
            )
            
            handleClose()
            changeState()
            
        } catch (error : any) {
            toast.error(error.response.data.error, {
                position: toast.POSITION.TOP_CENTER
              });
        }
    }

    const what_you_learn_handler = (e : any )=> {
        e.preventDefault()
        setWylPoints([...wyl_points , {point : ''} ])
    }

    const what_you_learn_change_handler =(index : any) => (e : any ) => {
        console.log(e.target);
        const {name , value} = e.target
        setWylPoints(wyl_points.map((p : any , pi : any)=> {
            if(index !== pi){
                return p;
            }
            return {
                ...p , 
                [name] : value
            }
        }))
    }


    const onActiveChangeHandler = (e : any) => {
        setIsActive(!isActive)
    }

    return (
        <div className={Style.main}>
           
            <p style={{display:"flex",justifyContent:"flex-end",width:"350px"}}><ClearIcon onClick={() => handleClose() } /></p>
            
            <h3>Input Information</h3>
            <form onSubmit={submitHandler} >
            
                <div className={Style.form}>
                    <label>Title</label>
                    <input type="text" value={state?.title} name='title' onChange={onChangeHandler} />
                    <label>Sub Heading</label>
                    <input type="text" value={state?.sub_heading} name='sub_heading' onChange={onChangeHandler} />
                    <label>What you learn</label>
                    {wyl_points.map((x : any , i : any)=> (
                        <input key={i} type="text" value={wyl_points[i].point} name='point' onChange={what_you_learn_change_handler(i)} />
                    ))}
                    <Button type='' btype='login' disable={false} onClick={(e : any)=> what_you_learn_handler(e)} >Add more</Button>

                    <label>Description <span>{250 - state.description.length}/250</span></label>
                    <textarea className={Style.textarea} value={state?.description} name="description" onChange={onDescriptionChangeHandler} id="" cols={30} rows={2}></textarea>

                    <label>Detail Description <span>{1000 - state.detailDescription.length}/1000</span></label>
                    <textarea className={Style.textarea} value={state?.detailDescription} name="detailDescription" onChange={onDetailDescriptionChangeHandler} id="" cols={30} rows={5}></textarea>

                    <label>Language</label>
                    <input type="text" value={state?.language} name='language' onChange={onChangeHandler} />

                    <label>Price</label>
                    <input type="number" value={state?.price} name='price' onChange={onChangeHandler} />
                    <label>Category</label>
                    <Select
                        options={catoptions}
                        value={selectedcatOptions}
                        onChange={handlecatSelect}
                        />

                    <label>Tags</label>
                    <Select
                        options={tagoptions}
                        isMulti
                        value={selectedtagOptions}
                        onChange={handletagSelect}
                        />

                    <label>Image</label>
                    <input type='file' name='module_image' onChange={onImageChangeHandler} />

                    <label>Char 1 Image</label>
                    <input type='file' name='char1Image' onChange={char1ImageHandler} />

                    <label>Char 2 Image</label>
                    <input type='file' name='char2Image' onChange={char2ImageHandler} />
                  
                    <label>SetActive</label>
                    <input  type='checkbox' checked={isActive  ? true : false} name='isActive' value={isActive ? "true" : "false"} onChange={onActiveChangeHandler} />
                
                </div>
                <div className={Style.button}>
                    <Button btype='login' type='' disable={false} onClick={()=> {}} >Don&apos;t Save</Button>
                    <Button btype='signup' type='submit' disable={false} onClick={()=> {}} >Save</Button>
                </div>
            </form>
            
        </div>
    )
}

export default AddModulePopup



