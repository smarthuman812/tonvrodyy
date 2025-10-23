import React from 'react';

/**
 * Home page of the application. Presents a brief overview of features.
 */
const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to TONRODY</h1>
      <p>
        This is a demo decentralized lobby and referral system powered by TON Connect and
        Telegram WebApp. Use the navigation above to explore lobbies, manage your wallet,
        invite friends, and view your profile.
      </p>
    </div>
  );
};

export default Home;
