import React from "react";
import { IButtonProps } from "../../../types";
import { Spin } from "antd";
const ActionButton: React.FC<IButtonProps> = ({
  onPress,
  text,
  isValid,
  isLoading,
}) => {
  return (
    <button
      className={`sign-in-button w-[80px] mt-6 font-inconsolata cursor-pointer`}
      onClick={onPress}
      disabled={isValid}
    >
      {isLoading ? <Spin /> : text}
    </button>
  );
};

export default ActionButton;
