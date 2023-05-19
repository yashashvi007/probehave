import React , {useState} from 'react'
import Style from "./LowerAbout.module.css"
import MarkunreadIcon from '@mui/icons-material/Markunread';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PhoneIcon from '@mui/icons-material/Phone';
import Button from "@mui/material/Button";


interface IProps {
    onSubmit : any , 
    bio : any , 
    email : any , 
    location : any  , 
    phone_number : any , 
    onLowerChangeHandler : any
}


const LowerAbout = ({onSubmit ,  bio , email , location , phone_number , onLowerChangeHandler } : IProps) => {

    const [state , setState] = useState<any>({
        bio : bio || '' , 
        email : email ||  '' , 
        location : location ||  '' , 
        phone_number : phone_number || '' 
    })


    const onChange =(e : any)=> {
        setState({
            ...state , 
            [e.target.name] : e.target.value
        })
        onLowerChangeHandler(e.target.name , e.target.value )
    }

    return (
        <div className={Style.lowerAbout}>
            <div className={Style.lowerAbout_left}>
                <h3>Bio</h3>
                <textarea name="bio" id="" cols={30} rows={10} value={state.bio} onChange={onChange}  ></textarea>
            </div>
            <div className={Style.lowerAbout_right}>
                <div className={Style.lowerAbout_rightInput}>
                    <MarkunreadIcon className={Style.lowerAbout_rightInput_icons} />
                    <input className={Style.lowerAbout_rightInput_input} type="text" placeholder="email" name="email" value={state.email}    onChange={onChange}  />
                </div>
                <div className={Style.lowerAbout_rightInput}>
                    <FmdGoodIcon className={Style.lowerAbout_rightInput_icons} />
                    <input className={Style.lowerAbout_rightInput_input} type="text" placeholder="location" name="location" value={state.location} onChange={onChange}   />
                </div>
                <div className={Style.lowerAbout_rightInput}>
                    <PhoneIcon className={Style.lowerAbout_rightInput_icons} />
                    <input className={Style.lowerAbout_rightInput_input} type="text" placeholder="mobile number" name="phone_number" value={state.phone_number} onChange={onChange} />
                </div>
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: "#7a9af0",
                        borderRadius: "22px",
                        height: "43px",
                        width: "144px",
                    }}
                    onClick={onSubmit}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    )
}

export default LowerAbout