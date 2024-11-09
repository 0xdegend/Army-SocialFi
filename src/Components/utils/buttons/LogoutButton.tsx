import React, { FC } from "react";
import { IButtonProps } from "../../../types";

interface ILogoutButtonProps extends IButtonProps {
  title: string;
}
const LogoutButton: FC<ILogoutButtonProps> = ({ title, text, onPress }) => {
  return (
    <button
      onClick={onPress}
      className={`font-soli capitalize transition-all duration-75   flex w-full justify-between items-center gap-2 px-2 rounded-[8px] h-[70px]`}
    >
      <div>
        <div>{title}</div>
        <div className="text-[15px] text-red-500">{text}</div>
      </div>
    </button>
  );
};

export default LogoutButton;
