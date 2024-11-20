import { useState, useEffect } from "react";
//@ts-ignore
import Pagination from "../pagination/pagination";
import Options from "../Options/OptionsMenu";

import ReUseModal from "../Modal/ReuseableModal";
import { FaTimes } from "react-icons/fa";

const CampaignTable = ({ data }: { data: {}[] | any }) => {
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
              <th className=" w-full flex justify-start">Campaign Name</th>
              <th className=" w-full flex justify-start">Number of Participant</th>
              <th className=" w-full flex justify-start">Number of Tweets</th>
              <th className=" w-full flex justify-start">Status</th>
            </tr>
          </thead>
          <tbody className="gap-4 mt-4">
            {currentData?.map((item: any, index: number) => {
              return (
                <SingleRow
                  item={item}
                  index={index}
                  key={index}
                  isAdmin={isAdmin}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="w-full px-4 mt-8">
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

export default CampaignTable;

const SingleRow = ({
  item,
  index,
  isAdmin,
}: {
  item: any;
  index: number;
  isAdmin: boolean;
    }) => {
    const [open, setOpen] = useState(false);
  return (
    <tr
      className="w-full grid grid-cols-4  gap-2 text-white place-items-center   px-4 h-10 mt-3 "
      key={index}
    >
      <td className=" w-full flex justify-start">
        {/* {item?.rank < 4 ? item?.rank : index + 1} */}
        <p className="text-white font-inconsolata">{item?.name}</p>
      </td>
      <td className=" w-full flex justify-start gap-3 items-center">
        <p className="text-white font-inconsolata">{item?.participant}</p>
      </td>
      <td className=" w-full flex justify-start gap-2 items-center">
        <p className="text-white font-inconsolata">{item?.tweetsNo}</p>
      </td>

      <td className=" w-full flex justify-between items-center gap-6">
        <div className="  flex  items-center gap-2">
          {item?.status === true ? (
            <p className="h-9 rounded-xl px-4 border-green-500 border text-green-500 flex items-center text-sm font-inconsolata">
              Active
            </p>
          ) : (
            <p className="h-9 rounded-xl px-4 border-red-500 border text-red-500 flex items-center text-sm font-inconsolata">
              Ended
            </p>
          )}
          <p className=" border-gr"></p>
        </div>
        {isAdmin && (
          <span>
            <Options>
              <div className="w-full flex flex-col py-2 px-4 gap-0 items-start">
                <button className="text-white w-full pl-2 text-start font-inconsolata font-semibold cursor-pointer text-sm hover:bg-secondary h-10 rounded-md" onClick={() => setOpen(true)}>
                  Add Tweet
                </button>
                <button className="text-white w-full pl-2 text-start font-inconsolata font-semibold cursor-pointer text-sm hover:bg-secondary h-10 rounded-md">
                  End Campaign
                </button>
              </div>
            </Options>
          </span>
        )}
      </td>
      <ReUseModal open={open} setOpen={setOpen}>
              <div className="w-full flex flex-col">
                  <div className="flex items-center justify-between">
                      
          <h1 className="text-white font-inconsolata text-2xl">
            Add Tweet
                      </h1>
                      <span className="text-secondary text-xl cursor-pointer" onClick={() => setOpen(false)}>
                          <FaTimes />
                      </span>
                  </div>
                  <div className="flex flex-col mt-6">
                      <div className="flex flex-col">
                          
            <label
              htmlFor=""
              className="text-base text-white font-inconsolata mb-1"
              >
              Tweet Url
            </label>
            <input
              type="text"
              className="w-full flex border-secondary  h-10  text-white outline-none  border-b bg-transparent placeholder:text-secondary "
              placeholder="Enter url"
              />
              </div>
                      <div className="flex flex-col mt-8">
                          
            <label
              htmlFor=""
              className="text-base text-white font-inconsolata mb-1"
              >
              Tweet Id
            </label>
            <input
              type="text"
              className="w-full flex border-secondary  h-10  text-white outline-none  border-b bg-transparent placeholder:text-secondary "
              placeholder="Enter Id"
              />
                      </div>
                      <div className="flex items-center justify-between gap-5">
                          
            <button
              className="sign-in-button mt-6 font-inconsolata cursor-pointer"
              onClick={() => setOpen(false)}
              >
              Create
            </button>
            <button
              className="button-56 mt-6 font-inconsolata cursor-pointer text-white "
              onClick={() => setOpen(false)}
              >
              Sync All
            </button>
                </div>
          </div>
        </div>
      </ReUseModal>
    </tr>
  );
};
