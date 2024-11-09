import React from "react";
import SideBarButton from "../utils/buttons/SideBarButton";
import armyLogo from "../../assets/images/soldier-asset-1.svg";
import { ISidebarButtonName } from "../../types";
import { usePrivy } from "@privy-io/react-auth";
import LogoutButton from "../utils/buttons/LogoutButton";
import { useNavigate } from "react-router-dom";
function SideBar() {
  const buttonName: ISidebarButtonName[] = [
    "dashboard",
    "leaderboard",
    "campaigns",
    "my points",
    "meme bank",
  ];
  const { logout } = usePrivy();
  const navigate = useNavigate();
  const handleLogout = () => {
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
              <SideBarButton key={i} name={item} />
            ))}
          </div>
        </div>
        <LogoutButton onPress={handleLogout} text="Logout" title="" />
      </div>
    </div>
  );
}

export default SideBar;
