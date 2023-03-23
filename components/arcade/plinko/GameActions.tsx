import { FC, useState } from 'react'
import { LinesType } from '@/interfaces/plinko'

interface PlinkoBetActions {
  onRunBet: (betValue: number) => void
  onChangeLines: (lines: LinesType) => void
  inGameBallsCount: number
}

export const BetActions: FC<PlinkoBetActions> = ({ onRunBet, onChangeLines, inGameBallsCount}) => {
  async function handleRunBet() {
    if (inGameBallsCount >= 20) return
    onRunBet(1)
    // await decrementCurrentBalance(betValue)
  }

  return (
    <div className="relative h-1/2 w-full flex-1 py-8 px-4">

    </div>
  )
}