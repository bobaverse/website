'use client';
import { BobaVerseArcadeABI } from "@/assets/abi/BobaVerseArcade";
import Card from "@/components/containers/Card";
import { ArcadeAddressMap } from "@/utils/blockchain/addresses";
import { bobaAvax } from "@/utils/blockchain/chains";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { BigNumber } from "ethers";
import Image from "next/image";
import React, { FC, useState } from "react";
import { useAccount, useContractRead, useNetwork } from "wagmi";

interface CurrentSeasonRanksProps {
  month?: number;
  year?: number;
}
const CurrentSeasonRanks: FC<CurrentSeasonRanksProps> = ({ month = (new Date()).getMonth() + 1, year = (new Date()).getFullYear() }) => {
  const { chain } = useNetwork();
  const [topTen, setTopTen] = useState<{ address: string, score: number, rank: number }[]>(Array.from(Array(10)).map((v, i) => ({
    address: '0x0000...0000',
    score: 0,
    rank: i + 1,
  })));

  const now = new Date();

  useContractRead({
    address: ArcadeAddressMap[chain?.id || bobaAvax.id],
    abi: BobaVerseArcadeABI,
    functionName: 'getLeaderboardFor',
    args: [0, BigNumber.from(year), BigNumber.from(month)],
    onSuccess: ([addresses, scores]) => {
      const ranks = addresses
        .map((a, i) => [a, scores[i].toNumber()] as [string, number])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map((a, i) => ({
          address: a[0],
          score: a[1],
          rank: i + 1,
        }))
      if (ranks.length < 10) {
        for (let i = ranks.length; i < 10; i++) {
          ranks.push({
            address: '0x0000...0000',
            score: 0,
            rank: i + 1,
          })
        }
      }
      if (ranks !== topTen) {
        setTopTen(ranks);
      }
    }
  })
  const rankMap = (i: number) => (i === 1 ? 'bg-gold' : i === 2 ? 'bg-silver' : i === 3 ? 'bg-bronze' : '');
  return (
    <TableContainer>
      <Table sx={{ '& .MuiTableCell-root': { borderColor: 'transparent' } }}>
        <TableHead>
          <TableRow>
            <TableCell className="py-2 pt-4 w-[60px]">Rank</TableCell>
            <TableCell className="py-2 pt-4">Player</TableCell>
            <TableCell className="pb-2 pt-4" align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topTen.map((player, index) => (
            <TableRow key={index}>
              <TableCell className="py-1 w-[60px]">
                <div
                  className={"w-[32px] h-[32px] lg:w-[48px] lg:h-[48px] rounded-md flex justify-center items-center " + rankMap(player.rank)}
                >
                  <span className="text-3xl">{player.rank}</span>
                </div>
              </TableCell>
              <TableCell className="py-1">
                <div className="flex w-[32px] h-[32px] lg:w-[48px] lg:h-[48px]">
                  <Image
                    src="https://i.imgur.com/MgYBxfS.jpeg"
                    alt="profile pic"
                    className="rounded-full mr-2"
                    width={48}
                    height={48}
                  />
                  <div className="flex flex-col">
                    <span className="text-md lg:text-xl font-semibold">Player</span>
                    <span className="text-xs lg:text-sm text-seafoam">
                      {player.address.slice(0, 6) + "..." + player.address.slice(player.address.length - 4, player.address.length)}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-1 text-xl" align="right">{player.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CurrentSeasonRanks;