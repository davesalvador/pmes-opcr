// import EmptyState from "../messenger/component/EmptyState.tsx";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/fetch.hook";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import { updateUser } from "../helper/helper";
import toast, { Toaster } from "react-hot-toast";
import extend from "../styles/Profile.module.css";
import avatar from "../assets/profile.png";
import styles from "../styles/Profile.module.css";
import pdologo from "../assets/PDOLOGO3.png";
import "../styles/profile.css";


const Profile = () => {
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [{ isLoading, apiData, serverError }] = useFetch();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
      username: apiData?.username || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.profile || "",
      });
      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Update Successfully</b>,
        error: <b>Could not Update</b>,
      });

      console.log(values);
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  function opcr() {
    localStorage.removeItem("token");
    navigate("/opcr");

    if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
    if (serverError)
      return (
        <h1 className="text-x1" text-red-500>
          {serverError.message}
        </h1>
      );
  }

  function messenger() {
    localStorage.removeItem("token");
    navigate("/messenger");

    if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
    if (serverError)
      return (
        <h1 className="text-x1" text-red-500>
          {serverError.message}
        </h1>
      );
  }

  function userLogout() {
    localStorage.removeItem("token");
    navigate("/");

    if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
    if (serverError)
      return (
        <h1 className="text-x1" text-red-500>
          {serverError.message}
        </h1>
      );
  }

  // function userMessenger() {
  //   navigate("/")
  // }
  return (
    // <div className="hidden lg:block lg:pl-80 h-full">
    //   <EmptyState />
    // </div>

    // <div>
    //   {" "}
    //   <img
    //     // src={apiData?.profile || file || avatar}
    //     // className={styles.profile_img}
    //     alt="avatar"
    //   ></img>
    //   <Link to="/messenger">
    //     <img src="messenger-icon.png" alt="Messenger Icon" />
    //   </Link>
    //   <p>
    //     {apiData?.firstName} {apiData?.lastName}
    //   </p>
    //   <div>
    //     {" "}
    //     Hello<p>{apiData?.email || "Email"}</p>
    //   </div>
    //   <div className="text-center py-4">
    //     <span className="text-gray-500 ">
    //       come back later?
    //       <button onClick={userLogout} className="text-red-500 ml-2" to="/">
    //         Logout{" "}
    //       </button>
    //     </span>
    //   </div>
    // </div>

    <section>
      <div className="profile_container">
        <header className="profile_header">
          <img src={pdologo} className="pdologo"></img>

          <div className="button_container">
            <div className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <nav className={`menu ${isOpen ? 'active' : ''}`}>
              <ul>
                <li><button onClick={opcr} className="text-white-500 ml-2" to="/opcr">
                  OPCR{" "}
                </button>
                </li>

                <li>
                  <button onClick={messenger} className="text-white-500 ml-2" to="/Messenger">
                    Messenger{" "}
                  </button>
                </li>

                <li>
                  <button onClick={userLogout} className="text-white-500 ml-2" to="/">
                    Logout{" "}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <div className="profile_topbar">
          <div className="profile_topbar-container">
            <div className="profile_avatar flex justify-center">
              <label htmlFor="profile">
                <img
                  src={apiData?.profile || file || avatar}
                  className={styles.profile_img}
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
          </div>

          <div className="profile_topbar-container">
            <div className="profile_section1">
              {" "}
              <button type="submit">
                Connect
              </button>
              <button onClick={handleModalOpen}>
                Update
              </button>


              <p className="profile_name">
                {apiData?.firstName} {apiData?.lastName}
              </p>
              <p className="profile_username">
                {apiData?.username}
              </p>
              <p className="profile_connections">
                <i class="uil uil-users-alt"></i>Connections
              </p>
            </div>
          </div>

          <div className="profile_topbar-container">
            <div className="profile_details">
              <p className="profile_institution">
                <i class="uil uil-building"></i>Bulacan State University</p>
              <p className="profile_address">
                <i class="uil uil-location-point"></i>{apiData?.address}
              </p>
              <p className="profile_email">
                <i class="uil uil-envelope-alt"></i>{apiData?.email}
              </p>
            </div>
          </div>

          <div className="profile_topbar-container">
            <div className="profile_blank">

            </div>
          </div>
        </div>
      </div>

      {/* <Modal isOpen={isModalOpen} onRequestClose={handleModalClose}> */}

      <div className={`${styles.modalContainer} ${isModalOpen ? styles.open : ""}`}>
        <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={handleCloseModal}>
            X
          </button>
          <form className="py-1" onSubmit={formik.handleSubmit}>
          <div className="profile flex justify-center py-4">
            <label
              // class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              htmlFor="profile"
            // accept="image/*"
            >
              <img
                src={apiData?.profile || file || avatar}
                className={styles.profile_img}
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
          <div className="textbook flex flex-col items-center gap-6">
            <div className="name flex w-3/4 gap-10">
              <input
                {...formik.getFieldProps("firstName")}
                className={`${styles.textbox} ${extend.textbox} `}
                type="text"
                placeholder="FirstName"
              />
              <input
                {...formik.getFieldProps("lastName")}
                className={`${styles.textbox}  ${extend.textbox} `}
                type="text"
                placeholder="LastName"
              />
            </div>

            <div className="name flex w-3/4 gap-10">
              <input
                {...formik.getFieldProps("mobile")}
                className={`${styles.textbox}  ${extend.textbox} `}
                type="text"
                placeholder="Mobile No."
              />
              <input
                {...formik.getFieldProps("email")}
                className={`${styles.textbox}  ${extend.textbox} `}
                type="text"
                placeholder="Email*"
              />
            </div>

            <input
              {...formik.getFieldProps("address")}
              className={`${styles.textbox}  ${extend.textbox} `}
              type="text"
              placeholder="Address"
            />

            <button className={styles.modalbtn} type="submit">
              Update
            </button>
          </div>
        </form>
        </div>
      </div>
        
      {/* </Modal> */}
    </section>


  );
};

export default Profile;
