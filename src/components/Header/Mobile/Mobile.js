import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import Style from "./Mobile.module.css";
import Image from "next/image";

const SidebarMenu = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const goToSeciton = () => {
    setIsChecked(false);
  };
  return (
    <>
      <div className={Style.mobile_menu}>
        <Link href="/" onClick={goToSeciton}>
          <Image className={Style.logo} width={60} height={60} src="/logo.svg" alt="nn" />
        </Link>

        <div className={Style.right}>
          {!isChecked && (
            <label
              className={Style.button}
              style={{ width: "40px", marginLeft: "10px" }}
            >
              <MenuRoundedIcon />
              <input
                type="checkbox"
                onChange={handleChange}
                checked={isChecked}
                hidden
              />
            </label>
          )}
          {isChecked && (
            <label
              className={Style.button}
              style={{ width: "40px", marginLeft: "10px" }}
            >
              <CloseIcon />
              <input
                type="checkbox"
                onChange={handleChange}
                checked={isChecked}
                hidden
              />
            </label>
          )}
        </div>
      </div>
      <div
        className={`${Style.main} ${isChecked ? Style.active_Nav : Style.deactive_Nav
          } `}
      >
        <div className={Style.container}>
          <Link className={Style.link} href={`/`} onClick={goToSeciton}>
            HOME
          </Link>
          <Link
            className={Style.link}
            href={`/aboutus`}
            onClick={goToSeciton}
          >
            ABOUTUS
          </Link>
          <Link
            className={Style.link}
            href={`/profile`}
            onClick={goToSeciton}
          >
            PROFLIE
          </Link>
          <Link
            className={Style.link}
            href={`/#contact`}
            onClick={goToSeciton}
          >
            CONTACT
          </Link>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
