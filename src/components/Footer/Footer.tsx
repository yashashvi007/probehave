import React from "react";
import Style from "./Footer.module.css";

function Footer() {
  return (
    <footer className={Style.footer}>
      <ul className={Style.footerUi}>
        <li>About</li>
        <li>Downloap App</li>
        <li>Modules</li>
        <li>Testimonials</li>
        <li>FAQ</li>
      </ul>
      <div className={Style.footerBottom}>
        <div className={Style.footerLine}></div>
        <span style={{ fontFamily: "DM Sans" }}>
          © All rights reserved. Probehave 2023
        </span>
      </div>
    </footer>
  );
}

export default Footer;
