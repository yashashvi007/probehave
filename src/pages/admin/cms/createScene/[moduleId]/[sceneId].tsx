import Layout from "@/components/Admin/Layout/Layout";
import Style from "./createScene.module.css";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button/Button";
import { Breadcrumbs, Link, Modal, Typography } from "@mui/material";
import AddTextPopupForm from "@/components/Cms/AddTextPopupForm/AddTextPopupForm";
import AddChoices from "@/components/Cms/AddChoices/AddChoices";
import RedirectPopup from "@/components/Cms/RedirectPopup/RedirectPopup";
import AddUserInputPopupForm from "@/components/Cms/AddUserInputPopupForm/AddUserInputPopupForm";
import axios from "axios";
import {
  Itext,
  Itexts,
  Iinputs,
} from "../../../../../interfaces/CreateScene/ICreateScene";
import Loader from "@/components/Loader/Loader";
import { uploadToS3 } from "@/utils/uploadToS3";
import { useRouter } from "next/router";
import FlowChart from "@/components/Cms/FlowChart/FlowChart";
import { Circles } from "react-loader-spinner";
import { log } from "console";
import useDidMountEffect from "@/hooks/useDidMountEffect";

import DescriptionPopup from "@/components/Cms/DescriptionPopupForm/DescriptionPopup";

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

