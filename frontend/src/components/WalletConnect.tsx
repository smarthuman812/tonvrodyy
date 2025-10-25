import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';

/**
 * A simple wrapper around the TON Connect button. Can be used anywhere in the app.
 */
const WalletConnect: React.FC = () => {
  return <TonConnectButton />;
};

export default WalletConnect;