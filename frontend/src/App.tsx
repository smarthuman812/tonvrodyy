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
    <div className="sparks-field">
  {Array.from({ length: 1000 }).map((_, i) => {
    const colors = ["red", "orange", "white"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return (
      <div
        key={i}
        className={`spark ${color}`}
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${10 + Math.random() * 40}s`,
          "--x-start": `${Math.random() * 100 - 50}px`,
          "--y-start": `${Math.random() * 100 - 50}px`,
          "--x-mid": `${Math.random() * 200 - 100}px`,
          "--y-mid": `${Math.random() * 200 - 100}px`,
          "--x-end": `${Math.random() * 100 - 50}px`,
          "--y-end": `${Math.random() * 100 - 50}px`,
        } as React.CSSProperties}
      />
    );
  })}
</div>
    {/* Весь интерфейс */}
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
