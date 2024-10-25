import React from "react";
import mainSoldier from "../../assets/images/soldier-asset-1.svg";
import { usePrivy } from "@privy-io/react-auth";
import soldierVector from "../../assets/images/camo-background.svg";
const SignIn = () => {
  const { ready, authenticated, login, connectWallet } = usePrivy();
  return (
    <div className="flex justify-center items-center h-screen">
      <img src={soldierVector} alt="" className="absolute top-0" />
      <div className="flex justify-center items-center flex-col">
        <img
          src={mainSoldier}
          alt=""
          className="w-full md:w-1/2 lg:w-full xl:w-full"
        />
        <button
          className="bg-red-600 text-white py-4 px-8 text-[25px] font-soli hover:bg-red-700 transition mt-10 clip-button"
          onClick={() => connectWallet({ walletList: ["detected_wallets"] })}
        >
          Sign in Soldier!
        </button>
      </div>
    </div>
  );
};

export default SignIn;
