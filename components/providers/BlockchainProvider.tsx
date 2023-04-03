'use client';

import { FC } from "react";
import { PageProps } from "@/interfaces";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chains, wagmiClient } from "@/utils/blockchain";
import rainbowkitTheme from "@/styles/rainbowkit";

const BlockchainProvider: FC<PageProps> = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        appInfo={{ appName: "BobaVerse" }}
        theme={rainbowkitTheme}
      >
        <div className="flex flex-col h-full">{children}</div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default BlockchainProvider;