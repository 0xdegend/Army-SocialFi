import React from "react";
import camoImage from "../../assets/images/camo-background.svg";
import { usePrivy } from "@privy-io/react-auth";
const OverviewContent = () => {
  const { user } = usePrivy();
  return (
    <div className="bg-[#1D2211] p-5 relative clip-top-left-bottom-right">
      <img
        src={camoImage}
        alt="Army Camo"
        className="absolute top-2.5 w-[50%] right-0"
      />
      <div className="mx-auto flex mt-5">
        <div className="flex gap-5">
          <div className="h-[100px] w-[100px] rounded-[50%] bg-[#68604B] flex justify-center items-center">
            <div className="h-[90px] w-[90px] rounded-[50%] bg-[#E1DDCC] flex justify-center items-center">
              <img
                className="w-[70px] h-[70px] rounded-[50%]"
                src={`${user?.twitter?.profilePictureUrl} `}
                alt="Twitter Profile"
              />
            </div>
          </div>
          <div>
            <h5 className="font-soli text-[24px] text-white mt-5 capitalize">
              Gm,{" "}
              <span className="text-[#FFED41] capitalize">{`${user?.twitter?.name}`}</span>
            </h5>
            <h5 className="mt-3 cursor-pointer font-soli text-[#F83726]">
              {user?.wallet?.address}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;
