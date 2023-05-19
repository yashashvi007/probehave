import Button from "@/components/Button/Button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Style from "./AddChoices.module.css";

interface Iprops {
  data: any;
  scenes: any;
  handleClose: () => void;
  addChoices: (flowObj: any) => void;
  edit: boolean;
}

const AddChoices = ({
  data,
  scenes,
  handleClose,
  addChoices,
  edit,
}: Iprops) => {
  const [state, setState] = useState([
    {
      choice: "",
      redirect_to: "",
      redirect_scene_name: "",
    },
  ]);

  // const [choice , setChoice] = useState('')
  const [choiceRedirects, setChoiceRedirects] = useState<any[]>([]);
  const [redirect, setRedirect] = useState();
  const [disabled, setDisabled] = useState(false);

  // const handleClick = () => {
  //     setCounter(counter + 1);
  // };

  useEffect(() => {
    if (edit) {
      const x = data.options.map((_: any, i: any) => {
        return {
          choice: data.options[i].choice,
          redirect_to: data.options[i].redirect_to,
          redirect_scene_name: data.options[i].redirect_scene_name,
        };
      });

      setState(x);
    }
  }, []);

  const onChangeHandler = (index: any) => async (e: any) => {
    const { name, value } = e.target;
    console.log(value);

    let r_t_s = "";
    if (name === "redirect_to") {
      const { data } = await axios.get(
        `${process.env.API_SERVER_URL}/scene/getScene/${value}`
      );
      r_t_s = data.scene.scene_name;
    }

    if (state[0].choice !== "" && state[0].redirect_to !== "") {
      setDisabled(false);
    }

    setState(
      state.map((c, ci) => {
        if (index !== ci) {
          return c;
        }
        return {
          ...c,
          [name]: value,
          redirect_scene_name: r_t_s !== "" ? r_t_s : "",
        };
      })
    );
  };

  const handleAddChoice = () => {
    setState([
      ...state,
      {
        choice: "",
        redirect_to: "",
        redirect_scene_name: "",
      },
    ]);
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    addChoices({
      type: "options",
      options: [...state],
    });
    handleClose();
  };

  return (
    <div className={Style.main}>
      <h3>Add Choices</h3>
      <p className={Style.add} onClick={handleAddChoice}>
        Add
      </p>

      <form onSubmit={onSubmitHandler}>
        {state.map((c, index) => (
          <div className={Style.form} key={index}>
            <input
              type="text"
              name="choice"
              value={c.choice}
              onChange={onChangeHandler(index)}
            />
            <select
              onChange={onChangeHandler(index)}
              value={c.redirect_to}
              name="redirect_to"
            >
              <option value="null">__select a scene__</option>
              {scenes.map((scene: any, i: any) => (
                <option key={i} value={scene.id}>
                  {scene.name}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className={Style.button}>
          <Button
            btype={disabled ? "inActive" : "create"}
            type="submit"
            disable={disabled}
            onClick={() => {}}
          >
            Done
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddChoices;
