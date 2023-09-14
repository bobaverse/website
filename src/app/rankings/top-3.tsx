import { GoldCrownIcon, LeaderboardIcon } from "@/components/icons";
import { PlinkoPlayer } from "@/interfaces/plinko";
import { classNames } from "@/utils/strings";


interface RankingsTopThreeProps {
  top3: PlinkoPlayer[];
  className?: string;
}

const RankingsTop3 = ({ top3, className }: RankingsTopThreeProps) => {
  const firstPlace = top3.find((p) => p.rank === 1);
  const secondPlace = top3.find((p) => p.rank === 2);
  const thirdPlace = top3.find((p) => p.rank === 3);

  return (
    <div className={classNames("relative w-[380px]", className)}>
      <div className="grid grid-cols-3 h-full min-h-full text-center text-xs">
        <div className="flex flex-col h-[220px] pt-16 pl-5">
          {secondPlace && secondPlace.score > 0 && (
            <>
              <span>PlayerName</span>
              <span>{secondPlace.address.slice(0, 6)}...{secondPlace.address.slice(-4)}</span>
              <span>{secondPlace.score}</span>
            </>
          )}
        </div>
        <div className="flex flex-col items-center">
          {firstPlace && firstPlace.score > 0 && (
            <>
              <GoldCrownIcon size={40} className="rotate-[20deg] ml-5" />
              <span>PlayerName</span>
              <span>{firstPlace.address.slice(0, 6)}...{firstPlace.address.slice(-4)}</span>
              <span>{firstPlace.score}</span>
            </>
          )}

        </div>
        <div className="flex flex-col pt-[5.5rem] pr-5">
          {thirdPlace && thirdPlace.score > 0 && (
            <>
              <span>PlayerName</span>
              <span>{thirdPlace.address.slice(0, 6)}...{thirdPlace.address.slice(-4)}</span>
              <span>{thirdPlace.score}</span>
            </>
          )}
        </div>
      </div>
      <LeaderboardIcon size={380} className="h-[130px] absolute bottom-0" />
    </div>
  );
}

export default RankingsTop3;
