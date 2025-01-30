//@ts-nocheck
import React, { useState, useEffect } from "react";
import MainPointsOverview from "../MainPointsOverview/MainPointsOverview";
import Missions from "../Missions/Missions";
import LeaderboardTable from "../LeaderboardTable/LeaderboardTable";
import { generalLeaderBoardData } from "../../utils/mockData";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getGeneralLeaderboard } from "../../utils/AuthSlice";
function PointsOverview() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneral, setIsGeneral] = useState(true);
  const [leaderboardData, setLeaderBoardData] = useState([]);
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check admin status
    if (
      userData?.userMainData?.accessLevel === "super admin" ||
      userData?.userMainData?.accessLevel === "admin"
    ) {
      setIsAdmin(true);
    }
  }, [userData]);

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

  const exportLeaderboardToCSV = (rankFilter) => {
    if (!leaderboardData || leaderboardData.length === 0) {
      console.log("No data available for export.");
      return;
    }

    // Filter leaderboard based on rank
    const filteredData = leaderboardData.filter(
      (army) => army.rank?.name === rankFilter
    );

    if (filteredData.length === 0) {
      console.log(`No army found with rank: ${rankFilter}`);
      return;
    }

    // Convert to CSV format
    const csvHeaders = ["Points", "Rank", "Multiplier", "EVM Wallet"];
    const csvRows = filteredData.map((army) => [
      army.points,
      army.rank?.name, // Use `.title` (not `.name`) if it's consistent
      army.rank.multiplier,
      army.addresses[0]?.evm,
    ]);

    const csvContent = [csvHeaders, ...csvRows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${rankFilter}_Leaderboard.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      console.log("Fetching Leaderboard data...");
      await handleGetLeaderBoardData();
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="flex justify-around items-center flex-col lg:flex-row ">
        <MainPointsOverview />
        <Missions />
      </div>
      {isAdmin ? (
        <div className="flex mt-5 gap-5">
          <button
            className="button-56"
            onClick={() => exportLeaderboardToCSV("Private")}
          >
            Export Private
          </button>
          <button
            className="button-56"
            onClick={() => exportLeaderboardToCSV("Corporal")}
          >
            Export Corporal
          </button>
          <button
            className="button-56"
            onClick={() => exportLeaderboardToCSV("Sergeant")}
          >
            Export Sergeant
          </button>
          <button
            className="button-56"
            onClick={() => exportLeaderboardToCSV("Captain")}
          >
            Export Captain
          </button>
          <button
            className="button-56"
            onClick={() => exportLeaderboardToCSV("Master")}
          >
            Export Master
          </button>
          <button
            className="button-56"
            onClick={() => exportLeaderboardToCSV("Major")}
          >
            Export Major
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="mt-5 pb-4">
        <LeaderboardTable
          data={leaderboardData}
          isGeneral={isGeneral}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}

export default PointsOverview;
