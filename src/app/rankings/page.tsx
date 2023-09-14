import GameDropdown from "@/app/rankings/game-dropdown";
import LiveRankings from "@/app/rankings/live-rankings";
import RegionDropdown from "@/app/rankings/region-dropdown";
import SeasonTabs from "@/app/rankings/season-tabs";
import { PlinkoIcon } from "@/components/icons";

import { FaBasketball } from "react-icons/fa6";
import { GiPinballFlipper } from "react-icons/gi";

const gameOptions = [
  { text: "Plinko", value: "plinko", icon: <PlinkoIcon size={20} /> },
  { text: "Planko", value: "planko", icon: <FaBasketball size={20} /> },
  { text: "Plonko", value: "plonko", icon: <GiPinballFlipper size={20} /> },
]

const regionOptions = [
  { text: "Global", value: "global", icon: <PlinkoIcon size={20} /> },
  { text: "ETH", value: "eth", icon: <FaBasketball size={20} /> },
  { text: "BSC", value: "bsc", icon: <GiPinballFlipper size={20} /> },
]

const periodOptions = [
  { text: 'This Season', value: "now" },
  { text: 'Last Season', value: "last" },
  { text: 'Lifetime', value: "lifetime" },
]

const Page = ({ searchParams: pageSearchParams }: { searchParams: Record<string, string> }) => {
  const searchParams = new URLSearchParams(pageSearchParams);
  const gameParam = searchParams.get("game")?.toLowerCase() || "";
  const regionParam = searchParams.get("region")?.toLowerCase() || "";
  const periodParam = searchParams.get("period")?.toLowerCase() || "";
  const query = {
    game: gameOptions.map(go => go.value).includes(gameParam) ? gameParam : gameOptions[0].value,
    region: regionOptions.map(ro => ro.value).includes(regionParam) ? regionParam : regionOptions[0].value,
    period: periodOptions.map(po => po.value).includes(periodParam) ? periodParam : periodOptions[0].value,
  }

  return (
    <div className="flex flex-col h-full content-center items-center pt-[80px] lg:pt-[100px]">
      <div className="flex space-x-4 mb-4">
        <GameDropdown options={gameOptions} query={query} />
        <RegionDropdown options={regionOptions} query={query} />
      </div>
      <SeasonTabs options={periodOptions} query={query} />

      <LiveRankings className="pt-4" />
    </div>
  );
}

export default Page;
