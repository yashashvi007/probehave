import React from "react";
import Style from "./ViewAllTransaction.module.css";
const ViewAllTransaction = () => {
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
              <h3>Transaction</h3>
            </td>
            <td
              width={150}
              scope="col"
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              <h3>Date</h3>
            </td>
            <td
              width={150}
              scope="col"
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              <h3>Loren Ipsum</h3>
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
            <tr className={Style.data} >
              <td style={{ paddingLeft: "20px" }} align="left">
                $12.099983289
              </td>
              <td>12/09/2022</td>
              <td>000138</td>
              <td>...... </td>
            </tr>
            <tr className={Style.data} >
              <td style={{ paddingLeft: "20px" }} align="left">
                $12.099983289
              </td>
              <td>12/09/2022</td>
              <td>000138</td>
              <td>...... </td>
            </tr>
            <tr className={Style.data} >
              <td style={{ paddingLeft: "20px" }} align="left">
                $12.099983289
              </td>
              <td>12/09/2022</td>
              <td>000138</td>
              <td>...... </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllTransaction;
