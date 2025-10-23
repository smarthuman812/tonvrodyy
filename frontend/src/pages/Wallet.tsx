import React from 'react';
import { useTonWallet } from 'tonconnect-ui-react';

/**
 * Wallet page displays wallet connection state and address using TON Connect.
 */
const WalletPage: React.FC = () => {
  const wallet = useTonWallet();
  return (
    <div>
      <h2>Your Wallet</h2>
      {wallet ? (
        <div>
          <p>Connected wallet: {wallet.account.address}</p>
          {/* Additional wallet actions such as deposit could be implemented here */}
        </div>
      ) : (
        <p>Please connect your TON wallet using the button in the header.</p>
      )}
    </div>
  );
};

export default WalletPage;
