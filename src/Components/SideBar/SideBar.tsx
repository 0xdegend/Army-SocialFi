import React from "react";
import SideBarButton from "../utils/buttons/SideBarButton";
import armyLogo from "../../assets/images/soldier-asset-1.svg";
import { ISidebarButtonName } from "../../types";
import { usePrivy } from "@privy-io/react-auth";
import LogoutButton from "../utils/buttons/LogoutButton";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
interface UserData {
  accessLevel?: string; // Add other fields as required
  userMainData?: any;
}
function SideBar() {
  const userData: UserData = useAppSelector((state) => state.user);
  const buttonName = [
    {
      name: "dashboard",
      url: "dashboard",
    },
    {
      name: "leaderboard",
      url: "leaderboard",
    },
    {
      name: "campaigns",
      url: "campaigns",
    },
    // {
    //   name: "my points",
    //   url: "my-points",
    // },
    {
      name: "meme bank",
      url: "meme-bank",
    },

    //Admin Navigation not in V1
    // ...(userData?.userMainData?.accessLevel === "super admin" ||
    // userData?.userMainData?.accessLevel === "admin"
    //   ? [
    //       {
    //         name: "Admin",
    //         url: "admin",
    //       },
    //     ]
    //   : []),
  ];
  const { logout } = usePrivy();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("userAuth", "");
    logout();
    navigate("/");
  };
  return (
    <div>
      <div className="px-2 flex flex-col pb-8 h-[100vh] mt-5">
        <div className="flex-1 flex flex-col gap-y-6">
          <div className="logo h-[80.677px]">
            <img src={armyLogo} alt="logo" />
          </div>
          <div>
            {buttonName.map((item, i: number) => (
              <SideBarButton key={i} name={item?.name} url={item?.url} />
            ))}
          </div>
        </div>
        <LogoutButton onPress={handleLogout} text="Logout" title="" />
      </div>
    </div>
  );
}

export default SideBar;
