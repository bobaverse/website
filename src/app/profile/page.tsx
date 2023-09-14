import GameControllerPNG from "@/assets/game-controller.png";
import { BronzeCrownIcon, GoldCrownIcon, PlinkoIcon, SilverCrownIcon } from "@/components/icons";
import { getAddressFromCookie } from "@/components/providers/cookie-server-action";
import { getEnsData } from "@/utils/blockchain/server";

// profile Page
import Image from "next/image";
import { GiQueenCrown } from "react-icons/gi";

const Page = async () => {
  let ensName = "Bobarian";
  let ensAvatar: string | null = null;
  const address = getAddressFromCookie();
  if (address) {
    const ensData = await getEnsData(address);
    if (ensData.name) {
      ensName = ensData.name;
    }
    ensAvatar = ensData.avatar;

  }

  return (
    <div className="flex flex-col h-full content-center items-center pt-[80px] lg:pt-[100px]">
      <Image
        src={ensAvatar || GameControllerPNG}
        alt="Profile picture"
        height={200}
        width={200}
        className="rounded-xl"
        unoptimized={!!ensAvatar}
      />
      <div className="mt-4 text-center">
        <h4 className="font-medium text-boba-green">{ensName}</h4>
        <span className="text-sm">{address.slice(0, 6)}...{address.slice(-4)}</span>
      </div>
      <div className="mt-4 text-center">
        <p className="font-medium">
          <span className="text-boba-green">Boba</span>Verse Awards
        </p>
        <div className="flex space-x-4">
          {Array.from(Array(3)).map((_, i) => (
            <div key={i}>
              {i === 0 && (
                <GoldCrownIcon size={60} />
              )}
              {i === 1 && (
                <SilverCrownIcon size={60} />
              )}
              {i === 2 && (
                <BronzeCrownIcon size={60} />
              )}
              <span>{(i + 1) * 3}</span>
            </div>

          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-3 mt-4 text-center w-full max-w-md pb-4">
        <span className="font-medium text-boba-green text-lg">Recent Activity</span>
        <div className="flex flex-col space-y-3 w-full px-4">
          {Array.from(Array(10)).map((_, i) => (
            <div key={i} className="flex bg-[#4A4A4A] py-2 px-4 w-full justify-between items-center rounded-xl">
              <div className="flex space-x-4 items-center">
                <span>Plinko</span>
                <PlinkoIcon size={40} className="fill-white" />
              </div>
              <span>Score: {(i + 1) * 100}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
