import { http } from "@wagmi/core";
import { polygonZkEvmCardona, baseSepolia } from "viem/chains";
import { createConfig } from "wagmi";
import { walletConnect } from "wagmi/connectors";

const connector = walletConnect({
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
});

export const wagmiClient = createConfig({
  connectors: [connector],
  chains: [polygonZkEvmCardona, baseSepolia],
  transports: {
    [polygonZkEvmCardona.id]: http(),
    [baseSepolia.id]: http()
  },
});