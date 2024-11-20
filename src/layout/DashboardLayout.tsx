import { useState } from "react";

import SideBar from "../Components/SideBar/SideBar";

import { FaBars } from "react-icons/fa";

import armyLogo from "../assets/images/soldier-asset-1.svg";
import SlideSidebar from "../Components/SideOverlay/SlideSideBar";
interface dashboard {
  children?: any;

  current: number;

}
const DashboardLayout = ({ children, current }: dashboard) => {
  const [open, setOpen] = useState(false);

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
              <span>
                <img src={armyLogo} alt="logo" className="w-[100px] h-auto" />
              </span>
              {!open && (
                <span onClick={() => setOpen(!open)} className="text-customYellow">
                  <FaBars />
                </span>
              )}
            </div>

            <div className={`w-full  flow-hide lg:px-4 ${current === 10 ? "bg-primary" : "general-bg"}  `}>{children}</div>
          </div>
        </div>
      </div>
      <SlideSidebar open={open} setOpen={setOpen} current={current} />
    </>
  );
};

export default DashboardLayout;
