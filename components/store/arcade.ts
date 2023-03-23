'use client';
import { create } from 'zustand'

interface PlinkoResults {
  [key: string]: number
}

interface Arcade {
  gamesRunning: number
  results: PlinkoResults;
  setGamesRunning: (gamesRunning: number) => void
  incrementGamesRunning: () => void
  decrementGamesRunning: () => void
  addResult: (key: string, value: number) => void
  clearResults: () => void
}

export const useArcadeStore = create<Arcade>((set, get) => ({
  gamesRunning: 0,
  results: {},
  setGamesRunning: (gamesRunning: number) => {
    set({ gamesRunning })
  },
  incrementGamesRunning: () => {
    const gamesRunning = get().gamesRunning
    const calc = gamesRunning + 1

    set({ gamesRunning: calc < 0 ? 1 : calc })
  },
  decrementGamesRunning: () => {
    const gamesRunning = get().gamesRunning
    const calc = gamesRunning - 1

    set({ gamesRunning: calc < 0 ? 0 : calc })
  },
  addResult: (key, value) => {
    set( { results: { ...get().results, [key]: value }})
  },
  clearResults: () => {
    set( { results: {} })
  }
}))