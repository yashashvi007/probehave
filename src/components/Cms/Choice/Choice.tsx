import React, { useEffect } from "react";
import Style from "./Choice.module.css";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Iprops {
  options: any;
  index: any;
  deleteFromFlow: any;
  editInFlow: any;
}

function Choice({ options, index, deleteFromFlow, editInFlow }: Iprops) {
  console.log(options);
  console.log(index);

  const editClick = () => {
    editInFlow(index);
  };

  const onDeleteClick = () => {
    deleteFromFlow(index);
  };

  return (
    <>
      <div className={Style.type}>
        {options.map((option: any, i: any) => (
          <div key={i} className={Style.choices}>
            <textarea
              value={option.choice}
              rows={30}
              cols={30}
              disabled={true}
              className={Style.choice}
            ></textarea>
            <div className={Style.redirect}>
              {option?.redirect_scene_name?.substring(0, 2)}
              {`...`}
            </div>
          </div>
        ))}
        <div className={Style.icons}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#ad90fb", width: "50%" }}
            onClick={editClick}
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
      </div>
    </>
  );
}

export default Choice;
