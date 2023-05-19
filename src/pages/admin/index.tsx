import Layout from "@/components/Admin/Layout/Layout";
import React, { useEffect } from "react";
import AdminDashboardCard from "@/components/Cards/AdminDashboardCard/AdminDashboardCard";
import AdminDBTable from "@/components/Tables/AdminDashBoard/AdminDBTable";
import Style from "../../styles/Admin/index.module.css";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";


// import AdminHomePageGraph from '@/components/AdminHomePageGraph/AdminHomePageGraph'

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("userInfo")) {
      router.push("/authentication/login");
    } else if (Cookies.get("userInfo")) {
      const userCookie = Cookies.get("userInfo");
      const user = userCookie ? JSON.parse(userCookie) : null;

      if (user.role === "user") {
        router.push("/");
      }
    }
  }, [router]);

  return (
    <div>
      <Layout>
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "0px 20px",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              style={{ textDecoration: "none" }}
              color="inherit"
              href="/admin"
            >
              <p
                style={{
                  textDecoration: "none",
                  fontSize: "25px",
                  fontWeight: "600",
                  fontStyle: "normal",
                }}
              >
                {router.asPath.split("/")[1]}
              </p>
            </Link>
          </Breadcrumbs>
        </div>
        <>
          <div className={Style.table}>
            <AdminDBTable />
          </div>
        </>
      </Layout>
    </div>
  );
};

export default Dashboard;
