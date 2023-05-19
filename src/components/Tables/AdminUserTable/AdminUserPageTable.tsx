import React from 'react'
import Style from "./AdminUserPageTable.module.css"
const AdminUserPageTable = () => {
    return (
        <div className={Style.main}>
            <table className={Style.table}>
                <thead>
                    <tr className={Style.heading}>
                        <td width="100px" align='center'></td>
                        <td width="148px">Name </td>
                        <td width="298px">Email</td>
                        <td width="248px">Member Since</td>
                        <td width="148px">Options</td>
                    </tr>
                </thead>
                <tbody>
                    <tr className={Style.data}>
                        <td align='center'><input className={Style.checkbox} type="checkbox" /></td>
                        <td>Random</td>
                        <td>random@gmail.com</td>
                        <td>12/03/2022</td>
                        <td>...</td>
                    </tr>
                    <tr className={Style.data}>
                        <td align='center'><input className={Style.checkbox} type="checkbox" /></td>
                        <td>Random</td>
                        <td>random@gmail.com</td>
                        <td>12/03/2022</td>
                        <td>...</td>
                    </tr>
                    <tr className={Style.data}>
                        <td align='center'><input className={Style.checkbox} type="checkbox" /></td>
                        <td>Random</td>
                        <td>random@gmail.com</td>
                        <td>12/03/2022</td>
                        <td>...</td>
                    </tr>
                    <tr className={Style.data}>
                        <td align='center'><input className={Style.checkbox} type="checkbox" /></td>
                        <td>Random</td>
                        <td>random@gmail.com</td>
                        <td>12/03/2022</td>
                        <td>...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AdminUserPageTable
