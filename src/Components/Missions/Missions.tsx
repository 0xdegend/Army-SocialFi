import { useEffect, useState } from "react";
import ReUseModal from "../Modal/ReuseableModal";
import { Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import ActionButton from "../utils/buttons/ActionButton";
import { createCampaign } from "../../utils/AuthSlice";

function Missions() {
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [open, setOpen] = useState(false);

  const handleCreateCampaign = async () => {
    setIsLoading(true);
    const data = {
      name: `${campaignName}`,
      tag: `${campaignName}`,
      winner_multiplier: 0,
      first_place_point: 0,
      second_place_point: 0,
      third_place_point: 0,
    };
    try {
      const response = await dispatch(createCampaign(data)).unwrap();
      console.log(response);
    } catch (error) {
      console.error("Error creating campaign: ", error);
      // Display error message here
    }
    setIsLoading(false);
    setOpen(false);
  };
  useEffect(() => {
    if (
      userData?.userMainData?.accessLevel === "super admin" ||
      userData?.userMainData?.accessLevel === "admin"
    ) {
      setIsAdmin(true);
    }
  }, [userData]);
  return (
    <>
      <div className=" w-[45%] bg-[#1D2211] clip-top-left-bottom-right mt-10 p-10">
        <h1 className="font-soli text-[35px] text-[#FFF] mb-2">Your Mission</h1>
        {isAdmin && (
          <div className="flex justify-start items-center gap-10">
            <button
              className="sign-in-button font-soli cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Create Campaign
            </button>
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
      <ReUseModal open={open} setOpen={setOpen}>
        <div className="w-full flex flex-col">
          <h1 className="text-white font-inconsolata text-2xl">
            Create Campaign
          </h1>
          <div className="flex flex-col mt-6">
            <label
              htmlFor=""
              className="text-base text-white font-inconsolata mb-2"
            >
              Campaign Name
            </label>
            <input
              value={campaignName}
              type="text"
              className="w-full flex border-secondary  h-10  text-white outline-none font-inconsolata  border-b bg-transparent placeholder:text-secondary "
              placeholder="Enter Name"
              onChange={(e) => setCampaignName(e.target.value)}
            />
            <ActionButton
              text={"Create"}
              onPress={handleCreateCampaign}
              isValid={isLoading}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ReUseModal>
    </>
  );
}

export default Missions;
