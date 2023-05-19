import Layout from '@/components/Admin/Layout/Layout'
import Button from '@/components/Button/Button'
import AddModulePopup from '@/components/Cms/AddModulePopupForm/AddModulePopup'
import ModulesTable from '@/components/Cms/ModuleTable/ModulesTable'
import React , {useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@mui/material/Modal';
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
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






export const getServerSideProps = async ()=>{
  const catres = await fetch(`${process.env.API_SERVER_URL}/category/categories`)
  const catdata = await catres.json()

  const tagres = await fetch(`${process.env.API_SERVER_URL}/tag/tags`)
  const tagdata = await tagres.json()

  return {
      props : {
          categories : catdata,
          tags : tagdata
      }
  }
}


interface IProps {
  categories : any , 
  tags : any
}

const Cms = ({categories , tags} : IProps) => {
 
  const [open, setOpen]  = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setId(null)
    setModule(null)
    setEdit(false)
    setOpen(false)
  }

 
  const [modules , setModules] = useState([]);
  const [stateChanged , setStateChanged] = useState<boolean>(false)
  const [edit , setEdit] = useState<boolean>(false)
  const [module , setModule] = useState<any>()
  const [id, setId] = useState<any>()
  const [userInfo , setUserInfo] = useState<any>(null)
  const router = useRouter()

  useEffect(()=>{
    if(!Cookies.get("userInfo")){
      router.push('/authentication/login')
    }else if(Cookies.get("userInfo")){
      const userCookie = Cookies.get("userInfo");
      const user = userCookie ? JSON.parse(userCookie) : null;
      setUserInfo(user)
        if(user.role === 'user'){
            router.push('/')
        }
    }
  } ,[router])

  useEffect(()=>{
    const fetchData = async ()=>{
      const {data} = await axios.get(`${process.env.API_SERVER_URL}/module/cms`)
      setModules(data.modules)
    }

    fetchData()
  } ,[stateChanged])

  const changeState = (deleted : any)=>{
    if(edit){
      setStateChanged(!stateChanged)
      toast.success("Successfully Edited", {
        position: toast.POSITION.TOP_CENTER
      });
      setEdit(!edit)
      setModule(null)
    }
    else if(deleted === "deleted"){
      setStateChanged(!stateChanged)
      toast.error("Successfully Deleted", {
        position: toast.POSITION.TOP_CENTER
    })}
    else {
      setStateChanged(!stateChanged)
      toast.success("Successfully Created", {
      position: toast.POSITION.TOP_CENTER
    });
      }
    }

  const onEdit =async (moduleId : any)=> {
    try {
        setId(moduleId)
        const {data} = await axios.get(`${process.env.API_SERVER_URL}/module/${moduleId}`)
        
        setEdit(true)
        setModule(data.module)
        setOpen(true)
    } catch (error) {
        console.log(error);
    }
  }
  console.log();
 
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
              color="inherit"
              href={`/admin`}
              style={{ textDecoration: "none" }}
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
          </Breadcrumbs>
          <div onClick={handleOpen}>
            <Button btype="create" type="" disable={false} onClick={() => {}}>
              Create Module+
            </Button>
          </div>
        </div>
        <div style={{ margin: "30px" }}>
          <ModulesTable
            onEdit={onEdit}
            change={changeState}
            modules={modules}
          />
        </div>

        <Modal open={open} onClose={handleClose}>
          <div style={style}>
            <AddModulePopup
              id={id}
              userInfo={userInfo}
              editData={module}
              changeState={changeState}
              handleClose={handleClose}
              categories={categories.categories}
              tags={tags.tags}
            />
          </div>
        </Modal>
      </Layout>
    </div>
  );
}

export default Cms
