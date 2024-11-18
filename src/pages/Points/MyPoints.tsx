import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

import LevelUp from "../../Components/Points/LevelUp";
import PointsOverview from "../../Components/PointsOverview/PointsOverview";
import PointsRanking from "../../Components/Points/PointsRank";
const MyPointsPage = () => {
  const [isPoint, setIsPoint] = useState(false);

   return (
    <DashboardLayout current={10}>
      <div className="w-full flex flex-col max-w-[1024px] px-4 mx-auto">
        <h1 className="text-2xl lg:text-4xl lg:mt-8  mt-6 2xl:mt-10 font-orbitron font-bold text-white">
          My Points
        </h1>
        <div className=" items-start mt-16 gap-12 justify-between hidden lg:flex ">
          <div className="w-1/2">
            <LevelUp />
          </div>
          <div className="w-1/2">
            <PointsRanking />
          </div>
        </div>
         <div className="w-full  flex-col flex lg:hidden">
           {/* start of toggle */}
           <div className="w-full h-[40px] grid grid-cols-2 rounded-md bg-gray-500 bg-opacity-30 mt-6 ">
             <button className={`h-10 flex items-center font-bold font-inconsolata cursor-pointer justify-center text-xs rounded-md ${isPoint ? "bg-transparent text-white" : "bg-customYellow text-primary"}`}
             onClick={() => setIsPoint(false)}
             >
               LEVELS
             </button>
             <button className={`h-10 flex items-center font-bold font-inconsolata cursor-pointer justify-center text-xs rounded-md ${!isPoint ? "bg-transparent text-white" : "bg-customYellow text-primary"}`}
             onClick={() => setIsPoint(true)}
             >
               ARMY POINTS
             </button>
          </div>

           {/* end of toggle */}
           <div className="mt-6 lg:hidden">
             
           {isPoint && <PointsRanking />}
           {!isPoint && <LevelUp />}
           </div>
      </div>
      </div>
    </DashboardLayout>
  );
};

export default MyPointsPage;
