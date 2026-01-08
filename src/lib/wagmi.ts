import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { defineChain } from "viem";
import { injected } from "wagmi/connectors";

// Mantra Chain Dukong Testnet
export const mantraDukong = defineChain({
  id: 5887,
  name: "MANTRA Dukong Testnet",
  nativeCurrency: {
    name: "OM",
    symbol: "OM",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://evm.archive.dukong.mantrachain.io"],
    },
  },
  blockExplorers: {
    default: {
      name: "MANTRA Explorer",
      url: "https://explorer.dukong.mantrachain.io",
    },
  },
  testnet: true,
});

// Local development chain
export const mantraLocal = defineChain({
  id: 7888,
  name: "MANTRA Local",
  nativeCurrency: {
    name: "OM",
    symbol: "OM",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:26651"],
    },
  },
  testnet: true,
});

// Anvil local development
export const anvil = defineChain({
  id: 31337,
  name: "Anvil",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
    },
  },
  testnet: true,
});

export const config = createConfig({
  chains: [mantraDukong, mantraLocal, anvil],
  connectors: [
    injected({
      shimDisconnect: true,
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [mantraDukong.id]: http("https://evm.archive.dukong.mantrachain.io"),
    [mantraLocal.id]: http("http://127.0.0.1:26651"),
    [anvil.id]: http("http://127.0.0.1:8545"),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
