import AdminMenuLinks from "@/components/AdminMenuLinks/AdminMenuLinks";
import React, { useEffect, useState } from "react";
import Style from "./Menu.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Menu = () => {
  const [menuItems, setMenuItems] = useState<any>([]);

  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get("userInfo");
    const user = userCookie ? JSON.parse(userCookie) : null;

    if (user && user.role === "admin") {
      setMenuItems([
        {
          title: "Dashboard",
          imageUrl: "/admin/1.png",
          path: "/admin",
        },
        {
          title: "Category",
          imageUrl: "/admin/2.png",
          path: "/admin/category",
        },
        {
          title: "CMS",
          imageUrl: "/admin/3.png",
          path: "/admin/cms",
        },
        {
          title: "Tag",
          imageUrl: "/admin/4.png",
          path: "/admin/tag",
        },
        {
          title: "Staff",
          imageUrl: "/admin/5.png",
          path: "/admin/staffmgmt",
        },
        {
          title: "Transaction",
          imageUrl: "/admin/6.png",
          path: "/admin/transaction",
        },
      ]);
    } else if (user && user.role === "staff") {
      setMenuItems([
        {
          title: "Category",
          imageUrl: "/admin/2.png",
          path: "/admin/category",
        },
        {
          title: "CMS",
          imageUrl: "/admin/3.png",
          path: "/admin/cms",
        },
        {
          title: "Tag",
          imageUrl: "/admin/4.png",
          path: "/admin/tag",
        },
      ]);
    }
  }, []);

  return (
    <div className={`${Style.main}`}>
      {/* <h3>ProBehave</h3> */}

      {menuItems.map((data: any, index: any) => {
        return (
          <AdminMenuLinks
            key={index}
            title={data.title}
            imageUrl={data.imageUrl}
            path={data.path}
          />
        );
      })}
    </div>
  );
};

export default Menu;
