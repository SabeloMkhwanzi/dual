export const filecoin = {
  id: 3141,
  name: "FIL Hyperspace",
  network: "filecoin",
  iconUrl: "https://filfox.info/favicon.ico",
  iconBackground: "#333",
  nativeCurrency: {
    decimals: 18,
    name: "tFIL",
    symbol: "tFIL",
  },
  rpcUrls: {
    default: {
      http: [
        "https://filecoin-hyperspace.chainstacklabs.com/rpc/v1",
        // "https://api.hyperspace.node.glif.io/rpc/v1",
      ],
    },
  },
  blockExplorers: {
    default: { name: "Filfox", url: "https://hyperspace.filfox.info/en" },
  },
  testnet: true,
};
