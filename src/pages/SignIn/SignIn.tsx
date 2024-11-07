// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
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
  const { wallets } = useSolanaWallets();
  const wallet = wallets[0];
  const address = wallet?.address;
  //const message = "This is the message I am signing";
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
      navigate("/profile");
      console.log(user);
    } catch (error) {
      setIsWalletConnected(false);
      console.error("Error signing:", error);
    }
  };

  // const handleMessage = async () => {
  //   try {
  //     if (!wallet) throw new Error("Wallet not found.");
  //     const signature = await wallet.signMessage(
  //       new TextEncoder().encode(message)
  //     );
  //     console.log("Message signed with signature:", signature);
  //   } catch (error) {
  //     console.error("Error signing message:", error);
  //   }
  // };

  useEffect(() => {
    console.log("isWalletConnected:", isWalletConnected);
    console.log("address:", address);
    if (user && address) {
      navigate("/profile");
    }
  }, [isWalletConnected, address]);

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
          onClick={address ? logout : handleSignIn}
        >
          {address ? "Connected" : " Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
