import React from 'react'
import Style from './DescriptionCard.module.css'
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Iprops {
    description : any , 
    index : any , 
    deleteFromFlow : any , 
    editInFlow : any
}

function Description({description  , index , deleteFromFlow , editInFlow} : Iprops) {

  const onEditClick = ()=> {
    console.log(index);
    editInFlow(index)
  }

  const onDeleteClick =()=> {
    deleteFromFlow(index)
  }

  return (
    <>
      <div className={Style.type}>
        <div className={Style.choices}>
          <textarea
            value={description}
            rows={3}
            cols={30}
            disabled={true}
            className={Style.choice}
          ></textarea>
        </div>
      </div>
      <div className={Style.icons}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#ad90fb", width: "50%" }}
          onClick={onEditClick}
        >
          <EditIcon style={{ fontSize: "20px" }} />
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#ad90fb", width: "50%" }}
          onClick={onDeleteClick}
        >
          <DeleteForeverIcon style={{ fontSize: "20px" }} />
        </Button>
      </div>
    </>
  );
}

export default Description