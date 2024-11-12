import React from "react";

function Missions() {
  return (
    <>
      <div className=" w-[45%] bg-[#1D2211] clip-top-left-bottom-right mt-10 p-10">
        <h1 className="font-soli text-[35px] text-[#FFF] mb-2">Your Mission</h1>
        <div className="flex justify-start items-center gap-10">
          <h5 className="text-[#FFED41] font-soli text-[16px]">BUY $ARMY</h5>
          <h5 className="text-[#FFF] font-soli text-[16px]">HODL $ARMY</h5>
          <h5 className="text-[#F83726] font-soli text-[16px]">JOIN $ARMY</h5>
          <h5 className="text-[#FFED41] font-soli text-[16px]">TWEET $ARMY</h5>
        </div>
      </div>
    </>
  );
}

export default Missions;
