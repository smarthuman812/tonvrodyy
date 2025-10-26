import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Wallet from "./pages/Wallet";
import Referrals from "./pages/Referrals";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
