import "./App.css";
import { PrivyProvider } from "@privy-io/react-auth";
import SignIn from "./Components/SignIn/SignIn";

function App() {
  return (
    <>
      <PrivyProvider
        appId={`${process.env.REACT_APP_PRIVY_APP_ID}`}
        config={{
          loginMethods: ["wallet"],
          appearance: {
            theme: "dark",
            accentColor: "#1E2211",
            logo: "https://www.onchainarmy.xyz/logo192.png",
            landingHeader: 'Connect Wallet', 
          },
          // Create embedded wallets for users who don't have a wallet
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
          },
        }}
      >
        <SignIn />
      </PrivyProvider>
    </>
  );
}

export default App;
