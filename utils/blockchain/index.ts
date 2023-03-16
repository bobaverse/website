import { configureChains, createClient } from "wagmi";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
// Left JIC
// import { alchemyProvider } from 'wagmi/providers/alchemy';
// import { infuraProvider } from 'wagmi/providers/infura';


import { connectorsForWallets, Chain } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  imTokenWallet,
  omniWallet,
  trustWallet,
  braveWallet,
  argentWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { BobaChains } from "@/utils/blockchain/chains";

const appName = 'Tradescrow';

const defaultChains: Chain[] = [
  {
    ...BobaChains.bobaEth,
    iconUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024',
  },
  {
    ...BobaChains.bobaOpera,
    iconUrl: 'https://cryptologos.cc/logos/fantom-ftm-logo.svg?v=024',
  },
  {
    ...BobaChains.bobaBeam,
    iconUrl: 'https://cryptologos.cc/logos/beam-beam-logo.svg?v=024',
  },
  {
    ...BobaChains.bobaAvax,
    iconUrl: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=024',
  },
  {
    ...BobaChains.bobaBnb,
    iconUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=024',
  }
]
const { chains, provider } = configureChains(
  defaultChains,
  [
    jsonRpcProvider({
      priority: 0,
      rpc: (chain) => ({
        http: chain.rpcUrls.default.http[0],
      }),
    }),
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    // infuraProvider({ apiKey: process.env.INFURA_ID }),
    publicProvider({ priority: 1 })
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains, shimDisconnect: true }),
      walletConnectWallet({ chains }),
    ],
  },
  {
    groupName: 'Popular',
    wallets: [
      ledgerWallet({ chains }),
      trustWallet( { chains, shimDisconnect: true }),
      braveWallet( { chains, shimDisconnect: true }),
      coinbaseWallet({ appName, chains }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      rainbowWallet({ chains, shimDisconnect: true }),
      imTokenWallet( { chains }),
      omniWallet( { chains }),
      argentWallet( { chains }),
      metaMaskWallet({ chains, shimDisconnect: true }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

export {
  chains,
  wagmiClient
}