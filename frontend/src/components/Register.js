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
  const navigate = useNavigate();

  const [file, setFile] = useState();
  const [focusedField, setFocusedField] = useState(null);

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
      const updatedValues = { ...values, profile: file || "" };
      const registerPromise = registerUser(updatedValues);

      toast.promise(registerPromise, {
        loading: "Creating...",
        success: <b>Register Successfully...!</b>,
        error: <b>Could not register</b>,
      });

      registerPromise
        .then(() => {
          navigate("/");
          window.location.reload();
        })
        .catch((error) => console.error("Error during registration:", error));
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const boxShadowStyle = {
    boxShadow: "0px 25px 10px rgba(0, 0, 0, 0.2)",
    transition: "box-shadow 0.3s ease-in-out",
  };

  return (
    <div className="registerContainer">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="registerTitle">Create Account</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="profile flex justify-center py-6">
          <label htmlFor="profile">
            <img src={clickMe} className="clickMe" alt="Click Me" />
            <img src={file || avatar} className={styles.avatar} alt="avatar" />
            <input
              onChange={onUpload}
              type="file"
              id="profile"
              name="profile"
            />
          </label>
        </div>
        {["username", "email", "password", "institute"].map((field) => (
          <label key={field}>
            <span style={{ color: formik.values[field] ? "#763435" : "" }}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </span>
            {field !== "institute" ? (
              <input
                {...formik.getFieldProps(field)}
                type={field}
                style={
                  focusedField === field
                    ? boxShadowStyle
                    : { transition: "box-shadow 0.3s ease-in-out" }
                }
                onFocus={() => handleFocus(field)}
                onBlur={() => handleFocus(null)}
              />
            ) : (
              <select
                {...formik.getFieldProps(field)}
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
            )}
          </label>
        ))}
        <button type="submit" className="submit">
          Sign Up
        </button>
        <button className="mobile-login-button">
          <Link to="/">Login</Link>
        </button>
      </form>
    </div>
  );
}
