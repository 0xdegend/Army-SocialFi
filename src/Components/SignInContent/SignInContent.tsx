// @ts-nocheck
import React, { useEffect, useState } from "react";
import mainSoldier from "../../assets/images/army-all-round.png";
import { usePrivy, useLogin } from "@privy-io/react-auth";
import arrowDown from "../../assets/images/arrow-down.svg";
import { useNavigate } from "react-router-dom";
import soldierVector from "../../assets/images/camo-background.svg";

const SignInContent = () => {
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
    <div>
      <div className="flex justify-center items-center h-screen">
        <img src={soldierVector} alt="" className="absolute top-0 w-[60%]" />
        <div className="flex justify-center items-center flex-col">
          <img
            src={mainSoldier}
            alt=""
            className="w-full md:w-1/2 lg:w-full xl:w-full"
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
                {user ? "Connected" : " Connect Twitter"}
              </button>
              <div className="flex justify-center items-center mt-2">
                <img src={arrowDown} alt="Arrow Down" className="w-[30px]" />
              </div>
              {!address && (
                <button
                  className="bg-red-600 text-white py-3 px-6 text-[25px] font-soli hover:bg-red-700 transition mt-5 sign-in-button"
                  onClick={handleSignIn}
                >
                  Link Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInContent;
