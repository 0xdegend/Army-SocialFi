// @ts-nocheck
import "./App.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import SignIn from "./pages/SignIn/SignIn";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Guard/Guard";
import Dashboard from "./pages/Dashboard/Dashboard";
import WalletBallance from "./Components/WalletBallance/WalletBallance";
import Overview from "./Components/Overview/Overview";
import Leaderboard from "./pages/Dashboard/Leaderboard";
import LoadingOverlay from "./Components/LoadingOverlay/LoadingOverlay";
import MemeBankPage from "./pages/MemeBank";
import MyPointsPage from "./pages/Points/MyPoints";
import Campaigns from "./pages/Campaign";

const solanaConnectors = toSolanaWalletConnectors({
  // By default, shouldAutoConnect is enabled
  shouldAutoConnect: true,
});

//For Mainnet
const endpoint = `https://solana-mainnet.core.chainstack.com/${process.env.REACT_APP_COINSTACK_PRIVATE_KEY}`;
if (!window.Buffer) {
  window.Buffer = Buffer;
}
function App() {
  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <PrivyProvider
          appId={`${process.env.REACT_APP_PRIVY_APP_ID}`}
          config={{
            appearance: {
              walletChainType: "solana-only",
              theme: "dark",
              accentColor: "#1E2211",
              logo: "https://www.onchainarmy.xyz/logo192.png",
              landingHeader: "Connect Wallet",
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
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
              </Route>
                {/* <Route path="/sksks" element={<Overview />} /> */}
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/meme-bank" element={<MemeBankPage />} />
                <Route path="/my-points" element={<MyPointsPage />} />
            </Routes>
          </Router>
        </PrivyProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
