'use client';

import AddressManager from "@/components/providers/AddressManager";
import { FC } from "react";
import { PageProps } from "@/interfaces";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chains, wagmiConfig } from "@/utils/blockchain";
import rainbowkitTheme from "@/styles/rainbowkit";

const BlockchainProvider: FC<PageProps> = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={{ appName: "BobaVerse" }}
        theme={rainbowkitTheme}
      >
        <div className="flex flex-col h-full">{children}</div>
        <AddressManager />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default BlockchainProvider;
