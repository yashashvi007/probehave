import Button from "@/components/Button/Button";
import { useAppSelector } from "@/redux/hooks/hooks";
import axios from "axios";

import React, { useEffect, useState } from "react";
import Style from "./AdminAddStaff.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "@/components/Toast/Toast";
import { useRouter } from "next/router";
import Image from "next/image";

interface Iuser {
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
}

interface Iprops {
  handleClose: any;
}
// edit : Boolean ,
// change: ()=> void ,
// id : string | null
//,  edit , change, id

const AdminAddStaff = ({ handleClose }: Iprops) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const router = useRouter();

  const [apiError, setApiError] = useState("");

  const { userInfo }: any = useAppSelector((state) => state.userLogin);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // const config = {
    //     headers : {
    //         'Content-Type' : 'application/json',
    //         headers : `Bearer ${userInfo.token}`
    //     }
    // }
    //    if(edit){
    //     console.log('edit');
    //     try {
    //        const {data} =await axios.patch(`http://localhost:5000/probehave/category/update-category/${id}` , {name : state.name , slug : state.slug} , config )
    //        change()
    //        handleClose()
    //      } catch (error : any) {

    //        notify("error" , error.response.data.error)
    //      }
    //    }else {
    console.log("create");
    try {
      const { data } = await axios.post(
        `${process.env.API_SERVER_URL}/user/createStaff`,
        { name: state.name, email: state.email, phoneNumber: state.phoneNumber }
      );
      //    change()
      handleClose();
    } catch (error: any) {
      notify("error", error.response.data.error);
    }
    //    }
  };

  return (
    <>
      <ToastContainer />
      <div className={Style.main}>
        <div>
          <Image src="/admin/createcategory.svg" alt="category image" width={50} height={50} />
        </div>

        <form onSubmit={handleSubmit}>
          <center>
            <h3 className={Style.h3}>Create</h3>
          </center>
          <div className={Style.form}>
            <label className={Style.label}>Name</label>
            <input
              className={Style.input}
              type="text"
              value={state.name}
              name="name"
              onChange={onChangeHandler}
            />
            <label className={Style.label}>Email</label>
            <input
              className={Style.input}
              type="text"
              value={state.email}
              name="email"
              onChange={onChangeHandler}
            />
            <label className={Style.label}>Phone Number</label>
            <input
              className={Style.input}
              type="text"
              value={state.phoneNumber}
              name="phoneNumber"
              onChange={onChangeHandler}
            />
          </div>
          <center style={{ marginTop: "25px", marginBottom: "0px" }}>
            <Button
              btype="create"
              type="submit"
              disable={false}
              onClick={() => {}}
            >
              Create
            </Button>
          </center>
        </form>
        <div className={Style.bootomimage}>
          <Image src="/admin/createcategory.svg" alt="category image" width={50} height={50}  />
        </div>
      </div>
    </>
  );
};

//{edit ? } <Button type='create'>Edit</Button>  :

export default AdminAddStaff;
