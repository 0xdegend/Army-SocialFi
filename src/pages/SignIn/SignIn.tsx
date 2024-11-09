// @ts-nocheck
import React, { useEffect, useState } from "react";
import mainSoldier from "../../assets/images/soldier-asset-1.svg";
import { usePrivy, useLogin } from "@privy-io/react-auth";
import { useSolanaWallets } from "@privy-io/react-auth/solana";
import soldierVector from "../../assets/images/camo-background.svg";
import { useNavigate } from "react-router-dom";
import CreateCollection from "../../Components/CreateCollection/CreateCollection";

const SignIn = () => {
  const navigate = useNavigate();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { linkWallet, login, logout, user } = usePrivy();
  const address = user?.wallet?.address;
  const handleConnectTwitter = async () => {
    try {
      await login({ loginMethods: ["twitter"] });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  const handleSignIn = async () => {
    try {
      await linkWallet({ loginMethods: ["wallet"], chains: ["solana"] });
      setIsWalletConnected(true);
      navigate("/dashboard");
      console.log(user);
    } catch (error) {
      setIsWalletConnected(false);
      console.error("Error signing in:", error);
    }
  };

  useEffect(() => {
    if (user && address) {
      navigate("/dashboard");
    }
  }, [user, address]);

  return (
    <div className="flex justify-center items-center h-screen">
      <img src={soldierVector} alt="" className="absolute top-0 w-[70%]" />
      <div className="flex justify-center items-center flex-col">
        <img
          src={mainSoldier}
          alt=""
          className="w-full md:w-1/2 lg:w-full xl:w-full"
        />
        <button
          className="bg-red-600 text-white py-3 px-6 text-[25px] font-soli hover:bg-red-700 transition mt-10 clip-button"
          onClick={handleConnectTwitter}
        >
          {user ? "Connected" : " Connect Twitter"}
        </button>
        <button
          className="bg-red-600 text-white py-3 px-6 text-[25px] font-soli hover:bg-red-700 transition mt-10 clip-button"
          onClick={handleSignIn}
        >
          {address ? "Connected" : " Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
