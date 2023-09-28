// import React from "react"

// async function Sidebar({children} : {
//     children : React.ReactNode
// }) {
// return (
//     <div className="h-full">
//         {/* <DesktopSideBar /> */}
//         <main className="lg:pl-20 h-full">
//     {children}</main>
//     </div>
// )
// }

// export default Sidebar

// import React from "react";
// import DesktopSideBar from "./DesktopSidebar.js";

// const Sidebar = ({ children }) => {
//   return React.createElement(
//     "div",
//     { className: "sidebar" },
//     React.createElement(DesktopSideBar, null),
//     React.createElement("main", { className: "lg:pl-20 h-full" }, children)
//   );
// };

// export default Sidebar;

import React from "react";
import DesktopSideBar from "./DesktopSidebar.js";
import MobileFooter from "./MobileFooter.js";

const Sidebar = ({ children }) => {
  return (
    <div className="sidebar">
      <DesktopSideBar />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
};

export default Sidebar;
