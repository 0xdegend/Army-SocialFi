import { useState } from "react";
import twitterIcon from "../assets/images/twitter-icon.svg";
import SideBar from "../Components/SideBar/SideBar";
import { usePrivy } from "@privy-io/react-auth";
import { FaBars } from "react-icons/fa";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";

import armyLogo from "../assets/images/soldier-asset-1.svg";
import SlideSidebar from "../Components/SideOverlay/SlideSideBar";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../Components/utils/buttons/LogoutButton";
import SideBarButton from "../Components/utils/buttons/SideBarButton";
import telegramIcon from "../assets/images/telegram-icon.svg";
import dexscreenerIcon from "../assets/images/dexscreener.svg";
import coingeckoIcon from "../assets/svg/coingecko.svg";
import cmcIcon from "../assets/svg/cmc.webp";
interface dashboard {
  children?: any;

  current: number;

}
const DashboardLayout = ({ children, current }: dashboard) => {
  const [open, setOpen] = useState(false);
    const buttonName = [
      {
        name: "dashboard",
        url: "dashboard",
      },
      {
        name: "leaderboard",
        url: "leaderboard",
      },
      {
        name: "campaigns",
        url: "campaigns",
      },
      // {
      //   name: "my points",
      //   url: "my-points",
      // },
      {
        name: "meme bank",
        url: "meme-bank",
      },
    ];
    const { logout } = usePrivy();
    const navigate = useNavigate();
    const handleLogout = () => {
      logout();
      navigate("/");
    };
  return (
    <>
      <div className="w-full flex flex-col overflow-y-hidden">
        <div className="w-full h-screen  relative   md:flex  ">
          <div className="hidden xl:flex xl:w-3/12 xl:max-w-[266px] border-r border-r-secondary border-opacity-50  ">
            <SideBar />
          </div>

          <div className=" w-full xl:w-9/12 flex flex-col flex-grow relative h-full flow-hide  ">
            {/* <HeadNav /> */}
            <div className="lg:hidden flex items-center w-full justify-between py-4 px-4 ">
              <div className="flex items-center">
                <span
                  className="text-customYellow text-2xl"
                  onClick={() => setOpen(!open)}
                >
                  <HiOutlineBars3BottomLeft />
                </span>
                <span>
                  <img src={armyLogo} alt="logo" className="w-[100px] h-auto" />
                </span>
              </div>
              <div className="flex items-center gap-2"></div>
              {/* {!open && (
                <span
                  onClick={() => setOpen(!open)}
                  className="text-customYellow"
                >
                  <FaBars />
                </span>
              )} */}
            </div>

            <div
              className={`w-full  flow-hide lg:px-4 px-4 ${
                current === 10 ? "bg-primary" : "general-bg"
              }  `}
            >
              {children}
            </div>
          </div>
        </div>
        {open && (
          <div className="w-full h-screen fixed   flex flex-col bg-transparent backdrop-blur-[2px] px-4">
            <div className="w-full h-16 " onClick={() => setOpen(false)}></div>
            <div className="w-full bg-primary p-4 rounded-md flex flex-col">
              <div className=" flex flex-col gap-y-6  w-full mt-8">
                <div>
                  {buttonName.map((item, i: number) => (
                    <SideBarButton key={i} name={item?.name} url={item?.url} />
                  ))}
                </div>
              </div>
              <LogoutButton onPress={handleLogout} text="Logout" title="" />
              <div className="flex gap-5 mt-6 justify-center">
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
                    <img
                      src={cmcIcon}
                      alt=""
                      className="lg:w-[40px] w-6 h-auto"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <SlideSidebar open={open} setOpen={setOpen} current={current} /> */}
    </>
  );
};

export default DashboardLayout;


