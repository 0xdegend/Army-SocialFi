// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import mainSoldier from "../../assets/images/soldier-asset-1.svg";
import { usePrivy, useLogin } from "@privy-io/react-auth";
import { useSolanaWallets } from "@privy-io/react-auth/solana";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import soldierVector from "../../assets/images/camo-background.svg";
import {
  getAssociatedTokenAddress,
  getAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as bigInt from "big-integer";

if (!window.Buffer) {
  window.Buffer = Buffer;
}
const SignIn = () => {
  const { connection } = useConnection();
  const [solHolding, setSolHolding] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const armyAddress = "ARMYZt71GXq4vw4mtDs5LnEp4ZgwWKEE2CdMU3WNnFEC";
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { connectWallet } = usePrivy();
  const { wallets } = useSolanaWallets();
  const wallet = wallets[0];
  const address = wallet?.address;
  //const message = "This is the message I am signing";

  const handleSignIn = async () => {
    try {
      await connectWallet();
      setIsWalletConnected(true);
    } catch (error) {
      console.error("Error signing in:", error);
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

  // useEffect(() => {
  //   if (isWalletConnected && address) {
  //     handleMessage();
  //   }
  // }, [isWalletConnected, address]);

  useEffect(() => {
    if (!connection || !address) return;

    try {
      const publicKey = new PublicKey(address); // Convert address to PublicKey

      setLoading(true);
      connection
        .getAccountInfo(publicKey)
        .then((info) => {
          setSolHolding(info ? info.lamports / LAMPORTS_PER_SOL : 0);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching account info:", error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Invalid public key format:", error);
    }
  }, [connection, address]);

  useEffect(() => {
    const getTokenBalance = async () => {
      if (!address) return;

      try {
        const publicKey = new PublicKey(address); // Convert address to PublicKey
        const tokenPublicKey = new PublicKey(armyAddress);
        const associatedTokenAddress = await getAssociatedTokenAddress(
          tokenPublicKey,
          publicKey
        );

        const tokenAccount = await getAccount(
          connection,
          associatedTokenAddress
        );
        const tokenAmount = bigInt(tokenAccount.amount);

        setTokenBalance(tokenAmount / 1000000);
      } catch (error) {
        console.error("Error fetching token balance", error);
        setTokenBalance(null);
      }
    };

    getTokenBalance();
  }, [address, connection]);

  const formatTokenBalance = (balance) => {
    if (balance === null) return "Loading...";
    if (balance >= 1_000_000) {
      return `${(balance / 1_000_000).toFixed(1)}M $ARMY`;
    } else if (balance >= 1_000) {
      return `${(balance / 1_000).toFixed(1)}K $ARMY`;
    } else {
      return `${balance.toFixed(2)} $ARMY`;
    }
  };
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
          {address ? address : " Sign in Soldier!"}
        </button>

        {address && (
          <div className="flex flex-col gap-4 mt-4">
            <p className="text-white text-[25px] font-soli">
              Balance:{" "}
              {solHolding ? `${solHolding.toFixed(2)} SOL` : "Loading..."}
            </p>

            <p className="text-white text-[25px] font-soli">
              $ARMY Balance:{" "}
              {tokenBalance ? formatTokenBalance(tokenBalance) : "Loading.."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
