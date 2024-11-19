import React, { useEffect } from "react";
import camoImage from "../../assets/images/camo-background.svg";
import twitterIcon from "../../assets/images/twitter-icon.svg";
//@ts-ignore
import armyBadge from "../../assets/images/general-rank.PNG";
import telegramIcon from "../../assets/images/telegram-icon.svg";
import dexscreenerIcon from "../../assets/images/dexscreener.svg";
import coingeckoIcon from "../../assets/svg/coingecko.svg";
import cmcIcon from "../../assets/svg/cmc.webp";
import { usePrivy } from "@privy-io/react-auth";

import { useAppSelector, useAppDispatch } from "../../app/hook";
import { store } from "../../app/store";

const OverviewContent = () => {
  const dispatch = useAppDispatch();
  const love = store.getState();
  console.log(love)
  const userData = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(userData);
  }, []);
  const { user } = usePrivy();
  return (
    <div className="bg-[#1D2211] p-5 relative clip-top-left-bottom-right">
      <img
        src={camoImage}
        alt="Army Camo"
        className="absolute top-1 w-[50%] right-0"
      />
      <div className="mx-auto flex justify-between mt-5">
        <div className="flex gap-5">
          <div className="h-[100px] w-[100px] rounded-[50%] bg-[#68604B] flex justify-center items-center">
            <div className=" relative h-[90px] w-[90px] rounded-[50%] bg-[#E1DDCC] flex justify-center items-center">
              <img
                className="w-[70px] h-[70px] rounded-[50%]"
                src={`${user?.twitter?.profilePictureUrl} `}
                alt="Twitter Profile"
              />
              <div className="absolute bottom-[-10px] h-[30px] w-[50px] bg-[#1D2211] flex justify-center items-center p-1 og-border-radius">
                <h5 className="text-center text-[20px] text-[#FFF] font-inconsolata font-extrabold">
                  OG
                </h5>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <h5 className="font-soli text-[24px] text-white mt-5 capitalize">
                Gm,{" "}
                <span className="text-[#FFED41] capitalize">{`${user?.twitter?.name}`}</span>
              </h5>
              <img src={armyBadge} alt="" className="w-[45px] h-[38px]" />
            </div>
            <div className="flex">
              <h5 className="mt-3 cursor-pointer font-soli text-[#F83726]">
                {user?.wallet?.address}
              </h5>
            </div>
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
            <div>
              <a
                href="https://www.coingecko.com/en/coins/army"
                target="_blank"
                rel="noreferrer"
              >
                <img src={coingeckoIcon} alt="" className="w-[40px]" />
              </a>
            </div>
            <div>
              <a
                href="https://coinmarketcap.com/currencies/army/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={cmcIcon} alt="" className="w-[40px]" />
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
