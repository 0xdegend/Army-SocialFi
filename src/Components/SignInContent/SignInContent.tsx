//@ts-nocheck
import React, { useEffect, useState } from "react";
import mainSoldier from "../../assets/images/onchain-sign-in-cto.PNG";
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
import { useAppDispatch } from "../../app/hook";
import {
  authenticateUser,
  getUserProfile,
  setUserData,
} from "../../utils/AuthSlice";
import { Spin } from "antd";

const SignInContent = () => {
  const dispatch = useAppDispatch();
  const ENCODED_TRUE = btoa("true");
  const ENCODED_FALSE = btoa("false");
  const [tokenBalance, setTokenBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const { connection } = useConnection();
  const navigate = useNavigate();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { linkWallet, login, user, ready, authenticated, logout } = usePrivy();

  const address = user?.linkedAccounts?.[1]?.address;
  //Getting ARMY Balance Implementation
  const armyAddress = "ARMYZt71GXq4vw4mtDs5LnEp4ZgwWKEE2CdMU3WNnFEC";
  const isWalletLinked = localStorage.getItem("walletLinked");
  const isUserExpired = localStorage.getItem("userAuth");
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
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
      console.log("Token balance:", parseInt(balance));
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
        setShouldFetchData(true);
        console.log(user);
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
        setIsWalletConnected(true);
      }
      setShouldFetchData(true);
      console.log(user);
    } catch (error) {
      console.error("Error signing in:", error);
      setIsWalletConnected(false);
    }
  };
  const fetchAndPostData = async () => {
    if (!user || !address) return;

    localStorage.setItem("walletLinked", ENCODED_TRUE);
    try {
      console.log("Fetching and posting data for user:", user);

      const balance = await getTokenBalance();
      const data = {
        address: address,
        twitterHandle: `${user?.twitter?.username}`,
        twitterUsername: user?.twitter?.name,
        balance: parseInt(balance),
      };
      setPageLoading(true);

      if (!isUserExpired || isUserExpired === "undefined") {
        const authResponse = await dispatch(authenticateUser(data)).unwrap();
        localStorage.setItem("userAuth", `${authResponse?.token}`);
        console.log("Authenticated User:", authResponse);
      } else {
        const profile = await dispatch(getUserProfile()).unwrap();
        console.log("Fetched Profile:", profile);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error in fetchAndPostData:", error);
      //logout();
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (shouldFetchData && user && address) {
      fetchAndPostData();
    } else if (user && address && isUserExpired) {
      navigate("/dashboard");
    }
  }, [user, address, shouldFetchData]);
  return (
    <div>
      {pageLoading && <Spin fullscreen />}
      <div className="flex justify-center items-center h-screen">
        <img
          src={soldierVector}
          alt=""
          className="absolute top-0 w-[80%] z-0"
        />
        <div className="flex justify-center items-center flex-col">
          <img
            src={mainSoldier}
            alt=""
            className="w-[75%] md:w-[60%] lg:w-1/2 xl:w-1/2 z-10"
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
                onClick={
                  user && address ? fetchAndPostData : handleConnectTwitter
                }
              >
                {!user
                  ? isUserExpired === ""
                    ? "X linked! Soldier, Sign in!"
                    : "Connect Twitter"
                  : !address
                  ? "X linked! Soldier, Link Wallet!"
                  : "X linked! Soldier, Sign in!"}

                {/* {!isUserExpired && !user
                  ? "X linked! Soldier, Sign in!" // If userAuth exists but no user
                  : user && !address
                  ? "X linked! Soldier, Link Wallet!" // If user exists but no wallet address
                  : user && address
                  ? "X linked! Soldier, Sign in!" // If user and address both exist
                  : user
                  ? "Connected" // If user exists but other conditions are false
                  : "Connect Twitter"}{" "} */}
              </button>

              {!isWalletLinked && !address && (
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
