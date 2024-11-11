import React from "react";

function MainPointsOverview() {
  return (
    <>
      <div className="w-[50%] bg-[#1D2211] clip-top-left-bottom-right mt-10 p-10 flex justify-center items-center gap-[60px]">
        <div>
          <h1 className="font-soli text-[30px] text-[#FFF]">$ARMY Points</h1>
          <p className="font-soli text-[25px] text-[#FFED41] mt-3">10,000</p>
        </div>
        <div className="multiplier">
          <h1 className="font-soli text-[30px] text-[#FFF]">Multiplier</h1>
          <p className="font-soli text-[25px] text-[#FFED41] mt-3">x5</p>
        </div>
        <div className="rank">
          <h1 className="font-soli text-[30px] text-[#FFF]">Rank</h1>
          <p className="font-soli text-[25px] text-[#F83726] mt-3 ">General</p>
        </div>
      </div>
    </>
  );
}

export default MainPointsOverview;
