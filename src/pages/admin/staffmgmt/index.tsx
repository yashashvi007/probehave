import Layout from '@/components/Admin/Layout/Layout'
import Button from '@/components/Button/Button';
import React ,{useEffect, useState} from 'react'
import Modal from '@mui/material/Modal';
import AdminAddStaff from '@/components/Cards/AdminAddStaff/AdminAddStaff';
import AdminAddStaffTable from '@/components/Tables/AdminStaffTable/AdminStaffTable';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { ToastContainer, toast } from "react-toastify";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";


const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  p: 4,
  zIndex: 2
};



function StaffMgmt() {

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [staffs , setStaffs] = useState<any[]>([])
    const [stateChanged , setStateChanged] = useState(false)
    const router = useRouter()

    useEffect(()=>{
      if(!Cookies.get("userInfo")){
        router.push('/authentication/login')
      }else if(Cookies.get("userInfo")){
        const userCookie = Cookies.get("userInfo");
        const user = userCookie ? JSON.parse(userCookie) : null;
        
          if(user.role === 'user'){
              router.push('/')
          }
      }
    } ,[router])


    useEffect(()=> {
      const fetchStaffs = async ()=> {
        const {data} = await axios.get(`${process.env.API_SERVER_URL}/user/getStaffs`)
        setStaffs(data.staffs)
      }

      fetchStaffs()
    } , [stateChanged])

    const change = ()=> {
      setStateChanged(!stateChanged)
    }

    
  return (
    <div>
      <Layout>
        <ToastContainer />
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
              <p
                style={{
                  textDecoration: "none",
                  fontSize: "25px",
                  fontWeight: "600",
                  fontStyle: "normal",
                }}
              >
                {router.asPath.split("/")[2]}
              </p>
          </Breadcrumbs>
          <div onClick={handleOpen}>
            <Button btype="create" type="" disable={false} onClick={() => {}}>
              Create Staff +
            </Button>
          </div>
        </div>
        <div style={{ marginTop: "20px", margin: "30px" }}>
          <AdminAddStaffTable change={change} staffs={staffs} />
        </div>

        <Modal open={open} onClose={handleClose}>
          <div style={style}>
            <AdminAddStaff handleClose={handleClose} />
          </div>
        </Modal>
      </Layout>
    </div>
  );
}

export default StaffMgmt