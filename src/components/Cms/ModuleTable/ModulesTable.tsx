import React, { useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Style from "./ModulesTable.module.css";
import StartIcon from "@mui/icons-material/Start";
import { useRouter } from "next/router";
import DeletePopup from "../DeletePopup/DeletePopup";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import moment from "moment";
import TablePhoneMenu from "@/components/Cms/TablePhoneMenu/TablePhoneMenu"

interface Iprops {
  modules: any;
  onEdit: any;
  change: any;
}

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

const ModulesTable = ({ modules, onEdit, change }: Iprops) => {
  const [openModuleDelete, setOpenModuleDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleModuleDeleteOpen = (id: any) => {
    setOpenModuleDelete(true);
    setDeleteId(id);
  };
  const handleModuleClose = () => setOpenModuleDelete(false);

  const router = useRouter();

  const onEditClick = (id: string) => {
    onEdit(id);
  };

  const onDeleteClick = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.API_SERVER_URL}/module/${deleteId}`
      );
      change("deleted");
      handleModuleClose();
    } catch (error) {}
  };

  const handleDeletePopupNo = () => {};

  const handleActive = (e: any) => {
    setIsActive(!isActive);
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
              <h3>Module Name</h3>
            </td>
            <td
              width={150}
              scope="col"
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              <h3>Created By</h3>
            </td>
            <td
              width={150}
              scope="col"
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              <h3>Created At</h3>
            </td>
            <td
              width={100}
              scope="col"
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              <h3>Options</h3>
            </td>
          </tr>
        </thead>
        <tbody>
          {modules?.map((module: any, i: any) => (
            <tr className={Style.data} key={i}>
              <td style={{ paddingLeft: "20px" }} align="left">
                <p>{module.title}</p>
              </td>
              <td>
                <p>{module?.created_by}</p>
              </td>
              <td>
                <p>{moment(module?.createdAt).format("MMM Do YY")}</p>
              </td>
              <td>
                <div className={Style.hide}>

                  <div className={Style.hoverCross} >
                    <ClearIcon
                      sx={{
                        padding: "6px",
                        borderRadius: "5px",
                        color: "#1C6F85",
                        backgroundColor: "rgba(28, 111, 133, 0.25)",
                        width: "35px",
                        height: "35px",
                      }}
                      onClick={() => handleModuleDeleteOpen(module._id)}
                    />  
                  </div> 
                  

                  <div className={Style.hoverEdit} >
                    <BorderColorIcon
                      onClick={() => onEditClick(module._id)}
                      sx={{
                        padding: "6px",
                        borderRadius: "5px",
                        color: "#1C6F85",
                        backgroundColor: "rgba(28, 111, 133, 0.25)",
                        width: "35px",
                        height: "35px",
                      }}
                    />
                  </div>
                 
                  <div className={Style.hoverCreate} >
                    <StartIcon
                      onClick={() =>
                        router.push(`/admin/cms/moduleScenes/${module._id}`)
                      }
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
                </div>
                <div className={Style.TablePhoneMenu}>
                  <TablePhoneMenu
                    current="ModuleTable"
                    handleModuleDeleteOpen={() =>
                      handleModuleDeleteOpen(module._id)
                    }
                    onEditClick={() => onEditClick(module._id)}
                    route={() =>
                      router.push(`/admin/cms/moduleScenes/${module._id}`)
                    }
                    deleteCategory
                    updateCategory
                    showDeletePopup
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={openModuleDelete} onClose={handleModuleClose}>
        <div style={style}>
          <DeletePopup
            handleClose={handleModuleClose}
            handleDeleteYes={onDeleteClick}
            handleDeleteNo={handleDeletePopupNo}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ModulesTable;
