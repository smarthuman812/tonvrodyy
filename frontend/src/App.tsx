import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Wallet from "./pages/Wallet";
import Referrals from "./pages/Referrals";
import Profile from "./pages/Profile";

/**
 * The top-level component providing navigation and TON Connect context.
 */
const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  // Fetch user info from Telegram WebApp if available
  useEffect(() => {
    // Telegram API is injected into the global scope in the WebApp context
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      setUsername(tg.initDataUnsafe.user.username || tg.initDataUnsafe.user.first_name);
    }
  }, []);

  return (
    <TonConnectUIProvider
      manifestUrl={import.meta.env.VITE_TON_CONNECT_MANIFEST_URL}
      language="en"
    >
      <Layout username={username}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </TonConnectUIProvider>
  );
};

export default App;
