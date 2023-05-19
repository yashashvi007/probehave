import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Style from "./AdminStaffTable.module.css";
import axios from "axios";
import Button from "@/components/Button/Button";
import Modal from "@mui/material/Modal";
import DeletePopup from "@/components/Cms/DeletePopup/DeletePopup";
import TablePhoneMenu from "@/components/Cms/TablePhoneMenu/TablePhoneMenu";




const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  p: 4,
  zIndex: 2,
};

interface staff {
  _id: string;
  name: string;
  email: string;
}

interface Iprops {
  change: any;
  staffs: staff[] | null;
}

// handleEdit : (id : string) => void , , handleEdit

const AdminAddStaffTable = ({ change, staffs }: Iprops) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setId] = useState<any>();
  // const updateCategory = (id:string)=>{
  //     handleEdit(id)
  // }

  const handleDeletePopupYes = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.API_SERVER_URL}/user/deleteStaff/${id}`
      );
      handleClose();
      change();
    } catch (error) {}
  };

  const handleDeletePopupNo = () => {
    handleClose();
  };

  const deleteStaff = () => {};

  const showDeletePopup = (id: any) => {
    setId(id);
    handleOpen();
  };

  return (
    <div className={Style.main}>
      <table className={Style.table}>
        <thead className={Style.tableHeading}>
          <tr>
            <td
              width={150}
              scope="col"
              style={{ fontSize: "16px", fontWeight: "600", padding: "20px" }}
            >
              <h3>Name</h3>
            </td>
            <td
              width={150}
              scope="col"
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              <h3>Email</h3>
            </td>
            <td
              width={150}
              scope="col"
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              <h3>Created At</h3>
            </td>
            <td
              width={150}
              scope="col"
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              <h3>Options</h3>
            </td>
          </tr>
        </thead>
        <tbody>
          {staffs?.map((data: any, i: any) => (
            <tr className={Style.data} key={i}>
              <td style={{ paddingLeft: "20px" }} align="left">
                {data.name}
              </td>
              <td>{data.email}</td>
              <td>25/02/2023</td>
              <td>
                <div className={Style.hide}>
                  <Button
                    btype="deleteStaff"
                    onClick={() => showDeletePopup(data._id)}
                    disable={false}
                    type=""
                  >
                    Remove
                  </Button>
                </div>
                <div className={Style.TablePhoneMenu}>
                  <TablePhoneMenu
                    current="AdminStaffTable"
                    updateCategory
                    deleteCategory
                    route
                    onEditClick
                    handleModuleDeleteOpen
                    showDeletePopup={() => showDeletePopup(data._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={open} onClose={handleClose}>
        <div style={style}>
          <DeletePopup
            handleClose={handleClose}
            handleDeleteYes={handleDeletePopupYes}
            handleDeleteNo={handleDeletePopupNo}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AdminAddStaffTable;
