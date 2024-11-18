import React,{useState} from 'react'
import armyLogo from "../../assets/images/soldier-asset-1.svg";
import { pointMockData } from '../../utils/mockData';
const LevelUp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? pointMockData.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === pointMockData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentItem = pointMockData[currentIndex];

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-white font-orbitron lg:text-2xl text-xl font-bold">
        Direct Recruits
      </h1>
      <p className="text-sm lg:text-base font-inconsolata text-white mt-4">
        Share your Agent code and earn 5000 points per Agent you recruit, up to
        5x a week.
      </p>

      {/* start of carosel item */}
      <div className="w-full flex flex-col items-center mt-8">
        {/* Carousel Item */}
        <div className="w-full flex flex-col items-center   rounded-lg">
          <div className="flex items-center w-full justify-start">
            <img
              src={currentItem.image}
              alt="logo"
              className="w-[160px] h-auto -ml-16"
            />
            <div className="flex flex-col -ml-8">
              <h1 className="text-white font-orbitron lg:text-2xl text-xl font-bold">
                Level {currentItem.level}
              </h1>
              <h1 className="text-white font-orbitron lg:text-2xl text-xl font-bold ">
                {currentItem.name}
              </h1>
            </div>
          </div>
          <div className="w-full mt-4">
            {Object.entries(currentItem)
              .filter(([key]) =>
                [
                  "pointsRequired",
                  "recruitMultiplier",
                  "finger",
                  "votingPower",
                  "cashPoolEntries",
                  "nftRewardsEntries",
                  "platinumExperienceEntries",
                  "irlActivations",
                  "vipAfterparties",
                  "unfkMerch",
                ].includes(key)
              )
              .map(([key, value], index) => (
                <div
                  key={index}
                  className="w-full flex justify-between items-center mt-2"
                >
                  <p className="text-sm lg:text-base font-inconsolata text-white capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </p>
                  <p className="text-sm lg:text-base font-inconsolata text-customYellow">
                    {value}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center mt-4">
          <button
            onClick={goToPrevious}
            className="text-white p-2 bg-gray-800 rounded-full mr-4"
          >
            ←
          </button>
          <div className="flex space-x-2">
            {pointMockData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-4 h-4 rounded-full ${
                  currentIndex === index ? "bg-customYellow" : "bg-gray-500"
                }`}
              ></button>
            ))}
          </div>
          <button
            onClick={goToNext}
            className="text-white p-2 bg-gray-800 rounded-full ml-4"
          >
            →
          </button>
        </div>
      </div>
      {/* end of carosel item */}
    </div>
  );
}

export default LevelUp
