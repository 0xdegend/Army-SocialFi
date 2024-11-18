//@ts-nocheck
import React, { useEffect, useState } from "react";
import mainSoldier from "../../assets/images/army-all-round.png";
import { usePrivy, useLogin } from "@privy-io/react-auth";
import arrowDown from "../../assets/images/arrow-down.svg";
import { useNavigate } from "react-router-dom";
import soldierVector from "../../assets/images/camo-background.svg";
import {
  getAssociatedTokenAddress,
  getAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as bigInt from "big-integer";
import { APIService } from "../../utils/APIService";
import { useDispatch } from "react-redux";
import { setUserData } from "../../utils/AuthSlice";

const SignInContent = () => {
  const dispatch = useDispatch();
  const ENCODED_TRUE = btoa("true");
  const ENCODED_FALSE = btoa("false");
  const [tokenBalance, setTokenBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const { connection } = useConnection();
  const navigate = useNavigate();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { linkWallet, login, user, ready, authenticated } = usePrivy();

  const address = user?.wallet?.address;
  //Getting ARMY Balance Implementation
  const armyAddress = "ARMYZt71GXq4vw4mtDs5LnEp4ZgwWKEE2CdMU3WNnFEC";
  const isWalletLinked = localStorage.getItem("walletLinked");
  let armyBalance = 0;
  // Set address when user is authenticated
  const getTokenBalance = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const publicKey = new PublicKey(address); // Convert address to PublicKey
      const tokenPublicKey = new PublicKey(armyAddress);
      const associatedTokenAddress = await getAssociatedTokenAddress(
        tokenPublicKey,
        publicKey
      );

      const tokenAccount = await getAccount(connection, associatedTokenAddress);
      //@ts-ignore
      const tokenAmount = bigInt(tokenAccount.amount);
      const balance = tokenAmount / 1_000_000;
      armyBalance = balance;
      setTokenBalance(tokenAmount / 1000000);
      console.log("Token balance:", balance);
      return balance;
    } catch (error) {
      console.error("Error fetching token balance", error);
      setTokenBalance(0);
      return 0;
    } finally {
      setLoading(false);
    }
  };
  const handleConnectTwitter = async () => {
    try {
      if (isWalletLinked === ENCODED_TRUE) {
        //@ts-ignore
        await login({ loginMethods: ["wallet"], chains: ["solana"] });
        console.log(user);
        if (ready && authenticated) {
          //const balance = await getTokenBalance(); // Wait for the result
          console.log("Fetched balance:", balance);
          navigate("/dashboard");
        } else {
          console.error("User not authenticated");
        }
      } else {
        await login({ loginMethods: ["twitter"] });
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignIn = async () => {
    try {
      if (isWalletLinked === ENCODED_TRUE) {
        //@ts-ignore
        await login({ loginMethods: ["wallet"], chains: ["solana"] });
      } else {
        //@ts-ignore
        await linkWallet({ loginMethods: ["wallet"], chains: ["solana"] });
        localStorage.setItem("walletLinked", ENCODED_TRUE);
        setIsWalletConnected(true);
      }
      console.log(user);
    } catch (error) {
      setIsWalletConnected(false);
      console.error("Error signing in:", error);
    }
  };

  useEffect(() => {
    const fetchAndPostData = async () => {
      if (user && address) {
        try {
          console.log("User in useEffect:", user);
          const balance = await getTokenBalance();
          const result = await APIService.post(`/user`, {
            address: address,
            twitterHandle: `@${user?.twitter?.username}`,
            twitterUsername: user?.twitter?.name,
            balance: balance,
          });
          console.log("API response:", result);

          dispatch(
            setUserData({
              user,
              address,
              balance,
              apiResponse: JSON.stringify(result, null, 2),
            })
          );
          console.log("Token balance in useEffect:", balance);
          console.log("Global balance in useEffect:", armyBalance); // Log the global balance if needed
          navigate("/dashboard");
        } catch (error) {
          console.error("Error in fetchAndPostData:", error);
        }
      }
    };

    fetchAndPostData(); // Call the async function
  }, [user, address, armyBalance, dispatch]); // Include armyBalance only if necessary
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <img
          src={soldierVector}
          alt=""
          className="absolute top-0 w-[60%] z-0"
        />
        <div className="flex justify-center items-center flex-col">
          <img
            src={mainSoldier}
            alt=""
            className="w-full md:w-1/2 lg:w-full xl:w-full z-10"
          />
          <div className="sign-in-steps">
            <h4 className="font-soli text-white text-[30px] font-bold mt-1">
              Follow these steps
            </h4>
            <div className="flex justify-center items-center">
              <img src={arrowDown} alt="Arrow Down" className="w-[30px]" />
            </div>
            <div className="flex flex-col">
              <button
                className="bg-red-600 text-white py-3 px-6 text-[25px] hover:bg-red-700 transition mt-10 sign-in-button font-soli"
                onClick={handleConnectTwitter}
              >
                {user
                  ? "Connected"
                  : isWalletLinked
                  ? "Sign In Soldier!"
                  : "Connect Twitter"}
              </button>
              {!isWalletLinked && (
                <>
                  <div className="flex justify-center items-center mt-2">
                    <img
                      src={arrowDown}
                      alt="Arrow Down"
                      className="w-[30px]"
                    />
                  </div>
                  {!address && (
                    <button
                      className="bg-red-600 text-white py-3 px-6 text-[25px] font-soli hover:bg-red-700 transition mt-5 sign-in-button"
                      onClick={handleSignIn}
                    >
                      Link Wallet
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInContent;
