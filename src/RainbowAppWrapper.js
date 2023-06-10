import React from "react";
import App from "./App";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { filecoin } from "./constants/fil";

const { chains, provider, webSocketProvider } = configureChains(
  [filecoin, chain.polygonMumbai, chain.mainnet],
  /**@notice This is Alchemy's default API key.
      You can get your own at https://dashboard.alchemyapi.io */
  [
    alchemyProvider({ apiKey: "bEMWCe04MJ2C_CgSPrXdiYOcmGj_4jRP" }),
    publicProvider(),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== filecoin.id) return null;
        return filecoin.rpcUrls.default.http;
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Dual GameFi",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const RainbowAppWrapper = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: "#4F46E5",
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "system",
        })}
      >
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default RainbowAppWrapper;
