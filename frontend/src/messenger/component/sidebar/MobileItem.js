import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

const MobileItem = ({ href, icon: Icon, active, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      to={href}
      onClick={onClick}
      className={clsx(
        `
    group
    flex
    gap-x-3
    text-sm
    leadin-6
    font-semibold
    w-full
    justify-center
    p-4
    text-gray-500
    hover:text-black
    hover:bg-gray-100
    `,
        active && "bg-gray-100 text-black"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
