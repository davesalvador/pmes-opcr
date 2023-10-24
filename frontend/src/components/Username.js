import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../helper/validate";
import { useAuthStore } from "../store/store.js";

export default function Username() {
  // const setUsername = useAuthStore((state) => state.setUsername);

  const [usernameFocused, setUsernameFocused] = useState(false);
  const { setUsername } = useAuthStore();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      setUsername(values.username);
      navigate("/password");
    },
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <h2>Welcome back,</h2>
      <form className="py-1" onSubmit={formik.handleSubmit}>
        <div className={`${styles.profile} flex justify-center py-4`}>
          <img className={styles.avatar} src={avatar} alt="avatar" />
        </div>
        <label>
          {/* <span className={isUsernameEntered ? styles.enteredUsername : ""}> */}
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
            type="text"
          />
        </label>

        <button type="submit" className="submit">
          Sign In
        </button>

        <button className="submit2">
          <Link to="/Register"> Sign Up</Link>
        </button>
      </form>
    </>
  );
}
