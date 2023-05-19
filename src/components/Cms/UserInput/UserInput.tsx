import React from "react";
import Style from "./UserInput.module.css";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Iprops {
  message: any;
  fieldName: any;
  index: any;
  deleteFromFlow: any;
  editInFlow: any;
}

function UserInput({
  message,
  fieldName,
  index,
  deleteFromFlow,
  editInFlow,
}: Iprops) {
  const onEditClick = () => {
    editInFlow(index);
  };

  const onDeleteClick = () => {
    deleteFromFlow(index);
  };

  return (
    <>
      <div className={Style.type}>
        <div className={Style.choices}>
          <textarea
            value={message}
            rows={30}
            cols={30}
            disabled={true}
            className={Style.choice}
          ></textarea>
          <input value={fieldName} disabled />
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
      </div>
    </>
  );
}

export default UserInput;
