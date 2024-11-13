import React from "react";
import MainPointsOverview from "../MainPointsOverview/MainPointsOverview";
import Missions from "../Missions/Missions";
import LeaderboardTable from "../LeaderboardTable/LeaderboardTable";
import { generalLeaderBoardData } from "../../utils/mockData";
function PointsOverview() {
  return (
    <>
      <div className="flex justify-around items-center">
        <MainPointsOverview />
        <Missions />
      </div>
      <div className="mt-5 pb-4">
        <LeaderboardTable data={generalLeaderBoardData} />
      </div>
    </>
  );
}

export default PointsOverview;
