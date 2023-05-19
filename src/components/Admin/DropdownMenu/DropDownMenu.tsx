import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Avatar from "@mui/material/Avatar";
import Link from 'next/link';
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Groups2Icon from "@mui/icons-material/Groups2";
import PaidIcon from "@mui/icons-material/Paid";
import Style from "./DropDownMenu.module.css"
import { useRouter } from 'next/router';
import { logout } from '@/redux/actions/userActions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';


const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));


export default function CustomizedMenus() {
    const [anchorEl, setAnchorEl] = React.useState < null | HTMLElement > (null);
    const open = Boolean(anchorEl);
    const [name , setName] =useState('')
    const router = useRouter()
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



      const [menuItems, setMenuItems] = useState<any>([]);

      const userLogin = useAppSelector((state) => state.userLogin);
      const { userInfo, loading, error }: any = userLogin;

      useEffect(()=>{
        if(!Cookies.get("userInfo")){
          router.push('/authentication/login')
        }
      } ,[router , userInfo])

useEffect(() => {
  const userCookie = Cookies.get("userInfo");
  const user = userCookie ? JSON.parse(userCookie) : null;
 
   
  if (user && user.role === "admin") {
    setName(user.name)
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
    setName(user.name)
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

const dispatch = useAppDispatch();
    const logoutClick = ()=> {
      // @ts-ignore is working
      dispatch(logout())
    }



    return (
      <div >
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          

          className={Style.dropDownMenu_btn}
        >
          <Avatar
            sx={{
              bgcolor: "purple",
              fontSize: "12px",
              padding: "5px",
              height: "30px",
              width: "30px",
            }}
          >
          {name[0]}
          </Avatar>{" "}
          {name}
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          style={{marginLeft:'0px'}}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                color: "grey",
              }}
            >
              <HomeIcon /> Home
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <Link
              href="/profile"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                color: "grey",
              }}
            >
              <PersonIcon /> Profile
            </Link>
          </MenuItem>
          {/* -------------------  divider ---------------------- */}
          <div className={Style.dropDownMenu_responsiveMenu}>
            <Divider sx={{ my: 0.5 }} />
            {menuItems.map((data: any, id: any) => {
              return (
                <MenuItem onClick={handleClose} disableRipple key={id}>
                  <Link
                    href={data.path}
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      color: "grey",
                    }}
                  >
                    {data.imageIcon} {data.title}
                  </Link>
                </MenuItem>
              );
            })}

            <Divider sx={{ my: 0.5 }} />
          </div>
          {/* -------------------  divider ---------------------- */}
          <MenuItem onClick={()=> logoutClick()} disableRipple>
            {/* <Link
              href="/profile"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                color: "grey",
              }}
            > */}
              <LogoutIcon /> Logout
            {/* </Link> */}
          </MenuItem>
        </StyledMenu>
      </div>
    );
}