import React, { useState,useEffect } from "react";
import camoImage from "../../assets/images/camo-background.svg";
import twitterIcon from "../../assets/images/twitter-icon.svg";
//@ts-ignore
import armyBadge from "../../assets/images/general-rank.PNG";
import telegramIcon from "../../assets/images/telegram-icon.svg";
import dexscreenerIcon from "../../assets/images/dexscreener.svg";
import coingeckoIcon from "../../assets/svg/coingecko.svg";
import cmcIcon from "../../assets/svg/cmc.webp";
import { usePrivy } from "@privy-io/react-auth";
import rankIcons from "../../utils/rankIcons";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import { store } from "../../app/store";
import { truncateWalletAddress } from "../../utils";
import ReUseModal from "../Modal/ReuseableModal";
import { FaTimes } from "react-icons/fa";
import ActionButton from "../utils/buttons/ActionButton";
const langs = ["Yoruba", "English", "Spanish", "Hausa", "Igbo", "Chinese"];
const OverviewContent = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);
  const { user } = usePrivy();
  const [open, setOpen] = useState(false);
  const rankName = userData?.userMainData?.rank?.name;
   const [displayText, setDisplayText] = useState<string>("");
   const [index, setIndex] = useState<number>(0);
   const [isDeleting, setIsDeleting] = useState<boolean>(false);
   const [loopNum, setLoopNum] = useState<number>(0);
  const [typingSpeed, setTypingSpeed] = useState<number>(450);
    useEffect(() => {
      let typingTimeout: NodeJS.Timeout;

      if (!isDeleting && displayText === langs[index]) {
        typingTimeout = setTimeout(() => setIsDeleting(true), 1000); // Pause at end of word
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % langs.length); // Move to next language
      } else {
        typingTimeout = setTimeout(() => {
          const nextDisplayText = isDeleting
            ? langs[index].substring(0, displayText.length - 1)
            : langs[index].substring(0, displayText.length + 1);

          setDisplayText(nextDisplayText);

          if (!isDeleting && nextDisplayText === langs[index]) {
            setTypingSpeed(150); // Pause after typing the word
          } else {
            setTypingSpeed(isDeleting ? 75 : 150);
          }
        }, typingSpeed);
      }

      return () => clearTimeout(typingTimeout);
    }, [displayText, isDeleting, index, typingSpeed]);
 
  //@ts-ignore
  const badgeSrc = rankIcons[rankName] || "path-to-default-badge.png";
  return (
    <div className="bg-[#1D2211] p-5 relative clip-top-left-bottom-right ">
      <img
        src={camoImage}
        alt="Army Camo"
        className="absolute top-1 w-[50%] right-0"
      />
      <div className="mx-auto flex lg:justify-between lg:mt-5 flex-col lg:flex-row gap-8">
        <div className="flex gap-5">
          <div className="h-[100px] w-[100px] rounded-[50%] bg-[#68604B] flex justify-center items-center">
            <div className=" relative h-[90px] w-[90px] rounded-[50%] bg-[#E1DDCC] flex justify-center items-center">
              <img
                className="w-[70px] h-[70px] rounded-[50%]"
                src={`${user?.twitter?.profilePictureUrl} `}
                alt="Twitter Profile"
              />
              {/* OG Tag not in V 1.0 */}
              {/* <div className="absolute bottom-[-10px] h-[30px] w-[50px] bg-[#1D2211] flex justify-center items-center p-1 og-border-radius">
                <h5 className="text-center text-[20px] text-[#FFF] font-inconsolata font-extrabold">
                  OG
                </h5>
              </div> */}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <h5 className="font-soli text-[24px] text-white mt-5 capitalize">
                Gm,{" "}
                <span className="text-[#FFED41] capitalize">{`${user?.twitter?.name}`}</span>
              </h5>

              <img
                src={badgeSrc}
                alt={`${rankName} badge`}
                className="w-[45px] h-[38px]"
              />
            </div>
            <div className="flex">
              <h5 className="mt-3 cursor-pointer font-soli text-[#F83726] truncate hidden md:flex ">
                {user?.wallet?.address}
              </h5>
              <h5 className="mt-3 cursor-pointer font-soli text-[#F83726] truncate flex md:hidden ">
                {truncateWalletAddress(user?.wallet?.address)}
              </h5>
            </div>
          </div>
        </div>
        <div className="socials flex flex-col lg:gap-2 justify-center items-center z-10">
          <div className=" gap-5 hidden lg:flex">
            <div>
              <a
                href="https://x.com/onchainarmy"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={twitterIcon}
                  alt=""
                  className="lg:w-[40px] w-6 h-auto"
                />
              </a>
            </div>
            <div>
              <a
                href="https://t.me/armyonchain"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={telegramIcon}
                  alt=""
                  className="lg:w-[40px] w-6 h-auto"
                />
              </a>
            </div>
            <div>
              <a
                href="https://dexscreener.com/solana/ARMYZt71GXq4vw4mtDs5LnEp4ZgwWKEE2CdMU3WNnFEC"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={dexscreenerIcon}
                  alt=""
                  className="lg:w-[40px] w-6 h-auto"
                />
              </a>
            </div>
            <div>
              <a
                href="https://www.coingecko.com/en/coins/army"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={coingeckoIcon}
                  alt=""
                  className="lg:w-[40px] w-6 h-auto"
                />
              </a>
            </div>
            <div>
              <a
                href="https://coinmarketcap.com/currencies/army/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={cmcIcon} alt="" className="lg:w-[40px] w-6 h-auto" />
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <button
                className="font-soli sign-in-button "
                onClick={() => {
                  window.open(
                    "https://jup.ag/swap/SOL-ARMYZt71GXq4vw4mtDs5LnEp4ZgwWKEE2CdMU3WNnFEC",
                    "_blank"
                  );
                }}
              >
                Buy $ARMY
              </button>
              <button
                className="font-soli sign-in-button "
                onClick={() => setOpen(true)}
              >
                Claim
              </button>
            </div>
            <p className="text-customYellow text-opacity-60 font-inconsolata text-sm mt-3 text-center">
              Claim 100 points
            </p>
          </div>
        </div>
      </div>
      <ReUseModal open={open} setOpen={setOpen}>
        <div className="w-full flex flex-col">
          <div className="flex items-center justify-between">
            <h1 className="text-white font-inconsolata text-2xl">
              Claim Points
            </h1>
            <span
              className="text-secondary text-xl cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <FaTimes />
            </span>
          </div>
          <h1 className="text-white  text-xl sm:text-2xl  xl:text-3xl  font-bold red-hat xl:leading-[60px]  ">
             <span className="text-white">{displayText}</span>
            <span className="border-r-0 border-white text-white animate-blink">
              |
            </span>
        
          </h1>
          <button className="sign-in-button font-soli mt-6">
                Tweet Now
          </button>
        </div>
      </ReUseModal>
    </div>
  );
};

export default OverviewContent;
