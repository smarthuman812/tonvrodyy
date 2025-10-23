import React from 'react';
import { ConnectButton } from 'tonconnect-ui-react';

/**
 * A simple wrapper around the TON Connect button. Can be used anywhere in the app.
 */
const WalletConnect: React.FC = () => {
  return <ConnectButton />;
};

export default WalletConnect;
