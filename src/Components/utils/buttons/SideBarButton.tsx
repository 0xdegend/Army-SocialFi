import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { ISidebarButtonName } from "../../../types";

const SideBarButton: FC<{ name: ISidebarButtonName }> = ({ name }) => {
  const location = useLocation();

  return (
    <>
      {name ? (
        <>
          <Link
            to={`/dashboard${name !== "dashboard" ? `/${name}` : ""}`}
            className={`text-white font-soli text-[14px] capitalize transition-all duration-75  ${
              location.pathname ===
              `/dashboard${name !== "dashboard" ? `/${name}` : ""}`
                ? "bg-[#4B5320] text-opacity-100"
                : "text-opacity-50"
            }  flex items-center gap-2 px-2 rounded-[8px] h-[50px]`}
          >
            <span
              className={`${
                location.pathname ===
                `/dashboard${name !== "dashboard" ? `/${name}` : ""}`
                  ? "opacity-100"
                  : "opacity-50"
              }`}
            ></span>
            <span>{name}</span>
          </Link>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SideBarButton;
