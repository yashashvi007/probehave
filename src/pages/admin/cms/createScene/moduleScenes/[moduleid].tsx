import Layout from "@/components/Admin/Layout/Layout";
import Button from "@/components/Button/Button";
import AddScenePopup from "@/components/Cms/AddScenePopupForm/AddScenePopupForm";
import SceneTable from "@/components/Cms/SceneTable/SceneTable";
import { Modal } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import Style from './moduleScene.module.css'


// export async function getStaticPaths(){

//   const res = await fetch(`${process.env.API_SERVER_URL}/module/cms`)
//   const data =await res.json()

//   const paths = data.modules.map((currElement : any)=> {
//     return {
//       params : {
//         moduleid : currElement._id
//       }
//     }
//   })

//   return {
//     paths ,
//     fallback : false
//   }
// }

export async function getServerSideProps(context: any) {
  const moduleId = context.params.moduleid;
  const res = await fetch(`${process.env.API_SERVER_URL}/module/${moduleId}`);
  const data = await res.json();

  return {
    props: {
      module: data,
      moduleId,
    },
  };
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  p: 4,
  zIndex: 2,
};

interface IProps {
  module: any;
  moduleId: any;
}

function CreateScenes({ module ,  moduleId }: IProps) {
  const [open, setOpen] = useState(false);

  const [scenes, setScenes] = useState([]);
  const [stateChanged, setStateChanged] = useState(false);
  const [openScene, setOpenScene] = useState(false);
  const handleSceneClose = () => setOpenScene(false);
  const handleSceneOpen = () => setOpenScene(true);
  const [moduleName , setModuleName] = useState<any>('')

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API_SERVER_URL}/scene/getScenesForModule/${moduleId}`
        );
        if (data && data.scenes) {
          setScenes(data.scenes);
        }

        
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };

    fetchData();
  }, [stateChanged, moduleId]);

  const handleClick = (id: any) => {
    router.push(`/admin/cms/createScene/${id}`);
  };

  const stateChangedTrigger = () => {
    setStateChanged(!stateChanged);
  };

  return (
    <div>
      <ToastContainer />
      <Layout>
        {/* <Breadcrumbs aria-label="breadcrumb">
       
        <Link
          underline="hover"
          color="inherit"
          href="/admin"
        >
          CMS
        </Link>
        <Typography color="text.primary">{module.module.title}</Typography>
      </Breadcrumbs> */}

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
            <p
              style={{
                textDecoration: "none",
                fontSize: "25px",
                fontWeight: "600",
                fontStyle: "normal",
              }}
            >
              {router.asPath.split("/")[3]}
            </p>
          </Breadcrumbs>
          
            <div onClick={() => handleSceneOpen()}>
              <div className={Style.hoverCreateScene}>
                <Button btype="create" type="" disable={false} onClick={() => {}}>
                  Create Scene+
                </Button>
              </div>
            </div>
        </div>

        {/* <div
          style={{ marginLeft: "30px", marginTop: "30px" }}
          onClick={() => handleSceneOpen()}
        >
          <Button btype="create" type="" disable={false} onClick={() => {}}>
            Create Scene+
          </Button>
        </div> */}
        <SceneTable
          scenes={scenes}
          moduleId={moduleId}
          change={stateChangedTrigger}
        />

        <Modal open={openScene} onClose={handleSceneClose}>
          <div style={style}>
            <AddScenePopup
              handleClose={handleSceneClose}
              change={stateChangedTrigger}
              module_id={moduleId}
            />
          </div>
        </Modal>
      </Layout>
    </div>
  );
}

export default CreateScenes;
