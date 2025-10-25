import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  TonConnectUIProvider,
  TonConnectButton,
  useTonWallet
} from '@tonconnect/ui-react';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import Wallet from './pages/Wallet';
import Referrals from './pages/Referrals';
import Profile from './pages/Profile';

/**
 * The top-level component providing navigation and TON Connect context.
 */
const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const wallet = useTonWallet();

  // Fetch user info from Telegram WebApp if available
  useEffect(() => {
    // @ts-ignore -- Telegram API is injected into the global scope in the WebApp context
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.initDataUnsafe && tg.initDataUnsafe.user) {
      setUsername(tg.initDataUnsafe.user.username || tg.initDataUnsafe.user.first_name);
    }
  }, []);

  return (
    <TonConnectUIProvider manifestUrl={import.meta.env.VITE_TON_CONNECT_MANIFEST_URL} language="en">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/">Home</Link>
          <Link to="/lobby">Lobby</Link>
          <Link to="/wallet">Wallet</Link>
          <Link to="/referrals">Referrals</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {username && <span>Hello, {username}</span>}
          <TonConnectButton />
        </div>
      </header>
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </TonConnectUIProvider>
  );
};

export default App;
