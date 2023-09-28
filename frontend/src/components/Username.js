import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../helper/validatejs";
import { useAuthStore } from "../store/store.js";

export default function Username() {
  const setUsername = useAuthStore((state) => state.setUsername);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // console.log(values);
      setUsername(values.username);
      console.log(values);
      navigate("/password");
    },
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h2>Welcome back,</h2>
      <form className="py-1" onSubmit={formik.handleSubmit}>
        <div className={`${styles.profile} flex justify-center py-4`}>
          <img className={styles.avatar} src={avatar} alt="avatar" />
        </div>
        <label>
          <span>Username</span>
          <input
            {...formik.getFieldProps("username")}
            type="text"
            name="username"
            // placeholder="Username"
          />
        </label>

        <button type="submit" className="submit">
          Sign In
        </button>

        <button type="submit" className="submit2">
          <Link to="/Register"> Sign Up</Link>
        </button>
      </form>
    </>
  );
}
