//@ts-nocheck
import { useState, useEffect } from "react";
import LeaderboardTable from "../../Components/LeaderboardTable/LeaderboardTable";
import OverviewContent from "../../Components/OverviewContent/OverviewContent";
import armyBackground from "../../assets/images/army-background.webp";
import {
  generalLeaderBoardData,
  campaignLeaderBoardData,
} from "../../utils/mockData";
import DashboardLayout from "../../layout/DashboardLayout";
import { useAppDispatch } from "../../app/hook";
import { getAllCampaigns, getGeneralLeaderboard } from "../../utils/AuthSlice";
const Leaderboard = () => {
  const [updatedGeneralLeaderBoardData, setupdatedGeneralLeaderBoardData] =
    useState([]);
  const [campaignLeaderBoard, setCampaignLeaderBoard] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const dispatch = useAppDispatch();
  const [isGeneral, setIsGeneral] = useState(true);

  const handleGetLeaderBoardData = async () => {
    try {
      const generalLeaderBoardData = await dispatch(
        getGeneralLeaderboard()
      ).unwrap();

      console.log("Raw General Leaderboard Data:", generalLeaderBoardData);

      if (generalLeaderBoardData?.leaderboard?.length > 0) {
        const leaderboardCopy = [...generalLeaderBoardData.leaderboard];
        const sortedData = leaderboardCopy.sort((a, b) => {
          // Compare points first
          if (b?.points !== a?.points) {
            return b?.points - a?.points;
          }
          // If points are equal, compare rank multiplier
          return b?.rank?.multiplier - a?.rank?.multiplier;
        });

        console.log("Sorted General Leaderboard Data:", sortedData);
        setupdatedGeneralLeaderBoardData(sortedData);
      }
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  const handleGetCampaignLeaderBoardData = async () => {
    try {
      const allCampaignsLeaderBoardData = await dispatch(
        getAllCampaigns()
      ).unwrap();

      const sortedCampaignsData =
        allCampaignsLeaderBoardData?.campaigns[0]?.users.sort(
          (a, b) => b.campaignPoints - a.campaignPoints
        );
      setCampaignLeaderBoard(sortedCampaignsData || []);
      console.log(sortedCampaignsData);
    } catch (error) {
      console.log("Error fetching campaigns data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      console.log("Fetching Leaderboard data...");
      await handleGetLeaderBoardData();
      await handleGetCampaignLeaderBoardData();
      setLoadingData(false);
    };
    fetchData();
    console.log(updatedGeneralLeaderBoardData);
    console.log(campaignLeaderBoard);
  }, []);
  return (
    <DashboardLayout current={2}>
      <div className="w-full  overflow-x-hidden ">
        <div className="w-full min-h-[100vh] pt-20 xl:px-6 ">
          <OverviewContent />
          <div className="mt-8 pb-12">
            <div className="flex items-center justify-start font-inconsolata mb-8 gap-5">
              <button
                onClick={() => setIsGeneral(true)}
                className={`px-6 h-10 flex items-center justify-center w-fit cursor-pointer font-medium ${
                  isGeneral
                    ? "text-white  rounded-md bg-primary "
                    : "text-red-500 border-[2px] border-primary rounded-md "
                }`}
              >
                General
              </button>
              <button
                onClick={() => setIsGeneral(false)}
                className={`px-6 h-10 flex items-center justify-center w-fit cursor-pointer  ${
                  !isGeneral
                    ? "text-white font-medium  rounded-md bg-primary "
                    : "text-red-500 border-[2px] border-primary rounded-md font-semibold "
                }`}
              >
                Campaign
              </button>
            </div>
            <div className="w-full">
              {isGeneral && (
                <LeaderboardTable
                  data={updatedGeneralLeaderBoardData}
                  isGeneral={isGeneral}
                />
              )}
              {!isGeneral && (
                <LeaderboardTable
                  data={campaignLeaderBoard}
                  isGeneral={isGeneral}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Leaderboard;
