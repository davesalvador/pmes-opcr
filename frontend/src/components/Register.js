import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import { registerUser } from "../helper/helper";
import institutes from "../utils/institutes";
import clickMe from "../assets/clickMe.png";

export default function Register() {
  const [usernameFocused, setUsernameFocused] = useState(false);

  const navigate = useNavigate();
  const [file, setFile] = useState();
  // const [esignature, setEsignature] = useState();

  //institute sorting
  institutes.sort((a, b) => a.institute.localeCompare(b.institute));

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      institute: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      //   values = await Object.assign(values, { esignature: esignature || "" });
      //   // console.log(values);
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: "Creating...",
        success: <b>Register Successfully...!</b>,
        error: <b>Could not register</b>,
      });
      // registerPromise.then(function () {
      //   navigate("/");
      // });

      //changed
      registerPromise
        .then(() => {
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error during registration:", error);
        });
      // console.log(values);
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  // const onUploadEsignature = async (e) => {
  //   // const base64 = await convertToBase64(e.target.files[0]);
  //   // setEsignature(base64);
  // };
  return (
    <div className="registerContainer">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h2 className="registerTitle">Create Account</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="profile flex justify-center py-6">
          <label
            // class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            htmlFor="profile"
            // accept="image/*"
          >
            <img src={clickMe} className="clickMe" alt="Click Me" />
            <img
              src={file || avatar}
              className={styles.avatar}
              alt="avatar"
            ></img>
            <input
              onChange={onUpload}
              type="file"
              id="profile"
              name="profile"
              // accept="image/*"
            />
          </label>
        </div>
        <label>
          <span style={{ color: formik.values.username ? "#763435" : "" }}>
            Username
          </span>
          <input
            {...formik.getFieldProps("username")}
            style={
              usernameFocused
                ? {
                    boxShadow: "0px 25px 10px rgba(0, 0, 0, 0.2)",
                    transition: "box-shadow 0.3s ease-in-out",
                  }
                : {
                    transition: "box-shadow 0.3s ease-in-out",
                  }
            }
            onFocus={() => setUsernameFocused(true)}
            onBlur={() => setUsernameFocused(false)}
            type="username"
          />
        </label>

        <label>
          <span style={{ color: formik.values.email ? "#763435" : "" }}>
            Email
          </span>
          <input
            {...formik.getFieldProps("email")}
            className={styles.textbox}
            type="text"
            // placeholder="Email*"
          />
        </label>
        <label>
          <span style={{ color: formik.values.password ? "#763435" : "" }}>
            Password
          </span>
          <input
            {...formik.getFieldProps("password")}
            style={
              usernameFocused
                ? {
                    boxShadow: "0px 25px 10px rgba(0, 0, 0, 0.2)",
                    transition: "box-shadow 0.3s ease-in-out",
                  }
                : {
                    transition: "box-shadow 0.3s ease-in-out",
                  }
            }
            onFocus={() => setUsernameFocused(true)}
            onBlur={() => setUsernameFocused(false)}
            className={styles.textbox}
            type="password"
            // placeholder="Password*"
          />
        </label>

        <label>
          <span style={{ color: formik.values.institute ? "#763435" : "" }}>
            Institute
          </span>
          <select
            {...formik.getFieldProps("institute")}
            className="institute_list"
          >
            <option value="" className="centered_option">
              Select your institute
            </option>
            {institutes.map((institute) => (
              <option
                key={institute._id_}
                value={institute.institute}
                className="institute_option"
              >
                {institute.institute}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="submit">
          Sign Up
        </button>
        <button className="mobile-login-button">
          <Link to="/"> Login</Link>
        </button>
      </form>
    </div>
  );
}
