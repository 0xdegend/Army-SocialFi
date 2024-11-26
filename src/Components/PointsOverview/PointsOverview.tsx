//@ts-nocheck
import React, { useState, useEffect } from "react";
import MainPointsOverview from "../MainPointsOverview/MainPointsOverview";
import Missions from "../Missions/Missions";
import LeaderboardTable from "../LeaderboardTable/LeaderboardTable";
import { generalLeaderBoardData } from "../../utils/mockData";
import { useAppDispatch } from "../../app/hook";
import { getGeneralLeaderboard } from "../../utils/AuthSlice";
function PointsOverview() {
  const [loadingData, setLoadingData] = useState(false);
  const [isGeneral, setIsGeneral] = useState(true);
  const [leaderboardData, setLeaderBoardData] = useState([]);
  const dispatch = useAppDispatch();

  const handleGetLeaderBoardData = async () => {
    try {
      const generalLeaderBoardData = await dispatch(
        getGeneralLeaderboard()
      ).unwrap();
      setLeaderBoardData(generalLeaderBoardData?.leaderboard || []);
      console.log(generalLeaderBoardData);
    } catch (error) {
      console.log("Error fetching leaderboard data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      console.log("Fetching Leaderboard data...");
      await handleGetLeaderBoardData();
      setLoadingData(false);
    };
    fetchData();
    console.log(leaderboardData);
    console.log(isGeneral);
  }, []);
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
