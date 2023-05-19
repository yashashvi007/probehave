import ChatInput from "@/components/Chat/ChatInput/ChatInput";
import ChatOption from "@/components/Chat/ChatOption/ChatOption";
import TextBox1 from "@/components/Chat/TextBox1/TextBox1";
import TextBox2 from "@/components/Chat/TextBox2/TextBox2";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Style from "@/styles/chat.module.css";
import { Modal } from "@mui/material";
import { GetServerSideProps } from "next";
import ChatChoices from "@/components/Chat/ChatChoices/ChatChoices";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import AudioPlayer from "@/components/PlayAudio/PlayAudio";
import StartPopup from "@/components/StartPopup/StartPopup";
import cookie from "cookie";
import FeedBackPopup from "@/components/CompletePopup/CompletePopup";
import DownloadPopup from "@/components/DownloadPopup/DownloadPopup";
import DescriptionBox from "@/components/Chat/DescriptionBox/DescriptionBox";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import index from "@/pages/admin/transaction";


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

interface Props {
  data: any;
  scenesData: any;
  scenesInfo: any;
  chatArray: any;
  variables: any;
  userInfo: any;
  isPurchased:any;
  moduleData : any ;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
  req
}) => {
  
  
  const { sceneId , moduleId } = query;
  const data = await fetch(
    `${process.env.API_SERVER_URL}/scene/getScene/${sceneId}`
  );
  const json = await data.json();

  const scenes = await fetch(`${process.env.API_SERVER_URL}/scene/getScenesForModule/${moduleId}`)
  const scenesData = await scenes.json()
  console.log(scenesData.scenes);

  const moduleData = await fetch(`${process.env.API_SERVER_URL}/module/${moduleId}`)
  const moduleDataJson = await moduleData.json();

  let tempArray : any ;

  tempArray = scenesData.scenes.map((scene : any )=> {
    return [...scene.dialog_flow];
  })

  const chatArray : any = [{type : "start"}]

  tempArray.forEach((array : any)=> {
    chatArray.push(...array)
  })
  
  let scenesInfo : any ;

  let counter : any ;

  scenesInfo = scenesData.scenes.map((scene : any , i : any) => {
   
    if(i === 0){
      
      return {
        sceneId : scene._id , 
        scene_name : scene.scene_name , 
        character1_name : scene.character1_name , 
        character2_name : scene.character2_name , 
        background : scene.background , 
        music : scene.music , 
        length : scene.dialog_flow.length  , 
        start : 0 , 
        end : false 
      }
    }else if(i === scenesData.scenes.length - 1){
      return {
        sceneId : scene._id , 
        scene_name : scene.scene_name , 
        character1_name : scene.character1_name , 
        character2_name : scene.character2_name , 
        background : scene.background , 
        music : scene.music , 
        length : scene.dialog_flow.length  , 
        start : counter , 
        end : true 
      }
    }

    return {
      sceneId : scene._id , 
      scene_name : scene.scene_name , 
      character1_name : scene.character1_name , 
      character2_name : scene.character2_name , 
      background : scene.background , 
      music : scene.music , 
      length : scene.dialog_flow.length  , 
      end : false , 
      start : counter
    }
  } )


  for(let i = 0;i< scenesInfo.length;i++){
    if(i !== 0){
      scenesInfo[i].start = scenesInfo[i - 1].length +scenesInfo[i - 1].start ;
    }
  }

  

  let variables : any = []

  chatArray.forEach((x : any)=> {
    if(x.type === 'input'){
      variables = [...variables ,x.fieldName]
    }
  })

  console.log(variables);

  const cookies = cookie.parse(req.headers.cookie || "");
  const userInfoCookie = cookies.userInfo;
  const decodedUserInfo = decodeURIComponent(userInfoCookie);
  const userInfo = JSON.parse(decodedUserInfo);
 
  var isPurchased : any = false ; 
  // userInfo.modules.find((module : any)=> {
  //   console.log(module.module_id , moduleId);
    
  //   if(module.module_id === moduleId){
  //     console.log("found the module ________________________________________________");
  //     isPurchased = true
  //   }
  // });
  
  // isPurchased = userInfo.modules.find((module : any)=> {
  //   if(module.module_id === moduleId){
    
  //   }
  // })

  return {
    props: {
      data: json,
      scenesData: scenesData,
      scenesInfo,
      chatArray,
      variables,
      userInfo: userInfo,
      isPurchased,
      moduleData : moduleDataJson
    },
  };
};

