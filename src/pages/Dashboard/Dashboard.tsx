//@ts-nocheck
import React, { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../Components/SideBar/SideBar";
const Dashboard = () => {
  return (
    <>
      <div className="h-[100vh] overflow-hidden flex font-[Inter]">
        <div className="flex-1 bg-[#1E2211FF]">
          <SideBar />
        </div>
        <div className="flex-[6] overflow-scroll pt-10 pb-5 bg-[#F9FAFB]">
          <div className="w-[97%] mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
