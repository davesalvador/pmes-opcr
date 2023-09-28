import React from "react";
import Sidebar from "../component/sidebar/Sidebar.js";

const UsersLayout = ({ children }) => {
  return (
    <Sidebar>
      <div>{children}</div>
    </Sidebar>
  );
};

export default UsersLayout;
