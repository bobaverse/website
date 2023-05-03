'use client';
import dynamic from "next/dynamic";
import { useEffect } from 'react'
import { useArcadeStore } from '@/components/store/arcade'
import { GameState } from "@/components/store/types";

const Game = dynamic(() => import('@/components/arcade/plinko'), { ssr: false })

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
    <div className="content">
      <Game />
    </div>
  )
}

export default Plinko;