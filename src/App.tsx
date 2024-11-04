// @ts-nocheck
import "./App.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import SignIn from "./pages/SignIn/SignIn";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Guard/Guard";
import Profile from "./pages/Profile/Profile";

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
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </PrivyProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
