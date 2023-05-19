import React from 'react'
import Style from "./FailedTransaction.module.css"
const FailedTransaction = () => {
  return (
    <div className={Style.main}>
            <table className={Style.table}>
                <thead>
                    <tr className={Style.heading}>
                        <td width="250px" style={{paddingLeft:"10px"}}>Transaction</td>
                        <td width="240px">Date </td>
                        <td width="250px">Loren Ipsum</td>
                        <td width="150px">Options</td>
                    </tr>
                </thead>
                <tbody>
                <tr className={Style.data}>
                        <td style={{paddingLeft:"10px"}}>$12.099983289</td>
                        <td>12/09/2022</td>
                        <td>000138</td>
                        <td>...... </td>
                    </tr>
                    <tr className={Style.data}>
                        <td style={{paddingLeft:"10px"}}>$12.099983289</td>
                        <td>12/09/2022</td>
                        <td>000138</td>
                        <td>...... </td>
                    </tr>
                    <tr className={Style.data}>
                        <td style={{paddingLeft:"10px"}}>$12.099983289</td>
                        <td>12/09/2022</td>
                        <td>000138</td>
                        <td>...... </td>
                    </tr>
                </tbody>
            </table>
        </div>
  )
}

export default FailedTransaction
