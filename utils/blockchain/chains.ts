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

export const bobaOpera = {
  id: 301,
  name: 'Boba Opera',
  network: 'bobaopera',
  nativeCurrency: {
    decimals: 18,
    name: 'Boba',
    symbol: 'BOBA',
  },
  rpcUrls: {
    public: { http: ['https://bobaopera.boba.network'] },
    default: { http: ['https://replica.bobaopera.boba.network'] },
  },
  blockExplorers: {
    blockscout: { name: 'Block Explorer', url: 'https://blockexplorer.bobaopera.boba.network/' },
    default: { name: 'Block Explorer', url: 'https://blockexplorer.bobaopera.boba.network/' },
  },
  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 11_907_934,
  //   },
  // },
} as const satisfies Chain

export const bobaBeam = {
  id: 1_294,
  name: 'Boba Beam',
  network: 'bobabeam',
  nativeCurrency: {
    decimals: 18,
    name: 'Boba',
    symbol: 'BOBA',
  },
  rpcUrls: {
    public: { http: ['https://bobabeam.boba.network'] },
    default: { http: ['https://replica.bobabeam.boba.network'] },
  },
  blockExplorers: {
    blockscout: { name: 'Block Explorer', url: 'https://blockexplorer.bobabeam.boba.network/' },
    default: { name: 'Block Explorer', url: 'https://blockexplorer.bobabeam.boba.network/' },
  },
  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 11_907_934,
  //   },
  // },
} as const satisfies Chain

export const bobaAvax = {
  id: 43_288,
  name: 'Boba Avax',
  network: 'bobaavax',
  nativeCurrency: {
    decimals: 18,
    name: 'Boba',
    symbol: 'BOBA',
  },
  rpcUrls: {
    public: { http: ['https://avax.boba.network'] },
    default: { http: ['https://replica.avax.boba.network'] },
  },
  blockExplorers: {
    blockscout: { name: 'Block Explorer', url: 'https://blockexplorer.avax.boba.network/' },
    default: { name: 'Block Explorer', url: 'https://blockexplorer.avax.boba.network/' },
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
    blockscout: { name: 'Block Explorer', url: 'https://blockexplorer.bnb.boba.network/' },
    default: { name: 'Block Explorer', url: 'https://blockexplorer.bnb.boba.network/' },
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
  bobaOpera,
  bobaBeam,
  bobaAvax,
  bobaBnb
} as const
