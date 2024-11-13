import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { ISidebarButtonName } from "../../../types";

const SideBarButton: FC<{ name: ISidebarButtonName; url: string }> = ({
  name,
  url,
}) => {
  const location = useLocation();

  return (
    <>
      {name ? (
        <Link
          to={`/${url}`}
          className={`text-white font-soli text-[14px] capitalize transition-all duration-75 ${
            location.pathname === `/${url}`
              ? "bg-[#4B5320] text-opacity-100"
              : "text-opacity-50"
          } flex items-center gap-2 px-2 rounded-[8px] h-[50px]`}
        >
          <span
            className={`${
              location.pathname === `/${url}` ? "opacity-100" : "opacity-50"
            }`}
          ></span>
          <span>{name}</span>
        </Link>
      ) : null}
    </>
  );
};

export default SideBarButton;
