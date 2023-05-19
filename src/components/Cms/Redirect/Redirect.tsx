import React from "react";
import Style from "./Redirect.module.css";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Iprops {
  redirect_to: any;
  index: any;
  deleteFromFlow: any;
  editInFlow: any;
}

function Redirect({ redirect_to, index, deleteFromFlow, editInFlow }: Iprops) {
  console.log(redirect_to);

  const onEditClick = () => {
    editInFlow(index);
  };

  const onDeleteClick = () => {
    deleteFromFlow(index);
  };

  return (
    <div className={Style.type}>
      <div className={Style.redirect}>{redirect_to}</div>
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
    </div>
  );
}

export default Redirect;
