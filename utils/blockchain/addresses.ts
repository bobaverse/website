import { bobaAvax, bobaBnb, bobaEth, bobaOpera, bobaBeam } from "@/utils/blockchain/chains";

export const ArcadeAddressMap: { [chainId: number]: `0x${string}` } = {
  [bobaEth.id]: "0x8a64123e26E3AE48ed08Ee3dBA67B9a57982Fd17",
  [bobaOpera.id]: "0x8a64123e26E3AE48ed08Ee3dBA67B9a57982Fd17",
  [bobaBeam.id]: "0x0f0256653CcaaD4cfAa2568CcE3b65cF13D10D72",
  [bobaAvax.id]: "0x4216118aD0B070217fDB7F3bb0fb24Cc98B1F95b",
  [bobaBnb.id]: "0x53d1B430C0bC7D808B635DAFE9520f18dcCf6E3a"
}