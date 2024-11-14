import { useState } from "react";
import LeaderboardTable from "../../Components/LeaderboardTable/LeaderboardTable";
import OverviewContent from "../../Components/OverviewContent/OverviewContent";
import armyBackground from "../../assets/images/army-background.webp";
import {
  generalLeaderBoardData,
  campaignLeaderBoardData,
} from "../../utils/mockData";
import DashboardLayout from "../../layout/DashboardLayout";
const Leaderboard = () => {
  const [isGeneral, setIsGeneral] = useState(true);
  return (
    <DashboardLayout current={2}>
      <div className="w-full h-full">
        <div className="w-full h-[100vh] pt-20 xl:px-6 ">
          <OverviewContent />
          <div className="mt-8 pb-12">
            <div className="flex items-center justify-start font-soli mb-8 gap-5">
              <button
                onClick={() => setIsGeneral(true)}
                className={`px-6 h-10 flex items-center justify-center w-fit cursor-pointer font-medium ${
                  isGeneral
                    ? "text-white  rounded-md bg-primary "
                    : "border-[2px] border-primary rounded-md "
                }`}
              >
                General LeaderBoard
              </button>
              <button
                onClick={() => setIsGeneral(false)}
                className={`px-6 h-10 flex items-center justify-center w-fit cursor-pointer  ${
                  !isGeneral
                    ? "text-white font-medium  rounded-md bg-primary "
                    : "border-[2px] border-primary rounded-md font-semibold "
                }`}
              >
                Campaign LeaderBoard
              </button>
            </div>
            {isGeneral && <LeaderboardTable data={generalLeaderBoardData} />}
            {!isGeneral && <LeaderboardTable data={campaignLeaderBoardData} />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Leaderboard;
