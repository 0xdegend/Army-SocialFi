import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import OverviewContent from "../../Components/OverviewContent/OverviewContent";
import MainPointsOverview from "../../Components/MainPointsOverview/MainPointsOverview";
import Missions from "../../Components/Missions/Missions";
import CampaignTable from "../../Components/CampaignItems/CampaignTable";
import { campaignData, generalLeaderBoardData } from "../../utils/mockData";
import { useAppDispatch } from "../../app/hook";
import { getAllCampaigns } from "../../utils/AuthSlice";
const Campaigns = () => {
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);
  const dispatch = useAppDispatch();

  const handleGetAllCampaigns = async () => {
    try {
      //@ts-ignore
      const allCampaignsResponse = await dispatch(getAllCampaigns()).unwrap();
      setAllCampaigns(allCampaignsResponse?.campaigns || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAllCampaigns = async () => {
      setLoadingCampaigns(true);
      console.log("Fetching all campaign...");
      await handleGetAllCampaigns();
      setLoadingCampaigns(false);
    };
    fetchAllCampaigns();
  }, []);

  useEffect(() => {

  }, [allCampaigns]);
  return (
    <DashboardLayout current={1}>
      <div className="w-full flex flex-col min-h-screen pt-6">
        <OverviewContent />
        <div className="flex justify-around items-center mb-10 flex-col lg:flex-row">
          <MainPointsOverview />
          <Missions />
        </div>
        <CampaignTable data={allCampaigns} />
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;
