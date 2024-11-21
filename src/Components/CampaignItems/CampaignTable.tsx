import { useState, useEffect } from "react";
//@ts-ignore
import Pagination from "../pagination/pagination";
import Options from "../Options/OptionsMenu";
import { Spin } from "antd";
import ReUseModal from "../Modal/ReuseableModal";
import { FaTimes } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import LoadingComponent from "../LoadingComponent/skeleton-loading";
import ActionButton from "../utils/buttons/ActionButton";
import { addCampaignTweet } from "../../utils/AuthSlice";
const CampaignTable = ({ data }: { data: {}[] | any }) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userData = useAppSelector((state) => state.user);

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (!query) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item: any) =>
        item?.name?.toLowerCase()?.includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
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
              <th className=" w-full flex justify-start">Campaign Name</th>
              <th className=" w-full flex justify-start">Participants</th>
              <th className=" w-full flex justify-start">Tweets</th>
              <th className=" w-full flex justify-start">Status</th>
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
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [tweetLink, setTweetLink] = useState("");
  const [tweetID, setTweetID] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(item);
  }, [item]);

  const handleTweetLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setTweetLink(link);
    const id = link.match(/status\/(\d+)/)?.[1] || "";
    setTweetID(id);
  };

  const handleAddTweet = async () => {
    setIsLoading(true);
    const data = {
      campaignID: item?._id,
      link: tweetLink,
      tweetId: tweetID,
    };
    try {
      const response = await dispatch(addCampaignTweet(data)).unwrap();
      console.log(response);
      setIsLoading(false);
      console.log(tweetID);
      console.log(tweetLink);
    } catch (error) {
      console.error("Error adding tweet:", error);
      setIsLoading(false);
    }
    console.log(item?._id);
    setOpen(false);
  };

  const handleSyncTweets = async () => {
    console.log("Synced");
  };

  return (
    <tr
      className="w-full grid grid-cols-4  gap-2 text-white place-items-center   px-4 h-10 mt-3 "
      key={index}
    >
      <td className=" w-full flex justify-start">
        {/* {item?.rank < 4 ? item?.rank : index + 1} */}
        <p className="text-white font-inconsolata capitalize">{item?.name}</p>
      </td>
      <td className=" w-full flex justify-start gap-3 items-center">
        <p className="text-white font-inconsolata">{item?.users?.length}</p>
      </td>
      <td className=" w-full flex justify-start gap-2 items-center">
        <p className="text-white font-inconsolata">{item?.tweets?.length}</p>
      </td>

      <td className=" w-full flex justify-between items-center gap-6">
        <div className="  flex  items-center gap-2">
          {item?.is_campaign_active === true ? (
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
                <button
                  className="text-white w-full pl-2 text-start font-inconsolata font-semibold cursor-pointer text-sm hover:bg-secondary h-10 rounded-md"
                  onClick={() => setOpen(true)}
                >
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
            <h1 className="text-white font-inconsolata text-2xl">Add Tweet</h1>
            <span
              className="text-secondary text-xl cursor-pointer"
              onClick={() => setOpen(false)}
            >
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
                className="w-full flex border-secondary  h-10  text-white outline-none  border-b bg-transparent placeholder:text-secondary font-inconsolata"
                placeholder="Enter Tweet Link"
                onChange={handleTweetLinkChange}
                value={tweetLink}
              />
            </div>
            <div className="flex flex-col mt-8">
              <label
                htmlFor=""
                className="text-base text-white font-inconsolata mb-1"
              >
                Tweet ID
              </label>
              <input
                type="text"
                className="w-full flex border-secondary  h-10  text-white outline-none  border-b bg-transparent placeholder:text-secondary font-inconsolata cursor-not-allowed"
                placeholder="Enter Tweet ID"
                value={tweetID}
                readOnly
              />
            </div>
            <div className="flex items-center justify-between gap-5">
              <ActionButton
                isLoading={isLoading}
                text={"Add Tweet"}
                isValid={isLoading}
                onPress={handleAddTweet}
                buttonType="sign-in-button"
              />

              <ActionButton
                isLoading={isSyncing}
                text={"Sync All"}
                isValid={isSyncing}
                onPress={handleSyncTweets}
                buttonType="button-56"
              />
            </div>
          </div>
        </div>
      </ReUseModal>
    </tr>
  );
};
