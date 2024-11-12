import { useState } from "react";
import LeaderboardTable from "../../Components/LeaderboardTable/LeaderboardTable";
import OverviewContent from "../../Components/OverviewContent/OverviewContent";
import {
  generalLeaderBoardData,
  campaignLeaderBoardData,
} from "../../utils/mockData";
const Leaderboard = () => {
  const [isGeneral, setIsGeneral] = useState(true);
  return (
    <div className="w-full h-full">
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
  );
};

export default Leaderboard;
