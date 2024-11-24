//@ts-nocheck
import { useState, useEffect } from "react";
import points from "../../assets/images/army-points-illustration.PNG";
import rankIcons from "../../utils/rankIcons";
import Pagination from "../pagination/pagination";
import Options from "../Options/OptionsMenu";
import LoadingComponent from "../LoadingComponent/skeleton-loading";
import { useAppSelector } from "../../app/hook";
const LeaderboardTable = ({
  data,
  isGeneral,
}: {
  data: {}[] | any;
  isGeneral: boolean;
}) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userData = useAppSelector((state) => state.user);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const filtered = !query
      ? data
      : data.filter((item: any) =>
          item?.twitterUsername?.toLowerCase()?.includes(query.toLowerCase())
        );
    setCurrentData(filtered);
    setIsLoading(false);

    if (
      userData?.userMainData?.accessLevel === "super admin" ||
      userData?.userMainData?.accessLevel === "admin"
    ) {
      setIsAdmin(true);
    }
  }, [query, data, userData]);

  useEffect(() => {
    setIsLoading(true);
    if (data?.length > 0) {
      setCurrentData(data);
      setIsLoading(false);
    }
  }, [data]);

  return (
    <div className="w-full font-inconsolata text-[20px] font-[600] clip-top-left-bottom-right flex flex-col bg-primary rounded-md p-3 lg:p-4  flow-hide">
      <div className="flex items-center gap-5 mb-4 ">
        <h1 className="text-white ">Search:</h1>
        <div className="w-full lg:w-1/2 max-w-[250px] border styled-border-radius border-white border-opacity-100  h-10 px-2 flex items-center">
          <input
            type="text"
            className=" w-full border-none outline-none bg-transparent text-white "
            value={query}
            onChange={(e: any) => setQuery(e.target.value)}
          />
        </div>
      </div>
      {/* end of input space */}
      <div className="w-full flow-hide-x">
        <table className="table-fixed min-w-max lg:min-w-full">
          <thead className="w-full bg-secondary   h-12 flex items-center rounded-md ">
            <tr className="w-full grid grid-cols-4   text-white place-items-center   px-4 gap-2 ">
              <th className=" w-full flex justify-start">Rank</th>
              <th className=" w-full flex justify-start">Name</th>
              {!isGeneral ? (
                <th className=" w-full flex justify-start">Points</th>
              ) : (
                <th className=" w-full flex justify-start">Activity Points</th>
              )}
              <th className=" w-full flex justify-start">Tweets</th>
            </tr>
          </thead>
          <tbody className="gap-4 mt-4">
            {currentData.length > 0 ? (
              currentData.map((item: any, index: number) => (
                <SingleRow
                  item={item}
                  index={index}
                  key={item.id || index}
                  isAdmin={isAdmin}
                  isGeneral={isGeneral}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  {isLoading ? (
                    <>
                      <LoadingComponent />
                    </>
                  ) : (
                    "No leaderboard data available."
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full px-4">
        <Pagination
          data={filteredData}
          itemsPerPage={10}
          setCurrentData={setCurrentData}
          currentData={currentData}
        />
      </div>
    </div>
  );
};

export default LeaderboardTable;

const SingleRow = ({
  item,
  index,
  isAdmin,
  isGeneral,
}: {
  item: any;
  index: number;
  isAdmin: boolean;
  isGeneral: boolean;
}) => {
  return (
    <tr
      className="w-full grid grid-cols-4  gap-2 text-white place-items-center   px-4 h-10 mt-3 "
      key={index}
    >
      <td className=" w-full flex justify-start">
        {/* {item?.rank < 4 ? item?.rank : index + 1} */}
        {/* {item?.rank === 1 && <img src={first} alt="first" />}
        {item?.rank === 2 && <img src={second} alt="first" />}
        {item?.rank === 3 && <img src={third} alt="first" />} */}
        {item?.rank?.name && (
          <div className="flex items-center">
            <img
              src={rankIcons[item.rank.name]}
              alt={`${item.rank.name} Icon`}
              className="w-6 h-6 mr-2" // Adjust size and spacing
            />
            <p>{item.rank.name}</p>
          </div>
        )}
      </td>
      <td className=" w-full flex justify-start gap-3 items-center">
        <p className="text-base">{item?.twitterUsername}</p>
      </td>
      <td className=" w-full flex justify-start gap-2 items-center">
        {!isGeneral ? (
          <>
            <p>0</p>
          </>
        ) : (
          <>
            <p>{item?.points?.toLocaleString()}</p>
            <img src={points} alt="points" className="w-5 h-5 rounded-full" />
          </>
        )}
      </td>

      <td className=" w-full flex justify-between items-center gap-6">
        <div className="  flex  items-center gap-2">
          <p>x{item?.rank?.multiplier}</p>
          <img src={points} alt="points" className="w-5 h-5 rounded-full" />
        </div>
        {isAdmin && (
          <span>
            <Options>
              <div className="w-full flex flex-col py-4 px-2 gap-2">
                <button className="text-white font-inconsolata font-semibold cursor-pointer text-sm hover:bg-secondary h-8 rounded-md">
                  Update Access Level
                </button>
                <button className="text-white font-inconsolata font-semibold cursor-pointer text-sm hover:bg-secondary h-8 rounded-md">
                  Add Tag
                </button>
                <button className="text-white font-inconsolata font-semibold cursor-pointer text-sm hover:bg-secondary h-8 rounded-md">
                  Remove Tag
                </button>
              </div>
            </Options>
          </span>
        )}
      </td>
    </tr>
  );
};
