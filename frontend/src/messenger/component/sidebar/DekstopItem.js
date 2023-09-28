import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

const DesktopItem = ({ label, icon: Icon, href, onClick, active }) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Link
        to={href}
        className={clsx(
          "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500",
          active
            ? "bg-gray-100 text-black"
            : "hover:text-black hover:bg-gray-100"
        )}
      >
        <Icon className="h-6 w-6 shrink-0"></Icon>
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
