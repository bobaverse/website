import 'server-only';
import { Address, createPublicClient, http } from "viem";
import { normalize } from "viem/ens";
import { mainnet } from "viem/chains";

const client = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const getEnsData = async (address: Address) => {
  const data = {
    name: "",
    avatar: "",
    address
  }
  try {
    const name = await client.getEnsName({ address });
    if (name) {
      data.name = normalize(name);
      const tsAvatar = await client.getEnsText({ name: data.name, key: 'io.tradescrow.avatar' });
      if (tsAvatar) {
        data.avatar = tsAvatar;
      } else {
        const avatar = await client.getEnsAvatar({ name: data.name });
        if (avatar) {
          data.avatar = avatar;
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
  return data;
}
