import React from "react";
import mainSoldier from "../../assets/images/soldier-asset-1.svg";
import { usePrivy } from "@privy-io/react-auth";
const SignIn = () => {
  const { ready, authenticated, login } = usePrivy();
  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <img src={mainSoldier} alt="" />
        <button
          className="bg-red-600 text-white py-2 px-8 text-lg font-soli hover:bg-red-700 transition"
          onClick={login}
        >
          Sign In Soldier!
        </button>
      </div>
    </div>
  );
};

export default SignIn;
