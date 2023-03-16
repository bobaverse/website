'use client';

import "@rainbow-me/rainbowkit/styles.css";

import { FC } from "react";
import { PageProps } from "@/interfaces";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chains, wagmiClient } from "@/utils/blockchain";
import rainbowkitTheme from "@/utils/blockchain/rainbowkit.theme";

const BlockchainProvider: FC<PageProps> = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        appInfo={{ appName: "Tradescrow" }}
        theme={rainbowkitTheme}
      >
        <div className="flex flex-col h-full">{children}</div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default BlockchainProvider;