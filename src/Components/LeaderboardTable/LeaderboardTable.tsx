import { useState, useEffect } from "react";
//@ts-ignore
import points from "../../assets/images/army-points-illustration.PNG";
import first from "../../assets/svg/first-pos.svg";
import second from "../../assets/svg/second-pos.svg";
import third from "../../assets/svg/third-pos.svg";
import Pagination from "../pagination/pagination";
import Options from "../Options/OptionsMenu";

const LeaderboardTable = ({ data }: { data: {}[] | any }) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  useEffect(() => {
    if (!query) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item: any) =>
        item?.name?.toLowerCase()?.includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [query]);

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
              <th className=" w-full flex justify-start">Activity Points</th>
              <th className=" w-full flex justify-start">Multiplier</th>
            </tr>
          </thead>
          <tbody className="gap-4 mt-4">
            {currentData?.map((item: any, index: number) => {
              return <SingleRow item={item} index={index} key={index} isAdmin={isAdmin} />;
            })}
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

const SingleRow = ({ item, index, isAdmin }: { item: any; index: number, isAdmin: boolean; }) => {
  return (
    <tr
      className="w-full grid grid-cols-4  gap-2 text-white place-items-center   px-4 h-10 mt-3 "
      key={index}
    >
      <td className=" w-full flex justify-start">
        {/* {item?.rank < 4 ? item?.rank : index + 1} */}
        {item?.rank === 1 && <img src={first} alt="first" />}
        {item?.rank === 2 && <img src={second} alt="first" />}
        {item?.rank === 3 && <img src={third} alt="first" />}
        {item?.rank > 3 && <p>{index + 1}</p>}
      </td>
      <td className=" w-full flex justify-start gap-3 items-center">
        <img
          src={item.image}
          alt={item?.name}
          className="w-8 h-8 rounded-full "
        />
        <p className="text-base">{item?.name}</p>
      </td>
      <td className=" w-full flex justify-start gap-2 items-center">
        <p>{item?.actPts}</p>
        <img src={points} alt="points" className="w-5 h-5 rounded-full" />
      </td>

      <td className=" w-full flex justify-between items-center gap-6">
        <div className="  flex  items-center gap-2">
          <p>{item?.multiplier}</p>
          <img src={points} alt="points" className="w-5 h-5 rounded-full" />

          <img src={points} alt="points" className="w-3 h-3 rounded-full" />
        </div>
        {isAdmin && (
          <span>
            <Options>
              <div className="w-full flex flex-col py-2 px-4 gap-0 items-start">
                <button className="text-white w-full pl-2 text-start font-inconsolata font-semibold cursor-pointer text-sm hover:bg-secondary h-10 rounded-md">
                  Update Access Level
                </button>
                <button className="text-white w-full pl-2 text-start font-inconsolata font-semibold cursor-pointer text-sm hover:bg-secondary h-10 rounded-md">
                  Add Tag
                </button>
                <button className="text-white w-full text-start pl-2 font-inconsolata font-semibold cursor-pointer text-sm hover:bg-secondary h-10 rounded-md">
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
