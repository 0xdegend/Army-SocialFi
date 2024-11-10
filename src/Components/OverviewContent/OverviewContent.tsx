import React from "react";
import { usePrivy } from "@privy-io/react-auth";
const OverviewContent = () => {
  const { user } = usePrivy();
  return (
    <div>
      <div className="mx-auto flex flex-col justify-center items-center mt-10">
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-[70px] h-[70px] rounded-[50%]"
            src={`${user?.twitter?.profilePictureUrl} `}
            alt="Twitter Profile"
          />
          <h5 className="font-soli  text-[19px] text-white mt-7">
            Gm, {`${user?.twitter?.name}`}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;
