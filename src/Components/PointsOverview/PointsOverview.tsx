//@ts-nocheck
import React, { useState, useEffect } from "react";
import MainPointsOverview from "../MainPointsOverview/MainPointsOverview";
import Missions from "../Missions/Missions";
import LeaderboardTable from "../LeaderboardTable/LeaderboardTable";
import { generalLeaderBoardData } from "../../utils/mockData";
import { useAppDispatch } from "../../app/hook";
import { getGeneralLeaderboard } from "../../utils/AuthSlice";
function PointsOverview() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneral, setIsGeneral] = useState(true);
  const [leaderboardData, setLeaderBoardData] = useState([]);
  const dispatch = useAppDispatch();

  const handleGetLeaderBoardData = async () => {
    try {
      const generalLeaderBoardData = await dispatch(
        getGeneralLeaderboard()
      ).unwrap();
      if (generalLeaderBoardData?.leaderboard?.length > 0) {
        const leaderboardCopy = [...generalLeaderBoardData.leaderboard];
        const sortedData = leaderboardCopy.sort((a, b) => {
          // Compare points first
          if (b?.points !== a?.points) {
            return b.points - a.points;
          }
          // If points are equal, compare rank multiplier
          return b.rank.multiplier - a.rank.multiplier;
        });
        console.log("Sorted General Leaderboard Data:", sortedData);
        setLeaderBoardData(sortedData);
      }
    } catch (error) {
      console.log("Error fetching leaderboard data:", error);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      console.log("Fetching Leaderboard data...");
      await handleGetLeaderBoardData();
    };
    setIsLoading(false);
    fetchData();
  }, [leaderboardData]);
  return (
    <>
      <div className="flex justify-around items-center flex-col lg:flex-row ">
        <MainPointsOverview />
        <Missions />
      </div>
      <div className="mt-5 pb-4">
        <LeaderboardTable data={leaderboardData} isGeneral={isGeneral} />
      </div>
    </>
  );
}

export default PointsOverview;
