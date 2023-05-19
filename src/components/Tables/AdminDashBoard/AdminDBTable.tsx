import React from "react";
import Style from "./AdminDBTable.module.css";

interface Tprops {
  tracker: string;
}

const Tracker = ({ tracker }: Tprops) => {
  const colorfunction = (status: string) => {
    if (status === "Completed") return true;
    else return false;
  };

  const statuscolor = {
    backgroundColor: colorfunction(tracker)
      ? "rgba(31, 115, 140, 0.268);"
      : "rgba(152, 118, 255, 0.347)",
    color: colorfunction(tracker) ? "#1F738C" : "#9876FF;",
    // opacity:0.4
  };

  return (
    <div className={Style.tracker} style={statuscolor}>
      {tracker}
    </div>
  );
};
const AdminDBTable = () => {
  return (
    <>
      <div className={Style.main}>
        <table className={Style.table}>
          <thead>
            <tr className={Style.subheadings}>
              <td width="150px" style={{ paddingLeft: "20px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600" }}>
                  ID Order
                </h3>
              </td>
              <td width="150px">
                <h3 style={{ fontSize: "16px", fontWeight: "600" }}>Name</h3>
              </td>
              <td width="150px">
                <h3 style={{ fontSize: "16px", fontWeight: "600" }}>Product</h3>
              </td>
              <td width="150px">
                <h3 style={{ fontSize: "16px", fontWeight: "600" }}>Date</h3>
              </td>
              <td width="150px">
                <h3 style={{ fontSize: "16px", fontWeight: "600" }}>
                  Tracking
                </h3>
              </td>
              <td width="150px">
                <h3 style={{ fontSize: "16px", fontWeight: "600" }}>Pricing</h3>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className={Style.data}>
              <td style={{ paddingLeft: "20px" }}>123456</td>
              <td>ABC</td>
              <td>Sigma</td>
              <td>19-01-2018</td>
              <td>
                <Tracker tracker="Completed"  />
              </td>
              <td>$2000</td>
            </tr>
            <tr className={Style.data}>
              <td style={{ paddingLeft: "20px" }}>123456</td>
              <td>ABC</td>
              <td>Sigma</td>
              <td>19-01-2018</td>
              <td>
                <Tracker tracker="Pending" />
              </td>
              <td>$2000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDBTable;
