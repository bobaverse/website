"use client";
import RankingsTop3 from "@/app/rankings/top-3";
import { BobaVerseArcadeABI } from "@/assets/abi/BobaVerseArcade";
import { PlinkoIcon } from "@/components/icons";
import { PlinkoPlayer } from "@/interfaces/plinko";
import { ArcadeAddressMap } from "@/utils/blockchain/addresses";
import { bobaEth } from "@/utils/blockchain/chains";
import { classNames } from "@/utils/strings";

import React, { useState } from "react";
import { useContractRead, useNetwork } from "wagmi";

interface LiveRankingsProps {
  month?: number;
  year?: number;
  className?: string;
}

const LiveRankings = ({
                        month = new Date().getMonth() + 1,
                        year = new Date().getFullYear(),
                        className,
                      }: LiveRankingsProps) => {
  const { chain } = useNetwork();
  const [ topTen, setTopTen ] = useState<PlinkoPlayer[]>(Array.from(Array(10))
    .map((_, i) => (
      {
        address: "0x0000...0000",
        score: 0,
        rank: i + 1,
      }
    )));

  // const now = new Date();

  useContractRead({
    address: ArcadeAddressMap[chain?.id || bobaEth.id],
    abi: BobaVerseArcadeABI,
    functionName: "getLeaderboardFor",
    args: [ 0, BigInt(year), BigInt(month) ],
    onSuccess: ([ addresses, scores ]) => {
      const ranks = addresses
        .map((a, i) => [ a, Number(scores[i]) ] as [ string, number ])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map((a, i) => (
          {
            address: a[0],
            score: a[1],
            rank: i + 1,
          }
        ));
      if (ranks.length < 10) {
        for (let i = ranks.length; i < 10; i++) {
          ranks.push({
            address: "0x0000...0000",
            score: 0,
            rank: i + 1,
          });
        }
      }
      if (ranks !== topTen) {
        setTopTen(ranks);
      }
    },
  });

  return (
    <>
      <RankingsTop3 top3={topTen.slice(0, 3)} className="mt-4" />
      <div className={classNames("flex flex-col space-y-3 w-full max-w-sm", className)}>
        {topTen.slice(3).map((p, i) => (
          <div key={i} className="flex bg-[#4A4A4A] py-2 px-4 w-full justify-between items-center rounded-xl">
            <div className="flex space-x-4 items-center">
              <span className="w-5 text-center">{p.rank}</span>
              <PlinkoIcon size={40} className="fill-white" />
            </div>
            <div className="w-full flex flex-col text-center">
              <span>Player</span>
              <span className="text-xs">{p.address.slice(0, 6) + "..." + p.address.slice(-4)}</span>
            </div>
            <span>{p.score}</span>
          </div>
        ))}
      </div>
    </>

  );
};

export default LiveRankings;
