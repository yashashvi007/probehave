import React from 'react'
import Style from "./TransactionAnalysis.module.css"
const TransactionAnalysis = () => {
    return (
        <div className={Style.main}>
            <table className={Style.table}>
                <thead>
                    <tr className={Style.heading}>
                        <td width="200px" style={{ paddingLeft: "10px" }}>Transaction</td>
                        <td width="200px">Date </td>
                        <td width="150px">Loren Ipsum</td>
                        <td width="150px">Loren Ipsum</td>
                        <td width="150px">Options</td>
                    </tr>
                </thead>
                <tbody>
                    <tr className={Style.data}>
                        <td style={{ paddingLeft: "10px" }}>$12.099983289</td>
                        <td>12/09/2022</td>
                        <td style={{color:"rgba(255, 0, 0, 1)"}}>-0.1244</td>
                        <td style={{color:"rgba(6, 170, 90, 1)"}}>+0.1244</td>
                        <td>...... </td>
                    </tr>
                    <tr className={Style.data}>
                        <td style={{ paddingLeft: "10px" }}>$12.099983289</td>
                        <td>12/09/2022</td>
                        <td style={{color:"rgba(255, 0, 0, 1)"}}>-0.1244</td>
                        <td style={{color:"rgba(6, 170, 90, 1)"}}>+0.1244</td>
                        <td>...... </td>
                    </tr>
                    <tr className={Style.data}>
                        <td style={{ paddingLeft: "10px" }}>$12.099983289</td>
                        <td>12/09/2022</td>
                        <td style={{color:"rgba(255, 0, 0, 1)"}}>-0.1244</td>
                        <td style={{color:"rgba(6, 170, 90, 1)"}}>+0.1244</td>
                        <td>...... </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TransactionAnalysis
