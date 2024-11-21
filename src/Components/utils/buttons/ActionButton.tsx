import React from "react";
import { IButtonProps } from "../../../types";
import { Spin } from "antd";
const ActionButton: React.FC<IButtonProps> = ({
  onPress,
  text,
  isValid,
  isLoading,
  buttonType,
}) => {
  return (
    <button
      className={`${buttonType} w-[120px] mt-6 font-inconsolata cursor-pointer`}
      onClick={onPress}
      disabled={isValid}
    >
      {isLoading ? <Spin /> : text}
    </button>
  );
};

export default ActionButton;
