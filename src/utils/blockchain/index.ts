import { configureChains, createConfig } from "wagmi";
import { publicProvider } from 'wagmi/providers/public';

import { connectorsForWallets, Chain } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
  trustWallet,
  braveWallet,
  ledgerWallet,
  safeWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { BobaChains } from "@/utils/blockchain/chains";

const appName = 'BobaVerse';
const projectId = 'd73a22a0f3ba599389de065dae9fbb22';

const defaultChains: Chain[] = [
  {
    ...BobaChains.bobaEth,
    iconUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024',
  },
  {
    ...BobaChains.bobaBnb,
    iconUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=024',
  }
]
const { chains, publicClient } = configureChains(
  defaultChains,
  [ publicProvider() ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains, projectId }),
      walletConnectWallet({ chains, projectId }),
    ],
  },
  { groupName: 'Popular', wallets: [ trustWallet({ chains, projectId }), braveWallet({ chains }) ] },
  { groupName: 'Others', wallets: [ safeWallet({ chains }), ledgerWallet({ chains, projectId }) ] },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export {
  chains,
  wagmiConfig
}
