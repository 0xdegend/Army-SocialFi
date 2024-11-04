import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = usePrivy();
  const isAuthenticated = user && user.twitter?.username;
  const hasSolanaWallet = user?.wallet?.chainType === "solana";

  if (!isAuthenticated || !hasSolanaWallet) {
    return <Navigate to="/" replace />;
  }

  // If both checks pass, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
