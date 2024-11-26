//@ts-nocheck
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import armyBackground from "../../assets/images/army-background.webp";
import SideBar from "../../Components/SideBar/SideBar";
import DashboardLayout from "../../layout/DashboardLayout";
import WalletBallance from "../../Components/WalletBallance/WalletBallance";
import { usePrivy } from "@privy-io/react-auth";
import OverviewContent from "../../Components/OverviewContent/OverviewContent";
import PointsOverview from "../../Components/PointsOverview/PointsOverview";
const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="w-full h-[100vh] flex flex-col  overflow-x-hidden">
        <WalletBallance />
        <div className=" lg:px-0">

        <OverviewContent />
        </div>
        <PointsOverview />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
