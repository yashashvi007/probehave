import React from "react";
import styles from "./Navbar.module.css";

import Link from "next/link";
import Image from "next/image";

function AdminNavBar() {
  return (
    <div className={`${styles.main}`}>
      <Link href="/">
        <Image src="/logo.svg" alt="img" height={100} width={100} />
      </Link>
    </div>
  );
}

export default AdminNavBar;
