// @ts-nocheck
import "./App.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import SignIn from "./Components/SignIn/SignIn";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";

const solanaConnectors = toSolanaWalletConnectors({
  // By default, shouldAutoConnect is enabled
  shouldAutoConnect: true,
});

//For Mainnet
const endpoint = `https://solana-mainnet.core.chainstack.com/${process.env.REACT_APP_COINSTACK_PRIVATE_KEY}`;

function App() {
  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <PrivyProvider
          appId={`${process.env.REACT_APP_PRIVY_APP_ID}`}
          config={{
            loginMethods: ["wallet"],
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
            // Create embedded wallets for users who don't have a wallet
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
          }}
        >
          <SignIn />
        </PrivyProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
