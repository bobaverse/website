'use client';
import { useEffect } from 'react'
import { useArcadeStore } from '@/components/store/arcade'

import Game from '@/components/arcade/plinko'
import { GameState } from "@/components/store/types";

const Plinko = () => {

  const gameState = useArcadeStore(state => state.state)
  const alertUser = (e: BeforeUnloadEvent) => {
    if (gameState !== GameState.Ready && gameState !== GameState.Finished) {
      e.preventDefault()
      alert('Are you sure you want to quit?')
      e.returnValue = ''
    }
  }
  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState])
  return (
    <div className="flex flex-col justify-center">
      <span className="text-4xl font-semibold my-4 text-center">Plinko</span>
      <Game />
    </div>
  )
}

export default Plinko;