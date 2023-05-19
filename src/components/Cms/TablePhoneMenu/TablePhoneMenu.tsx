import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClearIcon from "@mui/icons-material/Clear";
import StartIcon from "@mui/icons-material/Start";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Button from "@/components/Button/Button";






const ITEM_HEIGHT = 48;

interface Iprops {
  handleModuleDeleteOpen: any;
  onEditClick: any;
  route: any;
  deleteCategory: any;
  updateCategory: any;
  current: any;
  showDeletePopup: any;
}

export default function LongMenu( { handleModuleDeleteOpen, onEditClick, route, deleteCategory, updateCategory,showDeletePopup, current } : Iprops ) {
    const [anchorEl, setAnchorEl] = React.useState < null | HTMLElement > (null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    
    return (
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
              display: "flex",
              justifyContent: "center",
            },
          }}
        >
          {current === "ModuleTable" ? (
            <div style={{ display: "flex", gap: "10px" }}>
              <ClearIcon
                sx={{
                  padding: "6px",
                  borderRadius: "5px",
                  color: "#1C6F85",
                  backgroundColor: "rgba(28, 111, 133, 0.25)",
                  width: "35px",
                  height: "35px",
                }}
                onClick={handleModuleDeleteOpen}
              />
              <BorderColorIcon
                onClick={onEditClick}
                sx={{
                  padding: "6px",
                  borderRadius: "5px",
                  color: "#1C6F85",
                  backgroundColor: "rgba(28, 111, 133, 0.25)",
                  width: "35px",
                  height: "35px",
                }}
              />
              <StartIcon
                onClick={route}
                sx={{
                  color: "#9269FF",
                  padding: "4px",
                  borderRadius: "5px",
                  backgroundColor: "rgba(146, 105, 255, 0.25)",
                  width: "35px",
                  height: "35px",
                }}
              />
            </div>
          ) : current === "AdminCategoryTable" ? (
            <div style={{ display: "flex", gap: "10px" }}>
              <ClearIcon
                onClick={deleteCategory}
                sx={{
                  padding: "6px",
                  borderRadius: "5px",
                  color: "#1C6F85",
                  backgroundColor: "rgba(28, 111, 133, 0.25)",
                  width: "35px",
                  height: "35px",
                }}
              />
              <BorderColorIcon
                onClick={updateCategory}
                sx={{
                  color: "#9269FF",
                  padding: "4px",
                  borderRadius: "5px",
                  backgroundColor: "rgba(146, 105, 255, 0.25)",
                  width: "35px",
                  height: "35px",
                }}
              />
            </div>
          ) : current === "AdminStaffTable" ? (
            <div className="">
              <Button
                btype="deleteStaff"
                onClick={showDeletePopup}
                disable={false}
                type=""
              >
                Remove
              </Button>
            </div>
          ) : current === "AdminTagTable" ? (
            <div style={{ display: "flex", gap: "10px" }}>
              <ClearIcon
                onClick={deleteCategory}
                sx={{
                  padding: "6px",
                  borderRadius: "5px",
                  color: "#1C6F85",
                  backgroundColor: "rgba(28, 111, 133, 0.25)",
                  width: "35px",
                  height: "35px",
                }}
              />
              <BorderColorIcon
                onClick={updateCategory}
                sx={{
                  color: "#9269FF",
                  padding: "4px",
                  borderRadius: "5px",
                  backgroundColor: "rgba(146, 105, 255, 0.25)",
                  width: "35px",
                  height: "35px",
                }}
              />
            </div>
          ) : (
            ""
          )}
        </Menu>
      </div>
    );
}