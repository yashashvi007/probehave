import React from "react";
import Style from "./FlowChart.module.css";
import Text from "../Text/Text";
import Choice from "../Choice/Choice";
import Redirect from "../Redirect/Redirect";
import UserInput from "../UserInput/UserInput";
import Description from "@/components/Chat/Description/Description";
import StartFlow from "../StartFlow/StartFlow";
import EndFlow from "../EndFlow/EndFlow";

interface Iprops {
  scene_flow: any;
  deleteFromFlow: any;
  editInFlow: any;
}

function FlowChart({ scene_flow, deleteFromFlow, editInFlow }: Iprops) {
  const editBox = (index: any) => {
    editInFlow(index);
  };

  const deleteBox = (index: any) => {
    deleteFromFlow(index);
  };

  return (
    <div className={Style.flowChart}>
      {scene_flow.map((scene: any, i: any) => {
        if (scene.type === "text") {
          return (
            <>
              <div key={i} className={Style.flowChart_textBox}>
                <p style={{ marginBottom: "5px" }}>TEXT</p>
                <Text
                  characterName={scene.characterName}
                  text={scene.message}
                  character={scene.character}
                  index={i}
                  deleteFromFlow={deleteBox}
                  editInFlow={editBox}
                />
              </div>
              <div className={Style.arrowContainer}>
                <div className={Style.verticalLine}></div>
              </div>
            </>
          );
        } else if (scene.type === "options") {
          return (
            <>
              <div key={i} className={Style.flowChart_choiceBox}>
                <p style={{ marginBottom: "5px" }}>OPTIONS</p>
                <Choice
                  options={scene.options}
                  index={i}
                  deleteFromFlow={deleteBox}
                  editInFlow={editBox}
                ></Choice>
              </div>
              <div className={Style.arrowContainer}>
                <div className={Style.verticalLine}></div>
              </div>
            </>
          );
        } else if (scene.type === "redirect") {
          return (
            <>
              <div key={i} className={Style.flowChart_redirectBox}>
                <p style={{ marginBottom: "5px" }}>REDIRECT</p>
                <Redirect
                  redirect_to={scene.redirect_scene_name}
                  index={i}
                  deleteFromFlow={deleteBox}
                  editInFlow={editBox}
                ></Redirect>
              </div>
            </>
          );
        } else if (scene.type === "input") {
          return (
            <>
              <div key={i} className={Style.flowChart_userInputBox}>
                <p style={{ marginBottom: "5px" }}>INPUT</p>
                <UserInput
                  message={scene.message}
                  fieldName={scene.fieldName}
                  index={i}
                  deleteFromFlow={deleteBox}
                  editInFlow={editBox}
                ></UserInput>
              </div>
              <div className={Style.arrowContainer}>
                <div className={Style.verticalLine}></div>
              </div>
            </>
          );
        } else if (scene.type === "description") {
          return (
            <>
              <div key={i} className={Style.flowChart_descriptionBox}>
                <p style={{ marginBottom: "5px" }}>Description</p>
                <Description
                  index={i}
                  description={scene.description}
                  deleteFromFlow={deleteBox}
                  editInFlow={editBox}
                />
              </div>
              <div className={Style.arrowContainer}>
                <div className={Style.verticalLine}></div>
              </div>
            </>
          );
        } else if(scene.type === "complete"){
          return (
            <>
              <div key={i} >
                <EndFlow/>
              </div>
            </>
          )
        } 
      })}
    </div>
  );
}

export default FlowChart;
