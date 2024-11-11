import React from "react";
import WalletBallance from "../WalletBallance/WalletBallance";
import { usePrivy } from "@privy-io/react-auth";
import OverviewContent from "../OverviewContent/OverviewContent";
import PointsOverview from "../PointsOverview/PointsOverview";
const Overview = () => {
  const { user } = usePrivy();
  console.log(user);
  return (
    <div className="w-full">
      <WalletBallance />
      <OverviewContent />
      <PointsOverview />
    </div>
  );
};

export default Overview;
