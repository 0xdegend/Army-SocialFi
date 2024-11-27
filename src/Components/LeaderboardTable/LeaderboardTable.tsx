//@ts-nocheck
import { useState, useEffect } from "react";
import points from "../../assets/images/army-points-illustration.PNG";
import rankIcons from "../../utils/rankIcons";
import Pagination from "../pagination/pagination";
import Options from "../Options/OptionsMenu";
import LoadingComponent from "../LoadingComponent/skeleton-loading";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import ReUseModal from "../Modal/ReuseableModal";
import PrimarySelect from "../Selects/PrimarySelect";
import ActionButton from "../utils/buttons/ActionButton";
import { dummyTags } from "../../utils/mockData";
import { updateAccessLevel } from "../../utils/AuthSlice";
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
          isGeneral
            ? item?.twitterUsername
                ?.toLowerCase()
                ?.includes(query.toLowerCase())
            : item?.userId?.twitterUsername
                ?.toLowerCase()
                ?.includes(query.toLowerCase())
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
    <div className="w-full font-inconsolata text-[20px] font-[600] clip-top-left-bottom-right flex flex-col bg-primary rounded-md p-3 lg:p-4  flow-hide ">
      <div className="flex items-center gap-5 mb-4 ">
        <h1 className="text-white ">Search:</h1>
        <div className="w-full lg:w-1/2 max-w-[250px] border styled-border-radius border-white border-opacity-100  h-10 px-2 flex items-center">
          <input
            placeholder="Search Username..."
            type="text"
            className=" w-full border-none outline-none bg-transparent text-white "
            value={query}
            onChange={(e: any) => setQuery(e.target.value)}
          />
        </div>
      </div>
      {/* end of input space */}
      <div className="w-full flow-hide-x">
        <table className="table-auto  lg:min-w-full w-full min-w-[700px]">
          <thead className="w-full bg-secondary h-12 flex items-center rounded-md  ">
            <tr className="w-full grid grid-cols-4 text-white place-items-center   px-4 gap-2 min-w-full ">
              <th className=" w-full flex justify-start">Rank</th>
              <th className=" w-full flex justify-start">Name</th>
              {!isGeneral ? (
                <th className=" w-full flex justify-start">Points</th>
              ) : (
                <th className=" w-full flex justify-start">Activity Points</th>
              )}

              {!isGeneral ? (
                <th className=" w-full flex justify-start">Tweets</th>
              ) : (
                <th className=" w-full flex justify-start">Multiplier</th>
              )}
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
                  total={currentData?.length}
                />
              ))
            ) : (
              <tr className="w-full">
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
      {data?.length > 10 && (
        <div className="w-full px-4 mt-8">
          <Pagination
            data={filteredData}
            itemsPerPage={10}
            setCurrentData={setCurrentData}
            currentData={currentData}
          />
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;

const SingleRow = ({
  item,
  index,
  isAdmin,
  isGeneral,
  total,
}: {
  item: any;
  index: number;
  isAdmin: boolean;
  isGeneral: boolean;
  total: number;
}) => {
  const [open, setOpen] = useState(false);
  // const [openAdd, setOpenAdd] = useState(false);
  // const [openRemove, setOpenRemove] = useState(false);
  const [selectedRole, setSelectedRole] = useState({ name: "Select", id: 0 });
  const [updatingData, setUpdatingData] = useState(false);
  const dispatch = useAppDispatch();
  // const [tags, setTags] = useState<string[]>([]);
  // const [inputValue, setInputValue] = useState<string>("");

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter" && inputValue.trim()) {
  //     // Prevent duplicate tags
  //     if (!tags.includes(inputValue.trim())) {
  //       setTags([...tags, inputValue.trim()]);
  //     }
  //     setInputValue("");
  //   }
  // };

  // const handleRemoveTag = (tag: string) => {
  //   setTags(tags.filter((t) => t !== tag));
  // };

  // const [allTags, setAllTags] = useState(dummyTags);

  // const handleRemoveSavedTag = (id: number) => {
  //   const updatedTags = allTags.filter((tag) => tag.id !== id);
  //   setAllTags(updatedTags);
  // };
  const handleUpdateAccessLevel = async () => {
    setUpdatingData(true);
    const data = {
      userId: `${item?._id}`,
      accessLevel: `${selectedRole?.name}`,
    };
    try {
      const response = await dispatch(updateAccessLevel(data)).unwrap();

      setUpdatingData(false);
      setOpen(false);
    } catch (error) {
      console.error("Error updating Access Level:", error);
      setUpdatingData(false);
      setOpen(false);
    }
  };
  return (
    <tr
      className="w-full grid grid-cols-4  gap-2 text-white place-items-center   px-4 h-10 mt-3 min-w-full  "
      key={index}
    >
      <td className=" w-full flex justify-start min-w-full">
        {!isGeneral
          ? item?.userId?.rank?.name && (
              <div className="flex items-center">
                <img
                  src={rankIcons[item.userId?.rank?.name]}
                  alt={`${item?.userId?.rank.name} Icon`}
                  className="w-6 h-6 mr-2" // Adjust size and spacing
                />
                <p>{item?.userId?.rank?.name}</p>
              </div>
            )
          : item?.rank?.name && (
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
        {!isGeneral ? (
          <>
            <p className="capitalize">{item?.userId?.twitterUsername}</p>
          </>
        ) : (
          <>
            <p className="text-base capitalize">{item?.twitterUsername}</p>
            <img src={points} alt="points" className="w-5 h-5 rounded-full" />
          </>
        )}
      </td>
      <td className=" w-full flex justify-start gap-2 items-center">
        {!isGeneral ? (
          <>
            <p>{item?.campaignPoints.toLocaleString()}</p>
            <img src={points} alt="points" className="w-5 h-5 rounded-full" />
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
          {!isGeneral ? (
            <>
              <p>{item?.tweets?.length}</p>
            </>
          ) : (
            <>
              <p>x{item?.rank?.multiplier}</p>
              <img src={points} alt="points" className="w-5 h-5 rounded-full" />
            </>
          )}
        </div>
        {isAdmin && (
          <span className="z-10 overflow-visible">
            <Options>
              <div className="w-full flex flex-col py-4 px-2 gap-2">
                <button
                  className="text-white font-inconsolata font-semibold cursor-pointer text-sm hover:bg-secondary h-8 rounded-md "
                  onClick={() => setOpen(true)}
                >
                  Update Access Level
                </button>

                {/* Add and Remove tag not in V 1.0 */}
                {/* <button
                  className="text-white font-inconsolata font-semibold cursor-pointer text-sm hover:bg-secondary h-8 rounded-md"
                  onClick={() => setOpenAdd(true)}
                >
                  Add Tag
                </button> */}
                {/* <button
                  className="text-white font-inconsolata font-semibold cursor-pointer text-sm hover:bg-secondary h-8 rounded-md"
                  onClick={() => setOpenRemove(true)}
                >
                  Remove Tag
                </button> */}
              </div>
            </Options>
          </span>
        )}
      </td>
      <ReUseModal open={open} setOpen={setOpen}>
        <div className="w-full flex flex-col relative">
          <h1 className="text-white font-inconsolata text-2xl">
            Update Access Level
          </h1>
          <div className="flex items-center rounded-md h-12 border-secondary border px-4 mt-6 w-fit">
            <p className="text-white font-inconsolata capitalize">
              {item?.accessLevel}
            </p>
          </div>
          <div className="w-full mt-6 ">
            <PrimarySelect
              label="Select New Access level"
              selected={selectedRole}
              setSelected={setSelectedRole}
              data={[
                { name: "user", id: 0 },
                { name: "admin", id: 1 },
                { name: "super admin", id: 2 },
              ]}
            />
          </div>
          <div className="w-full  flex justify-center mt-10">
            <ActionButton
              type="button"
              text="Update"
              onPress={handleUpdateAccessLevel}
              buttonType="button-56"
              isLoading={updatingData}
              isValid={updatingData}
            />
          </div>
        </div>
      </ReUseModal>

      {/* Add Tag Modal not in V 1.0 */}
      {/* <ReUseModal open={openAdd} setOpen={setOpenAdd}>
        <div className="w-full flex flex-col relative">
          <h1 className="text-white font-inconsolata text-2xl">Add Tags</h1>
          <p className="font-inconsolata text-white mt-6">Saved Tags</p>
          <div className="w-full  flex flex-wrap gap-4 items-center mt-2">
            {dummyTags?.map((item, index) => {
              return (
                <div
                  className="flex items-center rounded-md text-secondary h-auto min-h-9 text-sm font-inconsolata border-secondary border px-3  w-fit"
                  key={index}
                >
                  <p className="text-white font-inconsolata">{item.name}</p>
                </div>
              );
            })}
          </div>
          <p className="font-inconsolata text-white mt-6">New Tags</p>
          <div className="w-full  flex flex-wrap gap-4 items-center mt-2">
            {tags?.map((item) => {
              return (
                <div
                  className="flex items-center rounded-md text-secondary h-auto min-h-9 text-sm font-inconsolata border-secondary border px-3  w-fit cursor-pointer"
                  key={item}
                  onClick={() => handleRemoveTag(item)}
                >
                  <p className="text-white font-inconsolata">{item}</p>
                </div>
              );
            })}
          </div>
          <div className="w-full mt-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a tag and press Enter"
              className="flex-grow focus:outline-none border-b border-b-secondary text-white bg-transparent w-full "
            />
          </div>
          {tags.length > 0 && (
            <p className="text-gray-400 text-sm mt-3">
              Click a tag to remove it.
            </p>
          )}
          <div className="w-full  flex justify-center mt-6">
            <ActionButton
              type="button"
              text="Update"
              onPress={() => setOpenAdd(false)}
              buttonType="button-56"
            />
          </div>
        </div>
      </ReUseModal> */}

      {/* Remove Tag not in V 1.0 */}
      {/* <ReUseModal open={openRemove} setOpen={setOpenRemove}>
        <div className="w-full flex flex-col relative">
          <h1 className="text-white font-inconsolata text-2xl">Remove Tags</h1>
          <p className="font-inconsolata text-white mt-6">List of Tags</p>
          <div className="w-full  flex flex-wrap gap-4 items-center mt-2">
            {allTags?.map((item, index) => {
              return (
                <div
                  className="flex items-center cursor-pointer rounded-md text-secondary h-auto min-h-9 text-sm font-inconsolata border-secondary border px-3  w-fit"
                  key={index}
                  onClick={() => handleRemoveSavedTag(item.id)}
                >
                  <p className="text-white font-inconsolata">{item.name}</p>
                </div>
              );
            })}
          </div>

          {allTags.length > 0 && (
            <p className="text-gray-400 text-sm mt-3">
              Click a tag to remove it.
            </p>
          )}
          <div className="w-full  flex justify-center mt-6">
            <ActionButton
              type="button"
              text="Update"
              onPress={() => setOpenRemove(false)}
              buttonType="button-56"
            />
          </div>
        </div>
      </ReUseModal> */}
    </tr>
  );
};
