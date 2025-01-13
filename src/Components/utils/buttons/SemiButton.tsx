import React from "react";
import { IButtonProps } from "../../../types";
import { Spin } from "antd";
const SemiButton: React.FC<IButtonProps> = ({
  onPress,
  text,
  isValid,
  isLoading,
  buttonType,
}) => {
  return (
    <button
      className={`${buttonType} w-[120px] font-inconsolata cursor-pointer`}
      onClick={onPress}
      disabled={isValid}
    >
      {isLoading ? <Spin /> : text}
    </button>
  );
};

export default SemiButton;
