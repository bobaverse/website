'use client';

import { BobaVerseArcadeABI } from "@/assets/abi/BobaVerseArcade";
import { ArcadeAddressMap } from "@/utils/blockchain/addresses";
import { bobaEth } from "@/utils/blockchain/chains";

import { useState } from "react";
import { useContractEvent, useContractRead, useNetwork } from "wagmi";

const PlinkoHighScore = () => {
  const { chain } = useNetwork();
  const [highScore, setHighScore] = useState<number>(0);

  const now = new Date();

  useContractRead({
    address: ArcadeAddressMap[chain?.id || bobaEth.id],
    abi: BobaVerseArcadeABI,
    functionName: 'getLeaderboardFor',
    args: [0, BigInt(now.getFullYear()), BigInt(now.getMonth() + 1)],
    onSuccess: ([addresses, scores]) => {
      const best = scores.reduce((o, a) => {
        if (Number(a) > o) {
          o = Number(a)
        }
        return o;
      }, 0);
      if (best > highScore) {
        setHighScore(best);
      }
    }
  })

  useContractEvent({
    address: ArcadeAddressMap[chain?.id || bobaEth.id],
    abi: BobaVerseArcadeABI,
    eventName: 'PlinkoResult',
    listener(log) {
      for (const l of log) {
        const n = Number(l.args.score || 0);
        if (n > highScore) {
          setHighScore(n);
        }
      }
    }
  })
  return (
    <>
      <span className="hidden sm:block col-span-2 w-full bg-[#4A4A4A] py-4 rounded-xl shadow-2xl font-medium text-center">
        Personal Season Highscore:
      </span>
      <div className="col-span-2 w-full bg-[#4A4A4A] py-4 rounded-xl shadow-2xl font-medium text-center sm:hidden">
        <span>Personal High Score:</span>
      </div>
      <span className="w-full bg-[#4A4A4A] py-4 rounded-xl shadow-2xl font-medium text-center">
        {highScore}
      </span>
    </>
  )
}

export default PlinkoHighScore;
