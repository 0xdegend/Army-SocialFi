import React from "react";
import LeaderboardTable from "../../Components/LeaderboardTable/LeaderboardTable";
import WalletBallance from "../../Components/WalletBallance/WalletBallance";
import OverviewContent from "../../Components/OverviewContent/OverviewContent";

const Leaderboard = () => {
  return (
    <div>
      <OverviewContent />
      <LeaderboardTable />
    </div>
  );
};

export default Leaderboard;
