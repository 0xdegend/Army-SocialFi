import React from "react";
import camoImage from "../../assets/images/camo-background.svg";
import twitterIcon from "../../assets/images/twitter-icon.svg";
import telegramIcon from "../../assets/images/telegram-icon.svg";
import dexscreenerIcon from "../../assets/images/dexscreener.svg";
import { usePrivy } from "@privy-io/react-auth";
const OverviewContent = () => {
  const { user } = usePrivy();
  return (
    <div className="bg-[#1D2211] p-5 relative clip-top-left-bottom-right">
      <img
        src={camoImage}
        alt="Army Camo"
        className="absolute top-2.5 w-[50%] right-0"
      />
      <div className="mx-auto flex justify-between mt-5">
        <div className="flex gap-5">
          <div className="h-[100px] w-[100px] rounded-[50%] bg-[#68604B] flex justify-center items-center">
            <div className="h-[90px] w-[90px] rounded-[50%] bg-[#E1DDCC] flex justify-center items-center">
              <img
                className="w-[70px] h-[70px] rounded-[50%]"
                src={`${user?.twitter?.profilePictureUrl} `}
                alt="Twitter Profile"
              />
            </div>
          </div>
          <div>
            <h5 className="font-soli text-[24px] text-white mt-5 capitalize">
              Gm,{" "}
              <span className="text-[#FFED41] capitalize">{`${user?.twitter?.name}`}</span>
            </h5>
            <h5 className="mt-3 cursor-pointer font-soli text-[#F83726]">
              {user?.wallet?.address}
            </h5>
          </div>
        </div>
        <div className="socials flex flex-col gap-2 justify-center items-center z-10">
          <div className="flex gap-5">
            <div>
              <a
                href="https://x.com/onchainarmy"
                target="_blank"
                rel="noreferrer"
              >
                <img src={twitterIcon} alt="" className="w-[40px]" />
              </a>
            </div>
            <div>
              <a
                href="https://t.me/armyonchain"
                target="_blank"
                rel="noreferrer"
              >
                <img src={telegramIcon} alt="" className="w-[40px]" />
              </a>
            </div>
            <div>
              <a
                href="https://dexscreener.com/solana/ARMYZt71GXq4vw4mtDs5LnEp4ZgwWKEE2CdMU3WNnFEC"
                target="_blank"
                rel="noreferrer"
              >
                <img src={dexscreenerIcon} alt="" className="w-[40px]" />
              </a>
            </div>
          </div>
          <div>
            <button className="font-soli sign-in-button ">Buy $ARMY</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;
