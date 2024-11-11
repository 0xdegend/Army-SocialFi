import React from "react";
import MainPointsOverview from "../MainPointsOverview/MainPointsOverview";

function PointsOverview() {
  return (
    <div className="flex justify-center items-center gap-5">
      <MainPointsOverview />
      <div className=" w-[50%] bg-[#1D2211] clip-top-left-bottom-right mt-10 p-10">
        <h1 className="font-soli text-[35px] text-[#FFF]">Missions</h1>
      </div>
    </div>
  );
}

export default PointsOverview;