function CreateScene({}: any) {
  const router = useRouter();

  const { moduleId, sceneId } = router.query;

  const [scene, setScene] = useState<any>();
  const [sceneOptions, setSceneOptions] = useState();

  const [openText, setTextOpen] = useState(false);
  const [openChoices, setChoicesOpen] = useState(false);
  const [openUserInput, setOpenUserInput] = useState(false);
  const [redirectOpen, setRedirectOpen] = useState(false);
  const [descriptionOpen , setDescriptionOpen] = useState(false)

  const [sceneFlow, setSceneFlow] = useState<any>([]);

  const [backgroundName, setBackgroundName] = useState("");
  const [musicName, setMusicName] = useState("");
  const [backgroundLoading, setBackgroundLoading] = useState(false);
  const [musicLoading, setMusicLoading] = useState(false);

  const [saveActive, setSaveActive] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [flowLoading, setFlowLoading] = useState<boolean>(false);

  const [redirectAdded, setRedirectedAdded] = useState<boolean>(false);

  const [stateChanged, setStateChanged] = useState<boolean>(false);

  const [textEdit, setTextEdit] = useState(false);
  const [textData, setTextData] = useState<any>(null);
  const [textEditIndex, setTextEditIndex] = useState<any>();

  const [userInputEdit, setUserInputEdit] = useState(false);
  const [userInputData, setUserInputData] = useState<any>(null);
  const [userInputEditIndex, setUserInputEditIndex] = useState<any>();

  const [redirectEdit, setRedirectEdit] = useState(false);
  const [redirectData, setRedirectData] = useState<any>(null);
  const [redirectEditIndex, setRedirectEditIndex] = useState<any>();

  const [choiceEdit, setChoiceEdit] = useState(false);
  const [choiceData, setChoiceData] = useState<any>(null);
  const [choiceEditIndex, setChoiceEditIndex] = useState<any>();

  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [descriptionData, setDescriptionData] = useState<any>(null);
  const [descriptionEditIndex, setDescriptionEditIndex] = useState<any>();

  const [startAdded , setStartAdded] = useState(false)
  const [endAdded , setEndAdded] =useState(false)

  const [autoSave, setAutoSave] = useState<boolean>(false);
  const [first_render, setFirstRender] = useState<boolean>(true);

  const [moduleName , setModuleName] = useState<any>('')
  

  const [state, setState] = useState({
    background: "",
    music: "",
  });

 
  

  useEffect(() => {
    const fetchScenes = async () => {
      const { data } = await axios.get(
        `${process.env.API_SERVER_URL}/scene/getScenesForModule/${router.query.moduleId}`
      );

      setSceneOptions(
        data.scenes.map((scene: any) => {
          return { name: scene.scene_name, id: scene._id };
        })
      );
    };

    const fetchModule =async () => {
      const {data} = await axios.get(
        `${process.env.API_SERVER_URL}/module/${router.query.moduleId}`
      )

      setModuleName(data.module.title)
     
    }

    const fetchScene = async () => {
      const { data } = await axios.get(
        `${process.env.API_SERVER_URL}/scene/getScene/${router.query.sceneId}`
      );
      setScene(data.scene);
      setSceneFlow(data.scene.dialog_flow);
      if (data.scene.dialog_flow.length !== 0) {
        if (data.scene.dialog_flow.find((x: any) => x.type === "redirect")) {
          setRedirectedAdded(true);
        }
        setSaveActive(false);
      }
      if (data.scene.background !== "") {
        const name = data.scene.background.split("/").pop();
        setBackgroundName(name);
      }
      if (data.scene.music !== "") {
        const name = data.scene.music.split("/").pop();
        setMusicName(name);
      }
    };

    if (!router.isReady) {
      return;
    }
    fetchScenes();
    fetchScene();
    fetchModule();
  }, [router.isReady, stateChanged]);

  const changeState = () => {
    setStateChanged(!stateChanged);
  };

  const handleTextOpen = () => setTextOpen(true);
  const handleTextClose = () => {
    setTextOpen(false);
    setTextEdit(false);
    setTextData(null);
  };

  const handleChoicesOpen = () => setChoicesOpen(true);
  const handleChoicesClose = () => {
    setChoicesOpen(false);
    setChoiceEdit(false);
    setChoiceData(null);
  };

  const handleUserInputOpen = () => setOpenUserInput(true);
  const handleUserInputClose = () => {
    setOpenUserInput(false);
    setUserInputEdit(false);
    setUserInputData(null);
  };

  const handleRedirectOpen = () => setRedirectOpen(true);
  const handleRedirectClose = () => {
    setRedirectOpen(false);
    setRedirectEdit(false);
    setRedirectData(null);
  };


  const handleDecriptionOpen = () => {
    setDescriptionOpen(true)
  }
  const handleDescriptionClose = ()=> {
    setDescriptionOpen(false);
    setDescriptionEdit(false);
    setDescriptionData(null);
  }


  const editFlow = (index: any) => {
    const obj = sceneFlow.find((x: any, i: any) => i === index);
    console.log(obj);

    if (obj.type === "text") {
      setTextEditIndex(index);
      setTextEdit(true);
      setTextData(obj);
      setTextOpen(true);
    } else if (obj.type === "input") {
      setUserInputEditIndex(index);
      setUserInputEdit(true);
      setUserInputData(obj);
      setOpenUserInput(true);
    } else if (obj.type === "redirect") {
      setRedirectEditIndex(index);
      setRedirectEdit(true);
      setRedirectData(obj);
      setRedirectOpen(true);
    } else if (obj.type === "options") {
      setChoiceEditIndex(index);
      setChoiceEdit(true);
      setChoiceData(obj);
      setChoicesOpen(true);
    }else if(obj.type === "description"){
      setDescriptionEditIndex(index);
      setDescriptionEdit(true);
      setDescriptionData(obj.description);
      setDescriptionOpen(true);
    }
  };

  const deleteFromFlow = async (index: any) => {
    console.log(index);
    setAutoSave(!autoSave);

    if (sceneFlow.find((x: any) => x.type === "redirect")) {
      setRedirectedAdded(false);
    }
    setSceneFlow(sceneFlow.filter((scene: any, i: any) => i !== index));
    setSaveActive(true);
    setDeleted(true);

    //  try {
    //   setFlowLoading(true)
    //   const {data} = await axios.patch(`${process.env.API_SERVER_URL}/scene/createScene/${sceneId}` , {dialogs_flow : sceneFlow , music : state.music , background : state.background , deleted : true  })
    //   setFlowLoading(false)
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const addToFlow = (flowObj: any) => {
    console.log(flowObj);
    setAutoSave(!autoSave);

    if (flowObj.type === "input") {
      if (userInputEdit) {
        setSceneFlow(
          sceneFlow.map((scene: any, i: any) => {
            if (i === userInputEditIndex) {
              return {
                message: flowObj.message,
                fieldName: flowObj.fieldName,
                type: "input",
              };
            } else {
              return scene;
            }
          })
        );
        setTextEdit(false);
        setTextData(null);
      } else {
        setSceneFlow([
          ...sceneFlow,
          {
            type: "input",
            message: flowObj.message,
            fieldName: flowObj.fieldName,
          },
        ]);
      }
    } else if (flowObj.type === "text") {
      if (textEdit) {
        setSceneFlow(
          sceneFlow.map((scene: any, i: any) => {
            if (i === textEditIndex) {
              return {
                message: flowObj.text,
                character: flowObj.character,
                characterName : flowObj.characterName , 
                type: "text",
              };
            } else {
              return scene;
            }
          })
        );
        setTextEdit(false);
        setTextData(null);
      } else {
        setSceneFlow([
          ...sceneFlow,
          {
            message: flowObj.text,
            character: flowObj.character,
            characterName : flowObj.characterName , 
            type: "text",
          },
        ]);
      }
    } else if (flowObj.type === "options") {
      if (choiceEdit) {
        setSceneFlow(
          sceneFlow.map((scene: any, i: any) => {
            if (i === choiceEditIndex) {
              return {
                options: flowObj.options,
                type: "options",
              };
            } else {
              return scene;
            }
          })
        );
        setRedirectEdit(false);
        setRedirectData(null);
      } else {
        setSceneFlow([
          ...sceneFlow,
          {
            type: "options",
            options: [...flowObj.options],
          },
        ]);
      }
    } else if (flowObj.type === "redirect") {
      if (redirectEdit) {
        console.log("redirect-edit", flowObj);
        setSceneFlow(
          sceneFlow.map((scene: any, i: any) => {
            if (i === redirectEditIndex) {
              return {
                type: "redirect",
                redirect_to: flowObj.redirect_to,
                redirect_scene_name: flowObj.redirect_scene_name,
              };
            } else {
              return scene;
            }
          })
        );
        setRedirectEdit(false);
        setRedirectData(null);
      } else {
        setSceneFlow([
          ...sceneFlow,
          {
            ...flowObj,
          },
        ]);
      }
      setRedirectedAdded(true);
    } else if(flowObj.type === "description"){
      if(descriptionEdit){
        setSceneFlow(
          sceneFlow.map((scene: any, i: any) => {
            if (i === descriptionEditIndex) {
              return {
                description: flowObj.description,
                type: "description",
              };
            } else {
              return scene;
            }
          })
        );
        setDescriptionEdit(false);
        setDescriptionData(null);
      }else {
        
        setSceneFlow([
          ...sceneFlow,
          {
            type: "description",
            description: flowObj.description,
          },
        ]);
      }
    }else if(flowObj.type === "start"){
       setSceneFlow([
        ...sceneFlow , 
        {
          type : "start"
        }
       ])

       setStartAdded(true)
    }else if(flowObj.type === "complete"){
      setSceneFlow([
        ...sceneFlow , 
        {
          type : "complete"
        }
      ])

      setEndAdded(true)
    }

    setSaveActive(true);
  };

  const onChangeHandler = async (e: any) => {
    if (e.target.name === "background") {
      setBackgroundLoading(true);
    }

    if (e.target.name === "music") {
      setMusicLoading(true);
    }
    const file = e.target.files[0];
    console.log(e.target.files[0]);

    const url = await uploadToS3(e.target.files[0]);
    

    if (e.target.name === "background") {
      setBackgroundName(file.name);
      setSaveActive(true);
    }

    if (e.target.name === "music") {
      setMusicName(file.name);
      setSaveActive(true);
    }

    console.log(url);

    setState({
      ...state,
      [e.target.name]: url,
    });

    if (e.target.name === "background") {
      setBackgroundLoading(false);
    }
    if (e.target.name === "music") {
      setMusicLoading(false);
    }
  };

  const onSave = async () => {
    if (deleted) {
      try {
        setFlowLoading(true);
        const { data } = await axios.patch(
          `${process.env.API_SERVER_URL}/scene/createScene/${sceneId}`,
          {
            dialogs_flow: sceneFlow,
            music: state.music,
            background: state.background,
            deleted,
          }
        );
        setSceneFlow([]);
        setFlowLoading(false);
        changeState();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        setFlowLoading(true);
        const { data } = await axios.patch(
          `${process.env.API_SERVER_URL}/scene/createScene/${sceneId}`,
          {
            dialogs_flow: sceneFlow,
            music: state.music,
            background: state.background,
          }
        );
        setSceneFlow([]);
        setFlowLoading(false);
        changeState();
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(deleted);

  useDidMountEffect(async () => {
    if (first_render) {
      setFirstRender(false);
    } else {
      if (deleted) {
        try {
          setFlowLoading(true);
          const { data } = await axios.patch(
            `${process.env.API_SERVER_URL}/scene/createScene/${sceneId}`,
            {
              dialogs_flow: sceneFlow,
              music: state.music,
              background: state.background,
              deleted,
            }
          );

          setFlowLoading(false);
          changeState();
          setSaveActive(true);
          setDeleted(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          setFlowLoading(true);
          const { data } = await axios.patch(
            `${process.env.API_SERVER_URL}/scene/createScene/${sceneId}`,
            {
              dialogs_flow: sceneFlow,
              music: state.music,
              background: state.background,
            }
          );
          setFlowLoading(false);
          changeState();
          setSaveActive(true);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [autoSave]);

  return (
    <div>
      <Layout>
        {/* <Breadcrumbs aria-label="breadcrumb">
       
        <Link
          underline="hover"
          color="inherit"
          href="/admin"
        >
          CMS
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={`/module/${moduleId}`}
        >
          {moduleName}
        </Link>
        <Typography color="text.primary">{scene?.scene_name}</Typography>
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
              {moduleName}
            </p>
            <p
              style={{
                textDecoration: "none",
                fontSize: "25px",
                fontWeight: "600",
                fontStyle: "normal",
              }}
            >
              {scene?.scene_name}
            </p>
          </Breadcrumbs>
        </div>

        <div
          className={Style.topMenu}
          style={{ display: "flex", flexDirection: "row", marginTop: "15px" }}
          
        >
          {backgroundLoading ? (
            <div className={Style.fileUpload}>
              <Loader />
            </div>
          ) : (
            <div className={Style.hoverBackground} >
              <div className={Style.fileUpload}>
              <label>
                {backgroundName
                  ? `${backgroundName.substring(0, 5)}...`
                  : "Background+"}
                <input
                  type="file"
                  name="background"
                  onChange={onChangeHandler}
                />
              </label>
            </div>
            </div>
          )}

          {musicLoading ? (
            <div className={Style.fileUpload}>
              <Loader />
            </div>
          ) : (
           <div className={Style.hoverMusic} >
             <div className={Style.fileUpload} style={{ marginLeft: "20px" }}>
              <label>
                {musicName ? `${musicName.substring(0, 5)}...` : "Music+"}
                <input
                  type="file"
                  accept="audio/*"
                  name="music"
                  onChange={onChangeHandler}
                />
              </label>
            </div>
           </div>
          )}

          <div className={Style.hoverText} >
          <div style={{ marginLeft: "20px" }} >
            <Button
              btype={redirectAdded ? "inActive" : "create"}
              type=""
              onClick={handleTextOpen}
              disable={redirectAdded || endAdded }
            >
              Add text +{" "}
            </Button>
          </div>
          </div>


          <div className={Style.hoverAddChoices} >
            <div style={{ marginLeft: "20px" }}>
              <Button
                btype={redirectAdded ? "inActive" : "create"}
                type=""
                onClick={handleChoicesOpen}
                disable={redirectAdded || endAdded }
              >
                Add choices +{" "}
              </Button>
            </div>

          </div>


          <div className={Style.hoverUserInput} >
          <div style={{ marginLeft: "20px" }}>
            <Button
              btype={redirectAdded ? "inActive" : "create"}
              type=""
              onClick={handleUserInputOpen}
              disable={redirectAdded || endAdded }
            >
              Add user Input +{" "}
            </Button>
          </div>
          </div>

          
          <div className={Style.hoverRedirect} >
          <div style={{ marginLeft: "20px" }}>
            <Button
              btype={redirectAdded ? "inActive" : "create"}
              type=""
              onClick={handleRedirectOpen}
              disable={redirectAdded}
            >
              Redirect +{" "}
            </Button>
          </div>
          </div>

          
          <div className={Style.hoverNarration} >
          <div style={{ marginLeft: "20px" }}>
            <Button
              btype={redirectAdded ? "inActive" : "create"}
              type=""
              onClick={handleDecriptionOpen}
              disable={redirectAdded || endAdded }
            >
              Description +{" "}
            </Button>
          </div>
          </div>

          {/* <button onClick={()=> addToFlow({type : "start"})} >Add Start</button> */}
          <button onClick={()=> addToFlow({type : "complete"}) } >Add Complete</button>

        </div>

        <div className={Style.cmsFlowContainer}>
          {sceneFlow &&
            (flowLoading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Circles
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              <FlowChart
                scene_flow={sceneFlow}
                deleteFromFlow={deleteFromFlow}
                editInFlow={editFlow}
              />
            ))}
        </div>

        {/* {varState.map((state : any , i : any)=> (
            <p>{state}</p>
          ))} */}

        <Modal open={openText} onClose={handleTextClose}>
          <div style={style}>
            <AddTextPopupForm
              char1={scene?.character1_name}
              char2={scene?.character2_name}
              edit={textEdit}
              data={textData}
              addText={addToFlow}
              handleTextClose={handleTextClose}
            />
          </div>
        </Modal>

        <Modal open={openChoices} onClose={handleChoicesClose}>
          <div style={style}>
            <AddChoices
              edit={choiceEdit}
              data={choiceData}
              scenes={sceneOptions}
              handleClose={handleChoicesClose}
              addChoices={addToFlow}
            />
          </div>
        </Modal>

        <Modal open={openUserInput} onClose={handleUserInputClose}>
          <div style={style}>
            <AddUserInputPopupForm
              edit={userInputEdit}
              data={userInputData}
              addInput={addToFlow}
              handleUserInputClose={handleUserInputClose}
            />
          </div>
        </Modal>

        <Modal open={redirectOpen} onClose={handleRedirectClose}>
          <div style={style}>
            <RedirectPopup
              scene={scene}
              edit={redirectEdit}
              data={redirectData}
              addRedirect={addToFlow}
              scenes={sceneOptions}
              handleClose={handleRedirectClose}
            />
          </div>
        </Modal>

       

        <Modal open={descriptionOpen} onClose={handleDescriptionClose}>
          <div style={style}>
            <DescriptionPopup
              addInput={addToFlow}
              edit={descriptionEdit}
              data={descriptionData}
              handleDescriptionClose={handleDescriptionClose}
            />
          </div>
        </Modal>

        <div style={{ position: "fixed", bottom: "3%", right: "3%" }}>
          <Button
            btype={saveActive ? "create" : "inActive"}
            type=""
            disable={saveActive ? false : true}
            onClick={onSave}
          >
            Save
          </Button>
        </div>
      </Layout>
    </div>
  );
}

export default CreateScene;
