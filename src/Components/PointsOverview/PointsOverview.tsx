import React from "react";
import MainPointsOverview from "../MainPointsOverview/MainPointsOverview";
import Missions from "../Missions/Missions";
import LeaderboardTable from "../LeaderboardTable/LeaderboardTable";
import { generalLeaderBoardData } from "../../utils/mockData";
function PointsOverview() {
  return (
    <>
      <div className="flex justify-center items-center gap-5">
        <MainPointsOverview />
        <Missions />
      </div>
      <div className="mt-5">
        <LeaderboardTable data={generalLeaderBoardData} />
      </div>
    </>
  );
}

export default PointsOverview;
