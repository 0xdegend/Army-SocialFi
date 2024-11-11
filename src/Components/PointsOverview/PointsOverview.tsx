import React from "react";
import MainPointsOverview from "../MainPointsOverview/MainPointsOverview";
import Missions from "../Missions/Missions";

function PointsOverview() {
  return (
    <div className="flex justify-center items-center gap-5">
      <MainPointsOverview />
      <Missions />
    </div>
  );
}

export default PointsOverview;
