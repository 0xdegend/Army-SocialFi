import {useState} from "react";
import ReUseModal from "../Modal/ReuseableModal";
function Missions() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className=" w-[45%] bg-[#1D2211] clip-top-left-bottom-right mt-10 p-10">
        <h1 className="font-soli text-[35px] text-[#FFF] mb-2">Your Mission</h1>
        {isAdmin && (
          <div className="flex justify-start items-center gap-10">
            <button className="sign-in-button font-soli cursor-pointer" onClick={() => setOpen(true)}>Create Campaign</button>
           
          </div>
        )}
        {!isAdmin && (
          <div className="flex justify-start items-center gap-10">
            <h5 className="text-[#FFED41] font-soli text-[16px]">BUY $ARMY</h5>
            <h5 className="text-[#FFF] font-soli text-[16px]">HODL $ARMY</h5>
            <h5 className="text-[#F83726] font-soli text-[16px]">JOIN $ARMY</h5>
            <h5 className="text-[#FFED41] font-soli text-[16px]">
              TWEET $ARMY
            </h5>
          </div>
        )}
      
      </div>
      <ReUseModal open={open} setOpen={setOpen} >
        <div className="w-full flex flex-col">
          <h1 className="text-white font-inconsolata text-2xl">
            Create Campaign
          </h1>
          <div className="flex flex-col mt-6">
            <label htmlFor="" className="text-base text-white font-inconsolata mb-2">
              Campaign Name
            </label>
            <input type="text" className="w-full flex border-secondary  h-10  text-white outline-none  border-b bg-transparent placeholder:text-secondary " placeholder="Enter Name" />
            <button className="sign-in-button mt-6 font-inconsolata cursor-pointer" onClick={() => setOpen(false)}>
            Create
            </button>
          </div>
          </div>
      </ReUseModal>
    </>
  );
}

export default Missions;
