import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import useFetch from "../hooks/fetch.hook.js";
import { useAuthStore } from "../store/store.js";
import { verifyPassword } from "../helper/helper.js";
import bsulogo from "../assets/BSU.png";

export default function Username() {
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = verifyPassword({
        username,
        password: values.password,
      });

      toast.promise(
        loginPromise.then((res) => {
          let { token } = res.data;
          localStorage.setItem("token", token);
          navigate("/profile");
        }),
        {
          loading: "Checking...",
          success: <b>Login Successfully</b>,
          error: (error) => <b>{error.error}</b>,
        }
      );
    },
  });

  // if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (isLoading)
    return <img className={styles.bsulogo} src={bsulogo} alt="Loading..." />;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h4 className="flex justify-center text-2xl font-bold">
        Hello {apiData?.firstName || apiData?.username || "tangina"}
      </h4>

      <form className="py-1" onSubmit={formik.handleSubmit}>
        <div className={`${styles.profile} flex justify-center py-4`}>
          <img
            className={styles.avatar}
            src={apiData?.profile || avatar}
            alt="avatar"
          />
        </div>
        <label>
          <span style={{ color: formik.values.password ? "#763435" : "" }}>
            Password
          </span>
          <input
            {...formik.getFieldProps("password")}
            className={styles.textbox}
            type="password"
            style={
              passwordFocused
                ? {
                    boxShadow: "0px 25px 10px rgba(0, 0, 0, 0.2)",
                    transition: "box-shadow 0.3s ease-in-out",
                  }
                : {
                    transition: "box-shadow 0.3s ease-in-out",
                  }
            }
            // placeholder="Password"
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
        </label>

        <button type="submit" className="submit">
          Sign In
        </button>
        <div className="text-center mt-5">
          {" "}
          {/*Forgot Passowrd - Dodge */}
          <span className="text-gray-500 ">
            Forgot Password?
            <Link className="text-red-500 ml-2 pt" to="/recovery">
              Recover Now{" "}
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}
