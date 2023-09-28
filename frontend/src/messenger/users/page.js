import React from "react";
import EmptyState from "../EmptyState.js";
import Sidebar from "../component/sidebar/Sidebar.js";

const Users = ({ children }) => {
  return (
    <div className="flex">
      <div className="lg:w-80">
        <Sidebar>{children}</Sidebar>
      </div>
      <div className="hidden lg:block lg:flex-1">
        <EmptyState />
      </div>
    </div>
  );
};

export default Users;
