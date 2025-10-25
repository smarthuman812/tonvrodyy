import './styles/visual-layer.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import App from './App';
import theme from './styles/theme';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {/*
        Wrap the application with the TonConnectUIProvider. This provider exposes
        a context used by the TON Connect UI components to manage wallet
        connections. The manifestUrl points to the publicly hosted manifest
        describing this application for TON Connect.
      */}
      <TonConnectUIProvider manifestUrl="https://tonvrodyy-frontend.vercel.app/.well-known/tonconnect-manifest.json">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TonConnectUIProvider>
    </ChakraProvider>
  </React.StrictMode>,
);