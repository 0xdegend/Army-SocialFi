// @ts-nocheck
import "./App.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import SignIn from "./pages/SignIn/SignIn";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Guard/Guard";
import Dashboard from "./pages/Dashboard/Dashboard";
import Leaderboard from "./pages/Dashboard/Leaderboard";
import MemeBankPage from "./pages/MemeBank";
import MyPointsPage from "./pages/Points/MyPoints";
import { LedgerWalletAdapter } from "@solana/wallet-adapter-ledger";
import Campaigns from "./pages/Campaign";
import { usePrivy } from "@privy-io/react-auth";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
const solanaConnectors = toSolanaWalletConnectors({
  // By default, shouldAutoConnect is enabled
  connectors: [
    new LedgerWalletAdapter({
      network: WalletAdapterNetwork.Mainnet,
      timeout: 10000, // optional
    }),
  ],
  shouldAutoConnect: true,
});

//For Mainnet
const endpoint = `https://solana-mainnet.core.chainstack.com/${process.env.REACT_APP_COINSTACK_PRIVATE_KEY}`;
if (!window.Buffer) {
  window.Buffer = Buffer;
}
function App() {
  const { user, logout } = usePrivy();
  const isAuthenticated = user && user.twitter?.username;
  const hasSolanaWallet = user?.wallet?.chainType === "solana";
  const userAuth = localStorage.getItem("userAuth");
  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <PrivyProvider
          appId={`${process.env.REACT_APP_PRIVY_APP_ID}`}
          config={{
            appearance: {
              walletChainType: "ethereum-and-solana",
              walletList: ["detected_ethereum_wallets", "detected_solana_wallets"],
              theme: "dark",
              accentColor: "#1E2211",
              logo: "https://www.onchainarmy.xyz/logo192.png",
              landingHeader: "Login or Sign up",
            },
            externalWallets: {
              solana: {
                connectors: solanaConnectors,
              },
            },
          }}
        >
          <Router>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/leaderboard"
                  element={
                    <ProtectedRoute>
                      {" "}
                      <Leaderboard />{" "}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/campaigns"
                  element={
                    <ProtectedRoute>
                      <Campaigns />{" "}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/meme-bank"
                  element={
                    <ProtectedRoute>
                      {" "}
                      <MemeBankPage />{" "}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-points"
                  element={
                    <ProtectedRoute>
                      {" "}
                      <MyPointsPage />{" "}
                    </ProtectedRoute>
                  }
                />
              </>
            </Routes>
          </Router>
        </PrivyProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
