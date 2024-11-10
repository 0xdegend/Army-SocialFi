import React from "react";
import WalletBallance from "../WalletBallance/WalletBallance";
import { usePrivy } from "@privy-io/react-auth";
import OverviewContent from "../OverviewContent/OverviewContent";
const Overview = () => {
  const { user } = usePrivy();
  console.log(user);
  return (
    <div className="w-full">
      <WalletBallance />
      <OverviewContent />
    </div>
  );
};

export default Overview;
