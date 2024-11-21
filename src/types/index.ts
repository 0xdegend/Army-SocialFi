import { ReactNode } from "react";
export type ISidebarButtonName =
  | "dashboard"
  | "leaderboard"
  | "campaigns"
  | "my points"
  | "meme bank"
  | "logout"
  | any;

export interface SidebarButtonProps {
  name: string;
  icon: ReactNode;
}

export interface IButtonProps {
  onPress?: (e?: any) => void;
  text: string | ReactNode;
  isValid?: boolean;
  isLoading?: boolean;
  buttonType?: string;
}
