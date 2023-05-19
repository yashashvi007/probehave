import React , {useEffect, useState} from 'react'
import Layout from '@/components/Admin/Layout/Layout'
import AdminCategoryTable from '@/components/Tables/AdminCategoryTable/AdminCategoryTable'
import Button from '@/components/Button/Button'
import Modal from '@mui/material/Modal';
import AdminAddCategory from '@/components/Cards/AdminAddCategory/AdminAddCategory';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {useRouter} from 'next/router';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Style from "@/styles/Admin/category.module.css"

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


interface category {
  _id : string ,
  name : string , 
  slug : string , 
  createdAt : Date
}

const Category = () => {
  
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setId(null)
    setCategory(null)
  }
  const [categories , setCategories] = useState<category[] | null>()
  const [category , setCategory] = useState<category | null>()
  const [stateChanged , setStateChanged] = useState(false)
  const [id , setId] = useState<string | null>()
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

  useEffect(()=>{
     const fetchData =async ()=>{
      const {data} = await axios.get(`${process.env.API_SERVER_URL}/category/categories`)
      
      setCategories(data.categories)
     }

     fetchData()
     
  } ,[stateChanged])

   const stateChangedHandler = ()=>{
      setStateChanged(!stateChanged)
      if(id){
        toast.success("Successfully Edited", {
          position: toast.POSITION.TOP_CENTER
        });
      }else {
        toast.success("Successfully Created", {
          position: toast.POSITION.TOP_CENTER
        });
        setCategory(null)
        setId(null)
      }
    
   }

   const handleEdit =async (id :string)=>{
      const {data} = await axios.get(`${process.env.API_SERVER_URL}/category/category/${id}`)
      setCategory(data.category)
      setId(id)
      handleOpen()
   }

   const handleDelete=async (id : string)=>{
      const {data} = await axios.delete(`${process.env.API_SERVER_URL}/category/delete/${id}`)
      stateChangedHandler()
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
                className='path'
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
            <Typography color="text.primary">
              <p
                className='path'
                style={{
                  textDecoration: "none",
                  fontSize: "25px",
                  fontWeight: "600",
                  fontStyle: "normal",
                }}
              >
                {router.asPath.split("/")[2]}
              </p>
            </Typography>
          </Breadcrumbs>
          <div onClick={handleOpen}>
            <Button btype="create" type="" disable={false} onClick={() => {}}>
              Create +
            </Button>
          </div>
        </div>
        <div style={{ marginTop: "20px", margin: "30px" }}>
          <AdminCategoryTable
            categories={categories}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
        <Modal open={open} onClose={handleClose}>
          <div style={style}>
            <AdminAddCategory
              handleClose={handleClose}
              category={category}
              edit={category ? true : false}
              change={stateChangedHandler}
              id={id}
            />
          </div>
        </Modal>
      </Layout>
    </div>
  );
}

export default Category
