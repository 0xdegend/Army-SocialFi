import React from "react";
import camoImage from "../../assets/images/camo-background.svg";
import { usePrivy } from "@privy-io/react-auth";
const OverviewContent = () => {
  const { user } = usePrivy();
  return (
    <div className="bg-[#1D2211] p-3 relative clip-top-left-bottom-right">
      <img
        src={camoImage}
        alt="Army Camo"
        className="absolute top-0 w-[40%] right-0"
      />
      <div className="mx-auto flex flex-col justify-center items-center mt-10">
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-[70px] h-[70px] rounded-[50%]"
            src={`${user?.twitter?.profilePictureUrl} `}
            alt="Twitter Profile"
          />
          <h5 className="font-soli  text-[19px] text-white mt-7">
            Gm, General {`${user?.twitter?.name}`}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;
