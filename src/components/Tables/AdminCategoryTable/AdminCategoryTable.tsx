import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Style from "./AdminCategoryTable.module.css";
import axios from "axios";
import moment from "moment";
import TablePhoneMenu from "@/components/Cms/TablePhoneMenu/TablePhoneMenu";


interface category {
  _id: string;
  name: string;
  slugn: string;
}

interface Iprops {
  categories: any;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const AdminCategoryTable = ({
  categories,
  handleEdit,
  handleDelete,
}: Iprops) => {
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
              <h3>Category</h3>
            </td>
            <td
              width={150}
              scope="col"
              style={{ fontSize: "16px", fontWeight: "600", padding: "20px" }}
            >
              <h3>Created AT</h3>
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
          {categories?.map((data: category, i: any) => (
            <tr className={Style.data} key={i}>
              <td style={{ paddingLeft: "20px" }} align="left">
                {data.name}
              </td>
              <td style={{ paddingLeft: "20px" }} align="left">
                {/* {moment(data?.createdAt).format("MMM Do YY")} */}
                30/04/2023
              </td>
              <td>
                <div style={{ display: "flex", gap: "10px" }}>
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
                      current="AdminCategoryTable"
                      updateCategory={() => updateCategory(data._id)}
                      deleteCategory={() => deleteCategory(data._id)}
                      route
                      onEditClick
                      handleModuleDeleteOpen
                      showDeletePopup
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <table className={Style.table}>
        <thead className={Style.tableHeading}>
          <tr>
            <th>
              <h3 style={{ fontSize: "16px", fontWeight: "600" }}>Category</h3>
            </th>
            <th scope="col" style={{ margin: "auto" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600" }}>Options</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((data: category, i: any) => (
            <tr className={Style.data} key={i}>
              <td align="center" width="60%">
                {data.name}
              </td>
              <td align="right" width="20%">
                <div>
                  <ClearIcon
                    onClick={() => deleteCategory(data._id)}
                    sx={{
                      padding: "6px",
                      borderRadius: "5px",
                      color: "#1C6F85",
                      backgroundColor: "rgba(28, 111, 133, 0.25)",
                      width: "40px",
                      height: "40px",
                    }}
                  />
                  <BorderColorIcon
                    onClick={() => updateCategory(data._id)}
                    sx={{
                      color: "#9269FF",
                      padding: "9px",
                      borderRadius: "5px",
                      backgroundColor: "rgba(146, 105, 255, 0.25)",
                      width: "40px",
                      height: "40px",
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default AdminCategoryTable;
