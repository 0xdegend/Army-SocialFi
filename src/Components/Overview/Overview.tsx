import React from "react";
import WalletBallance from "../WalletBallance/WalletBallance";
import { usePrivy } from "@privy-io/react-auth";
const Overview = () => {
  const { user } = usePrivy();
  console.log(user);
  return (
    <div className="w-full">
      <WalletBallance />
      <div className="mx-auto flex flex-col justify-center items-center mt-10">
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-[90px] h-[90px] rounded-[50%]"
            src={`${user?.twitter?.profilePictureUrl} `}
            alt="Twitter Profile"
          />
          <h5 className="font-soli  text-[19px] text-white mt-8">
            Welcome back {`${user?.twitter?.name}`}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Overview;