const Chat: React.FC<Props> = ({
  data,
  scenesData,
  scenesInfo,
  chatArray,
  variables,
  userInfo,
  isPurchased,
  moduleData
}) => {
  const router = useRouter();

  console.log(isPurchased);
  const [iteratorLimit, setIteratorLimit] = useState(500);
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [completePopup, setCompletePopup] = useState(false);

  // const handleCompleteOpen = () => setCompletePopup(true);
  // const handleCompleteClose = () => setCompletePopup(false);

  const [scenes, setScenes] = useState<any[]>(scenesData.scenes);
  const [newFlow, setNewFlow] = useState<any[]>(chatArray);
  

  const [vars, setVars] = useState<any>(
    Object.values(variables).map((x: any) => {
      return { [x]: "" };
    })
  );
  
  
  
  const [char1Image , setChar1Image] = useState(moduleData.module.char1Image || "/maleChar.svg")
  const [char2Image , setChar2Image] = useState(moduleData.module.char2Image || "/anya.svg")
  const [flow, setFlow] = useState<any[]>(data.scene.dialog_flow);

  const [char1, setChar1] = useState(data.scene.character1_name);
  const [char2, setChar2] = useState(data.scene.character2_name);
  const [scene_name, setSceneName] = useState<any>(data.scene.scene_name);
  const [iterator, setIterator] = useState<any>(0);
  const [iterable_flow, setIterableFlow] = useState<any[]>([]);
  const [first_render, setFirstRender] = useState(true);
  const [isInput, setIsInput] = useState(false);
  const [isOptions, setIsOptions] = useState(false);
 
  const [showFeedBackPopup, setShowFeedBackPopup] = useState(false);
  const [textColor , setTextColor] = useState("white")
  
  const [plzTapForRedirect , setPlzTapForRedirect] = useState(false)
  const [popUpPlzTapRedirect , setPopUpPlzTapRedirect] = useState(false)

  const handleFeedBackOpen = () => setShowFeedBackPopup(true);
  const handleFeedBackClose = () => {
    setShowFeedBackPopup(false);
    setShowDownloadPopup(true);
  };

  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const handleDownloadOpen = () => setShowDownloadPopup(true);
  const handleDownloadClose = () => setShowDownloadPopup(false);

  const [tapOff, setTapOff] = useState(false);

  const [backgroundUrl, setBackgroundUrl] = useState(
    data.scene.background
      ? data.scene.background
      : "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  );
  const [conversation, setConversation] = useState<any>([]);
  const [inputSubmited, setInputSubmited] = useState<any>(false);
  const [user , setUser] = useState(userInfo)
  
  useEffect(()=> {
    if(backgroundUrl === ""){
      console.log("background Url")
      setTextColor("black")
      setBackgroundUrl("https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80")
    }else {
      setTextColor("white") 
    }
  } , [backgroundUrl])


  const start = ()=> {
    setIterator(0)
  }
  
  const playAudio = () => {
    const audio = new Audio(data.scene.music);
    audio.autoplay = true;
    audio.play();
  };

  const closeAudio = () => {
    const audio = new Audio(data.scene.music);
    audio.pause();
  };

  const increaseIterator = () => {
    // if (flow.length - 1 === iterator) {
    // setCompletePopup(true);
    // return;
    // }

    // if (newFlow.length - 1 > iterator) {
    setIterator((prevIndex : any) => prevIndex + 1);
    // }
  };

  const addListener = () => {
    setIsInput(false);
  };

 

  const onChoose = async (obj: any) => {
    console.log(obj);
    // const element = <TextBox2>{obj.choice}</TextBox2>;
    // setIterableFlow((prevState) => [...prevState, element]);
    // setConversation((prevState: any) => [
    //   ...prevState,
    //   { choice: obj.choice, type: "choice" },
    // ]);

    if (obj.redirect_to !== "") {
      // const config = {
      //   headers: { Authorization: `Bearer ${userInfo.token}` },
      // };
      // const { data } = await axios.post(
      //   `${process.env.API_SERVER_URL}/response/save/${router.query.moduleId}`,
      //   { conversation },
      //   config
      // );

      //router.push(`/chat/${router.query.moduleId}/${obj.redirect_to}`);
      // console.log(`option ${obj.redirect_to}`);

      const startScene = scenesInfo.find(
        (scene: any) => scene.sceneId === obj.redirect_to
      );
      setBackgroundUrl(startScene.background);
      setIterator(startScene.start);

    } else {
      setIterator(iterator + 1);
    }


    setIsOptions(false);
  };

  const onInputSubmit = (obj: any) => {
    // setConversation((prevState: any) => [
    //   ...prevState,
    //   { answer: input, type: "answer" },
    // ]);

    setVars((prevVars: any) =>
      prevVars.map((varObj: any) => {
        if (varObj.hasOwnProperty(obj.name)) {
          return { ...varObj, [obj.name]: obj.input };
        }
        return varObj;
      })
    );
    setIterableFlow((prevState) => {
      const newFlow = prevState.slice(0, -1);
      return [...newFlow];
    });

    setInputSubmited(true);
    setIsInput(false);
  };

  useDidMountEffect(() => {
    if (first_render) {
      setFirstRender(false);
    } else {
      window.location.reload();
    }
  }, [router.query.sceneId]);

  const containerRef = useRef<any>(null);
  
  useEffect(() => {
    const container: any = containerRef.current;
    
    if (!container) return;

    const handleClick = () => {
      if (!isInput && !isOptions && !tapOff) {
        increaseIterator();
      }
    };
    
    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, [isInput, isOptions, tapOff]);

  useEffect(()=> {
    if(containerRef.current){
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  } ,[iterable_flow])

  const TapOff = () => {
    setTapOff(true);
  };

  const TapOn = () => {
    setTapOff(false);
  };

  //   let element: any;

  //   if (flow[iterator].type === "text") {
  //     console.log(
  //       flow[iterator].message,
  //       flow[iterator].character,
  //       iterable_flow.length
  //     );

  //     setConversation((prevState: any) => [
  //       ...prevState,
  //       { message: flow[iterator].message, type: "text" },
  //     ]);
  //     element =
  //       flow[iterator].character === "1" ? (
  //         <TextBox1>{flow[iterator].message}</TextBox1>
  //       ) : (
  //         <TextBox2>{flow[iterator].message}</TextBox2>
  //       );

      // if (iterable_flow.length < 2) {
      //   console.log("<2");
        // setIterableFlow((prevState) => [...prevState, element]);
      // } else {
      //   console.log("else");
      //   console.log(element);
      //   if (inputSubmited) {
      //     flow[iterator].character === "1"
      //       ? setIterableFlow([
      //           <TextBox1 key={Math.random() * 1000}>
      //             {flow[iterator].message}
      //           </TextBox1>,
      //         ])
      //       : setIterableFlow([
      //           <TextBox2 key={Math.random() * 1000}>
      //             {flow[iterator].message}
      //           </TextBox2>,
      //         ]);
      //     setInputSubmited(false);
      //     return;
      //   }
      //   setIterableFlow([element]);
      // }
  //   } else if (flow[iterator].type === "options") {
  //     setIsOptions(true);
  //     element = <TextBox1>{"option"}</TextBox1>;
  //     setIterableFlow([element]);
  //     element = (
  //       <ChatChoices choose={onChoose} options={flow[iterator].options}>
  //         Options
  //       </ChatChoices>
  //     );
  //     setIterableFlow((prevState) => [...prevState, element]);
  //     setConversation((prevState: any) => [
  //       ...prevState,
  //       { type: "options", options: flow[iterator].options },
  //     ]);
  //   } else if (flow[iterator].type === "input") {
  //     setIsInput(true);
  //     element = <TextBox1>{flow[iterator].message}</TextBox1>;
  //     setIterableFlow([element]);
  //     element = (
  //       <ChatInput inputSubmit={onInputSubmit} addListener={addListener}>
  //         {flow[iterator].message}
  //       </ChatInput>
  //     );
  //     setIterableFlow((prevState) => [...prevState, element]);
  //     setConversation((prevState: any) => [
  //       ...prevState,
  //       { question: flow[iterator].message, type: "input" },
  //     ]);
  //   } else if (flow[iterator].type === "redirect") {
  //     const config = {
  //       headers: { Authorization: `Bearer ${userInfo.token}` },
  //     };
  //     const { data } = await axios.post(
  //       `${process.env.API_SERVER_URL}/response/save/${router.query.moduleId}`,
  //       { conversation },
  //       config
  //     );
  //     router.push(
  //       `/chat/${router.query.moduleId}/${flow[iterator].redirect_to}`
  //     );
  //   }
  // }, [iterator]);

  const addUptoNextOption = ()=> {
    let index : any = newFlow.length - 1 ;

    if(plzTapForRedirect){
      setPopUpPlzTapRedirect(true)
      alert("Please tap on screen")
      return ;
    }
    
    for(let i = iterator + 1;i<newFlow.length ;i++){
      if(newFlow[i].type === "options"){
        index = i;
        break;
      }else if(newFlow[i].type === "input"){
        index = i ;
        break;
      }else if(newFlow[i].type === "complete"){
        index = i - 1 ;
        break;
      }else if(newFlow[i].type === "redirect"){
        index = i - 1;
        setPlzTapForRedirect(true)
        break;
      }
    }



    console.log(index);

    const newArray : any = [] ; 
    for(let i = iterator+1;i<=index;i++){
      let element: any ;
      if(newFlow[i].type === "text"){
      
      element =
      newFlow[i].character === "1" ? (
        <TextBox1
          TapOff={TapOff}
          TapOn={TapOn}
          vars={vars}
          speed={100}
          char1Image={char1Image}
        >
          {newFlow[i].message}
        </TextBox1>
      ) : (
        <TextBox2
          TapOff={TapOff}
          TapOn={TapOn}
          vars={vars}
          speed={100}
          char2Image={char2Image}
        >
          {newFlow[i].message}
        </TextBox2>
      );

      newArray.push(element)
     // setIterator(iterator + 1)
      }else if(newFlow[i].type === "options"){
        setIsOptions(true);

        element = (
          <>
            <TextBox1
              TapOff={TapOff}
              TapOn={TapOn}
              vars={vars}
              speed={100}
              char1Image={char1Image}
            >
              {"option"}
            </TextBox1>
            <ChatChoices choose={onChoose} options={newFlow[i].options}>
              Options
            </ChatChoices>
          </>
        );
        newArray.push(element)
       // setIterator(iterator + 1)
      }else if(newFlow[i].type === "input"){
        setIsInput(true);
        element = (
        <>
          <TextBox1 TapOff={TapOff} TapOn={TapOn} vars={vars} speed={100} char1Image={char1Image} >{newFlow[i].message}</TextBox1>;
          <ChatInput name={newFlow[i].fieldName} inputSubmit={onInputSubmit} addListener={addListener}>
            {newFlow[i].message}
          </ChatInput>
        </>
        );
        newArray.push(element)
       // setIterator(iterator + 1)
       // setIterableFlow((prevState) => [...prevState, element]);
      } 
      else if(newFlow[i].type === "complete"){
        setShowFeedBackPopup(true);
        break;
      }
    }
    console.log("newArray console --> " , newArray)
    console.log("prevArray console --> " , iterable_flow)
    console.log("iterator is at --> " , iterator)
    newArray.pop();
    setIterableFlow((prevState)=> [...prevState , ...newArray])
    setIterator(index)
    console.log(iterable_flow);
    // if(plzTapForRedirect){
      
    // }
    
    //setButtonTap(false)
  }

  

  useDidMountEffect(()=> {
    console.log("Tapped");
    
    console.log(iterator);
    
    if(!isPurchased && iterator > iteratorLimit  ){
      alert("Please purchase")
      return;
    }

    if (iterator >= newFlow.length) {
      handleFeedBackOpen();
      
      return;
    }

    

    let element: any;

    //  if(newFlow.length === 0){
    //   return
    //  }

    if (newFlow[iterator].type === "text") {
      console.log(newFlow[iterator].character);

      element =
        newFlow[iterator].character === "1" ? (
          <TextBox1
            TapOff={TapOff}
            TapOn={TapOn}
            char1Image={char1Image}
            vars={vars}
            speed={60}

          >
            {newFlow[iterator].message}
          </TextBox1>
        ) : (
          <TextBox2
            TapOff={TapOff}
            TapOn={TapOn}
            vars={vars}
            speed={60}
            char2Image={char2Image}
          >
            {newFlow[iterator].message}
          </TextBox2>
        );

      setIterableFlow((prevState) => [...prevState, element]);
    } else if (newFlow[iterator].type === "options") {
      setIsOptions(true);

      element = (
        <>
          <TextBox1
            TapOff={TapOff}
            TapOn={TapOn}
            vars={vars}
            speed={60}
            char1Image={char1Image}
          >
            {"option"}
          </TextBox1>
          <ChatChoices choose={onChoose} options={newFlow[iterator].options}>
            Options
          </ChatChoices>
        </>
      );
      setIterableFlow((prevState) => [...prevState, element]);
      //  setConversation((prevState: any) => [
      //    ...prevState,
      //    { type: "options", options: flow[iterator].options },
      //  ]);
      }else if(newFlow[iterator].type === 'input'){
           setIsInput(true);
            element = (
            <>
              <TextBox1 TapOff={TapOff} TapOn={TapOn} vars={vars} speed={60} char1Image={char1Image} >{newFlow[iterator].message}</TextBox1>;
              <ChatInput name={newFlow[iterator].fieldName} inputSubmit={onInputSubmit} addListener={addListener}>
                {newFlow[iterator].message}
              </ChatInput>
            </>
            );
     setIterableFlow((prevState) => [...prevState, element]);
    //  setConversation((prevState: any) => [
    //    ...prevState,
    //    { question: flow[iterator].message, type: "input" },
    //  ]);
      }else if(newFlow[iterator].type === 'description'){
         element = <DescriptionBox TapOff={TapOff} TapOn={TapOn} vars={vars}  >{newFlow[iterator].description}</DescriptionBox>
         setIterableFlow((prevState)=> [...prevState , element])  
      }else if(newFlow[iterator].type === 'redirect'){
         const redirectScene = scenesInfo.find((scene : any) => scene.sceneId === newFlow[iterator].redirect_to)
         setBackgroundUrl(redirectScene.background)
         setIterator(redirectScene.start)
        //  const index = newFlow.findIndex((scene : any)=> scene.redirect_to === redirectScene.sceneId )
        //  setIterator(index + 1)
      }else if(newFlow[iterator].type === "complete"){
        setShowFeedBackPopup(true);
      }
  } , [iterator])


  // useEffect(() => {
  //   window.addEventListener('popstate', handleBackButton);
  //   return () => {
  //     window.removeEventListener('popstate', handleBackButton);
  //   };
  // }, []);

  // function handleBackButton(event : PopStateEvent) {
  //   event.preventDefault(); // Prevents the browser from going back automatically

    // const confirmation = window.confirm('Do you want to go back?');
    
    // if (confirmation === true) {
    //   window.location.href = document.referrer; // Goes back one page
    //   closeAudio()
    // }else {
    // closeAudio();
    //   return ;
    // }
  // }

  useEffect(() => {
    return () => {
      closeAudio();
    };
  }, []);

  // console.log(iterable_flow);

  

  // useEffect(() => {
  //   containerRef.current.scrollTop = containerRef.current.scrollHeight;
  // }, [iterable_flow]);

  return (
    <>
      <div
        className={Style.chatContainer}
        style={{
          background: `url(${backgroundUrl})`,
          color : `${textColor}` , 
          // padding: "50px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh"
        }}
      >
        <div ref={containerRef} className={Style.chatContainer_div} style={{color : "black" }} >
          {iterable_flow.map((element, i) => (
            <div className={Style.chatContainer_innerDiv} style={{color : "black" }} key={i}>
              {element}
            </div>
          ))}
         
        </div>

        <div
            className=""
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className={`${Style.buttonsWeb} ${Style.buttons}`}>
              <button  >
                <KeyboardArrowDownIcon  />
              </button>
              <button  onClick={addUptoNextOption} >
                <KeyboardDoubleArrowDownIcon  />
              </button>
              <button>
                <ArrowBackIosIcon
                  style={{ marginRight: "-10px", fontSize: "20px" }}
                />
              </button>
              <button
               
              >
                 <PauseIcon /> 
              </button>
            </div>
            
         </div>

        <Modal open={showFeedBackPopup}>
          <div style={style}>
            <FeedBackPopup
              userInfo={userInfo}
              moduleId={router.query.moduleId}
              closePopup={handleFeedBackClose}
            />
          </div>
        </Modal>

        <Modal open={showDownloadPopup}>
          <div style={style}>
            <DownloadPopup
              closeAudio={closeAudio}
              closePopup={handleDownloadClose}
            />
          </div>
        </Modal>
      </div>

      <Modal open={open}>
        <div style={style}>
          <StartPopup start={playAudio} closePopup={handleClose} />
        </div>
      </Modal>
    </>
  );
};

export default Chat;
