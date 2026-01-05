import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { mainnet, base, anvil } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [anvil, base, mainnet],
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
    [anvil.id]: http("http://127.0.0.1:8545"),
    [base.id]: http(),
    [mainnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
