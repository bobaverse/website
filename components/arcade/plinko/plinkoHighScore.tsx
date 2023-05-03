'use client';

import { BobaVerseArcadeABI } from "@/assets/abi/BobaVerseArcade";
import { ArcadeAddressMap } from "@/utils/blockchain/addresses";
import { bobaAvax } from "@/utils/blockchain/chains";
import { BigNumber } from "ethers";
import { useState } from "react";
import { useContractEvent, useContractRead, useNetwork } from "wagmi";

const PlinkoHighScore = () => {
  const { chain } = useNetwork();
  const [highScore, setHighScore] = useState<number>(0);

  const now = new Date();

  useContractRead({
    address: ArcadeAddressMap[chain?.id || bobaAvax.id],
    abi: BobaVerseArcadeABI,
    functionName: 'getLeaderboardFor',
    args: [0, BigNumber.from(now.getFullYear()), BigNumber.from(now.getMonth() + 1)],
    onSuccess: ([addresses, scores]) => {
      const best = scores.reduce((o, a) => {
        if (a.toNumber() > o) {
          o = a.toNumber()
        }
        return o;
      }, 0);
      if (best > highScore) {
        setHighScore(best);
      }
    }
  })

  useContractEvent({
    address: ArcadeAddressMap[chain?.id || bobaAvax.id],
    abi: BobaVerseArcadeABI,
    eventName: 'PlinkoResult',
    listener: (sender, ballLocations, score) => {
      const n = score.toNumber();
      if (n > highScore) {
        setHighScore(n);
      }
    }
  })
  return (
    <span>High Score: {highScore}</span>
  )
}

export default PlinkoHighScore;