import React from "react";
import Menu from "../Menu/Menu";
import AdminNavBar from "../Navbar/Navbar";
import LayoutStyle from "./Layout.module.css";
import DropDownMenu from '../DropdownMenu/DropDownMenu'
import Link from "next/link";
import SideBar from "../SideBar/SideBar"
import Divider from "@mui/material/Divider";


interface Iprops {
  children: any;
}

const Layout = ({ children }: Iprops) => {
  return (
    <>
      <div className={`${LayoutStyle.navBar}`}>
        <DropDownMenu />
      </div>
      <div className={` ${LayoutStyle.main}`}>
        <div className={`${LayoutStyle.menu}`}>
          {/* <Menu /> */}
          <SideBar />
        </div>
        <div className={`${LayoutStyle.container}`}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
