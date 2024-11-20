import React from 'react'
import DashboardLayout from '../../layout/DashboardLayout'
import OverviewContent from '../../Components/OverviewContent/OverviewContent';
import MainPointsOverview from '../../Components/MainPointsOverview/MainPointsOverview';
import Missions from '../../Components/Missions/Missions';
import CampaignTable from '../../Components/CampaignItems/CampaignTable';
import { campaignData, generalLeaderBoardData } from '../../utils/mockData';

const Campaigns = () => {
  return (
    <DashboardLayout current={1}>
      <div className="w-full flex flex-col min-h-screen pt-6">
     
        <OverviewContent />
        <div className="flex justify-around items-center mb-10">
          <MainPointsOverview />
          <Missions />
              </div>
              <CampaignTable data={campaignData} />
      </div>
    </DashboardLayout>
  );
}

export default Campaigns
