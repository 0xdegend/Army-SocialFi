import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { Spin } from "antd";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, logout, ready } = usePrivy();
  const isAuthenticated = user && user.twitter?.username;
  const hasSolanaWallet = user?.wallet?.chainType === "solana";
  const userAuth = localStorage.getItem("userAuth");


  if (!ready) {
    // Show a loading indicator while waiting for Privy to initialize
    return <Spin fullscreen/>;
  }

  if (!isAuthenticated || !hasSolanaWallet || !userAuth) {
    return <Navigate to="/" replace />;
  }

  // If both checks pass, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
