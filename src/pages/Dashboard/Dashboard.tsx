//@ts-nocheck
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import armyBackground from "../../assets/images/army-background.webp";
import SideBar from "../../Components/SideBar/SideBar";
const Dashboard = () => {
  return (
    <>
      <div className="h-[100vh] overflow-hidden flex ">
        <div className="flex-1 bg-[#1E2211FF]">
          <SideBar />
        </div>
        <div
          className={` bg-cover bg-center h-screen flex-[6]  pt-10 pb-5 bg-[#F9FAFB]`}
          style={{
            backgroundImage: `url(${armyBackground})`,
          }}
        >
          <div className="w-[97%] mx-auto ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
