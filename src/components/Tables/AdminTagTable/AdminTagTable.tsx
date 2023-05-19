import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Style from "./AdminTagTable.module.css";
import axios from "axios";
import TablePhoneMenu from "@/components/Cms/TablePhoneMenu/TablePhoneMenu";


interface tag {
  _id: string;
  name: string;
}

interface Iprops {
  tags: any;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const AdminTagTable = ({ tags, handleEdit, handleDelete }: Iprops) => {
  const updateCategory = (id: string) => {
    handleEdit(id);
  };

  const deleteCategory = (id: string) => {
    handleDelete(id);
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
              <h3>Tag Name</h3>
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
          {tags?.map((data: tag, i: any) => (
            <tr className={Style.data} key={i}>
              <td style={{ paddingLeft: "20px" }} align="left">
                {data.name}
              </td>
              <td>
                <div className={Style.hide}>
                  <ClearIcon
                    onClick={() => deleteCategory(data._id)}
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
                    onClick={() => updateCategory(data._id)}
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
                <div className={Style.TablePhoneMenu}>
                  <TablePhoneMenu
                    current="AdminTagTable"
                    updateCategory={() => updateCategory(data._id)}
                    deleteCategory={() => deleteCategory(data._id)}
                    route
                    onEditClick
                    handleModuleDeleteOpen
                    showDeletePopup
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTagTable;
