'use client';
import { create } from 'zustand'
import { PlinkoState, GameState } from "@/components/store/types";


export const useArcadeStore = create<PlinkoState>((set, get) => ({
  state: GameState.Ready,
  setState: (state) => {
    set( { state })
  },
  results: {},
  addResult: (key, value) => {
    set( { results: { ...get().results, [key]: value }})
  },
  clearResults: () => {
    set( { results: {} })
  }
}))