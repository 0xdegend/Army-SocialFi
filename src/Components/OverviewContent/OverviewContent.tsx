//@ts-nocheck
import React, { useState, useEffect } from "react";
import camoImage from "../../assets/images/camo-background.svg";
import twitterIcon from "../../assets/images/twitter-icon.svg";

import armyBadge from "../../assets/images/general-rank.PNG";
import telegramIcon from "../../assets/images/telegram-icon.svg";
import dexscreenerIcon from "../../assets/images/dexscreener.svg";
import coingeckoIcon from "../../assets/svg/coingecko.svg";
import cmcIcon from "../../assets/svg/cmc.webp";
import { usePrivy, useLinkAccount } from "@privy-io/react-auth";
import rankIcons from "../../utils/rankIcons";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import { store } from "../../app/store";
import { truncateWalletAddress } from "../../utils";
import ReUseModal from "../Modal/ReuseableModal";
import { FaTimes } from "react-icons/fa";
import ActionButton from "../utils/buttons/ActionButton";
import {
  claimWelcomePoints,
  getUserProfile,
  linkEvmWallet,
} from "../../utils/AuthSlice";
import { Spin } from "antd";
import SemiButton from "../utils/buttons/SemiButton";

const OverviewContent = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);
  const { user, ready, authenticated } = usePrivy();
  const [open, setOpen] = useState(false);
  const rankName = userData?.userMainData?.rank?.name;
  const [displayText, setDisplayText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [loopNum, setLoopNum] = useState<number>(0);
  const [linkingWallet, setLinkingWallet] = useState(false);
  const [walletLinked, setWalletLinked] = useState(false);
  const [confirmTweet, setConfirmTweet] = useState<boolean>(false);
  const [typingSpeed, setTypingSpeed] = useState<number>(50);
  const [isTypingActive, setIsTypingActive] = useState<boolean>(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const armyText = [
    `Welcome to Barrack, ${rankName}🪖`,
    "The Dev team left, but the community didn't.",
    "We didn’t falter—we picked up the banner, united, and kept building. 💪",
    "Welcome to the revolution.🫡",
    "Welcome to $ARMY.🪖",
    "The mission has just begun.🚀",
  ];

  useEffect(() => {
    if (!isTypingActive) return;

    const handleTyping = () => {
      if (!isDeleting && displayText === armyText[index]) {
        // Pause when typing is complete for the current string
        if (index === armyText.length - 1) {
          // If it's the last string, mark typing as complete
          setIsTypingActive(false);
          setIsTypingComplete(true);
        } else {
          setTimeout(() => setIsDeleting(true), 500);
        }
      } else if (isDeleting && displayText === "") {
        // Move to the next string
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % armyText.length);
      } else {
        const nextDisplayText = isDeleting
          ? armyText[index].substring(0, displayText.length - 1)
          : armyText[index].substring(0, displayText.length + 1);

        setDisplayText(nextDisplayText);

        if (!isDeleting && nextDisplayText === armyText[index]) {
          setTypingSpeed(500);
        } else {
          setTypingSpeed(isDeleting ? 30 : 50); // Typing and deleting speeds
        }
      }
    };

    const interval = setInterval(handleTyping, typingSpeed);

    return () => clearInterval(interval); // Cleanup interval
  }, [isDeleting, displayText, index, typingSpeed, isTypingActive]);

  const handleTweetLaunch = async () => {
    console.log();
    const data = {
      userID: `${userData?.userMainData?._id}`,
    };

    try {
      // Pre-fill tweet message
      const tweetMessage = `Just got recruited into the ARMY Barracks!,\n\nPacMoon is dead $ARMY Lives Forever!\n\nJoin me in the trenches with @onchainarmy https://onchainarmy.xyz/`;
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        tweetMessage
      )}`;
      const tweetWindow = window.open(tweetUrl, "_blank");

      if (tweetWindow) {
        tweetWindow.focus();

        // Poll for window closure
        const pollTimer = setInterval(() => {
          if (tweetWindow.closed) {
            clearInterval(pollTimer); // Stop polling
            console.log("Tweet window closed");

            // Set loading state before calling the endpoint
            setConfirmTweet(true);

            // Call the endpoint after the tweet window closes
            dispatch(claimWelcomePoints(data))
              .unwrap()
              .then((response) => {
                console.log("Claimed welcome points:", response);
              })
              .catch((error) => {
                console.log("Error claiming welcome points:", error);
              })
              .finally(() => {
                // Reset loading state after the endpoint call is complete
                setConfirmTweet(false);
              });
          }
        }, 500);
      } else {
        console.error("Failed to open tweet window.");
      }
    } catch (error) {
      console.log(error);
    }

    console.log("Tweeted");
    setConfirmTweet(false);
  };

  const { linkWallet } = useLinkAccount({
    onSuccess: async (res) => {
      console.log(res);
      const evmAddress = user?.linkedAccounts[2]?.address;
      const userInfo = userData?.userMainData?._id;
      const data = {
        userID: userInfo,
        address: {
          evm: evmAddress,
        },
      };

      setLinkingWallet(true);
      const response = await dispatch(linkEvmWallet(data)).unwrap();
      console.log("EVM wallet linked:", response);
      await dispatch(getUserProfile()).unwrap();
      setLinkingWallet(false);
    },
    onError: (error, details) => {
      console.log(error, details);
      // Any logic you'd like to execute after a user exits the link flow or there is an error
    },
  });

  useEffect(() => {
    console.log(ready);
    console.log(user);
  }, [ready, user]);
  //@ts-ignore
  const badgeSrc = rankIcons[rankName] || "path-to-default-badge.png";

  const isLinkedTrace = userData?.userMainData?.addresses?.length > 0;
  const buttonText = isLinkedTrace ? "Linked" : "Link Evm";
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
                {user?.linkedAccounts[1]?.address}
              </h5>
              <h5 className="mt-3 cursor-pointer font-soli text-[#F83726] truncate flex md:hidden ">
                {truncateWalletAddress(user?.linkedAccounts[1]?.address)}
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
          <div className="flex items-center flex-col">
            {userData?.userMainData?.bonusPointsAwarded ? (
              <></>
            ) : (
              <>
                <>
                  <p className="text-customYellow text-opacity-60 font-inconsolata text-[20px] mt-3 text-center mb-5">
                    Claim Your 100 $ARMY points
                  </p>
                </>
              </>
            )}
            <div className="flex items-center gap-4 mt-2">
              {userData?.userMainData?.bonusPointsAwarded ? (
                <></>
              ) : (
                <>
                  <button
                    className="font-soli button-56 "
                    onClick={() => {
                      setOpen(true);
                      setIsTypingActive(true);
                    }}
                    disabled={userData?.userMainData?.bonusPointsAwarded}
                  >
                    {userData?.userMainData?.bonusPointsAwarded
                      ? "Claimed"
                      : "Claim"}
                  </button>
                </>
              )}

              {/* Testing */}
              {/* <button
                className="font-soli button-56 "
                onClick={() => {
                  setOpen(true);
                  setIsTypingActive(true);
                }}
              >
                Claim
              </button> */}

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
              <SemiButton
                onPress={!linkingWallet ? linkWallet : undefined}
                text={buttonText}
                isLoading={linkingWallet}
                buttonType="sign-in-button"
                isValid={isLinkedTrace}
              />
            </div>
          </div>
        </div>
      </div>
      <ReUseModal open={open} setOpen={setOpen}>
        <div className="w-full flex flex-col">
          <div className="flex items-center justify-between">
            <h1 className="text-white font-inconsolata text-3xl mb-8 font-bold">
              Claim Points!
            </h1>
            <span
              className="text-secondary text-xl cursor-pointer"
              onClick={() => {
                setIsTypingActive(false);
                setOpen(false);
              }}
            >
              <FaTimes />
            </span>
          </div>
          <h1 className="text-white  text-xl sm:text-1xl  xl:text-2xl font-bold red-hat xl:leading-[40px]  ">
            <span className="text-white font-inconsolata">{displayText}</span>
            <span className="border-r-0 border-white text-white animate-blink font-inconsolata">
              _
            </span>
          </h1>
          {isTypingComplete && (
            <ActionButton
              isLoading={confirmTweet}
              isValid={confirmTweet}
              onPress={handleTweetLaunch}
              text={confirmTweet ? "Tweeting..." : "Tweet Now"}
              buttonType="sign-in-button"
            />
          )}
        </div>
      </ReUseModal>
    </div>
  );
};

export default OverviewContent;
