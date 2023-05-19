import React , {useState} from 'react'
import Style from "./LowerMenuCard.module.css"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface IProps {
    module : any
}

const LowerMenuCard = ({module} : IProps) => {
    console.log(module);
    
    return (
        <div className={Style.lowerMenuCard}>
            <p>{module.title}</p>
            <p>12/09/2023</p>
            <p>000138</p>
            <MoreHorizIcon />
        </div>
    )
}

export default LowerMenuCard;