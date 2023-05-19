import React from "react";
import Style from "./Text.module.css";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Iprops {
  text: any;
  characterName: any;
  character: any;
  index: any;
  deleteFromFlow: any;
  editInFlow: any;
}

function Text({
  text,
  characterName,
  character,
  index,
  deleteFromFlow,
  editInFlow,
}: Iprops) {
  const onDeleteClick = () => {
    deleteFromFlow(index);
  };

  const onEditClick = () => {
    editInFlow(index);
  };

  return (
    <>
      <div className={Style.type}>
        <div className={Style.choices}>
          <textarea
            value={text}
            className={Style.choice}
            rows={30}
            cols={30}
            disabled={true}
          ></textarea>
          <div className={Style.character}>{characterName}</div>

          {/* <div className={Style.character}>{character}</div> */}
        </div>
        <div className={Style.icons}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#9269ff", width: "50%" }}
            onClick={onEditClick}
          >
            <EditIcon style={{ fontSize: "20px" }} />
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#9269ff", width: "50%" }}
            onClick={onDeleteClick}
          >
            <DeleteForeverIcon style={{ fontSize: "20px" }} />
          </Button>
        </div>
      </div>
    </>
  );
}

export default Text;
