import { Chain } from 'wagmi'

export const bobaEth = {
  id: 288,
  name: 'Boba Eth',
  network: 'bobaeth',
  nativeCurrency: {
    decimals: 18,
    name: 'Boba',
    symbol: 'BOBA',
  },
  rpcUrls: {
    public: { http: ['https://mainnet.boba.network'] },
    default: { http: ['https://lightning-replica.boba.network'] },
  },
  blockExplorers: {
    etherscan: { name: 'Bobascan', url: 'https://bobascan.com/' },
    default: { name: 'Bobascan', url: 'https://bobascan.com/' },
  },
  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 11_907_934,
  //   },
  // },
} as const satisfies Chain

export const bobaBnb = {
  id: 56_288,
  name: 'Boba BNB',
  network: 'bobabnb',
  nativeCurrency: {
    decimals: 18,
    name: 'Boba',
    symbol: 'BOBA',
  },
  rpcUrls: {
    public: { http: ['https://bnb.boba.network'] },
    default: { http: ['https://replica.bnb.boba.network'] },
  },
  blockExplorers: {
    blockscout: { name: 'Block Explorer', url: 'https://bnb.bobascan.com/' },
    default: { name: 'Block Explorer', url: 'https://bnb.bobascan.com/' },
  },
  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 11_907_934,
  //   },
  // },
} as const satisfies Chain

export const BobaChains = {
  bobaEth,
  bobaBnb
} as const
