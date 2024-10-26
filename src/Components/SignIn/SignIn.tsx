// @ts-nocheck
import React, { useEffect, useState } from "react";
import mainSoldier from "../../assets/images/soldier-asset-1.svg";
import { usePrivy, useLogin } from "@privy-io/react-auth";
import { useSolanaWallets } from "@privy-io/react-auth/solana";
import soldierVector from "../../assets/images/camo-background.svg";
const SignIn = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { ready, authenticated, connectWallet, user } = usePrivy();

  const { wallets } = useSolanaWallets();
  const wallet = wallets[0];
  const address = wallet?.address;

  const message = "This is the message I am signing";
  const handleSignIn = async () => {
    try {
      // Ensure the wallet is connected
      await connectWallet();
      setIsWalletConnected(true);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleMessage = async () => {
    try {
      if (!wallet) {
        throw new Error("Wallet not found.");
      }
      const signature = await wallet.signMessage(
        new TextEncoder().encode(message)
      );
      console.log("Message signed with signature:", signature);
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

  useEffect(() => {
    // Only call handleMessage if the wallet is connected and the address is available
    if (isWalletConnected && address) {
      handleMessage();
    }
  }, [isWalletConnected, address]);

  //   if (wallet) {
  //     const { signature } = await wallet?.address.signMessage(
  //       new TextEncoder().encode(message)
  //     );
  //     console.log(signature);
  //   } else {
  //     console.log("No wallet connected");
  //   }
  //console.log(signature);
  return (
    <div className="flex justify-center items-center h-screen">
      <img src={soldierVector} alt="" className="absolute top-0 w-[80%]" />
      <div className="flex justify-center items-center flex-col">
        <img
          src={mainSoldier}
          alt=""
          className="w-full md:w-1/2 lg:w-full xl:w-full"
        />
        <button
          className="bg-red-600 text-white py-4 px-8 text-[25px] font-soli hover:bg-red-700 transition mt-10 clip-button"
          onClick={handleSignIn}
        >
          {wallets && wallets[0]?.address
            ? wallets[0]?.address
            : " Sign in Soldier!"}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
