'use client';
import { BobaVerseArcadeABI } from "@/assets/abi/BobaVerseArcade";
import { ArcadeAddressMap } from "@/utils/blockchain/addresses";
import { bobaEth } from "@/utils/blockchain/chains";
import { useState } from "react";
import { useAccount, useContractRead, useNetwork } from "wagmi";

const MyRankCard = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [ myStats, setMyStats ] = useState<[ number, number ]>([ -1, -1 ]);

  const now = new Date();

  useContractRead({
    address: ArcadeAddressMap[chain?.id || bobaEth.id],
    abi: BobaVerseArcadeABI,
    functionName: 'getLeaderboardFor',
    args: [ 0, BigInt(now.getFullYear()), BigInt(now.getMonth() + 1) ],
    enabled: !!address,
    onSuccess: ([ addresses, scores ]) => {
      if (!address) {
        return;
      }
      const ranks = addresses
        .map((a, i) => [ a, Number(scores[i]) ] as [ string, number ])
        .sort((a, b) => b[1] - a[1])
        .reduce((o, a, i) => {
          o[a[0]] = {
            score: a[1],
            rank: i + 1,
          }
          return o;
        }, {} as { [key: string]: { score: number, rank: number } });

      if (address in ranks) {
        setMyStats([ ranks[address].rank, ranks[address].score ]);
      }
    }
  })
  const suffix = [ 'st', 'nd', 'rd', 'th' ]
  return (
    <>
      <div className="flex justify-between">
        <span>My Rank</span>
        <span>My Score</span>
      </div>
      <div className="flex justify-between uppercase text-lg  font-semibold">
        <span>
          {myStats[0] === -1
            ? 'UNRANKED'
            : `${myStats[0]}${(
              myStats[0] % 10 - 1
            ) > 2 ? suffix[3] : suffix[myStats[0] % 10 - 1]} place`}
        </span>
        <span>{myStats[1] === -1 ? '0' : myStats[1]}</span>
      </div>
    </>
  )
}

export default MyRankCard;
