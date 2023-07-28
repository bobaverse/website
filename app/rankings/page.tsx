import GameDropdown from "@/app/rankings/game-dropdown";
import RegionDropdown from "@/app/rankings/region-dropdown";
import SeasonTabs from "@/app/rankings/season-tabs";
import GameControllerPNG from "@/assets/game-controller.png";
import { GoldCrownIcon, LeaderboardIcon, PlinkoIcon } from "@/components/icons";
import { getAddressFromCookie } from "@/components/providers/cookie-server-action";
import { getEnsData } from "@/utils/blockchain/server";

// profile Page
import Image from "next/image";
import { FaBasketball } from "react-icons/fa6";
import { GiPinballFlipper, GiQueenCrown } from "react-icons/gi";

const gameOptions = [
  { text: "Plinko", value: "plinko", icon: <PlinkoIcon size={20} /> },
  { text: "Planko", value: "planko", icon: <FaBasketball size={20} /> },
  { text: "Plonko", value: "plonko", icon: <GiPinballFlipper size={20} /> },
]

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
      <div className="flex space-x-4 mb-4">
        <GameDropdown options={gameOptions} />
        <RegionDropdown />
      </div>
      <SeasonTabs />
      <div className="relative w-[380px] mt-4">
        <div className="grid grid-cols-3 h-full min-h-full text-center text-xs">
          <div className="flex flex-col h-[220px] pt-16 pl-5">
            <span>PlayerName</span>
            <span>0x0000...0000</span>
            <span>1234</span>
          </div>
          <div className="flex flex-col items-center">
            <GoldCrownIcon size={40} className="rotate-[20deg] ml-5" />
            <span>PlayerName</span>
            <span>0x0000...0000</span>
            <span>1234</span>
          </div>
          <div className="flex flex-col pt-[5.5rem] pr-5">
            <span>PlayerName</span>
            <span>0x0000...0000</span>
            <span>1234</span>
          </div>
        </div>
        <LeaderboardIcon size={380} className="h-[130px] absolute bottom-0" />
      </div>
      <div className="flex flex-col space-y-3 w-full max-w-sm pt-4">
        {Array.from(Array(10)).map((_, i) => (
          <div key={i} className="flex bg-[#4A4A4A] py-2 px-4 w-full justify-between items-center rounded-xl">
            <div className="flex space-x-4 items-center">
              <span className="w-5 text-center">{i + 1}</span>
              <PlinkoIcon size={40} className="fill-white" />
            </div>
            <div className="w-full flex flex-col text-center">
              <span>Player</span>
              <span className="text-xs">0x0000...0000</span>
            </div>
            <span>{(
              i + 1
            ) * 100}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
