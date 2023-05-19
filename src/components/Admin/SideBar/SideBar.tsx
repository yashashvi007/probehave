import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Groups2Icon from "@mui/icons-material/Groups2";
import PaidIcon from "@mui/icons-material/Paid";
import Link from "next/link";

const drawerWidth = 240;


const SideBar = () => {

      const [menuItems, setMenuItems] = useState<any>([]);

      useEffect(() => {
        const userCookie = Cookies.get("userInfo");
        const user = userCookie ? JSON.parse(userCookie) : null;

        if (user && user.role === "admin") {
          setMenuItems([
            {
              title: "Dashboard",
              imageIcon: <DashboardIcon />,
              path: "/admin",
            },
            {
              title: "Category",
              imageIcon: <CategoryIcon />,
              path: "/admin/category",
            },
            {
              title: "CMS",
              imageIcon: <ViewModuleIcon />,
              path: "/admin/cms",
            },
            {
              title: "Tag",
              imageIcon: <LocalOfferIcon />,
              path: "/admin/tag",
            },
            {
              title: "Staff",
              imageIcon: <Groups2Icon />,
              path: "/admin/staffmgmt",
            },
            {
              title: "Transaction",
              imageIcon: <PaidIcon />,
              path: "/admin/transaction",
            },
          ]);
        } else if (user && user.role === "staff") {
          setMenuItems([
            {
              title: "Category",
              imageIcon: <CategoryIcon />,
              path: "/admin/category",
            },
            {
              title: "CMS",
              imageIcon: <ViewModuleIcon />,
              path: "/admin/cms",
            },
            {
              title: "Tag",
              imageIcon: <LocalOfferIcon />,
              path: "/admin/tag",
            },
          ]);
        }
      }, []);




  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar>
          <Link href="/" style={{ textDecoration: "none", color: "black" }}>
            <h3 style={{ fontSize: "25px" }}>ProBehave</h3>
          </Link>

          {/* <hr /> */}
        </Toolbar>
        <Divider sx={{ my: 1}} />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map((data: any, index: any) => (
              <Link
                href={data.path}
                style={{ color: "grey", textDecoration: "none" }}
                key={index}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{data.imageIcon}</ListItemIcon>
                    <ListItemText primary={data.title} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default SideBar