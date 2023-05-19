import React , {useEffect, useState} from 'react'
import Layout from '@/components/Admin/Layout/Layout'
import Button from '@/components/Button/Button'
import Modal from '@mui/material/Modal';
import axios from 'axios';
import AdminTagTable from '@/components/Tables/AdminTagTable/AdminTagTable';
import AdminAddTag from '@/components/Cards/AdminAddTag/AdminAddTag';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';



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


interface tag {
  _id : string ,
  name : string , 
  createdAt : Date
}

const Tag = () => {
  
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setId(null)
    setTag(null)
  }
  const [tags , setTags] = useState<tag[] | null>()
  const [tag , setTag] = useState<tag | null>()
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
      const {data} = await axios.get(`${process.env.API_SERVER_URL}/tag/tags`)
      
      
      setTags(data.tags)
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
      setTag(null)
      setId(null)
      } 
     
   }

   const handleEdit =async (id :string)=>{
      const {data} = await axios.get(`${process.env.API_SERVER_URL}/tag/tag/${id}`)
      setTag(data.tag)
      setId(id)
      handleOpen()
   }

   const handleDelete=async (id : string)=>{
      const {data} = await axios.delete(`${process.env.API_SERVER_URL}/tag/delete/${id}`)
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
        <>
          <div style={{ margin: "30px" }}>
            <AdminTagTable
              tags={tags}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
          <Modal open={open} onClose={handleClose}>
            <div style={style}>
              <AdminAddTag
                handleClose={handleClose}
                tag={tag}
                edit={tag ? true : false}
                change={stateChangedHandler}
                id={id}
              />
            </div>
          </Modal>
        </>
      </Layout>
    </div>
  );
}

export default Tag
