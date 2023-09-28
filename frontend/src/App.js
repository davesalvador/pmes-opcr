import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";

/**import all components */
import Username from "./components/Username";
import Reset from "./components/Reset";
import Register from "./components/Register";
import Recovery from "./components/Recovery";
import Profile from "./components/Profile";
import Password from "./components/Password";
import PageNotFound from "./components/PageNotFound";

/*Messenger route*/
import Messenger from "./messenger/messenger.js";

/**root routes */

export default function App() {
  const [isSignup, setIsSignup] = useState(false);

  const handleToggle = () => {
    setIsSignup((prevState) => !prevState);
    router.navigate(isSignup ? "/" : "/register");
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="body">
          <div className={`cont ${isSignup ? "s--signup" : ""}`}>
            <div className="form sign-in">
              <Username />
            </div>
            <div className="sub-cont">
              <div className="img">
                <div className="img__text m--up">
                  <h2>New here?</h2>
                  <p>Sign up and discover great amount of new opportunities!</p>
                </div>
                <div className="img__text m--in">
                  <h2>One of us?</h2>
                  <p>
                    If you already have an account, just sign in. We've missed
                    you!
                  </p>
                </div>
                <div className="img__btn" onClick={handleToggle}>
                  <span className={`m--up ${isSignup ? "" : "active"}`}>
                    Sign Up
                  </span>
                  <span className={`m--in ${isSignup ? "active" : ""}`}>
                    Sign In
                  </span>
                </div>
              </div>
              <div className="form sign-up">
                <Register isSignup={isSignup} />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      path: "/register",
      element: (
        <div className="body">
          <div className={`cont s--signup`}>
            <div className="form sign-in">
              <Username />
            </div>
            <div className="sub-cont">
              <div className="img">
                <div className="img__text m--up">
                  <h2>New here?</h2>
                  <p>Sign up and discover great amount of new opportunities!</p>
                </div>
                <div className="img__text m--in">
                  <h2>One of us?</h2>
                  <p>
                    If you already have an account, just sign in. We've missed
                    you!
                  </p>
                </div>
                <div className="img__btn" onClick={handleToggle}>
                  <span className={`m--up ${isSignup ? "" : "active"}`}>
                    Sign Up
                  </span>
                  <span className={`m--in ${isSignup ? "active" : ""}`}>
                    Sign In
                  </span>
                </div>
              </div>
              <div className="form sign-up">
                <Register isSignup={isSignup} />
              </div>
            </div>
          </div>
        </div>
      ),
    },

    {
      path: "/password",
      element: (
        <div className="body">
          <div className={`cont ${isSignup ? "s--signup" : ""}`}>
            <div className="form sign-in">
              <ProtectRoute>
                {" "}
                <Password />{" "}
              </ProtectRoute>
            </div>
            <div className="sub-cont">
              <div className="img">
                <div className="img__text m--up">
                  <h2>New here?</h2>
                  <p>Sign up and discover great amount of new opportunities!</p>
                </div>
                <div className="img__text m--in">
                  <h2>One of us?</h2>
                  <p>
                    If you already have an account, just sign in. We've missed
                    you!
                  </p>
                </div>
                <div className="img__btn" onClick={handleToggle}>
                  <span className={`m--up ${isSignup ? "" : "active"}`}>
                    Sign Up
                  </span>
                  <span className={`m--in ${isSignup ? "active" : ""}`}>
                    Sign In
                  </span>
                </div>
              </div>
              <div className="form sign-up">
                <Register isSignup={isSignup} />
              </div>
            </div>
          </div>
        </div>
      ),
    },

    {
      path: "/profile",
      element: (
        <AuthorizeUser>
          <Profile />
        </AuthorizeUser>
      ),
    },

    {
      path: "/messenger",
      element: <Messenger />,
    },
  ]);
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}
