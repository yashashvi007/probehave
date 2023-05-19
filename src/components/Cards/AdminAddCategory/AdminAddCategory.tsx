import Button from "@/components/Button/Button";
import { useAppSelector } from "@/redux/hooks/hooks";
import axios from "axios";

import React, { useEffect, useState } from "react";
import Style from "./AdminAddCategory.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "@/components/Toast/Toast";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Image from "next/image";

interface Icategory {
  name: string | null;
  slug: string | null;
}

interface Iprops {
  handleClose: () => void;
  category: any;
  edit: Boolean;
  change: () => void;
  id: any;
}

const AdminAddCategory = ({
  handleClose,
  category,
  edit,
  change,
  id,
}: Iprops) => {
  const [state, setState] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
  });

  const router = useRouter();

  const [apiError, setApiError] = useState("");

  let userInfo: any;

  if (Cookies.get("userInfo") !== undefined) {
    userInfo = JSON.parse(Cookies.get("userInfo") ?? "null");
  }

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        headers: `Bearer ${userInfo.token}`,
      },
    };
    if (edit) {
      console.log("edit");
      try {
        const { data } = await axios.patch(
          `${process.env.API_SERVER_URL}/category/update-category/${id}`,
          { name: state.name, slug: state.slug },
          config
        );
        change();
        handleClose();
      } catch (error: any) {
        notify("error", error.response.data.error);
      }
    } else {
      console.log("create");
      try {
        const { data } = await axios.post(
          `${process.env.API_SERVER_URL}/category/create`,
          { name: state.name, slug: state.slug },
          config
        );
        change();
        handleClose();
      } catch (error: any) {
        notify("error", error.response.data.error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={Style.main}>
        <div>
          <Image src="/admin/createcategory.svg" alt="" />
        </div>

        <form onSubmit={handleSubmit}>
          <center>
            <h3 className={Style.h3}>Create</h3>
          </center>
          <div className={Style.form}>
            <label className={Style.label}>Category Name</label>
            <input
              className={Style.input}
              type="text"
              value={state.name}
              name="name"
              onChange={onChangeHandler}
            />
            <label className={Style.label}>Category Slug Name</label>
            <input
              className={Style.input}
              type="text"
              value={state.slug}
              name="slug"
              onChange={onChangeHandler}
            />
          </div>
          <center style={{ marginTop: "25px", marginBottom: "0px" }}>
            {edit ? (
              <Button btype="create" type="" disable={false} onClick={() => {}}>
                Edit
              </Button>
            ) : (
              <Button btype="create" type="" disable={false} onClick={() => {}}>
                Create
              </Button>
            )}
          </center>
        </form>
        <div className={Style.bootomimage}>
          <Image src="/admin/createcategory.svg" alt="" />
        </div>
      </div>
    </>
  );
};

export default AdminAddCategory;
