'use client';
import { useEffect } from 'react'
import { useArcadeStore } from '@/components/store/arcade'

import Game from '@/components/arcade/plinko'

const Plinko = () => {
  const alertUser = (e: BeforeUnloadEvent) => {
    if (gamesRunning > 0) {
      e.preventDefault()
      alert('Are you sure you want to quit?')
      e.returnValue = ''
    }
  }
  const gamesRunning = useArcadeStore(state => state.gamesRunning)
  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [gamesRunning])
  return (
    <div className="flex flex-col justify-center">
      <span className="text-4xl font-semibold mt-4 text-center">Plinko</span>
      <Game />
    </div>
  )
}

export default Plinko;