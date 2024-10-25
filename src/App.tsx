import "./App.css";
import { PrivyProvider } from "@privy-io/react-auth";
import SignIn from "./Components/SignIn/SignIn";

function App() {
  return (
    <>
      <PrivyProvider
        appId={`${process.env.REACT_APP_PRIVY_APP_ID}`}
        config={{
          // Display email and wallet as login methods
          loginMethods: ["email", "wallet"],
          // Customize Privy's appearance in your app
          appearance: {
            theme: "light",
            accentColor: "#1E2211",
            logo: "https://www.onchainarmy.xyz/static/media/soldier-1.e32781844491acdf5400660b848ad420.svg",
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
