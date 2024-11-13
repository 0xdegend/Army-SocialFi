/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import armyLogo from "../../assets/images/soldier-asset-1.svg";
import sampPic from "../../assets/png/samp-pic.png";
import { usePrivy } from "@privy-io/react-auth";
import LogoutButton from "../utils/buttons/LogoutButton";
import SideBarButton from "../utils/buttons/SideBarButton";


const styles = {
  active:
    "flex h-[36px] items-center gap-2 px-4 py-2 bg-[#f4f4f5] rounded-[4px] mb-2  ",
  inActive: "flex h-[36px] items-center gap-2 px-4 py-2 mb-2 cursor-pointer",
};

export default function SlideSidebar({ current, open, setOpen }: any) {
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
        {
          name: "my points",
          url: "my-points",
        },
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
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* @ts-ignore */}
          <Dialog.Overlay className="absolute inset-0" />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-[266px] bg-primary">
                <div className="w-full fixed top-0 left-0 bottom-0 h-screen flex flex-col     flow-hide   ">
                  <div className="w-full flex flex-col items-center relative px-4 ">
                    <div className="mt-6 flex start w-full">
                      <div className="flex items-center justify-between w-full ">
                        {/* <img
                          src={armyLogo}
                          alt="logo"
                          className="w-[120px] h-auto"
                        /> */}
                                              <p></p>
                        <span
                          className="cursor-pointer text-[32px] text-customYellow"
                          onClick={() => setOpen(false)}
                        >
                          <FaTimes />
                        </span>
                      </div>
                    </div>
                    <div className=" flex flex-col gap-y-6  w-full mt-8">
                      
                      <div>
                        {buttonName.map((item, i: number) => (
                          <SideBarButton
                            key={i}
                            name={item?.name}
                            url={item?.url}
                          />
                        ))}
                      </div>
                    </div>
                    <LogoutButton
                      onPress={handleLogout}
                      text="Logout"
                      title=""
                    />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
